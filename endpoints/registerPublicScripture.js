import db from "../db/knex.js";

const registerPublicScripture = async (req, res) => {
    const {
      psNumber,
      psDate,
      notaryName,
      city,
    } = req.body;
  
    // Validación básica
    if (
      !psNumber ||
      !psDate ||
      !notaryName ||
      !city
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const [newPublicScripture] = await db("public_scripture")
        .insert({
          psNumber: psNumber,  // Las posiciones para el grupo A
          psDate: psDate,   // Si el grupo B está completo
          notaryName: notaryName,   // Si el grupo C está completo
          city,                // Si tienen USAER
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Registrado con éxito",
        data: newPublicScripture,
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

export default registerPublicScripture;
