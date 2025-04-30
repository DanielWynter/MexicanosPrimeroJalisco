import React, { useEffect, useState } from "react";
import "./style.css";
import { Sort } from "../../icons/Sort";
import { useNavigate } from "react-router-dom";

export const UsersCatalogoAliados = () => {
  const navigate = useNavigate();
  const [allies, setAllies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportFilter, setSupportFilter] = useState("");
  const [selectedAlly, setSelectedAlly] = useState(null);

  useEffect(() => {
    const fetchAllies = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:3000/catalogo/aliados?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:3000/catalogo/aliados";

        const token = localStorage.getItem("token");
        const res = await fetch(url, {
          headers: {
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

  const handleCardClick = (ally) => {
    setSelectedAlly(ally);
  };

  const closeModal = () => {
    setSelectedAlly(null);
  };

  // ✅ FUNCION PARA ENVIAR MATCH
  const handleMatchRequest = async (allyID) => {
    const token = localStorage.getItem("token");
    const needID = localStorage.getItem("activeNeedID");

    if (!needID) {
      alert("No se ha seleccionado ninguna necesidad activa.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/needs/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ allyID, needID }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Match enviado:", data);
        alert("¡Solicitud de match enviada con éxito!");
      } else {
        console.error("Error al hacer match:", data.message);
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error del servidor:", error);
      alert("Error del servidor al enviar el match.");
    }
  };

  return (
    <div>
      <div className="centered-menu">
        <div className="logo">
          <div className="mexicanos-primero">
            Mexicanos Primero
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jalisco
          </div>
        </div>

        <div className="nav-menu">
          <div className="text-wrapper-4" onClick={() => navigate("/escuela")} style={{ cursor: "pointer" }}>Inicio</div>
          <div className="text-wrapper-5">Proyectos</div>
          <div className="text-wrapper-7" onClick={() => navigate("/mapado")} style={{ cursor: "pointer" }}>Mapa</div>
        </div>

<<<<<<< HEAD
        <button className="button-2" onClick={() => navigate("register")} style={{ cursor: "pointer" }}>
          <div className="text-wrapper-10">Perfil</div>
        </button>
=======
                  <div className="nav-menu">
                    <div className="text-wrapper-4" onClick={() => navigate("/schoolStart")} style={{cursor:"pointer"}}>Inicio</div>
                    <div className="text-wrapper-5">Proyectos</div>

                    <div className="text-wrapper-7" onClick={() => navigate("/mapado")} style={{cursor:"pointer"}}>Mapa</div>

                  </div>
                  
                  <button className="button-2" onClick={() => navigate("register")} style={{ cursor: "pointer" }}> <div className="text-wrapper-10">Perfil</div> </button>
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
>>>>>>> 9d16db6388882e058da0e6efff76d12e65ec12c8
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
          {/* Encabezados */}
          <div className="catalogo-header">
            <div className="catalogo-cell">Nombre</div>
            <div className="catalogo-cell">Dirección</div>
            <div className="catalogo-cell">Página Web</div>
            <div className="catalogo-cell">Teléfono</div>
            <div className="catalogo-cell">Necesidades</div>
          </div>

          {/* Datos */}
          {allies.map((ally) => {
            const nombre = ally.organizationName || ally.npInstitution || "No especificado";
            const direccion = ally.organizationAddress || "No especificado";
            const paginaWeb = ally.organizationWeb || "-";
            const telefono = ally.npPhone || "-";
            const need = ally.necessityType || "-";
            return (
              <div
                className="catalogo-row hover-effect"
                key={ally.moralPersonID || ally.naturalPersonID}
                onClick={() => handleCardClick(ally)}
              >
                <div className="catalogo-cell">{nombre}</div>
                <div className="catalogo-cell">{direccion}</div>
                <div className="catalogo-cellWebPage">{paginaWeb}</div>
                <div className="catalogo-cell">{telefono}</div>
                <div className="catalogo-cell">{need}</div>
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
              <p><strong>Apoyos Ofrecidos:</strong> {selectedAlly.necessityType || "-"}</p>
<<<<<<< HEAD

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <button onClick={() => handleMatchRequest(selectedAlly.allyID)}>Solicitar Match 🤝</button>
                <button onClick={closeModal}>Cerrar</button>
              </div>
=======
              <button onClick={closeModal}>Cerrar</button>

<button
  onClick={async () => {
    try {
      const token = localStorage.getItem("token");
      const schoolUser = JSON.parse(localStorage.getItem("user"));
      const schoolID = schoolUser?.schoolID;

      console.log("🔎 schoolID desde localStorage:", schoolID);

      const needsRes = await fetch(`http://localhost:3000/needs/${schoolID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const needs = await needsRes.json();
      console.log("🧾 Necesidades encontradas:", needs);

      if (!Array.isArray(needs) || needs.length === 0) {
        alert("Tu escuela no tiene necesidades registradas.");
        return;
      }

      const needID = needs[0]?.needID;
      if (!needID) {
        alert("No se pudo identificar una necesidad válida.");
        return;
      }

      console.log("🪙 token desde localStorage:", token);
      const response = await fetch("http://localhost:3000/matchHelp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          needID,
          allyID: selectedAlly.allyID,
        }),
      });
      
      const result = await response.json();
      console.log("🎯 Resultado del match:", result);
      
      if (response.ok) {
        alert("¡Solicitud de match enviada correctamente!");
        setSelectedAlly(null);
      } else {
        alert(result.message || "No se pudo solicitar el match.");
      }
      
    } catch (err) {
      console.error("Error al solicitar match:", err);
      alert("Error al hacer match.");
    }
  }}
>
  Solicitar Match
</button>



>>>>>>> 9d16db6388882e058da0e6efff76d12e65ec12c8
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
