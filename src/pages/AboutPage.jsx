import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Award, 
  Users, 
  Building2, 
  Target, 
  Eye,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Quote
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: "15+", label: "Años de experiencia", icon: Clock, color: "text-blue-600" },
    { number: "500+", label: "Propiedades vendidas", icon: Building2, color: "text-green-600" },
    { number: "1200+", label: "Clientes satisfechos", icon: Users, color: "text-purple-600" },
    { number: "4.9", label: "Valoración media", icon: Star, color: "text-yellow-600" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Confianza",
      description: "Transparencia total en cada proceso, priorizando siempre los intereses de nuestros clientes.",
      color: "bg-blue-500"
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Amamos lo que hacemos y eso se refleja en el cuidado y dedicación que ponemos en cada proyecto.",
      color: "bg-red-500"
    },
    {
      icon: Target,
      title: "Excelencia",
      description: "Buscamos constantemente la mejora continua para ofrecer el mejor servicio del mercado.",
      color: "bg-green-500"
    },
    {
      icon: Users,
      title: "Cercanía",
      description: "Tratamos a cada cliente como parte de nuestra familia, construyendo relaciones duraderas.",
      color: "bg-purple-500"
    }
  ];

  const team = [
    {
      name: "María García",
      role: "Directora General",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Con más de 20 años en el sector inmobiliario, María lidera nuestro equipo con pasión y visión estratégica."
    },
    {
      name: "Josep Martínez",
      role: "Director Comercial",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Experto en negociación y ventas, Josep se especializa en propiedades de lujo y inversiones comerciales."
    },
    {
      name: "Anna Rodríguez",
      role: "Asesora Senior",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Especialista en propiedades familiares, Anna ayuda a las familias a encontrar su hogar ideal en Lleida."
    }
  ];

  const milestones = [
    { year: "2009", title: "Fundación", description: "Nace Finques Lisa con el sueño de revolucionar el sector inmobiliario en Lleida" },
    { year: "2012", title: "Expansión", description: "Abrimos nuestra segunda oficina y alcanzamos las 100 propiedades vendidas" },
    { year: "2015", title: "Reconocimiento", description: "Recibimos el premio a la Mejor Inmobiliaria de Lleida por satisfacción del cliente" },
    { year: "2018", title: "Digitalización", description: "Lanzamos nuestra plataforma digital y tours virtuales 360°" },
    { year: "2021", title: "Sostenibilidad", description: "Nos convertimos en la primera inmobiliaria certificada en construcción sostenible" },
    { year: "2024", title: "Innovación", description: "Implementamos IA para valoraciones automáticas y matching inteligente" }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Finques Lisa</title>
        <meta name="description" content="Conoce la historia de Finques Lisa, tu inmobiliaria de confianza en Lleida con más de 15 años de experiencia." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
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
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-gray-700 mb-6">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Nuestra historia
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Más que una inmobiliaria,
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> somos tu hogar</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Desde 2009, ayudamos a familias de Lleida a encontrar no solo una casa, 
                sino el lugar donde crear sus recuerdos más preciados.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Todo comenzó con un sueño
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    En 2009, María García fundó Finques Lisa con una visión clara: revolucionar 
                    el sector inmobiliario en Lleida ofreciendo un servicio personalizado, 
                    transparente y centrado en las necesidades reales de las familias.
                  </p>
                  <p>
                    Lo que comenzó como una pequeña oficina en el centro de Lleida, se ha 
                    convertido en la inmobiliaria de referencia de la región, ayudando a más 
                    de 1200 familias a encontrar su hogar ideal.
                  </p>
                  <p>
                    Nuestro secreto no es solo conocer el mercado inmobiliario, sino entender 
                    que detrás de cada transacción hay personas con sueños, ilusiones y 
                    proyectos de vida únicos.
                  </p>
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                  <Quote className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-blue-800 italic">
                    "No vendemos casas, ayudamos a las personas a encontrar el lugar 
                    donde serán felices. Esa es nuestra verdadera misión."
                  </p>
                  <p className="text-blue-600 font-semibold mt-2">- María García, Fundadora</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                    alt="Oficina Finques Lisa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating achievement card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Premio 2023</div>
                      <div className="text-sm text-gray-600">Mejor Inmobiliaria Lleida</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-20 bg-white/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestros valores</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Los principios que guían cada decisión y nos hacen únicos en el sector
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="relative py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra evolución</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Un recorrido de 15 años de crecimiento, innovación y compromiso con nuestros clientes
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative flex items-start"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                      
                      {/* Content */}
                      <div className="ml-20 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {milestone.year}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative py-20 bg-white/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestro equipo</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Profesionales apasionados y comprometidos con tu éxito
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white"
              >
                <Target className="w-12 h-12 text-blue-200 mb-6" />
                <h3 className="text-2xl font-bold mb-6">Nuestra Misión</h3>
                <p className="text-lg leading-relaxed text-blue-100">
                  Facilitar el acceso a la vivienda en Lleida, ofreciendo un servicio 
                  integral, transparente y personalizado que supere las expectativas 
                  de nuestros clientes, contribuyendo al desarrollo de comunidades 
                  prósperas y felices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white"
              >
                <Eye className="w-12 h-12 text-purple-200 mb-6" />
                <h3 className="text-2xl font-bold mb-6">Nuestra Visión</h3>
                <p className="text-lg leading-relaxed text-purple-100">
                  Ser la inmobiliaria líder en Cataluña, reconocida por nuestra 
                  innovación, integridad y compromiso con la sostenibilidad, 
                  transformando la manera en que las personas experimentan el 
                  proceso de encontrar su hogar ideal.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-12 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Listo para ser parte de nuestra historia?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Únete a más de 1200 familias que ya han confiado en nosotros 
                para encontrar su hogar perfecto en Lleida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Contactar ahora
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-2xl transition-all duration-300">
                  Ver propiedades
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;