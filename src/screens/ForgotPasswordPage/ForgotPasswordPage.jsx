// src/screens/ForgotPasswordPage/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- ESTILOS (Copia los de la versión anterior o crea un CSS) ---
const cardStyle = { maxWidth: '450px', margin: '50px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', textAlign: 'center', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'};
const titleStyle = { fontSize: '1.8em', fontWeight: 'bold', marginBottom: '20px', color: '#333', textTransform: 'uppercase', letterSpacing: '1px'};
const inputContainerStyle = { position: 'relative', marginBottom: '25px', textAlign: 'left' };
const labelStyle = { fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#555'};
const inputStyle = { width: 'calc(100% - 22px)', padding: '15px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1em', marginBottom: '5px' };
const buttonStyle = { width: '100%', padding: '15px', backgroundColor: '#283593', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1em', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', transition: 'background-color 0.3s ease'};
const buttonHoverStyle = { backgroundColor: '#1a237e'};
const messageStyle = (isError) => ({ marginTop: '20px', padding: '10px', borderRadius: '4px', fontWeight: 'bold', color: isError ? '#D32F2F' : '#388E3C', backgroundColor: isError ? '#FFCDD2' : '#C8E6C9' });
const textStyle = { marginBottom: '20px', color: '#666', lineHeight: '1.5'};
// --- Fin Estilos ---

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Para el botón de volver

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/forgotpassword', { // URL Backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: email }),
      });
      const data = await response.json();
      // El backend siempre responde éxito (200 OK) por seguridad, nos guiamos por el mensaje
      setMessage(data.message || "Solicitud procesada.");

    } catch (error) {
      console.error("Error en fetch forgot password:", error);
      setMessage('Error de conexión: No se pudo contactar al servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Recuperar Contraseña</h2>
      <p style={textStyle}>
        Ingresa tu correo electrónico. Si está registrado, te enviaremos
        un enlace para restablecer tu contraseña.
      </p>
      <form onSubmit={handleSubmit}>
        <div style={inputContainerStyle}>
          <label htmlFor="email" style={labelStyle}>Correo Electrónico:</label>
          <input type="email" id="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" required />
        </div>
        <button type="submit" style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
        </button>
      </form>
      {message && !isLoading && <p style={messageStyle(message.startsWith('Error'))}>{message}</p>}
      <button onClick={() => navigate('/')} style={{...buttonStyle, backgroundColor: '#757575', marginTop: '10px'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#616161'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#757575'}>
         Volver
      </button>
    </div>
  );
};