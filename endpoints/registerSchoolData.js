import db from "../db/knex.js";

const registerSchoolData = async (req, res) => {
    const {
      externalSupport,
      externalSupportReceived,
      interestedPerson,
      interestedPersonName,
      inProgram,
      inProgramDetails,
      pendingProcedure,
      pendingProcedureDetails,
    } = req.body;
  
    try {
      const [newSchoolData] = await db("school_data")
        .insert({
          externalSupport,  // Las posiciones para el grupo A
          externalSupportReceived,   // Si el grupo B está completo
          interestedPerson,   // Si el grupo C está completo
          interestedPersonName,                // Número de docentes frente a grupo
          inProgram,         // Número de docentes para asignaturas especiales
          inProgramDetails,                   // Si tienen USAER
          pendingProcedure,           // Docentes de USAER
          pendingProcedureDetails,            // Si tienen mesa de padres
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Datos registrados con éxito",
        data: newSchoolData,
      });
    } catch (error) {
      console.error("Error al registrar los datos:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al registrar los datos",
        details: error.message,
      });
    }
  };  

export default registerSchoolData;
