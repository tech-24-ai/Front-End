import React, { useState } from "react";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
function SearchInput({
  placeholder = "Search",
  suffix,
  prefix,
  allowClear = false,
  onChange,
  parentProps,
  width,
  ...more
}) {
 
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };
  if (allowClear) {
    suffix = <CloseOutlined onClick={() => handleClear()} />;
  }

  return (
    <div className="new-custom-search-input" {...parentProps}>
      <Input
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        className="SearchInput"
        value={value}
        onChange={handleChange}
        {...more}
        style={{ width: width }}
      />
    </div>
  );
}

export default SearchInput;
