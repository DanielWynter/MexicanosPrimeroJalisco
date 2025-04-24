/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Icon1 = ({ color = "#ECECFE", className }) => {
  return (
    <svg
      className={`icon-1 ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M6.03333 1.66666H4.45C2.625 1.66666 1.66666 2.62499 1.66666 4.44166V6.02499C1.66666 7.84166 2.625 8.79999 4.44166 8.79999H6.025C7.84166 8.79999 8.8 7.84166 8.8 6.02499V4.44166C8.80833 2.62499 7.85 1.66666 6.03333 1.66666Z"
        fill={color}
      />

      <path
        className="path"
        d="M15.5583 1.66666H13.975C12.1583 1.66666 11.2 2.62499 11.2 4.44166V6.02499C11.2 7.84166 12.1583 8.79999 13.975 8.79999H15.5583C17.375 8.79999 18.3333 7.84166 18.3333 6.02499V4.44166C18.3333 2.62499 17.375 1.66666 15.5583 1.66666Z"
        fill={color}
      />

      <path
        className="path"
        d="M15.5583 11.1917H13.975C12.1583 11.1917 11.2 12.15 11.2 13.9667V15.55C11.2 17.3667 12.1583 18.325 13.975 18.325H15.5583C17.375 18.325 18.3333 17.3667 18.3333 15.55V13.9667C18.3333 12.15 17.375 11.1917 15.5583 11.1917Z"
        fill={color}
      />

      <path
        className="path"
        d="M6.03333 11.1917H4.45C2.625 11.1917 1.66666 12.15 1.66666 13.9667V15.55C1.66666 17.375 2.625 18.3333 4.44166 18.3333H6.025C7.84166 18.3333 8.8 17.375 8.8 15.5583V13.975C8.80833 12.15 7.85 11.1917 6.03333 11.1917Z"
        fill={color}
      />
    </svg>
  );
};

Icon1.propTypes = {
  color: PropTypes.string,
};
