import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;
function SearchInput({ onSearch, parentProps, ...props }) {
  const handleSearch = (value, _e, info) => {
    onSearch(value);
  };

  return (
    <div className="new-custom-search-input" {...parentProps}>
      <Search
        placeholder="Search"
        enterButton={<SearchOutlined style={{ fontSize: "20px" }} />}
        allowClear
        size="large"
        onSearch={handleSearch}
        {...props}
      />
    </div>
  );
}

export default SearchInput;
