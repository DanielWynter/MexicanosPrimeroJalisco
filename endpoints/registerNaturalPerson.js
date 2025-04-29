import db from "../db/knex.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const registerNaturalPerson = async (req, res) => {
  const {
    npName,
    npEmail,
    npPhone,
    npCURP,
    npInstitution,
    npReason,
  } = req.body;

  if (!npName || !npEmail || !npPhone || !npCURP || !npInstitution || !npReason) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const allyID = decoded.allyID;

    const [newNaturalPerson] = await db("natural_person")
      .insert({
        npName,
        npEmail,
        npPhone,
        npCURP,
        npInstitution,
        npReason,
        allyID, // 🔥 Insertar el allyID
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Registrado con éxito",
      data: newNaturalPerson,
    });
  } catch (error) {
    console.error("Error al registrar:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al registrar",
      details: error.message,
    });
  }
};

export default registerNaturalPerson;
