import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Home,
  PenTool,
  Tag,
  Filter,
  BookOpen,
  Star,
  Eye,
  MessageCircle
} from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos', count: 24 },
    { id: 'mercado', name: 'Mercado', count: 8 },
    { id: 'consejos', name: 'Consejos', count: 6 },
    { id: 'guias', name: 'Guías', count: 5 },
    { id: 'tendencias', name: 'Tendencias', count: 3 },
    { id: 'legal', name: 'Legal', count: 2 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "El mercado inmobiliario en Lleida: Perspectivas 2024",
      excerpt: "Análisis completo de las tendencias del mercado inmobiliario en Lleida para el próximo año, incluyendo previsiones de precios y zonas de mayor demanda.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      category: "mercado",
      author: "María García",
      date: "2024-01-15",
      readTime: "8 min",
      views: 1250,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "10 consejos para comprar tu primera vivienda",
      excerpt: "Guía esencial para primerizos en el mundo inmobiliario. Todo lo que necesitas saber antes de dar el paso más importante de tu vida.",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
      category: "consejos",
      author: "Josep Martínez",
      date: "2024-01-12",
      readTime: "12 min",
      views: 2100,
      comments: 45,
      featured: true
    }
  ];

  const recentPosts = [
    {
      id: 3,
      title: "Cómo valorar una propiedad correctamente",
      excerpt: "Los factores clave que determinan el precio de una vivienda y cómo hacer una valoración precisa.",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=250&fit=crop",
      category: "guias",
      author: "Anna Rodríguez",
      date: "2024-01-10",
      readTime: "6 min",
      views: 890,
      comments: 12
    },
    {
      id: 4,
      title: "Tendencias en diseño de interiores 2024",
      excerpt: "Las últimas tendencias que están marcando el diseño de hogares este año.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
      category: "tendencias",
      author: "David López",
      date: "2024-01-08",
      readTime: "5 min",
      views: 650,
      comments: 8
    },
    {
      id: 5,
      title: "Aspectos legales de la compraventa inmobiliaria",
      excerpt: "Todo lo que debes saber sobre los aspectos legales en las transacciones inmobiliarias.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
      category: "legal",
      author: "Carmen Vidal",
      date: "2024-01-05",
      readTime: "10 min",
      views: 720,
      comments: 15
    },
    {
      id: 6,
      title: "Inversión inmobiliaria: ¿Comprar para alquilar?",
      excerpt: "Analizamos si la inversión en propiedades para alquiler sigue siendo rentable en el mercado actual.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      category: "mercado",
      author: "Rafael Molina",
      date: "2024-01-03",
      readTime: "9 min",
      views: 1100,
      comments: 28
    },
    {
      id: 7,
      title: "Preparar tu hogar para la venta: Checklist completo",
      excerpt: "Una lista completa de todo lo que debes hacer para maximizar el valor de tu propiedad antes de venderla.",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=250&fit=crop",
      category: "consejos",
      author: "Elena Torres",
      date: "2024-01-01",
      readTime: "7 min",
      views: 950,
      comments: 19
    },
    {
      id: 8,
      title: "Sostenibilidad en la construcción: El futuro es verde",
      excerpt: "Cómo las construcciones sostenibles están cambiando el mercado inmobiliario y qué beneficios ofrecen.",
      image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&h=250&fit=crop",
      category: "tendencias",
      author: "Miguel Sanz",
      date: "2023-12-28",
      readTime: "11 min",
      views: 780,
      comments: 22
    }
  ];

  const allPosts = [...featuredPosts, ...recentPosts];
  
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog - Finques Lisa</title>
        <meta name="description" content="Lee nuestros artículos sobre el mercado inmobiliario, consejos de compra y venta, y las últimas tendencias del sector." />
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
                <PenTool className="w-4 h-4 mr-2 text-blue-500" />
                Blog inmobiliario
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Conocimiento que 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> transforma</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Descubre las últimas tendencias del mercado inmobiliario, consejos de expertos 
                y guías prácticas para tomar las mejores decisiones inmobiliarias.
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="relative pb-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 px-2 py-1 bg-black/10 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {selectedCategory === 'all' && (
          <section className="relative pb-20">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Artículos destacados
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold">
                              Destacado
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div className="p-8">
                          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                              {categories.find(c => c.id === post.category)?.name}
                            </span>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.date).toLocaleDateString('es-ES')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {post.views}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {post.comments}
                              </div>
                            </div>
                            
                            <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-2 transition-all">
                              Leer más
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Recent Posts Grid */}
        <section className="relative pb-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {selectedCategory === 'all' ? 'Artículos recientes' : `Artículos de ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron artículos</h3>
                  <p className="text-gray-500">Intenta cambiar los filtros o el término de búsqueda</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {(selectedCategory === 'all' ? recentPosts : filteredPosts).map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium text-xs">
                              {categories.find(c => c.id === post.category)?.name}
                            </span>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {post.views}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                {post.comments}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="relative py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white"
            >
              <h2 className="text-3xl font-bold mb-4">¿Te ha gustado nuestro contenido?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Suscríbete a nuestro newsletter y recibe los mejores artículos del sector inmobiliario 
                directamente en tu bandeja de entrada.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-colors">
                  Suscribirse
                </button>
              </div>
              
              <p className="text-sm text-blue-200 mt-4">
                📧 Un email semanal • ❌ Sin spam • 🔒 Datos protegidos
              </p>
            </motion.div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="relative pb-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Temas populares</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Mercado inmobiliario', 'Primera vivienda', 'Inversión', 'Hipotecas',
                  'Valoraciones', 'Tendencias', 'Sostenibilidad', 'Legal', 'Consejos',
                  'Lleida', 'Catalunya', 'Diseño interior'
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors shadow-sm hover:shadow-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;