import db from '../db/knex.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aquí';

const matchNeed = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token no proporcionado." });
  }

  const token = auth.split(" ")[1];

  let schoolID;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    schoolID = decoded.schoolID;
    if (!schoolID) throw new Error("schoolID faltante en JWT");
    console.log("🎓 schoolID desde token:", schoolID);
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token inválido." });
  }

  const { allyID } = req.body;

  if (!allyID) {
    return res.status(400).json({ success: false, message: "allyID es requerido." });
  }

  try {
    // Buscar la necesidad más reciente
    let lastNeed = await db("needs")
      .where({ schoolID })
      .orderBy("needID", "desc")
      .first();

    // Si no existe, crear una necesidad por defecto
    if (!lastNeed) {
      console.log("🆕 No hay necesidad registrada. Creando una por defecto...");
      const [newNeedID] = await db("needs")
        .insert({
          schoolID,
          necessityType: "General", // puedes cambiarlo por algo que tenga sentido
          created_at: new Date()
        })
        .returning("needID");

      lastNeed = { needID: newNeedID };
    }

    const needID = lastNeed.needID;

    // Insertar proyecto
    await db("proyecto").insert({
      schoolID,
      allyID,
      needID,
      status: "pendiente",
      createdAt: new Date()
    });

    console.log("✅ Match creado para schoolID:", schoolID, "y allyID:", allyID);
    return res.status(201).json({ success: true, message: "Match creado con éxito." });
  } catch (error) {
    console.error("❌ Error al crear match:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor." });
  }
};

export default matchNeed;
