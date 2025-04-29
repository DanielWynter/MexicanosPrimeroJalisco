import db from "../db/knex.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const aceptarEscuela = async (req, res) => {
  const { userID } = req.params;

  if (!userID) return res.status(400).json({ message: "Falta userID" });

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const adminID = decoded.adminID;
    if (!adminID) return res.status(403).json({ message: "Solo admins pueden aceptar escuelas" });

    const updated = await db("users")
      .where({ userID })
      .update({ userStatus: "activo" })
      .returning(["userID", "userEmail", "userStatus"]);

    if (!updated.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      success: true,
      message: "Escuela aceptada exitosamente",
      data: updated[0],
    });
  } catch (error) {
    console.error("❌ Error al aceptar escuela:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al aceptar escuela",
      details: error.message
    });
  }
};

export default aceptarEscuela;
