import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw'; // Usa el mismo que en iniciarSesion.js

const verificarSesion = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Tomar el token después de "Bearer"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: 'Sesión válida',
      usuario: decoded, // Puedes devolver los datos del usuario del token si quieres
    });
  } catch (error) {
    console.error("Error verificando token:", error);
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }
};

export default verificarSesion;
