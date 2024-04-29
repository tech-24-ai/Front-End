import Link from "next/link";
import React from "react";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import myImageLoader from "../imageLoader";
import Image from "next/future/image";
import { Row, Col } from "reactstrap";

function calculator() {
  const CalculatorType = [
    {
      name: "RAID<br/>Calculator",
      pageUrl: "raid-calculator",
      border: "#ffa867",
      icon: "raid-calculator.svg",
    },
    {
      name: "Bandwidth<br/>Calculator",
      pageUrl: "bandwidth-calculator",
      border: "#075aee",
      icon: "bandwidth-calculator.svg",
    },
    {
      name: "Backup Capacity<br/>Calculator",
      pageUrl: "backup-capacity-calculator",
      border: "#42c656",
      icon: "backup-capacity.svg",
    },
    {
      name: "File transfer time<br/>calculator",
      pageUrl: "file-transfer-time-calculator",
      border: "#42c656",
      icon: "file-transfer.svg",
    },
    {
      name: "Video Survelliance<br/>Storage",
      pageUrl: "video-storage-calculator",
      border: "#42c656",
      icon: "video-surveillance.svg",
    },
    {
      name: "Downtime<br/>Calculator",
      pageUrl: "downtime-calculator",
      border: "#42c656",
      icon: "downtime-calculator.svg",
    },
    {
      name: "Power Consumption<br/>Calculator",
      pageUrl: "server-rack-power-consumption-calculator",
      border: "#42c656",
      icon: "power-calculator.svg",
    },
    {
      name: "Splunk Storage<br/>Sizing",
      pageUrl: "splunk-storage-sizing",
      border: "#42c656",
      icon: "splunk-calculator.svg",
    },
    {
      name: "Data Center Cost<br/>Calculator",
      pageUrl: "data-center-calculator",
      border: "#42c656",
      icon: "cloud-cost-calculator.svg",
    },
  ];

  return (
    <div className="calculator" style={{ marginTop: isBrowser ? "30px" : "" }}>
      <div className="category-box">
        <div className="category-banner-wrapper" id="categoryWrapper">
          <Row>
            {CalculatorType.map((data, i) => (
              <Col
                md={4}
                lg={3}
                xs={6}
                data-index={i}
                key={i}
                className="category-banner-col"
              >
                <a
                  href={`/${data.pageUrl}`}
                  target="_blank"
                  className="category-banner-block"
                >
                  <div
                    className="category-banner"
                    style={{
                      borderBottomColor: "#ffa249",
                      borderBottomStyle: "solid",
                    }}
                  >
                    <Image
                      className="banner1"
                      loader={myImageLoader}
                      layout="raw"
                      width={40}
                      height={40}
                      src={`/images/calculator/${data.icon}`}
                      alt=""
                      style={{ objectFit: "contain" }}
                      placeholder="data-image"
                    />
                    <h6 dangerouslySetInnerHTML={{ __html: data.name }} />
                  </div>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default calculator;
