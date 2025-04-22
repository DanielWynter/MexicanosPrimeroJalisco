import db from "../db/knex.js";

const registerRepresentative = async (req, res) => {
    const {
      representativeName,
      representativeAddress,
      representativePhone,
      area,
    } = req.body;
  
    // Validación básica
    if (
      !representativeName ||
      !representativeAddress ||
      !representativePhone ||
      !area
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const [newRepresentative] = await db("representative")
        .insert({
          representativeName: representativeName,  // Las posiciones para el grupo A
          representativeAddress: representativeAddress,   // Si el grupo B está completo
          representativePhone: representativePhone,   // Si el grupo C está completo
          area,                // Número de docentes frente a grupo
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Registrado con éxito",
        data: newRepresentative,
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

export default registerRepresentative;
