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

  useEffect(() => {
    const fetchAllies = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:5000/catalogo/aliados?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:5000/catalogo/aliados";

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
                      Mexicanos Primero
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jalisco
                    </div>
                  </div>

                  <div className="nav-menu">
                    <div className="text-wrapper-4" onClick={() => navigate("/admin/inicio")} style={{cursor:"pointer"}}>Inicio</div>
                    <div className="text-wrapper-5">Proyectos</div>

                    <div className="text-wrapper-6" onClick={() => navigate("/admin/catalogo/escuelas")} style={{cursor:"pointer"}}>Escuelas</div>

                    <div className="text-wrapper-7" >Mapa</div>

                    <div className="group-4">
                      <div className="text-wrapper-8" onClick={() => navigate("/admin/catalogo/escuelas")} style={{cursor:"pointer"}}>Solicitudes</div>
                    </div>
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
          const telefono = ally.npPhone || user.userPhone;
          
          return (
            <div className="catalogo-row" key={ally.moralPersonID || ally.naturalPersonID}>
              <div className="catalogo-cell">{nombre}</div>
              <div className="catalogo-cell">{direccion}</div>
              <div className="catalogo-cell">{paginaWeb}</div>
              <div className="catalogo-cell">{telefono}</div>
              <div className="catalogo-cell">{"Aquí pondrás el apoyo si lo recuperas después"}</div>
            </div>
          );
        })}

      </div>
    </div>
    </div>
  );
};
