import db from "../db/knex.js";

const createProject = async (req, res) => {
  const {
    schoolID,
    allyID,
    projectName,
    description = null,
    needs = [],
    status = "pendiente",
    authorization = "autorizado",
    deliveryDates = []
  } = req.body;

  // Validación básica (solo los obligatorios)
  if (!schoolID || !allyID || !projectName || needs.length === 0) {
    return res.status(400).json({
      message: "Faltan campos requeridos (schoolID, allyID, projectName o necesidades)."
    });
  }

  const deliveryDatesJson = JSON.stringify(deliveryDates);

  try {
    const [newProject] = await db("projects")
      .insert({
        schoolid: schoolID,
        allyid: allyID,
        projectname: projectName,
        description,
        needs,
        status,
        project_authorization: authorization,
        deliverydates: deliveryDatesJson
      })
      .returning("*");

    res.status(201).json({
      success: true,
      message: "Proyecto creado con éxito",
      project: newProject
    });
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message
    });
  }
};

export default createProject;
