import knex from 'knex';
import dbConfig from './knexfile.js'; // Asegúrate de que la ruta sea correcta

// Conexión a la base de datos utilizando el entorno 'development'
const db = knex(dbConfig.development);

db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('¡Conexión exitosa a la base de datos!');
    db.destroy();  // Cierra la conexión después de la prueba
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
