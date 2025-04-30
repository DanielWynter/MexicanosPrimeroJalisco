import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const matchNeed = async (req, res) => {
  // 1) Validar token
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token no proporcionado." });
  }

  const token = auth.split(' ')[1];

  let allyID;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userID, userRol } = decoded;

    if (userRol !== "ally") {
      return res.status(403).json({ success: false, message: "Solo aliados pueden hacer match." });
    }

    const [user] = await db("users").where({ userID });
    allyID = user.allyID;

    if (!allyID) {
      return res.status(403).json({ success: false, message: "No se encontró tu aliadoID." });
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token inválido." });
  }

  // 2) Leer parámetros del body
  const { needID, schoolID } = req.body;
  if (!needID || !schoolID) {
    return res.status(400).json({ success: false, message: 'Faltan needID o schoolID.' });
  }

  try {
    // 3) Verificar que la necesidad existe y pertenece a la escuela
    const need = await db('needs')
  .where({ needID, schoolID }) // ✅ usa needID como en tu base de datos
  .first();


    if (!need) {
      return res.status(404).json({ success: false, message: 'Need no encontrado o sin permiso.' });
    }

    // 4) Actualizar la necesidad con el allyID
    const [updated] = await db('needs')
      .where({ needID })
      .update({ allyID })
      .returning('*');

    // 5) Respuesta
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
