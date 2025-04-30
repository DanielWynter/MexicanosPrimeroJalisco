import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const IniciarSesion = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
          if (usuario.userRol === "school") navigate("/schoolStart");
          else if (usuario.userRol === "ally") navigate("/allyStart");
          else if (usuario.userRol === "admin") navigate("/admin/inicio");
          else navigate("/");
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
    <div className="register-wrapper">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Iniciar Sesión</h2>

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="Contraseña"
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-submit">Iniciar Sesión</button>

        <div className="forgot-password-container">
          <button
            type="button"
            className="forgot-password-button"
            onClick={() => navigate("/forgot-password")}
          >
            ¿Se te olvidó tu contraseña?
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};
