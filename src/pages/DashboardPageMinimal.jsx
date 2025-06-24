import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertiesContext';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Save,
  X,
  LogOut,
  BarChart3,
  Building2,
  TrendingUp,
  Mail
} from 'lucide-react';
import MigrationHelper from '../components/MigrationHelper';

// Componente Modal para propiedades
const PropertyModal = ({ show, onClose, title, propertyToEdit = null }) => {
  const { addProperty, updateProperty } = useProperties();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area_built: '',
    year_built: '',
    operation_type: 'venta',
    property_type: 'piso',
    description: '',
    image: '',
    features: []
  });

  const [newFeature, setNewFeature] = useState('');

  // Prellenar formulario si estamos editando
  useEffect(() => {
    if (propertyToEdit) {
      setFormData({
        title: propertyToEdit.title || '',
        price: propertyToEdit.price || '',
        location: propertyToEdit.location || '',
        bedrooms: propertyToEdit.bedrooms || '',
        bathrooms: propertyToEdit.bathrooms || '',
        area_built: propertyToEdit.area_built || '',
        year_built: propertyToEdit.year_built || '',
        operation_type: propertyToEdit.operation_type || 'venta',
        property_type: propertyToEdit.property_type || 'piso',
        description: propertyToEdit.description || '',
        image: propertyToEdit.main_image || '',
        features: propertyToEdit.features || []
      });
    } else {
      setFormData({
        title: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area_built: '',
        year_built: '',
        operation_type: 'venta',
        property_type: 'piso',
        description: '',
        image: '',
        features: []
      });
    }
  }, [propertyToEdit, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      area_built: parseFloat(formData.area_built) || 0,
      year_built: parseInt(formData.year_built) || new Date().getFullYear(),
    };

    let result;
    if (propertyToEdit) {
      result = await updateProperty(propertyToEdit.id, propertyData);
    } else {
      result = await addProperty(propertyData);
    }

    if (result.success) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Ej: Piso moderno en el centro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (€) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="180000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Centro, Lleida"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de operación
                </label>
                <select
                  name="operation_type"
                  value={formData.operation_type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de propiedad
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="piso">Piso</option>
                  <option value="casa">Casa</option>
                  <option value="ático">Ático</option>
                  <option value="chalet">Chalet</option>
                  <option value="local">Local comercial</option>
                  <option value="oficina">Oficina</option>
                  <option value="estudio">Estudio</option>
                  <option value="dúplex">Dúplex</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Habitaciones
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="3"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baños
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="2"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Superficie (m²)
                </label>
                <input
                  type="number"
                  name="area_built"
                  value={formData.area_built}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="95"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año de construcción
                </label>
                <input
                  type="number"
                  name="year_built"
                  value={formData.year_built}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear() + 2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de imagen principal
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Describe las características principales de la propiedad..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Ej: Aire acondicionado"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Añadir
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feature)}
                      className="ml-2 text-violet-600 hover:text-violet-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {propertyToEdit ? 'Actualizar' : 'Crear'} propiedad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Componente principal del Dashboard
