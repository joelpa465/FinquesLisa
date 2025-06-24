import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Building2,
  Star,
  ExternalLink
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Mensaje Enviado!</h2>
          <p className="text-gray-600">Te contactaremos en las próximas 24 horas</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contacto - Finques Lisa</title>
        <meta name="description" content="Ponte en contacto con Finques Lisa. Estamos en Sant Antoni Maria Claret, 83 local 2, Barcelona. Teléfonos: 93 450 17 25, 93 450 42 38, 662 646 662" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-200/40 to-purple-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-100/30 to-pink-100/30 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full text-sm font-medium text-gray-700 mb-6">
                <MessageCircle className="w-4 h-4 mr-2 text-rose-500" />
                Estamos aquí para ayudarte
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Hablemos de tu 
                <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent"> próximo hogar</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Con más de 15 años de experiencia en Barcelona, estamos listos para guiarte en cada paso 
                de tu proceso inmobiliario. Tu sueño es nuestro compromiso.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative pb-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/50">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Envíanos un mensaje</h2>
                    <p className="text-gray-600">Completa el formulario y te responderemos en menos de 24 horas</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors bg-white/70 backdrop-blur-sm"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors bg-white/70 backdrop-blur-sm"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone and Property Type */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors bg-white/70 backdrop-blur-sm"
                          placeholder="+34 000 000 000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de consulta
                        </label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors bg-white/70 backdrop-blur-sm"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="comprar">Quiero comprar</option>
                          <option value="vender">Quiero vender</option>
                          <option value="alquilar">Quiero alquilar</option>
                          <option value="arrendar">Quiero arrendar</option>
                          <option value="tasacion">Tasación gratuita</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors bg-white/70 backdrop-blur-sm"
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors resize-none bg-white/70 backdrop-blur-sm"
                        placeholder="Cuéntanos más detalles sobre lo que buscas..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-rose-400 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Enviar mensaje
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Contact Details */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Información de contacto</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-rose-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Teléfonos</p>
                        <div className="space-y-1">
                          <a href="tel:+34934501725" className="block text-gray-600 hover:text-rose-600 transition-colors">93 450 17 25</a>
                          <a href="tel:+34934504238" className="block text-gray-600 hover:text-rose-600 transition-colors">93 450 42 38</a>
                          <a href="tel:+34662646662" className="block text-gray-600 hover:text-rose-600 transition-colors">662 646 662</a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <a href="mailto:finqueslisa@finqueslisa.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                          finqueslisa@finqueslisa.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Oficina</p>
                        <p className="text-gray-600">
                          Sant Antoni Maria Claret, 83 local 2<br />
                          08025 Barcelona, Catalunya<br />
                          Barrio: Horta-Guinardó
                        </p>
                        <a
                          href="https://www.google.com/maps/dir//Carrer+de+Sant+Antoni+Maria+Claret,+83,+Horta-Guinard%C3%B3,+08025+Barcelona/@41.407872,2.0872613,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x12a4a2c42847374f:0x3df1d560f44ae6d5!2m2!1d2.1696272!2d41.4079277?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:text-green-700 cursor-pointer inline-flex items-center mt-2"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Ver en mapa
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Horarios</p>
                        <p className="text-gray-600 text-sm">
                          Lun - Vie: 9:00 - 19:00<br />
                          Sáb: 10:00 - 14:00<br />
                          Dom: Cerrado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-rose-400 to-purple-500 rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-6">¿Por qué elegirnos?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-yellow-300" />
                      <span>15+ años de experiencia</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-blue-200" />
                      <span>+1200 clientes satisfechos</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-6 h-6 text-purple-200" />
                      <span>+500 propiedades vendidas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="w-6 h-6 text-yellow-300" />
                      <span>4.9/5 valoración media</span>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Buttons */}
                <div className="flex flex-col space-y-3">
                  <a
                    href="tel:+34934501725"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Llamar ahora
                  </a>
                  <a
                    href="mailto:finqueslisa@finqueslisa.com"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar email
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nuestra ubicación</h3>
                <p className="text-gray-600">Visítanos en nuestra oficina en Barcelona</p>
              </div>
              
              {/* Google Maps Embed */}
              <div className="h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.654873937829!2d2.167162576507625!3d41.40792717128642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2c42847374f%3A0x3df1d560f44ae6d5!2sCarrer%20de%20Sant%20Antoni%20Maria%20Claret%2C%2083%2C%20Horta-Guinard%C3%B3%2C%2008025%20Barcelona!5e0!3m2!1sen!2ses!4v1735656543210!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Finques Lisa en Barcelona"
                ></iframe>
              </div>
              
              {/* Map Actions */}
              <div className="p-6 bg-gradient-to-r from-rose-50/80 to-purple-50/80 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.google.com/maps/dir//Carrer+de+Sant+Antoni+Maria+Claret,+83,+Horta-Guinard%C3%B3,+08025+Barcelona/@41.407872,2.0872613,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x12a4a2c42847374f:0x3df1d560f44ae6d5!2m2!1d2.1696272!2d41.4079277?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Cómo llegar
                  </a>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex-1 border border-white/50">
                    <h4 className="font-semibold text-gray-900 mb-2">🚇 Transporte público</h4>
                    <p className="text-sm text-gray-600">Metro L5: Sant Pau | Dos de Maig • Autobús: 19, 20, 45, 47, 92</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;