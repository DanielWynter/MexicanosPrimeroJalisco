// Archivo: config/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Carga variables de .env

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (toEmail, token) => {
  // Construye el enlace completo que irá en el email
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: 'Restablecimiento de Contraseña - Mexicanos Primero Jalisco',
    text: `Has solicitado restablecer tu contraseña.\n\nHaz clic en el siguiente enlace o pégalo en tu navegador para completar el proceso (válido por 15 minutos):\n${resetLink}\n\nSi no solicitaste esto, ignora este email.`,
    html: `<p>Has solicitado restablecer tu contraseña.</p>
           <p>Haz clic en el siguiente enlace para completar el proceso (válido por 15 minutos):</p>
           <p><a href="${resetLink}">Restablecer mi Contraseña</a></p>
           <p>Si el botón no funciona, copia y pega esta URL en tu navegador:</p>
           <p>${resetLink}</p>
           <p>Si no solicitaste esto, ignora este email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de reseteo (JWT) enviado a:', toEmail);
    return true; // Indica que el envío fue exitoso (o al menos no falló)
  } catch (error) {
    console.error('Error al enviar email de reseteo:', error);
    return false; // Indica que hubo un error
  }
};