import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const ServicesPage = () => {
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

export default ServicesPage;