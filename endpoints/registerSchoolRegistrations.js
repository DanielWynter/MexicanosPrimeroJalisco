import db from "../db/knex.js";

const registerSchoolComplete = async (req, res) => {
  // Validación inicial de los datos requeridos
  if (!req.body.format_school || !req.body.principal || 
      !req.body.supervisor || !req.body.groups || !req.body.schoolData) {
    return res.status(400).json({
      success: false,
      message: "Faltan datos requeridos en el cuerpo de la solicitud",
      required: {
        format_school: "Datos de la escuela",
        principal: "Datos del director",
        supervisor: "Datos del supervisor",
        groups: "Datos de grupos",
        schoolData: "Datos escolares adicionales"
      }
    });
  }

  try {
    const result = await db.transaction(async (trx) => {
      // 1. Insertar datos de la escuela con validación
      const [formatSchoolRow] = await trx("format_school")
        .insert({
            schoolName: req.body.format_school.schoolName || null,
          schoolSector: req.body.format_school.schoolSector || null,
          educationLevel: req.body.format_school.educationLevel || null,
          street: req.body.format_school.street || null,
          colony: req.body.format_school.colony || null,
          municipality: req.body.format_school.municipality || null,
          zip: req.body.format_school.zip || null,
          module: req.body.format_school.module || null,
          sustenance: req.body.format_school.sustenance || null
        })
        .returning("formatSchoolID");

      const formatSchoolID = formatSchoolRow.formatSchoolID;

      // 2. Insertar director con validación
      const [principalRow] = await trx("principal")
        .insert({
          principalName: req.body.principal.principalName || null,
          principalEmail: req.body.principal.principalEmail || null,
          principalNumber: req.body.principal.principalNumber || null,
          principalJubilation: req.body.principal.principalJubilation === "sí",
          jubilationYears: req.body.principal.jubilationYears || null,
          yearsInSchool: parseInt(req.body.principal.yearsInSchool) || 0,
          schoolChange: req.body.principal.schoolChange === "sí"
        })
        .returning("principalID");

      const principalID = principalRow.principalID;

      // 3. Insertar supervisor con validación
      const [supervisorRow] = await trx("supervisor")
        .insert({
          supervisorName: req.body.supervisor.supervisorName || null,
          supervisorEmail: req.body.supervisor.supervisorEmail || null,
          supervisorNumber: req.body.supervisor.supervisorNumber || null,
          supervisorJubilation: req.body.supervisor.supervisorJubilation === "sí",
          supervisorJubilationYears: req.body.supervisor.supervisorJubilationYears || null,
          yearsInZone: parseInt(req.body.supervisor.yearsInZone) || 0,
          zoneChange: req.body.supervisor.zoneChange === "sí"
        })
        .returning("supervisorID");

      const supervisorID = supervisorRow.supervisorID;

      // 4. Insertar grupos con conversión de tipos
      const [groupsRow] = await trx("groups")
        .insert({
          groupAPositions: Array.isArray(req.body.groups.groupAPositions) ? 
            req.body.groups.groupAPositions.join(",") : 
            String(req.body.groups.groupAPositions || ""),
          groupBComplete: Array.isArray(req.body.groups.groupBComplete) ? 
            req.body.groups.groupBComplete.join(",") : 
            String(req.body.groups.groupBComplete || ""),
          groupCComplete: Array.isArray(req.body.groups.groupCComplete) ? 
            req.body.groups.groupCComplete.join(",") : 
            String(req.body.groups.groupCComplete || ""),
          teachers: parseInt(req.body.groups.teachers) || 0,
          specialTeachers: parseInt(req.body.groups.specialTeachers) || 0,
          usaer: Boolean(req.body.groups.usaer),
          usaerTeachers: req.body.groups.usaerTeachers || null,
          parentsTable: Boolean(req.body.groups.parentsTable),
          tableAmmount: parseInt(req.body.groups.tableAmmount) || 0
        })
        .returning("groupsID");

      const groupsID = groupsRow.groupsID;

      // 5. Insertar datos escolares con conversión de booleanos
      const [schoolDataRow] = await trx("school_data")
        .insert({
          externalSupport: req.body.schoolData.externalSupport || null,
          externalSupportReceived: req.body.schoolData.externalSupportReceived || null,
          interestedPerson: Boolean(req.body.schoolData.interestedPerson),
          interestedPersonName: req.body.schoolData.interestedPersonName || null,
          inProgram: Boolean(req.body.schoolData.inProgram),
          inProgramDetails: req.body.schoolData.inProgramDetails || null,
          pendingProcedure: Boolean(req.body.schoolData.pendingProcedure),
          pendingProcedureDetails: req.body.schoolData.pendingProcedureDetails || null
        })
        .returning("schoolDataID");

      const schoolDataID = schoolDataRow.schoolDataID;

      // 6. Crear registro completo
      const [registration] = await trx("school_registrations")
        .insert({
          formatSchoolID,
          principalID,
          supervisorID,
          groupsID,
          schoolDataID,
          status: "completed",
          created_at: db.fn.now(),
        })
        .returning("*");

      return {
        registration,
        ids: {
          formatSchoolID,
          principalID,
          supervisorID,
          groupsID,
          schoolDataID
        }
      };
    });

    return res.status(201).json({
      success: true,
      message: "Escuela registrada exitosamente",
      data: result
    });

  } catch (error) {
    console.error("Error en registro completo:", error);
    
    // Manejo específico de errores de base de datos
    if (error.code === '23505') { // Violación de unique constraint
      return res.status(409).json({
        success: false,
        message: "Conflicto: Ya existe un registro con estos datos",
        error: error.detail
      });
    } else if (error.code === '23502') { // Violación de not-null constraint
      return res.status(400).json({
        success: false,
        message: "Datos incompletos: " + error.message,
        required: "Verifique todos los campos requeridos"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error interno al procesar el registro",
      error: error.message
    });
  }
};

export default registerSchoolComplete;