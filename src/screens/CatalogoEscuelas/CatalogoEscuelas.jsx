import React, { useEffect, useState } from "react";
import "./style.css"; 
import { Sort } from "../../icons/Sort";
import { useNavigate } from "react-router-dom";


export const CatalogoEscuelas = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportFilter, setSupportFilter] = useState("");
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleDeleteClick = (usuarioAEliminar) => {
    setUsuarioAEliminar(usuarioAEliminar);
    setMostrarConfirmacion(true);
    console.log(usuarioAEliminar.schoolID);
  };

  const confirmarEliminacion = async () => {
    try {
      await fetch(`http://localhost:3000/escuelas/${usuarioAEliminar.schoolID}`, {
        method: "DELETE",
      });

      // Actualizar lista en el frontend eliminando el usuario borrado
      setSchools((prev) =>
        prev.filter((a) =>
          a.schoolID !== usuarioAEliminar.schoolID 
        )
      );

      setMostrarConfirmacion(false);
      setUsuarioAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };


  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("token");
        const url = supportFilter
          ? `http://localhost:3000/catalogo/escuelas?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:3000/catalogo/escuelas";
    
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!res.ok) throw new Error("Error al cargar escuelas");
        const data = await res.json();
        setSchools(data.users);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el catálogo de escuelas.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchSchools();
  }, [supportFilter]);

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
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/aliados")}>Aliados</div>
          <div className="nav-link" onClick={() => navigate("/mapado")}>Mapa</div>
          <div className="nav-link" onClick={() => navigate("/admin/solicitudes/escuelas")}>Solicitudes</div>
        </div>

        <button className="button-2" onClick={() => navigate("register")} style={{ cursor: "pointer" }}>
          <div className="text-wrapper-10">Perfil</div>
        </button>
      </div>
        <div className="catalogo-container">
        
        <h2 className="catalogo-title">Catálogo de Escuelas</h2>

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

    {loading && <p>Cargando escuelas...</p>}
    {error && <p className="error">{error}</p>}

    <div className="catalogo-grid">
      {/* Encabezados */}
      <div className="catalogo-cell header">Nombre</div>
      <div className="catalogo-cell header">Dirección</div>
      <div className="catalogo-cell header">Nivel Educativo</div>
      <div className="catalogo-cell header">Necesidades</div>
      <div className="catalogo-cell header">Eliminar</div>

      {/* Cada escuela */}
      {schools.map((school) => (
        <React.Fragment key={school.schoolID}>
          <div className="catalogo-cell">{school.schoolName}</div>
          <div className="catalogo-cell">
            {[school.street, school.colony, school.municipality, school.zip]
              .filter(Boolean)
              .join(", ")}
          </div>
          <div className="catalogo-cell">
            {Array.isArray(school.educationLevel)
              ? school.educationLevel.join(", ")
              : school.educationLevel || "No especificado"}
          </div>
          <div className="catalogo-cell">
            {Array.isArray(school.externalSupport)
              ? school.externalSupport.join(", ")
              : school.externalSupport || "No especificado"}
          </div>
          <div className="catalogo-cell">
            <button onClick={() => handleDeleteClick(school)} className="delete-button">
              <Sort />
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Eliminar usuario</h2>
              <p>¿Seguro que quieres eliminar a {usuarioAEliminar.schoolName}?</p>
              <div className="modal-actions">
                <button onClick={confirmarEliminacion} className="btn-confirmar">Sí</button>
                <button onClick={() => setMostrarConfirmacion(false)} className="btn-cancelar">No</button>
              </div>
            </div>
          </div>
        )}
    </div>
    </div>
  );
};