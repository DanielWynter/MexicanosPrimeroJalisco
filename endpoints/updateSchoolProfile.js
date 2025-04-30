import db from "../db/knex.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "93nd29jdjADJ3i2@@!aSDh3ndakllw";

const updateSchoolProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }

  const { userID, userRol } = decoded;

  console.log("🔐 Decoded JWT:", decoded);

  if (!userID || userRol !== "school") {
    return res.status(403).json({ message: "No autorizado" });
  }

  const { userName, userEmail, userPassword, cct } = req.body;

  if (!userName || !userEmail || !cct) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const updateData = {
      userName,
      userEmail
    };

    if (userPassword && userPassword.trim() !== "") {
      const hashed = await bcrypt.hash(userPassword, 10);
      updateData.userPassword = hashed;
    }

    // Actualizar tabla users
    await db("users").where({ userID }).update(updateData);

    // Obtener schoolID asociado
    const user = await db("users").where({ userID }).first();

    if (!user || !user.schoolID) {
      return res.status(404).json({ message: "Escuela no encontrada para este usuario" });
    }

    await db("schools")
      .where({ schoolID: user.schoolID })
      .update({ workCenterKey: cct });

    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error actualizando perfil:", error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

export default updateSchoolProfile;
