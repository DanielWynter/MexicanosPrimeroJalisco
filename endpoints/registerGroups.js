import db from "../db/knex.js";

const registerGroups = async (req, res) => {
    const {
      groupAPositions,
      groupBComplete,
      groupCComplete,
      teachers,
      specialTeachers,
      usaer,
      usaerTeachers,
      parentsTable,
      tableAmmount,
    } = req.body;
  
    // Validación básica
    if (
      !groupAPositions ||
      !groupBComplete ||
      !groupCComplete ||
      teachers === undefined ||
      specialTeachers === undefined ||
      usaer === undefined ||
      parentsTable === undefined ||
      tableAmmount === undefined
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const [newGroup] = await db("groups")
        .insert({
          groupAPositions: groupAPositions,  // Las posiciones para el grupo A
          groupBComplete: groupBComplete,   // Si el grupo B está completo
          groupCComplete: groupCComplete,   // Si el grupo C está completo
          teachers,                // Número de docentes frente a grupo
          specialTeachers,         // Número de docentes para asignaturas especiales
          usaer,                   // Si tienen USAER
          usaerTeachers,           // Docentes de USAER
          parentsTable,            // Si tienen mesa de padres
          tableAmmount,            // Número de personas en la mesa de padres
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Grupo registrado con éxito",
        data: newGroup,
      });
    } catch (error) {
      console.error("Error al registrar el grupo:", error);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al registrar el grupo",
        details: error.message,
      });
    }
  };  

export default registerGroups;
