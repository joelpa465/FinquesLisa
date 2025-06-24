import { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertiesContext';
import propertiesService from '../services/propertiesService';
import { Database, Upload, CheckCircle, AlertCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MigrationHelper = ({ onClose }) => {
  const { loadProperties } = useProperties();
  const [localData, setLocalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [migrationResult, setMigrationResult] = useState(null);

  useEffect(() => {
    // Verificar si hay datos en localStorage
    const checkLocalData = () => {
      try {
        const savedProperties = localStorage.getItem('finques_lisa_properties');
        const savedFavorites = localStorage.getItem('finques_lisa_favorites');
        
        if (savedProperties) {
          const properties = JSON.parse(savedProperties);
          setLocalData({
            properties: properties,
            favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
            hasData: properties.length > 0
          });
        }
      } catch (error) {
        console.error('Error checking local data:', error);
      }
    };

    checkLocalData();
  }, []);

  const handleMigration = async () => {
    if (!localData || !localData.hasData) {
      toast.error('No hay datos para migrar');
      return;
    }

    setIsLoading(true);
    
    try {
      // Migrar propiedades
      const migrationResult = await propertiesService.migrateFromLocalStorage();
      
      if (migrationResult.success) {
        toast.success(`Migración completada: ${migrationResult.successful} propiedades migradas`);
        setMigrationResult(migrationResult);
        
        // Recargar propiedades en el contexto
        await loadProperties();
      } else {
        toast.error('Error en la migración');
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Error durante la migración');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipMigration = () => {
    // Limpiar localStorage sin migrar
    if (window.confirm('¿Estás seguro de que quieres eliminar los datos locales sin migrar?')) {
      localStorage.removeItem('finques_lisa_properties');
      localStorage.removeItem('finques_lisa_favorites');
      toast.success('Datos locales eliminados');
      onClose();
    }
  };

  if (!localData) {
    return null;
  }

  if (!localData.hasData) {
    return null; // No mostrar si no hay datos
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Database className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Migración de Datos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!migrationResult ? (
          <>
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      Datos locales detectados
                    </p>
                    <p className="text-sm text-blue-700">
                      Se encontraron <strong>{localData.properties.length} propiedades</strong> y{' '}
                      <strong>{localData.favorites.length} favoritos</strong> guardados localmente.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                ¿Quieres migrar estos datos a la base de datos de Supabase? 
                Esto permitirá que los datos se sincronicen entre dispositivos y sean más seguros.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-yellow-800">
                  <strong>Nota:</strong> Después de la migración, los datos locales se eliminarán automáticamente.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleMigration}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Migrando...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Migrar datos
                  </>
                )}
              </button>
              
              <button
                onClick={handleSkipMigration}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Eliminar
              </button>
              
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cerrar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                ¡Migración Completada!
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>✅ {migrationResult.successful} propiedades migradas exitosamente</p>
                {migrationResult.failed > 0 && (
                  <p className="text-red-600">❌ {migrationResult.failed} propiedades fallaron</p>
                )}
                <p className="text-green-600">🗑️ Datos locales eliminados</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MigrationHelper;