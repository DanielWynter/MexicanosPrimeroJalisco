/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const StyleLinear2 = ({ opacity = "unset", className }) => {
  return (
    <svg
      className={`style-linear-2 ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M6 12H18"
        opacity={opacity}
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <path
        className="path"
        d="M12 18V6"
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <g className="g" opacity="0" />
    </svg>
  );
};

StyleLinear2.propTypes = {
  opacity: PropTypes.string,
};
