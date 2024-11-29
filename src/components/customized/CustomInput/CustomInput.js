import React from "react";

import "./CustomInput.css"

const CustomInput = ({ ...props }) => {

  return (
    <>
      <div className="input_wrapp">
        <div className={`input_container ${props.errors && props.errors[props.name] ? "input_error" : "input_field"}`}>
          <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ?? props.onChange}
            onInput={props.onInput ?? props.onInput}
            name={props.name}
            {...(props.register ? props.register(props.name, props.validationSchema) : {})}
          />
        </div>
      </div>
    </>
  )
};

export default CustomInput;