import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const getSolicitudesMatch = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userID, userRol } = decoded;

    if (!userID || !userRol) {
      return res.status(403).json({ message: 'Token inválido.' });
    }

    // 🔍 Obtener allyID o schoolID desde la tabla users
    const [userData] = await db('users').where({ userID });

    // 🧪 Logs de depuración
    console.log("🧪 userID decodificado:", userID);
    console.log("🧪 userData de tabla users:", userData);

    const foreignKey = userRol === 'school' ? userData.schoolID : userData.allyID;
    const field = userRol === 'school' ? 'schoolid' : 'allyid';
    const initiatedBy = userRol === 'school' ? 'aliado' : 'escuela';

    const proyectos = await db('projects')
      .where(field, foreignKey)
      .andWhere('initiated_by', initiatedBy)
      .andWhere('project_authorization', 'pendiente')
      .select('*');

    res.status(200).json(proyectos);
  } catch (err) {
    console.error('Error al obtener solicitudes:', err);
    res.status(500).json({ message: 'Error interno al obtener solicitudes.' });
  }
};

export default getSolicitudesMatch;

