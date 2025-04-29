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
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleDeleteClick = (usuarioAEliminar) => {
    setUsuarioAEliminar(usuarioAEliminar);
    setMostrarConfirmacion(true);
    console.log(usuarioAEliminar.allyID);
  };

  const confirmarEliminacion = async () => {
    try {
      await fetch(`http://localhost:3000/aliados/${usuarioAEliminar.allyID}`, {
        method: "DELETE",
      });

      // Actualizar lista en el frontend eliminando el usuario borrado
      setAllies((prev) =>
        prev.filter((a) =>
          a.allyID !== usuarioAEliminar.allyID 
        )
      );

      setMostrarConfirmacion(false);
      setUsuarioAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    const fetchAllies = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:3000/catalogo/aliados?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:3000/catalogo/aliados";

        const res = await fetch(url);
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

  return (
    <div>
      <div className="centered-menu">
        <img className="image" alt="Image" src="/img/image-12.png" />

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
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/escuelas")}>Solicitudes</div>
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
        {/* Encabezados */}
        <div className="catalogo-header">
          <div className="catalogo-cell">Nombre</div>
          <div className="catalogo-cell">Dirección</div>
          <div className="catalogo-cell">Teléfono</div>
          <div className="catalogo-cell">Necesidades</div>
          <div className="catalogo-cell">Eliminar</div>
        </div>

        {/* Datos */}
        {allies.map((ally) => {
          const nombre = ally.organizationName || ally.npInstitution || "No especificado";
          const direccion = ally.organizationAddress || "No especificado";
          const paginaWeb = ally.organizationWeb || "-";
          const telefono = ally.npPhone || user.userPhone;
          
          return (
            <div className="catalogo-row" key={ally.moralPersonID || ally.naturalPersonID}>
              <div className="catalogo-cell">{nombre}</div>
              <div className="catalogo-cell">{direccion}</div>
              <div className="catalogo-cell">{telefono}</div>
              <div className="catalogo-cell">{"Aquí pondrás el apoyo si lo recuperas después"}</div>
              <div className="catalogo-cell">
                <button onClick={() => handleDeleteClick(ally)}>
                  <Sort />
                </button>
              </div>
            </div>
          );
        })}

        {/* Modal de confirmación */}
      {mostrarConfirmacion && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Eliminar usuario</h2>
              <p>¿Seguro que quieres eliminar al aliado?</p>
              <div className="modal-actions">
                <button onClick={confirmarEliminacion} className="btn-confirmar">Sí</button>
                <button onClick={() => setMostrarConfirmacion(false)} className="btn-cancelar">No</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
};