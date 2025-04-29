import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Opciones para el menú desplegable
const supportOptions = [
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

export const FormularioAliado2 = () => {
  const [selectedSupport, setSelectedSupport] = useState("");
  const [errorMessage, setErrorMessage]       = useState("");
  const [isLoading, setIsLoading]             = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user  = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token || user.userRol !== "ally" || !user.allyID) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/iniciarSesion");
    }
  }, [navigate]);

  const handleSupportChange = (e) => {
    setSelectedSupport(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedSupport) {
      setErrorMessage("Por favor, seleccione un tipo de apoyo.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("token");
    const user  = JSON.parse(localStorage.getItem("user"));
    if (!token || !user || !user.allyID) {
      setErrorMessage("Sesión inválida. Por favor, inicia sesión de nuevo.");
      setIsLoading(false);
      navigate("/iniciarSesion");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/ally-offerings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ supportType: selectedSupport }),
      });

      // Manejo de errores HTTP
      if (!response.ok) {
        let msg;
        try {
          msg = (await response.json()).message;
        } catch {
          msg = await response.text();
        }
        throw new Error(msg || `Error ${response.status}`);
      }

      // Éxito → redirigir a inicio
      navigate("/");
    } catch (err) {
      console.error("Error al guardar el tipo de apoyo:", err);
      setErrorMessage(err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos inline (igual que antes)
  const pageStyle = {
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "100vh", backgroundColor: "#f4f7fa", padding: "20px"
  };
  const cardStyle = {
    backgroundColor: "#fff", padding: "40px 30px", borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)", maxWidth: "450px",
    width: "100%", textAlign: "center", boxSizing: "border-box"
  };
  const titleStyle = {
    fontSize: "24px", fontWeight: "bold", color: "#333",
    marginBottom: "15px", textTransform: "uppercase"
  };
  const descriptionStyle = {
    fontSize: "14px", color: "#667085", marginBottom: "30px", lineHeight: "1.5"
  };
  const formGroupStyle = { marginBottom: "20px", textAlign: "left" };
  const labelStyle = {
    display: "block", marginBottom: "8px", fontSize: "14px",
    fontWeight: "500", color: "#344054"
  };
  const selectStyle = {
    width: "100%", padding: "12px 15px", border: "1px solid #d0d5dd",
    borderRadius: "8px", fontSize: "16px", backgroundColor: "#fff",
    appearance: "none",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="%23667085" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center"
  };
  const messageStyle = { marginTop: "15px", textAlign: "center", fontSize: "14px", fontWeight: "500" };
  const errorStyle = { ...messageStyle, color: "#d9534f" };
  const buttonContainerStyle = { marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" };
  const htmlButtonStyle = {
    backgroundColor: "#4a90e2", color: "#fff", padding: "12px 20px",
    border: "none", borderRadius: "8px", fontSize: "16px",
    fontWeight: "bold", cursor: "pointer", width: "100%",
    transition: "background-color 0.2s ease", boxSizing: "border-box"
  };
  const disabledButtonStyle = { ...htmlButtonStyle, backgroundColor: "#a0c3e8", cursor: "not-allowed" };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Seleccionar Tipo de Apoyo</h2>
        <p style={descriptionStyle}>
          Por favor, indica el área principal en la que puedes brindar apoyo.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="supportTypeSelect" style={labelStyle}>
              Tipo de Apoyo Principal: *
            </label>
            <select
              id="supportTypeSelect"
              value={selectedSupport}
              onChange={handleSupportChange}
              required
              disabled={isLoading}
              style={selectStyle}
            >
              <option value="" disabled>-- Seleccione una opción --</option>
              {supportOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {errorMessage && <p style={errorStyle}>{errorMessage}</p>}

          <div style={buttonContainerStyle}>
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? disabledButtonStyle : htmlButtonStyle}
            >
              {isLoading ? "Guardando..." : "Guardar y volver a inicio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
