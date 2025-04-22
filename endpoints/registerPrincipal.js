import db from "../db/knex.js";

const registerPrincipal = async (req, res) => {
  const {
    principalName,
    principalEmail,
    principalNumber,
    principalJubilation,
    jubilationYears,
    yearsInSchool,
    schoolChange,
  } = req.body;

  // Validación básica
  if (
    !principalName ||
    !principalEmail ||
    !principalNumber ||
    principalJubilation === undefined ||
    !yearsInSchool ||
    schoolChange === undefined
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  // Conversión de campos "sí"/"no" a booleano
  const seJubila = principalJubilation.toLowerCase() === "sí";
  const cambiaEscuela = schoolChange.toLowerCase() === "sí";

  const añoJubilacion = seJubila ? jubilationYears || 0 : 0;


  try {
    const [newPrincipal] = await db("principal")
      .insert({
        principalName: principalName,
        principalEmail: principalEmail,
        principalNumber: principalNumber,
        principalJubilation: seJubila,
        jubilationYears: añoJubilacion || "N/A",
        yearsInSchool: yearsInSchool,
        schoolChange: cambiaEscuela,
      })
      .returning("*");

    return res.status(201).json({
      success: true,
      message: "Director registrado con éxito",
      data: newPrincipal,
    });
  } catch (error) {
    console.error("Error al registrar al director:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al registrar al director",
      details: error.message,
    });
  }
};

export default registerPrincipal;
