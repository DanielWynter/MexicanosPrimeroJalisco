import db from "../db/knex.js";

const registerNaturalPerson = async (req, res) => {
    const {
      npName,
      npEmail,
      npPhone,
      npCURP,
      npInstitution,
      npReason,
    } = req.body;
  
    // Validación básica
    if (
      !npName ||
      !npEmail ||
      !npPhone ||
      !npCURP ||
      !npInstitution ||
      !npReason  
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const [newNaturalPerson] = await db("natural_person")
        .insert({
          npName: npName,  // Las posiciones para el grupo A
          npEmail: npEmail,   // Si el grupo B está completo
          npPhone: npPhone,   // Si el grupo C está completo
          npCURP,                // Número de docentes frente a grupo
          npInstitution,         // Número de docentes para asignaturas especiales
          npReason,                   // Si tienen USAER
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Registrado con éxito",
        data: newNaturalPerson,
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al registrar",
        details: error.message,
      });
    }
  };  

export default registerNaturalPerson;
