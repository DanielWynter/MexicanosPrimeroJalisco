import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const registerSchoolData = async (req, res) => {
  const { schoolData } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const schoolID = decoded.schoolID;

    if (!schoolID) {
      return res.status(400).json({ message: "El token no contiene schoolID válido." });
    }

    const [schoolDataInserted] = await db("school_data")
      .insert({ ...schoolData, schoolID })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Datos finales registrados con éxito",
      data: schoolDataInserted
    });

  } catch (error) {
    console.error("Error al registrar school_data:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno",
      details: error.message
    });
  }
};

export default registerSchoolData;
