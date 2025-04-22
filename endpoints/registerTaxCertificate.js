import db from "../db/knex.js";

const registerTaxCertificate = async (req, res) => {
    const {
      rfc,
      socialReason,
      regimen,
      taxAddress,
    } = req.body;
  
    // Validación básica
    if (
      !rfc ||
      !socialReason ||
      !regimen ||
      !taxAddress
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }
  
    try {
      const [newTaxCertificate] = await db("tax_certificate")
        .insert({
          rfc: rfc,  // Las posiciones para el grupo A
          socialReason: socialReason,   // Si el grupo B está completo
          regimen: regimen,   // Si el grupo C está completo
          taxAddress,                // Número de docentes frente a grupo
        })
        .returning("*");
  
      return res.status(201).json({
        success: true,
        message: "Registrado con éxito",
        data: newTaxCertificate,
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

export default registerTaxCertificate;
