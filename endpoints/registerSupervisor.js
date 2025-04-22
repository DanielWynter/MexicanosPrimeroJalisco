import db from "../db/knex.js";

const registerSupervisor = async (req, res) => {
  const {
    supervisorName,
    supervisorEmail,
    supervisorNumber,
    supervisorJubilation,
    supervisorJubilationYears,
    yearsInZone,
    zoneChange,
  } = req.body;

  // Validación básica
  if (
    !supervisorName ||
    !supervisorEmail ||
    !supervisorNumber ||
    supervisorJubilation === undefined ||
    !yearsInZone ||
    zoneChange === undefined
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  // Conversión de campos "sí"/"no" a booleano (mejorado para manejar más variantes)
  const seJubila = ["sí", "si", "yes"].includes(supervisorJubilation.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  const cambiaZona = ["sí", "si", "yes"].includes(zoneChange.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

  // Si el supervisor no se jubila, dejar el año en null
  const añoJubilacion = seJubila ? supervisorJubilationYears || 0 : 0;

  try {
    const [newSupervisor] = await db("supervisor")
      .insert({
        supervisorName: supervisorName,
        supervisorEmail: supervisorEmail,
        supervisorNumber: supervisorNumber,
        supervisorJubilation: seJubila,
        supervisorJubilationYears: añoJubilacion,
        yearsInZone: yearsInZone,
        zoneChange: cambiaZona,
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Supervisor registrado con éxito",
      data: newSupervisor,
    });
  } catch (error) {
    console.error("Error al registrar al supervisor:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al registrar al supervisor",
      details: error.message,
    });
  }
};

export default registerSupervisor;