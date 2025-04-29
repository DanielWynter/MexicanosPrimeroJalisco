import db from "../db/knex.js"; 

const getCatalogoEscuelas = async (req, res) => {
  const { apoyo } = req.query;

  try {
    let query = db("schools as s")
      .join("format_school as fs", "s.schoolID", "fs.schoolID")  
      .join("principal as p", "s.schoolID", "p.schoolID")  
      //.join("school_data as sd", "s.schoolID", "sd.schoolID")    
      .select(
        "s.schoolID",
        "fs.schoolName",
        "fs.street",
        "fs.colony",
        "fs.municipality",
        "fs.zip",
        "fs.schoolSector",
        "fs.educationLevel",
        "p.principalName",
        "p.principalEmail",
        //"sd.externalSupport"
      )
      .whereNotNull("s.schoolID");  // Ahora directamente en la tabla 'schools'

    if (apoyo) {
      query = query.whereRaw("LOWER(sd.externalSupport::text) LIKE ?", [`%${apoyo.toLowerCase()}%`]);
    }

    const schools = await query;

    res.status(200).json({
      users: schools
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al cargar escuelas", error: error.message });
  }
};

export default getCatalogoEscuelas;