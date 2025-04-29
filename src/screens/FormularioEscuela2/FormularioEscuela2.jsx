import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Icon10 } from "../../icons/Icon10";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export const FormularioEscuela2 = () => {
  const [principal, setPrincipal] = useState({
    principalName: "",
    principalEmail: "",
    principalNumber: "",
    principalJubilation: "no", // 👈 Aquí
    jubilationYears: "",
    yearsInSchool: "",
    schoolChange: "no" // 👈 Aquí
  });
  
  const [supervisor, setSupervisor] = useState({
    supervisorName: "",
    supervisorEmail: "",
    supervisorNumber: "",
    supervisorJubilation: "no", // 👈 Aquí
    supervisorJubilationYears: "",
    yearsInZone: "",
    zoneChange: "no" // 👈 Aquí
  });
  

  const navigate = useNavigate();
  const location = useLocation();
  const [accumulatedData, setAccumulatedData] = useState(location.state || {});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.schoolID) {
      navigate("/iniciarSesion"); // Proteger la pantalla si no hay sesión
    }
  }, []);

  const registrarDatos = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    if (!user || !user.schoolID || !token) {
      alert("Debes iniciar sesión como escuela para registrar esta información.");
      return false;
    }
  
    const principalData = {
      principalName: principal.principalName,
      principalEmail: principal.principalEmail,
      principalNumber: principal.principalNumber,
      principalJubilation: principal.principalJubilation || "no", // 🔥 default "no"
      jubilationYears: principal.jubilationYears || "0",
      yearsInSchool: principal.yearsInSchool || "0",
      schoolChange: principal.schoolChange || "no" // 🔥 default "no"
    };
  
    const supervisorData = {
      supervisorName: supervisor.supervisorName,
      supervisorEmail: supervisor.supervisorEmail,
      supervisorNumber: supervisor.supervisorNumber,
      supervisorJubilation: supervisor.supervisorJubilation || "no", // 🔥 default "no"
      supervisorJubilationYears: supervisor.supervisorJubilationYears || "0",
      yearsInZone: supervisor.yearsInZone || "0",
      zoneChange: supervisor.zoneChange || "no" // 🔥 default "no"
    };
  
    try {
      // 🔥 Primero registrar principal
      const principalResponse = await fetch("http://localhost:3000/principal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(principalData)
      });
  
      if (!principalResponse.ok) {
        const errorData = await principalResponse.json();
        throw new Error(errorData.message || "Error registrando director.");
      }
  
      // 🔥 Luego registrar supervisor
      const supervisorResponse = await fetch("http://localhost:3000/supervisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(supervisorData)
      });
  
      if (!supervisorResponse.ok) {
        const errorData = await supervisorResponse.json();
        throw new Error(errorData.message || "Error registrando supervisor.");
      }
  
      return true; // ✅ Todo bien
    } catch (error) {
      console.error("Error registrando datos:", error);
      alert(error.message);
      return false;
    }
  };  
  
  const handleSiguienteClick = async () => {
    if (isSubmitting) return;
  
    setIsSubmitting(true); // 🔥 Bloqueamos el botón
  
    try {
      const success = await registrarDatos();
  
      if (success) {
        const user = JSON.parse(localStorage.getItem('user'));
        navigate("/formulario-escuela-3", {
          state: {
            ...accumulatedData,
            principal: { ...principal, schoolID: user.schoolID },
            supervisor: { ...supervisor, schoolID: user.schoolID },
          }
        });
      } else {
        alert("Hubo un error al registrar los datos. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      alert("Error inesperado. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false); // 🔥 Siempre desbloquear el botón
    }
  };
  
  

  return (
    <div className="formulario-escuela-screen">
      <div className="formulario-escuela-2">
        <div className="group-8">
          <div className="modal-edit-deal-wrapper">
            <div className="modal-edit-deal-2">
              <div className="title-2">
                <div className="text-wrapper-25">DIRECTOR/A</div>
                <Button
                  className="button-5"
                  onClick={() => navigate("/")}
                  icon={<Icon10 className="vuesax-bold-close-circle" color="#7E92A2" />}
                  style="white"
                  type="icon-only"
                />
              </div>

              <div className="form-edit-deal-form-2">
                <div className="content-SCROLL-2">
                  <div className="overlap-group-7">
                    {/* FORMULARIO DEL DIRECTOR */}
                    <div className="form-2">
                      <div className="upload-image-2">
                        <div className="label-4">Datos del principal</div>

                        <Input
                          className="count"
                          label
                          text="Nombre del principal"
                          value={principal.principalName}
                          onChange={(e) =>
                            setPrincipal({ ...principal, principalName: e.target.value })
                          }
                          text1="Director"
                          visible2={false}
                          visible3={false}
                        />

                        <Input
                          className="count"
                          label
                          text="Correo del principal"
                          value={principal.principalEmail}
                          onChange={(e) =>
                            setPrincipal({ ...principal, principalEmail: e.target.value })
                          }
                          text1="principal@ejemplo.com"
                          visible2={false}
                          visible3={false}
                        />

                        <Input
                          className="count"
                          label
                          text="Número celular del principal"
                          value={principal.principalNumber}
                          onChange={(e) =>
                            setPrincipal({ ...principal, principalNumber: e.target.value })
                          }
                          text1="33 333 3333"
                          visible2={false}
                          visible3={false}
                        />
                      </div>

                      {/* JUBILACIÓN DEL PRINCIPAL */}
                      <div className="label-4">¿Está próximo a jubilarse?</div>
                      <div className="radio-buttons">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="jubilarseDirector"
                            value="sí"
                            checked={principal.principalJubilation === "sí"}
                            onChange={(e) =>
                              setPrincipal({ ...principal, principalJubilation: e.target.value })
                            }
                          />
                          Sí
                        </label>

                        <label className="radio-option">
                          <input
                            type="radio"
                            name="jubilarseDirector"
                            value="no"
                            checked={principal.principalJubilation === "no"}
                            onChange={(e) =>
                              setPrincipal({ ...principal, principalJubilation: e.target.value, jubilationYears: "" })
                            }
                          />
                          No
                        </label>
                      </div>

                      {principal.principalJubilation === "sí" && (
                        <div className="address-line">
                          <Input
                            className="state-2"
                            divClassName="state-3"
                            label={false}
                            text1="Año de jubilación"
                            value={principal.jubilationYears}
                            onChange={(e) =>
                              setPrincipal({ ...principal, jubilationYears: e.target.value })
                            }
                            visible={false}
                            visible1={false}
                          />
                        </div>
                      )}

                      {/* MÁS CAMPOS DEL PRINCIPAL */}
                      <Input
                        className="room-area"
                        label
                        text="Cuantos años lleva en ese puesto en la escuela?"
                        value={principal.yearsInSchool}
                        onChange={(e) =>
                          setPrincipal({ ...principal, yearsInSchool: e.target.value })
                        }
                        text1="Años"
                        visible2={false}
                        visible3={false}
                      />

                      <div className="label-4">¿Ha solicitado cambio de escuela?</div>
                      <div className="radio-buttons">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="cambioEscuelaDirector"
                            value="sí"
                            checked={principal.schoolChange === "sí"}
                            onChange={(e) =>
                              setPrincipal({ ...principal, schoolChange: e.target.value })
                            }
                          />
                          Sí
                        </label>

                        <label className="radio-option">
                          <input
                            type="radio"
                            name="cambioEscuelaDirector"
                            value="no"
                            checked={principal.schoolChange === "no"}
                            onChange={(e) =>
                              setPrincipal({ ...principal, schoolChange: e.target.value })
                            }
                          />
                          No
                        </label>
                      </div>

                      {/* FORMULARIO DEL SUPERVISOR */}
                      <div className="label-4">Datos del supervisor</div>

                      <Input
                        className="count"
                        label
                        text="Nombre del supervisor"
                        value={supervisor.supervisorName}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, supervisorName: e.target.value })
                        }
                        text1="Supervisor"
                        visible2={false}
                        visible3={false}
                      />

                      <Input
                        className="count"
                        label
                        text="Correo del supervisor"
                        value={supervisor.supervisorEmail}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, supervisorEmail: e.target.value })
                        }
                        text1="supervisor@ejemplo.com"
                        visible2={false}
                        visible3={false}
                      />

                      <Input
                        className="count"
                        label
                        text="Número celular del supervisor"
                        value={supervisor.supervisorNumber}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, supervisorNumber: e.target.value })
                        }
                        text1="33 333 3333"
                        visible2={false}
                        visible3={false}
                      />

                      {/* JUBILACIÓN DEL SUPERVISOR */}
                      <div className="label-4">¿Está próximo a jubilarse?</div>
                      <div className="radio-buttons">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="jubilarseSupervisor"
                            value="sí"
                            checked={supervisor.supervisorJubilation === "sí"}
                            onChange={(e) =>
                              setSupervisor({ ...supervisor, supervisorJubilation: e.target.value })
                            }
                          />
                          Sí
                        </label>

                        <label className="radio-option">
                          <input
                            type="radio"
                            name="jubilarseSupervisor"
                            value="no"
                            checked={supervisor.supervisorJubilation === "no"}
                            onChange={(e) =>
                              setSupervisor({ ...supervisor, supervisorJubilation: e.target.value, supervisorJubilationYears: "" })
                            }
                          />
                          No
                        </label>
                      </div>

                      {supervisor.supervisorJubilation === "sí" && (
                        <div className="address-line">
                          <Input
                            className="state-2"
                            divClassName="state-3"
                            label={false}
                            text1="Año de jubilación"
                            value={supervisor.supervisorJubilationYears}
                            onChange={(e) =>
                              setSupervisor({ ...supervisor, supervisorJubilationYears: e.target.value })
                            }
                            visible={false}
                            visible1={false}
                          />
                        </div>
                      )}

                      {/* MÁS CAMPOS DEL SUPERVISOR */}
                      <Input
                        className="room-area"
                        label
                        text="Cuantos años lleva en ese puesto en esa zona?"
                        value={supervisor.yearsInZone}
                        onChange={(e) =>
                          setSupervisor({ ...supervisor, yearsInZone: e.target.value })
                        }
                        text1="Años"
                        visible2={false}
                        visible3={false}
                      />

                      <div className="label-4">¿Ha solicitado cambio de zona?</div>
                      <div className="radio-buttons">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="cambioZonaSupervisor"
                            value="sí"
                            checked={supervisor.zoneChange === "sí"}
                            onChange={(e) =>
                              setSupervisor({ ...supervisor, zoneChange: e.target.value })
                            }
                          />
                          Sí
                        </label>

                        <label className="radio-option">
                          <input
                            type="radio"
                            name="cambioZonaSupervisor"
                            value="no"
                            checked={supervisor.zoneChange === "no"}
                            onChange={(e) =>
                              setSupervisor({ ...supervisor, zoneChange: e.target.value })
                            }
                          />
                          No
                        </label>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="action-3">
                <div className="action-4">
  <Button
    className="button-6"
    style="primary"
    text={isSubmitting ? "Enviando..." : "Siguiente"}
    type="default"
    onClick={handleSiguienteClick} // ✅ aquí sí
    disabled={isSubmitting}
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
