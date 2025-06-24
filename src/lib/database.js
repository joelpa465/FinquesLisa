import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Crear conexión a SQLite
const dbPath = path.join(process.cwd(), 'data', 'finques_lisa.db');
const db = new Database(dbPath);

// Configurar SQLite para mejor rendimiento
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');

// =============================================================================
// CREAR TABLAS
// =============================================================================

const createTables = () => {
  try {
    // Tabla de usuarios (administradores)
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'admin' NOT NULL,
        avatar_url TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de propiedades
    db.exec(`
      CREATE TABLE IF NOT EXISTS properties (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        title TEXT NOT NULL,
        description TEXT,
        price DECIMAL(12,2) NOT NULL,
        operation_type TEXT NOT NULL CHECK (operation_type IN ('venta', 'alquiler')),
        property_type TEXT NOT NULL CHECK (property_type IN ('piso', 'casa', 'ático', 'chalet', 'local', 'oficina', 'estudio', 'dúplex', 'otro')),
        
        -- Ubicación
        location TEXT NOT NULL,
        address TEXT,
        postal_code TEXT,
        city TEXT DEFAULT 'Lleida',
        province TEXT DEFAULT 'Lleida',
        country TEXT DEFAULT 'España',
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        
        -- Características físicas
        bedrooms INTEGER DEFAULT 0,
        bathrooms INTEGER DEFAULT 0,
        area_built DECIMAL(8,2),
        area_useful DECIMAL(8,2),
        area_plot DECIMAL(10,2),
        year_built INTEGER,
        floor INTEGER,
        has_elevator BOOLEAN DEFAULT 0,
        orientation TEXT,
        
        -- Características adicionales
        energy_certificate TEXT CHECK (energy_certificate IN ('A', 'B', 'C', 'D', 'E', 'F', 'G')),
        furnished TEXT CHECK (furnished IN ('sin_amueblar', 'semi_amueblado', 'amueblado')),
        parking_spaces INTEGER DEFAULT 0,
        storage_room BOOLEAN DEFAULT 0,
        terrace_area DECIMAL(8,2),
        garden_area DECIMAL(8,2),
        
        -- Estado y visibilidad
        is_active BOOLEAN DEFAULT 1,
        is_featured BOOLEAN DEFAULT 0,
        is_sold BOOLEAN DEFAULT 0,
        is_reserved BOOLEAN DEFAULT 0,
        status TEXT DEFAULT 'disponible' CHECK (status IN ('disponible', 'reservado', 'vendido', 'alquilado', 'retirado')),
        
        -- SEO y marketing
        slug TEXT UNIQUE,
        meta_title TEXT,
        meta_description TEXT,
        reference_code TEXT UNIQUE,
        
        -- Fechas
        available_from DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_by TEXT,
        updated_by TEXT,
        
        FOREIGN KEY (created_by) REFERENCES users(id),
        FOREIGN KEY (updated_by) REFERENCES users(id)
      )
    `);

    // Tabla de imágenes de propiedades
    db.exec(`
      CREATE TABLE IF NOT EXISTS property_images (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        property_id TEXT NOT NULL,
        url TEXT NOT NULL,
        storage_path TEXT,
        alt_text TEXT,
        is_main BOOLEAN DEFAULT 0,
        display_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);

    // Tabla de características/amenities
    db.exec(`
      CREATE TABLE IF NOT EXISTS property_features (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        property_id TEXT NOT NULL,
        feature_name TEXT NOT NULL,
        feature_category TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      )
    `);

    // Tabla de contactos/leads
    db.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        property_id TEXT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT,
        contact_type TEXT DEFAULT 'info' CHECK (contact_type IN ('info', 'visit', 'offer', 'callback')),
        preferred_contact TEXT CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
        is_read BOOLEAN DEFAULT 0,
        responded_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
      )
    `);

    // Tabla de favoritos
    db.exec(`
      CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        session_id TEXT,
        user_email TEXT,
        property_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        UNIQUE(session_id, property_id),
        UNIQUE(user_email, property_id)
      )
    `);

    console.log('✅ Tablas creadas correctamente');

  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    throw error;
  }
};

// =============================================================================
// CREAR ÍNDICES
// =============================================================================

const createIndexes = () => {
  try {
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_properties_operation_type ON properties(operation_type)',
      'CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type)',
      'CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price)',
      'CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location)',
      'CREATE INDEX IF NOT EXISTS idx_properties_is_active ON properties(is_active)',
      'CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON properties(is_featured)',
      'CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status)',
      'CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id)',
      'CREATE INDEX IF NOT EXISTS idx_property_images_is_main ON property_images(is_main)',
      'CREATE INDEX IF NOT EXISTS idx_property_features_property_id ON property_features(property_id)',
      'CREATE INDEX IF NOT EXISTS idx_contacts_property_id ON contacts(property_id)',
      'CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_contacts_is_read ON contacts(is_read)'
    ];

    indexes.forEach(index => db.exec(index));
    console.log('✅ Índices creados correctamente');

  } catch (error) {
    console.error('❌ Error creando índices:', error);
    throw error;
  }
};

// =============================================================================
// CREAR TRIGGERS
// =============================================================================

