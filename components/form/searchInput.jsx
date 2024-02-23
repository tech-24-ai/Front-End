import React from "react";
import { Input } from "antd";

function SearchInput({ placeholder = "Search", suffix, prefix, ...more }) {
  return (
    <div className="custom-search-input">
      <Input
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        {...more}
      />
    </div>
  );
}

export default SearchInput;
