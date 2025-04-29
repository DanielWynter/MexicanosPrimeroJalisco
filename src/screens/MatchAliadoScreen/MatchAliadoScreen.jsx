import React, { useEffect, useState } from "react";
import "./style.css";

export const MatchAliadoScreen = () => {
  const [escuelas, setEscuelas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null); // Nuevo estado

  useEffect(() => {
    const fetchEscuelas = async () => {
      try {
        const response = await fetch("http://localhost:3000/schools");
        const data = await response.json();
        if (data.success) {
          setEscuelas(data.data);
        } else {
          console.error("Error en respuesta:", data.message);
        }
      } catch (error) {
        console.error("Error al traer escuelas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscuelas();
  }, []);

  const handleSchoolClick = (escuela) => {
    setSelectedSchool(escuela);
  };

  const handleMatchRequest = () => {
    alert(`Solicitud de match enviada para la escuela ID: ${selectedSchool.schoolID}`);
    // Aquí luego conectamos con backend real
    setSelectedSchool(null); // Cerrar modal
  };

  const handleCloseModal = () => {
    setSelectedSchool(null);
  };

  return (
    <div className="match-aliado-screen">
      <div className="match-aliado-2">
        {loading ? (
          <p>Cargando escuelas...</p>
        ) : escuelas.length > 0 ? (
          escuelas.map((escuela) => (
            <div
              key={escuela.userID}
              className="school-card"
              onClick={() => handleSchoolClick(escuela)}
              style={{ cursor: "pointer" }}
            >
              <h2>Escuela:</h2>
              <p>ID interno: {escuela.schoolID}</p>
            </div>
          ))
        ) : (
          <p>No hay escuelas registradas aún.</p>
        )}
      </div>

      {/* Modal */}
      {selectedSchool && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Información de la Escuela</h2>
            <p><strong>ID de usuario:</strong> {selectedSchool.userID}</p>
            <p><strong>Email:</strong> {selectedSchool.userEmail}</p>
            <p><strong>ID interno escuela:</strong> {selectedSchool.schoolID}</p>
            {/* Más datos que quieras mostrar */}

            <button onClick={handleMatchRequest} className="button-match">Solicitar Match</button>
            <button onClick={handleCloseModal} className="button-close">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};
