-- =============================================================================
-- FINQUES LISA - DATABASE SCHEMA
-- =============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABLAS PRINCIPALES
-- =============================================================================

-- Tabla de usuarios (administradores)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL, -- En producción usar hash bcrypt
  role VARCHAR(50) DEFAULT 'admin' NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de propiedades
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  operation_type VARCHAR(20) NOT NULL CHECK (operation_type IN ('venta', 'alquiler')),
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('piso', 'casa', 'ático', 'chalet', 'local', 'oficina', 'estudio', 'dúplex', 'otro')),
  
  -- Ubicación
  location VARCHAR(255) NOT NULL,
  address TEXT,
  postal_code VARCHAR(10),
  city VARCHAR(100) DEFAULT 'Lleida',
  province VARCHAR(100) DEFAULT 'Lleida',
  country VARCHAR(100) DEFAULT 'España',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Características físicas
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area_built DECIMAL(8,2), -- m² construidos
  area_useful DECIMAL(8,2), -- m² útiles
  area_plot DECIMAL(10,2), -- m² parcela (para casas/chalets)
  year_built INTEGER,
  floor INTEGER, -- Planta (para pisos)
  has_elevator BOOLEAN DEFAULT false,
  orientation VARCHAR(20), -- Norte, Sur, Este, Oeste, etc.
  
  -- Características adicionales
  energy_certificate VARCHAR(1) CHECK (energy_certificate IN ('A', 'B', 'C', 'D', 'E', 'F', 'G')),
  furnished VARCHAR(20) CHECK (furnished IN ('sin_amueblar', 'semi_amueblado', 'amueblado')),
  parking_spaces INTEGER DEFAULT 0,
  storage_room BOOLEAN DEFAULT false,
  terrace_area DECIMAL(8,2),
  garden_area DECIMAL(8,2),
  
  -- Estado y visibilidad
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_sold BOOLEAN DEFAULT false,
  is_reserved BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'disponible' CHECK (status IN ('disponible', 'reservado', 'vendido', 'alquilado', 'retirado')),
  
  -- SEO y marketing
  slug VARCHAR(255) UNIQUE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  reference_code VARCHAR(50) UNIQUE,
  
  -- Fechas
  available_from DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Tabla de imágenes de propiedades
CREATE TABLE IF NOT EXISTS property_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  storage_path TEXT, -- Ruta en Supabase Storage
  alt_text VARCHAR(255),
  is_main BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de características/amenities
CREATE TABLE IF NOT EXISTS property_features (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  feature_name VARCHAR(100) NOT NULL,
  feature_category VARCHAR(50), -- 'interior', 'exterior', 'building', 'location'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de contactos/leads
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  contact_type VARCHAR(20) DEFAULT 'info' CHECK (contact_type IN ('info', 'visit', 'offer', 'callback')),
  preferred_contact VARCHAR(20) CHECK (preferred_contact IN ('email', 'phone', 'whatsapp')),
  is_read BOOLEAN DEFAULT false,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de favoritos (para usuarios públicos)
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(255), -- Para usuarios no registrados
  user_email VARCHAR(255), -- Para usuarios registrados
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Evitar duplicados
  UNIQUE(session_id, property_id),
  UNIQUE(user_email, property_id)
);

-- =============================================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================================================

-- Índices para propiedades (consultas más frecuentes)
CREATE INDEX IF NOT EXISTS idx_properties_operation_type ON properties(operation_type);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_is_active ON properties(is_active);
CREATE INDEX IF NOT EXISTS idx_properties_is_featured ON properties(is_featured);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

-- Índices para búsquedas geográficas
CREATE INDEX IF NOT EXISTS idx_properties_coordinates ON properties(latitude, longitude);

-- Índices para imágenes
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_is_main ON property_images(is_main);

-- Índices para características
CREATE INDEX IF NOT EXISTS idx_property_features_property_id ON property_features(property_id);

-- Índices para contactos
CREATE INDEX IF NOT EXISTS idx_contacts_property_id ON contacts(property_id);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_is_read ON contacts(is_read);

-- =============================================================================
-- FUNCIONES Y TRIGGERS
-- =============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Función para generar slug automáticamente
CREATE OR REPLACE FUNCTION generate_property_slug()
RETURNS TRIGGER AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 0;
BEGIN
    -- Generar slug base desde el título
    base_slug := lower(trim(NEW.title));
    base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
    base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(base_slug, '-');
    
    -- Añadir ID para unicidad
    final_slug := base_slug || '-' || substring(NEW.id::text from 1 for 8);
    
    NEW.slug := final_slug;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para generar slug automáticamente
