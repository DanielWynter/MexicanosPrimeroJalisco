import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button"; // Asegúrate que la ruta sea correcta
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

// Opciones para el nuevo menú desplegable
const needOptions = [
  "Material didáctico",
  "Infraestructura",
  "Tecnológico",
  "Mobiliario",
  "Educación física",
  "Literarios",
  "Psicólogo",
  "Formación docente",
  "Sexualidad",
];

export const FormularioEscuela4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mantenemos los datos pasados de otros formularios
  const [allFormData, setAllFormData] = useState({
    format_school: null,
    principal: null,
    supervisor: null,
    groups: null
  });

  // Estado para los datos de este formulario (school_data)
  const [form4, setForm4] = useState({
    externalSupport: "",
    externalSupportReceived: "",
    interestedPerson: "",
    interestedPersonName: "",
    inProgram: "",
    inProgramDetails: "",
    pendingProcedure: "",
    pendingProcedureDetails: ""
  });

  // *** NUEVO ESTADO para la necesidad seleccionada ***
  const [selectedNeed, setSelectedNeed] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.schoolID) {
      console.warn("Usuario no autenticado como escuela, redirigiendo a login.");
      navigate("/iniciarSesion");
    }
    if (location.state) {
      // Carga los datos previos si existen
      setAllFormData({
        format_school: location.state.format_school || null,
        principal: location.state.principal || null,
        supervisor: location.state.supervisor || null,
        groups: location.state.groups || null
      });
    } else {
        console.warn("No se recibieron datos de formularios anteriores.");
        // Podrías redirigir si los datos previos son esenciales
        // navigate("/ruta_formulario_anterior");
    }
  }, [location.state, navigate]);

  // Handler genérico para los campos del form4
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm4(prev => ({ ...prev, [name]: value }));
  };

  // *** NUEVO Handler para el selector de necesidades ***
  const handleNeedChange = (e) => {
    setSelectedNeed(e.target.value);
  };

  // Lógica de envío combinada
  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !user.schoolID || !token) {
      alert("Debes iniciar sesión como escuela para registrar esta información.");
      return false; // Detener si no hay sesión válida
    }

    // 1. Preparar datos para /school_data
    const schoolDataPayload = {
      schoolID: user.schoolID,
      externalSupport: form4.externalSupport,
      externalSupportReceived: form4.externalSupport !== "Ninguno" ? form4.externalSupportReceived : "",
      interestedPerson: form4.interestedPerson === "Sí",
      interestedPersonName: form4.interestedPerson === "Sí" ? form4.interestedPersonName : "",
      inProgram: form4.inProgram === "Sí",
      inProgramDetails: form4.inProgram === "Sí" ? form4.inProgramDetails : "",
      pendingProcedure: form4.pendingProcedure === "Sí",
      pendingProcedureDetails: form4.pendingProcedure === "Sí" ? form4.pendingProcedureDetails : ""
    };

    // 2. Preparar datos para /needs
    const needPayload = {
      schoolID: user.schoolID,
      necessityType: selectedNeed // <-- El valor del nuevo dropdown
      // allyID será null por defecto en la BD o no se envía
    };

    try {
      // --- Envío a /school_data ---
      console.log("Enviando a /school_data:", JSON.stringify({ schoolData: schoolDataPayload }));
      const schoolDataResponse = await fetch("http://localhost:3000/school_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ schoolData: schoolDataPayload })
      });

      if (!schoolDataResponse.ok) {
        const errorData = await schoolDataResponse.json();
        console.error("Error en /school_data:", errorData);
        throw new Error(`Error al guardar datos escolares: ${errorData.message || schoolDataResponse.statusText}`);
      }
      const schoolDataResult = await schoolDataResponse.json();
      console.log("Respuesta de /school_data:", schoolDataResult);

      // --- Envío a /needs ---
      // Asumiendo que tendrás un endpoint POST /needs
      console.log("Enviando a /needs:", JSON.stringify(needPayload));
      const needsResponse = await fetch("http://localhost:3000/needs", { // <-- Endpoint para necesidades
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(needPayload) // <-- Envía directamente el payload de la necesidad
      });

      if (!needsResponse.ok) {
        const errorData = await needsResponse.json();
         console.error("Error en /needs:", errorData);
        // Decidimos si el error al guardar la necesidad es crítico o no
        // Por ahora, solo mostraremos una alerta pero continuaremos la navegación
        alert(`Error al guardar la necesidad: ${errorData.message || needsResponse.statusText}. Los otros datos se guardaron.`);
        // throw new Error(`Error al guardar la necesidad: ${errorData.message || needsResponse.statusText}`); // Descomentar si es crítico
      } else {
        const needsResult = await needsResponse.json();
        console.log("Respuesta de /needs:", needsResult);
      }


      // --- Navegación si todo (o lo principal) fue exitoso ---
      alert("Formulario enviado con éxito!"); // Mejor feedback para el usuario
      navigate("/"); // O a la página que corresponda después de completar

    } catch (error) {
      console.error("Error en el envío:", error);
      alert(`Error al enviar el formulario: ${error.message}`);
    }
  };

  // Validación antes de llamar a handleSubmit
  const handleSiguienteClick = () => { // Quitado async porque solo valida
    // Validación de los campos existentes
    if (!form4.externalSupport || !form4.interestedPerson || !form4.inProgram || !form4.pendingProcedure) {
      alert("Por favor complete todos los campos de apoyo, interés, programa y trámite.");
      return;
    }
    if (form4.externalSupport !== "Ninguno" && !form4.externalSupportReceived) {
      alert("Por favor especifique qué apoyo externo recibió.");
      return;
    }
    if (form4.interestedPerson === "Sí" && !form4.interestedPersonName) {
      alert("Por favor especifique quién estaría interesado.");
      return;
    }
    if (form4.inProgram === "Sí" && !form4.inProgramDetails) {
      alert("Por favor especifique a qué programa pertenece.");
      return;
    }
    if (form4.pendingProcedure === "Sí" && !form4.pendingProcedureDetails) {
      alert("Por favor especifique qué trámite está pendiente.");
      return;
    }

    // *** NUEVA Validación para la necesidad ***
    if (!selectedNeed) {
      alert("Por favor, seleccione la necesidad principal de la escuela.");
      return;
    }

    // Si todas las validaciones pasan, llama a handleSubmit
    handleSubmit();
  };


  return (
    <div className="formulario-escuela">
      <div className="group-wrapper-2">
        <div className="registrarse-wrapper">
          <div className="registrarse">
            <div className="modal-edit-deal">
              <div className="title">
                <div className="text-wrapper-21">Datos de la escuela ciclo 2024-2025</div>
                <Button
                  className="button-instance"
                  onClick={() => navigate("/")} // O a donde deba ir al cancelar
                  style="white"
                  type="icon-only"
                  icon="x" // Asumiendo que tienes un ícono 'x'
                  aria-label="Cerrar"
                />
              </div>

              <div className="form-edit-deal-form">
                <div className="content-SCROLL">
                  <div className="form">

                    {/* === NUEVA PREGUNTA: NECESIDAD PRINCIPAL === */}
                    <div className="div-5">
                      <label htmlFor="necessityType">¿Cuál es la necesidad principal actual de la escuela?</label>
                      <select
                        id="necessityType" // Buena práctica para accesibilidad
                        name="necessityType"
                        value={selectedNeed}
                        onChange={handleNeedChange} // Usar el nuevo handler
                        className="input-text" // Reutiliza tu clase de estilo
                        required // Hacerlo requerido en el HTML
                      >
                        <option value="" disabled>-- Seleccione una opción --</option>
                        {needOptions.map((need) => (
                          <option key={need} value={need}>
                            {need}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* ========================================= */}

                    {/* Apoyo externo */}
                    <div className="div-5">
                      <label htmlFor="externalSupport">Apoyo externo en los últimos dos ciclos escolares</label>
                      <select
                        id="externalSupport"
                        name="externalSupport"
                        value={form4.externalSupport}
                        onChange={handleInputChange} // Usar handler genérico
                        className="input-text"
                      >
                         <option value="" disabled>-- Seleccione una opción --</option>
                        <option value="Ninguno">Ninguno</option>
                        <option value="Gobierno municipal">Gobierno municipal</option>
                        <option value="Gobierno estatal">Gobierno estatal</option>
                        <option value="Gobierno federal">Gobierno federal</option>
                        <option value="Instituciones educativas">Instituciones educativas</option>
                        <option value="OSC">Organizaciones de la sociedad civil</option>
                        <option value="Empresa">Empresa</option>
                      </select>
                      {form4.externalSupport && form4.externalSupport !== "Ninguno" && (
                        <input
                          type="text"
                          name="externalSupportReceived"
                          value={form4.externalSupportReceived}
                          onChange={handleInputChange}
                          placeholder="¿Qué apoyo?"
                          className="input-text"
                          required={form4.externalSupport !== "Ninguno"}
                        />
                      )}
                    </div>

                    {/* Persona interesada */}
                    <div className="div-5">
                      <label htmlFor="interestedPerson">¿Conoces a alguien que pudiera estar interesado en apoyar a la escuela?</label>
                      <select
                        id="interestedPerson"
                        name="interestedPerson"
                        value={form4.interestedPerson}
                        onChange={handleInputChange}
                        className="input-text"
                      >
                         <option value="" disabled>-- Seleccione una opción --</option>
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.interestedPerson === "Sí" && (
                        <input
                          type="text"
                          name="interestedPersonName"
                          value={form4.interestedPersonName}
                          onChange={handleInputChange}
                          placeholder="¿Quién?"
                          className="input-text"
                          required={form4.interestedPerson === "Sí"}
                        />
                      )}
                    </div>

                    {/* Programa educativo */}
                    <div className="div-5">
                      <label htmlFor="inProgram">¿La escuela forma parte actualmente de algún programa federal, estatal, municipal o de OSC?</label>
                      <select
                        id="inProgram"
                        name="inProgram"
                        value={form4.inProgram}
                        onChange={handleInputChange}
                        className="input-text"
                      >
                         <option value="" disabled>-- Seleccione una opción --</option>
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.inProgram === "Sí" && (
                        <input
                          type="text"
                          name="inProgramDetails"
                          value={form4.inProgramDetails}
                          onChange={handleInputChange}
                          placeholder="¿Cuál?"
                          className="input-text"
                          required={form4.inProgram === "Sí"}
                        />
                      )}
                    </div>

                    {/* Trámite pendiente */}
                    <div className="div-5">
                      <label htmlFor="pendingProcedure">¿Tiene algún trámite administrativo detenido o pendiente con alguna autoridad?</label>
                      <select
                        id="pendingProcedure"
                        name="pendingProcedure"
                        value={form4.pendingProcedure}
                        onChange={handleInputChange}
                        className="input-text"
                      >
                         <option value="" disabled>-- Seleccione una opción --</option>
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.pendingProcedure === "Sí" && (
                        <input
                          type="text"
                          name="pendingProcedureDetails"
                          value={form4.pendingProcedureDetails}
                          onChange={handleInputChange}
                          placeholder="¿Cuál?"
                          className="input-text"
                          required={form4.pendingProcedure === "Sí"}
                        />
                      )}
                    </div>

                  </div>
                </div>

                {/* Separado onClick para claridad en la validación */}
                <div className="action">
                   {/* Podrías añadir aquí el componente <ProgressBar/> si lo tienes */}
                  <div className="action-2">
                    <Button
                      className="button-4"
                      style="primary"
                      text="Finalizar Registro" // Cambiado texto del botón
                      type="default"
                      onClick={handleSiguienteClick} // Llama a la validación
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};