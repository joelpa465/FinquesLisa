import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const PropertiesContext = createContext();

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties debe usarse dentro de PropertiesProvider');
  }
  return context;
};

// Datos de ejemplo
const mockProperties = [
  {
    id: 1,
    title: "Piso moderno en el centro de Lleida",
    description: "Hermoso piso completamente renovado en el corazón de Lleida. Cuenta con acabados de alta calidad, mucha luz natural y excelente distribución.",
    price: 180000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560449496-c0c5e1e5c7f7?w=800&h=600&fit=crop"
    ],
    location: "Centro, Lleida",
    address: "Carrer Major, 45, 25007 Lleida",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    yearBuilt: 2020,
    isFeatured: true,
    isActive: true,
    operationType: "venta",
    propertyType: "piso",
    features: [
      "Ascensor",
      "Calefacción central",
      "Aire acondicionado",
      "Balcón",
      "Cocina equipada",
      "Armarios empotrados"
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  // ... más propiedades de ejemplo
];

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simular carga inicial
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cargar desde localStorage o usar mock data
      const savedProperties = localStorage.getItem('finques_lisa_properties');
      if (savedProperties) {
        setProperties(JSON.parse(savedProperties));
      } else {
        setProperties(mockProperties);
        localStorage.setItem('finques_lisa_properties', JSON.stringify(mockProperties));
      }
    } catch (err) {
      setError('Error al cargar las propiedades');
      console.error('Error loading properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (updatedProperties) => {
    localStorage.setItem('finques_lisa_properties', JSON.stringify(updatedProperties));
  };

  const addProperty = async (propertyData) => {
    try {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProperty = {
        ...propertyData,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      };
      
      const updatedProperties = [...properties, newProperty];
      setProperties(updatedProperties);
      saveToStorage(updatedProperties);
      
      toast.success('Propiedad añadida correctamente');
      return { success: true, property: newProperty };
    } catch (err) {
      setError('Error al añadir la propiedad');
      toast.error('Error al añadir la propiedad');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id, propertyData) => {
    try {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProperties = properties.map(property =>
        property.id === id
          ? { ...property, ...propertyData, updatedAt: new Date() }
          : property
      );
      
      setProperties(updatedProperties);
      saveToStorage(updatedProperties);
      
      toast.success('Propiedad actualizada correctamente');
      return { success: true };
    } catch (err) {
      setError('Error al actualizar la propiedad');
      toast.error('Error al actualizar la propiedad');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    try {
      setIsLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProperties = properties.filter(property => property.id !== id);
      setProperties(updatedProperties);
      saveToStorage(updatedProperties);
      
      toast.success('Propiedad eliminada correctamente');
      return { success: true };
    } catch (err) {
      setError('Error al eliminar la propiedad');
      toast.error('Error al eliminar la propiedad');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const togglePropertyStatus = async (id) => {
    try {
      const property = properties.find(p => p.id === id);
      if (!property) throw new Error('Propiedad no encontrada');
      
      await updateProperty(id, { isActive: !property.isActive });
      
      toast.success(`Propiedad ${property.isActive ? 'desactivada' : 'activada'}`);
      return { success: true };
    } catch (err) {
      toast.error('Error al cambiar el estado de la propiedad');
      return { success: false, error: err.message };
    }
  };

  const getProperty = (id) => {
    return properties.find(property => property.id === parseInt(id));
  };

  const getFeaturedProperties = () => {
    return properties.filter(property => property.isFeatured && property.isActive);
  };

  const getPropertiesByType = (operationType) => {
    return properties.filter(property => 
      property.operationType === operationType && property.isActive
    );
  };

  const searchProperties = (query) => {
    if (!query.trim()) return properties.filter(p => p.isActive);
    
    const searchTerm = query.toLowerCase();
    return properties.filter(property => 
      property.isActive && (
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
      )
    );
  };

  const getPropertyStats = () => {
    const total = properties.length;
    const active = properties.filter(p => p.isActive).length;
    const featured = properties.filter(p => p.isFeatured).length;
    const forSale = properties.filter(p => p.operationType === 'venta' && p.isActive).length;
    const forRent = properties.filter(p => p.operationType === 'alquiler' && p.isActive).length;
    
    return {
      total,
      active,
      inactive: total - active,
      featured,
      forSale,
      forRent
    };
  };

  const value = {
    // State
    properties,
    isLoading,
    error,
    
    // Actions
    loadProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    togglePropertyStatus,
    
    // Getters
    getProperty,
    getFeaturedProperties,
    getPropertiesByType,
    searchProperties,
    getPropertyStats
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
};