/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const Clock = ({ className }) => {
  return (
    <svg
      className={`clock ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-7"
        d="M18.3346 10C18.3346 14.6 14.6013 18.3334 10.0013 18.3334C5.4013 18.3334 1.66797 14.6 1.66797 10C1.66797 5.40002 5.4013 1.66669 10.0013 1.66669C14.6013 1.66669 18.3346 5.40002 18.3346 10Z"
        stroke="#B9B8BD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />

      <path
        className="path-7"
        d="M13.0914 12.65L10.5081 11.1084C10.0581 10.8417 9.69141 10.2 9.69141 9.67503V6.25836"
        fill="#B9B8BD"
      />

      <path
        className="path-7"
        d="M13.0914 12.65L10.5081 11.1084C10.0581 10.8417 9.69141 10.2 9.69141 9.67503V6.25836"
        stroke="#B9B8BD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
