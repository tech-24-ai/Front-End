import React from "react";
import { Card, Collapse, Checkbox, Col, Row } from "antd";
const { Panel } = Collapse;
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const CustomFilter = ({ title = "FILTERS", data, handleOptionChange }) => {
  const onChange = (key) => {
    console.log(key);
  };

  const renderOptions = (data) => {
    console.log("optDATa", data);
    const { options = [], name, multiple = false } = data;
    if (multiple) {
      return (
        <Checkbox.Group
          style={{
            width: "100%",
          }}
          name={name}
          onChange={(value) => handleOptionChange({ value, name })}
          options={options}
        />
      );
    }
    return (
      <Radio.Group
        name={name}
        options={options}
        onChange={(e) =>
          handleOptionChange({ value: e.target.value, name: e.target.name })
        }
      />
    );
  };

  return (
    <Card type="inner" title={title} className="custom-filter">
      <Collapse
        defaultActiveKey={"1"}
        onChange={onChange}
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        accordion
        expandIconPosition="right"
      >
        {data.map(({ heading, ...props }) => (
          <Panel
            header={<p className="panel-header">{heading}</p>}
            key={heading}
          >
            {renderOptions(props)}
          </Panel>
        ))}
      </Collapse>
    </Card>
  );
};

export default CustomFilter;
