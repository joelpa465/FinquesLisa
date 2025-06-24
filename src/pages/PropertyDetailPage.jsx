import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Home,
  Bath,
  Maximize,
  Calendar,
  Check,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import PropertyCard from '../components/PropertyCard';

// PROPIEDADES REALES DE FINQUES LISA
const mockProperties = [
  {
    id: 1,
    title: "Magnífico ático dúplex con terraza-jardín en Sagrada Familia",
    description: "Se vende magnífico ático dúplex con terraza jardín privado en C/ Industria, en zona de Sagrada Familia junto al recinto modernista. Propiedad única con vistas panorámicas y espacios exteriores privados.",
    price: 810000,
    originalPrice: 825000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607688960-e095ff2c3c96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    ],
    location: "Sagrada Família, Barcelona",
    address: "Carrer de la Indústria, Barcelona",
    bedrooms: 3,
    bathrooms: 2,
    area: 99,
    pricePerM2: 8182,
    yearBuilt: 2000,
    isFeatured: true,
    isActive: true,
    operationType: "venta",
    propertyType: "duplex",
    reference: "FL001",
    features: [
      "Ático dúplex",
      "Terraza jardín privado",
      "Vistas panorámicas",
      "Zona recinto modernista",
      "Ascensor",
      "Totalmente reformado"
    ],
    neighborhood: "Sagrada Família",
    zone: "Eixample",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-05-25'),
    isReduced: true
  },
  {
    id: 2,
    title: "Exclusiva vivienda reformada junto a Paseo San Juan",
    description: "Exclusiva vivienda de 133m² según catastro (121m² vivienda + 12m² elementos comunes). Piso a calle y patio de manzana típico del ensanche barcelonés, totalmente reformado con distribución moderna y funcional.",
    price: 760000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560449496-c0c5e1e5c7f7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop"
    ],
    location: "Camp d'en Grassot i Gràcia Nova, Barcelona",
    address: "Carrer de Bailèn, Barcelona",
    bedrooms: 2,
    bathrooms: 2,
    area: 133,
    pricePerM2: 5714,
    yearBuilt: 1941,
    isFeatured: true,
    isActive: true,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL002",
    features: [
      "Totalmente reformado",
      "Distribución moderna",
      "Patio de manzana típico",
      "Ascensor",
      "A calle principal",
      "Elementos comunes incluidos"
    ],
    neighborhood: "Camp d'en Grassot",
    zone: "Gràcia",
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-05-29'),
    isOpportunity: true
  },
  {
    id: 3,
    title: "Fantástico piso con espacio, confort y mar en Badalona",
    description: "Te presentamos este fantástico piso de 93 m² construidos (88 m² útiles), ubicado en una de las zonas más cotizadas de Badalona, a escasos metros del puerto deportivo y la playa.",
    price: 498000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    ],
    location: "Port, Badalona",
    address: "Carrer de la Indústria, Badalona",
    bedrooms: 3,
    bathrooms: 2,
    area: 93,
    pricePerM2: 5355,
    yearBuilt: 1995,
    isFeatured: false,
    isActive: true,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL003",
    features: [
      "Cerca del puerto deportivo",
      "A metros de la playa",
      "Finca moderna",
      "Ascensor",
      "Luminoso",
      "Distribución funcional"
    ],
    neighborhood: "Port",
    zone: "Badalona",
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-05-26'),
    isOpportunity: true
  },
  {
    id: 4,
    title: "Amplio piso en Gràcia Nova - Camp d'en Grassot",
    description: "FINQUES LISA presenta este amplio y espacioso piso situado en el barrio encantador de Gràcia- Camp d'en Grassot, ubicado en una zona muy bien comunicada y con todos los servicios.",
    price: 402000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop"
    ],
    location: "Baix Guinardó, Barcelona",
    address: "Travessera de Gràcia, Barcelona",
    bedrooms: 3,
    bathrooms: 2,
    area: 103,
    pricePerM2: 3903,
    yearBuilt: 1960,
    isFeatured: false,
    isActive: true,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL004",
    features: [
      "Amplio y espacioso",
      "Barrio encantador",
      "Bien comunicado",
      "Todos los servicios",
      "Ascensor",
      "Exterior"
    ],
    neighborhood: "Baix Guinardó",
    zone: "Gràcia",
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-05-28'),
    isOpportunity: true
  },
  {
    id: 5,
    title: "Tu nuevo hogar en el corazón de Nou Barris",
    description: "En el mismo Passeig de Verdum y junto a la Plaça de la República le ofrecemos este piso exterior distribuido en comedor-estar, perfectamente comunicado con el centro de la ciudad.",
    price: 235000,
    originalPrice: 245000,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    ],
    location: "Porta, Barcelona",
    address: "Passeig de Verdum, Barcelona",
    bedrooms: 3,
    bathrooms: 1,
    area: 64,
    pricePerM2: 3672,
    yearBuilt: 1970,
    isFeatured: false,
    isActive: true,
    operationType: "venta",
    propertyType: "piso",
    reference: "FL005",
    features: [
      "Piso exterior",
      "Junto a Plaça República",
      "Bien comunicado",
      "Comedor-estar amplio",
      "Zona comercial",
      "Transporte público"
    ],
    neighborhood: "Porta",
    zone: "Nou Barris",
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-05-27'),
    isReduced: true
  },
  {
    id: 6,
    title: "Espectacular dúplex en Sants Montjuïc",
    description: "¡Descubre tu hogar en el corazón de Sants Montjuïc! Este espectacular dúplex en la zona de la Marina del Port te ofrece 100 m² de pura comodidad y estilo con terraza balcón orientada.",
    price: 280000,
    originalPrice: 285000,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
    ],
    location: "Marina del Port, Barcelona",
    address: "Carrer de la Mineria, Barcelona",
    bedrooms: 3,
    bathrooms: 2,
    area: 100,
    pricePerM2: 2800,
    yearBuilt: 1985,
    isFeatured: false,
    isActive: true,
    operationType: "venta",
    propertyType: "duplex",
    reference: "FL006",
    features: [
      "Dúplex espectacular",
      "Terraza balcón",
      "Orientación sur",
      "100m² útiles",
      "Zona Marina del Port",
      "Comodidad y estilo"
    ],
    neighborhood: "Marina del Port",
    zone: "Sants-Montjuïc",
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-05-28'),
    isReduced: true
  }
];

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      // Simular delay de carga
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const propertyId = parseInt(id);
      const foundProperty = mockProperties.find(p => p.id === propertyId);
      
      if (foundProperty) {
        setProperty(foundProperty);
        
        // Verificar si está en favoritos
        const favorites = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
        setIsLiked(favorites.includes(foundProperty.id));
      }
      
      setLoading(false);
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando propiedad..." />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Propiedad no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            La propiedad que buscas no existe o ha sido eliminada.
          </p>
          <Link to="/propiedades" className="btn-primary">
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [property.image];
  const relatedProperties = mockProperties
    .filter(p => p.id !== property.id && p.isActive && p.operationType === property.operationType)
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar envío de formulario
    console.log('Contact form:', contactForm);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Echa un vistazo a esta propiedad: ${property.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href);
      // TODO: Mostrar toast de confirmación
    }
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('finques_lisa_favorites') || '[]');
    const isFavorite = favorites.includes(property.id);
    
    if (isFavorite) {
      const newFavorites = favorites.filter(favId => favId !== property.id);
      localStorage.setItem('finques_lisa_favorites', JSON.stringify(newFavorites));
      setIsLiked(false);
    } else {
      const newFavorites = [...favorites, property.id];
      localStorage.setItem('finques_lisa_favorites', JSON.stringify(newFavorites));
      setIsLiked(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{property.title} - Finques Lisa</title>
        <meta name="description" content={property.description} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.description} />
        <meta property="og:image" content={property.image} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-primary-600">Inicio</Link>
              <span>/</span>
              <Link to="/propiedades" className="hover:text-primary-600">Propiedades</Link>
              <span>/</span>
              <span className="text-gray-900">{property.title}</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver atrás
              </button>

              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                          index === currentImageIndex ? 'border-primary-500' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        property.operationType === 'alquiler' 
                          ? 'bg-secondary-100 text-secondary-800' 
                          : 'bg-primary-100 text-primary-800'
                      }`}>
                        {property.operationType === 'alquiler' ? 'Alquiler' : 'Venta'}
                      </span>
                      {property.isFeatured && (
                        <span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-semibold">
                          Destacado
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleToggleFavorite}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'text-purple-500 fill-purple-500' : 'text-gray-600'}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Share2 className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary-600">
                    €{typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
                  </span>
                  {property.operationType === 'alquiler' && (
                    <span className="text-gray-500 text-lg ml-2">/mes</span>
                  )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-900 font-medium">{property.bedrooms} hab.</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center">
                      <Bath className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-900 font-medium">{property.bathrooms} baños</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-900 font-medium">{property.area} m²</span>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-900 font-medium">{property.yearBuilt}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Features List */}
                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Características</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-secondary-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Contactar por esta propiedad
                </h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="input"
                    required
                  />
                  
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="input"
                    required
                  />
                  
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="input"
                  />
                  
                  <textarea
                    placeholder="Mensaje (opcional)"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows="4"
                    className="input resize-none"
                  />
                  
                  <button type="submit" className="btn-primary w-full">
                    Enviar consulta
                  </button>
                </form>
                
                {/* Direct Contact */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Contacto directo</h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+34934501725"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      93 450 17 25
                    </a>
                    <a
                      href="tel:+34934504238"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      93 450 42 38
                    </a>
                    <a
                      href="tel:+34662646662"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-3" />
                      662 646 662
                    </a>
                    <a
                      href="mailto:finqueslisa@finqueslisa.com"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      finqueslisa@finqueslisa.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información adicional
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referencia:</span>
                    <span className="text-gray-900 font-medium">{property.reference || `FL-${property.id.toString().padStart(4, '0')}`}</span>
                  </div>
                  {property.address && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dirección:</span>
                      <span className="text-gray-900 font-medium text-right">{property.address}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="text-gray-900 font-medium capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`font-medium ${property.isActive ? 'text-secondary-600' : 'text-gray-500'}`}>
                      {property.isActive ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                  {property.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Actualizado:</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(property.updatedAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mortgage Calculator */}
              {property.operationType === 'venta' && (
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Calculadora de hipoteca
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio de la propiedad
                      </label>
                      <input
                        type="text"
                        value={`€${property.price.toLocaleString()}`}
                        disabled
                        className="input bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Entrada (%)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Años
                      </label>
                      <select className="input">
                        <option value="15">15 años</option>
                        <option value="20">20 años</option>
                        <option value="25">25 años</option>
                        <option value="30">30 años</option>
                      </select>
                    </div>
                    <button className="btn-outline w-full">
                      Calcular cuota
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Properties */}
          {relatedProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                Propiedades similares
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProperties.map((relatedProperty, index) => (
                  <motion.div
                    key={relatedProperty.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PropertyCard {...relatedProperty} />
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/propiedades" className="btn-outline">
                  Ver todas las propiedades
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;