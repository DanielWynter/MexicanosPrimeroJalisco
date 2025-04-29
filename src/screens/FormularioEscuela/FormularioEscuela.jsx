import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { useNavigate } from "react-router-dom"; 
import "./style.css";

export const FormularioEscuela = () => {
  const navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 🔥 Para bloquear doble envío

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!user || !token || user.userRol !== "school" || !user.schoolID) {
      navigate("/iniciarSesion");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (isSubmitting) return; // 🔥 Si ya se está enviando, no dejar hacer nada más
    setIsSubmitting(true); // 🔥 Marcamos que estamos enviando

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !user.schoolID || !token) {
      setErrorMessage("Debes iniciar sesión como escuela para llenar este formulario.");
      navigate("/iniciarSesion");
      return;
    }

    const dataToSend = {
      ...form,
    };

    try {
      const response = await fetch("http://localhost:3000/format_school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Escuela registrada:", result.data);

        // 🔥 Limpiar el formulario para evitar doble envío
        setForm({
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

        navigate("/formulario-escuela-2", { 
          state: { 
            format_school: { ...form, schoolID: user.schoolID } 
          } 
        });
      } else {
        console.error("Error:", result.message);
        setErrorMessage(result.message || "No se pudo registrar la escuela.");
        setIsSubmitting(false); // 🔥 Permitir reintento si falla
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Hubo un error en la solicitud, por favor intenta nuevamente.");
      setIsSubmitting(false); // 🔥 Permitir reintento si falla
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

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="action">
                  <div className="progress" />
                  <div className="action-2">
                    <Button
                      className="button-4"
                      style="primary"
                      text={isSubmitting ? "Enviando..." : "Siguiente"}
                      type="default"
                      onClick={handleSubmit}
                      disabled={isSubmitting} // 🔥 Bloquear botón mientras envía
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
