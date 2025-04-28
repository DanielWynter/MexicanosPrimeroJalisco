import db from "../db/knex.js";

const getUserProfile = async (req, res) => {
    const { userID } = req.params; 

    try{

        const user = await db("users")
        .select("userID", "userName", "userEmail", "userRol", "schoolID", "adminID", "allyID")
        .where("userID", userID)
        .first();

        if (!user){
            return res.status(404).json({nstatus:404, message: "Usuario no encontrado"});
        }


        let profile = {
            userID: user.userID,
            userName: user.userName,
            userEmail: user.userEmail,
            userRol: user.userRol,
            institution: null  
        }; 

        switch(user.userRol){
            case "school":
                const school = await db("schools")
                .join("format_school", "schools.schoolID", "=", "format_school.formatSchoolID")
                .select("schoolName")
                .where("schools.schoolID", user.schoolID)
                .first();
                profile.institution = school?.schoolName || null;
                break;
            
            case "admin":
                const admin = await db("Admin")
                .select("workcenterKey")
                .where("adminI", user.adminID)
                .first();
                profile.institution = admin?.workcenterKey || null;
                break;
            
            case "ally": 
                 const ally = await db("Ally")
                 .select("allyFormatID")
                 .where("allyID", user.allyID)
                 .first();
                 profile.institution = ally?.allyFormatID || null;
                 break;

            default:
                return res.status(400).json({status: 400, message: "Rol no reconocido"});
        }

        return res.status(200).json({ status: 200, user: profile}); 

    } catch(error){
        console.error("Error al obtener el perfil: ", error);
        return res.status(500).json({status: 500, message: "Error del servidor"});
    }
}; 