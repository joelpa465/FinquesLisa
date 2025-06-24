import { motion } from 'framer-motion';
import { Heart, MapPin, Home, Bath, Maximize, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ 
  id, 
  title, 
  price, 
  image, 
  location, 
  bedrooms, 
  bathrooms, 
  area,
  yearBuilt,
  isFeatured = false,
  operationType = 'venta', // 'venta' | 'alquiler'
  reference
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Función para manejar favoritos
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
    const isFavorite = favorites.includes(id);
    
    if (isFavorite) {
      const newFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('finques_lisa_favorites', JSON.stringify(newFavorites));
      setIsLiked(false);
    } else {
      const newFavorites = [...favorites, id];
      localStorage.setItem('finques_lisa_favorites', JSON.stringify(newFavorites));
      setIsLiked(true);
    }
  };

  // Verificar si está en favoritos al cargar
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
    setIsLiked(favorites.includes(id));
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link to={`/propiedades/${id}`}>
        <div className="card-hover overflow-hidden relative">
          {/* Badge de destacado */}
          {isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                Destacado
              </span>
            </div>
          )}
          
          {/* Badge de tipo de operación */}
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-2 py-1 text-white text-xs font-semibold rounded-full ${
              operationType === 'alquiler' ? 'bg-secondary-500' : 'bg-primary-500'
            }`}>
              {operationType === 'alquiler' ? 'Alquiler' : 'Venta'}
            </span>
          </div>

          {/* Botón de favorito - reposicionado */}
          <button
            onClick={handleToggleFavorite}
            className="absolute bottom-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-md transition-all duration-200"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isLiked ? 'text-purple-500 fill-purple-500' : 'text-gray-600'
              }`} 
            />
          </button>

          {/* Imagen con overlay gradiente */}
          <div className="relative h-64 overflow-hidden bg-gray-200">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Contenido */}
          <div className="p-5 space-y-4">
            {/* Título y ubicación */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>

            {/* Características */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                {bedrooms && (
                  <div className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    <span>{bedrooms}</span>
                  </div>
                )}
                {bathrooms && (
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{bathrooms}</span>
                  </div>
                )}
                {area && (
                  <div className="flex items-center">
                    <Maximize className="w-4 h-4 mr-1" />
                    <span>{area}m²</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {reference && (
                  <span>Ref: {reference}</span>
                )}
              </div>
            </div>

            {/* Precio */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary-600">
                  €{typeof price === 'number' ? price.toLocaleString() : price}
                </span>
                {operationType === 'alquiler' && (
                  <span className="text-gray-500 text-sm ml-1">/mes</span>
                )}
              </div>
              
              {/* Indicador de interés/visitas */}
              <div className="text-right">
                <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-500 mt-1 block">Activo</span>
              </div>
            </div>

            {/* Botón CTA sutil */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Ver detalles</span>
                <motion.div
                  className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-xs">→</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;