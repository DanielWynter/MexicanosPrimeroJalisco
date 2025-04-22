import PropTypes from "prop-types";
import React from "react";
import { Icon8 } from "../../icons/Icon8";
import { VuesaxOutlineArrowRight } from "../../icons/VuesaxOutlineArrowRight";
import "./style.css";

export const Input = ({
  label,
  text = "Label",
  hasInput = true,
  visible = true,
  text1 = "Placeholder",
  visible1 = true,
  visible2 = true,
  visible3 = true,
  icon = <VuesaxOutlineArrowRight className="icon-2" color="#7E92A2" />,
  className,
  divClassName,
  value = "",
  onChange = () => {},
  type = "text",
  required = false, // 👉 Agrega esta línea
}) => {
  return (
<div className={`input ${className}`}>
{label && (
        <>
          <div className="label">{text}</div>

          {hasInput && (
            <div className="div-2">
              {visible2 && <Icon8 className="icon-2" color="#7E92A2" />}

              <input
                className={`placeholder ${divClassName}`}
                placeholder={text1}
                value={value}
                onChange={onChange}
                type={type}
              />

              {visible3 && icon}
            </div>
          )}
        </>
      )}

      {!label && (
        <div className="div-2">
          {visible && <Icon8 className="icon-2" color="#7E92A2" />}

          <input
            className={`placeholder ${divClassName}`}
            placeholder={text1}
            value={value}
            onChange={onChange}
            type={type}
            required={required} // 👉 Aquí lo pasas al input real
          />

          {visible1 && (
            <VuesaxOutlineArrowRight className="icon-2" color="#7E92A2" />
          )}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.bool,
  text: PropTypes.string,
  hasInput: PropTypes.bool,
  visible: PropTypes.bool,
  text1: PropTypes.string,
  visible1: PropTypes.bool,
  visible2: PropTypes.bool,
  visible3: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  divClassName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};
