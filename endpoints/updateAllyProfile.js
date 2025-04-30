import db from "../db/knex.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = "93nd29jdjADJ3i2@@!aSDh3ndakllw";

const updateAllyProfile = async (req, res) => {
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

  const { userName, userEmail, userPassword } = req.body;
  if (!userName || !userEmail) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const updateData = { userName, userEmail };

    if (userPassword && userPassword.trim() !== "") {
      updateData.userPassword = await bcrypt.hash(userPassword, 10);
    }

    await db("users").where({ userID }).update(updateData);
    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error("Error actualizando perfil aliado:", err);
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

export default updateAllyProfile;
