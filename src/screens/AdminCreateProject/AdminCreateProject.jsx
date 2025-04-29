import React, { useEffect, useState } from "react";
import "./style.css"; 

export const AdminCreateProject = () => {
  const [schools, setSchools] = useState([]);
  const [allies, setAllies] = useState([]);
  const [form, setForm] = useState({
    schoolID: "",
    allyID: "",
    projectName: "",
    description: "",
    needs: [],
    deliveryDates: [{ date: "", activity: "" }]
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/catalogo/escuelas")
      .then((res) => res.json())
      .then((data) => setSchools(data.users || []));

    fetch("http://localhost:5000/catalogo/aliados")
      .then((res) => res.json())
      .then((data) => setAllies(data.users || []));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNeedsChange = (e) => {
    const needs = e.target.value.split(",").map((s) => s.trim());
    setForm({ ...form, needs });
  };

  const handleDateChange = (index, field, value) => {
    const updated = [...form.deliveryDates];
    updated[index][field] = value;
    setForm({ ...form, deliveryDates: updated });
  };

  const addDeliveryDate = () => {
    setForm({
      ...form,
      deliveryDates: [...form.deliveryDates, { date: "", activity: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        status: "en progreso",
        authorization: "autorizado"
      })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Proyecto creado con éxito");
      setForm({
        schoolID: "",
        allyID: "",
        projectName: "",
        description: "",
        needs: [],
        deliveryDates: [{ date: "", activity: "" }]
      });
    } else {
      setMessage("Error: " + data.message);
    }
  };

  return (
    <div className="create-project-form">
      <h2>Crear Proyecto</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Escuela:</label>
        <select name="schoolID" value={form.schoolID} onChange={handleChange} required>
          <option value="">Selecciona una escuela</option>
          {schools.map((s) => (
            <option key={s.schoolID} value={s.schoolID}>{s.schoolName}</option>
          ))}
        </select>

        <label>Aliado:</label>
        <select name="allyID" value={form.allyID} onChange={handleChange} required>
          <option value="">Selecciona un aliado</option>
          {allies.map((a) => (
            <option key={a.allyID} value={a.allyID}>{a.organizationName || a.npInstitution}</option>
          ))}
        </select>

        <label>Nombre del Proyecto:</label>
        <input type="text" name="projectName" value={form.projectName} onChange={handleChange} required />

        <label>Descripción:</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label>Necesidades (separadas por comas):</label>
        <input type="text" name="needs" onChange={handleNeedsChange} />

        <label>Fechas de Entrega:</label>
        {form.deliveryDates.map((d, i) => (
          <div key={i}>
            <input
              type="date"
              value={d.date}
              onChange={(e) => handleDateChange(i, "date", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Actividad"
              value={d.activity}
              onChange={(e) => handleDateChange(i, "activity", e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addDeliveryDate}>+ Agregar otra fecha</button>

        <br /><br />
        <button type="submit">Crear Proyecto</button>
      </form>
    </div>
  );
};
