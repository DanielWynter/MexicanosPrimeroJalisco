import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export const FormularioEscuela4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [allFormData, setAllFormData] = useState({
    format_school: null,
    principal: null,
    supervisor: null,
    groups: null
  });

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.schoolID) {
      navigate("/iniciarSesion"); // Proteger acceso si no hay sesión de escuela
    }
    if (location.state) {
      setAllFormData({
        format_school: location.state.format_school || null,
        principal: location.state.principal || null,
        supervisor: location.state.supervisor || null,
        groups: location.state.groups || null
      });
    }
  }, [location.state, navigate]);

  const handleApoyoChange = (e) => {
    const { name, value } = e.target;
    setForm4(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
  
      if (!user || !user.schoolID || !token) {
        alert("Debes iniciar sesión como escuela para registrar esta información.");
        return false;
      }
  
      const currentFormData = {
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
  
      const response = await fetch("http://localhost:3000/school_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // 👈 IMPORTANTE agregar Authorization aquí
        },
        body: JSON.stringify({ schoolData: currentFormData })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }
  
      const result = await response.json();
      console.log("Registro completo exitoso:", result);
  
      navigate("/", {
        state: {
          registrationId: result.data.registration?.registrationID || result.data.ids?.formatSchoolID
        }
      });
  
    } catch (error) {
      console.error("Error en el registro completo:", error);
      alert(`Error al enviar el formulario: ${error.message}`);
    }
  };

  const handleSiguienteClick = async () => {
    if (!form4.externalSupport || !form4.interestedPerson || !form4.inProgram || !form4.pendingProcedure) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }
  
    if (form4.externalSupport !== "Ninguno" && !form4.externalSupportReceived) {
      alert("Por favor especifique qué apoyo externo recibió");
      return;
    }
  
    if (form4.interestedPerson === "Sí" && !form4.interestedPersonName) {
      alert("Por favor especifique quién estaría interesado");
      return;
    }
  
    if (form4.inProgram === "Sí" && !form4.inProgramDetails) {
      alert("Por favor especifique a qué programa pertenece");
      return;
    }
  
    if (form4.pendingProcedure === "Sí" && !form4.pendingProcedureDetails) {
      alert("Por favor especifique qué trámite está pendiente");
      return;
    }
  
    await handleSubmit();
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
                  onClick={() => navigate("/")}
                  style="white"
                  type="icon-only"
                />
              </div>

              <div className="form-edit-deal-form">
                <div className="content-SCROLL">
                  <div className="form">

                    {/* Apoyo externo */}
                    <div className="div-5">
                      <label>Apoyo externo en los últimos dos ciclos escolares</label>
                      <select
                        name="externalSupport"
                        value={form4.externalSupport}
                        onChange={handleApoyoChange}
                        className="input-text"
                      >
                        <option value="Ninguno">Ninguno</option>
                        <option value="Gobierno municipal">Gobierno municipal</option>
                        <option value="Gobierno estatal">Gobierno estatal</option>
                        <option value="Gobierno federal">Gobierno federal</option>
                        <option value="Instituciones educativas">Instituciones educativas</option>
                        <option value="OSC">Organizaciones de la sociedad civil</option>
                        <option value="Empresa">Empresa</option>
                      </select>
                      {form4.externalSupport !== "Ninguno" && (
                        <input
                          type="text"
                          name="externalSupportReceived"
                          value={form4.externalSupportReceived}
                          onChange={handleApoyoChange}
                          placeholder="¿Qué apoyo?"
                          className="input-text"
                        />
                      )}
                    </div>

                    {/* Persona interesada */}
                    <div className="div-5">
                      <label>¿Conoces a alguien interesado?</label>
                      <select
                        name="interestedPerson"
                        value={form4.interestedPerson}
                        onChange={handleApoyoChange}
                        className="input-text"
                      >
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.interestedPerson === "Sí" && (
                        <input
                          type="text"
                          name="interestedPersonName"
                          value={form4.interestedPersonName}
                          onChange={handleApoyoChange}
                          placeholder="¿Quién?"
                          className="input-text"
                        />
                      )}
                    </div>

                    {/* Programa educativo */}
                    <div className="div-5">
                      <label>¿La escuela forma parte de algún programa?</label>
                      <select
                        name="inProgram"
                        value={form4.inProgram}
                        onChange={handleApoyoChange}
                        className="input-text"
                      >
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.inProgram === "Sí" && (
                        <input
                          type="text"
                          name="inProgramDetails"
                          value={form4.inProgramDetails}
                          onChange={handleApoyoChange}
                          placeholder="¿Cuál?"
                          className="input-text"
                        />
                      )}
                    </div>

                    {/* Trámite pendiente */}
                    <div className="div-5">
                      <label>¿Han realizado algún trámite pendiente?</label>
                      <select
                        name="pendingProcedure"
                        value={form4.pendingProcedure}
                        onChange={handleApoyoChange}
                        className="input-text"
                      >
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.pendingProcedure === "Sí" && (
                        <input
                          type="text"
                          name="pendingProcedureDetails"
                          value={form4.pendingProcedureDetails}
                          onChange={handleApoyoChange}
                          placeholder="¿Cuál?"
                          className="input-text"
                        />
                      )}
                    </div>

                  </div>
                </div>

                <div className="action">
                  <div className="progress" />
                  <div className="action-2" onClick={handleSiguienteClick}>
                    <Button
                      className="button-4"
                      style="primary"
                      text="Siguiente"
                      type="default"
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
