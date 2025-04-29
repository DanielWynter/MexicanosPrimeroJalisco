import db from "../db/knex.js";

const getSchools = async (req, res) => {
  try {
    const schools = await db('users')
      .select('userID', 'userEmail', 'schoolID') // Puedes seleccionar los campos que quieras
      .where('userRol', 'school');

    return res.status(200).json({
      success: true,
      data: schools
    });
  } catch (error) {
    console.error('Error al obtener escuelas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener las escuelas',
      details: error.message
    });
  }
};

export default getSchools;
