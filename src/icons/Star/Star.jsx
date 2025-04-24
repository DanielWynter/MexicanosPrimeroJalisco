/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const Star = ({ className }) => {
  return (
    <svg
      className={`star ${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-7"
        d="M11.4421 2.92501L12.9087 5.85835C13.1087 6.26668 13.6421 6.65835 14.0921 6.73335L16.7504 7.17501C18.4504 7.45835 18.8504 8.69168 17.6254 9.90835L15.5587 11.975C15.2087 12.325 15.0171 13 15.1254 13.4833L15.7171 16.0417C16.1837 18.0667 15.1087 18.85 13.3171 17.7917L10.8254 16.3167C10.3754 16.05 9.63375 16.05 9.17541 16.3167L6.68375 17.7917C4.90041 18.85 3.81708 18.0583 4.28375 16.0417L4.87541 13.4833C4.98375 13 4.79208 12.325 4.44208 11.975L2.37541 9.90835C1.15875 8.69168 1.55041 7.45835 3.25041 7.17501L5.90875 6.73335C6.35041 6.65835 6.88375 6.26668 7.08375 5.85835L8.55041 2.92501C9.35041 1.33335 10.6504 1.33335 11.4421 2.92501Z"
        stroke="#B9B8BD"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
