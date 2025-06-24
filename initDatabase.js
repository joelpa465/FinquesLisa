import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { initializeDatabase } from '../src/lib/database.js';

async function initDatabase() {
  try {
    console.log('🚀 Inicializando base de datos local de Finques Lisa...');
    
    // Crear directorio data si no existe
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
      console.log('📁 Directorio data creado');
    }
    
    // Inicializar base de datos
    initializeDatabase();
    
    console.log('🎉 ¡Base de datos inicializada correctamente!');
    console.log('');
    console.log('📋 Datos de acceso por defecto:');
    console.log('   URL: http://localhost:5173/admin-access-fl2024');
    console.log('   Usuario: admin');
    console.log('   Contraseña: admin123');
    console.log('');
    console.log('💡 Puedes ejecutar npm run dev para iniciar la aplicación');
    
  } catch (error) {
    console.error('💥 Error inicializando la base de datos:', error);
    process.exit(1);
  }
}

initDatabase();