const createTriggers = () => {
  try {
    // Trigger para actualizar updated_at automáticamente
    db.exec(`
      CREATE TRIGGER IF NOT EXISTS update_properties_updated_at
      AFTER UPDATE ON properties
      BEGIN
        UPDATE properties SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);

    db.exec(`
      CREATE TRIGGER IF NOT EXISTS update_users_updated_at
      AFTER UPDATE ON users
      BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);

    // Trigger para generar slug automáticamente
    db.exec(`
      CREATE TRIGGER IF NOT EXISTS generate_property_slug
      AFTER INSERT ON properties
      WHEN NEW.slug IS NULL
      BEGIN
        UPDATE properties 
        SET slug = lower(replace(replace(replace(NEW.title, ' ', '-'), 'ñ', 'n'), 'ç', 'c')) || '-' || substr(NEW.id, 1, 8)
        WHERE id = NEW.id;
      END;
    `);

    // Trigger para generar código de referencia
    db.exec(`
      CREATE TRIGGER IF NOT EXISTS generate_reference_code
      AFTER INSERT ON properties
      WHEN NEW.reference_code IS NULL
      BEGIN
        UPDATE properties 
        SET reference_code = 'FL' || strftime('%Y', 'now') || printf('%04d', (SELECT COUNT(*) FROM properties WHERE id <= NEW.id))
        WHERE id = NEW.id;
      END;
    `);

    console.log('✅ Triggers creados correctamente');

  } catch (error) {
    console.error('❌ Error creando triggers:', error);
    throw error;
  }
};

// =============================================================================
// CREAR VISTAS
// =============================================================================

const createViews = () => {
  try {
    // Vista para propiedades con información completa
    db.exec(`
      CREATE VIEW IF NOT EXISTS properties_full AS
      SELECT 
        p.*,
        pi.url as main_image,
        GROUP_CONCAT(DISTINCT pf.feature_name) as features,
        GROUP_CONCAT(DISTINCT pi2.url) as all_images
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
      LEFT JOIN property_features pf ON p.id = pf.property_id
      LEFT JOIN property_images pi2 ON p.id = pi2.property_id
      GROUP BY p.id, pi.url;
    `);

    console.log('✅ Vistas creadas correctamente');

  } catch (error) {
    console.error('❌ Error creando vistas:', error);
    throw error;
  }
};

// =============================================================================
// DATOS INICIALES
// =============================================================================

const insertInitialData = () => {
  try {
    // Usuario administrador por defecto
    const adminExists = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?').get('admin');
    
    if (adminExists.count === 0) {
      const adminId = uuidv4();
      db.prepare(`
        INSERT INTO users (id, email, username, full_name, password_hash, role) 
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(adminId, 'admin@finqueslisa.com', 'admin', 'Administrador Finques Lisa', 'admin123', 'admin');
      
      console.log('✅ Usuario administrador creado');
    }

    // Propiedades de ejemplo
    const propertiesCount = db.prepare('SELECT COUNT(*) as count FROM properties').get();
    
    if (propertiesCount.count === 0) {
      const mockProperties = [
        {
          id: uuidv4(),
          title: "Piso moderno en el centro de Lleida",
          description: "Hermoso piso completamente renovado en el corazón de Lleida. Cuenta con acabados de alta calidad, mucha luz natural y excelente distribución.",
          price: 180000,
          operation_type: "venta",
          property_type: "piso",
          location: "Centro, Lleida",
          bedrooms: 3,
          bathrooms: 2,
          area_built: 95,
          year_built: 2020,
          is_featured: 1,
          is_active: 1
        },
        {
          id: uuidv4(),
          title: "Casa unifamiliar con jardín",
          description: "Espaciosa casa familiar con jardín privado y garaje.",
          price: 1200,
          operation_type: "alquiler",
          property_type: "casa",
          location: "Pardinyes, Lleida",
          bedrooms: 4,
          bathrooms: 3,
          area_built: 150,
          year_built: 2018,
          is_active: 1
        },
        {
          id: uuidv4(),
          title: "Ático con terraza panorámica",
          description: "Exclusivo ático con vistas panorámicas de la ciudad.",
          price: 320000,
          operation_type: "venta",
          property_type: "ático",
          location: "Ronda, Lleida",
          bedrooms: 2,
          bathrooms: 2,
          area_built: 80,
          year_built: 2021,
          is_active: 0
        }
      ];

      const insertProperty = db.prepare(`
        INSERT INTO properties (
          id, title, description, price, operation_type, property_type, location,
          bedrooms, bathrooms, area_built, year_built, is_featured, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      mockProperties.forEach(property => {
        insertProperty.run(
          property.id,
          property.title,
          property.description,
          property.price,
          property.operation_type,
          property.property_type,
          property.location,
          property.bedrooms,
          property.bathrooms,
          property.area_built,
          property.year_built,
          property.is_featured || 0,
          property.is_active
        );

        // Añadir imagen principal
        const imageId = uuidv4();
        db.prepare(`
          INSERT INTO property_images (id, property_id, url, is_main, display_order, alt_text)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(
          imageId,
          property.id,
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
          1,
          0,
          `Imagen principal de ${property.title}`
        );

        // Añadir algunas características
        const features = ['Aire acondicionado', 'Calefacción central', 'Balcón'];
        features.forEach(feature => {
          const featureId = uuidv4();
          db.prepare(`
            INSERT INTO property_features (id, property_id, feature_name, feature_category)
            VALUES (?, ?, ?, ?)
          `).run(featureId, property.id, feature, 'interior');
        });
      });

      console.log('✅ Propiedades de ejemplo creadas');
    }

  } catch (error) {
    console.error('❌ Error insertando datos iniciales:', error);
    throw error;
  }
};

// =============================================================================
// INICIALIZAR BASE DE DATOS
// =============================================================================

export const initializeDatabase = () => {
  try {
    console.log('🗄️ Inicializando base de datos local...');
    
    createTables();
    createIndexes();
    createTriggers();
    createViews();
    insertInitialData();
    
    console.log('🎉 Base de datos inicializada correctamente');
    return db;
    
  } catch (error) {
    console.error('💥 Error inicializando base de datos:', error);
    throw error;
  }
};

// =============================================================================
// EXPORTAR CONEXIÓN
// =============================================================================

export { db };
export default db;