// endpoints/registerAllyOffering.js
import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const registerAllyOffering = async (req, res) => {
  const { supportType } = req.body;

  // 1) Validar supportType
  if (!supportType || typeof supportType !== 'string' || supportType.trim() === '') {
    return res.status(400).json({
      success: false,
      message: "El campo 'supportType' es requerido y debe ser un texto válido."
    });
  }

  // 2) Extraer y verificar token
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado o mal formado.' });
  }
  const token = authHeader.split(' ')[1];

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // JWT inválido o expirado
    console.error('JWT error:', err.message);
    return res.status(401).json({ success: false, message: `Token inválido: ${err.message}` });
  }

  // 3) Checar rol y allyID
  if (payload.userRol !== 'ally' || !payload.allyID) {
    return res.status(403).json({ success: false, message: 'Se requiere un aliado autenticado.' });
  }
  const allyID = payload.allyID;

  // 4) Intentar insertar en DB
  try {
    const [newOffering] = await db('needs')
      .insert({
        schoolID: null,
        allyID,
        necessityType: supportType.trim(),
      })
      .returning('*');

    console.log(`Oferta registrada para allyID=${allyID}`);
    return res.status(201).json({
      success: true,
      message: 'Ofrecimiento de apoyo registrado.',
      data: newOffering,
    });

  } catch (dbErr) {
    console.error('DB error al registrar offering:', dbErr);
    return res.status(500).json({
      success: false,
      message: 'Error interno al guardar la oferta de apoyo.',
      details: dbErr.message,
    });
  }
};

export default registerAllyOffering;
