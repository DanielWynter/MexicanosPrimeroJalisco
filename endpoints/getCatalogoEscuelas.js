import db from "../db/knex.js"; 
import jwt from 'jsonwebtoken';
const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';


const getCatalogoEscuelas = async (req, res) => {
  const { apoyo } = req.query;

  try {
    const token = req.headers.authorization?.split(" ")[1];
if (!token) return res.status(401).json({ message: "Token no proporcionado" });

let decoded;
try {
  decoded = jwt.verify(token, JWT_SECRET);
} catch (err) {
  return res.status(401).json({ message: "Token inválido" });
}

const allyID = decoded.allyID;

if (!allyID) {
  return res.status(403).json({ message: "No autorizado: no es un aliado" });
}

    let query = db("schools as s")
      .join("format_school as fs", "s.schoolID", "fs.schoolID")  
      .join("principal as p", "s.schoolID", "p.schoolID")  
      //.join("school_data as sd", "s.schoolID", "sd.schoolID")    
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
        //"sd.externalSupport"
      )
      .whereNotNull("s.schoolID");  // Ahora directamente en la tabla 'schools'

    if (apoyo) {
      query = query.whereRaw("LOWER(sd.externalSupport::text) LIKE ?", [`%${apoyo.toLowerCase()}%`]);
    }

    const schools = await query;

    res.status(200).json({
      users: schools
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al cargar escuelas", error: error.message });
  }
};

export default getCatalogoEscuelas;