// endpoints/getNeedsBySchool.js
import db from '../db/knex.js';

const getNeedsBySchool = async (req, res) => {
  const { schoolID } = req.params;

  if (!schoolID) {
    return res.status(400).json({ message: "schoolID es requerido" });
  }

  try {
    const needs = await db('needs')
      .select('*')
      .where({ schoolID });

    return res.status(200).json(needs);
  } catch (err) {
    console.error("Error al obtener necesidades:", err);
    return res.status(500).json({ message: "Error interno al obtener necesidades." });
  }
};

export default getNeedsBySchool;
