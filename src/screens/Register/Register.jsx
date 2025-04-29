import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import graduationHat from "../../icons/graduation-hat.png";
import savingIcon from "../../icons/saving.png";
import "./style.css";

export const Register = () => {
  const [userRol, setRole] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [workCenterKey, setCCT] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!userEmail || !userPassword || !userRol) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    if (userRol === "school" && !workCenterKey) {
      setError("Por favor, ingresa el CCT de la escuela.");
      return;
    }

    try {
      const data = {
        userEmail,
        userPassword,
        userRol,
        ...(userRol === "school" && { workCenterKey }),
      };

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("¡Usuario registrado con éxito! Espera que tu perfil se autorice para continuar.");
      } else {
        setError(result.message || "Hubo un error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError("Hubo un error al intentar registrar el usuario.");
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Regístrate</h2>

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

        {userRol === "school" && (
          <input
            className="register-input"
            placeholder="CCT (Clave del Centro de Trabajo)"
            value={workCenterKey}
            onChange={(e) => setCCT(e.target.value)}
            required
          />
        )}

        <label className="role-label">Elige un usuario</label>
        <div className="role-icons">
          <div
            className={`role-option ${userRol === "school" ? "selected" : ""}`}
            onClick={() => setRole("school")}
          >
            <img src={graduationHat} alt="Escuela" />
            <span>Escuela</span>
          </div>
          <div
            className={`role-option ${userRol === "ally" ? "selected" : ""}`}
            onClick={() => setRole("ally")}
          >
            <img src={savingIcon} alt="Aliado" />
            <span>Aliado</span>
          </div>
        </div>

        <button type="submit" className="register-submit">Registrarse</button>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};
