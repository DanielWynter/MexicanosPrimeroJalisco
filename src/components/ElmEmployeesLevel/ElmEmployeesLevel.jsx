import React from "react";
import "./style.css";

export const ElmEmployeesLevel = ({
  className,
  elmEmployeesLevelClassName,
  elmEmployeesLevelClassNameOverride,
  divClassName,
  text = "Middle",
}) => {
  return (
    <div className={`elm-employees-level ${className}`}>
      <div
        className={`elm-employees-level-wrapper ${elmEmployeesLevelClassName}`}
      >
        <div className={`middle-wrapper ${elmEmployeesLevelClassNameOverride}`}>
          <div className={`middle ${divClassName}`}>{text}</div>
        </div>
      </div>
    </div>
  );
};
