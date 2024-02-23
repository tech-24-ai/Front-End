import React from "react";
import { Input } from "antd";

function inputBox({
  placeholder = "Input here",
  handleInput = () => {},
  className = "",
  ...props
}) {
  const handleInputChange = (value) => {
    // console.log("Value", value.target.value);
    handleInput(value.target.value);
  };

  return (
    <Input
      className={`custom-input ${className}`}
      placeholder={placeholder}
      onChange={handleInputChange}
      {...props}
    />
  );
}

export default inputBox;
