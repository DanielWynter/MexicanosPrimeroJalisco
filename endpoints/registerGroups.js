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
    schoolID
  } = req.body;

  if (
    !groupAPositions ||
    !groupBComplete ||
    !groupCComplete ||
    teachers === null || teachers === "" || isNaN(teachers) ||
    specialTeachers === null || specialTeachers === "" || isNaN(specialTeachers) ||
    typeof usaer !== "boolean" ||
    typeof parentsTable !== "boolean" ||
    tableAmmount === null || tableAmmount === "" || isNaN(tableAmmount) ||
    !schoolID
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }  

  try {
    // ✅ Verificar si ya existe registro con ese schoolID
    const existing = await db("groups").where({ schoolID }).first();

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Ya existe un registro de grupos para esta escuela"
      });
    }

    const [newGroup] = await db("groups")
      .insert({
        schoolID,
        groupAPositions,
        groupBComplete,
        groupCComplete,
        teachers,
        specialTeachers,
        usaer,
        usaerTeachers: usaer ? usaerTeachers : null,
        parentsTable,
        tableAmmount: parentsTable ? tableAmmount : 0
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
