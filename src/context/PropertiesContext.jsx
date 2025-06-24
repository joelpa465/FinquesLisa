import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import propertiesService from '../services/propertiesService';

const PropertiesContext = createContext();

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties debe usarse dentro de PropertiesProvider');
  }
  return context;
};

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados adicionales para filtros y metadatos
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [priceRanges, setPriceRanges] = useState({ venta: { min: 0, max: 0 }, alquiler: { min: 0, max: 0 } });

  // =============================================================================
  // EFECTOS DE INICIALIZACIÓN
  // =============================================================================

  useEffect(() => {
    loadProperties();
    loadMetadata();
  }, []);

  // =============================================================================
  // CARGAR DATOS
  // =============================================================================

  const loadProperties = async (filters = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await propertiesService.getAllProperties(filters);
      setProperties(data);
    } catch (err) {
      setError('Error al cargar las propiedades');
      console.error('Error loading properties:', err);
      toast.error('Error al cargar las propiedades');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMetadata = async () => {
    try {
      // Cargar tipos de propiedades y ubicaciones en paralelo
      const [types, locs, priceVenta, priceAlquiler] = await Promise.all([
        propertiesService.getPropertyTypes(),
        propertiesService.getLocations(),
        propertiesService.getPriceRange('venta'),
        propertiesService.getPriceRange('alquiler')
      ]);

      setPropertyTypes(types);
      setLocations(locs);
      setPriceRanges({
        venta: priceVenta,
        alquiler: priceAlquiler
      });
    } catch (err) {
      console.error('Error loading metadata:', err);
    }
  };

  // =============================================================================
  // CRUD OPERATIONS
  // =============================================================================

  const addProperty = async (propertyData, images = []) => {
    try {
      setIsLoading(true);
      
      // Validar datos
      const validation = propertiesService.validatePropertyData(propertyData);
      if (!validation.isValid) {
        toast.error('Por favor, completa todos los campos requeridos');
        return { success: false, errors: validation.errors };
      }
      
      const newProperty = await propertiesService.createProperty(propertyData, images);
      
      // Actualizar estado local
      setProperties(prev => [newProperty, ...prev]);
      
      toast.success('Propiedad añadida correctamente');
      
      // Recargar metadatos por si hay nuevos tipos o ubicaciones
      loadMetadata();
      
      return { success: true, property: newProperty };
    } catch (err) {
      setError('Error al añadir la propiedad');
      toast.error('Error al añadir la propiedad');
      console.error('Error adding property:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id, propertyData, newImages = []) => {
    try {
      setIsLoading(true);
      
      // Validar datos
      const validation = propertiesService.validatePropertyData(propertyData);
      if (!validation.isValid) {
        toast.error('Por favor, completa todos los campos requeridos');
        return { success: false, errors: validation.errors };
      }
      
      const updatedProperty = await propertiesService.updateProperty(id, propertyData, newImages);
      
      // Actualizar estado local
      setProperties(prev => 
        prev.map(property => 
          property.id === id ? { ...property, ...updatedProperty } : property
        )
      );
      
      toast.success('Propiedad actualizada correctamente');
      
      // Recargar metadatos por si han cambiado
      loadMetadata();
      
      return { success: true, property: updatedProperty };
    } catch (err) {
      setError('Error al actualizar la propiedad');
      toast.error('Error al actualizar la propiedad');
      console.error('Error updating property:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    try {
      setIsLoading(true);
      
      await propertiesService.deleteProperty(id);
      
      // Actualizar estado local
      setProperties(prev => prev.filter(property => property.id !== id));
      
      toast.success('Propiedad eliminada correctamente');
      return { success: true };
    } catch (err) {
      setError('Error al eliminar la propiedad');
      toast.error('Error al eliminar la propiedad');
      console.error('Error deleting property:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const togglePropertyStatus = async (id) => {
    try {
      const property = properties.find(p => p.id === id);
      if (!property) {
        throw new Error('Propiedad no encontrada');
      }
      
      const updatedProperty = await propertiesService.togglePropertyStatus(id);
      
      // Actualizar estado local
      setProperties(prev => 
        prev.map(p => 
          p.id === id ? { ...p, is_active: updatedProperty.is_active } : p
        )
      );
      
      toast.success(`Propiedad ${updatedProperty.is_active ? 'activada' : 'desactivada'}`);
      return { success: true, property: updatedProperty };
    } catch (err) {
      toast.error('Error al cambiar el estado de la propiedad');
      console.error('Error toggling property status:', err);
      return { success: false, error: err.message };
    }
  };

  // =============================================================================
  // GETTERS Y BÚSQUEDAS
  // =============================================================================

  const getProperty = (id) => {
    return properties.find(property => property.id === id);
  };

  const getPropertyBySlug = async (slug) => {
    try {
      return await propertiesService.getPropertyBySlug(slug);
    } catch (err) {
      console.error('Error getting property by slug:', err);
      return null;
    }
  };

  const getFeaturedProperties = async (limit = 6) => {
    try {
      return await propertiesService.getFeaturedProperties(limit);
    } catch (err) {
      console.error('Error getting featured properties:', err);
      return [];
    }
  };

  const getPropertiesByType = (operationType) => {
    return properties.filter(property => 
      property.operation_type === operationType && property.is_active
    );
  };

  const searchProperties = async (searchTerm, filters = {}) => {
    try {
      setIsLoading(true);
      const results = await propertiesService.searchProperties(searchTerm, filters);
      return results;
    } catch (err) {
      console.error('Error searching properties:', err);
      toast.error('Error en la búsqueda');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyStats = async () => {
    try {
      return await propertiesService.getPropertyStats();
    } catch (err) {
      console.error('Error getting property stats:', err);
      return {
        total_properties: 0,
        active_properties: 0,
        featured_properties: 0,
        for_sale: 0,
        for_rent: 0,
        sold: 0,
        rented: 0,
        avg_sale_price: 0,
        avg_rent_price: 0
      };
    }
  };

  // =============================================================================
  // CONTACTOS
  // =============================================================================

  const saveContact = async (contactData) => {
    try {
      const result = await propertiesService.saveContact(contactData);
      toast.success('Mensaje enviado correctamente');
      return { success: true, contact: result };
    } catch (err) {
      toast.error('Error al enviar mensaje');
      console.error('Error saving contact:', err);
      return { success: false, error: err.message };
    }
  };

  const getContacts = async (filters = {}) => {
    try {
      return await propertiesService.getContacts(filters);
    } catch (err) {
      console.error('Error getting contacts:', err);
      return [];
    }
  };

  const markContactAsRead = async (contactId) => {
    try {
      await propertiesService.markContactAsRead(contactId);
      toast.success('Contacto marcado como leído');
      return { success: true };
    } catch (err) {
      toast.error('Error al marcar contacto');
      console.error('Error marking contact as read:', err);
      return { success: false, error: err.message };
    }
  };

  // =============================================================================
  // FAVORITOS
  // =============================================================================

  const addToFavorites = async (propertyId, sessionId = null, userEmail = null) => {
    try {
      await propertiesService.addToFavorites(propertyId, sessionId, userEmail);
      toast.success('Añadido a favoritos');
      return { success: true };
    } catch (err) {
      toast.error('Error al añadir a favoritos');
      console.error('Error adding to favorites:', err);
      return { success: false, error: err.message };
    }
  };

  const removeFromFavorites = async (propertyId, sessionId = null, userEmail = null) => {
    try {
      await propertiesService.removeFromFavorites(propertyId, sessionId, userEmail);
      toast.success('Eliminado de favoritos');
      return { success: true };
    } catch (err) {
      toast.error('Error al eliminar de favoritos');
      console.error('Error removing from favorites:', err);
      return { success: false, error: err.message };
    }
  };

  const getFavorites = async (sessionId = null, userEmail = null) => {
    try {
      return await propertiesService.getFavorites(sessionId, userEmail);
    } catch (err) {
      console.error('Error getting favorites:', err);
      return [];
    }
  };

  // =============================================================================
  // VALOR DEL CONTEXTO
  // =============================================================================

  const value = {
    // State
    properties,
    isLoading,
    error,
    propertyTypes,
    locations,
    priceRanges,
    
    // Actions - CRUD
    loadProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    togglePropertyStatus,
    
    // Actions - Contacts
    saveContact,
    getContacts,
    markContactAsRead,
    
    // Actions - Favorites
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    
    // Getters
    getProperty,
    getPropertyBySlug,
    getFeaturedProperties,
    getPropertiesByType,
    searchProperties,
    getPropertyStats,
    
    // Metadata
    loadMetadata
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
};import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import propertiesService from '../services/propertiesService';

const PropertiesContext = createContext();

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties debe usarse dentro de PropertiesProvider');
  }
  return context;
};

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados adicionales para filtros y metadatos
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [priceRanges, setPriceRanges] = useState({ venta: { min: 0, max: 0 }, alquiler: { min: 0, max: 0 } });

  // =============================================================================
  // EFECTOS DE INICIALIZACIÓN
  // =============================================================================

  useEffect(() => {
    loadProperties();
    loadMetadata();
  }, []);

  // =============================================================================
  // CARGAR DATOS
  // =============================================================================

  const loadProperties = async (filters = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await propertiesService.getAllProperties(filters);
      setProperties(data);
    } catch (err) {
      setError('Error al cargar las propiedades');
      console.error('Error loading properties:', err);
      toast.error('Error al cargar las propiedades');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMetadata = async () => {
    try {
      // Cargar tipos de propiedades y ubicaciones en paralelo
      const [types, locs, priceVenta, priceAlquiler] = await Promise.all([
        propertiesService.getPropertyTypes(),
        propertiesService.getLocations(),
        propertiesService.getPriceRange('venta'),
        propertiesService.getPriceRange('alquiler')
      ]);

      setPropertyTypes(types);
      setLocations(locs);
      setPriceRanges({
        venta: priceVenta,
        alquiler: priceAlquiler
      });
    } catch (err) {
      console.error('Error loading metadata:', err);
    }
  };

  // =============================================================================
  // CRUD OPERATIONS
  // =============================================================================

  const addProperty = async (propertyData, images = []) => {
    try {
      setIsLoading(true);
      
      // Validar datos
      const validation = propertiesService.validatePropertyData(propertyData);
      if (!validation.isValid) {
        toast.error('Por favor, completa todos los campos requeridos');
        return { success: false, errors: validation.errors };
      }
      
      const newProperty = await propertiesService.createProperty(propertyData, images);
      
      // Actualizar estado local
      setProperties(prev => [newProperty, ...prev]);
      
      toast.success('Propiedad añadida correctamente');
      
      // Recargar metadatos por si hay nuevos tipos o ubicaciones
      loadMetadata();
      
      return { success: true, property: newProperty };
    } catch (err) {
      setError('Error al añadir la propiedad');
      toast.error('Error al añadir la propiedad');
      console.error('Error adding property:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id, propertyData, newImages = []) => {
    try {
      setIsLoading(true);
      
      // Validar datos
      const validation = propertiesService.validatePropertyData(propertyData);
      if (!validation.isValid) {
        toast.error('Por favor, completa todos los campos requeridos');
        return { success: false, errors: validation.errors };
      }
      
      const updatedProperty = await propertiesService.updateProperty(id, propertyData, newImages);
      
      // Actualizar estado local
      setProperties(prev => 
        prev.map(property => 
          property.id === id ? { ...property, ...updatedProperty } : property
        )
      );
      
      toast.success('Propiedad actualizada correctamente');
      
      // Recargar metadatos por si han cambiado
      loadMetadata();
      
      return { success: true, property: updatedProperty };
    } catch (err) {
      setError('Error al actualizar la propiedad');
      toast.error('Error al actualizar la propiedad');
      console.error('Error updating property:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    try {
      setIsLoading(true);
      
      await propertiesService.deleteProperty(id);
      
      // Actualizar estado local
      setProperties(prev => prev.filter(property => property.id !== id));
      
      toast.success('Propiedad eliminada correctamente');
      return { success: true };
    } catch (err) {
      setError('Error al eliminar la propiedad');
      toast.error('Error al eliminar la propiedad');
      console.error('Error deleting property:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const togglePropertyStatus = async (id) => {
    try {
      const property = properties.find(p => p.id === id);
      if (!property) {
        throw new Error('Propiedad no encontrada');
      }
      
      const updatedProperty = await propertiesService.togglePropertyStatus(id);
      
      // Actualizar estado local
      setProperties(prev => 
        prev.map(p => 
          p.id === id ? { ...p, is_active: updatedProperty.is_active } : p
        )
      );
      
      toast.success(`Propiedad ${updatedProperty.is_active ? 'activada' : 'desactivada'}`);
      return { success: true, property: updatedProperty };
    } catch (err) {
      toast.error('Error al cambiar el estado de la propiedad');
      console.error('Error toggling property status:', err);
      return { success: false, error: err.message };
    }
  };

  // =============================================================================
  // GETTERS Y BÚSQUEDAS
  // =============================================================================

  const getProperty = (id) => {
    return properties.find(property => property.id === id);
  };

  const getPropertyBySlug = async (slug) => {
    try {
      return await propertiesService.getPropertyBySlug(slug);
    } catch (err) {
      console.error('Error getting property by slug:', err);
      return null;
    }
  };

  const getFeaturedProperties = async (limit = 6) => {
    try {
      return await propertiesService.getFeaturedProperties(limit);
    } catch (err) {
      console.error('Error getting featured properties:', err);
      return [];
    }
  };

  const getPropertiesByType = (operationType) => {
    return properties.filter(property => 
      property.operation_type === operationType && property.is_active
    );
  };

  const searchProperties = async (searchTerm, filters = {}) => {
    try {
      setIsLoading(true);
      const results = await propertiesService.searchProperties(searchTerm, filters);
      return results;
    } catch (err) {
      console.error('Error searching properties:', err);
      toast.error('Error en la búsqueda');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyStats = async () => {
    try {
      return await propertiesService.getPropertyStats();
    } catch (err) {
      console.error('Error getting property stats:', err);
      return {
        total_properties: 0,
        active_properties: 0,
        featured_properties: 0,
        for_sale: 0,
        for_rent: 0,
        sold: 0,
        rented: 0,
        avg_sale_price: 0,
        avg_rent_price: 0
      };
    }
  };

  // =============================================================================
  // GESTIÓN DE IMÁGENES
  // =============================================================================

  const addImagesToProperty = async (propertyId, images) => {
    try {
      const result = await propertiesService.addImagesToProperty(propertyId, images);
      toast.success('Imágenes añadidas correctamente');
      return { success: true, images: result };
    } catch (err) {
      toast.error('Error al añadir imágenes');
      console.error('Error adding images:', err);
      return { success: false, error: err.message };
    }
  };

  const deletePropertyImage = async (imageId) => {
    try {
      await propertiesService.deletePropertyImage(imageId);
      toast.success('Imagen eliminada correctamente');
      return { success: true };
    } catch (err) {
      toast.error('Error al eliminar imagen');
      console.error('Error deleting image:', err);
      return { success: false, error: err.message };
    }
  };

  const setMainImage = async (imageId, propertyId) => {
    try {
      await propertiesService.setMainImage(imageId, propertyId);
      toast.success('Imagen principal actualizada');
      return { success: true };
    } catch (err) {
      toast.error('Error al establecer imagen principal');
      console.error('Error setting main image:', err);
      return { success: false, error: err.message };
    }
  };

  // =============================================================================
  // CONTACTOS
  // =============================================================================

  const saveContact = async (contactData) => {
    try {
      const result = await propertiesService.saveContact(contactData);
      toast.success('Mensaje enviado correctamente');
      return { success: true, contact: result };
    } catch (err) {
      toast.error('Error al enviar mensaje');
      console.error('Error saving contact:', err);
      return { success: false, error: err.message };
    }
  };

  const getContacts = async (filters = {}) => {
    try {
      return await propertiesService.getContacts(filters);
    } catch (err) {
      console.error('Error getting contacts:', err);
      return [];
    }
  };

  const markContactAsRead = async (contactId) => {
    try {
      await propertiesService.markContactAsRead(contactId);
      toast.success('Contacto marcado como leído');
      return { success: true };
    } catch (err) {
      toast.error('Error al marcar contacto');
      console.error('Error marking contact as read:', err);
      return { success: false, error: err.message };
    }
  };

  // =============================================================================
  // FAVORITOS
  // =============================================================================

  const addToFavorites = async (propertyId, sessionId = null, userEmail = null) => {
    try {
      await propertiesService.addToFavorites(propertyId, sessionId, userEmail);
      toast.success('Añadido a favoritos');
      return { success: true };
    } catch (err) {
      toast.error('Error al añadir a favoritos');
      console.error('Error adding to favorites:', err);
      return { success: false, error: err.message };
    }
  };

  const removeFromFavorites = async (propertyId, sessionId = null, userEmail = null) => {
    try {
      await propertiesService.removeFromFavorites(propertyId, sessionId, userEmail);
      toast.success('Eliminado de favoritos');
      return { success: true };
    } catch (err) {
      toast.error('Error al eliminar de favoritos');
      console.error('Error removing from favorites:', err);
      return { success: false, error: err.message };
    }
  };

  const getFavorites = async (sessionId = null, userEmail = null) => {
    try {
      return await propertiesService.getFavorites(sessionId, userEmail);
    } catch (err) {
      console.error('Error getting favorites:', err);
      return [];
    }
  };

  // =============================================================================
  // VALOR DEL CONTEXTO
  // =============================================================================

  const value = {
    // State
    properties,
    isLoading,
    error,
    propertyTypes,
    locations,
    priceRanges,
    
    // Actions - CRUD
    loadProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    togglePropertyStatus,
    
    // Actions - Images
    addImagesToProperty,
    deletePropertyImage,
    setMainImage,
    
    // Actions - Contacts
    saveContact,
    getContacts,
    markContactAsRead,
    
    // Actions - Favorites
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    
    // Getters
    getProperty,
    getPropertyBySlug,
    getFeaturedProperties,
    getPropertiesByType,
    searchProperties,
    getPropertyStats,
    
    // Metadata
    loadMetadata
  };

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
};