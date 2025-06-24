import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown
} from 'lucide-react';

// Components
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Mock data (luego vendrá de la API)
const mockProperties = [
  {
    id: 1,
    title: "Piso moderno en el centro de Lleida",
    price: 180000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    location: "Centro, Lleida",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    yearBuilt: 2020,
    isFeatured: true,
    operationType: "venta",
    propertyType: "piso"
  },
  {
    id: 2,
    title: "Casa unifamiliar con jardín",
    price: 1200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    location: "Pardinyes, Lleida",
    bedrooms: 4,
    bathrooms: 3,
    area: 150,
    yearBuilt: 2018,
    isFeatured: false,
    operationType: "alquiler",
    propertyType: "casa"
  },
  {
    id: 3,
    title: "Ático con terraza panorámica",
    price: 320000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    location: "Ronda, Lleida",
    bedrooms: 2,
    bathrooms: 2,
    area: 80,
    yearBuilt: 2021,
    isFeatured: true,
    operationType: "venta",
    propertyType: "piso"
  },
  {
    id: 4,
    title: "Local comercial céntrico",
    price: 850,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    location: "Eixample, Lleida",
    bedrooms: 0,
    bathrooms: 1,
    area: 120,
    yearBuilt: 1995,
    isFeatured: false,
    operationType: "alquiler",
    propertyType: "local"
  },
  {
    id: 5,
    title: "Chalet independiente con piscina",
    price: 450000,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop",
    location: "Alpicat, Lleida",
    bedrooms: 5,
    bathrooms: 4,
    area: 220,
    yearBuilt: 2015,
    isFeatured: true,
    operationType: "venta",
    propertyType: "chalet"
  },
  {
    id: 6,
    title: "Estudio luminoso renovado",
    price: 65000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    location: "Universitat, Lleida",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    yearBuilt: 1980,
    isFeatured: false,
    operationType: "venta",
    propertyType: "estudio"
  }
];

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    search: '',
    operationType: 'all',
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'all',
    location: 'all'
  });
  
  const [sortBy, setSortBy] = useState('newest');

  // Simular carga de datos
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
      setLoading(false);
    };

    loadProperties();
  }, []);

  // Filtrar y ordenar propiedades
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      // Búsqueda por título o ubicación
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(searchLower);
        const matchesLocation = property.location.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesLocation) return false;
      }

      // Filtro por tipo de operación
      if (filters.operationType !== 'all' && property.operationType !== filters.operationType) {
        return false;
      }

      // Filtro por tipo de propiedad
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Filtro por precio
      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false;
      }

      // Filtro por habitaciones
      if (filters.bedrooms !== 'all' && property.bedrooms !== parseInt(filters.bedrooms)) {
        return false;
      }

      return true;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-desc':
          return b.area - a.area;
        case 'year-desc':
          return b.yearBuilt - a.yearBuilt;
        default: // newest
          return b.id - a.id;
      }
    });

    return filtered;
  }, [properties, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      operationType: 'all',
      propertyType: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'all',
      location: 'all'
    });
  };

  const locations = [...new Set(properties.map(p => p.location))];
  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];

  return (
    <>
      <Helmet>
        <title>Propiedades en Venta y Alquiler - Finques Lisa</title>
        <meta name="description" content="Encuentra tu propiedad ideal en Lleida. Pisos, casas, locales y chalets en venta y alquiler. Más de 500 propiedades disponibles." />
        <meta name="keywords" content="propiedades Lleida, pisos venta Lleida, casas alquiler Lleida, inmobiliaria" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-custom py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  Propiedades disponibles
                </h1>
                <p className="text-gray-600">
                  {loading ? 'Cargando...' : `${filteredAndSortedProperties.length} propiedades encontradas`}
                </p>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por ubicación o título..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="input pl-10 pr-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Limpiar
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Tipo de operación */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Operación
                      </label>
                      <select
                        value={filters.operationType}
                        onChange={(e) => handleFilterChange('operationType', e.target.value)}
                        className="input"
                      >
                        <option value="all">Todas</option>
                        <option value="venta">Venta</option>
                        <option value="alquiler">Alquiler</option>
                      </select>
                    </div>

                    {/* Tipo de propiedad */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de propiedad
                      </label>
                      <select
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        className="input"
                      >
                        <option value="all">Todos</option>
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Rango de precio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Mín"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="input"
                        />
                        <input
                          type="number"
                          placeholder="Máx"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="input"
                        />
                      </div>
                    </div>

                    {/* Habitaciones */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Habitaciones
                      </label>
                      <select
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                        className="input"
                      >
                        <option value="all">Todas</option>
                        <option value="1">1 hab.</option>
                        <option value="2">2 hab.</option>
                        <option value="3">3 hab.</option>
                        <option value="4">4+ hab.</option>
                      </select>
                    </div>

                    {/* Ubicación */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ubicación
                      </label>
                      <select
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="input"
                      >
                        <option value="all">Todas las ubicaciones</option>
                        {locations.map(location => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden btn-outline"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input min-w-[140px]"
                    >
                      <option value="newest">Más reciente</option>
                      <option value="price-asc">Precio: menor a mayor</option>
                      <option value="price-desc">Precio: mayor a menor</option>
                      <option value="area-desc">Mayor superficie</option>
                      <option value="year-desc">Más nuevo</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden mb-6 bg-white rounded-xl shadow-soft p-6"
                  >
                    {/* Contenido de filtros móvil aquí */}
                    <p className="text-gray-600">Filtros móviles - Por implementar</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading State */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <>
                  {/* Properties Grid/List */}
                  {filteredAndSortedProperties.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No se encontraron propiedades
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Intenta ajustar los filtros para ver más resultados
                      </p>
                      <button
                        onClick={resetFilters}
                        className="btn-primary"
                      >
                        Limpiar filtros
                      </button>
                    </div>
                  ) : (
                    <motion.div
                      key={viewMode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={
                        viewMode === 'grid'
                          ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                          : 'space-y-6'
                      }
                    >
                      {filteredAndSortedProperties.map((property, index) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <PropertyCard {...property} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Pagination */}
                  {filteredAndSortedProperties.length > 0 && (
                    <div className="flex justify-center mt-12">
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                          Anterior
                        </button>
                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">
                          1
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                          2
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                          3
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                          Siguiente
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesPage;