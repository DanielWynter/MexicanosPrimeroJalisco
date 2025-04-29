import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

export const FormularioEscuela3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accumulatedData, setAccumulatedData] = useState(location.state || {});
  const [isSubmitting, setIsSubmitting] = useState(false);


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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.schoolID) {
      navigate("/iniciarSesion"); // Si no hay sesión, redirige
    }
  }, []);

  const handleEstudianteChange = (grupo, index, value) => {
    setEstudiantes((prev) => ({
      ...prev,
      [grupo]: prev[grupo].map((v, i) => (i === index ? value : v)),
    }));
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
  
      if (!user || !user.schoolID || !token) {
        alert("Debes iniciar sesión como escuela.");
        return false;
      }
  
      const dataToSend = {
        schoolID: user.schoolID,
        groupAPositions: estudiantes.grupoA.join(","),
        groupBComplete: estudiantes.grupoB.join(","),
        groupCComplete: estudiantes.grupoC.join(","),
        teachers: parseInt(infoDocente.teachers) || 0,
        specialTeachers: parseInt(infoDocente.specialTeachers) || 0,
        usaer: infoDocente.usaer === "Sí",
        usaerTeachers: infoDocente.usaer === "Sí" ? infoDocente.usaerTeachers || "" : "",
        parentsTable: infoDocente.parentsTable === "Sí",
        tableAmmount: infoDocente.parentsTable === "Sí" ? parseInt(infoDocente.tableAmmount) || 0 : 0
      };
  
      const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 🔥 mandamos token
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.status === 201) {
        return true;
      } else {
        console.error("Error en respuesta:", await response.json());
        return false;
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
    if (isSubmitting) return; // 🔥 prevenir doble envío
  
    setIsSubmitting(true); // 🔥 bloquear mientras envía
    const success = await handleSubmit();
    setIsSubmitting(false); // 🔥 desbloquear cuando termina
  
    if (success) {
      const user = JSON.parse(localStorage.getItem('user'));
      navigate("/formulario-escuela-4", {
        state: {
          ...accumulatedData,
          groups: {
            groupAPositions: estudiantes.grupoA.join(","),
            groupBComplete: estudiantes.grupoB.join(","),
            groupCComplete: estudiantes.grupoC.join(","),
            teachers: parseInt(infoDocente.teachers) || 0,
            specialTeachers: parseInt(infoDocente.specialTeachers) || 0,
            usaer: infoDocente.usaer === "Sí",
            usaerTeachers: infoDocente.usaer === "Sí" ? infoDocente.usaerTeachers || "" : "",
            parentsTable: infoDocente.parentsTable === "Sí",
            tableAmmount: infoDocente.parentsTable === "Sí" ? parseInt(infoDocente.tableAmmount) || 0 : 0,
            schoolID: user.schoolID
          }
          
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
                      value={infoDocente.teachers}
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
                      value={infoDocente.specialTeachers}
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
                  <div className="action-2">
                  <Button
  className="button-4"
  style="primary"
  text={isSubmitting ? "Enviando..." : "Siguiente"} // 🔥 cambia el texto mientras envía
  type="default"
  onClick={handleSiguienteClick}
  disabled={isSubmitting} // 🔥 desactiva el botón mientras envía
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
