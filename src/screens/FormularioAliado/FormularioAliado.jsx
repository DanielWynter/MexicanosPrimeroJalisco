import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Icon10 } from "../../icons/Icon10";
import { Icon11 } from "../../icons/Icon11";
import { useNavigate } from "react-router-dom"; 
import "./style.css";

export const FormularioAliado = () => {
  const [formAlly, setFormAlly] = useState({
    orgName: "",
    giro: "",
    orgPurpose: "",
    orgAddress: "",
    orgPhone: "",
    orgWeb: "",
    psNumber: "",
    psDate: "",
    notaryName: "",
    city: "",
    rfc: "",
    socialReason: "",
    regimen: "",
    taxAddress: "",
    representativeName: "",
    representativeAddress: "",
    representativePhone: "",
    area: "",
    npName: "",
    npEmail: "",
    npPhone: "",
    npCURP: "",
    npInstitution: "",
    npReason: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Para almacenar los mensajes de error
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensaje de error en cada intento de submit

    try {
      const response = await fetch("http://localhost:3000/ally_format", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formAlly),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Registrado:", result.data);
        navigate("/"); // Redirigir al siguiente paso solo si la respuesta es exitosa
      } else {
        console.error("Error:", result.message);
        setErrorMessage(result.message || "No se pudo registrar."); // Mostrar error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Hubo un error en la solicitud, por favor intenta nuevamente."); // Mostrar error en caso de problemas de red
    }
  };

  return (
    <div className="formulario-escuela">
      <div className="group-wrapper-2">
        <div className="registrarse-wrapper">
          <div className="registrarse">
            <div className="modal-edit-deal">
              <div className="title">
                <div className="text-wrapper-21">ALIADO</div>
                <Button
                  className="button-instance" 
                  onClick={() => navigate("/")}
                  icon={<Icon10 className="icon-10" color="#7E92A2" />}
                  style="white"
                  type="icon-only"
                />
              </div>

              <div className="form-edit-deal-form">
                <div className="content-SCROLL">
                  <div className="form">
                    <div className="upload-image">
                      <div className="label-3">Datos de la institución (persona moral)</div>
                      <Input
                        className="input-instance"
                        label
                        text="Nombre de la organización"
                        value={formAlly.orgName}
                        onChange={(e) => setFormAlly({ ...formAlly, orgName: e.target.value })}
                        text1="Nombre"
                      />
                    </div>

                    <Input
                      className="input-instance"
                      label
                      text="Giro"
                      value={formAlly.giro}
                      onChange={(e) => setFormAlly({ ...formAlly, giro: e.target.value })}
                      text1="Giro"
                    />

                    <Input
                      className="input-instance"
                      label
                      text="Propósito de la organización"
                      value={formAlly.orgPurpose}
                      onChange={(e) => setFormAlly({ ...formAlly, orgPurpose: e.target.value })}
                      text1="Propósito"
                    />

                    <Input
                      className="input-instance"
                      label
                      text="Domicilio"
                      value={formAlly.orgAddress}
                      onChange={(e) => setFormAlly({ ...formAlly, orgAddress: e.target.value })}
                      text1="Domicilio"
                    />

                    <Input
                      className="input-instance"
                      icon={<Icon11 className="icon-11" />}
                      label
                      text="Teléfono"
                      text1="Teléfono"
                      value={formAlly.orgPhone}
                      onChange={(e) => setFormAlly({ ...formAlly, orgPhone: e.target.value })}
                    />
                    <Input
                      className="input-instance"
                      icon={<Icon11 className="icon-11" />}
                      label
                      text="Págnia web oficial"
                      text1="Web.com"
                      value={formAlly.orgWeb}
                      onChange={(e) => setFormAlly({ ...formAlly, orgWeb: e.target.value })}
                    />

                    <div className="label-3">Escritura pública</div>
                      <Input
                        className="input-instance"
                        label
                        text="Número de escritura pública"
                        value={formAlly.psNumber}
                        onChange={(e) => setFormAlly({ ...formAlly, psNumber: e.target.value })}
                        text1="Número"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Fecha de escritura pública"
                        value={formAlly.psDate}
                        onChange={(e) => setFormAlly({ ...formAlly, psDate: e.target.value })}
                        text1="Fecha"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Otorgada por: (orgName del notario)"
                        value={formAlly.notaryName}
                        onChange={(e) => setFormAlly({ ...formAlly, notaryName: e.target.value })}
                        text1="Nombre"
                    />
                    
                    <Input
                        className="input-instance"
                        label
                        text="En la ciudad de:"
                        value={formAlly.city}
                        onChange={(e) => setFormAlly({ ...formAlly, city: e.target.value })}
                        text1="Ciudad"
                    />

                    <div className="label-3">Constancia fiscal</div>
                      <Input
                        className="input-instance"
                        label
                        text="RFC"
                        value={formAlly.rfc}
                        onChange={(e) => setFormAlly({ ...formAlly, rfc: e.target.value })}
                        text1="RFC"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Razón social"
                        value={formAlly.socialReason}
                        onChange={(e) => setFormAlly({ ...formAlly, socialReason: e.target.value })}
                        text1="Razón social"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Régimen"
                        value={formAlly.regimen}
                        onChange={(e) => setFormAlly({ ...formAlly, regimen: e.target.value })}
                        text1="Régimen"
                    />
                    
                    <Input
                        className="input-instance"
                        label
                        text="Domicilio:"
                        value={formAlly.taxAddress}
                        onChange={(e) => setFormAlly({ ...formAlly, taxAddress: e.target.value })}
                        text1="Domicilio"
                    />

                    <div className="label-3">Datos del representante (persona moral)</div>
                      <Input
                        className="input-instance"
                        label
                        text="Nombre completo"
                        value={formAlly.representativeName}
                        onChange={(e) => setFormAlly({ ...formAlly, representativeName: e.target.value })}
                        text1="Nombre"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Correo:"
                        value={formAlly.representativeAddress}
                        onChange={(e) => setFormAlly({ ...formAlly, representativeAddress: e.target.value })}
                        text1="Correo"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Teléfono"
                        value={formAlly.representativePhone}
                        onChange={(e) => setFormAlly({ ...formAlly, representativePhone: e.target.value })}
                        text1="Teléfono"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Área a la que pertenece en la organización"
                        value={formAlly.area}
                        onChange={(e) => setFormAlly({ ...formAlly, area: e.target.value })}
                        text1="Área"
                    />
                    
                    <div className="label-3">Datos de la persona física</div>
                      <Input
                        className="input-instance"
                        label
                        text="Nombre completo"
                        value={formAlly.npName}
                        onChange={(e) => setFormAlly({ ...formAlly, npName: e.target.value })}
                        text1="Nombre"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Correo:"
                        value={formAlly.npEmail}
                        onChange={(e) => setFormAlly({ ...formAlly, npEmail: e.target.value })}
                        text1="Correo"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Teléfono"
                        value={formAlly.npPhone}
                        onChange={(e) => setFormAlly({ ...formAlly, npPhone: e.target.value })}
                        text1="Teléfono"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="CURP"
                        value={formAlly.npCURP}
                        onChange={(e) => setFormAlly({ ...formAlly, npCURP: e.target.value })}
                        text1="CURP"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Institución donde labora"
                        value={formAlly.npInstitution}
                        onChange={(e) => setFormAlly({ ...formAlly, npInstitution: e.target.value })}
                        text1="Institución"
                    />

                    <Input
                        className="input-instance"
                        label
                        text="Razón por la que se inscribe"
                        value={formAlly.npReason}
                        onChange={(e) => setFormAlly({ ...formAlly, npReason: e.target.value })}
                        text1="Razón"
                    />

                  </div>
                </div>

                {/* Mostrar mensaje de error si lo hay */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="action">
                  <div className="progress"></div>

                  <div className="action-2">
                    <Button
                      className="button-4"
                      style="primary"
                      text="Siguiente"
                      type="default"
                      onClick={handleSubmit} // Llamamos a handleSubmit al hacer clic
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