CREATE TRIGGER generate_property_slug_trigger
    BEFORE INSERT ON properties
    FOR EACH ROW
    EXECUTE FUNCTION generate_property_slug();

-- Función para generar código de referencia
CREATE OR REPLACE FUNCTION generate_reference_code()
RETURNS TRIGGER AS $$
BEGIN
    -- Generar código único: FL + año + número secuencial
    NEW.reference_code := 'FL' || 
                         EXTRACT(YEAR FROM NOW())::text || 
                         LPAD(nextval('property_reference_seq')::text, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Secuencia para códigos de referencia
CREATE SEQUENCE IF NOT EXISTS property_reference_seq START 1;

-- Trigger para código de referencia
CREATE TRIGGER generate_reference_code_trigger
    BEFORE INSERT ON properties
    FOR EACH ROW
    EXECUTE FUNCTION generate_reference_code();

-- =============================================================================
-- POLÍTICAS RLS (Row Level Security)
-- =============================================================================

-- Habilitar RLS en las tablas sensibles
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Políticas para propiedades (lectura pública, escritura solo admin)
CREATE POLICY "Propiedades públicas de lectura" ON properties
    FOR SELECT USING (is_active = true);

CREATE POLICY "Solo admin puede modificar propiedades" ON properties
    FOR ALL USING (auth.role() = 'authenticated');

-- =============================================================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- =============================================================================

-- Usuario administrador por defecto
INSERT INTO users (email, username, full_name, password_hash, role) 
VALUES (
    'admin@finqueslisa.com',
    'admin',
    'Administrador Finques Lisa',
    '$2b$10$rKLSKjRCHbS3/zPVYXKvje.xK6N5YvJ5dPKNY.8.Jh3Cq0.Kj3HHi', -- 'admin123' hasheado
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- =============================================================================
-- VISTAS ÚTILES
-- =============================================================================

-- Vista para propiedades con información completa
CREATE OR REPLACE VIEW properties_full AS
SELECT 
    p.*,
    pi.url as main_image,
    COALESCE(
        ARRAY_AGG(
            DISTINCT pf.feature_name
        ) FILTER (WHERE pf.feature_name IS NOT NULL), 
        ARRAY[]::text[]
    ) as features,
    COALESCE(
        ARRAY_AGG(
            DISTINCT pi2.url ORDER BY pi2.display_order
        ) FILTER (WHERE pi2.url IS NOT NULL), 
        ARRAY[]::text[]
    ) as all_images
FROM properties p
LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = true
LEFT JOIN property_features pf ON p.id = pf.property_id
LEFT JOIN property_images pi2 ON p.id = pi2.property_id
GROUP BY p.id, pi.url;

-- Vista para estadísticas del dashboard
CREATE OR REPLACE VIEW property_stats AS
SELECT 
    COUNT(*) as total_properties,
    COUNT(*) FILTER (WHERE is_active = true) as active_properties,
    COUNT(*) FILTER (WHERE is_featured = true) as featured_properties,
    COUNT(*) FILTER (WHERE operation_type = 'venta') as for_sale,
    COUNT(*) FILTER (WHERE operation_type = 'alquiler') as for_rent,
    COUNT(*) FILTER (WHERE status = 'vendido') as sold,
    COUNT(*) FILTER (WHERE status = 'alquilado') as rented,
    AVG(price) FILTER (WHERE operation_type = 'venta') as avg_sale_price,
    AVG(price) FILTER (WHERE operation_type = 'alquiler') as avg_rent_price
FROM properties;

-- =============================================================================
-- COMENTARIOS EN TABLAS
-- =============================================================================

COMMENT ON TABLE properties IS 'Tabla principal de propiedades inmobiliarias';
COMMENT ON TABLE property_images IS 'Imágenes asociadas a las propiedades';
COMMENT ON TABLE property_features IS 'Características y amenities de las propiedades';
COMMENT ON TABLE contacts IS 'Formularios de contacto y leads';
COMMENT ON TABLE favorites IS 'Propiedades marcadas como favoritas por usuarios';
COMMENT ON TABLE users IS 'Usuarios administradores del sistema';