import React, { useEffect, useState, Fragment } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Checkbox, Divider, Slider, Radio, Space, Tooltip, Select } from "antd";
import { Container, Table, Row, Col } from "reactstrap";

function index() {
  const [requiredRedundancyLevel, setRequiredRedundancyLevel] =
    useState("high");
  const [hardwareLocated, setHardwareLocated] = useState("colocation");
  const [storageSpaceSize, setStorageSpaceSize] = useState("GB");

  const [sliders, setSliders] = useState({
    memorySlider: {
      minValue: 1,
      maxValue: 2000,
      value: 196,
      step: 1,
      preFix: "",
      postFix: "GB",
      toolTipText: null,
    },
    cabinetSlider: {
      minValue: 1,
      maxValue: 10,
      value: 1,
      step: 1,
      preFix: "",
      postFix: "Cabinets",
      toolTipText:
        "For every TB of memory, you should allocate a cabinet or every 60 TB of disk, you should allocate a cabinet.",
    },
    storageSlider: {
      minValue: 1,
      maxValue: 1000,
      value: 1000,
      step: 1,
      preFix: "",
      postFix: "GB",
      toolTipText: null,
    },
    monthlyCostSlider: {
      minValue: 1000,
      maxValue: 5000,
      value: 1500,
      step: 100,
      preFix: "$",
      postFix: "/Mo",
      toolTipText: `Average cost of cabinet with redundant 30A- 280V circuit,would be $1600/month.`,
    },
    hardwareRefreshCycleSlider: {
      minValue: 1,
      maxValue: 5,
      value: 3,
      step: 1,
      preFix: "",
      postFix: "Year/s",
      toolTipText: `Average Hardware Refresh is 3 years.`,
    },
  });

  const [privateCloudTable, setPrivateCloudTable] = useState({
    physicalServer: {
      description: "Physical Servers & VMware Licensing",
      quantity: 0,
      amount: 0,
    },
    storageAreaNetwork: {
      description: "Storage Area Networks (SAN)",
      quantity: 0,
      amount: 0,
    },
    networkSwitches: {
      description: "Network Switches",
      quantity: 0,
      amount: 0,
    },
    serverCabinet: {
      description: "Server Cabinet & PDUs",
      quantity: 0,
      amount: 0,
    },
    powerAndCoolingCost: {
      description: "Power and Cooling Costs",
      quantity: 0,
      amount: 0,
    },
    numberOfSystem: {
      description: "Number of Systems FTEs to manage the environment",
      quantity: 0,
      amount: 0,
    },
    total: 0,
  });

  const [hostedCloudTable, setHostedCloudTable] = useState({
    redundant: {
      description: "GB of Memory (N+2 Redundant)",
      quantity: 0,
      amount: 0,
    },
    storageSpace: {
      description: "TB of SAN Storage Space",
      quantity: 0,
      amount: 0,
    },
    networkSwitching: {
      description: "Network Switching",
      quantity: 0,
      amount: 0,
    },
    computerEnvironment: {
      description: "SSAE-18 SOC II Computing Environment Audits",
      quantity: 0,
      amount: 0,
    },
    dataCenter: {
      description: "Tier III+ Data Center",
      quantity: 0,
      amount: 0,
    },
    onsiteSupport: {
      description: "24x7x365 Onsite Support",
      quantity: 0,
      amount: 0,
    },
  });

  const handleSliderChange = ({ name, value }) => {
    // const { maxValue, step, type, maxLimit } = sliders[name];

    setSliders((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: value,
      },
    }));
  };

  useEffect(() => {
    setSliders((prevState) => ({
      ...prevState,
      ["storageSlider"]: {
        ...prevState["storageSlider"],
        postFix: storageSpaceSize,
      },
    }));
  }, [storageSpaceSize]);

  useEffect(() => {
    //Constants
    const C24 = 192; //2 Socket Intel E5-2600 Server
    const C25 = 11862; //Price + 3 year 4-Hour Maint
    const C28 = 2; //vSphere Enterprise Plus Sockets
    const C29 = (3495 + 874) * C28; //Price + 3 Year Maint
    const C32 = 40; //40 Port 10GbE Low Latency Switch
    const C33 = 21611 + 3868; //Price + 3 year 4-Hour Maint
    const E24 = 13950; //Dual Controller SAN, 24x900GB 10K
    const E25 = 28890; //Price + 3 year 4-Hour Maint
    const E28 = 0.09; //Cost Per kWh
    const E29 = 2000; //40RU Cabinet, With  PDUs
    const E32 = 75000; //Salary + Benefits

    const memorySlider = sliders["memorySlider"].value;
    const storageSlider = sliders["storageSlider"].value; // storage space consumed
    const hdwrCycleSlider = sliders["hardwareRefreshCycleSlider"].value; // hardware Cycle Slider
    const cabinetSlider = sliders["cabinetSlider"].value; // number of cabinets Slider
    const monthlyCostSlider = sliders["monthlyCostSlider"].value; // cost per cabinets Slider
    const redundancyLevel = requiredRedundancyLevel == "high" ? 2 : 1;

    // table1 calculation

    let physicalServerQuantity =
      Math.ceil(memorySlider / C24, 0) + redundancyLevel;
    let physicalServerAmount = physicalServerQuantity * (C25 + C29);

    let storageAreaNetworkQuantity = Math.ceil(storageSlider / E24, 0);
    let storageAreaNetworkAmount = storageAreaNetworkQuantity * E25;

    let networkSwitchesQuantity = Math.ceil(physicalServerQuantity / 15, 0) * 2;
    let networkSwitchesAmount = networkSwitchesQuantity * C33;

    let serverCabinetQuantity = cabinetSlider;
    let serverCabinetAmount = serverCabinetQuantity * 2000;

    let powerAndCoolingCostQuantity =
      (physicalServerQuantity +
        storageAreaNetworkQuantity +
        networkSwitchesQuantity +
        serverCabinetQuantity) *
      1.5 *
      208;
    let powerAndCoolingCostAmount =
      hardwareLocated == "internal"
        ? (powerAndCoolingCostQuantity * E28 + cabinetSlider * 50 * 2) *
          12 *
          hdwrCycleSlider
        : monthlyCostSlider * cabinetSlider * 12 * hdwrCycleSlider;

    let numberOfSystemQuantity =
      Math.ceil(
        (physicalServerQuantity +
          storageAreaNetworkQuantity +
          networkSwitchesQuantity +
          serverCabinetQuantity -
          1) /
          3,
        0
      ) * 0.5;
    let numberOfSystemAmount = numberOfSystemQuantity * E32 * hdwrCycleSlider;

    let totalTable1 =
      physicalServerAmount +
      storageAreaNetworkAmount +
      networkSwitchesAmount +
      serverCabinetAmount +
      powerAndCoolingCostAmount +
      numberOfSystemAmount;

    //update state
    setPrivateCloudTable((prevState) => ({
      ...prevState,
      ["physicalServer"]: {
        ...prevState.physicalServer,
        quantity: physicalServerQuantity,
        amount: physicalServerAmount,
      },
      ["storageAreaNetwork"]: {
        ...prevState.storageAreaNetwork,
        quantity: storageAreaNetworkQuantity,
        amount: storageAreaNetworkAmount,
      },
      ["networkSwitches"]: {
        ...prevState.networkSwitches,
        quantity: networkSwitchesQuantity,
        amount: networkSwitchesAmount,
      },
      ["serverCabinet"]: {
        ...prevState.serverCabinet,
        quantity: serverCabinetQuantity,
        amount: serverCabinetAmount,
      },
      ["powerAndCoolingCost"]: {
        ...prevState.powerAndCoolingCost,
        quantity: powerAndCoolingCostQuantity,
        amount: powerAndCoolingCostAmount,
      },
      ["numberOfSystem"]: {
        ...prevState.numberOfSystem,
        quantity: numberOfSystemQuantity,
        amount: numberOfSystemAmount,
      },
      ["total"]: totalTable1,
    }));

    // Table2 Calculation
    let redundantQuantity = memorySlider;
    let redundantAmount =
      (redundantQuantity < 100
        ? redundantQuantity * 25
        : redundantQuantity < 200
        ? redundantQuantity * 20
        : redundantQuantity < 500
        ? redundantQuantity * 18
        : redundantQuantity * 15) *
      12 *
      hdwrCycleSlider;
    let storageSpaceQuantity =
      storageSpaceSize == "TB" ? storageSlider * 1000 : storageSlider;
    let storageSpaceAmount =
      (storageSpaceQuantity < 2000
        ? storageSpaceQuantity * 0.6
        : storageSpaceQuantity < 4000
        ? storageSpaceQuantity * 0.5
        : storageSpaceQuantity < 6000
        ? storageSpaceQuantity * 0.4
        : storageSpaceQuantity < 8000
        ? storageSpaceQuantity * 0.35
        : storageSpaceQuantity < 10000
        ? storageSpaceQuantity * 0.3
        : storageSpaceQuantity < 15000
        ? storageSpaceQuantity * 0.25
        : storageSpaceQuantity * 0.2) *
      12 *
      hdwrCycleSlider;

    let totalTable2 = redundantAmount + storageSpaceAmount;

    setHostedCloudTable((prevState) => ({
      ...prevState,
      ["redundant"]: {
        ...prevState.redundant,
        quantity: Math.round(redundantQuantity, 0),
        amount: Math.round(redundantAmount, 0),
      },
      ["storageSpace"]: {
        ...prevState.storageSpace,
        quantity: Math.round(storageSpaceQuantity, 0),
        amount: Math.round(storageSpaceAmount, 0),
      },
      ["total"]: Math.round(totalTable2, 0),
    }));
  }, [sliders, requiredRedundancyLevel, hardwareLocated, storageSpaceSize]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <Container>
      <div className="cloud-buil-vs-buy-calculator">
        <h5
          className="heading"
          style={{ fontSize: "20px", paddingBottom: "20px" }}
        >
          The Complete Cloud Build vs Buy Calculator
        </h5>
        <Row>
          <Col md={3}>
            <h5>Required redundancy level?</h5>
            <Select
              defaultValue={requiredRedundancyLevel}
              onChange={setRequiredRedundancyLevel}
              options={[
                {
                  value: "high",
                  label: "High - N+2",
                },
                {
                  value: "low",
                  label: "Low - N+1",
                },
              ]}
            />
          </Col>
          <Col md={3}>
            <h5>Where is your hardware located?</h5>
            <Select
              defaultValue={hardwareLocated}
              onChange={setHardwareLocated}
              options={[
                {
                  value: "colocation",
                  label: "Colocation Facility",
                },
                {
                  value: "internal",
                  label: "Internal Data Center",
                },
              ]}
            />
          </Col>
          <Col md={3}>
            <h5>Storage space size increase</h5>
            <Select
              defaultValue={storageSpaceSize}
              onChange={setStorageSpaceSize}
              options={[
                {
                  value: "GB",
                  label: "GB",
                },
                {
                  value: "TB",
                  label: "TB",
                },
              ]}
            />
          </Col>
        </Row>
        <Divider dashed />
        <Row>
          <Col md={6} className="slider-container">
            <CustomSlider
              title="How many GB of memory would be consumed?"
              data={sliders["memorySlider"]}
              name="memorySlider"
              handleChange={handleSliderChange}
            />
          </Col>
          <Col md={6} className="slider-container">
            <CustomSlider
              title="How many cabinets are needed for your Cloud hardware?"
              data={sliders["cabinetSlider"]}
              name="cabinetSlider"
              handleChange={handleSliderChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="slider-container">
            <CustomSlider
              title={`How many ${storageSpaceSize} of storage space would be consumed?`}
              data={sliders["storageSlider"]}
              name="storageSlider"
              handleChange={handleSliderChange}
            />
          </Col>
          <Col md={6} className="slider-container">
            {hardwareLocated == "colocation" && (
              <CustomSlider
                title="If colocating; what is your monthly cost per cabinet?"
                data={sliders["monthlyCostSlider"]}
                name="monthlyCostSlider"
                handleChange={handleSliderChange}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6} className="slider-container">
            <CustomSlider
              title="What is your hardware refreshcycle?"
              data={sliders["hardwareRefreshCycleSlider"]}
              name="hardwareRefreshCycleSlider"
              handleChange={handleSliderChange}
            />
          </Col>
          <Col md={6}></Col>
        </Row>
        {/* Table1 */}
        <div className="private-cloud-table">
          <div className="heading">
            <h4>{`The Total Cost of Ownership of Your Private Cloud Over a ${sliders["hardwareRefreshCycleSlider"].value} Year Period`}</h4>
          </div>
          <Divider dashed />

          <Table borderless>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(privateCloudTable).map((key, index) => {
                if (key != "total") {
                  return (
                    <tr key={index}>
                      <td>{privateCloudTable[key].description}</td>
                      <td>{privateCloudTable[key].quantity}</td>
                      <td>{numberFormat(privateCloudTable[key].amount)}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
          <div className="total-container">
            <h4>{`The Total Cost of Ownership of Your Private Cloud Over a ${sliders["hardwareRefreshCycleSlider"].value}  Year Period`}</h4>
            <div className="total">
              {numberFormat(privateCloudTable["total"])}
            </div>
          </div>
        </div>

        {/* Table2 */}
        <div className="hosted-cloud-table">
          <div className="heading">
            <h4>{`The Total Cost Of Ownership Using A Hosted Cloud Over a ${sliders["hardwareRefreshCycleSlider"].value} Year Period`}</h4>
          </div>
          <Divider dashed />

          <Table borderless>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(hostedCloudTable).map((key, index) => {
                if (key != "total") {
                  return (
                    <tr key={index}>
                      <td>{hostedCloudTable[key].description}</td>
                      <td>{hostedCloudTable[key].quantity}</td>
                      <td>{numberFormat(hostedCloudTable[key].amount)}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
          <div className="total-container">
            <h4></h4>
            <div className="total">
              {numberFormat(hostedCloudTable["total"])}
            </div>
          </div>
        </div>
      </div>
      <BodyBackgroundColor color="#d4e0fe" />
    </Container>
  );
}

export default index;

const CustomTooltip = ({ title, children }) => {
  if (title == null) {
    return children;
  } else {
    return (
      <Tooltip
        placement="bottom"
        title={title}
        // visible={true}
        zIndex={0}
        overlayClassName="cloud-build-tooltip"
      >
        {children}
      </Tooltip>
    );
  }
};

const CustomSlider = ({
  title,
  data,
  name,
  handleChange,
  disabled = false,
}) => {
  const { step, maxValue, minValue, value, preFix, postFix, toolTipText } =
    data;

  return (
    <span style={{ position: "relative" }}>
      <CustomTooltip title={toolTipText ? toolTipText : null}>
        <h5>{title}</h5>
        <div className="slider">
          <Slider
            step={step}
            max={maxValue}
            min={minValue ? minValue : 0}
            value={value}
            disabled={disabled}
            tooltipPlacement="bottom"
            tooltipVisible={false}
            name={name}
            onChange={(value) => handleChange({ name, value })}
          />
          <h5 className="custom-tooltip">{`${preFix}${value} ${postFix}`}</h5>
        </div>
      </CustomTooltip>
    </span>
  );
};
