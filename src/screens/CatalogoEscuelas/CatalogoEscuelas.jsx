import React, { useEffect, useState } from "react";
import "./style.css"; 
import { Sort } from "../../icons/Sort";

/*
<div className="arrow-left-1-wrapper">
                <ArrowLeft1 className="icon-instance-node-7" />
              </div>
*/

export const CatalogoEscuelas = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportFilter, setSupportFilter] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:5000/catalogo/escuelas?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:5000/catalogo/escuelas";

        const res = await fetch(url);
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
                  <img className="image" alt="Image" src="/img/image-12.png" />

                  <div className="logo">
                    <div className="mexicanos-primero">
                      Mexicanos Primero
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jalisco
                    </div>
                  </div>

                  <div className="nav-menu">
                    <div className="text-wrapper-4" onClick={() => navigate("/")} style={{cursor:"pointer"}}>Inicio</div>
                    <div className="text-wrapper-5">Solicitudes</div>

                    <div className="text-wrapper-6">Proyectos</div>

                    <div className="text-wrapper-7" onClick={() => navigate("admin/catalogo/escuelas")} style={{cursor:"pointer"}}>Mapa</div>

                    <div className="group-4">
                      <div className="text-wrapper-8">Aliados</div>
                    </div>
                  </div>
    
                  <button className="button-2" onClick={() => navigate("register")} style={{ cursor: "pointer" }}> <div className="text-wrapper-10">Perfil</div> </button>
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
        <div className="catalogo-header">
          <div className="catalogo-cell">Nombre</div>
          <div className="catalogo-cell">Calle</div>
          <div className="catalogo-cell">Sector</div>
          <div className="catalogo-cell">Nivel Educativo</div>
          <div className="catalogo-cell">Necesidades</div>
        </div>

        {/* Datos */}
        {schools.map((school) => (
          <div className="catalogo-row" key={school.schoolID}>
            <div className="catalogo-cell">{school.schoolName}</div>
            <div className="catalogo-cell">{[school.street,school.colony,school.municipality]}</div>
            <div className="catalogo-cell">{school.schoolSector}</div>
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
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
