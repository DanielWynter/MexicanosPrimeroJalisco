import express from 'express';
import db from "./db/knex.js"; 
import cors from 'cors';
import registerUser from './endpoints/registerUser.js';
import registerSchoolFormat from './endpoints/registerSchoolFormat.js';
import registerPrincipal from './endpoints/registerPrincipal.js';
import registerSupervisor from './endpoints/registerSupervisor.js';
import registerGroups from './endpoints/registerGroups.js'; 
import registerSchoolData from './endpoints/registerSchoolData.js';
import registerMoralPerson from './endpoints/registerMoralPerson.js';
import registerPublicScripture from './endpoints/registerPublicScripture.js';
import registerTaxCertificate from './endpoints/registerTaxCertificate.js';
import registerRepresentative from './endpoints/registerRepresentative.js';
import registerNaturalPerson from './endpoints/registerNaturalPerson.js';
import registerAllyFormat from './endpoints/registerAllyFormat.js';
import registerSchoolComplete from './endpoints/registerSchoolRegistrations.js';
import getSchools from './endpoints/getSchools.js';
import iniciarSesion from './endpoints/iniciarSesion.js'; // 👈 IMPORTAR tu endpoint de login
import verificarSesion from './endpoints/verificarSesion.js'; // Ajusta el path si es necesario
import getCatalogoEscuelas from './endpoints/getCatalogoEscuelas.js';
import getCatalogoAliados from './endpoints/getCatalogoAliados.js';
import registerNeed from './endpoints/registerNeed.js';
import registerAllyOffering from './endpoints/registerAllyOffering.js';


const app = express();
const port = 3000;

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de registro
app.post('/users', registerUser); 
app.post('/format_school', registerSchoolFormat);
app.post('/principal', registerPrincipal); 
app.post('/supervisor', registerSupervisor); 
app.post('/groups', registerGroups); 
app.post('/school_data', registerSchoolData); 
app.post('/moral_person', registerMoralPerson);
app.post('/public_scripture', registerPublicScripture);
app.post('/tax_certificate', registerTaxCertificate);
app.post('/representative', registerRepresentative);
app.post('/natural_person', registerNaturalPerson);
app.post('/ally_format', registerAllyFormat);
app.post('/school_registrations', registerSchoolComplete);
app.post('/needs', registerNeed);
app.post('/ally-offerings', registerAllyOffering);

// Rutas de consulta
app.get('/schools', getSchools);
app.get('/verificar-sesion', verificarSesion);

// Login
app.post('/login', iniciarSesion); // 👈 LOGIN agregado aquí

// Catalogo de escuelas, administrador
app.get('/catalogo/escuelas', getCatalogoEscuelas);

// Catalogo de aliados, administrador
app.get('/catalogo/aliados', getCatalogoAliados);

// Ruta para obtener la información de una escuela por ID
app.get('/escuelas/:schoolID', async (req, res) => {
  const { schoolID } = req.params;
  
  try {
    const school = await db('schools').where({ schoolID }).first();
    
    if (!school) {
      return res.status(404).json({ message: "Escuela no encontrada" });
    }
    
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la escuela", error: error.message });
  }
});

// Ruta para eliminar la escuela (DELETE)
app.delete('/escuelas/:schoolID', async (req, res) => {
  const { schoolID } = req.params;
  
  try {
    // Realiza la eliminación de la escuela en las tablas correspondientes
    await db('schools').where({ schoolID }).del();
    
    // Elimina de las tablas relacionadas si es necesario
    await db('groups').where({ schoolID }).del();
    await db('school_data').where({ schoolID }).del();
    
    res.status(200).json({ message: "Escuela eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la escuela", error: error.message });
  }
});

// Ruta para obtener la información de un aliado por ID
app.get('/aliados/:allyID', async (req, res) => {
  const { allyID } = req.params;

  try {
    if (!allyID) {
      return res.status(400).json({ message: "allyID es requerido" });
    }

    const ally = await db('ally')
      .leftJoin('moral_person', 'ally.allyID', 'moral_person.allyID')
      .leftJoin('natural_person', 'ally.allyID', 'natural_person.allyID')
      .leftJoin('representative', 'ally.allyID', 'representative.allyID')
      .leftJoin('tax_certificate', 'ally.allyID', 'tax_certificate.allyID')
      .leftJoin('public_scripture', 'ally.allyID', 'public_scripture.allyID')
      .select(
        'ally.*',
        'moral_person.*',
        'natural_person.*',
        'representative.*',
        'tax_certificate.*',
        'public_scripture.*'
      )
      .where('ally.allyID', allyID)
      .first();

    if (!ally) {
      return res.status(404).json({ message: "Aliado no encontrado" });
    }

    res.status(200).json(ally);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el aliado", error: error.message });
  }
});

// Ruta para eliminar a un aliado por su ID
app.delete("/aliados/:id", async (req, res) => {
  const { id } = req.params;
  const allyID = parseInt(id, 10);

  if (isNaN(allyID)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    console.log("Eliminando aliado con ID:", allyID);

    const moralPerson = await db('moral_person').where({ allyID }).first();

    if (moralPerson) {
      const moralPersonID = moralPerson.moralPersonID;

      // Eliminar dependencias de ally_format primero
      await db('ally_format').where({ moralPersonID }).del();
    }

    // Continuar eliminando otras dependencias
    await db('moral_person').where({ allyID }).del();
    await db('natural_person').where({ allyID }).del();
    await db('public_scripture').where({ allyID }).del();
    await db('representative').where({ allyID }).del();
    await db('tax_certificate').where({ allyID }).del();

    await db('users').where({ allyID }).del();
    await db('ally').where({ allyID }).del();

    res.status(200).json({ message: "Aliado eliminado exitosamente" });
  } catch (error) {
    console.error("Error eliminando aliado:", error);
    res.status(500).json({ message: "Error eliminando aliado", error: error.message });
  }
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
