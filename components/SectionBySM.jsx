import React, { useRef } from "react";
import { Button, Container, Row } from "reactstrap";
import { isMobile, isBrowser } from "react-device-detect";
import menIcon from "../public/images/header/804@2x.png";
import beforeLine from "../public/images/header/Rectangle 124.png";
import ellipsLogo from "../public/images/header/Ellipse 21.png";
import greenTick from "../public/images/header/Group 619.png";
import firstGroup from "../public/images/header/Group 599.png";
import secondGroup from "../public/images/header/Group 656.png";
import thirdGroup from "../public/images/header/Group 603.png";
import fourthGroup from "../public/images/header/Group 658.png";
import ITPolicyIcon from "../public/images/header/Group 626.png";
import RFPIcon from "../public/images/header/Group 624.png";
import CostIcon from "../public/images/header/Group 650.png";
import ITStrategyIcon from "../public/images/header/Group 651.png";
import JobIcon from "../public/images/header/Group 627.png";
import beforeLine2 from "../public/images/header/Rectangle 133.png";
import ellips25 from "../public/images/header/Ellipse 25.png";
import laptopLogo from "../public/images/header/Group 674.png";
import girlLogo from "../public/images/header/2518626e.png";
import girlLogo2 from "../public/images/header/2518626.png";
import bestPracticeLogo2 from "../public/images/header/bestPracticeLogo2.png";

import Curve from "../pages/svgLine";
import { Line } from "../pages/svgLine";
import Footer from "./footer";
import Link from "next/link";
import line from "../public/images/header/Rectangle 147.png";
import recycleIcon from "../public/images/header/Group 689@3x.png";
import sycnIcon from "../public/images/header/Group 690@3x.png";
import adminMenLogo from "../public/images/header/adminMenLogo.png";
import fileLogo from "../public/images/header/fileLogo.png";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Image from "next/image";
import myImageLoader from "./imageLoader";
import themeConfig from "../config/themeConfig";

