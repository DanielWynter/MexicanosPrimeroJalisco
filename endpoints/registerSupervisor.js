import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const normalizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const registerSupervisor = async (req, res) => {
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

  // 📥 Extraer datos del cuerpo
  const {
    supervisorName,
    supervisorEmail,
    supervisorNumber,
    supervisorJubilation,
    supervisorJubilationYears,
    yearsInZone,
    zoneChange
  } = req.body;

  // ⚠️ Validación básica
  if (
    !supervisorName ||
    !supervisorEmail ||
    !supervisorNumber ||
    supervisorJubilation === undefined ||
    !yearsInZone ||
    zoneChange === undefined
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  const seJubila = ["sí", "si", "yes"].includes(normalizeText(supervisorJubilation));
  const cambiaZona = ["sí", "si", "yes"].includes(normalizeText(zoneChange));
  const añoJubilacion = seJubila ? supervisorJubilationYears || 0 : 0;

  try {
    const [newSupervisor] = await db("supervisor")
      .insert({
        supervisorName,
        supervisorEmail,
        supervisorNumber,
        supervisorJubilation: seJubila,
        supervisorJubilationYears: añoJubilacion,
        yearsInZone,
        zoneChange: cambiaZona,
        schoolID
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Supervisor registrado con éxito",
      data: newSupervisor
    });
  } catch (error) {
    console.error("Error al registrar al supervisor:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al registrar al supervisor",
      details: error.message
    });
  }
};

export default registerSupervisor;
