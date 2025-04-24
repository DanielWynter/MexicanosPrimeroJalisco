/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const Sort = ({ className }) => {
  return (
    <svg
      className={`sort ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-7"
        d="M3 7H21"
        stroke="#121212"
        strokeLinecap="round"
        strokeWidth="1.5"
      />

      <path className="path-7" d="M6 12H18H6Z" fill="#121212" />

      <path
        className="path-7"
        d="M6 12H18"
        stroke="#121212"
        strokeLinecap="round"
        strokeWidth="1.5"
      />

      <path
        className="path-7"
        d="M10 17H14"
        stroke="#121212"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
