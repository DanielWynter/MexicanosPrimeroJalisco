import db from "../db/knex.js";

const registerSchoolFormat = async (req, res) => {
  const {
    schoolName,
    schoolSector,
    educationLevel,
    street,
    colony,
    municipality,
    zip,
    module,
    sustenance,
  } = req.body;

  // Validación básica
  if (
    !schoolName ||
    !schoolSector ||
    !educationLevel ||
    !street ||
    !colony ||
    !municipality ||
    !zip ||
    !module ||
    !sustenance
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    const [newFormatSchool] = await db("format_school")
      .insert({
        schoolName: schoolName,
        schoolSector: schoolSector,
        educationLevel: educationLevel,
        street: street,
        colony: colony,
        municipality: municipality,
        zip: zip,
        module: module,
        sustenance: sustenance,
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Escuela registrada con éxito",
      data: newFormatSchool,
    });
  } catch (error) {
    console.error("Error al registrar la escuela:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al registrar la escuela",
      details: error.message,
    });
  }
};

export default registerSchoolFormat;
