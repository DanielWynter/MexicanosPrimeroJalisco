import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const getCatalogoEscuelas = async (req, res) => {
  const { apoyo } = req.query;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ message: "Token inválido" });
    }

    const userID = decoded.userID;
    if (!userID) return res.status(403).json({ message: "No autorizado" });

    // 1️⃣ Armamos la query como hiciste con aliados
    let query = db("schools as s")
      .leftJoin("needs as n", "s.schoolID", "n.schoolID")
      .leftJoin("format_school as fs", "s.schoolID", "fs.schoolID")
      .leftJoin("principal as p", "s.schoolID", "p.schoolID")
      .select(
        "s.schoolID",
        "fs.schoolName",
        "fs.street",
        "fs.colony",
        "fs.municipality",
        "fs.zip",
        "fs.schoolSector",
        "fs.educationLevel",
        "p.principalName",
        "p.principalEmail",
        "n.necessityType as necessityType"
      )
      .whereNotNull("s.schoolID");

    // 2️⃣ Filtrar por tipo de apoyo si se proporciona
    if (apoyo) {
      query = query.whereRaw(
        "LOWER(n.necessityType) LIKE ?",
        [`%${apoyo.toLowerCase()}%`]
      );
    }

    const schools = await query;

    return res.status(200).json({ users: schools });

  } catch (error) {
    console.error("❌ Error al cargar escuelas:", error);
    return res.status(400).json({ message: "Error al cargar escuelas", error: error.message });
  }
};

export default getCatalogoEscuelas;
