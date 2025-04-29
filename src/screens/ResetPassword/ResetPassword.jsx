// src/screens/ResetPassword/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// --- ESTILOS (Copia los de ForgotPasswordPage o usa un CSS) ---
const cardStyle = { maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', textAlign: 'center', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' };
const titleStyle = { fontSize: '1.8em', fontWeight: 'bold', marginBottom: '30px', color: '#333', textTransform: 'uppercase', letterSpacing: '1px' };
const inputContainerStyle = { position: 'relative', marginBottom: '25px', textAlign: 'left' };
const labelStyle = { fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#555' };
const inputStyle = { width: 'calc(100% - 22px)', padding: '15px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1em', marginBottom: '5px' };
const buttonStyle = { width: '100%', padding: '15px', backgroundColor: '#283593', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1em', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', transition: 'background-color 0.3s ease' };
const buttonHoverStyle = { backgroundColor: '#1a237e' };
const messageStyle = (isError) => ({ marginTop: '20px', padding: '10px', borderRadius: '4px', fontWeight: 'bold', color: isError ? '#D32F2F' : '#388E3C', backgroundColor: isError ? '#FFCDD2' : '#C8E6C9' });
// --- Fin Estilos ---


export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token'); // Obtiene el token de la URL

  useEffect(() => {
    if (!token) {
      setMessage("Token de reseteo inválido o no encontrado en la URL. Por favor, usa el enlace enviado a tu email.");
      setIsSuccess(false);
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsSuccess(false);

    if (!token) { setMessage("Error: Token no encontrado."); return; }
    if (password.length < 6) { setMessage("Error: La contraseña debe tener al menos 6 caracteres."); return; }
    if (password !== confirmPassword) { setMessage("Error: Las contraseñas no coinciden."); return; }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/changepassword', { // URL Backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token, newPassword: password }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message + " Serás redirigido a la página de inicio de sesión.");
        setIsSuccess(true);
        setPassword(''); setConfirmPassword(''); // Limpia campos
        setTimeout(() => navigate('/'), 4000); // Redirige al inicio/login después de 4 seg
      } else {
        setMessage(`Error: ${data.message || 'Ocurrió un error.'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Error de conexión: No se pudo contactar al servidor.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Restablecer Contraseña</h2>
      {!token ? ( // Muestra error si no hay token
        <p style={messageStyle(true)}>{message || "Enlace inválido."}</p>
      ) : ( // Muestra formulario si hay token
        <form onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <label htmlFor="password" style={labelStyle}>Nueva Contraseña:</label>
            <input type="password" id="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required />
          </div>
          <div style={inputContainerStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>Confirmar Contraseña:</label>
            <input type="password" id="confirmPassword" style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" required />
          </div>
          <button type="submit" style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Nueva Contraseña'}
          </button>
        </form>
      )}
      {message && !isLoading && <p style={messageStyle(!isSuccess)}>{message}</p>}
    </div>
  );
};