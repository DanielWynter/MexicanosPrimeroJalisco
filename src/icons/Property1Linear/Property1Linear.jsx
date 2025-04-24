/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Property1Linear = ({ opacity = "unset", className }) => {
  return (
    <svg
      className={`property-1-linear ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M3 7H21"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />

      <path
        className="path"
        d="M6 12H18"
        opacity={opacity}
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />

      <path
        className="path"
        d="M10 17H14"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />

      <g className="g" opacity="0" />
    </svg>
  );
};

Property1Linear.propTypes = {
  opacity: PropTypes.string,
};
