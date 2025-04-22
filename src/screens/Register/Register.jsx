import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Icon10 } from "../../icons/Icon10";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import "./style.css";

export const Register = () => {
  const [userRol, setRole] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [workCenterKey, setCCT] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Aquí es donde debes definirlo

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Estoy siendo presionado");
    setError("");
    setMessage("");
  
    // Validar que los campos esenciales no estén vacíos
    if (!userEmail || !userPassword || !userRol) {
      setError("Por favor, llena todos los campos.");
      return;
    }
  
    // Validar que el CCT esté presente solo si el rol es "school"
    if (userRol === "school" && !workCenterKey) {
      setError("Por favor, ingresa el CCT de la escuela.");
      return;
    }
  
    try {
      const data = {
        userEmail: userEmail,
        userPassword: userPassword,
        userRol: userRol,
        workCenterKey: userRol === "school" ? workCenterKey : null, // Solo enviamos el CCT si el rol es 'school'
      };
  
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setMessage("¡Usuario registrado con éxito! Espera que tu perfil se autorice para continuar.");
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Hubo un error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError("Hubo un error al intentar registrar el usuario.");
    }
  };  

  return (
    <div className="register-container">
      <div className="register-header">
        <h1 className="register-title">REGÍSTRATE</h1>
        <div className="register-icon" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <Icon10 color="#7E92A2" />
        </div>
      </div>
  
      {error && (
        <div className="error-message" aria-live="assertive">
          {error}
        </div>
      )}
      {message && (
        <div className="success-message" aria-live="polite">
          {message}
        </div>
      )}
  
      <div className="form-section">
        <label className="section-label">Selecciona tu rol</label>
        <div className="role-buttons">
          <button
            type="button"
            className={`role-button ${userRol === "ally" ? "active" : ""}`}
            onClick={() => setRole("ally")}
          >
            Aliado
          </button>
          <button
            type="button"
            className={`role-button ${userRol === "school" ? "active" : ""}`}
            onClick={() => setRole("school")}
          >
            Escuela
          </button>
        </div>
      </div>
  
      <div className="form-section">
        <Input
          label={true}
          text="Correo Electrónico"
          text1="ejemplo@correo.com"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
  
      <div className="form-section">
        <Input
          label={true}
          text="Contraseña"
          type="password"
          text1="••••••••"
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
  
      {userRol === "school" && (
        <div className="form-section">
          <Input
            label={true}
            text="CCT (Clave del Centro de Trabajo)"
            text1="Ingresa el CCT de tu escuela"
            value={workCenterKey}
            onChange={(e) => setCCT(e.target.value)}
            required
          />
        </div>
      )}
  
      <div className="form-actions">
        <Button
          type="submit"
          className="register-button"
          text="Registrarse"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
    </div>
  );  
};