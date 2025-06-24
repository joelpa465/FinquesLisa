import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Eye, BarChart3, ExternalLink } from 'lucide-react';

const CookiesPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Política de Cookies - Finques Lisa</title>
        <meta name="description" content="Información sobre el uso de cookies en el sitio web de Finques Lisa. Conoce qué cookies utilizamos y cómo gestionamos tu privacidad." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cookie className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                Política de Cookies
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Información sobre el uso de cookies en nuestro sitio web
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-soft p-8 mb-8"
            >
              <div className="prose prose-lg max-w-none">
                {/* Introducción */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary-600" />
                    ¿Qué son las cookies?
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
                    Estas cookies nos permiten recordar tus preferencias y mejorar tu experiencia de navegación en nuestra web.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    En <strong>Finques Lisa</strong>, utilizamos cookies para ofrecerte la mejor experiencia posible, 
                    personalizar el contenido y analizar cómo utilizas nuestro sitio web.
                  </p>
                </div>

                {/* Tipos de cookies */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de cookies que utilizamos</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Cookies esenciales */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                          <Shield className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Cookies Esenciales</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Necesarias para el funcionamiento básico del sitio web.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Finalidad:</span>
                          <span className="text-gray-900">Funcionalidad básica</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duración:</span>
                          <span className="text-gray-900">Sesión</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consentimiento:</span>
                          <span className="text-green-600 font-medium">No requerido</span>
                        </div>
                      </div>
                    </div>

                    {/* Cookies analíticas */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                          <BarChart3 className="w-5 h-5 text-secondary-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Cookies Analíticas</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Nos ayudan a entender cómo interactúas con nuestro sitio.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Finalidad:</span>
                          <span className="text-gray-900">Análisis de uso</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duración:</span>
                          <span className="text-gray-900">2 años</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consentimiento:</span>
                          <span className="text-orange-600 font-medium">Requerido</span>
                        </div>
                      </div>
                    </div>

                    {/* Cookies de preferencias */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Eye className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Cookies de Preferencias</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Recuerdan tus preferencias y configuraciones.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Finalidad:</span>
                          <span className="text-gray-900">Personalización</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duración:</span>
                          <span className="text-gray-900">1 año</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consentimiento:</span>
                          <span className="text-orange-600 font-medium">Requerido</span>
                        </div>
                      </div>
                    </div>

                    {/* Cookies de marketing */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-3">
                          <ExternalLink className="w-5 h-5 text-accent-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Cookies de Marketing</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Utilizadas para mostrar publicidad relevante.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Finalidad:</span>
                          <span className="text-gray-900">Publicidad dirigida</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duración:</span>
                          <span className="text-gray-900">6 meses</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consentimiento:</span>
                          <span className="text-orange-600 font-medium">Requerido</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cookies específicas */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies específicas que utilizamos</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Nombre</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Proveedor</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Finalidad</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-mono text-sm">finques_lisa_session</td>
                          <td className="border border-gray-300 px-4 py-3">Finques Lisa</td>
                          <td className="border border-gray-300 px-4 py-3">Mantener la sesión del usuario</td>
                          <td className="border border-gray-300 px-4 py-3">Sesión</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-mono text-sm">cookiesAccepted</td>
                          <td className="border border-gray-300 px-4 py-3">Finques Lisa</td>
                          <td className="border border-gray-300 px-4 py-3">Recordar consentimiento de cookies</td>
                          <td className="border border-gray-300 px-4 py-3">1 año</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-mono text-sm">finques_lisa_preferences</td>
                          <td className="border border-gray-300 px-4 py-3">Finques Lisa</td>
                          <td className="border border-gray-300 px-4 py-3">Guardar preferencias del usuario</td>
                          <td className="border border-gray-300 px-4 py-3">6 meses</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-mono text-sm">_ga</td>
                          <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                          <td className="border border-gray-300 px-4 py-3">Distinguir usuarios únicos</td>
                          <td className="border border-gray-300 px-4 py-3">2 años</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 font-mono text-sm">_gid</td>
                          <td className="border border-gray-300 px-4 py-3">Google Analytics</td>
                          <td className="border border-gray-300 px-4 py-3">Distinguir usuarios únicos</td>
                          <td className="border border-gray-300 px-4 py-3">24 horas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Gestión de cookies */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cómo gestionar las cookies</h2>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">Configuración en nuestro sitio web</h3>
                    <p className="text-primary-800 mb-4">
                      Puedes gestionar tus preferencias de cookies en cualquier momento a través de nuestro panel de configuración.
                    </p>
                    <button className="btn-primary">
                      Configurar cookies
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Configuración en tu navegador</h3>
                  <p className="text-gray-700 mb-4">
                    También puedes configurar o deshabilitar las cookies directamente desde tu navegador:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li>• <strong>Firefox:</strong> Preferencias → Privacidad y seguridad → Cookies</li>
                    <li>• <strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                    <li>• <strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                  </ul>
                </div>

                {/* Terceros */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies de terceros</h2>
                  <p className="text-gray-700 mb-4">
                    Algunos de nuestros socios pueden establecer cookies en nuestro sitio web:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Google Analytics:</strong>
                        <span className="text-gray-700"> Nos ayuda a entender cómo los usuarios interactúan con nuestro sitio web.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">Google Maps:</strong>
                        <span className="text-gray-700"> Para mostrar la ubicación de nuestras propiedades en mapas interactivos.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-gray-900">YouTube:</strong>
                        <span className="text-gray-700"> Para mostrar videos integrados de nuestras propiedades.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Contacto */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacto</h2>
                  <p className="text-gray-700 mb-4">
                    Si tienes alguna pregunta sobre nuestra política de cookies, puedes contactarnos:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Finques Lisa</h4>
                        <p className="text-gray-700 text-sm">
                          Carrer Major, 123<br />
                          25001 Lleida, Catalunya
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Datos de contacto</h4>
                        <p className="text-gray-700 text-sm">
                          Teléfono: +34 973 123 456<br />
                          Email: info@finqueslisa.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actualización */}
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Última actualización:</strong> 29 de mayo de 2024
                  </p>
                  <p className="text-sm text-gray-600">
                    Nos reservamos el derecho de actualizar esta política de cookies. 
                    Te recomendamos revisar esta página periódicamente para estar informado de cualquier cambio.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Enlaces relacionados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-soft p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos relacionados</h3>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/privacidad" 
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Política de Privacidad
                </Link>
                <Link 
                  to="/terminos" 
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Términos y Condiciones
                </Link>
                <Link 
                  to="/contacto" 
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Contactar
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiesPolicyPage;