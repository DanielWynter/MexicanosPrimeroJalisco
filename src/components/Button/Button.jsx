/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon1 } from "../../icons/Icon1";
import "./style.css";

export const Button = ({
  type = "default", // valor por defecto
  style = "primary", // valor por defecto
  className = "",
  icon = <Icon1 className="icon-1" color="#7E92A2" />,
  text = "Button",
  onClick, // <-- Añadir prop onClick
}) => {
  return (
    <div
      className={`button ${style} ${type} ${className}`}
      onClick={onClick} // <-- Asegúrate de que el onClick sea manejado aquí
    >
      {type === "icon-only" && <>{icon}</>}

      {["default", "right-icon"].includes(type) && (
        <div className="text-wrapper">{text}</div>
      )}

      {["left-icon", "right-icon"].includes(type) && (
        <Icon1
          className="icon"
          color={style === "primary" ? "#ECECFE" : "#7E92A2"}
        />
      )}

      {type === "left-icon" && <div className="div">{text}</div>}
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["icon-only", "right-icon", "left-icon", "default"]),
  style: PropTypes.oneOf(["primary", "white"]),
  text: PropTypes.string,
};
