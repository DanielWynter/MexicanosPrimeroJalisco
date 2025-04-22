import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { useNavigate } from "react-router-dom"; 
import "./style.css";

export const FormularioEscuela = () => {
  const [form, setForm] = useState({
    schoolName: "",
    schoolSector: "",
    educationLevel: "",
    street: "",
    colony: "",
    municipality: "",
    zip: "",
    module: "",
    sustenance: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Para almacenar los mensajes de error
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensaje de error en cada intento de submit

    try {
      const response = await fetch("http://localhost:3000/format_school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Escuela registrada:", result.data);
        navigate("/formulario-escuela-2", { 
          state: { 
            format_school: form // Enviamos los datos del formulario actual
          } 
        }); // Redirigir al siguiente paso solo si la respuesta es exitosa
      } else {
        console.error("Error:", result.message);
        setErrorMessage(result.message || "No se pudo registrar la escuela."); // Mostrar error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Hubo un error en la solicitud, por favor intenta nuevamente."); // Mostrar error en caso de problemas de red
    }
  };

  return (
    <div className="formulario-escuela">
      <div className="group-wrapper-2">
        <div className="registrarse-wrapper">
          <div className="registrarse">
            <div className="modal-edit-deal">
              <div className="title">
                <div className="text-wrapper-21">ESCUELA</div>
                <Button
                  className="button-instance" 
                  onClick={() => navigate("/")}
                  icon={<Icon10 className="icon-10" color="#7E92A2" />}
                  style="white"
                  type="icon-only"
                />
              </div>

              <div className="form-edit-deal-form">
                <div className="content-SCROLL">
                  <div className="form">
                    <div className="upload-image">
                      <div className="label-3">Datos de la institución</div>
                      <Input
                        className="input-instance"
                        label
                        text="Nombre de la escuela"
                        value={form.schoolName}
                        onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                        text1="Nombre"
                      />
                    </div>

                    <Input
                      className="input-instance"
                      label
                      text="Sector Escolar"
                      value={form.schoolSector}
                      onChange={(e) => setForm({ ...form, schoolSector: e.target.value })}
                      text1="Sector Escolar"
                    />

                    <Input
                      className="input-instance"
                      label
                      text="Nivel Educativo"
                      value={form.educationLevel}
                      onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}
                      text1="Nivel educativo"
                    />

                    <Input
                      className="input-instance"
                      label
                      text="Dirección de la escuela"
                      value={form.street}
                      onChange={(e) => setForm({ ...form, street: e.target.value })}
                      text1="Calle y número"
                    />

                    <div className="div-5">
                      <input
                        name="colony"
                        value={form.colony}
                        onChange={handleChange}
                        placeholder="Colonia"
                        className="input-text"
                      />
                      <input
                        name="municipality"
                        value={form.municipality}
                        onChange={handleChange}
                        placeholder="Municipio"
                        className="input-text"
                      />
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        placeholder="CP"
                        className="input-text"
                      />
                    </div>
                    <Input
                      className="input-instance"
                      icon={<Icon11 className="icon-11" />}
                      label
                      text="Modalidad"
                      text1="Modalidad"
                      value={form.module}
                      onChange={(e) => setForm({ ...form, module: e.target.value })}
                    />
                    <Input
                      className="input-instance"
                      icon={<Icon11 className="icon-11" />}
                      label
                      text="Sostenimiento"
                      text1="Sostenimiento"
                      value={form.sustenance}
                      onChange={(e) => setForm({ ...form, sustenance: e.target.value })}
                    />
                  </div>
                </div>

                {/* Mostrar mensaje de error si lo hay */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="action">
                  <div className="progress"></div>

                  <div className="action-2">
                    <Button
                      className="button-4"
                      style="primary"
                      text="Siguiente"
                      type="default"
                      onClick={handleSubmit} // Llamamos a handleSubmit al hacer clic
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
