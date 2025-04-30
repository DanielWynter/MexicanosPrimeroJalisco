import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const matchNeed = async (req, res) => {
  // 1) Extraer y validar token
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token no proporcionado." });
  }
  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    schoolID = decoded.schoolID;
    if (!schoolID) throw new Error('schoolID faltante en JWT');
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token inválido." });
  }

  // 2) Leer parámetros de la petición
  const { needID, allyID } = req.body;
  if (!needID || !allyID) {
    return res.status(400).json({ success: false, message: 'Faltan needID o allyID.' });
  }

  try {
    // 3) Verificar que la necesidad existe y pertenece a esta escuela
    const need = await db('needs')
      .where({ id: needID, schoolID })
      .first();
    if (!need) {
      return res.status(404).json({ success: false, message: 'Need no encontrado o sin permiso.' });
    }

    // 4) Hacer el “match” asignando allyID
    const [updated] = await db('needs')
      .where({ id: needID })
      .update({ allyID })
      .returning('*');

    // 5) Responder con el registro actualizado
    return res.status(200).json({
      success: true,
      message: 'Match realizado correctamente.',
      data: updated
    });

  } catch (error) {
    console.error('Error matchNeed:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno al procesar el match.'
    });
  }
};

export default matchNeed;
