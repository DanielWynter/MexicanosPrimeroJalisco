import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir a otra página después del login
import "./style.css";

export const IniciarSesion = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Navegar después del login

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario de login enviado");
    setError("");
    setMessage("");
  
    if (!userEmail || !userPassword) {
      setError("Por favor, llena todos los campos.");
      return;
    }
  
    try {
      const data = {
        userEmail,
        userPassword,
      };
  
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json(); 
  
      if (response.ok && responseData.usuario && responseData.token) {
        const { usuario, token } = responseData;
  
        if (usuario.userRol === "school" && !usuario.schoolID) {
          setError("Esta cuenta de escuela no tiene schoolID asociado. Contacta soporte.");
          return;
        }
  
        // GUARDAR usuario y token
        localStorage.setItem("user", JSON.stringify(usuario));
        localStorage.setItem("token", token);
  
        console.log("Usuario guardado:", usuario);
        console.log("Token guardado:", token);
  
        setMessage("¡Inicio de sesión exitoso!");
  
        // ⚡ Agregar pequeño delay para asegurar guardado antes de navegar
        setTimeout(() => {
          if (usuario.userRol === "school") {
            navigate("/schoolStart");
          } else if (usuario.userRol === "ally") {
            navigate("/allyStart");
          } else {
            navigate("/");
          }
        }, 100);
      } else {
        setError(responseData.message || "Error en el inicio de sesión.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setError("Hubo un error al intentar iniciar sesión.");
    }
  };
  
  
  

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="login-title">INICIAR SESIÓN</h2>
        <span 
  className="login-icon" 
  onClick={() => navigate("/")} 
  style={{ cursor: "pointer" }}
>
  ✖
</span>

      </div>

      <form onSubmit={handleSubmit}> {/* Se añadió el onSubmit aquí */}
        <div className="form-section">
          <label className="section-label">Correo Electrónico</label>
          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)} // Para actualizar el valor del email
              required
            />
            <span>➡️</span>
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">Contraseña</label>
          <div className="input-group">
            <span></span>
            <input
              type="password"
              placeholder="••••••••"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)} // Para actualizar el valor de la contraseña
              required
            />
            <span></span>
          </div>
        </div>

        <button type="submit" className="login-button">Iniciar sesión</button> {/* Ahora es un botón de submit */}
      </form>

      {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
      {message && <p className="success-message">{message}</p>} {/* Mostrar mensaje de éxito */}
    </div>
  );
};