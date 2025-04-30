import React, { useEffect, useState } from "react";
import "./style.css";
import { Sort } from "../../icons/Sort";
import { useNavigate } from "react-router-dom";

export const CatalogoAliados = () => {
  const navigate = useNavigate();
  const [allies, setAllies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportFilter, setSupportFilter] = useState("");
  const [selectedAlly, setSelectedAlly] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolID = user?.schoolID;

  const handleMatchRequest = async (allyID) => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm("¿Confirmas hacer match con este aliado?");
    if (!confirm) return;

    try {
      const res = await fetch("http://localhost:3000/needs/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ schoolID, allyID }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Match solicitado correctamente");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Error al hacer match:", error);
      alert("Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    const fetchAllies = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = supportFilter
          ? `http://localhost:3000/catalogo/aliados?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:3000/catalogo/aliados";

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al cargar aliados");
        const data = await res.json();
        setAllies(data.users);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el catálogo de aliados.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllies();
  }, [supportFilter]);

  const closeModal = () => {
    setSelectedAlly(null);
  };

  return (
    <div>
      <div className="centered-menu">
        <div className="logo">
          <div className="mexicanos-primero">
            Mexicanos Primero<br />Jalisco
          </div>
        </div>

        <div className="nav-menu">
          <div className="nav-link" onClick={() => navigate("/")}>Inicio</div>
          <div className="nav-link">Proyectos</div>
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/escuelas")}>Escuelas</div>
          <div className="nav-link" onClick={() => navigate("/mapado")}>Mapa</div>
          <div className="nav-link" onClick={() => navigate("/admin/solicitudes/aliados")}>Solicitudes</div>
        </div>

        <button className="button-2" onClick={() => navigate("register")} style={{ cursor: "pointer" }}>
          <div className="text-wrapper-10">Perfil</div>
        </button>
      </div>

      <div className="catalogo-container">
        <h2 className="catalogo-title">Catálogo de Aliados</h2>

        <div className="catalogo-filter-container">
          <div className="catalogo-filter-box">
            <select
              value={supportFilter}
              onChange={(e) => setSupportFilter(e.target.value)}
              className="catalogo-filter"
            >
              <option value="">Filtro</option>
              <option value="Material didáctico">Material didáctico</option>
              <option value="Infraestructura">Infraestructura</option>
              <option value="Tecnológico">Tecnológico</option>
              <option value="Mobiliario">Mobiliario</option>
              <option value="Educación física">Educación física</option>
              <option value="Literarios">Literarios</option>
              <option value="Psicólogo">Psicólogo</option>
              <option value="Formación docente">Formación docente</option>
              <option value="Sexualidad">Sexualidad</option>
            </select>
          </div>

          <div className="catalogo-filter-icon">
            <Sort />
          </div>
        </div>

        {loading && <p>Cargando aliados...</p>}
        {error && <p className="error">{error}</p>}

        <div className="catalogo-grid">
          <div className="catalogo-header">
            <div className="catalogo-cell">Nombre</div>
            <div className="catalogo-cell">Dirección</div>
            <div className="catalogo-cell">Teléfono</div>
            <div className="catalogo-cell">Apoyos</div>
          </div>

          {allies.map((ally) => {
            const nombre = ally.organizationName || ally.npInstitution || "No especificado";
            const direccion = ally.organizationAddress || "No especificado";
            const telefono = ally.npPhone || "-";
            const apoyo = ally.support || "-";

            return (
              <div
                className="catalogo-row hover-effect"
                key={ally.allyID || ally.userEmail}
                onClick={() => setSelectedAlly(ally)}
              >
                <div className="catalogo-cell">{nombre}</div>
                <div className="catalogo-cell">{direccion}</div>
                <div className="catalogo-cell">{telefono}</div>
                <div className="catalogo-cell">{apoyo}</div>
              </div>
            );
          })}
        </div>

        {selectedAlly && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedAlly.profileImage || "https://www.w3schools.com/howto/img_avatar.png"}
                alt="perfil"
                className="modal-avatar"
              />
              <h3>{selectedAlly.organizationName || selectedAlly.npInstitution || "Nombre no especificado"}</h3>
              <p><strong>Dirección:</strong> {selectedAlly.organizationAddress || "No especificada"}</p>
              <p><strong>Página Web:</strong> {selectedAlly.organizationWeb || "-"}</p>
              <p><strong>Teléfono:</strong> {selectedAlly.npPhone || selectedAlly.userPhone || "-"}</p>
              <p><strong>Apoyos Ofrecidos:</strong> {selectedAlly.support || "Sin especificar"}</p>

              <div className="modal-actions">
                <button className="btn-match" onClick={() => handleMatchRequest(selectedAlly.allyID)}>
                  Solicitar Match
                </button>
                <button onClick={closeModal} className="btn-cerrar">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
