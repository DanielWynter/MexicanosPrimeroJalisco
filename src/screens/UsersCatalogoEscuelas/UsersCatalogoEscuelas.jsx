import React, { useEffect, useState } from "react";
import "./style.css"; 
import { Sort } from "../../icons/Sort";
import { useNavigate } from "react-router-dom";


export const UsersCatalogoEscuelas = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportFilter, setSupportFilter] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);


  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:3000/catalogo/escuelas?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:3000/catalogo/escuelas";

          const token = localStorage.getItem("token");
          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
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

  const handleCardClick = (school) => {
    setSelectedSchool(school);
    };
    
  const closeModal = () => {
    setSelectedSchool(null);
    };

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
                    <div className="text-wrapper-4" onClick={() => navigate("/aliado/inicio")} style={{cursor:"pointer"}}>Inicio</div>

                    <div className="text-wrapper-6">Proyectos</div>

                    <div className="text-wrapper-7" onClick={() => navigate("/mapado")} style={{cursor:"pointer"}}>Mapa</div>

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
            <div className="catalogo-cell header">Nombre</div>
            <div className="catalogo-cell header">Dirección</div>
            <div className="catalogo-cell header">Sector</div>
            <div className="catalogo-cell header">Nivel Educativo</div>
            <div className="catalogo-cell header">Necesidades</div>
          
            {schools.map((school) => (
              <div
                className="catalogo-row hover-effect"
                key={school.schoolID}
                onClick={() => handleCardClick(school)}
              >
                <div className="catalogo-cell">{school.schoolName}</div>
                <div className="catalogo-cell">
                  {[school.street, school.colony, school.municipality, school.zip].filter(Boolean).join(", ")}
                </div>
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

            {selectedSchool && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={selectedSchool.profileImage || "https://www.w3schools.com/howto/img_avatar.png"}
                    alt="perfil"
                    className="modal-avatar"
                  />
                  <h3>{selectedSchool.schoolName}</h3>
                  <p><strong>Director:</strong> {selectedSchool.principalName}</p>
                  <p><strong>Correo:</strong> {selectedSchool.principalEmail}</p>
                  <p><strong>Nivel educativo:</strong> {Array.isArray(selectedSchool.educationLevel) ? selectedSchool.educationLevel.join(", ") : selectedSchool.educationLevel}</p>
                  <p><strong>Dirección:</strong> {[selectedSchool.street, selectedSchool.colony, selectedSchool.municipality, selectedSchool.zip].filter(Boolean).join(", ")}</p>
                  <p><strong>Sector:</strong> {selectedSchool.schoolSector}</p>
                  <p><strong>Necesidades:</strong> {Array.isArray(selectedSchool.externalSupport) ? selectedSchool.externalSupport.join(", ") : selectedSchool.externalSupport}</p>
                  <button onClick={closeModal}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
  </div>
  );
};