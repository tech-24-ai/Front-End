import React, { useState } from "react";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
function SearchInput({
  placeholder = "Search",
  suffix,
  prefix,
  allowClear = false,
  onChange,
  ...more
}) {
  if (allowClear) {
    suffix = <CloseOutlined onClick={() => handleClear()} />;
  }

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  return (
    <div className="new-custom-search-input" style={{
      width :'76%'
    }}>
      <Input
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        className="SearchInput"
        value={value}
        onChange={handleChange}
        {...more}
      />
    </div>
  );
}

export default SearchInput;
