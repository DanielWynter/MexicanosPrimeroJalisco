// endpoints/registerNeed.js
import db from '../db/knex.js'; // Ajusta la ruta si es necesario
import jwt from 'jsonwebtoken';

// !! IMPORTANTE: Usa la misma clave secreta que en tus otros endpoints !!
// !! RECOMENDACIÓN: Mueve esto a variables de entorno (.env) !!
const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const registerNeed = async (req, res) => {
  // 1. Extraer 'necessityType' del cuerpo de la solicitud
  const { necessityType } = req.body;

  // 2. Validación básica de entrada
  if (!necessityType) {
    return res.status(400).json({
      success: false,
      message: "Falta el campo 'necessityType' en la solicitud.",
    });
  }

  // 3. Verificar el Token de Autenticación
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado o inválido.' });
  }
  const token = authHeader.split(' ')[1];

  try {
    // 4. Decodificar el token y obtener schoolID
    const decoded = jwt.verify(token, JWT_SECRET);
    const schoolID = decoded.schoolID;

    // Asegurarse de que el token contenía un schoolID válido
    if (!schoolID) {
      return res.status(401).json({ success: false, message: 'Token inválido: no contiene schoolID.' });
    }

    // 5. Insertar la necesidad en la base de datos
    // Usamos la tabla 'needs' como la renombraste
    const [newNeed] = await db('needs') // <-- Nombre de tabla actualizado a 'needs'
      .insert({
        schoolID: schoolID,         // FK viene del token
        necessityType: necessityType, // Valor del formulario
        allyID: null                // allyID empieza como null
        // created_at y updated_at son manejados por `timestamps(true, true)`
      })
      .returning('*'); // Devuelve toda la fila insertada

    // 6. Responder con éxito
    return res.status(201).json({ // 201 Created es más apropiado para un POST exitoso
      success: true,
      message: 'Necesidad registrada con éxito.',
      data: newNeed,
    });

  } catch (error) {
    // Manejo de errores específicos de JWT
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      console.error("Error de Token:", error.message);
      return res.status(401).json({ success: false, message: `Token inválido o expirado: ${error.message}` });
    }

    // Manejo de errores generales (ej. base de datos)
    console.error("Error al registrar la necesidad:", error);
    return res.status(500).json({
      success: false,
      message: 'Hubo un error interno al registrar la necesidad.',
      details: error.message, // Puedes quitar 'details' en producción
    });
  }
};

export default registerNeed;