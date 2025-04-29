import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const SolicitudesAliados = () => {
  const navigate = useNavigate();
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/solicitudes/aliados", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al cargar aliados pendientes");
      const data = await res.json();
      setPendientes(data.users);
    } catch (err) {
      setError("No se pudieron cargar los aliados pendientes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const aceptarAliado = async (userID) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/admin/aceptar-aliado/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al aceptar aliado");
      setPendientes(pendientes.filter((a) => a.userID !== userID));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  return (
    <div className="solicitudes-container">
      <h2 className="solicitudes-title">Solicitudes de Aliados Pendientes</h2>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {pendientes.length === 0 && !loading && (
        <p>No hay solicitudes pendientes por el momento.</p>
      )}

      <div className="solicitudes-grid">
        <div className="solicitudes-cell header">Nombre</div>
        <div className="solicitudes-cell header">Correo</div>
        <div className="solicitudes-cell header">Aceptar</div>

        {pendientes.map((a) => (
          <React.Fragment key={a.userID}>
            <div className="solicitudes-cell">{a.orgName || a.npInstitution || "Sin nombre"}</div>
            <div className="solicitudes-cell">{a.userEmail}</div>
            <div className="solicitudes-cell">
              <button onClick={() => aceptarAliado(a.userID)} className="btn-confirmar">
                Aceptar
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
