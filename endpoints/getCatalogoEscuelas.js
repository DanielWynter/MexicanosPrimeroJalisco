
import db from "../db/knex.js"; 

const getCatalogoEscuelas = async (req, res) => {
  const { apoyo } = req.query;

  try {
    let query = db("school_registrations as sr")
      .join("format_school as fs", "sr.formatSchoolID", "fs.formatSchoolID")
      .join("school_data as sd", "sr.schoolDataID", "sd.schoolDataID")
      .select(
        "sr.schoolDataID as schoolID",
        "fs.schoolName",
        "fs.street",
        "fs.schoolSector",
        "fs.educationLevel",
        "sd.externalSupport"
      )
      .where("sr.status", "completed");

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
