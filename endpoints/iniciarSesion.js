import db from '../db/knex.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const iniciarSesion = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const usuario = await db('users')
      .where({ userEmail })
      .select('userID', 'userEmail', 'userPassword', 'userRol', 'schoolID', 'allyID', 'adminID', 'userStatus')
      .first();

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    if (usuario.userStatus?.toLowerCase().trim() !== 'activo') {
      return res.status(403).json({ message: 'Tu cuenta aún no ha sido activada.' });
    }

    const contrasenaValida = await bcrypt.compare(userPassword, usuario.userPassword);

    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const { userID, userEmail: email, userRol, schoolID, allyID, adminID } = usuario;

    const token = jwt.sign(
      { userID, userEmail: email, userRol, schoolID, allyID, adminID },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      usuario: {
        userID,
        userEmail: email,
        userRol,
        schoolID,
        allyID,
        adminID
      },
      token
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
