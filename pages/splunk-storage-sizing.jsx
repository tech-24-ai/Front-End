import React, { useEffect, useState, Fragment } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Checkbox, Divider, Slider, Radio, Space, Tooltip } from "antd";
import { Container, Table, Row, Col } from "reactstrap";

function index() {
  const [isSizeByEventsChecked, setIsSizeByEventsChecked] = useState(false);
  const [isClusterReplicationChecked, setIsClusterReplicationChecked] =
    useState(true);
  const [isEstimateAutomaticallyChecked, setIsEstimateAutomaticallyChecked] =
    useState(true);

  const [inputData, setInputData] = useState({
    dailyDataVolume: {
      value: 1,
      type: "GB",
      step: 1,
      maxValue: 1000 * 40,
      minValue: 1,
      maxLimit: 1000 * 40,
      leftPosition: 0,
      rightMargin: 15,
      toolTipText:
        "The average amount of uncompressed raw data that Splunk will ingest.",
    },
    eventPerSecond: {
      value: 50,
      type: "",
      step: 50,
      maxValue: 5000000,
      minValue: 50,
      leftPosition: 0,
      rightMargin: 7.4,
      toolTipText:
        "The average number of events per second that Splunk will ingest.",
    },
    averageSize: {
      value: 20,
      type: "bytes",
      step: 20,
      maxValue: 1000,
      minValue: 20,
      leftPosition: 0,
      rightMargin: 29,
      toolTipText: "The average message size that Splunk will ingest.",
    },
    rawCompression: {
      value: 0.01,
      type: "",
      step: 0.01,
      maxValue: 0.8,
      minValue: 0.01,
      leftPosition: 0,
      rightMargin: 9,
      toolTipText:
        "Typically, the compressed rawdata file is 15% the size of the incoming, pre-indexed raw data. The number of unique terms in the data affect this value.",
    },
    metadataSize: {
      value: 0.1,
      type: "",
      step: 0.1,
      maxValue: 1.5,
      minValue: 0.1,
      leftPosition: 0,
      rightMargin: 7,
      toolTipText:
        "Typically, metadata is 35% of the raw  data. The type of data and index time field extractions will affect this value.",
    },
  });

  const [dataRetention, setDataRetention] = useState({
    hot: {
      value: 1,
      type: "days",
      step: 1,
      maxValue: 30 * 12 * 7,
      minValue: 0,
      leftPosition: 0,
      rightMargin: 22,
      label: "1 days",
      toolTipText:
        "Hot/Warm data will generally be accessed regularly. It should reside on the fastest disk to improve indexing and search performance.",
    },
    cold: {
      value: 1,
      type: "days",
      step: 1,
      maxValue: 30 * 12 * 7,
      minValue: 0,
      leftPosition: 0,
      rightMargin: 22,
      label: "1 days",
      toolTipText:
        "Cold data is generally older and not accessed regularly. It should reside on slower, cheaper disk as search performance is generally not critical.",
    },
    archived: {
      value: 1,
      type: "days",
      step: 1,
      maxValue: 30 * 12 * 7,
      minValue: 0,
      leftPosition: 0,
      rightMargin: 22,
      label: "1 days",
      toolTipText:
        "Frozen data is not searchable and should reside on the slowest, cheapest disk",
    },
    total: 0,
  });

  const [architecture, setArchitecture] = useState({
    useCase: "security",
    maxVolume: {
      value: 100,
      type: "GB",
      step: 1,
      maxValue: 600,
      minValue: 1,
      leftPosition: 0,
      rightMargin: 22,
      toolTipText:
        "The maximum daily data volume (in GB) to ingest per indexer. Lowering this will increase the number of indexers requried.",
    },
    nodes: {
      value: 2,
      type: "node(s)",
      step: 1,
      maxValue: 100,
      minValue: 2,
      leftPosition: 0,
      rightMargin: 37,
      toolTipText: "The number of indexers needed to meet the requirements.",
    },
    searchability: {
      value: 1,
      type: "",
      step: 1,
      maxValue: 1,
      minValue: 1,
      leftPosition: 0,
      rightMargin: 2,
      toolTipText:
        "The number of searchable copies of the data to be retained across the cluster. This must be the same or less than the Replication Factor",
    },
    replication: {
      value: 1,
      type: "",
      step: 1,
      maxValue: 10,
      minValue: 1,
      leftPosition: 0,
      rightMargin: 2,
      toolTipText:
        "The total number of searchable and non-searchable copies of the data to be retained across the cluster. This must be the same or greater than the Searchability Factor.",
    },
  });

  const [storageRequired, setStorageRequired] = useState({
    perIndexer: {
      hot: 0,
      cold: 0,
      archived: 0,
      total: 0,
    },
    allIndexer: {
      hot: 0,
      cold: 0,
      archived: 0,
      total: 0,
    },
  });

  const handleChange = ({ name, value }) => {
    const { maxValue, step, type, maxLimit } = inputData[name];

    let newStep = step;
    if (name == "eventPerSecond") {
      if (value >= 500 && value < 10000) {
        newStep = 500;
      } else if (value >= 10000 && value < 100000) {
        newStep = 10000;
      } else if (value >= 100000 && value < 500000) {
        newStep = 100000;
      } else if (value >= 500000 && value < 5000000) {
        newStep = 500000;
      } else {
        newStep = 50;
      }
    }
    let data = {
      ...inputData[name],
      value: value,
      //   step: newStep,
    };

    if (name == "dailyDataVolume") {
      if (value <= 1000) {
        data["type"] = "GB";
        // data["step"] = 1;
        // data["maxValue"] = 1000 * 2;
        data["labelValue"] = value;
      } else {
        data["type"] = "TB";
        // data["step"] = 1000;
        // data["maxValue"] = maxLimit;
        data["labelValue"] = Math.round(value / 1000);
      }
    }
    console.log("data", data);

    setInputData((prevState) => ({ ...prevState, [name]: data }));

    if (
      (name == "eventPerSecond" || name == "averageSize") &&
      isSizeByEventsChecked
    ) {
      const eventPerSecondValue =
        name == "eventPerSecond" ? value : inputData["eventPerSecond"].value;
      const averageSizeValue =
        name == "averageSize" ? value : inputData["averageSize"].value;

      let newValue = eventPerSecondValue * averageSizeValue * (60 * 60 * 24);
      newValue = newValue / (1024 * 1024 * 1024);

      setInputData((prevState) => ({
        ...prevState,
        ["dailyDataVolume"]: {
          ...prevState.dailyDataVolume,
          value: newValue,
        },
      }));
    }
  };

  const handleDataRetention = ({ name, value }) => {
    const { maxValue, step, rightMargin, label, type } = dataRetention[name];

    const keys = Object.keys(dataRetention).filter(
      (k) => k != name && k != "total"
    );
    let total = value;
    keys.map((key) => {
      total += dataRetention[key].value;
    });

    let newLabel = `${value} days`;
    let newStep = step;
    if (value > 60 && value <= 30 * 36) {
      newLabel = `${Math.round(value / 30)} month`;
      newStep = 30;
    } else if (value > 30 * 36) {
      newLabel = `${Math.round(value / (30 * 12))} years`;
      newStep = 30 * 12;
    } else {
      newStep = 1;
    }

    const data = {
      ...dataRetention[name],
      value,
      label: newLabel,
      step: newStep,
    };
    setDataRetention((prevState) => ({ ...prevState, [name]: data, total }));
  };

  const handleArchitecture = ({ name, value }) => {
    const { type } = architecture[name];
    console.log("architecture:", name, "Value:", value);
    const data = {
      ...architecture[name],
      value,
    };
    setArchitecture((prevState) => ({ ...prevState, [name]: data }));
    if (name == "replication") {
      setArchitecture((prevState) => ({
        ...prevState,
        ["searchability"]: {
          ...prevState.searchability,
          maxValue: value,
          value:
            prevState.searchability.value > value
              ? value
              : prevState.searchability.value,
        },
      }));
    }
    if (name == "nodes") {
      setArchitecture((prevState) => ({
        ...prevState,
        ["replication"]: {
          ...prevState.replication,
          maxValue: value >= 10 ? 10 : value,
          value:
            prevState.replication.value > value
              ? value
              : prevState.replication.value,
        },
        ["searchability"]: {
          ...prevState.searchability,
          maxValue:
            prevState.replication.value > value
              ? value
              : prevState.replication.value,
          value:
            prevState.searchability.value > value
              ? value
              : prevState.searchability.value,
        },
      }));
    }
  };

  const handleUseCase = (event) => {
    const { type } = architecture["maxVolume"];
    const { value } = event.target;
    let maxVolumeValue = 0;
    let nodeValue = 1;
    if (value == "security") {
      maxVolumeValue = 100;
      nodeValue = 2;
    }
    if (value == "vmware") {
      maxVolumeValue = 260;
    }
    if (value == "intelligence") {
      maxVolumeValue = 200;
    }
    if (value == "other") {
      maxVolumeValue = 300;
    }

    setArchitecture((prevState) => ({
      ...prevState,
      ["useCase"]: value,
      maxVolume: {
        ...prevState.maxVolume,
        value: maxVolumeValue,
      },
    }));

    if (!isClusterReplicationChecked) {
      let newValue = value == "security" ? 2 : 1;
      setArchitecture((prevState) => ({
        ...prevState,
        nodes: {
          ...prevState.nodes,
          value: newValue,
          minValue: newValue,
        },
      }));
    }
  };

  useEffect(() => {
    if (isSizeByEventsChecked) {
      const averageSizeValue = inputData["averageSize"].value;
      const eventPerSecondValue = inputData["eventPerSecond"].value;
      let newValue = eventPerSecondValue * averageSizeValue * (60 * 60 * 24);
      newValue = newValue / (1024 * 1024 * 1024);
      setInputData((prevState) => ({
        ...prevState,
        ["dailyDataVolume"]: {
          ...prevState.dailyDataVolume,
          value: newValue,
        },
      }));
    } else {
      setInputData((prevState) => ({
        ...prevState,
        ["dailyDataVolume"]: {
          ...prevState.dailyDataVolume,
          value: prevState.dailyDataVolume.minValue,
          type: "GB",
          labelValue: null,
        },
      }));
    }
  }, [isSizeByEventsChecked]);

  useEffect(() => {
    if (isClusterReplicationChecked) {
      const { minValue, type } = architecture["nodes"];
      setArchitecture((prevState) => ({
        ...prevState,
        nodes: {
          ...prevState.nodes,
          value: minValue,
        },
        replication: {
          ...prevState.replication,
          maxValue: minValue,
        },
      }));
    }
  }, [isClusterReplicationChecked]);

  // defaul calculation
  useEffect(() => {
    const { archived, cold, hot } = dataRetention;
    let totalRetention = hot.value + cold.value + archived.value;
    setDataRetention((prevState) => ({
      ...prevState,
      total: totalRetention,
    }));
  }, []);

  // calculate storage requirement
  useEffect(() => {
    const {
      averageSize,
      dailyDataVolume,
      eventPerSecond,
      metadataSize,
      rawCompression,
    } = inputData;
    const { replication, maxVolume, nodes, searchability, useCase } =
      architecture;
    const { archived, cold, hot } = dataRetention;

    // const gbtobytesFactor = 1024 * 1024 * 1024;
    const gbtobytesFactor = 1024;
    const GBtoMBFactor = 1024;

    const replicationFactorSlider = replication.value;
    const searchabilityFactorSlider = searchability.value;
    const nodeValue = nodes.value; //indexersSlider;
    const dailyDataVolumeValue = dailyDataVolume.value; //rawVolume
    const indexFactorSlider = metadataSize.value; //indexFactor
    const rawCompressionValue = rawCompression.value; //compressionFactor
    let rawDataPerDay = dailyDataVolumeValue * rawCompressionValue;
    let replicationFactor = isClusterReplicationChecked
      ? replicationFactorSlider
      : 1;
    const searchFactor = isClusterReplicationChecked
      ? searchabilityFactorSlider
      : 1;
    let storageRawPerDay = rawDataPerDay * replicationFactor;
    const hotWarmRetention = hot.value; //hotwarmRetentionSlider
    const coldRetention = cold.value; //coldRetentionSlider
    const frozenRetention = archived.value; //frozenRetentionSlider
    const storageHotWarmRaw = storageRawPerDay * hotWarmRetention;
    const indexDataPerDay = dailyDataVolumeValue * indexFactorSlider;
    const storageIndexPerDay = indexDataPerDay * searchFactor;

    // hot warm Indexer calc
    const storageHotWarmIndex = storageIndexPerDay * hotWarmRetention;
    const storageHotWarmTotal = storageHotWarmRaw + storageHotWarmIndex;
    const storageHotWarmPerIndexer = storageHotWarmTotal / nodeValue;
    let hotWarmPerIndexerStorage = storageHotWarmPerIndexer * gbtobytesFactor;
    let hotWarmAllIndexerStorage = storageHotWarmTotal * gbtobytesFactor;

    // cold Indexer calc
    const storageColdIndex = storageIndexPerDay * coldRetention;
    const storageColdRaw = storageRawPerDay * coldRetention;
    const storageColdTotal = storageColdRaw + storageColdIndex;
    const storageColdPerIndexer = storageColdTotal / nodeValue;
    let coldPerIndexerStorage = storageColdPerIndexer * gbtobytesFactor;
    let coldAllIndexerStorage = storageColdTotal * gbtobytesFactor;

    // archived (Frozen) cal
    const storageFrozenIndex = storageIndexPerDay * frozenRetention;
    const storageFrozenRaw = storageRawPerDay * frozenRetention;
    const storageFrozenPerIndexer = storageFrozenRaw / nodeValue;
    let frozenPerIndexerStorage = storageFrozenPerIndexer * gbtobytesFactor;
    let frozenAllIndexerStorage = storageFrozenRaw * gbtobytesFactor;

    // total cal
    let totalPerIndexerStorage =
      hotWarmPerIndexerStorage +
      coldPerIndexerStorage +
      frozenPerIndexerStorage;

    let totalAllIndexerStorage =
      hotWarmAllIndexerStorage +
      coldAllIndexerStorage +
      frozenAllIndexerStorage;

    let totalPerIndexerLabel = "MB";
    let totalAllIndexerLabel = "MB";
    if (totalPerIndexerStorage >= GBtoMBFactor) {
      totalPerIndexerStorage = totalPerIndexerStorage / GBtoMBFactor;
      totalPerIndexerLabel = "GB";
    }

    if (totalAllIndexerStorage >= GBtoMBFactor) {
      totalAllIndexerStorage = totalAllIndexerStorage / GBtoMBFactor;
      totalAllIndexerLabel = "GB";
    }

    // hot warm
    let hotPerIndexerLabel = "MB";
    let hotAllIndexerLabel = "MB";
    if (hotWarmPerIndexerStorage >= GBtoMBFactor) {
      hotWarmPerIndexerStorage = hotWarmPerIndexerStorage / GBtoMBFactor;
      hotPerIndexerLabel = "GB";
    }
    if (hotWarmAllIndexerStorage >= GBtoMBFactor) {
      hotWarmAllIndexerStorage = hotWarmAllIndexerStorage / GBtoMBFactor;
      hotAllIndexerLabel = "GB";
    }

    //cold
    let coldPerIndexerLabel = "MB";
    let coldAllIndexerLabel = "MB";
    if (coldPerIndexerStorage >= GBtoMBFactor) {
      coldPerIndexerStorage = coldPerIndexerStorage / GBtoMBFactor;
      coldPerIndexerLabel = "GB";
    }
    if (coldAllIndexerStorage >= GBtoMBFactor) {
      coldAllIndexerStorage = coldAllIndexerStorage / GBtoMBFactor;
      coldAllIndexerLabel = "GB";
    }
    //frozen
    let frozenPerIndexerLabel = "MB";
    let frozenAllIndexerLabel = "MB";
    if (frozenPerIndexerStorage >= GBtoMBFactor) {
      frozenPerIndexerStorage = frozenPerIndexerStorage / GBtoMBFactor;
      frozenPerIndexerLabel = "GB";
    }
    if (frozenAllIndexerStorage >= GBtoMBFactor) {
      frozenAllIndexerStorage = frozenAllIndexerStorage / GBtoMBFactor;
      frozenAllIndexerLabel = "GB";
    }

    setStorageRequired((prevState) => ({
      ...prevState,
      perIndexer: {
        ...prevState.perIndexer,
        hot: `${hotWarmPerIndexerStorage.toFixed(1)} ${hotPerIndexerLabel}`,
        cold: `${coldPerIndexerStorage.toFixed(1)} ${coldPerIndexerLabel}`,
        archived: `${frozenPerIndexerStorage.toFixed(
          1
        )} ${frozenPerIndexerLabel}`,
        total: `${totalPerIndexerStorage.toFixed(1)} ${totalPerIndexerLabel}`,
      },
      allIndexer: {
        ...prevState.allIndexer,
        hot: `${hotWarmAllIndexerStorage.toFixed(1)} ${hotAllIndexerLabel}`,
        cold: `${coldAllIndexerStorage.toFixed(1)} ${coldAllIndexerLabel}`,
        archived: `${frozenAllIndexerStorage.toFixed(
          1
        )} ${frozenAllIndexerLabel}`,
        total: `${totalAllIndexerStorage.toFixed(1)} ${totalAllIndexerLabel}`,
      },
    }));
  }, [inputData, architecture, dataRetention]);

  return (
    <Container>
      <div className="splunk-sizing">
        <h5
          className="heading"
          style={{ fontSize: "20px", paddingBottom: "20px" }}
        >
          Splunk Storage Sizing
        </h5>
        {/* input-data */}
        <div className="input-data">
          <div className="heading">
            <h5>Input Data</h5>
            <CustomTooltip title="To get the most accurate sizing, enter the expected data volume per day. Select this check box if you prefer to estimate storage based on a number of Events per second - this calculates volume based on a 'typical' event size.">
              <Checkbox
                checked={isSizeByEventsChecked}
                onChange={(e) => setIsSizeByEventsChecked(e.target.checked)}
              >
                Size by Events/Sec
              </Checkbox>
            </CustomTooltip>
          </div>
          <Divider dashed />
          {isSizeByEventsChecked ? (
            <p className="description">
              Estimate the amount of data based on a number of events per second
              - this calculates based on a typical event size. The more data you
              send to Splunk Enterprise, the more time Splunk needs to index it
              into results that you can search, report and generate alerts on.
            </p>
          ) : (
            <p className="description">
              Estimate the average daily amount of data to be ingested. The more
              data you send to Splunk Enterprise, the more time Splunk needs to
              index it into results that you can search, report and generate
              alerts on.
            </p>
          )}
          <Row className="slider">
            {isSizeByEventsChecked ? (
              <Fragment>
                <Col md={3}>
                  <SliderComponent
                    title="Events per Second"
                    data={inputData["eventPerSecond"]}
                    name="eventPerSecond"
                    handleChange={handleChange}
                  />
                </Col>
                <Col md={3}>
                  <SliderComponent
                    title="Average event Sizes"
                    data={inputData["averageSize"]}
                    name="averageSize"
                    handleChange={handleChange}
                  />
                </Col>
              </Fragment>
            ) : (
              <Col md={3}>
                <SliderComponent
                  title="Daily Data Volume"
                  data={inputData["dailyDataVolume"]}
                  name="dailyDataVolume"
                  handleChange={handleChange}
                />
              </Col>
            )}

            <Col md={3}>
              <SliderComponent
                title="Raw Compression Factor"
                data={inputData["rawCompression"]}
                name="rawCompression"
                handleChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <SliderComponent
                title="Metadata Size Factor"
                data={inputData["metadataSize"]}
                name="metadataSize"
                handleChange={handleChange}
              />
            </Col>
          </Row>
          {isSizeByEventsChecked && (
            <p style={{ marginTop: "40px" }} className="description">
              Daily Data Volume:{" "}
              {Math.round(inputData["dailyDataVolume"].value) > 0
                ? `${inputData["dailyDataVolume"].value.toFixed(1)} GB`
                : `${(inputData["dailyDataVolume"].value * 1024).toFixed(
                    1
                  )} MB`}{" "}
              ({inputData["eventPerSecond"].value} events/s *{" "}
              {inputData["averageSize"].value} bytes avg. event size * 3600
              seconds/hour * 24 hours/day)
            </p>
          )}
        </div>

        {/* Data Retention */}
        <div className="data-retention" style={{ marginTop: "40px" }}>
          <div className="heading">
            <h6>Data Retention</h6>
          </div>
          <Divider dashed />
          <p className="description">
            Specify the amount of time to retain data for each category. Data
            will be rolled through each category dependant on its age.
          </p>

          <div className="slider">
            <SliderComponent
              title="Hot, Warm"
              data={dataRetention["hot"]}
              name="hot"
              handleChange={handleDataRetention}
            />
            <SliderComponent
              title="Cold"
              data={dataRetention["cold"]}
              name="cold"
              handleChange={handleDataRetention}
            />
            <SliderComponent
              title="Archived (Frozen)"
              data={dataRetention["archived"]}
              name="archived"
              handleChange={handleDataRetention}
            />
            <div className="retention-time">
              <div className="bar-container">
                <h6>Retention Time</h6>
                <div className="bar">
                  <div
                    className="hot"
                    style={{
                      width: `${
                        (dataRetention["hot"].value / dataRetention.total) * 100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="cold"
                    style={{
                      width: `${
                        (dataRetention["cold"].value / dataRetention.total) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="archived"
                    style={{
                      width: `${
                        (dataRetention["archived"].value /
                          dataRetention.total) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="legend">
                  <div>
                    <span className="hot"></span>
                    Hot, Warm
                  </div>
                  <div>
                    <span className="cold"></span>
                    Cold
                  </div>
                  <div>
                    <span className="archived"></span>
                    Archived
                  </div>
                </div>
              </div>
              <div className="total">
                <p>
                  Total ={" "}
                  <span>
                    {dataRetention.total <= 90
                      ? `${dataRetention.total} days`
                      : dataRetention.total <= 30 * 12 * 3
                      ? `${Math.round(dataRetention.total / 30)} months`
                      : `${Math.round(dataRetention.total / (30 * 12))} years`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture */}
        <div className="architecture" style={{ marginTop: "40px" }}>
          <div className="heading">
            <h6>Architecture</h6>
            <Checkbox
              checked={isClusterReplicationChecked}
              onChange={(e) => setIsClusterReplicationChecked(e.target.checked)}
            >
              Cluster Replication
            </Checkbox>
            <Checkbox
              checked={isEstimateAutomaticallyChecked}
              onChange={(e) =>
                setIsEstimateAutomaticallyChecked(e.target.checked)
              }
            >
              Estimate automatically
            </Checkbox>
          </div>
          <Divider dashed />
          <p className="description">
            Specify the number of nodes required. The more data to ingest, the
            greater the number of nodes required. Adding more nodes will improve
            indexing throughput and search performance.
          </p>

          <div className="slider">
            {isEstimateAutomaticallyChecked && (
              <Fragment>
                <CustomTooltip title="If applicable, specify which app you are planning to use. Some apps have increased resource requirements.">
                  <div>
                    <h6>Use Case / App</h6>
                    <Radio.Group
                      onChange={handleUseCase}
                      value={architecture["useCase"]}
                    >
                      <Space direction="vertical">
                        <Radio value="security">
                          Splunk Enterprise Security
                        </Radio>
                        <Radio value="vmware">Splunk App for VMware</Radio>
                        <Radio value="intelligence">
                          Splunk IT Service Intelligence
                        </Radio>
                        <Radio value="other">Other</Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </CustomTooltip>
                <SliderComponent
                  title="Max. Volume per Indexer"
                  data={architecture["maxVolume"]}
                  name="maxVolume"
                  handleChange={handleArchitecture}
                  disabled={
                    isEstimateAutomaticallyChecked &&
                    architecture["useCase"] != "other"
                  }
                />
              </Fragment>
            )}
            <SliderComponent
              title="Number of Nodes"
              data={architecture["nodes"]}
              name="nodes"
              handleChange={handleArchitecture}
              disabled={
                isEstimateAutomaticallyChecked &&
                architecture["useCase"] != "other"
              }
            />
            {isClusterReplicationChecked && (
              <Fragment>
                <SliderComponent
                  title="Searchability Factor"
                  data={architecture["searchability"]}
                  name="searchability"
                  handleChange={handleArchitecture}
                />
                <SliderComponent
                  title="Replication Factor"
                  data={architecture["replication"]}
                  name="replication"
                  handleChange={handleArchitecture}
                />
              </Fragment>
            )}
          </div>
        </div>

        {/* Storage Required */}
        <div className="storage-required" style={{ marginTop: "40px" }}>
          <div className="heading">
            <h6>Storage Required</h6>
          </div>
          <Divider dashed />
          <p className="description">
            This is a breakdown of the overall storage requirement.
          </p>

          <Table borderless>
            <thead>
              <tr>
                <td></td>
                <td>(per Indexer)</td>
                <td>(all Indexer)</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hot, Warm</td>
                <td>{storageRequired["perIndexer"].hot}</td>
                <td>{storageRequired["allIndexer"].hot}</td>
              </tr>
              <tr>
                <td>Cold</td>
                <td>{storageRequired["perIndexer"].cold}</td>
                <td>{storageRequired["allIndexer"].cold}</td>
              </tr>
              <tr>
                <td>Archived</td>
                <td>{storageRequired["perIndexer"].archived}</td>
                <td>{storageRequired["allIndexer"].archived}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>{storageRequired["perIndexer"].total}</th>
                <th>{storageRequired["allIndexer"].total}</th>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
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
        overlayClassName="splunk-sizing-tooltip"
      >
        {children}
      </Tooltip>
    );
  }
};

const SliderComponent = ({
  title,
  data,
  name,
  handleChange,
  disabled = false,
}) => {
  const {
    step,
    maxValue,
    minValue,
    type,
    value,
    leftPosition,
    label,
    labelValue,
    rightMargin,
    toolTipText,
  } = data;
  let tooltipValue = `${labelValue ? labelValue : value} ${type}`;
  if (name == "eventPerSecond") {
    if (value >= 1000 && value < 1000000) {
      tooltipValue = `${Math.round(value / 1000)}K`;
    } else if (value >= 1000000) {
      tooltipValue = `${Math.round(value / 1000000)}M`;
    }
  }

  let maxLimit = maxValue > 0 ? maxValue : 100;
  let minLimit = minValue > 0 ? minValue : 0;
  let newPosition = ((value - minLimit) / (maxLimit - minLimit)) * 100;
  if (newPosition >= 100 - rightMargin) {
    newPosition = 100 - rightMargin;
  }

  return (
    <span style={{ position: "relative" }}>
      <CustomTooltip title={toolTipText ? toolTipText : null}>
        <h6>{title}</h6>
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

        <span
          className="custom-tooltip"
          style={{
            position: "absolute",
            left: `${newPosition}%`,
            whiteSpace: "nowrap",
          }}
        >
          {label ? label : tooltipValue}
        </span>
      </CustomTooltip>
    </span>
  );
};
