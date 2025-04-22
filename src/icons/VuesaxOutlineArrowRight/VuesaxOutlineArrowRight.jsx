/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const VuesaxOutlineArrowRight = ({ color = "#292D32", className }) => {
  return (
    <svg
      className={`vuesax-outline-arrow-right ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M12.025 15.6833C11.8667 15.6833 11.7083 15.625 11.5833 15.5C11.3417 15.2583 11.3417 14.8583 11.5833 14.6166L16.2 9.99998L11.5833 5.38331C11.3417 5.14164 11.3417 4.74164 11.5833 4.49998C11.825 4.25831 12.225 4.25831 12.4667 4.49998L17.525 9.55831C17.7667 9.79998 17.7667 10.2 17.525 10.4416L12.4667 15.5C12.3417 15.625 12.1833 15.6833 12.025 15.6833Z"
        fill={color}
      />

      <path
        className="path"
        d="M16.9417 10.625H2.91666C2.57499 10.625 2.29166 10.3416 2.29166 9.99998C2.29166 9.65831 2.57499 9.37498 2.91666 9.37498H16.9417C17.2833 9.37498 17.5667 9.65831 17.5667 9.99998C17.5667 10.3416 17.2833 10.625 16.9417 10.625Z"
        fill={color}
      />
    </svg>
  );
};

VuesaxOutlineArrowRight.propTypes = {
  color: PropTypes.string,
};
