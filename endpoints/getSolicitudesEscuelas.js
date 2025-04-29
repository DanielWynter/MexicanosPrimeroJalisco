import db from "../db/knex.js";

const getSolicitudesEscuelas = async (req, res) => {
  try {
    const users = await db("users as u")
      .leftJoin("format_school as fs", "u.schoolID", "fs.schoolID")
      .where("u.userRol", "school")
      .andWhereRaw('LOWER(COALESCE(TRIM("u"."userStatus"), \'\')) = ?', ['pendiente'])
      .select(
        "u.userID",
        "u.userEmail",
        "u.userStatus",
        "fs.schoolName"
      );

    res.status(200).json({ users });
  } catch (error) {
    console.error("❌ Error en getSolicitudesEscuelas:", error);
    res.status(500).json({ message: "Error al obtener escuelas pendientes", error: error.message });
  }
};

export default getSolicitudesEscuelas;
