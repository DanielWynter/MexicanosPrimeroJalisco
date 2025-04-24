/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const SelectedTab = ({
  className,
  selectedTabClassName,
  overlapGroupClassName,
  divClassName,
  text = "Projects",
}) => {
  return (
    <div className={`selected-tab ${className}`}>
      <div className={`overlap-group-wrapper ${selectedTabClassName}`}>
        <div className={`overlap-group ${overlapGroupClassName}`}>
          <div className={`projects ${divClassName}`}>{text}</div>
        </div>
      </div>
    </div>
  );
};

