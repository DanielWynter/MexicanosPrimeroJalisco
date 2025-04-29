import db from '../db/knex.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  const { userEmail, userPassword, userRol, workCenterKey } = req.body;

  // Validación básica
  if (!userEmail || !userPassword || !userRol) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  if (userRol === 'school' && !workCenterKey) {
    return res.status(400).json({ message: 'CCT es obligatorio para escuelas' });
  }

  try {
    const userExists = await db('users').where('userEmail', userEmail).first();
    if (userExists) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const trx = await db.transaction();

    try {
      const hashedPassword = await bcrypt.hash(userPassword, 10);

      const [user] = await trx('users')
        .insert({
          userEmail,
          userPassword: hashedPassword,
          userRol,
          schoolID: null,
          allyID: null
        })
        .returning('*');

      const userID = user.userID;
      let school = null;
      let ally = null;

      if (userRol === 'school') {
        const schoolExists = await trx('schools').where('workCenterKey', workCenterKey).first();
        if (schoolExists) {
          await trx.rollback();
          return res.status(400).json({ message: 'El CCT ya está registrado' });
        }
      
        school = await trx('schools')
          .insert({ workCenterKey })
          .returning(['schoolID']);
      
        if (!school || school.length === 0) {
          await trx.rollback();
          return res.status(500).json({ message: 'Error al crear la escuela' });
        }
      
        await trx('users')
          .where('userID', userID)
          .update({ schoolID: school[0].schoolID });
      }

      if (userRol === 'ally') {
        ally = await trx('ally').insert({}).returning(['allyID']);

        await trx('users').where('userID', userID).update({
          allyID: ally[0].allyID
        });
      }

      await trx.commit();

      return res.status(201).json({
        success: true,
        message: 'Usuario registrado con éxito',
        data: {
          userID,
          schoolID: school ? school[0].schoolID : null,
          allyID: ally ? ally[0].allyID : null,
          userRol
        }
      });

    } catch (err) {
      await trx.rollback();
      console.error('Error durante el registro del usuario:', err);
      return res.status(500).json({
        success: false,
        message: 'Error durante el registro del usuario',
        details: err.message
      });
    }

  } catch (err) {
    console.error('Error general:', err);
    return res.status(500).json({
      success: false,
      message: 'Ocurrió un error en el servidor',
      details: err.message
    });
  }
};

export default registerUser;
