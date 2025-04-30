import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "93nd29jdjADJ3i2@@!aSDh3ndakllw";

const getAllyProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const { userID, userRol } = decoded;
  if (!userID || userRol !== "ally") return res.status(403).json({ message: "No autorizado" });

  try {
    const perfil = await db("users")
      .select("userName", "userEmail")
      .where({ userID })
      .first();

    if (!perfil) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }

    res.status(200).json(perfil);
  } catch (err) {
    console.error("Error obteniendo perfil aliado:", err);
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

export default getAllyProfile;
