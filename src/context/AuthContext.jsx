import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Datos de usuario de prueba (luego vendrá de la API)
const DEMO_USER = {
  id: 1,
  username: 'admin',
  password: 'admin123',
  name: 'Administrador',
  email: 'admin@finqueslisa.com',
  role: 'admin'
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('finques_lisa_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('finques_lisa_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar credenciales
      if (username === DEMO_USER.username && password === DEMO_USER.password) {
        const userData = {
          id: DEMO_USER.id,
          username: DEMO_USER.username,
          name: DEMO_USER.name,
          email: DEMO_USER.email,
          role: DEMO_USER.role
        };
        
        setUser(userData);
        localStorage.setItem('finques_lisa_user', JSON.stringify(userData));
        
        toast.success(`¡Bienvenido, ${userData.name}!`);
        return { success: true, user: userData };
      } else {
        toast.error('Credenciales incorrectas');
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Error al iniciar sesión');
      return { success: false, error: 'Error al iniciar sesión' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finques_lisa_user');
    toast.success('Sesión cerrada correctamente');
  };

  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('finques_lisa_user', JSON.stringify(updatedUser));
      
      toast.success('Perfil actualizado correctamente');
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error al actualizar el perfil');
      return { success: false, error: 'Error al actualizar el perfil' };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};