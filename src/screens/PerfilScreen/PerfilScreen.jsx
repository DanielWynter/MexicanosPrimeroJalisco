import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export const PerfilScreen = () => {
  const [form, setForm] = useState({ userName: "", userEmail: "", userPassword: "", cct: "" });
  const [imagenURL, setImagenURL] = useState("/img/image-12.png");
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!user || !token || !["school", "ally"].includes(user.userRol)) {
        localStorage.clear();
        navigate("/iniciarSesion");
        return;
      }
      setRol(user.userRol);
      try {
        const session = await fetch("http://localhost:3000/verificar-sesion", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!session.ok) throw new Error("Sesión inválida");

        const endpoint = user.userRol === "school" ? "escuela" : "aliado";
        const res = await fetch(`http://localhost:3000/perfil/${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener perfil");

        const data = await res.json();
        setImagenURL(data.profileImage || "/img/image-12.png");
        setForm({
          userName: data.userName || "",
          userEmail: data.userEmail || "",
          userPassword: "",
          cct: data.cct || "",
        });
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagenURL(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userRol = user?.userRol;

    try {
      const res = await fetch(
        `http://localhost:3000/actualizar-perfil-${userRol === "school" ? "escuela" : "aliado"}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar");

      const updatedUser = { ...user, userName: form.userName, userEmail: form.userEmail };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Perfil actualizado correctamente");
      setEditando(false);
    } catch (error) {
      console.error("❌ Error guardando perfil:", error);
      alert("Hubo un error al guardar los cambios");
    }
  };

  const handleLlenarFormulario = () => {
    if (rol === "school") navigate("/formulario-escuela-1");
    else if (rol === "ally") navigate("/formulario-aliado-1");
  };

  if (loading) return <div className="perfil-container">Cargando...</div>;
  if (error) return <div className="perfil-container">{error}</div>;

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-title">Perfil de {rol === "school" ? "la Escuela" : "Aliado"}</h2>

        <div className="perfil-imagen">
          <img src={imagenURL} alt="Foto de perfil" className="foto-perfil" />
          {editando && (
            <label className="subir-foto">
              Cambiar
              <input type="file" onChange={handleImageChange} hidden />
            </label>
          )}
        </div>

        <div className="perfil-info">
          <label>Nombre de Usuario</label>
          {editando ? (
            <input type="text" name="userName" value={form.userName} onChange={handleChange} />
          ) : (
            <p>{form.userName}</p>
          )}

          <label>Correo Electrónico</label>
          {editando ? (
            <input type="email" name="userEmail" value={form.userEmail} onChange={handleChange} />
          ) : (
            <p>{form.userEmail}</p>
          )}

          <label>Contraseña</label>
          {editando ? (
            <input type="password" name="userPassword" value={form.userPassword} onChange={handleChange} />
          ) : (
            <p>********</p>
          )}

          {rol === "school" && (
            <>
              <label>CCT</label>
              {editando ? (
                <input type="text" name="cct" value={form.cct} onChange={handleChange} />
              ) : (
                <p>{form.cct}</p>
              )}
            </>
          )}
        </div>

        <div className="perfil-botones">
          <button onClick={() => (editando ? handleSave() : setEditando(true))} className="btn-perfil">
            {editando ? "Guardar Cambios" : "Editar Perfil"}
          </button>
          <button onClick={handleLlenarFormulario} className="btn-perfil secundaria">
            Llenar Formulario
          </button>
        </div>
      </div>
    </div>
  );
};
