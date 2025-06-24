import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

// Logo component inline
const FinquesLisaLogo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <svg
        className={`${sizeClasses[size]} w-auto`}
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Techo de la casa - líneas diagonales */}
        <path
          d="M15 25 L100 8 L185 25"
          stroke="#7c3aed"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Pilar izquierdo vertical */}
        <rect
          x="15"
          y="45"
          width="12"
          height="65"
          fill="#7c3aed"
        />
        
        {/* Base horizontal */}
        <rect
          x="15"
          y="100"
          width="170"
          height="10"
          fill="#7c3aed"
        />
        
        {/* Texto FINQUES */}
        <text
          x="35"
          y="40"
          fontFamily="Arial, sans-serif"
          fontSize="16"
          fontWeight="bold"
          fill="#333333"
          textAnchor="start"
        >
          FINQUES
        </text>
        
        {/* Texto lisa */}
        <text
          x="30"
          y="85"
          fontFamily="Arial, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="#333333"
          textAnchor="start"
        >
          lisa
        </text>
      </svg>
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Propiedades', href: '/propiedades' },
    { 
      name: 'Servicios', 
      href: '/servicios',
      dropdown: [
        { name: 'Venta', href: '/servicios/venta' },
        { name: 'Alquiler', href: '/servicios/alquiler' },
        { name: 'Tasaciones', href: '/servicios/tasaciones' },
        { name: 'Gestión', href: '/servicios/gestion' },
      ]
    },
    { name: 'Favoritos', href: '/favoritos' },
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-medium' 
            : 'bg-white shadow-soft'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <FinquesLisaLogo size="lg" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors">
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-gray-100 py-2"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-gray-700 hover:text-primary-600 font-medium transition-colors relative ${
                        location.pathname === item.href ? 'text-primary-600' : ''
                      }`}
                    >
                      {item.name}
                      {location.pathname === item.href && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
                          layoutId="activeTab"
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/contacto"
                className="btn-primary px-6 py-2.5"
              >
                Contactar
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container-custom py-4">
                <nav className="space-y-4">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className="block text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <div className="ml-4 space-y-2 mt-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block text-gray-600 hover:text-primary-600 transition-colors py-1"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to="/contacto"
                      className="btn-primary w-full justify-center py-3"
                    >
                      Contactar
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;