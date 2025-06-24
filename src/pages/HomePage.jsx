import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Users, 
  Award,
  ChevronRight,
  Play
} from 'lucide-react';

// Components
import PropertyCard from '../components/PropertyCard';
import StatsCounter from '../components/StatsCounter';
import TestimonialCard from '../components/TestimonialCard';

// Mock data - PROPIEDADES REALES DE FINQUES LISA
const featuredProperties = [
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
    reference: "FL003",
    isOpportunity: true
  }
];

const stats = [
  { label: "Propiedades vendidas", value: 500, suffix: "+" },
  { label: "Clientes satisfechos", value: 1200, suffix: "+" },
  { label: "Años de experiencia", value: 15, suffix: "" },
  { label: "Valoración media", value: 4.9, suffix: "/5" }
];

const testimonials = [
  {
    name: "María García",
    role: "Compradora",
    content: "Excelente servicio. Me ayudaron a encontrar mi hogar ideal en tiempo récord.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Josep Martínez",
    role: "Vendedor",
    content: "Profesionales de confianza. Vendieron mi piso por encima del precio esperado.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Finques Lisa - Tu hogar, nuestra pasión | Inmobiliaria en Barcelona</title>
        <meta name="description" content="Encuentra tu hogar ideal en Barcelona con Finques Lisa. Venta y alquiler de pisos, casas y locales. Más de 15 años de experiencia en el sector inmobiliario." />
        <meta name="keywords" content="inmobiliaria Barcelona, pisos venta Barcelona, casas alquiler Barcelona, Finques Lisa" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                  Tu <span className="text-gradient">hogar ideal</span><br />
                  te está esperando
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Descubre las mejores propiedades en Barcelona con más de 15 años de experiencia 
                  ayudando a familias a encontrar su hogar perfecto.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/propiedades" className="btn-primary px-8 py-4 text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar propiedades
                </Link>
                <button className="btn-outline px-8 py-4 text-lg group">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Ver video
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center">
                    <StatsCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      className="text-2xl font-bold text-primary-600"
                    />
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
                  alt="Casa moderna"
                  className="rounded-2xl shadow-2xl w-full"
                />
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-large">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">+18% este año</p>
                      <p className="text-sm text-gray-600">Revalorización media</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                ¿Qué tipo de propiedad buscas?
              </h2>
              <p className="text-lg text-gray-600">
                Encuentra exactamente lo que necesitas con nuestros filtros inteligentes
              </p>
            </div>

            {/* Quick Search Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { type: 'Comprar', icon: '🏠', description: 'Encuentra tu hogar ideal', color: 'bg-primary-500' },
                { type: 'Alquilar', icon: '🔑', description: 'Descubre tu próximo hogar', color: 'bg-secondary-500' },
                { type: 'Vender', icon: '💰', description: 'Vende al mejor precio', color: 'bg-accent-500' }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={`/propiedades?type=${item.type.toLowerCase()}`}
                  className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-medium transition-all duration-300"
                >
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto text-2xl group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.type}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 mx-auto transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Propiedades destacadas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de las mejores propiedades disponibles en Lleida
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/propiedades" className="btn-primary px-8 py-3">
              Ver todas las propiedades
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              ¿Por qué elegir Finques Lisa?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Más de 15 años de experiencia nos avalan como líderes en el sector inmobiliario de Barcelona
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Confianza total",
                description: "Transparencia y seguridad en cada transacción"
              },
              {
                icon: Users,
                title: "Equipo experto",
                description: "Profesionales con años de experiencia local"
              },
              {
                icon: Award,
                title: "Mejor valorados",
                description: "4.9/5 estrellas en valoraciones de clientes"
              },
              {
                icon: MapPin,
                title: "Conocimiento local",
                description: "Expertos en el mercado inmobiliario de Barcelona"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-gray-600">
              La satisfacción de nuestros clientes es nuestra mejor recomendación
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
              ¿Listo para encontrar tu hogar ideal?
            </h2>
            <p className="text-xl text-white/90">
              Nuestro equipo de expertos está aquí para ayudarte en cada paso del camino
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto" className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Contactar ahora
              </Link>
              <Link to="/propiedades" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Ver propiedades
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;