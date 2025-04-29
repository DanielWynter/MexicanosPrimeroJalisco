// endpoints/changePassword.js (Versión JWT Final)
import db from '../db/knex.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const changePasswordController = async (req, res) => {
    const { token, newPassword } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !newPassword) return res.status(400).json({ success: false, message: "Token y nueva contraseña son requeridos" });
    if (newPassword.length < 6) return res.status(400).json({ success: false, message: "La contraseña debe tener al menos 6 caracteres" });
    if (!jwtSecret) return res.status(500).json({ success: false, message: "Error de configuración del servidor (JWT)." });

    try {
        // Verificar el token JWT (firma, expiración)
        let decodedPayload;
        try {
            decodedPayload = jwt.verify(token, jwtSecret);
        } catch (jwtError) {
            return res.status(400).json({ success: false, message: `Token inválido o expirado: ${jwtError.message}` });
        }

        // Verificar tipo de token (opcional pero bueno)
        if (decodedPayload.type !== 'password-reset') {
             return res.status(400).json({ success: false, message: "Token no válido para esta operación." });
        }

        const userId = decodedPayload.userID;
        if (!userId) return res.status(500).json({ success: false, message: "Error procesando el token (sin userID)." });

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la tabla 'users'
        const updatedCount = await db('users')
            .where({ userID: userId }) // Usa userID de tu tabla
            .update({ userPassword: hashedPassword }); // Usa userPassword de tu tabla

        if (updatedCount === 0) {
             return res.status(404).json({ success: false, message: "Usuario asociado al token no encontrado en BD." });
        }

        // Enviar éxito
        return res.status(200).json({ success: true, message: "Contraseña modificada con éxito" });

    } catch (error) {
        console.error("Error al cambiar contraseña (JWT):", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor", details: error.message });
    }
};

export default changePasswordController;