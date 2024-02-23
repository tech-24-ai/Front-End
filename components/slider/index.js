import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider } from 'antd';
const Index = () => {
  const [inputValue, setInputValue] = useState(10);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={25}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{
            margin: '0 16px',
            border: 'none',
            fontWeight: '600',
            fontSize: '15px',
            height: '35',
            borderRadius: '4px',
            width: '90px'
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default Index;