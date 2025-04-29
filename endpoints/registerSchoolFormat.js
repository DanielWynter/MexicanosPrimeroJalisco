import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw'; // 🔥 Usa la misma clave que usaste para firmar los tokens

const registerSchoolFormat = async (req, res) => {
  const {
    schoolName,
    schoolSector,
    educationLevel,
    street,
    colony,
    municipality,
    zip,
    module,
    sustenance,
  } = req.body;

  // 🔥 Leer y verificar el token
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No se encontró el token de autenticación." });
  }

  const token = authHeader.split(" ")[1]; // Sacamos el token de "Bearer <token>"

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }

  const schoolID = decoded.schoolID;

  if (!schoolID) {
    return res.status(401).json({ message: "Token inválido: no tiene schoolID." });
  }

  // Validación básica
  if (
    !schoolName ||
    !schoolSector ||
    !educationLevel ||
    !street ||
    !colony ||
    !municipality ||
    !zip ||
    !module ||
    !sustenance
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    const [newFormatSchool] = await db("format_school")
      .insert({
        schoolID: schoolID, // 👈 ahora sacado del token verificado
        schoolName,
        schoolSector,
        educationLevel,
        street,
        colony,
        municipality,
        zip,
        module,
        sustenance,
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Escuela registrada con éxito",
      data: newFormatSchool,
    });
  } catch (error) {
    console.error("Error al registrar la escuela:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al registrar la escuela",
      details: error.message,
    });
  }
};

export default registerSchoolFormat;
