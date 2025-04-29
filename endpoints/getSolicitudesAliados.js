import db from "../db/knex.js";

const getSolicitudesAliados = async (req, res) => {
  try {
    const users = await db("users as u")
      .leftJoin("moral_person as mp", "u.allyID", "mp.allyID")
      .leftJoin("natural_person as np", "u.allyID", "np.allyID")
      .where("u.userRol", "ally")
      .andWhereRaw('LOWER(COALESCE(TRIM("u"."userStatus"), \'\')) = ?', ['pendiente'])
      .select(
        "u.userID",
        "u.userEmail",
        "u.userStatus",
        "mp.orgName",
        "np.npInstitution"
      );

    return res.status(200).json({ users });
  } catch (error) {
    console.error("❌ Error en getSolicitudesAliados:", error);
    return res.status(500).json({
      message: "Error al obtener aliados pendientes",
      error: error.message
    });
  }
};

export default getSolicitudesAliados;

