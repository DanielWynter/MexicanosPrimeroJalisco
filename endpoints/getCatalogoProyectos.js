
import db from "../db/knex.js"; 

const getCatalogoProyectos = async (req, res) => {
  const { apoyo } = req.query;

  try {
    let query = db("projects as p")
      .join("moral_person as mp", "p.allyid", "mp.allyID")
      .join("natural_person as np", "p.allyid", "np.allyID")
      .join("format_school as fs", "p.schoolid", "fs.schoolID") 
      .select(
        "p.allyid",
        "mp.moralPersonID as moralPersonID",
        "np.naturalPersonID as naturalPersonID",
        "mp.orgName as organizationName",
        "mp.orgAddress as organizationAddress",
        //"ally.support as support",
        "np.npInstitution",
        "fs.schoolName",
        "p.projectname",
        "p.needs",
        "p.project_authorization"
      )
      .where("p.project_authorization","autorizado")
    /*if (apoyo) {
      query = query.whereRaw("LOWER(ally.support::text) LIKE ?", [`%${apoyo.toLowerCase()}%`]);
    } */

    const project = await query;

    res.status(200).json({
      users: project
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al cargar aliados", error: error.message });
  }
};

export default getCatalogoProyectos;
