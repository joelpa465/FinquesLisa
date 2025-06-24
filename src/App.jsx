import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Layout components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages principales
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPageMinimal';
import CookiesPolicyPage from './pages/CookiesPolicyPage';

// Context
import { AuthProvider } from './context/AuthContext';
import { PropertiesProvider } from './context/PropertiesContext';

// Protected Route component
import ProtectedRoute from './components/ProtectedRoute';

// Páginas temporales inline para evitar errores (eliminadas, ahora usamos las reales)

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <PropertiesProvider>
          <Router>
            <Routes>
              {/* ========== RUTAS PÚBLICAS ========== */}
              <Route path="/*" element={
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/propiedades" element={<PropertiesPage />} />
                      <Route path="/propiedades/:id" element={<PropertyDetailPage />} />
                      <Route path="/favoritos" element={<FavoritesPage />} />
                      <Route path="/servicios" element={<ServicesPage />} />
                      <Route path="/servicios/:type" element={<ServicesPage />} />
                      <Route path="/sobre-nosotros" element={<AboutPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/contacto" element={<ContactPage />} />
                      <Route path="/cookies" element={<CookiesPolicyPage />} />
                      <Route path="/privacidad" element={<div className="p-8 text-center">Página de Privacidad - Próximamente</div>} />
                      <Route path="/terminos" element={<div className="p-8 text-center">Términos y Condiciones - Próximamente</div>} />
                      
                      {/* Ruta 404 para páginas públicas */}
                      <Route path="*" element={
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                            <p className="text-gray-600 mb-6">Página no encontrada</p>
                            <a href="/" className="btn-primary">Volver al inicio</a>
                          </div>
                        </div>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />

              {/* ========== RUTAS ADMINISTRATIVAS (SIN HEADER/FOOTER) ========== */}
              <Route path="/admin-access-fl2024" element={<AdminLoginPage />} />
              <Route 
                path="/admin-panel-fl2024" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            
            {/* Toast notifications */}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#374151',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                },
              }}
            />
          </Router>
        </PropertiesProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;