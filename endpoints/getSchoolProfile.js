import db from "../db/knex.js"; 
import jwt from 'jsonwebtoken';
const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

console.log("getSchoolProfile cargado"); // 👈 prueba de vida

const getSchoolProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const userID = decoded.userID;

  if (!userID || decoded.userRol !== "school") {
    return res.status(403).json({ message: "No autorizado: solo escuelas pueden acceder" });
  }

  try {
    const perfil = await db("users as u")
      .join("schools as s", "u.schoolID", "s.schoolID")
      .leftJoin("format_school as fs", "s.schoolID", "fs.schoolID")
      .leftJoin("principal as p", "s.schoolID", "p.schoolID")
      .select(
        "u.userName",
        "u.userEmail",
        "fs.schoolName",
        "fs.municipality",
        "fs.street",
        "fs.colony",
        "fs.zip",
        "fs.schoolSector",
        "fs.educationLevel",
        "s.workCenterKey as cct",
        "p.principalName",
        "p.principalEmail"
      )
      .where("u.userID", userID)
      .first();

    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    res.status(200).json(perfil);

  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    res.status(500).json({ message: "Error al obtener el perfil", error: error.message });
  }
};

export default getSchoolProfile;