const SectionBySM = ({ isloggedIn }) => {
  const linkedinOpenUrl = () => {
    if (!isloggedIn) {
      const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_LINKEDIN_SCOPE}&state=${process.env.NEXT_PUBLIC_LINKEDIN_STATE}`;
      window.open(linkedinUrl, "_self");
    }
  };

  return (
    isBrowser && (
      <>
        <Container>
          <p
            style={{
              fontSize: "3rem",
              fontWeight: "200",
              lineHeight: "1.23",
              letterSpacing: "0.45px",
              textAlign: "left",
              color: "#272727",
              margin: "-70px 0px 50px 50px",
              letterSpacing: "4px",
            }}
          >
            <Image
              loader={myImageLoader}
              src={beforeLine}
              alt=""
              placeholder="beforeLine"
            />
            <br />
            Industry's first <br />
            <span style={{ fontWeight: "bold" }}>automated</span> IT product{" "}
            <br />
            recommendation <br /> platform
          </p>

          <div
            id="scroll"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "50px", marginTop: "-50px" }}>
              <p
                style={{
                  width: "70%",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  letterSpacing: "0.15px",
                  textAlign: "left",
                  // color: "#5d5d5d",
                  color: "#5C5C5C",
                }}
              >
                {themeConfig.appName} is industry’s first automated IT products
                recommendation platform that helps customers find the right
                product specific to their needs.
                <br />
                <br />
                Software, hardware or services you name it - our algorithms
                provide instant recommendations
              </p>
              <br />
              {/* <Link> */}
              <Button
                onClick={linkedinOpenUrl}
                style={{
                  fontWeight: "500",
                  letterSpacing: "0.24px",
                  textAlign: "center",
                  color: "#fff",
                  textTransform: "uppercase",
                  padding: "10px 40px",
                  borderRadius: "2.5px",
                  backgroundColor: "#2b7c9f",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                }}
              >
                try free now
              </Button>
              {/* </Link> */}
            </div>
            <div>
              <div
                style={{
                  width: "75%",
                  height: "75%",
                  margin: "-150px 0px 0px -30px",
                  position: "relative",
                }}
              >
                <Image
                  loader={myImageLoader}
                  src={menIcon}
                  alt=""
                  placeholder="menuIcon"
                />
              </div>
            </div>
          </div>
          <p
            style={{
              marginTop: "130px",
              textAlign: "center",
              height: "62.5px",
              fontSize: "1.5rem",
              fontWeight: "300",
              lineHeight: "1.25",
              letterSpacing: "0.24px",
              textAlign: "center",
              color: "#5d5d5d",
            }}
          >
            Narrow down your search and <br /> find the right product - <br />
            in <span style={{ fontWeight: "bold" }}>3 easy steps!</span>
            <br />
            <Image
              loader={myImageLoader}
              src={beforeLine}
              alt=""
              placeholder="beforeLine"
            />
          </p>

          <div
            style={{
              // marginTop: "150px",
              // marginLeft: "20px",
              display: "flex",
              justifyContent: "space-around",
              margin: "150px auto 0 auto",
              maxWidth: "1300px",
            }}
          >
            <div
              style={{
                width: "21%",
                height: "270px",
                objectFit: "contain",
                borderRadius: "5px",
                boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                border: "solid 0.3px #2b7c9f",
                zIndex: "100",
                // backgroundColor: "rgb(253, 255, 239)",
                // backgroundColor: "rgb(250, 251, 229)",
                backgroundColor: "#fdffef",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  position: "relative",
                  top: "-26%",
                  left: "-20%",
                  width: "60px",
                  height: "60px",
                  lineHeight: "60px",
                  margin: "40px 6.5px 53px 16.2px",
                  borderRadius: "2.5px",
                  boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                  border: "solid 0.5px #fdffef",
                  backgroundColor: "#2b7c9f",
                  fontSize: "22px",
                  fontWeight: "800",
                  letterSpacing: "0.24px",
                  color: "#d6ffff",
                }}
              >
                1
              </p>
              <p
                style={{
                  color: "#2b7c9f",
                  fontWeight: "800",
                  margin: "-110px 0px 0px 25px",
                  width: "25px",
                  fontSize: "1.6vw",
                  lineHeight: "27px",
                }}
              >
                Input Requirements
              </p>
              <p
                style={{
                  padding: "10%",
                  marginTop: "-10px",
                  letterSpacing: "0.14px",
                  color: "#5d5d5d",
                  fontSize: "16px",
                  lineHeight: "1.33",
                }}
              >
                Input your technical requirements, location, enterprise size and
                budget on the <br /> platform
              </p>
            </div>
            <Line x1={28} y1={10} x2={43} y2={10} ix={35.6} iy={9.4} sd={0.7} />
            {/* second */}

            <div
              style={{
                width: "21%",
                height: "270px",
                objectFit: "contain",
                borderRadius: "5px",
                boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                border: "solid 0.3px #2b7c9f",
                zIndex: "100",
                backgroundColor: "#fdffef",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  position: "relative",
                  top: "-26%",
                  left: "-20%",
                  width: "60px",
                  height: "60px",
                  lineHeight: "60px",
                  margin: "40px 6.5px 53px 16.2px",
                  borderRadius: "2.5px",
                  boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                  border: "solid 0.5px #fdffef",
                  backgroundColor: "#2b7c9f",
                  fontSize: "22px",
                  fontWeight: "800",
                  letterSpacing: "0.24px",
                  color: "#d6ffff",
                }}
              >
                2
              </p>
              <p
                style={{
                  color: "#2b7c9f",
                  fontWeight: "800",
                  margin: "-110px 0px 0px 25px",
                  width: "25px",
                  fontSize: "1.6vw",
                  lineHeight: "27px",
                }}
              >
                Algorithmic Search
              </p>
              <p
                style={{
                  padding: "10%",
                  marginTop: "-10px",
                  letterSpacing: "0.14px",
                  color: "#5d5d5d",
                  fontSize: "16px",
                  lineHeight: "1.33",
                }}
              >
                Our algorithms will find the list of right products for you -
                instantly!
              </p>
            </div>
            <Line
              x1={57.3}
              y1={10}
              x2={71.6}
              y2={10}
              ix={64.3}
              iy={9.4}
              sd={0.7}
            />

            {/* three */}

            <div
              style={{
                width: "21%",
                height: "270px",
                objectFit: "contain",
                borderRadius: "5px",
                boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                border: "solid 0.3px #2b7c9f",
                zIndex: "100",
                backgroundColor: "#fdffef",
              }}
            >
              {/* <img
                style={{ zIndex: "-1", padding: "-50px" }}
                src={bgYellow}
                alt=""
              /> */}
              <p
                style={{
                  textAlign: "center",
                  position: "relative",
                  top: "-26%",
                  left: "-20%",
                  width: "60px",
                  height: "60px",
                  lineHeight: "60px",
                  margin: "40px 6.5px 53px 16.2px",
                  borderRadius: "2.5px",
                  boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                  border: "solid 0.5px #fdffef",
                  backgroundColor: "#2b7c9f",
                  fontSize: "22px",
                  fontWeight: "800",
                  letterSpacing: "0.24px",
                  color: "#d6ffff",
                }}
              >
                3
              </p>
              <p
                style={{
                  color: "#2b7c9f",
                  fontWeight: "800",
                  margin: "-110px 0px 0px 25px",
                  width: "25px",
                  fontSize: "1.6vw",
                  lineHeight: "27px",
                }}
              >
                Product Selection
              </p>
              <p
                style={{
                  padding: "10%",
                  marginTop: "-10px",
                  letterSpacing: "0.14px",
                  color: "#5d5d5d",
                  fontSize: "16px",
                  lineHeight: "1.33",
                }}
              >
                Finalize product selection through our in-depth product
                comparison research and pay-per-minute consultants
              </p>
            </div>
          </div>

          <div
            style={{
              margin: "10% auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              maxWidth: "1300px",
            }}
          >
            <div
              style={{
                marginLeft: "5%",
                display: "flex",
                borderLeft: "7.5px solid rgb(43, 124, 159)",
                color: "#5d5d5d",
                paddingLeft: "17px",
                marginTop: "-43px",
              }}
            >
              <div style={{ fontSize: "20px" }}>
                <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                  {themeConfig.appName} <br />
                </span>
                A new way to
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                  &nbsp;buy
                </span>
              </div>
            </div>
            <Curve
              x1={25}
              y1={17}
              x2={65}
              y2={4}
              cx1={40}
              cy1={2}
              cx2={50}
              cy2={15}
              ix={47}
              iy={8.4}
              rotate={0}
            />
            <Curve
              x1={26.5}
              y1={18.5}
              x2={65}
              y2={15}
              cx1={40}
              cy1={11}
              cx2={53}
              cy2={11}
              ix={48.2}
              iy={11.7}
              rotate={5}
            />
            <Curve
              x1={26.5}
              y1={21}
              x2={65}
              y2={35}
              cx1={58}
              cy1={15}
              cx2={50}
              cy2={32}
              ix={44.5}
              iy={19.8}
              rotate={15}
            />
            <Curve
              x1={24}
              y1={22}
              x2={65}
              y2={26}
              cx1={43}
              cy1={36}
              cx2={55}
              cy2={36}
              ix={50.2}
              iy={32.48}
              rotate={-6}
            />

            <div style={{ position: "relative", left: "-10%" }}>
              <p>
                <Image loader={myImageLoader} src={ellipsLogo} alt="" />
                <span
                  style={{
                    position: "relative",
                    float: "left",
                    left: "40px",
                    top: "5px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={greenTick}
                    alt=""
                    placeholder="greenTick"
                  />
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "-35px",
                    left: "-79px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={firstGroup}
                    alt=""
                    placeholder="secondGroup"
                  />
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "170px",
                    position: "relative",
                    top: "-35px",
                    left: "-8%",
                    fontWeight: "500",
                    color: "#5d5d5d",
                  }}
                >
                  Eliminate Time consuming web searches
                </span>
              </p>
              <p>
                <Image loader={myImageLoader} src={ellipsLogo} alt="" />
                <span
                  style={{
                    position: "relative",
                    float: "left",
                    left: "40px",
                    top: "5px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={greenTick}
                    alt=""
                    placeholder="greenTick"
                  />
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "-35px",
                    left: "-86px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={secondGroup}
                    alt=""
                    placeholder="secondGroup"
                  />
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "170px",
                    position: "relative",
                    top: "-35px",
                    left: "-11%",
                    fontWeight: "500",
                    color: "#5d5d5d",
                  }}
                >
                  Stop hiring expensive consultants or advisory services
                </span>
              </p>
              <p>
                <Image loader={myImageLoader} src={ellipsLogo} alt="" />
                <span
                  style={{
                    position: "relative",
                    float: "left",
                    left: "40px",
                    top: "5px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={greenTick}
                    alt=""
                    placeholder="greenTick"
                  />
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "-35px",
                    left: "-82px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={thirdGroup}
                    alt=""
                    placeholder="thirdGroup"
                  />
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "165px",
                    position: "relative",
                    top: "-50px",
                    left: "-9%",
                    fontWeight: "500",
                    color: "#5d5d5d",
                  }}
                >
                  Remove confirmation bias
                </span>
              </p>
              <p>
                <Image loader={myImageLoader} src={ellipsLogo} alt="" />
                <span
                  style={{
                    position: "relative",
                    float: "left",
                    left: "40px",
                    top: "5px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={greenTick}
                    alt=""
                    placeholder="greenTick"
                  />
                </span>
                <span
                  style={{
                    position: "relative",
                    top: "-35px",
                    left: "-83px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={fourthGroup}
                    alt=""
                    placeholder="fourthGroup"
                  />
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "165px",
                    position: "relative",
                    top: "-55px",
                    left: "-9%",
                    fontWeight: "500",
                    color: "#5d5d5d",
                  }}
                >
                  Reject generic advice
                </span>
              </p>
            </div>
          </div>
        </Container>
        <div
          style={{
            height: "1100px",
            backgroundColor: "#005377",
            marginTop: "10%",
            padding: "0px",
          }}
        >
          <p
            style={{
              width: "450px",
              letterSpacing: "0.24px",
              textAlign: "center",
              color: "#fff",
              margin: "auto",
              paddingTop: "100px",
              fontWeight: "300",
              fontSize: "26px",
              letterSpacing: "0.24px",
            }}
          >
            Use our research to
            <span style={{ fontWeight: "bold" }}> gain insights </span>
            on technology, simplify IT planning and operations
            <br />
            <Image
              loader={myImageLoader}
              src={beforeLine2}
              alt=""
              placeholder="beforeLine2"
            />
          </p>

          <Curve
            x1={51.5}
            y1={0}
            x2={75}
            y2={18}
            cx1={60}
            cy1={10}
            cx2={60}
            cy2={12}
            ix={61.7}
            iy={10.5}
            rotate={37}
            color="#d6ffff"
          />
          <Curve
            x1={51}
            y1={0}
            x2={23}
            y2={13}
            cx1={58}
            cy1={18}
            cx2={25}
            cy2={0}
            ix={38.2}
            iy={8.2}
            rotate={-58}
            color="#d6ffff"
          />
          <Curve
            x1={51.5}
            y1={0}
            x2={40}
            y2={25}
            cx1={64}
            cy1={30}
            cx2={37}
            cy2={8}
            ix={50}
            iy={18}
            rotate={180}
            color="#d6ffff"
          />
          <Curve
            x1={51}
            y1={0}
            x2={60}
            y2={42}
            cx1={32}
            cy1={28}
            cx2={65}
            cy2={20}
            ix={52.3}
            iy={24.2}
            rotate={35}
            color="#d6ffff"
          />
          <div
            style={{
              marginTop: "10%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <Image
                loader={myImageLoader}
                src={laptopLogo}
                alt=""
                placeholder="laptopLogo"
                layout="raw"
                style={{
                  objectFit: "contain",
                  position: "relative",
                  top: "-27px",
                  left: "97px",
                  width: "250px",
                  height: "250px",
                }}
              />
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "300",
                  letterSpacing: "0.18px",
                  textAlign: "center",
                  color: "#d6ffff",
                  position: "relative",
                  top: "-60px",
                  left: "100px",
                }}
              >
                Market Trends
              </p>
            </div>
            <div
              style={{ position: "relative", left: "1%", marginTop: "10.6%" }}
            >
              <Image
                loader={myImageLoader}
                src={bestPracticeLogo2}
                alt=""
                placeholder="bestPracticesIcon"
                layout="raw"
                style={{
                  objectFit: "contain",
                  position: "relative",
                  top: "10%",
                  width: "200px",
                  height: "200px",
                }}
              />
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "300",
                  letterSpacing: "0.18px",
                  textAlign: "center",
                  color: "#d6ffff",
                  position: "relative",
                  top: "10%",
                  lineHeight: "1.17",
                }}
              >
                Operational <br /> Best Practices
              </p>
            </div>
            <div
              style={{
                position: "relative",
                left: "19%",
                top: "-84px",
                width: "250px",
              }}
            >
              <Image
                loader={myImageLoader}
                src={ellips25}
                alt=""
                layout="raw"
                style={{
                  objectFit: "contain",
                  position: "relative",
                  // left: "97px",
                  top: "69px",
                  zIndex: "2",
                  width: "220px",
                }}
              />

              <Image
                loader={myImageLoader}
                src={girlLogo}
                alt=""
                placeholder="girlLogo"
                layout="raw"
                style={{
                  objectFit: "contain",
                  zIndex: 2,
                  position: "relative",
                  // left: "35%",
                  top: "-32%",
                  width: "200px",
                  height: "200px",
                }}
              />
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "300",
                  letterSpacing: "0.18px",
                  textAlign: "center",
                  color: "#d6ffff",
                  position: "relative",
                  top: "-185px",
                  left: "-10px",
                  lineHeight: "1.17",
                }}
              >
                Technology <br /> Heat Maps
              </p>
            </div>
            <div
              style={{
                position: "relative",
                top: "330px",
                left: "-29%",
                width: "220px",
              }}
            >
              <Image
                loader={myImageLoader}
                src={ellips25}
                alt=""
                layout="raw"
                style={{ objectFit: "contain" }}
              />

              <Image
                loader={myImageLoader}
                src={girlLogo2}
                alt=""
                placeholder="girlLogo2"
                layout="raw"
                style={{
                  objectFit: "contain",
                  position: "relative",
                  top: "-47%",
                  left: "20%",
                }}
              />
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "300",
                  letterSpacing: "0.18px",
                  textAlign: "center",
                  color: "#d6ffff",
                  position: "relative",
                  top: "-250px",
                  lineHeight: "1.17",
                  // left: "65px",
                }}
              >
                In Depth <br /> Product Evaluations
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "430px",
            margin: "100px auto",
            fontSize: "26px",
            fontWeight: "300",
            letterSpacing: "0.24px",
            textAlign: "center",
            color: "#5d5d5d",
            lineHeight: "1.25",
          }}
        >
          Use our
          <span style={{ fontWeight: "600" }}> templates and toolkits </span>
          to simply IT operations and ensure compliance​
          <br />
          <Image
            loader={myImageLoader}
            src={beforeLine}
            alt=""
            placeholder="beforeLine"
          />
        </div>
        <div
          style={{
            width: "85%",
            marginTop: "-40px",
            display: "flex",
            margin: "0px auto",
            justifyContent: "space-around",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              loader={myImageLoader}
              src={ITPolicyIcon}
              alt=""
              placeholder="ITPolicyIcon"
            />
            <p
              style={{
                width: "100px",
                marginTop: "20px",
                fontWeight: "300",
                // color: "#5d5d5d",
                color: "#5C5C5C",
                letterSpacing: "0.18px",
                fontSize: "18px",
                lineHeight: "1.33",
              }}
            >
              IT Policy Samples
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              loader={myImageLoader}
              src={RFPIcon}
              alt=""
              placeholder="RFPIcon"
            />
            <p
              style={{
                width: "100px",
                marginTop: "20px",
                fontWeight: "300",
                // color: "#5d5d5d",
                color: "#5C5C5C",
                letterSpacing: "0.18px",
                fontSize: "18px",
                lineHeight: "1.33",
              }}
            >
              RFP Toolkits
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              loader={myImageLoader}
              src={CostIcon}
              alt=""
              placeholder="CostIcon"
            />
            <p
              style={{
                width: "100px",
                marginTop: "20px",
                fontWeight: "300",
                // color: "#5d5d5d",
                color: "#5C5C5C",
                letterSpacing: "0.18px",
                fontSize: "18px",
                lineHeight: "1.33",
              }}
            >
              Cost Calculators
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              loader={myImageLoader}
              src={ITStrategyIcon}
              alt=""
              placeholder="ITStrategyIcon"
            />
            <p
              style={{
                width: "100px",
                marginTop: "20px",
                fontWeight: "300",
                // color: "#5d5d5d",
                color: "#5C5C5C",
                letterSpacing: "0.18px",
                fontSize: "18px",
                lineHeight: "1.33",
              }}
            >
              IT Strategy Samples
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Image
              loader={myImageLoader}
              src={JobIcon}
              alt=""
              placeholder="JobIcon"
            />
            <p
              style={{
                width: "100px",
                marginTop: "20px",
                fontWeight: "300",
                // color: "#5d5d5d",
                color: "#5C5C5C",
                letterSpacing: "0.18px",
                fontSize: "18px",
                lineHeight: "1.33",
              }}
            >
              Job Descriptions
            </p>
          </div>
        </div>
        {/* trusted section */}
        <br />
        <br />
        <br />
        <br />
        {/* Meraj Code */}
        <div
          style={{
            backgroundColor: "#045377",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: "4rem 7rem",
          }}
        >
          <div>
            {/* <img
              style={{
                color: "#000",
                borderLeft: "10px solid #d6ffff",
                padding: "10px",
              }}
              src={trustedIcon}
              alt=""
            /> */}
            <div
              style={{
                objectFit: "contain",
                fontFamily: "Poppins",
                fontSize: "1.5rem",
                fontWeight: "bold",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "1.25",
                letterSpacing: "0.24px",
                textAlign: "left",
                color: "white",
                borderLeft: "8px solid #d6ffff",
                paddingLeft: "1rem",
                marginLeft: "3rem",
              }}
            >
              {themeConfig.appName}
              <br />
              <span style={{ fontWeight: 300 }}>Your</span>
              &nbsp;trusted&nbsp;
              <span style={{ fontWeight: 300 }}>
                IT
                <br />
                insights&nbsp;
              </span>
              partner
            </div>
          </div>
          <div style={{ width: "60%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1rem",
                minHeight: "17rem",
                maxWidth: "34rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fdffef",
                  borderRadius: "5px",
                  border: "solid 0.5px #2b7c9f",
                  width: "50%",
                }}
                className="d-block text-left"
              >
                <div
                  style={{
                    margin: "30px 0 10px 20px",
                    width: "27px",
                    height: "27px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={recycleIcon}
                    alt=""
                    placeholder="recycleIcon"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "800",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.33,
                    letterSpacing: "0.14px",
                    textAlign: "left",
                    color: "#2b7c9f",
                    padding: "0 20px",
                  }}
                >
                  Continuous Refinement
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                    letterSpacing: "0.12px",
                    textAlign: "left",
                    color: "#5d5d5d",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                  Our team ensures that all data is current, and algorithms are
                  continuously refined and up-to-date.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#fdffef",
                  borderRadius: "5px",
                  border: "solid 0.5px #2b7c9f",
                  marginLeft: "1rem",
                  width: "50%",
                }}
                className="d-block text-left"
              >
                <div
                  style={{
                    margin: "30px 0 10px 20px",
                    width: "27px",
                    height: "27px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={sycnIcon}
                    alt=""
                    placeholder="sycnIcon"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "800",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.33,
                    letterSpacing: "0.14px",
                    textAlign: "left",
                    color: "#2b7c9f",
                    padding: "0 20px",
                  }}
                >
                  Product Comparison Reports
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                    letterSpacing: "0.12px",
                    textAlign: "left",
                    color: "#5d5d5d",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                  Our analysts track the market for new vendors and product
                  announcements and continuously refine the product comparison
                  reports.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                minHeight: "17rem",
                maxWidth: "34rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fdffef",
                  borderRadius: "5px",
                  border: "solid 0.5px #2b7c9f",
                  width: "50%",
                }}
                className="d-block text-left"
              >
                <div
                  style={{
                    margin: "20px 0 10px 16px",
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={adminMenLogo}
                    alt=""
                    placeholder="adminMenLogo"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "800",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.33,
                    letterSpacing: "0.14px",
                    textAlign: "left",
                    color: "#2b7c9f",
                    padding: "0 20px",
                  }}
                >
                  Veteran Industry Practitioners
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                    letterSpacing: "0.12px",
                    textAlign: "left",
                    color: "#5d5d5d",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                  All templates, samples and toolkits are designed by veteran
                  industry practitioners and consultants and are reviewed
                  annually for factual accuracy.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#fdffef",
                  borderRadius: "5px",
                  border: "solid 0.5px #2b7c9f",
                  marginLeft: "1rem",
                  width: "50%",
                }}
                className="d-block text-left"
              >
                <div
                  style={{
                    margin: "20px 0 10px 12px",
                    position: "relative",
                    height: "32px",
                    width: "32px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={fileLogo}
                    alt=""
                    placeholder="wellCuratedIcon"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "800",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.33,
                    letterSpacing: "0.14px",
                    textAlign: "left",
                    color: "#2b7c9f",
                    paddingLeft: "20px",
                  }}
                >
                  Well Curated Reports
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.5,
                    letterSpacing: "0.12px",
                    textAlign: "left",
                    color: "#5d5d5d",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                  Our practitioners document their learnings in the field and
                  ensure our research reports are comprehensive and current.
                </p>
              </div>
            </div>
            {/* <div
              style={{
                backgroundColor: "#fdffef",
                borderRadius: "5px",
                border: "solid 0.5px #2b7c9f",
              }}
              className="d-block text-center"
            >
              <img
                style={{ margin: "50px 50px 20px 50px" }}
                src={recycleIcon}
                width={35}
                alt=""
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "0.15px",
                  textAlign: "center",
                  color: "#2b7c9f",
                }}
              >
                Continuous <br />
                Refinement
              </p>
              <p
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.12px",
                  textAlign: "center",
                  color: "#5d5d5d",
                  fontFamily: "Poppins",
                  padding: "0px 20px 50px 20px",
                }}
              >
                Our team ensures that all data is current, and algorithms are
                continuously refined and up-to-date.
              </p>
            </div> */}
            {/* <div
              style={{
                backgroundColor: "#fdffef",
                borderRadius: "5px",
                border: "solid 0.5px #2b7c9f",
                height: "400px",
              }}
              className="d-block text-center mt-4 ml-5 mr-5"
            >
              <img
                style={{ margin: "50px 50px 20px 50px" }}
                src={sycnIcon}
                width={35}
                alt=""
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "0.15px",
                  textAlign: "center",
                  color: "#2b7c9f",
                }}
              >
                Product Comparison <br />
                Reports
              </p>
              <p
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.12px",
                  textAlign: "center",
                  color: "#5d5d5d",
                  fontFamily: "Poppins",
                  padding: "0px 20px 50px 20px",
                }}
              >
                Our team ensures that all data is current, and algorithms are
                continuously refined and up-to-date.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#fdffef",
                borderRadius: "5px",
                border: "solid 0.5px #2b7c9f",
                height: "400px",
              }}
              className="d-block text-center mt-4 ml-5 mr-5"
            >
              <img
                style={{ margin: "30px 50px 20px 50px" }}
                src={adminMenLogo}
                width={50}
                alt=""
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "0.15px",
                  textAlign: "center",
                  color: "#2b7c9f",
                }}
              >
                Veteran Industry <br /> Practitioners
              </p>
              <p
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.12px",
                  textAlign: "center",
                  color: "#5d5d5d",
                  fontFamily: "Poppins",
                  padding: "0px 20px 50px 20px",
                }}
              >
                All templates, samples and toolkits are designed by veteran
                industry practitioners and consultants and are reviewed annually
                for factual accuracy.
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#fdffef",
                borderRadius: "5px",
                border: "solid 0.5px #2b7c9f",
                height: "400px",
              }}
              className="d-block text-center mt-4 ml-5 mr-5"
            >
              <img
                style={{ margin: "30px 50px 0px 50px" }}
                src={fileLogo}
                alt=""
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  letterSpacing: "0.15px",
                  textAlign: "center",
                  color: "#2b7c9f",
                }}
              >
                Well Curated <br />
                Reports
              </p>
              <p
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.12px",
                  textAlign: "center",
                  color: "#5d5d5d",
                  fontFamily: "Poppins",
                  padding: "0px 20px 50px 20px",
                }}
              >
                Our practitioners document their learnings in the field and
                ensure our research reports are comprehensive and current.
              </p>
            </div> */}
          </div>

          {/* <div>
            <img style={{ height: "80vh" }} src={allGroup} alt="" />
          </div> */}
          {/*  <div
            style={{
              backgroundColor: "#045377",
              height: "auto",
              padding: "100px 0px",
            }}
          >
            <img className="d-block m-auto pt-5" src={trustedIcon} alt="" /> 
            <p
              style={{
                fontSize: "25px",
                lineHeight: "1.25",
                letterSpacing: "0.18px",
                textAlign: "center",
                color: "#fff",
                padding: "0px auto",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{themeConfig.appName}</span> <br />
              Your <span style={{ fontWeight: "bold" }}>trusted</span> IT <br />
              insights <span style={{ fontWeight: "bold" }}>partner​</span>
            </p>
            <img className="d-block m-auto" src={line} alt="" />
             
            
          </div> */}
        </div>
        {/* Old code */}
        {/* <div
          style={{
            backgroundColor: "#045377",
            height: "100vh",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "103.2%",
            margin: "0px auto",
            padding: "0px",
            marginLeft: "-20px",
          }}
        >
          <div>
            <img
              style={{
                color: "#000",
                borderLeft: "10px solid #d6ffff",
                padding: "10px",
              }}
              src={trustedIcon}
              alt=""
            />
          </div>
          <div>
            <img style={{ height: "80vh" }} src={allGroup} alt="" />
          </div>
        </div>
        <div
          style={{
            width: "90%",
            margin: "10% auto",
            height: "35vh",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div style={{ width: "25%" }}>
            <p style={{ color: "#2b7c9f", fontSize: "25px" }}>
              <span style={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                IT
              </span>
              MAP
            </p>
            <p
              style={{ color: "#707070", marginTop: "-20px", fontSize: "13px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>

          <div style={{ width: "25%" }}>
            <p style={{ color: "#2b7c9f", fontSize: "25px" }}>Address</p>
            <p
              style={{
                color: "#707070",
                marginTop: "-20px",
                letterSpacing: "1px",
                fontSize: "13px",
              }}
            >
              365, Dupont Avenue <br /> Wellington Street <br /> NY, USA
            </p>
            <p style={{ color: "#707070", fontSize: "13px" }}>
              365, Dupont Avenue <br /> Wellington Street <br /> NY, USA
            </p>
          </div>

          <div style={{ width: "25%" }}>
            <p style={{ color: "#2b7c9f", fontSize: "25px" }}>Contacts</p>
            <p
              style={{ color: "#707070", marginTop: "-20px", fontSize: "13px" }}
            >
              {" "}
              NY Office : +1 234 567 8909 <br /> Florida Office : +1 234 567
              8909
            </p>
            <p style={{ color: "#707070", fontSize: "13px" }}>
              Email : support@tech24.ai
            </p>
          </div>

          <div>
            <p style={{ color: "#2b7c9f", fontSize: "28px" }}>Social</p>
          <a href="in"></a>
          <a href="in"></a>
            <img src={socialIcons} alt="" />
          </div>
        </div> */}
        {/* <footer
            style={{
              backgroundColor: "#272727",
              padding: "8px",
              color: "#fff",
              textAlign: "end",
              paddingRight: "100px",
              width: "100vw",
              marginLeft: "-40px",
            }}
          >
            ALL RIGHTS RESERVED © {themeConfig.appName}.
          </footer> */}
        {/* <Footer /> */}
        {/* </Container> */}
      </>
    )
  );
};

function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
  };
}

export default withRouter(connect(mapState, null)(SectionBySM));