const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { 
    properties, 
    isLoading, 
    loadProperties, 
    deleteProperty, 
    togglePropertyStatus,
    getPropertyStats,
    getContacts,
    markContactAsRead
  } = useProperties();
  
  const navigate = useNavigate();
  
  const [currentView, setCurrentView] = useState('properties');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [contacts, setContacts] = useState([]);
  const [showMigration, setShowMigration] = useState(false);
  const [stats, setStats] = useState({
    total_properties: 0,
    active_properties: 0,
    featured_properties: 0,
    for_sale: 0,
    for_rent: 0,
    sold: 0,
    rented: 0
  });

  useEffect(() => {
    loadProperties();
    loadStats();
    if (currentView === 'contacts') {
      loadContacts();
    }
    checkForLocalData();
  }, [currentView]);

  const checkForLocalData = () => {
    const localProperties = localStorage.getItem('finques_lisa_properties');
    if (localProperties) {
      try {
        const properties = JSON.parse(localProperties);
        if (properties.length > 0) {
          setShowMigration(true);
        }
      } catch (error) {
        console.error('Error checking local data:', error);
      }
    }
  };

  const loadStats = async () => {
    try {
      const propertyStats = await getPropertyStats();
      setStats(propertyStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const contactsList = await getContacts({ limit: 50 });
      setContacts(contactsList);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-access-fl2024');
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setSelectedProperty(null);
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      const result = await deleteProperty(id);
      if (result.success) {
        await loadStats();
      }
    }
  };

  const handleToggleStatus = async (id) => {
    const result = await togglePropertyStatus(id);
    if (result.success) {
      await loadStats();
    }
  };

  const handleModalClose = async () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedProperty(null);
    await loadStats();
  };

  const handleMarkContactAsRead = async (contactId) => {
    const result = await markContactAsRead(contactId);
    if (result.success) {
      loadContacts();
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = !searchTerm || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && property.is_active) ||
      (filterStatus === 'inactive' && !property.is_active);
    
    return matchesSearch && matchesStatus;
  });

  const renderContactsView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Contactos ({contacts.length})
        </h2>
        
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay contactos</h3>
            <p className="text-gray-600">
              Los formularios de contacto aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className={`border rounded-lg p-4 ${
                  contact.is_read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      {!contact.is_read && (
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {contact.email} • {contact.phone}
                    </p>
                    <p className="text-gray-800 mb-2">{contact.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {!contact.is_read && (
                    <button
                      onClick={() => handleMarkContactAsRead(contact.id)}
                      className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Marcar como leído
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-violet-100 rounded-lg">
              <Building2 className="w-6 h-6 text-violet-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Propiedades</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_properties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Propiedades Activas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active_properties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Venta</p>
              <p className="text-2xl font-bold text-gray-900">{stats.for_sale}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Alquiler</p>
              <p className="text-2xl font-bold text-gray-900">{stats.for_rent}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Actividad</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{stats.featured_properties}</p>
            <p className="text-sm text-gray-600">Propiedades Destacadas</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => !c.is_read).length}</p>
            <p className="text-sm text-gray-600">Contactos Sin Leer</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{stats.total_properties - stats.active_properties}</p>
            <p className="text-sm text-gray-600">Propiedades Inactivas</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Finques Lisa</h1>
          <p className="text-sm text-gray-600 mt-1">Panel de administración</p>
        </div>
        
        <div className="px-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <span className="text-violet-600 font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <button
            onClick={() => setCurrentView('properties')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              currentView === 'properties' 
                ? 'bg-violet-50 text-violet-700 border border-violet-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Propiedades
          </button>
          
          <button
            onClick={() => setCurrentView('contacts')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              currentView === 'contacts' 
                ? 'bg-violet-50 text-violet-700 border border-violet-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Mail className="w-5 h-5 mr-3" />
            Contactos
            {contacts.filter(c => !c.is_read).length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {contacts.filter(c => !c.is_read).length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setCurrentView('analytics')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              currentView === 'analytics' 
                ? 'bg-violet-50 text-violet-700 border border-violet-200' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Estadísticas
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {currentView === 'properties' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-violet-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">{stats.total_properties}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Activas</p>
                  <p className="text-xl font-bold text-gray-900">{stats.active_properties}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">En venta</p>
                  <p className="text-xl font-bold text-gray-900">{stats.for_sale}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">En alquiler</p>
                  <p className="text-xl font-bold text-gray-900">{stats.for_rent}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'properties' && (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar propiedades..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent w-64"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="all">Todas</option>
                    <option value="active">Activas</option>
                    <option value="inactive">Inactivas</option>
                  </select>
                </div>

                <button
                  onClick={handleAdd}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva propiedad
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Propiedades ({filteredProperties.length})
                </h2>
                
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Cargando propiedades...</p>
                  </div>
                ) : filteredProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay propiedades</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'No se encontraron propiedades con los filtros aplicados'
                        : 'Aún no has añadido ninguna propiedad'
                      }
                    </p>
                    <button
                      onClick={handleAdd}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Añadir primera propiedad
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img
                            src={property.main_image || property.image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              property.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {property.is_active ? 'Activa' : 'Inactiva'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {property.title}
                          </h3>
                          
                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <div className="flex space-x-3">
                              {property.bedrooms > 0 && (
                                <span className="flex items-center">
                                  <Bed className="w-4 h-4 mr-1" />
                                  {property.bedrooms}
                                </span>
                              )}
                              {property.bathrooms > 0 && (
                                <span className="flex items-center">
                                  <Bath className="w-4 h-4 mr-1" />
                                  {property.bathrooms}
                                </span>
                              )}
                              {property.area_built > 0 && (
                                <span className="flex items-center">
                                  <Square className="w-4 h-4 mr-1" />
                                  {property.area_built}m²
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-lg font-bold text-gray-900">
                                €{typeof property.price === 'number' ? property.price.toLocaleString() : property.price}
                              </span>
                              {property.operation_type === 'alquiler' && (
                                <span className="text-gray-500 text-sm ml-1">/mes</span>
                              )}
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              property.operation_type === 'alquiler'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {property.operation_type}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(property)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleToggleStatus(property.id)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                title={property.is_active ? 'Desactivar' : 'Activar'}
                              >
                                {property.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => handleDelete(property.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500">
                              {property.property_type} • {property.year_built}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {currentView === 'contacts' && renderContactsView()}
        {currentView === 'analytics' && renderAnalyticsView()}
      </main>

      {showMigration && (
        <MigrationHelper onClose={() => setShowMigration(false)} />
      )}

      <PropertyModal
        show={showEditModal}
        onClose={handleModalClose}
        title="Editar Propiedad"
        propertyToEdit={selectedProperty}
      />
      
      <PropertyModal
        show={showAddModal}
        onClose={handleModalClose}
        title="Nueva Propiedad"
        propertyToEdit={null}
      />
    </div>
  );
};

export default DashboardPage;