import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Heart, Search, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Components
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';

// PROPIEDADES REALES DE FINQUES LISA - para favoritos
const mockProperties = [
  {
    id: 1,
    title: "Magnífico ático dúplex con terraza-jardín en Sagrada Familia",
    price: 810000,
    originalPrice: 825000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    location: "Sagrada Família, Barcelona",
    bedrooms: 3,
    bathrooms: 2,
    area: 99,
    yearBuilt: 2000,
    isFeatured: true,
    operationType: "venta",
    propertyType: "duplex",
    reference: "FL001",
    isReduced: true
  },
  {
    id: 2,
    title: "Exclusiva vivienda reformada junto a Paseo San Juan",
    price: 760000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    location: "Camp d'en Grassot, Barcelona",
    bedrooms: 2,
    bathrooms: 2,
    area: 133,
    yearBuilt: 1941,
    isFeatured: true,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL002",
    isOpportunity: true
  },
  {
    id: 3,
    title: "Fantástico piso con espacio, confort y mar en Badalona",
    price: 498000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    location: "Port, Badalona",
    bedrooms: 3,
    bathrooms: 2,
    area: 93,
    yearBuilt: 1995,
    isFeatured: false,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL003",
    isOpportunity: true
  },
  {
    id: 4,
    title: "Amplio piso en Gràcia Nova - Camp d'en Grassot",
    price: 402000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    location: "Baix Guinardó, Barcelona",
    bedrooms: 3,
    bathrooms: 2,
    area: 103,
    yearBuilt: 1960,
    isFeatured: false,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL004",
    isOpportunity: true
  },
  {
    id: 5,
    title: "Tu nuevo hogar en el corazón de Nou Barris",
    price: 235000,
    originalPrice: 245000,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    location: "Porta, Barcelona",
    bedrooms: 3,
    bathrooms: 1,
    area: 64,
    yearBuilt: 1970,
    isFeatured: false,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL005",
    isReduced: true
  },
  {
    id: 6,
    title: "Espectacular dúplex en Sants Montjuïc",
    price: 280000,
    originalPrice: 285000,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop",
    location: "Marina del Port, Barcelona",
    bedrooms: 3,
    bathrooms: 2,
    area: 100,
    yearBuilt: 1985,
    isFeatured: false,
    operationType: "venta",
    propertyType: "duplex",
    reference: "FL006",
    isReduced: true
  }
];

const FavoritesPage = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Obtener IDs de favoritos del localStorage
      const favoriteIds = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
      
      // Filtrar las propiedades que están en favoritos
      const favorites = mockProperties.filter(property => favoriteIds.includes(property.id));
      
      setFavoriteProperties(favorites);
      setLoading(false);
    };

    loadFavorites();

    // Escuchar cambios en el localStorage para actualizar la lista
    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const clearAllFavorites = () => {
    localStorage.removeItem('finques_lisa_favorites');
    setFavoriteProperties([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando favoritos..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mis Favoritos - Finques Lisa</title>
        <meta name="description" content="Tus propiedades favoritas guardadas en Finques Lisa. Accede fácilmente a las propiedades que más te interesan." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-custom py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2 flex items-center">
                  <Heart className="w-8 h-8 text-purple-500 mr-3 fill-purple-500" />
                  Mis Favoritos
                </h1>
                <p className="text-gray-600">
                  {favoriteProperties.length === 0 
                    ? 'No tienes propiedades guardadas en favoritos'
                    : `${favoriteProperties.length} ${favoriteProperties.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}`
                  }
                </p>
              </div>

              {favoriteProperties.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar favoritos
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="container-custom py-8">
          {favoriteProperties.length === 0 ? (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Aún no tienes favoritos
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Empieza a explorar nuestras propiedades y guarda las que más te gusten 
                haciendo clic en el ❤️ de cada propiedad.
              </p>
              <Link to="/propiedades" className="btn-primary">
                <Search className="w-5 h-5 mr-2" />
                Explorar propiedades
              </Link>
            </motion.div>
          ) : (
            // Properties Grid
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {favoriteProperties.map((property, index) => (
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

          {/* Tips Section */}
          {favoriteProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                💡 Consejos para tus favoritos
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div className="space-y-2">
                  <p>• <strong>Compara fácilmente:</strong> Tienes todas tus propiedades de interés en un solo lugar</p>
                  <p>• <strong>Actúa rápido:</strong> Las mejores propiedades se venden rápidamente</p>
                </div>
                <div className="space-y-2">
                  <p>• <strong>Programa visitas:</strong> Contacta con nosotros para visitar tus favoritos</p>
                  <p>• <strong>Recibe alertas:</strong> Te notificaremos sobre cambios de precio</p>
                </div>
              </div>
              <div className="mt-6">
                <Link 
                  to="/contacto" 
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Contactar para más información
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;