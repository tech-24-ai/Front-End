import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Button, Container } from "reactstrap";

const bandwidthCalculator = () => {
  const [TD, setTD] = useState();
  const [RWT, setRWT] = useState();
  const [timeInMin, setTimeInMin] = useState();
  const [timeInSec, setTimeInSec] = useState(1);
  const [result, setResult] = useState(0);

  // const getCurrentSelectedValue = (size, speed) => {
  //   console.log("data for size", size.target.value);
  //   // console.log("data for spped", size.target.speed);
  // };
  const calculate = () => {
    setResult(
      ((TD * (100 / (timeInMin / timeInSec)) * 8192) / (RWT * 60)).toFixed(2)
    );
    if (TD <= 0) {
      setTD(1);
    }
    if (RWT <= 0) {
      setRWT(1);
    }
    if (timeInMin <= 0) {
      setTimeInMin(1);
    }
    if (timeInSec <= 0) {
      setTimeInSec(1);
    }
  };
  useEffect(() => {
    calculate();
  }, [result]);

  return (
    <Container>
      <div className="bandwidthCalculatorContainer">
        <h5 className="heading">Bandwidth Calculator</h5>
        <div className="flexContainer">
          <div>
            <p className="leftFlexBox">Total amount of data to be replicated</p>
            <p className="leftFlexBox">Replication time</p>
            <p className="leftFlexBox deduplicationText">
              Data deduplication ratio
            </p>
          </div>
          <div>
            <div className="optionBox">
              <input
                value={TD}
                onInput={(e) => {
                  setTD(e.target.value);
                }}
                className="bandwidthInput"
                type="number"
              />
              <span>GB</span>
              {/* <select
              style={{
                borderBottomRightRadius: "4px",
                borderTopRightRadius: "4px",
              }}
              onChange={(TD) => getCurrentSelectedValue(TD)}
            >
              <option value="byte">B</option>
              <option value="kilobyte">kB</option>
              <option value="megabyte">MB</option>
              <option selected value="gigabyte">
                GB
              </option>
              <option value="terabyte">TB</option>
              <option value="petabyte">PB</option>
            </select> */}
            </div>
            <div className="optionBox">
              <input
                value={RWT}
                onInput={(e) => {
                  setRWT(e.target.value);
                }}
                className="bandwidthInput"
                type="number"
              />
              <span>min</span>
              {/* <select
              style={{
                borderBottomRightRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            >
              <option value="bit/s">bit/s</option>
              <option value="kilobit/s">kbit/s</option>
              <option selected value="megabit/s">
                Mbit/s
              </option>
              <option value="gigabit/s">Gbit/s</option>
              <option value="terabit/s">Tbit/s</option>
              <option value="petabit/s">Pbit/s</option>
              <option value="byte/s">B/s</option>
              <option value="kilobyte/s">kB/s</option>
              <option value="megabyte/s">MB/s</option>
              <option value="gigabyte/s">GB/s</option>
              <option value="terabyte/s">TB/s</option>
              <option value="petabyte/s">PB/s</option>
            </select> */}
            </div>
            <div>
              <div className="timeBox timeBoxContainer">
                <div className="timeBox">
                  <input
                    value={timeInMin}
                    onInput={(e) => {
                      setTimeInMin(e.target.value);
                    }}
                    className="bandwidthHalfInput"
                    type="number"
                  />
                  <span>:</span>
                  {/* <h6>min</h6> */}
                </div>
                <div className="timeBox">
                  <input
                    value={timeInSec}
                    onInput={(e) => {
                      setTimeInSec(e.target.value);
                    }}
                    className="bandwidthHalfInput"
                    type="number"
                  />
                  {/* <h6
                  style={{
                    borderBottomRightRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}
                >
                  sec
                </h6> */}
                </div>
              </div>
              {/* <select
              style={{
                borderBottomRightRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            >
              <option value="sec">seconds</option>
              <option value="min">minutes</option>
              <option selected value="min/sec">
                min/sec
              </option>
              <option value="hour">hours</option>
              <option value="hr/min">hr/min</option>
              <option value="day">days</option>
              <option value="week">weeks</option>
              <option value="month">months</option>
              <option value="year">years</option>
              <option value="yr/mth">yr/mth</option>
            </select> */}
            </div>
          </div>
        </div>
        <br />
        <div className="resultSection">
          <div onClick={calculate} className="custom-btn with-bg">
            Calculate
          </div>
        </div>
        <h5 className="result">{`Required Network Bandwidth : ${
          result == "NaN" ? "0" : result
        } Mbps`}</h5>
      </div>
    </Container>
  );
};

export default bandwidthCalculator;
