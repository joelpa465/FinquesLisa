import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProperties } from '../context/PropertiesContext';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  SlidersHorizontal,
  X
} from 'lucide-react';

// Componente de tarjeta de propiedad
const PropertyCard = ({ property, viewMode }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
    setIsLiked(favorites.includes(property.id));
  }, [property.id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
    
    if (isLiked) {
      const newFavorites = favorites.filter(id => id !== property.id);
      localStorage.setItem('finques_lisa_favorites', JSON.stringify(newFavorites));
      setIsLiked(false);
    } else {
      const newFavorites = [...favorites, property.id];
      localStorage.setItem('finques_lisa_favorites', JSON.stringify(newFavorites));
      setIsLiked(true);
    }
  };

  const cardClass = viewMode === 'grid' 
    ? "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex";

  const imageClass = viewMode === 'grid'
    ? "w-full h-48 object-cover"
    : "w-64 h-48 object-cover";

  const contentClass = viewMode === 'grid'
    ? "p-4"
    : "flex-1 p-4";

  return (
    <div className={cardClass}>
      <div className="relative">
        <img
          src={property.main_image || property.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"}
          alt={property.title}
          className={imageClass}
        />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          />
        </button>
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
            property.operation_type === 'alquiler' ? 'bg-blue-600' : 'bg-purple-600'
          }`}>
            {property.operation_type === 'alquiler' ? 'Alquiler' : 'Venta'}
          </span>
        </div>
      </div>
      
      <div className={contentClass}>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex space-x-3">
            {property.bedrooms > 0 && (
              <span className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {property.bathrooms}
              </span>
            )}
            {property.area_built > 0 && (
              <span className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {property.area_built}m²
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              €{typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
            </span>
            {property.operation_type === 'alquiler' && (
              <span className="text-gray-500 text-sm ml-1">/mes</span>
            )}
          </div>
          <Link
            to={`/propiedades/${property.slug || property.id}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

const PropertiesPage = () => {
  const { 
    properties, 
    isLoading, 
    loadProperties, 
    propertyTypes, 
    locations, 
    priceRanges,
    searchProperties
  } = useProperties();
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    search: '',
    operation_type: 'all',
    property_type: 'all',
    min_price: '',
    max_price: '',
    bedrooms: 'all',
    location: 'all'
  });
  
  const [sortBy, setSortBy] = useState('newest');

  // Cargar propiedades al montar el componente
  useEffect(() => {
    loadProperties();
  }, []);

  // Función para aplicar filtros
  const applyFilters = async () => {
    const filterParams = {};
    
    if (filters.operation_type !== 'all') {
      filterParams.operation_type = filters.operation_type;
    }
    
    if (filters.property_type !== 'all') {
      filterParams.property_type = filters.property_type;
    }
    
    if (filters.min_price) {
      filterParams.min_price = parseInt(filters.min_price);
    }
    
    if (filters.max_price) {
      filterParams.max_price = parseInt(filters.max_price);
    }
    
    if (filters.bedrooms !== 'all') {
      filterParams.bedrooms = parseInt(filters.bedrooms);
    }
    
    if (filters.location !== 'all') {
      filterParams.location = filters.location;
    }

    if (filters.search) {
      await searchProperties(filters.search, filterParams);
    } else {
      await loadProperties(filterParams);
    }
  };

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      applyFilters();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters]);

  // Filtrar y ordenar propiedades en el frontend
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = [...properties];

    // Ordenar
    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'area_desc':
        filtered.sort((a, b) => (b.area_built || 0) - (a.area_built || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    return filtered;
  }, [properties, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      operation_type: 'all',
      property_type: 'all',
      min_price: '',
      max_price: '',
      bedrooms: 'all',
      location: 'all'
    });
  };

  const currentPriceRange = priceRanges[filters.operation_type] || { min: 0, max: 1000000 };

  return (
    <>
      <Helmet>
        <title>Propiedades en Venta y Alquiler - Finques Lisa</title>
        <meta name="description" content="Explora nuestra amplia selección de propiedades en venta y alquiler en Lleida. Encuentra tu hogar ideal con Finques Lisa." />
        <meta name="keywords" content="propiedades, venta, alquiler, Lleida, pisos, casas, inmobiliaria" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-custom py-8">
            <div className="text-center">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Nuestras Propiedades
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Encuentra la propiedad perfecta entre nuestra selección de inmuebles en Lleida
              </p>
            </div>
          </div>
        </section>

        <div className="container-custom py-8">
          {/* Controles principales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Búsqueda */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por título, ubicación..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center px-4 py-3 border rounded-lg transition-colors ${
                      showFilters 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                  </button>
                </div>
              </div>

              {/* Controles de vista */}
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="newest">Más recientes</option>
                  <option value="price_asc">Precio: menor a mayor</option>
                  <option value="price_desc">Precio: mayor a menor</option>
                  <option value="area_desc">Mayor superficie</option>
                </select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Panel de filtros avanzados */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de operación
                    </label>
                    <select
                      value={filters.operation_type}
                      onChange={(e) => handleFilterChange('operation_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">Todos</option>
                      <option value="venta">Venta</option>
                      <option value="alquiler">Alquiler</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de propiedad
                    </label>
                    <select
                      value={filters.property_type}
                      onChange={(e) => handleFilterChange('property_type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">Todos</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Habitaciones
                    </label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">Cualquiera</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">Todas</option>
                      {locations.map(location => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio mínimo (€)
                    </label>
                    <input
                      type="number"
                      value={filters.min_price}
                      onChange={(e) => handleFilterChange('min_price', e.target.value)}
                      placeholder={`Desde ${currentPriceRange.min?.toLocaleString()}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio máximo (€)
                    </label>
                    <input
                      type="number"
                      value={filters.max_price}
                      onChange={(e) => handleFilterChange('max_price', e.target.value)}
                      placeholder={`Hasta ${currentPriceRange.max?.toLocaleString()}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resultados */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {isLoading ? 'Cargando...' : `${filteredAndSortedProperties.length} propiedades encontradas`}
              </p>
            </div>
          </div>

          {/* Lista de propiedades */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Cargando propiedades...</p>
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron propiedades
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros de búsqueda para obtener más resultados.
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-6"
            }>
              {filteredAndSortedProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertiesPage;