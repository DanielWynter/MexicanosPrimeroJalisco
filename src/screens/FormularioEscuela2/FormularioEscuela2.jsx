import { useState } from "react";
import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Icon10 } from "../../icons/Icon10";
import { useNavigate, useLocation } from "react-router-dom"; // Asegúrate de importar useNavigate
import "./style.css";

export const FormularioEscuela2 = () => {
  const [principal, setPrincipal] = useState({
    principalName: "",
    principalEmail: "",
    principalNumber: "",
    principalJubilation: "",
    jubilationYears: "",
    yearsInSchool: "",
    schoolChange: ""
  });
  
  const [supervisor, setSupervisor] = useState({
    supervisorName: "",
    supervisorEmail: "",
    supervisorNumber: "",
    supervisorJubilation: "",
    supervisorJubilationYears: "",
    yearsInZone: "",
    zoneChange: ""
  });

  const navigate = useNavigate(); // Aquí es donde debes definirlo
  const location = useLocation();
  const [accumulatedData, setAccumulatedData] = useState(location.state || {});

  const registrarDatos = async () => {
    const responses = await Promise.all([
      fetch("http://localhost:3000/principal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(principal),
      }),
      fetch("http://localhost:3000/supervisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supervisor),
      }),
    ]);
  
    return responses.every((response) => response.ok);
  };

  const handleSiguienteClick = async () => {
    const success = await registrarDatos();
  
    if (success) {
      navigate("/formulario-escuela-3", {
        state: {
          ...accumulatedData,
          principal: principal, // Datos del principal
          supervisor: supervisor // Datos del supervisor
        }
      });
    } else {
      alert("Hubo un error al registrar los datos. Intenta nuevamente.");
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
                  icon={
                    <Icon10
                      className="vuesax-bold-close-circle"
                      color="#7E92A2"
                    />
                  }
                  style="white"
                  type="icon-only"
                />
              </div>

              <div className="form-edit-deal-form-2">
                <div className="content-SCROLL-2">
                  <div className="overlap-group-7">
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

                      <div className="count">
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
                      </div>

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
                              setPrincipal({ ...principal, schoolChange: e.target.value})
                            }
                          />
                          No
                        </label>
                      </div>

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

                      <div className="count">
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
                      </div>

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
                              setSupervisor({ ...supervisor, zoneChange: e.target.value})
                            }
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-3">
                  <div className="action-4" onClick={handleSiguienteClick}>
                    <Button
                      className="button-6"
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
