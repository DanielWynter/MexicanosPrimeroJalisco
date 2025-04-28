import db from '../db/knex.js';
import bcrypt from 'bcrypt';

const iniciarSesion = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  // Validación de campos
  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Buscar usuario por email
    const usuario = await db('users').where({ userEmail }).first();

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const contrasenaValida = await bcrypt.compare(userPassword, usuario.userPassword);

    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Devolver los datos relevantes del usuario
    const { userID, userRol, schoolID, allyID } = usuario;

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        userID,
        userEmail,
        userRol,
        schoolID,
        allyID
      }
    });

  } catch (error) {
    console.error('Error en iniciar sesión:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      details: error.message
    });
  }
};

export default iniciarSesion;
