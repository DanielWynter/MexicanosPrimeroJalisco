
import db from "../db/knex.js"; 

const getCatalogoAliados = async (req, res) => {
  const { apoyo } = req.query;

  try {
    let query = db("users as user")
      //.join("ally_format as ally", "user.allyID", "ally.allyID")
      .join("moral_person as mp", "user.allyID", "mp.allyID")
      .join("natural_person as np", "user.allyID", "np.allyID")
      .select(
        "mp.moralPersonID as moralPersonID",
        "np.naturalPersonID as naturalPersonID",
        "mp.orgName as organizationName",
        "mp.orgAddress as organizationAddress",
        "mp.orgWeb as organizationWeb",
        //"ally.support as support",
        "np.npInstitution",
        "np.npPhone",
        "user.userEmail"
      )
      .whereNotNull("user.allyID")
    /*if (apoyo) {
      query = query.whereRaw("LOWER(ally.support::text) LIKE ?", [`%${apoyo.toLowerCase()}%`]);
    } */

    const ally = await query;

    res.status(200).json({
      users: ally
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al cargar aliados", error: error.message });
  }
};

export default getCatalogoAliados;
