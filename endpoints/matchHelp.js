import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const matchHelp = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado.' });
  }

  const token = auth.split(' ')[1];
  let schoolID;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    schoolID = decoded.schoolID;
    if (!schoolID) throw new Error('schoolID faltante en JWT');
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
  }

  const { needID, allyID } = req.body;
  if (!needID || !allyID) {
    return res.status(400).json({ success: false, message: 'Faltan needID o allyID.' });
  }

  try {
    const need = await db('needs').where({ needID, schoolID }).first();
    if (!need) {
      return res.status(403).json({ success: false, message: 'No autorizado: esta necesidad no pertenece a tu escuela.' });
    }

    const [updated] = await db('needs')
      .where({ needID })
      .update({ allyID })
      .returning('*');

      const [newProject] = await db('projects')
      .insert({
        schoolid: schoolID,
        allyid: allyID, // 🔥 Corrigido aquí
        projectname: `Proyecto de ${need.necessityType || 'colaboración'}`,
        description: "Descripción pendiente",
        needs: [need.necessityType],
        status: "en progreso",
        project_authorization: "pendiente",
        deliverydates: [],
        createdat: new Date(),
        initiated_by: "escuela"
      })
      .returning("*");
    

    return res.status(200).json({
      success: true,
      message: 'Match realizado con éxito.',
      data: {
        updatedNeed: updated,
        newProject
      }
    });
  } catch (err) {
    console.error('Error en matchHelp:', err);
    return res.status(500).json({
      success: false,
      message: 'Error interno al hacer el match.'
    });
  }
};

export default matchHelp;
