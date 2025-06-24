import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// AboutPage
export const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Finques Lisa</title>
        <meta name="description" content="Conoce la historia de Finques Lisa, tu inmobiliaria de confianza en Lleida con más de 15 años de experiencia." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Sobre Finques Lisa
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Más de 15 años ayudando a familias de Lleida a encontrar su hogar ideal
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Oficina Finques Lisa"
                className="rounded-xl shadow-large"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Nuestra historia
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Fundada en 2009, Finques Lisa nació con la misión de revolucionar el sector 
                inmobiliario en Lleida, ofreciendo un servicio personalizado y de máxima calidad 
                a nuestros clientes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Con más de 500 propiedades vendidas y alquiladas, nos hemos consolidado como 
                una de las inmobiliarias de referencia en la provincia, siempre manteniendo 
                nuestros valores de transparencia, profesionalidad y compromiso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ServicesPage
export const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Servicios - Finques Lisa</title>
        <meta name="description" content="Descubre todos nuestros servicios inmobiliarios: venta, alquiler, tasaciones, gestión integral y más." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Te acompañamos en cada paso de tu proceso inmobiliario
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Venta de propiedades",
                description: "Te ayudamos a vender tu propiedad al mejor precio del mercado",
                icon: "🏠"
              },
              {
                title: "Alquiler de inmuebles",
                description: "Gestionamos el alquiler de tu propiedad de forma integral",
                icon: "🔑"
              },
              {
                title: "Tasaciones gratuitas",
                description: "Valora tu propiedad con nuestros expertos tasadores",
                icon: "📊"
              },
              {
                title: "Gestión integral",
                description: "Nos ocupamos de todos los trámites y gestiones",
                icon: "⚙️"
              },
              {
                title: "Asesoramiento legal",
                description: "Te asesoramos en todos los aspectos legales",
                icon: "⚖️"
              },
              {
                title: "Financiación",
                description: "Te ayudamos a encontrar la mejor opción de financiación",
                icon: "💰"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-medium transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ContactPage
export const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contacto - Finques Lisa</title>
        <meta name="description" content="Ponte en contacto con Finques Lisa. Estamos aquí para ayudarte con todas tus necesidades inmobiliarias." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Contacta con nosotros
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte con todas tus necesidades inmobiliarias
            </p>
          </motion.div>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📞</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Página de contacto
            </h2>
            <p className="text-gray-600 mb-8">
              Formulario de contacto próximamente disponible
            </p>
            <a
              href="tel:+34973123456"
              className="btn-primary"
            >
              Llamar ahora: +34 973 123 456
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// BlogPage
export const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Finques Lisa</title>
        <meta name="description" content="Lee nuestros artículos sobre el mercado inmobiliario, consejos de compra y venta, y las últimas tendencias del sector." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Blog Inmobiliario
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Consejos, noticias y tendencias del mercado inmobiliario
            </p>
          </motion.div>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Blog próximamente
            </h2>
            <p className="text-gray-600 mb-8">
              Estamos preparando contenido de calidad sobre el mundo inmobiliario. 
              ¡Muy pronto tendrás acceso a nuestros artículos!
            </p>
            <a
              href="mailto:info@finqueslisa.com"
              className="btn-primary"
            >
              Notifícame cuando esté disponible
            </a>
          </div>
        </div>
      </div>
    </>
  );
};