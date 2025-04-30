import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const MiProyecto = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    description: "",
    deliveryDates: []
  });

  useEffect(() => {
    const fetchMyProject = async () => {
      const id = 53; // ID predeterminado temporal

      try {
        const res = await fetch(`http://localhost:3000/misProyectos?id=${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al cargar proyecto.");
        setProject(data.project);
        setForm({
          description: data.project.description || "",
          deliveryDates: data.project.deliveryDates || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProject();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (index, field, value) => {
    const updated = [...form.deliveryDates];
    updated[index][field] = value;
    setForm({ ...form, deliveryDates: updated });
  };

  const handleAddDate = () => {
    setForm({ ...form, deliveryDates: [...form.deliveryDates, { date: "", description: "" }] });
  };

  const handleSave = async () => {
    if (!form.description.trim()) {
      alert("La descripción no puede estar vacía.");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/projects/edit/${project.projectid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: form.description,
          deliveryDates: form.deliveryDates
        })
      });
      if (!res.ok) throw new Error("Error al guardar cambios");
      alert("Cambios guardados");
      setEditMode(false);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Cargando proyecto...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  if (!project) return <p style={{ padding: "20px" }}>No estás asignado a ningún proyecto aún.</p>;

  const allyName = project.organizationName || project.npInstitution || "Sin asignar";

  return (
    <div className="catalogo-container">
      <h2 className="catalogo-title">Mi Proyecto</h2>
      <div className="catalogo-grid">
        <div className="catalogo-cell header">Nombre</div>
        <div className="catalogo-cell header">Escuela</div>
        <div className="catalogo-cell header">Aliado</div>
        <div className="catalogo-cell header">Necesidades</div>
        <div className="catalogo-cell header">Estatus</div>

        <div className="catalogo-row">
          <div className="catalogo-cell">{project.projectname}</div>
          <div className="catalogo-cell">{project.schoolName}</div>
          <div className="catalogo-cell">{allyName}</div>
          <div className="catalogo-cell">{Array.isArray(project.needs) ? project.needs.join(", ") : project.needs}</div>
          <div className="catalogo-cell">{project.status}</div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Descripción del proyecto</h4>
        {editMode ? (
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            style={{ width: "100%" }}
          />
        ) : (
          <p>{project.description || "Sin descripción registrada."}</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Fechas de Entrega</h4>
        {form.deliveryDates?.map((item, i) => (
          <div key={i} className="delivery-row">
            {editMode ? (
              <>
                <input
                  type="date"
                  value={item.date || ""}
                  onChange={(e) => handleDateChange(i, "date", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Descripción"
                  value={item.description || ""}
                  onChange={(e) => handleDateChange(i, "description", e.target.value)}
                />
              </>
            ) : (
              <li>{item.date} - {item.description}</li>
            )}
          </div>
        ))}
        {editMode && (
          <button onClick={handleAddDate} style={{ marginTop: "10px" }}>+ Agregar fecha</button>
        )}
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {editMode ? (
          <>
            <button className="button-2" onClick={handleSave}>Guardar</button>
            <button className="button-2" onClick={() => setEditMode(false)}>Cancelar</button>
          </>
        ) : (
          <button className="button-2" onClick={() => setEditMode(true)}>Editar Proyecto</button>
        )}
        <button className="button-2" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
};
