import express from 'express';
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
import iniciarSesion from './endpoints/iniciarSesion.js';



const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registro de usuarios
app.post('/users', registerUser); 

// Registro de formato escolar
app.post("/format_school", registerSchoolFormat);

// Registro de director
app.post('/principal', registerPrincipal); 

// Registro de supervisor
app.post('/supervisor', registerSupervisor); 

// Registro de grupos
app.post('/groups', registerGroups); 

// Registro de datos escolares
app.post('/school_data', registerSchoolData); 

// Registro de persona moral
app.post('/moral_person', registerMoralPerson);

// Registro de escritura pública
app.post('/public_scripture', registerPublicScripture);

// Registro de certificado fiscal
app.post('/tax_certificate', registerTaxCertificate);

// Registro de representante
app.post('/representative', registerRepresentative);

// Registro de persona natural
app.post('/natural_person', registerNaturalPerson);

// Registro de formato aliado
app.post('/ally_format', registerAllyFormat);

// Registro
app.post('/school_registrations', registerSchoolComplete);

// Iniciar sesion
app.post('/Inicio', iniciarSesion);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//