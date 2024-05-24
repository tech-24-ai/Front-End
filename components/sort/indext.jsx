import React, { Fragment, useState } from "react";

const shorting_icon = "../../new_images/sorting_icon.svg";
import { Image, Modal, Radio } from "antd";
const CustomSort = ({
  options,
  value,
  onOptinChange,
  title = "Sort",
  imgProps = {},
}) => {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const handleSortOptionChanges = (event) => {
    setIsSortModalOpen(false);
    onOptinChange(event);
  };

  return (
    <div className="custom-sorting">
      <Image
        onClick={() => setIsSortModalOpen(!isSortModalOpen)}
        style={{}}
        width={44}
        height={44}
        preview={false}
        src={shorting_icon}
        alt="sort"
        {...imgProps}
        className="shorting_icon"
      />

      <Modal
        title={title}
        visible={isSortModalOpen}
        footer={null}
        onCancel={() => {
          setIsSortModalOpen(false);
        }}
        maskClosable={false}
        wrapClassName="custom-sort-modal"
      >
        <Radio.Group
          size="large"
          className="sort-option-wrapper"
          options={options}
          onChange={handleSortOptionChanges}
          value={value}
        />
      </Modal>

      <div className="sorting mobile-display-n">
        <label className="sortby" htmlFor="sortDropdown">
          Sort By:{" "}
        </label>
        <select
          id="sortDropdown"
          style={{ border: "none", background: "transparent" }}
          value={value}
          onChange={onOptinChange}
        >
          {options.map(({ value, label }) => (
            <option
              className="sortby"
              style={{ color: "#001622" }}
              value={value}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomSort;
