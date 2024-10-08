import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";

import "./CustomCheckbox.css";

const CustomCheckbox = ({id, label, checked, ...props}) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="checkbox-wrapper">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        {...props}
      />
      {isChecked && <BsCheck className="icon-wrapper" />}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default CustomCheckbox;