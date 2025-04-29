import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const IniciarSesion = () => {
  const [userEmail, setEmail]       = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError]           = useState("");
  const [message, setMessage]       = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!userEmail || !userPassword) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, userPassword }),
      });
      const data = await response.json();

      if (response.ok && data.usuario && data.token) {
        const { usuario, token } = data;
        if (usuario.userRol === "school" && !usuario.schoolID) {
          setError("Esta cuenta de escuela no tiene schoolID asociado. Contacta soporte.");
          return;
        }
        localStorage.setItem("user", JSON.stringify(usuario));
        localStorage.setItem("token", token);
        setMessage("¡Inicio de sesión exitoso!");
        setTimeout(() => {
          if (usuario.userRol === "school") {
            navigate("/schoolStart");
          } else if (usuario.userRol === "ally") {
            navigate("/allyStart");
          } else if (usuario.userRol === "admin") {
            navigate("/admin/inicio");
          } else {
            navigate("/");
          }
        }, 100);
        
      } else {
        setError(data.message || "Error en el inicio de sesión.");
      }
    } catch (err) {
      console.error("Error al intentar iniciar sesión:", err);
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

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="section-label">Correo Electrónico</label>
          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span>➡️</span>
          </div>
        </div>

        <div className="form-section">
          <label className="section-label">Contraseña</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="••••••••"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>

        {/* Nuevo botón de 'Se te olvidó tu contraseña?' */}
        <div className="forgot-password-container">
          <button
            type="button"
            className="forgot-password-button"
            onClick={() => navigate("/forgot-password")}
          >
            ¿Se te olvidó tu contraseña?
          </button>
        </div>
      </form>

      {error   && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};
