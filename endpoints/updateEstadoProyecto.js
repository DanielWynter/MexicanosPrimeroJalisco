// endpoints/updateEstadoProyecto.js
import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const updateEstadoProyecto = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }
  const token = auth.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET);

    const { projectID } = req.params;
    const { estado } = req.body;

    if (!['autorizado', 'rechazado'].includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido.' });
    }

    const [updated] = await db('projects')
      .where({ projectid: projectID }) // aquí está la corrección
      .update({ project_authorization: estado })
      .returning('*');

    res.status(200).json({ message: 'Estado actualizado.', data: updated });
  } catch (err) {
    console.error('Error al actualizar estado del proyecto:', err);
    res.status(500).json({ message: 'Error interno al actualizar proyecto.' });
  }
};

export default updateEstadoProyecto;
