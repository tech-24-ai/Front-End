import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { InputNumber, Slider } from "antd";
import { Button, Row, Col } from "reactstrap";

const downtimeCalculator = () => {
  //Annual Revenue
  const [r, setR] = useState(1);
  // Duration of Downtime (hours)
  const [i, setI] = useState(1);
  // Impact to sales (in percentage)
  const [l, setL] = useState(1);
  // Number of Employees affected
  const [s, setS] = useState(1);
  // Average Fully Loaded Employee Cost / Hour
  const [u, setU] = useState(1);
  // Impact to Productivity (in percentage)
  const [c, setC] = useState(1);

  // states for UI rendering
  const [lostRevenue, setLostRevenue] = useState(0);
  const [labourCost, setLabourCost] = useState(0);
  const [hourlyDowntimeCost, setHourlyDowntimeCost] = useState();

  const sales = (data) => {
    setL(data);
  };
  const productivity = (data) => {
    setC(data);
  };

  const calculate = () => {
    if (r == "") {
      setR(1);
    }
    if (i == "") {
      setI(1);
    }
    if (l == "") {
      setL(1);
    }
    if (s == "") {
      setS(1);
    }
    if (u == "") {
      setU(1);
    }
    if (c == "") {
      setC(1);
    }

    setLostRevenue(Math.round((r / 1920) * i * (l / 100)));
    setLabourCost(Math.round((s * u * i * c) / 100));
    setHourlyDowntimeCost(
      Math.round(((r / 1920) * i * (l / 100) + (s * u * i * c) / 100) / i)
    );
  };

  useEffect(() => {
    calculate();
  }, [lostRevenue, labourCost, hourlyDowntimeCost]);

  const checkValidValue = (value) => {
    if (value > 0 || value == "") {
      return value;
    } else {
      return 1;
    }
  };

  return (
    <div className="downtimeCalculatorContainer">
      <div className="">
        <h1 className="heading">The Cost of Downtime</h1>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Col md={6}>
            <div className="flexContainer">
              <p className="flexTitle">Annual Revenue (in $):</p>
              <input
                onChange={(e) => {
                  setR(checkValidValue(e.target.value));
                }}
                className="flexInput"
                type="number"
                value={r}
              />
            </div>
            <p className="explaination">
              Enter the annual revenue of your organization or revenue generated
              by a key application.
            </p>
          </Col>
          <Col md={5}>
            <div className="flexContainer">
              <p className="flexTitle">Duration of Downtime (hours):</p>
              <input
                onChange={(e) => {
                  setI(checkValidValue(e.target.value));
                }}
                className="flexInput"
                type="number"
                value={i}
              />
            </div>
            <p className="explaination">
              How long is the downtime expected to last? This could be limited
              to business hours or also include out-of-business hours.
            </p>
          </Col>
        </Row>

        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Col md={6}>
            <div className="flexContainer">
              <p className="flexTitle">
                Average Fully Loaded Employee Cost / Hour:
              </p>
              <input
                onChange={(e) => {
                  setU(checkValidValue(e.target.value));
                }}
                className="flexInput"
                type="number"
                value={u}
              />
            </div>
            <p className="explaination">
              Enter the average cost of an employee per hour including salary,
              benefits and office space. $100-$200 is a reasonable figure.
            </p>
          </Col>
          <Col md={5}>
            <div className="flexContainer">
              <p className="flexTitle">Number of Employees Affected:</p>
              <input
                onChange={(e) => {
                  setS(checkValidValue(e.target.value));
                }}
                className="flexInput"
                type="number"
                value={s}
              />
            </div>
            <p className="explaination">
              Enter the number of employees that can be affected by an IT
              outage.
            </p>
          </Col>
        </Row>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Col md={6}>
            <div>
              <p className="flexTitle">Impact to Sales:</p>
              <Row className="antRowContainer">
                <Col span={5}>
                  <Slider
                    min={1}
                    max={100}
                    onChange={sales}
                    value={typeof l === "number" ? l : 0}
                  />
                </Col>
                <p className="flexInput">{l}%</p>
                <p className="explaination" style={{ marginLeft: "15px" }}>
                  As a percentage define a rough estimation of the impact of an
                  IT outage to revenue generation. I.E downtime of a web store
                  for an online only business with competitors waiting to take
                  the same orders would be 100%.
                </p>
              </Row>
            </div>
          </Col>
          <Col md={5}>
            <div
              className="flexContainer"
              style={{ display: "unset", marginLeft: "0px" }}
            >
              <p className="flexTitle">Impact to Productivity:</p>
              <Row className="antRowContainer">
                <Col span={17}>
                  <Slider
                    min={1}
                    max={100}
                    onChange={productivity}
                    value={typeof c === "number" ? c : 0}
                  />
                </Col>
                {/* <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              className="flexInput"
              style={{ margin: "-4px 0px 0px 15px" }}
              value={inputValue}
              onChange={onChange}
            />
          </Col> */}
                <p className="flexInput">{c}%</p>
                <p className="explaination" style={{ marginLeft: "20px" }}>
                  As a percentage define the impact to your employees of an IT
                  outage. I.E if your employees are totally reliant on IT to do
                  their work and cannot be productive without it, enter 100%.
                </p>
              </Row>
            </div>
          </Col>
        </Row>
        <div>
          <Button onClick={calculate} className="calculateBtn">
            Calculate
          </Button>
        </div>
      </div>
      <div className="flexDivTwo">
        <p className="heading">Downtime Cost</p>
        <div className="resultContainer">
          <div>
            <p className="flexTitle resultText">Lost Revenue:</p>
            <p>${lostRevenue}</p>
          </div>
          <div>
            <p className="flexTitle resultText">Labour Cost:</p>
            <p>${labourCost}</p>
          </div>
          <div>
            <p className="flexTitle resultText">Total Downtime Cost:</p>
            <p>${lostRevenue + labourCost}</p>
          </div>
          <div>
            <p className="flexTitle resultText">Hourly Downtime Cost: </p>
            <p>${hourlyDowntimeCost > 1 ? hourlyDowntimeCost : 0}</p>
          </div>
        </div>
      </div>

      <BodyBackgroundColor color="#d4e0fe" />
    </div>
  );
};

export default downtimeCalculator;
