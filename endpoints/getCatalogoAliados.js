
import db from "../db/knex.js"; 

const getCatalogoAliados = async (req, res) => {
  const { apoyo } = req.query;

  try {
    let query = db("ally_format as ally")
      .join("moral_person as mp", "ally.moralPersonID", "mp.moralPersonID")
      .join("natural_person as np", "ally.naturalPersonID", "np.naturalPersonID")
      .select(
        "mp.moralPersonID as moralPersonID",
        "np.naturalPersonID as naturalPersonID",
        "mp.orgName as organizationName",
        "mp.orgAddress as organizationAddress",
        "mp.orgWeb as organizationWeb",
        //"ally.support as support",
        "np.npInstitution",
        "np.npPhone"
      )
      //.where("sr.status", "completed");
    if (apoyo) {
      query = query.whereRaw("LOWER(ally.support::text) LIKE ?", [`%${apoyo.toLowerCase()}%`]);
    }

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
