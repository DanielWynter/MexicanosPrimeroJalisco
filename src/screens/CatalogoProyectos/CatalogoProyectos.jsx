// 📁 frontend/components/CatalogoProyectos.jsx
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [editForm, setEditForm] = useState({
    projectName: "",
    description: "",
    needs: "",
    status: "en progreso",
    deliveryDates: [],
    projectID: null
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = supportFilter
          ? `http://localhost:3000/catalogo/proyectos?apoyo=${encodeURIComponent(supportFilter)}`
          : "http://localhost:3000/catalogo/proyectos";

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

  const openEditModal = (project) => {
    setSelectedProject(project);
    setEditForm({
      projectID: project.projectid,
      projectName: project.projectname,
      description: project.description || "",
      needs: Array.isArray(project.needs) ? project.needs.join(", ") : project.needs,
      status: project.status || "en progreso",
      deliveryDates: project.deliverydates || []
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleDeliveryDateChange = (index, field, value) => {
    const updatedDates = [...editForm.deliveryDates];
    updatedDates[index][field] = value;
    setEditForm({ ...editForm, deliveryDates: updatedDates });
  };

  const addDeliveryDate = () => {
    setEditForm({
      ...editForm,
      deliveryDates: [...editForm.deliveryDates, { date: "", description: "" }]
    });
  };

  const submitEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/projects/edit/${editForm.projectID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: editForm.projectName,
          description: editForm.description,
          needs: editForm.needs.split(",").map(n => n.trim()),
          status: editForm.status,
          deliveryDates: editForm.deliveryDates
        })
      });
      if (!response.ok) throw new Error("Error al actualizar el proyecto");
      const updated = await response.json();
      alert("Proyecto actualizado correctamente");
      setSelectedProject(null);
    } catch (err) {
      alert("Error al editar proyecto: " + err.message);
    }
  };

  return (
    <div>
      <div className="centered-menu">
        <img className="image" alt="Image" src="/img/image-12.png" />
        <div className="logo">
          <div className="mexicanos-primero">Mexicanos Primero<br />Jalisco</div>
        </div>
        <div className="nav-menu">
          <div className="nav-link" onClick={() => navigate("/admin/inicio")}>Inicio</div>
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/escuelas")}>Escuelas</div>
          <div className="nav-link" onClick={() => navigate("/admin/catalogo/aliados")}>Aliados</div>
          <div className="nav-link" onClick={() => navigate("/mapado")}>Mapa</div>
          <div className="nav-link">Solicitudes</div>
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
          <div className="catalogo-cell header">Nombre</div>
          <div className="catalogo-cell header">Escuela</div>
          <div className="catalogo-cell header">Aliado</div>
          <div className="catalogo-cell header">Necesidades</div>
          <div className="catalogo-cell header">Acciones</div>

          {projects.map((project) => {
            const allyName = project.organizationName || project.npInstitution || "No especificado";
            return (
              <div className="catalogo-row" key={project.projectid}>
                <div className="catalogo-cell">{project.projectname}</div>
                <div className="catalogo-cell">{project.schoolName}</div>
                <div className="catalogo-cell">{allyName}</div>
                <div className="catalogo-cell">{Array.isArray(project.needs) ? project.needs.join(", ") : project.needs}</div>
                <div className="catalogo-cell">
                  <button onClick={() => openEditModal(project)}>
                    <Sort />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProject && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h3>Editar Proyecto</h3>

              <p><strong>Escuela:</strong> {selectedProject.schoolName}</p>
              <p><strong>Aliado:</strong> {selectedProject.organizationName || selectedProject.npInstitution}</p>

              <label htmlFor="projectName">Nombre del proyecto</label>
              <input
                id="projectName"
                name="projectName"
                value={editForm.projectName}
                onChange={handleEditChange}
                required
              />

              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows="3"
              />

              <label htmlFor="needs">Necesidades (separadas por coma)</label>
              <input
                id="needs"
                name="needs"
                value={editForm.needs}
                onChange={handleEditChange}
                required
              />

              <label htmlFor="status">Estatus</label>
              <select
                id="status"
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
              >
                <option value="en progreso">En progreso</option>
                <option value="cancelado">Cancelado</option>
                <option value="completado">Completado</option>
              </select>

              <h4>Fechas de Entrega</h4>
              {editForm.deliveryDates.map((item, index) => (
                <div className="delivery-row" key={index}>
                  <input
                    type="date"
                    value={item.date || ""}
                    onChange={(e) => handleDeliveryDateChange(index, "date", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={item.description || ""}
                    onChange={(e) => handleDeliveryDateChange(index, "description", e.target.value)}
                  />
                </div>
              ))}
              <button onClick={addDeliveryDate} className="btn-agregar-fecha">+ Agregar fecha</button>

              <div className="modal-actions">
                <button onClick={submitEdit} className="btn-confirmar">Guardar</button>
                <button onClick={() => setSelectedProject(null)} className="btn-cancelar">Cancelar</button>
              </div>
            </div>
          </div>
        )}


        {/* Botón flotante para crear proyecto */}
        <button
          onClick={() => navigate("/admin/project/create")}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#0B8457",
            color: "white",
            fontSize: "32px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
          }}
          title="Crear proyecto"
        >
          +
        </button>
      </div>
    </div>
  );
};
