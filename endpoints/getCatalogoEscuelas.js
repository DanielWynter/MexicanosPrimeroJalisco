import db from "../db/knex.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const getCatalogoEscuelas = async (req, res) => {
  const { apoyo } = req.query;
  try {
    // Autenticación idéntica a tu código...
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });
    let decoded;
    try { decoded = jwt.verify(token, JWT_SECRET); }
    catch  { return res.status(401).json({ message: "Token inválido" }); }
    const userID = decoded.userID;
    if (!userID) return res.status(403).json({ message: "No autorizado" });

    // — Aquí viene el bloque que **DEBES** reemplazar en tu código —
    let query = db("schools as s")
      // 1️⃣ Trae las necesidades de esta escuela
      .leftJoin("needs         as n", "s.schoolID", "n.schoolID")
      // 2️⃣ Tus joins habituales
      .leftJoin("format_school as fs", "s.schoolID", "fs.schoolID")
      .leftJoin("principal     as p",  "s.schoolID", "p.schoolID")
      // 3️⃣ Selecciona TODO lo que necesitas + n.necessityType
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

    // 4️⃣ Si quieres filtro dinámico, hazlo sobre n.necessityType:
    if (apoyo) {
      query = query.whereRaw(
        "LOWER(n.necessityType) LIKE ?",
        [`%${apoyo.toLowerCase()}%`]
      );
    }

    const schools = await query;
    return res.status(200).json({ users: schools });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error al cargar escuelas", error: error.message });
  }
};

export default getCatalogoEscuelas;