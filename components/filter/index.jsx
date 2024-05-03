import React from "react";
import { Card, Collapse, Checkbox, Col, Row } from "antd";
const { Panel } = Collapse;
import { MinusOutlined, PlusOutlined, UndoOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const CustomFilter = ({
  title = "FILTERS",
  data,
  handleOptionChange,
  handleReset,
}) => {
  const onChange = (key) => {
    // console.log(key);
  };

  const renderOptions = (data) => {
    const { options = [], name, multiple = false, value = null } = data;
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
        defaultValue={value}
        onChange={(e) =>
          handleOptionChange({ value: e.target.value, name: e.target.name })
        }
      />
    );
  };

  return (
    <Card
      type="inner"
      title={title}
      extra={<UndoOutlined onClick={() => handleReset()} />}
      className="custom-filter"
    >
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
