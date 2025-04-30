import db from "../db/knex.js";
const getMisProyectos = async (req, res) => {
    const id = req.query.id;
    console.log("🟡 ID recibido:", id); //
    if (!id) {
      return res.status(400).json({ message: "Falta schoolID o allyID en query" });
    }
  
    try {
      const project = await db("projects as p")
        .leftJoin("moral_person as mp", "p.allyid", "mp.allyID")
        .leftJoin("natural_person as np", "p.allyid", "np.allyID")
        .leftJoin("format_school as fs", "p.schoolid", "fs.schoolID")
        .select(
          "p.projectid",
          "p.projectname",
          "p.needs",
          "p.status",
          "p.deliverydates",
          "fs.schoolName",
          "mp.orgName as organizationName",
          "np.npInstitution"
        )
        .where(function () {
          this.where("p.schoolid", id).orWhere("p.allyid", id);
        })
        .first();
  
      if (!project) {
        console.log("❌ No se encontró proyecto con ese ID");
        return res.status(404).json({ message: "No se encontró proyecto." });
      }
  
      console.log("✅ Proyecto encontrado:", project);
      res.status(200).json({ project });
    } catch (error) {
      console.error("Error en getMisProyectos sin token:", error.message);
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  };
  export default getMisProyectos;