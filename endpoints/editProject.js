import db from "../db/knex.js";

const editProject = async (req, res) => {
  const { id } = req.params;
  const {
    projectName,
    description = null,
    needs = [],
    status = null,
    deliveryDates = []
  } = req.body;

  if (!id || needs.length === 0 || !projectName) {
    return res.status(400).json({
      message: "Faltan campos requeridos (ID, nombre del proyecto o necesidades)."
    });
  }

  try {
    const updated = await db("projects")
      .where("projectid", id)
      .update({
        projectname: projectName,
        description,
        needs,
        status,
        deliverydates: JSON.stringify(deliveryDates)
      })
      .returning("*");

    res.status(200).json({
      success: true,
      message: "Proyecto modificado con éxito",
      project: updated[0]
    });
  } catch (error) {
    console.error("Error al modificar el proyecto:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message
    });
  }
};

export default editProject;

