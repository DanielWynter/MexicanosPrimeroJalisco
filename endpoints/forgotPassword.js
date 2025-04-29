// endpoints/forgotPassword.js (Versión JWT Final)
import db from '../db/knex.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendResetEmail } from '../config/mailer.js'; // Importa la función de envío

dotenv.config();

const forgotPasswordController = async (req, res) => {
    const { userEmail } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    if (!userEmail) return res.status(400).json({ success: false, message: "Email es requerido" });
    if (!jwtSecret) return res.status(500).json({ success: false, message: "Error de configuración del servidor (JWT)." });

    try {
        const user = await db('users').where({ userEmail: userEmail }).first();

        // Siempre responde éxito genérico, incluso si el usuario no existe
        if (!user) {
            console.log(`Intento reseteo (JWT) para email no registrado: ${userEmail}`);
            return res.status(200).json({ success: true, message: "Si existe una cuenta asociada a este correo, recibirás un enlace para restablecer tu contraseña." });
        }

        // Crear Payload y firmar JWT con expiración de 15 minutos
        const payload = { userID: user.userID, type: 'password-reset' };
        const resetToken = jwt.sign(payload, jwtSecret, { expiresIn: '15m' });

        // Enviar el email con el token
        const emailSent = await sendResetEmail(user.userEmail, resetToken);

        if (!emailSent) {
            // Si el envío falla, informamos error interno pero no al usuario directamente
             console.error("Fallo crítico al enviar email de reseteo a:", userEmail);
             // Devolvemos 500 para indicar que algo falló en el servidor
             return res.status(500).json({ success: false, message: "No se pudo enviar el correo de restablecimiento en este momento." });
        }

        // Responder genéricamente al frontend
        return res.status(200).json({ success: true, message: "Si existe una cuenta asociada a este correo, recibirás un enlace para restablecer tu contraseña." });

    } catch (error) {
        console.error("Error en forgot password (JWT):", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor", details: error.message });
    }
};

export default forgotPasswordController;