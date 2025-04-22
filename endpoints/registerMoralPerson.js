import db from "../db/knex.js";

const registerMoralPerson = async (req, res) => {
    const {
      orgName,
      giro,
      orgPurpose,
      orgAddress,
      orgPhone,
      orgWeb,
    } = req.body;
  
    // Validación básica
    if (
      !orgName ||
      !giro ||
      !orgPurpose ||
      !orgAddress ||
      !orgPhone ||
      !orgWeb  
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const [newMoralPerson] = await db("moral_person")
        .insert({
          orgName: orgName,  // Las posiciones para el grupo A
          giro: giro,   // Si el grupo B está completo
          orgPurpose: orgPurpose,   // Si el grupo C está completo
          orgAddress,                // Número de docentes frente a grupo
          orgPhone,         // Número de docentes para asignaturas especiales
          orgWeb,                   // Si tienen USAER
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Registrado con éxito",
        data: newMoralPerson,
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

export default registerMoralPerson;
