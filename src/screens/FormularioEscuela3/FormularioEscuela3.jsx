import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export const FormularioEscuela3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accumulatedData, setAccumulatedData] = useState(location.state || {});

  const [estudiantes, setEstudiantes] = useState({
    grupoA: ["", "", "", "", "", ""],
    grupoB: ["", "", "", "", "", ""],
    grupoC: ["", "", "", "", "", ""],
  });

  const [infoDocente, setInfoDocente] = useState({
    teachers: "",
    specialTeachers: "",
    usaer: "",
    usaerTeachers: "",
    parentsTable: "",
    tableAmmount: "",
  });

  const handleEstudianteChange = (grupo, index, value) => {
    setEstudiantes((prev) => ({
      ...prev,
      [grupo]: prev[grupo].map((v, i) => (i === index ? value : v)),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupAPositions: estudiantes.grupoA.join(","), // <-- string
          groupBComplete: estudiantes.grupoB.join(","),   // <-- string
          groupCComplete: estudiantes.grupoC.join(","),   // <-- string
          teachers: parseInt(infoDocente.teachers) || 0,
          specialTeachers: parseInt(infoDocente.specialTeachers) || 0,
          usaer: infoDocente.usaer === "Sí",
          usaerTeachers: infoDocente.usaerTeachers || "",
          parentsTable: infoDocente.parentsTable === "Sí",
          tableAmmount: parseInt(infoDocente.tableAmmount) || 0,
        }),
        
      });
  
      if (response.status === 201) {
        return true;
      }
    } catch (error) {
      console.error("Error al registrar los grupos:", error);
      return false;
    }
  };

  const handleDocenteChange = (e) => {
    const { name, value } = e.target;
    setInfoDocente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSiguienteClick = async () => {
    const success = await handleSubmit();
  
    if (success) {
      navigate("/formulario-escuela-4", {
        state: {
          ...accumulatedData,
          groups: estudiantes,
        }
      });
    }
    
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
                    <div className="label-3">Número de estudiantes por grupo</div>
                    <table className="student-table">
                      <thead>
                        <tr>
                          <th></th>
                          {[1, 2, 3, 4, 5, 6].map((grado) => (
                            <th key={grado}>{grado}°</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {["grupoA", "grupoB", "grupoC"].map((grupo, gIndex) => (
                          <tr key={grupo}>
                            <td>Grupo {String.fromCharCode(65 + gIndex)}</td>
                            {estudiantes[grupo].map((val, i) => (
                              <td key={i}>
                                <input
                                  type="number"
                                  value={val}
                                  onChange={(e) =>
                                    handleEstudianteChange(grupo, i, e.target.value)
                                  }
                                  className="input-table"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Input
                      className="input-instance"
                      label
                      text="Número de docentes frente a grupo"
                      text1="Docentes"
                      value={infoDocente.teachers} // ← ESTE es el que falta
                      onChange={(e) =>
                        setInfoDocente({ ...infoDocente, teachers: e.target.value })
                      }
                      name="teachers"
                    />

                    <Input
                      className="input-instance"
                      label
                      text="Número de docentes de asignaturas especiales"
                      text1="Docentes asignaturas especiales"
                      value={infoDocente.specialTeachers} // ← ESTE es el que falta
                      onChange={(e) =>
                        setInfoDocente({ ...infoDocente, specialTeachers: e.target.value })
                      }
                      name="specialTeachers"
                    />

                    <div className="div-5">
                      <label>¿Cuentan con USAER?</label>
                      <select
                        name="usaer"
                        value={infoDocente.usaer}
                        onChange={handleDocenteChange}
                        className="input-text"
                      >
                        <option value="">Seleccione</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                      </select>
                      {infoDocente.usaer === "Sí" && (
                        <input
                          type="text"
                          name="usaerTeachers"
                          value={infoDocente.usaerTeachers}
                          onChange={handleDocenteChange}
                          placeholder="¿Qué docentes?"
                          className="input-text"
                        />
                      )}
                    </div>

                    <div className="div-5">
                      <label>¿Cuentan con mesa de padres de familia?</label>
                      <select
                        name="parentsTable"
                        value={infoDocente.parentsTable}
                        onChange={handleDocenteChange}
                        className="input-text"
                      >
                        <option value="">Seleccione</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                      </select>
                      {infoDocente.parentsTable === "Sí" && (
                        <input
                          type="number"
                          name="tableAmmount"
                          value={infoDocente.tableAmmount}
                          onChange={handleDocenteChange}
                          placeholder="¿Por cuántas personas?"
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
