// endpoints/getNeedsByAlly.js
import db from '../db/knex.js';

const getNeedsByAlly = async (req, res) => {
  const { allyID } = req.params;

  if (!allyID) {
    return res.status(400).json({ message: "allyID es requerido" });
  }

  try {
    const needs = await db('needs')
      .select('*')
      .where({ allyID });

    return res.status(200).json(needs);
  } catch (err) {
    console.error("Error al obtener necesidades del aliado:", err);
    return res.status(500).json({ message: "Error interno al obtener necesidades." });
  }
};

export default getNeedsByAlly;
