# 🏠 Configuración de Base de Datos - Finques Lisa

## 📋 Pasos para configurar Supabase

### 1. **Crear proyecto en Supabase**

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Elige tu organización
5. Nombre del proyecto: `finques-lisa`
6. Contraseña de base de datos: **Guarda esta contraseña**
7. Región: Europe West (Ireland) `eu-west-1`
8. Haz clic en "Create new project"

### 2. **Obtener credenciales**

Una vez creado el proyecto:

1. Ve a **Settings → API**
2. Copia estos valores:
   - **Project URL**: `https://tu-proyecto-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. **Configurar variables de entorno**

Crea el archivo `.env` en la raíz del proyecto:

```bash
# .env
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
VITE_APP_ENV=development
VITE_SITE_URL=http://localhost:5173
```

⚠️ **IMPORTANTE**: Agrega `.env` a tu `.gitignore` para no subir las credenciales al repositorio.

### 4. **Ejecutar el schema de base de datos**

1. Ve a **SQL Editor** en el dashboard de Supabase
2. Copia y pega todo el contenido del archivo `database/schema.sql`
3. Haz clic en "Run" para ejecutar el script
4. Verifica que se crearon las tablas sin errores

### 5. **Configurar Storage (Opcional)**

Para subida de imágenes:

1. Ve a **Storage** en Supabase
2. Crea un nuevo bucket llamado `property-images`
3. Configura como público:
   ```sql
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('property-images', 'property-images', true);
   ```
4. Configura las políticas de acceso:
   ```sql
   CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
   CREATE POLICY "Authenticated upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images');
   ```

### 6. **Verificar la instalación**

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve al dashboard admin: `http://localhost:5173/admin-access-fl2024`
   - Usuario: `admin`
   - Contraseña: `admin123`

3. Prueba añadir una propiedad nueva
4. Verifica que aparezca en la página pública: `http://localhost:5173/propiedades`

## 📁 Estructura de archivos creados/modificados

```
src/
├── lib/
│   └── supabase.js          # ✅ Configuración de Supabase
├── services/
│   └── propertiesService.js # ✅ Servicio de propiedades
├── context/
│   └── PropertiesContext.jsx # ✅ Contexto actualizado
├── pages/
│   ├── DashboardPageMinimal.jsx # ✅ Dashboard actualizado
│   └── PropertiesPage.jsx   # ✅ Página pública actualizada
database/
└── schema.sql              # ✅ Schema de base de datos
.env                        # ✅ Variables de entorno
```

## 🔧 Resolución de problemas comunes

### Error de conexión a Supabase
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el proyecto de Supabase esté activo
- Comprueba que no haya espacios extra en las variables

### Error "RLS policy violation"
- Ejecuta estas políticas en el SQL Editor:
  ```sql
  CREATE POLICY "Enable read access for all users" ON properties FOR SELECT USING (true);
  CREATE POLICY "Enable all operations for authenticated users" ON properties FOR ALL USING (auth.role() = 'authenticated');
  ```

### Las propiedades no aparecen
- Verifica que `is_active = true` en las propiedades
- Comprueba que el contexto esté funcionando en React DevTools
- Revisa la consola del navegador para errores

### Imágenes no se cargan
- Verifica que el bucket `property-images` esté configurado como público
- Comprueba las políticas de Storage
- Usa URLs de Unsplash como fallback temporalmente

## 🚀 Siguientes pasos

Una vez configurado:

1. **Migrar datos existentes** (si tienes propiedades en localStorage)
2. **Configurar autenticación real** para usuarios admin
3. **Añadir más características**:
   - Subida de múltiples imágenes
   - Geolocalización
   - Búsqueda avanzada
   - Contactos y leads
4. **Optimizar rendimiento**:
   - Paginación
   - Caché de consultas
   - Índices de base de datos

## 📞 Soporte

Si tienes problemas:
1. Revisa la [documentación de Supabase](https://supabase.com/docs)
2. Verifica los logs en el dashboard de Supabase
3. Comprueba la consola del navegador para errores
4. Consulta la [comunidad de Supabase](https://github.com/supabase/supabase/discussions)