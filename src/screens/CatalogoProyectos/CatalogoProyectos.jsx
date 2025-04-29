import React, { useEffect, useState } from "react";
import "./style.css"; 
import { Sort } from "../../icons/Sort";
import { useNavigate } from "react-router-dom";


export const CatalogoProyectos = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportFilter, setSupportFilter] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:5000/catalogo/proyectos?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:5000/catalogo/proyectos";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al cargar proyectos");
        const data = await res.json();
        setProjects(data.users);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el catálogo de proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/escuelas")}>Escuelas</div>
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/aliados")}>Aliados</div>
          <div className="nav-link" onClick={() => navigate("/mapado")}>Mapa</div>
          <div className="nav-link" >Solicitudes</div>
        </div>

        <button className="button-2" onClick={() => navigate("register")} style={{ cursor: "pointer" }}>
          <div className="text-wrapper-10">Perfil</div>
        </button>
      </div>
        <div className="catalogo-container">
        
        <h2 className="catalogo-title">Catálogo de Proyectos</h2>

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
      <div className="catalogo-cell header">Escuela</div>
      <div className="catalogo-cell header">Aliado</div>
      <div className="catalogo-cell header">Necesidades</div>
      <div className="catalogo-cell header">Acciones</div>

      
      {/* Datos */}
              {projects.map((project) => {
                const allyName = project.organizationName || project.npInstitution || "No especificado";
                
                return (
                  <div className="catalogo-row" key={project.projectID}>
                    <div className="catalogo-cell">{project.projectname}</div>
                    <div className="catalogo-cell">{project.schoolName}</div>
                    <div className="catalogo-cell">{project.allyName}</div>
                    <div className="catalogo-cell">{project.needs}</div>
                    <div className="catalogo-cell">
                      <button onClick={() => handleDeleteClick(ally)}>
                        <Sort />
                      </button>
                    </div>
                  </div>
                );
              })}
    </div>
    </div>
    </div>
  );
};
