import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Container } from "reactstrap";

const serverRackPowerConsumptionCalc = () => {
  const [numberRack, setNumberRack] = useState();
  const [serverRack, setServerRack] = useState();
  const [powerSupply, setPowerSupply] = useState();
  const [facilityPower, setFacilityPower] = useState();
  const [ampsResult, setAmpsResult] = useState(0);
  const [supplyPerRackResult, setSupplyPerSackResult] = useState(0);
  const [supplyResult, setSupplyResult] = useState(0);

  const calculate = () => {
    setAmpsResult((powerSupply / facilityPower).toFixed(2));
    setSupplyPerSackResult(((serverRack * powerSupply) / 1000).toFixed(2));
    setSupplyResult(
      ((numberRack * serverRack * powerSupply) / 1000).toFixed(2)
    );
    if (numberRack <= 0) {
      setNumberRack(1);
      setAmpsResult(0);
      setSupplyResult(0);
    }
    if (serverRack <= 0) {
      setServerRack(1);
      setSupplyPerSackResult(0);
      setSupplyResult(0);
    }
    if (powerSupply <= 0) {
      setPowerSupply(1);
      setAmpsResult(0);
      setSupplyPerSackResult(0);
      setSupplyResult(0);
    }
    if (facilityPower <= 0) {
      setFacilityPower(1);
      setAmpsResult(0);
    }
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <Container>
      <div className="SRPCcalculatorContainer">
        <div className="mainContainer">
          <h5 className="heading">Server Rack Power Consumption Calculator</h5>
          <div>
            <p className="inputHeading">Number of Racks : </p>
            <input
              type="number"
              min="0"
              value={numberRack}
              className="fileSizeInput"
              onInput={(e) => {
                setNumberRack(e.target.value);
              }}
            />
          </div>

          <div>
            <p className="inputHeading">Servers per Rack : </p>
            <input
              type="number"
              min="0"
              value={serverRack}
              onInput={(e) => {
                setServerRack(e.target.value);
              }}
            />
          </div>

          <div>
            <p className="inputHeading">
              Power Supply for each Server (in watts) :{" "}
            </p>
            <input
              type="number"
              min="0"
              value={powerSupply}
              onInput={(e) => {
                setPowerSupply(e.target.value);
              }}
            />
          </div>

          <div>
            <p className="inputHeading">Facility Power (VAC/AC Voltage) : </p>
            <input
              type="number"
              min="0"
              value={facilityPower}
              onInput={(e) => {
                setFacilityPower(e.target.value);
              }}
            />
          </div>

          <div className="calculateSection">
            {/* <button type="button" className="calculateBtn" onClick={calculate}>
              Calculate
            </button> */}
            <div
              type="button"
              className="custom-btn with-bg"
              onClick={calculate}
            >
              Calculate
            </div>
          </div>
        </div>
        <div className="output">
          <h5 className="outputHeading">Results</h5>
          <div class="calculate-result">
            <div class="result">
              <div class="result-label">Amps per Server:</div>
              <div class="amps-val">
                {ampsResult == "NaN" ? "0" : ampsResult}
              </div>
            </div>
            <div class="result">
              <div class="result-label">
                Total Required Supply per Rack in kW:
              </div>
              <div class="total-required-supply-rack-val">
                {supplyPerRackResult == "NaN" ? "0" : supplyPerRackResult}
              </div>
            </div>
            <div class="result">
              <div class="result-label">Total Required Supply in kW:</div>
              <div class="total-required-supplykw-val">
                {supplyResult == "NaN" ? "0" : supplyResult}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default serverRackPowerConsumptionCalc;
