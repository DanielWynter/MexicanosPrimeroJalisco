import db from "../db/knex.js"; 
import jwt from "jsonwebtoken";

const JWT_SECRET = '93nd29jdjADJ3i2@@!aSDh3ndakllw';

const getCatalogoAliados = async (req, res) => {
  const { apoyo } = req.query;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const userID = decoded.userID;

if (!userID) {
  return res.status(403).json({ message: "No autorizado" });
}


    // Ahora sí hacemos el query
   // Dentro de getCatalogoAliados, reemplaza tu construcción de query por esto:

   let query = db("users as user")
   // 1️⃣ Traer la necesidad desde la tabla needs
   .leftJoin("needs as n",       "user.allyID", "n.allyID")
   // 2️⃣ Tus joins habituales
   .leftJoin("moral_person as mp","user.allyID","mp.allyID")
   .leftJoin("natural_person as np","user.allyID","np.allyID")
   // 3️⃣ Seleccionar también el campo necessityType
   .select(
     "mp.moralPersonID      as moralPersonID",
     "np.naturalPersonID    as naturalPersonID",
     "mp.orgName            as organizationName",
     "mp.orgAddress         as organizationAddress",
     "mp.orgWeb             as organizationWeb",
     "np.npInstitution      as npInstitution",
     "np.npPhone            as npPhone",
     "user.userEmail        as userEmail",
     "n.necessityType       as necessityType"
   )
   .whereNotNull("user.allyID")
   .modify(qb => {
     if (apoyo) {
       // Filtrar usando la columna correcta de needs, no "ally.support"
       qb.whereRaw(
         "LOWER(n.necessityType) LIKE ?",
         [`%${apoyo.toLowerCase()}%`]
       );
     }
   });
    const ally = await query;

    res.status(200).json({
      users: ally
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error al cargar aliados", error: error.message });
  }
};

export default getCatalogoAliados;