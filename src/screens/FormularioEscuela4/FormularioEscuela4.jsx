import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export const FormularioEscuela4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para almacenar todos los datos acumulados
  const [allFormData, setAllFormData] = useState({
    format_school: null,
    principal: null,
    supervisor: null,
    groups: null
  });


  // Estado para el formulario actual (form4)
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

  // Recuperar datos de los formularios anteriores al cargar el componente
  useEffect(() => {
    if (location.state) {
      setAllFormData({
        format_school: location.state.format_school || null,
        principal: location.state.principal || null,
        supervisor: location.state.supervisor || null,
        groups: location.state.groups || null
      });
    }
  }, [location.state]);

  const handleApoyoChange = (e) => {
    const { name, value } = e.target;
    setForm4(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Preparar datos del formulario actual (form4) para schoolData
      const currentFormData = {
        externalSupport: form4.externalSupport,
        externalSupportReceived: form4.externalSupport === "Ninguno" ? "" : form4.externalSupportReceived,
        interestedPerson: form4.interestedPerson === "Sí", // Convert to boolean
        interestedPersonName: form4.interestedPerson === "Sí" ? form4.interestedPersonName : "",
        inProgram: form4.inProgram === "Sí", // Convert to boolean
        inProgramDetails: form4.inProgram === "Sí" ? form4.inProgramDetails : "",
        pendingProcedure: form4.tramitePendiente === "Sí", // Convert to boolean
        pendingProcedureDetails: form4.tramitePendiente === "Sí" ? form4.pendingProcedureDetails : ""
      };

      // Verificar que tenemos todos los datos necesarios
      if (!allFormData.format_school || !allFormData.principal || !allFormData.supervisor || !allFormData.groups) {
        throw new Error("Faltan datos de formularios anteriores");
      }

      // Preparar el objeto completo para enviar
      const completeData = {
        format_school: allFormData.format_school,
        principal: allFormData.principal,
        supervisor: allFormData.supervisor,
        groups: allFormData.groups,
        schoolData: currentFormData
      };

      // Enviar todos los datos al backend
      const response = await fetch("http://localhost:3000/school_registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el servidor");
      }

      const result = await response.json();
      console.log("Registro completo exitoso:", result);
      navigate("/", {
        state: {
          registrationId: result.data.registration.registrationID || // Usar el ID del registro
            result.data.ids.formatSchoolID // O cualquier otro ID que necesites
        }
      });

    } catch (error) {
      console.error("Error en el registro completo:", error);
      alert(`Error al enviar el formulario: ${error.message}`);
    }
  };


  const handleSiguienteClick = async () => {
    // Only validate fields that are always required
    if (!form4.externalSupport || !form4.interestedPerson || !form4.inProgram || !form4.tramitePendiente) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    // Conditional validation
    if (form4.externalSupport !== "Ninguno" && !form4.externalSupportReceived) {
      alert("Por favor especifique qué apoyo externo recibió");
      return;
    }

    if (form4.interestedPerson === "Sí" && !form4.interestedPersonName) {
      alert("Por favor especifique qué persona estaría interesada");
      return;
    }

    if (form4.inProgram === "Sí" && !form4.inProgramDetails) {
      alert("Por favor especifique a qué inProgram pertenece");
      return;
    }

    if (form4.tramitePendiente === "Sí" && !form4.pendingProcedureDetails) {
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
                      {(
                        form4.externalSupport === "Gobierno municipal" ||
                        form4.externalSupport === "Gobierno estatal" ||
                        form4.externalSupport === "Gobierno federal" ||
                        form4.externalSupport === "Instituciones educativas" ||
                        form4.externalSupport === "OSC" ||
                        form4.externalSupport === "Empresa"
                      ) && (
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

                    <div className="div-5">
                      <label>¿Conoces a otra persona o instancia cercana a la escuela que aún no la ha apoyado, pero
                        que crees que le pudiera estar interesada en ser aliado en este proyecto?</label>
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

                    <div className="div-5">
                      <label>¿La escuela forma parte actualmente de algún inProgram?</label>
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

                    <div className="div-5">
                      <label>En el último ciclo escolar, ¿han realizado algún trámite/oficio al gobierno que esté
                        pendiente de resolver?¿Cuál? (poner nivel de gobierno, instancia y folio de oficio)</label>
                      <select
                        name="tramitePendiente"
                        value={form4.tramitePendiente}
                        onChange={handleApoyoChange}
                        className="input-text"
                      >
                        <option value="No">No</option>
                        <option value="Sí">Sí</option>
                      </select>
                      {form4.tramitePendiente === "Sí" && (
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
                      text="Síguiente"
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
