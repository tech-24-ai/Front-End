import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import Sliders from "../components/slider/index.js";
import { Col, InputNumber, Row, Slider, Input, Radio, Space } from "antd";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { alertActions } from "../_actions";
import { Container } from "reactstrap";

const VideoStorageCalculator = ({ showError }) => {
  const [resolutionValue, setResolutionValue] = useState({
    key: 20,
    value: "1080P HD",
  });
  const [videoQualityValue, setVideoQualityValue] = useState({
    key: 50,
    value: "Medium",
  });
  const [compressionTypeValue, setcompressionTypeValue] = useState("MJPEG");
  const [averageFrameSize, setAverageFrameSize] = useState();

  const [NC, setNC] = useState(1);
  const [FPS, setFPS] = useState(1);
  const [Hrs, setHrs] = useState(1);
  const [NoD, setNoD] = useState(1);

  const resolutionData = {
    // 0: "D1 (720x480)",
    0: "720P HD",
    20: "1080P HD",
    40: "1.3MP",
    60: "3MP",
    80: "5MP",
    100: "10MP",
  };
  const resolutionQualityData = {
    0: {
      low: 40,
      medium: 80,
      high: 120,
    },
    20: {
      low: 70,
      medium: 120,
      high: 180,
    },
    40: {
      low: 100,
      medium: 170,
      high: 250,
    },
    60: {
      low: 125,
      medium: 210,
      high: 320,
    },
    80: {
      low: 150,
      medium: 250,
      high: 400,
    },
    100: {
      low: 300,
      medium: 500,
      high: 900,
    },
  };

  const videoQualityData = {
    0: "Low",
    50: "Medium",
    100: "High",
  };
  const onNCValue = (value) => {
    setNC(value);
  };
  const onFPSValue = (value) => {
    if (value > 30) {
      setFPS(30);
      return showError("Please enter value between 1 to 30");
    }
    setFPS(value);
  };
  const onHrsValue = (value) => {
    if (value > 24) {
      setHrs(24);
      return showError("Please enter value between 1 to 24");
    }
    setHrs(value);
  };
  const onNoDValue = (value) => {
    setNoD(value);
  };

  useEffect(() => {
    console.log("resolutionValue", resolutionValue);
    console.log("videoQualityValue", videoQualityValue);
    let totalFrameSize =
      resolutionQualityData[resolutionValue.key][
        videoQualityValue.value.toLowerCase()
      ];

    if (compressionTypeValue == "H.264") {
      totalFrameSize = totalFrameSize / 5;
    } else if (compressionTypeValue == "H.265") {
      if (videoQualityValue.value.toLowerCase() == "low") {
        totalFrameSize = (totalFrameSize * 0.647) / 5;
      } else if (videoQualityValue.value.toLowerCase() == "medium") {
        totalFrameSize = (totalFrameSize * 0.518) / 5;
      } else if (videoQualityValue.value.toLowerCase() == "high") {
        totalFrameSize = (totalFrameSize * 0.495) / 5;
      }
    }

    setAverageFrameSize(totalFrameSize);
  }, [resolutionValue, videoQualityValue, compressionTypeValue]);

  // console.log("AverageFrameSize", averageFrameSize);

  const result =
    ((averageFrameSize * FPS * NC * 60 * 60 * 24 * NoD) / 1000000 / 24) * Hrs;

  return (
    <Container>
      <div className="videoStorageContainer">
        <div>
          <h5 className="heading">Video Surveillance Storage Calculator</h5>
          {/* <p className="inputTitle">
          Input your surveillance technology specifications to estimate the
          necessary storage space needed to support your unique environment.
        </p> */}
          <Row className="rowWithFlex">
            <p className="sliderTitle">number of cameras</p>
            {/* <Col span={8}>
            <Slider
              trackStyle={{ color: "#000" }}
              min={1}
              max={25}
              onChange={onNCValue}
              value={NC}
              tooltipVisible={false}
            />
          </Col> */}
            <Col span={4}>
              <InputNumber
                min={1}
                className="antInput"
                // max={20}
                value={NC}
                onChange={onNCValue}
              />
            </Col>
          </Row>

          <Row className="rowWithFlex">
            <p className="sliderTitle">Frames per second</p>
            {/* <Col span={8}>
            <Slider
              min={1}
              max={30}
              onChange={onFPSValue}
              value={FPS}
              tooltipVisible={false}
            />
          </Col> */}
            <Col span={4}>
              <InputNumber
                min={1}
                // max={30}
                className="antInput"
                value={FPS}
                onChange={onFPSValue}
              />
            </Col>
          </Row>

          <Row className="rowWithFlex">
            <p className="sliderTitle">Hours per day</p>
            {/* <Col span={8}>
            <Slider
              min={1}
              max={24}
              onChange={onHrsValue}
              value={Hrs}
              tooltipVisible={false}
            />
          </Col> */}
            <Col span={4}>
              <InputNumber
                min={1}
                // max={24}
                className="antInput"
                value={Hrs}
                onChange={onHrsValue}
              />
            </Col>
          </Row>

          <Row className="rowWithFlex">
            <p className="sliderTitle">Number of Days Stored</p>
            {/* <Col span={8}>
            <Slider
              min={1}
              max={31}
              onChange={onNoDValue}
              value={NoD}
              tooltipVisible={false}
            />
          </Col> */}
            <Col span={4}>
              <InputNumber
                min={1}
                className="antInput"
                value={NoD}
                onChange={onNoDValue}
              />
            </Col>
          </Row>

          <p className="sliderTitle">Resolution</p>
          <div>
            {/* <div className="resolutionDivOne">
            <Slider
              marks={resolutionData}
              step={null}
              defaultValue={20}
              onChange={(e) =>
                setResolutionValue({ key: e, value: resolutionData[e] })
              }
              tooltipVisible={false}
            />
          </div> */}
            <div>
              <Radio.Group
                onChange={(e) =>
                  setResolutionValue({
                    key: e.target.value,
                    value: resolutionData[e.target.value],
                  })
                }
                value={resolutionValue.key}
                // defaultValue={20}
              >
                <div className="space" direction="">
                  <div>
                    <Radio value={0}>720P HD</Radio>
                    <Radio value={20}>1080P HD</Radio>
                    <Radio value={40}>1.3 Megapixel</Radio>
                  </div>
                  <div>
                    <Radio value={60}>3 Megapixel</Radio>
                    <Radio value={80}>5 Megapixel</Radio>
                    <Radio value={100}>10 Megapixel</Radio>
                  </div>
                </div>
              </Radio.Group>
            </div>
            {/* <div className="resolutionDivTwo">{resolutionValue.value}</div> */}
          </div>

          <p className="sliderTitle">Video Quality</p>
          <div className="videoContainer">
            <div>
              <Slider
                marks={videoQualityData}
                step={null}
                defaultValue={50}
                onChange={(e) =>
                  setVideoQualityValue({ key: e, value: videoQualityData[e] })
                }
                tooltipVisible={false}
              />
            </div>
            {/* <div className="resolutionDivTwo">{videoQualityValue.value}</div> */}
          </div>

          <div className="compressionType">
            <p className="sliderTitle">Compression Type</p>
            <div className="compressionDiv">
              <div>
                <input
                  type="radio"
                  id="MJPEG"
                  name="compressionType"
                  value="MJPEG"
                  onChange={(e) => {
                    setcompressionTypeValue(e.target.value);
                  }}
                />
                <label
                  className={
                    compressionTypeValue == "MJPEG" ? "active" : "boxText"
                  }
                  for="MJPEG"
                >
                  MJPEG
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="H.264"
                  name="compressionType"
                  value="H.264"
                  onChange={(e) => {
                    setcompressionTypeValue(e.target.value);
                  }}
                />
                <label
                  className={
                    compressionTypeValue == "H.264" ? "active" : "boxText"
                  }
                  for="H.264"
                >
                  H.264
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="H.265"
                  name="compressionType"
                  value="H.265"
                  onChange={(e) => {
                    setcompressionTypeValue(e.target.value);
                  }}
                />
                <label
                  className={
                    compressionTypeValue == "H.265" ? "active" : "boxText"
                  }
                  for="H.265"
                >
                  H.265
                </label>
              </div>
            </div>
          </div>
          <div className="result">
            <div className="heading">Required Storage Space</div>
            <div className="resultText">
              {result < 1 ? (
                <span>{(result * 1000).toFixed(2)} MB</span>
              ) : result >= 1000 ? (
                <span>{(result / 1000).toFixed(2)} TB</span>
              ) : (
                <span>{result.toFixed(2)} GB</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const actionCreators = {
  showError: alertActions.warning,
};

export default withRouter(
  connect(null, actionCreators)(VideoStorageCalculator)
);
