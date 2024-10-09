import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";

import "./CustomCheckbox.css";

const CustomCheckbox = ({id, label, checked, handleChange, ...props}) => {

  return (
    <div className="checkbox-wrapper">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        value={props.value}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default CustomCheckbox;