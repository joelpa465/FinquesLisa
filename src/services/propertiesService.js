import { db } from '../lib/database.js'
import { v4 as uuidv4 } from 'uuid'

class PropertiesService {
  
  // =============================================================================
  // OBTENER PROPIEDADES
  // =============================================================================
  
  async getAllProperties(filters = {}) {
    try {
      let query = `
        SELECT 
          p.*,
          pi.url as main_image,
          GROUP_CONCAT(DISTINCT pf.feature_name) as features
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
        LEFT JOIN property_features pf ON p.id = pf.property_id
        WHERE p.is_active = 1
      `;
      
      const params = [];

      // Aplicar filtros
      if (filters.operation_type && filters.operation_type !== 'all') {
        query += ` AND p.operation_type = ?`;
        params.push(filters.operation_type);
      }

      if (filters.property_type && filters.property_type !== 'all') {
        query += ` AND p.property_type = ?`;
        params.push(filters.property_type);
      }

      if (filters.min_price) {
        query += ` AND p.price >= ?`;
        params.push(filters.min_price);
      }

      if (filters.max_price) {
        query += ` AND p.price <= ?`;
        params.push(filters.max_price);
      }

      if (filters.bedrooms && filters.bedrooms !== 'all') {
        query += ` AND p.bedrooms = ?`;
        params.push(filters.bedrooms);
      }

      if (filters.location && filters.location !== 'all') {
        query += ` AND p.location LIKE ?`;
        params.push(`%${filters.location}%`);
      }

      if (filters.search) {
        query += ` AND (p.title LIKE ? OR p.location LIKE ? OR p.description LIKE ?)`;
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      query += ` GROUP BY p.id, pi.url ORDER BY p.created_at DESC`;

      // Límites y paginación
      if (filters.limit) {
        query += ` LIMIT ?`;
        params.push(filters.limit);
        
        if (filters.offset) {
          query += ` OFFSET ?`;
          params.push(filters.offset);
        }
      }

      const stmt = db.prepare(query);
      const data = stmt.all(...params);
      
      // Convertir features de string a array
      return data.map(property => ({
        ...property,
        features: property.features ? property.features.split(',') : [],
        is_active: Boolean(property.is_active),
        is_featured: Boolean(property.is_featured)
      }));

    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  }

  async getPropertyById(id) {
    try {
      const stmt = db.prepare(`
        SELECT 
          p.*,
          pi.url as main_image,
          GROUP_CONCAT(DISTINCT pf.feature_name) as features
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
        LEFT JOIN property_features pf ON p.id = pf.property_id
        WHERE p.id = ?
        GROUP BY p.id, pi.url
      `);
      
      const data = stmt.get(id);
      
      if (!data) return null;
      
      return {
        ...data,
        features: data.features ? data.features.split(',') : [],
        is_active: Boolean(data.is_active),
        is_featured: Boolean(data.is_featured)
      };

    } catch (error) {
      console.error('Error getting property by id:', error);
      throw error;
    }
  }

  async getPropertyBySlug(slug) {
    try {
      const stmt = db.prepare(`
        SELECT 
          p.*,
          pi.url as main_image,
          GROUP_CONCAT(DISTINCT pf.feature_name) as features
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
        LEFT JOIN property_features pf ON p.id = pf.property_id
        WHERE p.slug = ?
        GROUP BY p.id, pi.url
      `);
      
      const data = stmt.get(slug);
      
      if (!data) return null;
      
      return {
        ...data,
        features: data.features ? data.features.split(',') : [],
        is_active: Boolean(data.is_active),
        is_featured: Boolean(data.is_featured)
      };

    } catch (error) {
      console.error('Error getting property by slug:', error);
      throw error;
    }
  }

  async getFeaturedProperties(limit = 6) {
    try {
      const stmt = db.prepare(`
        SELECT 
          p.*,
          pi.url as main_image,
          GROUP_CONCAT(DISTINCT pf.feature_name) as features
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
        LEFT JOIN property_features pf ON p.id = pf.property_id
        WHERE p.is_active = 1 AND p.is_featured = 1
        GROUP BY p.id, pi.url
        ORDER BY p.created_at DESC
        LIMIT ?
      `);
      
      const data = stmt.all(limit);
      
      return data.map(property => ({
        ...property,
        features: property.features ? property.features.split(',') : [],
        is_active: Boolean(property.is_active),
        is_featured: Boolean(property.is_featured)
      }));

    } catch (error) {
      console.error('Error getting featured properties:', error);
      throw error;
    }
  }

  // =============================================================================
  // ADMINISTRACIÓN (CRUD)
  // =============================================================================

  async createProperty(propertyData, images = []) {
    const transaction = db.transaction(() => {
      try {
        const propertyId = uuidv4();
        
        // 1. Crear la propiedad
        const stmt = db.prepare(`
          INSERT INTO properties (
            id, title, description, price, operation_type, property_type, location,
            bedrooms, bathrooms, area_built, year_built, is_featured, is_active,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        `);
        
        stmt.run(
          propertyId,
          propertyData.title,
          propertyData.description || '',
          propertyData.price,
          propertyData.operation_type,
          propertyData.property_type,
          propertyData.location,
          propertyData.bedrooms || 0,
          propertyData.bathrooms || 0,
          propertyData.area_built || 0,
          propertyData.year_built || new Date().getFullYear(),
          propertyData.is_featured || 0,
          1 // is_active = true por defecto
        );

        // 2. Añadir imagen principal si se proporciona
        if (propertyData.image) {
          const imageId = uuidv4();
          const imageStmt = db.prepare(`
            INSERT INTO property_images (id, property_id, url, is_main, display_order, alt_text)
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          
          imageStmt.run(imageId, propertyId, propertyData.image, 1, 0, `Imagen principal de ${propertyData.title}`);
        }

        // 3. Añadir características si existen
        if (propertyData.features && propertyData.features.length > 0) {
          const featureStmt = db.prepare(`
            INSERT INTO property_features (id, property_id, feature_name, feature_category)
            VALUES (?, ?, ?, ?)
          `);
          
          propertyData.features.forEach(feature => {
            const featureId = uuidv4();
            featureStmt.run(featureId, propertyId, feature, this.categorizeFeature(feature));
          });
        }

        // Obtener la propiedad creada
        return this.getPropertyById(propertyId);

      } catch (error) {
        console.error('Error creating property:', error);
        throw error;
      }
    });

    return transaction();
  }

  async updateProperty(id, propertyData, newImages = []) {
    const transaction = db.transaction(() => {
      try {
        // 1. Actualizar datos básicos de la propiedad
        const stmt = db.prepare(`
          UPDATE properties SET
            title = ?, description = ?, price = ?, operation_type = ?, property_type = ?,
            location = ?, bedrooms = ?, bathrooms = ?, area_built = ?, year_built = ?,
            updated_at = datetime('now')
          WHERE id = ?
        `);
        
        stmt.run(
          propertyData.title,
          propertyData.description || '',
          propertyData.price,
          propertyData.operation_type,
          propertyData.property_type,
          propertyData.location,
          propertyData.bedrooms || 0,
          propertyData.bathrooms || 0,
          propertyData.area_built || 0,
          propertyData.year_built || new Date().getFullYear(),
          id
        );

        // 2. Actualizar imagen principal si se proporciona
        if (propertyData.image) {
          // Eliminar imagen principal existente
          db.prepare('DELETE FROM property_images WHERE property_id = ? AND is_main = 1').run(id);
          
          // Añadir nueva imagen principal
          const imageId = uuidv4();
          const imageStmt = db.prepare(`
            INSERT INTO property_images (id, property_id, url, is_main, display_order, alt_text)
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          
          imageStmt.run(imageId, id, propertyData.image, 1, 0, `Imagen principal actualizada`);
        }

        // 3. Actualizar características si se proporcionan
        if (propertyData.features) {
          // Eliminar características existentes
          db.prepare('DELETE FROM property_features WHERE property_id = ?').run(id);
          
          // Añadir nuevas características
          if (propertyData.features.length > 0) {
            const featureStmt = db.prepare(`
              INSERT INTO property_features (id, property_id, feature_name, feature_category)
              VALUES (?, ?, ?, ?)
            `);
            
            propertyData.features.forEach(feature => {
              const featureId = uuidv4();
              featureStmt.run(featureId, id, feature, this.categorizeFeature(feature));
            });
          }
        }

        return this.getPropertyById(id);

      } catch (error) {
        console.error('Error updating property:', error);
        throw error;
      }
    });

    return transaction();
  }

  async deleteProperty(id) {
    try {
      // SQLite con foreign keys habilitado eliminará automáticamente las imágenes y características
      const stmt = db.prepare('DELETE FROM properties WHERE id = ?');
      const result = stmt.run(id);
      
      return result.changes > 0;

    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }

  async togglePropertyStatus(id) {
    try {
      // Obtener estado actual
      const currentProperty = db.prepare('SELECT is_active FROM properties WHERE id = ?').get(id);
      
      if (!currentProperty) {
        throw new Error('Propiedad no encontrada');
      }

      // Cambiar estado
      const newStatus = currentProperty.is_active ? 0 : 1;
      const stmt = db.prepare(`
        UPDATE properties SET 
          is_active = ?, 
          updated_at = datetime('now')
        WHERE id = ?
      `);
      
      stmt.run(newStatus, id);
      
      return this.getPropertyById(id);

    } catch (error) {
      console.error('Error toggling property status:', error);
      throw error;
    }
  }

  // =============================================================================
  // ESTADÍSTICAS
  // =============================================================================

  async getPropertyStats() {
    try {
      const stats = db.prepare(`
        SELECT 
          COUNT(*) as total_properties,
          COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_properties,
          COUNT(CASE WHEN is_featured = 1 THEN 1 END) as featured_properties,
          COUNT(CASE WHEN operation_type = 'venta' AND is_active = 1 THEN 1 END) as for_sale,
          COUNT(CASE WHEN operation_type = 'alquiler' AND is_active = 1 THEN 1 END) as for_rent,
          COUNT(CASE WHEN status = 'vendido' THEN 1 END) as sold,
          COUNT(CASE WHEN status = 'alquilado' THEN 1 END) as rented,
          AVG(CASE WHEN operation_type = 'venta' THEN price END) as avg_sale_price,
          AVG(CASE WHEN operation_type = 'alquiler' THEN price END) as avg_rent_price
        FROM properties
      `).get();

      return {
        total_properties: stats.total_properties || 0,
        active_properties: stats.active_properties || 0,
        featured_properties: stats.featured_properties || 0,
        for_sale: stats.for_sale || 0,
        for_rent: stats.for_rent || 0,
        sold: stats.sold || 0,
        rented: stats.rented || 0,
        avg_sale_price: Math.round(stats.avg_sale_price || 0),
        avg_rent_price: Math.round(stats.avg_rent_price || 0)
      };

    } catch (error) {
      console.error('Error getting property stats:', error);
      throw error;
    }
  }

  // =============================================================================
  // CONTACTOS Y LEADS
  // =============================================================================

  async saveContact(contactData) {
    try {
      const contactId = uuidv4();
      const stmt = db.prepare(`
        INSERT INTO contacts (id, property_id, name, email, phone, message, contact_type, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `);
      
      stmt.run(
        contactId,
        contactData.property_id || null,
        contactData.name,
        contactData.email,
        contactData.phone || null,
        contactData.message,
        contactData.contact_type || 'info'
      );

      return this.getContactById(contactId);

    } catch (error) {
      console.error('Error saving contact:', error);
      throw error;
    }
  }

  async getContacts(filters = {}) {
    try {
      let query = `
        SELECT 
          c.*,
          p.title as property_title,
          p.reference_code as property_reference
        FROM contacts c
        LEFT JOIN properties p ON c.property_id = p.id
        WHERE 1=1
      `;
      
      const params = [];

      if (filters.is_read !== undefined) {
        query += ` AND c.is_read = ?`;
        params.push(filters.is_read ? 1 : 0);
      }

      if (filters.contact_type) {
        query += ` AND c.contact_type = ?`;
        params.push(filters.contact_type);
      }

      query += ` ORDER BY c.created_at DESC`;

      if (filters.limit) {
        query += ` LIMIT ?`;
        params.push(filters.limit);
      }

      const stmt = db.prepare(query);
      const data = stmt.all(...params);
      
      return data.map(contact => ({
        ...contact,
        is_read: Boolean(contact.is_read)
      }));

    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  }

  async getContactById(id) {
    try {
      const stmt = db.prepare(`
        SELECT 
          c.*,
          p.title as property_title,
          p.reference_code as property_reference
        FROM contacts c
        LEFT JOIN properties p ON c.property_id = p.id
        WHERE c.id = ?
      `);
      
      const data = stmt.get(id);
      
      if (!data) return null;
      
      return {
        ...data,
        is_read: Boolean(data.is_read)
      };

    } catch (error) {
      console.error('Error getting contact by id:', error);
      throw error;
    }
  }

  async markContactAsRead(contactId) {
    try {
      const stmt = db.prepare(`
        UPDATE contacts SET 
          is_read = 1,
          responded_at = datetime('now')
        WHERE id = ?
      `);
      
      stmt.run(contactId);
      
      return this.getContactById(contactId);

    } catch (error) {
      console.error('Error marking contact as read:', error);
      throw error;
    }
  }

  // =============================================================================
  // FAVORITOS
  // =============================================================================

  async addToFavorites(propertyId, sessionId = null, userEmail = null) {
    try {
      const favoriteId = uuidv4();
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO favorites (id, property_id, session_id, user_email, created_at)
        VALUES (?, ?, ?, ?, datetime('now'))
      `);
      
      stmt.run(favoriteId, propertyId, sessionId, userEmail);
      
      return { id: favoriteId, property_id: propertyId };

    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  async removeFromFavorites(propertyId, sessionId = null, userEmail = null) {
    try {
      let query = 'DELETE FROM favorites WHERE property_id = ?';
      const params = [propertyId];

      if (userEmail) {
        query += ' AND user_email = ?';
        params.push(userEmail);
      } else if (sessionId) {
        query += ' AND session_id = ?';
        params.push(sessionId);
      }

      const stmt = db.prepare(query);
      const result = stmt.run(...params);
      
      return result.changes > 0;

    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  async getFavorites(sessionId = null, userEmail = null) {
    try {
      let query = `
        SELECT 
          f.*,
          p.*,
          pi.url as main_image
        FROM favorites f
        INNER JOIN properties p ON f.property_id = p.id
        LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
        WHERE 1=1
      `;
      
      const params = [];

      if (userEmail) {
        query += ' AND f.user_email = ?';
        params.push(userEmail);
      } else if (sessionId) {
        query += ' AND f.session_id = ?';
        params.push(sessionId);
      }

      const stmt = db.prepare(query);
      const data = stmt.all(...params);
      
      return data.map(favorite => ({
        ...favorite,
        is_active: Boolean(favorite.is_active),
        is_featured: Boolean(favorite.is_featured)
      }));

    } catch (error) {
      console.error('Error getting favorites:', error);
      throw error;
    }
  }

  // =============================================================================
  // BÚSQUEDAS AVANZADAS
  // =============================================================================

  async searchProperties(searchTerm, filters = {}) {
    try {
      let query = `
        SELECT 
          p.*,
          pi.url as main_image,
          GROUP_CONCAT(DISTINCT pf.feature_name) as features
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
        LEFT JOIN property_features pf ON p.id = pf.property_id
        WHERE p.is_active = 1
      `;
      
      const params = [];

      // Búsqueda de texto
      if (searchTerm) {
        query += ` AND (p.title LIKE ? OR p.location LIKE ? OR p.description LIKE ? OR p.reference_code LIKE ?)`;
        const searchPattern = `%${searchTerm}%`;
        params.push(searchPattern, searchPattern, searchPattern, searchPattern);
      }

      // Aplicar filtros adicionales
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          switch (key) {
            case 'min_price':
              query += ` AND p.price >= ?`;
              params.push(value);
              break;
            case 'max_price':
              query += ` AND p.price <= ?`;
              params.push(value);
              break;
            case 'bedrooms':
              query += ` AND p.bedrooms = ?`;
              params.push(value);
              break;
            case 'operation_type':
              query += ` AND p.operation_type = ?`;
              params.push(value);
              break;
            case 'property_type':
              query += ` AND p.property_type = ?`;
              params.push(value);
              break;
            default:
              break;
          }
        }
      });

      query += ` GROUP BY p.id, pi.url ORDER BY p.is_featured DESC, p.created_at DESC`;

      const stmt = db.prepare(query);
      const data = stmt.all(...params);
      
      return data.map(property => ({
        ...property,
        features: property.features ? property.features.split(',') : [],
        is_active: Boolean(property.is_active),
        is_featured: Boolean(property.is_featured)
      }));

    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  }

  // =============================================================================
  // UTILIDADES
  // =============================================================================

  async getPropertyTypes() {
    try {
      const stmt = db.prepare(`
        SELECT DISTINCT property_type 
        FROM properties 
        WHERE is_active = 1 
        ORDER BY property_type
      `);
      
      const data = stmt.all();
      return data.map(row => row.property_type);

    } catch (error) {
      console.error('Error getting property types:', error);
      return [];
    }
  }

  async getLocations() {
    try {
      const stmt = db.prepare(`
        SELECT DISTINCT location 
        FROM properties 
        WHERE is_active = 1 
        ORDER BY location
      `);
      
      const data = stmt.all();
      return data.map(row => row.location);

    } catch (error) {
      console.error('Error getting locations:', error);
      return [];
    }
  }

  async getPriceRange(operationType = 'venta') {
    try {
      const stmt = db.prepare(`
        SELECT MIN(price) as min, MAX(price) as max
        FROM properties 
        WHERE is_active = 1 AND operation_type = ?
      `);
      
      const data = stmt.get(operationType);
      
      if (!data || (!data.min && !data.max)) {
        return { min: 0, max: 0 };
      }

      return {
        min: data.min || 0,
        max: data.max || 0
      };

    } catch (error) {
      console.error('Error getting price range:', error);
      return { min: 0, max: 0 };
    }
  }

  // =============================================================================
  // MIGRACIÓN DESDE LOCALSTORAGE
  // =============================================================================

  async migrateFromLocalStorage() {
    try {
      const localData = localStorage.getItem('finques_lisa_properties');
      if (!localData) {
        return { success: false, message: 'No hay datos en localStorage' };
      }

      const properties = JSON.parse(localData);
      const results = [];
      
      for (const propertyData of properties) {
        try {
          const property = await this.createProperty(propertyData);
          results.push({ success: true, property });
        } catch (error) {
          results.push({ 
            success: false, 
            error: error.message, 
            data: propertyData 
          });
        }
      }
      
      // Limpiar localStorage después de la migración exitosa
      const successful = results.filter(r => r.success).length;
      if (successful > 0) {
        localStorage.removeItem('finques_lisa_properties');
      }

      return {
        success: true,
        total: properties.length,
        successful,
        failed: results.filter(r => !r.success).length,
        results
      };

    } catch (error) {
      console.error('Error migrating from localStorage:', error);
      throw error;
    }
  }

  // =============================================================================
  // UTILIDADES AUXILIARES
  // =============================================================================

  categorizeFeature(feature) {
    const categories = {
      'interior': ['aire acondicionado', 'calefacción', 'chimenea', 'suelo radiante', 'armarios empotrados'],
      'exterior': ['terraza', 'balcón', 'jardín', 'piscina', 'barbacoa'],
      'building': ['ascensor', 'parking', 'trastero', 'portero', 'zona comunitaria'],
      'location': ['céntrico', 'zona tranquila', 'cerca metro', 'cerca colegios']
    };

    const featureLower = feature.toLowerCase();
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => featureLower.includes(keyword))) {
        return category;
      }
    }
    return 'other';
  }

  // =============================================================================
  // VALIDACIONES
  // =============================================================================

  validatePropertyData(propertyData) {
    const errors = {};

    if (!propertyData.title?.trim()) {
      errors.title = 'El título es requerido';
    }

    if (!propertyData.price || propertyData.price <= 0) {
      errors.price = 'El precio debe ser mayor a 0';
    }

    if (!propertyData.location?.trim()) {
      errors.location = 'La ubicación es requerida';
    }

    if (!propertyData.operation_type) {
      errors.operation_type = 'El tipo de operación es requerido';
    }

    if (!propertyData.property_type) {
      errors.property_type = 'El tipo de propiedad es requerido';
    }

    if (propertyData.bedrooms < 0) {
      errors.bedrooms = 'El número de habitaciones no puede ser negativo';
    }

    if (propertyData.bathrooms < 0) {
      errors.bathrooms = 'El número de baños no puede ser negativo';
    }

    if (propertyData.area_built && propertyData.area_built <= 0) {
      errors.area_built = 'La superficie debe ser mayor a 0';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

// Exportar instancia única del servicio
export const propertiesService = new PropertiesService();
export default propertiesService;