import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const aceptarAliado = async (req, res) => {
  const { userID } = req.params;

  if (!userID) {
    return res.status(400).json({ message: "Falta el userID en la URL" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const adminID = decoded.adminID;

    if (!adminID) {
      return res.status(403).json({ message: "No autorizado: solo un admin puede aceptar aliados" });
    }

    const actualizado = await db("users")
  .where({ userID })
  .update({ userStatus: "activo" }) // 👈 CORREGIDO aquí
  .returning(["userID", "userEmail", "userStatus"]);


    if (!actualizado.length) {
      return res.status(404).json({ message: "Usuario no encontrado para actualizar" });
    }

    return res.status(200).json({
      success: true,
      message: "Aliado aceptado exitosamente",
      data: actualizado[0],
    });
  } catch (error) {
    console.error("❌ Error al aceptar aliado:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al aceptar aliado",
      details: error.message
    });
  }
};

export default aceptarAliado;
