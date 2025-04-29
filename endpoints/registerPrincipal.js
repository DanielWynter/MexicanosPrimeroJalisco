import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

// 🔥 Función para normalizar texto
const normalizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const registerPrincipal = async (req, res) => {
  // 🔐 Verificar token
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }

  const schoolID = decoded.schoolID;
  if (!schoolID) return res.status(400).json({ message: "Token inválido: falta schoolID" });

  // 📥 Datos del body
  const {
    principalName,
    principalEmail,
    principalNumber,
    principalJubilation,
    jubilationYears,
    yearsInSchool,
    schoolChange
  } = req.body;

  // 🧹 Limpiar campos
  const cleanText = (text) => {
    if (typeof text !== "string") return "";
    return text.trim();
  };

  // 🔥 Aquí aseguramos que todos los campos requeridos estén llenos
  if (
    !cleanText(principalName) ||
    !cleanText(principalEmail) ||
    !cleanText(principalNumber) ||
    !principalJubilation ||
    yearsInSchool === "" ||
    schoolChange === ""
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }  

  const seJubila = ["sí", "si", "yes"].includes(normalizeText(principalJubilation));
  const cambiaEscuela = ["sí", "si", "yes"].includes(normalizeText(schoolChange));
  const añoJubilacion = seJubila ? jubilationYears || 0 : 0;

  try {
    const [newPrincipal] = await db("principal")
      .insert({
        principalName: cleanText(principalName),
        principalEmail: cleanText(principalEmail),
        principalNumber: cleanText(principalNumber),
        principalJubilation: seJubila,
        jubilationYears: añoJubilacion,
        yearsInSchool: yearsInSchool || "0",
        schoolChange: cambiaEscuela,
        schoolID
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Director registrado con éxito",
      data: newPrincipal
    });
  } catch (error) {
    console.error("Error al registrar al director:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al registrar al director",
      details: error.message
    });
  }
};

export default registerPrincipal;
