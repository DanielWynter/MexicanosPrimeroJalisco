/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const ArrowsArrowRight1 = ({ color = "#444A58", className }) => {
  return (
    <svg
      className={`arrows-arrow-right-1 ${className}`}
      fill="none"
      height="38"
      viewBox="0 0 38 38"
      width="38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" clipPath="url(#clip0_211_2065)">
        <path
          className="path"
          clipRule="evenodd"
          d="M8.14101 3.9792C8.13254 5.02366 8.52054 6.03246 9.22673 6.80205L20.7679 19.0001L9.2403 31.1981C8.53318 31.9654 8.14062 32.9707 8.14062 34.0141C8.14063 35.0576 8.53318 36.0629 9.2403 36.8302C9.57849 37.1992 9.98972 37.4939 10.4479 37.6954C10.906 37.897 11.4011 38.0011 11.9017 38.0011C12.4022 38.0011 12.8973 37.897 13.3554 37.6954C13.8136 37.4939 14.2248 37.1992 14.563 36.8302L28.7506 21.8148C29.4607 21.0505 29.8553 20.046 29.8553 19.0028C29.8553 17.9596 29.4607 16.955 28.7506 16.1908L14.563 1.16991C14.2248 0.800902 13.8136 0.506256 13.3554 0.304685C12.8973 0.103114 12.4022 -0.000976563 11.9017 -0.000976562C11.4011 -0.000976563 10.906 0.103114 10.4479 0.304685C9.98972 0.506256 9.57849 0.800902 9.2403 1.16991C8.53004 1.93253 8.13696 2.93706 8.14101 3.9792Z"
          fill={color}
          fillRule="evenodd"
        />
      </g>

      <defs className="defs">
        <clipPath className="clip-path" id="clip0_211_2065">
          <rect className="rect" fill="white" height="38" width="38" />
        </clipPath>
      </defs>
    </svg>
  );
};

ArrowsArrowRight1.propTypes = {
  color: PropTypes.string,
};
