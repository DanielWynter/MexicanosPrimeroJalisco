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
    e.preventDefault(); // Prevenir la acción predeterminada de enviar el formulario
    console.log("Formulario de login enviado");
    setError("");
    setMessage("");

    // Validar que los campos no estén vacíos
    if (!userEmail || !userPassword) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    try {
      const data = {
        userEmail: userEmail,
        userPassword: userPassword,
      };

      // Realizar la petición de login
      const response = await fetch("http://localhost:3000/IniciarSesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Obtener los datos de usuario después de un login exitoso
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData)); // Guardar los datos del usuario en el almacenamiento local

        setMessage("¡Inicio de sesión exitoso!");

        // Redirigir al usuario a la página principal
        navigate("/");
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Hubo un error al iniciar sesión.");
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
        <span className="login-icon">✖</span>
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
