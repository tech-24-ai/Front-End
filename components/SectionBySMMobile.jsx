import React, { useState } from "react";
import { Container } from "reactstrap";
import { isMobile } from "react-device-detect";

import menIcon from "../public/images/header/804@2x.png";
import downArrow from "../public/images/header/Path 336.png";
import beforeLine from "../public/images/header/Rectangle 124.png";
import line from "../public/images/header/Rectangle 147.png";
import firstGroup from "../public/images/header/Group 674.png";
import ellips from "../public/images/header/Ellipse 31 m.png";
import girlOne from "../public/images/header/2518626 m.png";
import girlTwo from "../public/images/header/2518626e m.png";
import recycleIcon from "../public/images/header/Group 689@3x.png";
import adminMenLogo from "../public/images/header/adminMenLogo.png";
import bestPracticeLogo from "../public/images/header/bestPracticeLogo.png";
import fileLogo from "../public/images/header/fileLogo.png";
import sycnIcon from "../public/images/header/Group 690@3x.png";
import lineGreen from "../public/images/header/Rectangle 148.png";

import ITMAPLogo from "../public/images/header/Group 641 m.png";
import Link from "next/link";
import { VLine } from "../pages/svgLine";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "next/router";

import greenTick from "../public/images/header/Group 619.png";
import EliminateTimeImage from "../public/images/header/Group 599.png";
import biasImage from "../public/images/header/Group 603.png";
import advisoryImage from "../public/images/header/Group 656.png";
import genericImage from "../public/images/header/Group 658.png";

import ITPolicyImage from "../public/images/header/Group 626.png";
import RFPImage from "../public/images/header/Group 624.png";
import Costmage from "../public/images/header/Group 650.png";
import ITStrategyImage from "../public/images/header/Group 651.png";
import JobImage from "../public/images/header/Group 627.png";

import LinkedinIcon from "../public/images/header/Linkedin-icon.svg";
import TwitterIcon from "../public/images/header/Twitter-icon.svg";
import myImageLoader from "./imageLoader";
import Image from "next/image";

const SectionBySMMobile = ({ isloggedIn }) => {
  const [scrollSize, setScrollSize] = useState(0);

  var myScrollFunc = function () {
    setScrollSize(Math.round(window.scrollY));
  };

  window.addEventListener("scroll", myScrollFunc);

  // end here

  const linkedinOpenUrl = () => {
    if (!isloggedIn) {
      const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_LINKEDIN_SCOPE}&state=${process.env.NEXT_PUBLIC_LINKEDIN_STATE}`;
      window.open(linkedinUrl, "_self");
    }
  };

  return (
    <>
      {isMobile && (
        <>
          <div
            style={{
              // backgroundImage:
              //   "linear-gradient(to left, rgba(255, 255, 255, 0), #d9d9d9)",
              height: "auto",
              paddingTop: "40px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-55px",
                left: "10px",
              }}
            >
              {/* <div>
                <img src={headerLogo} width={100} alt="" />
              </div> */}
              {/* <div>
                <img src={MILogo} alt="milogo" />
              </div> */}
            </div>
            <p
              style={{
                fontSize: "23px",
                fontWeight: "200",
                letterSpacing: "0.2px",
                textAlign: "center",
                color: "#272727",
                margin: "50px",
              }}
            >
              Industry’s first <br />
              <span style={{ fontWeight: "bold" }}>automated</span> IT product
              <br /> recommendation <br /> platform
            </p>
            <Image
              loader={myImageLoader}
              src={menIcon}
              alt=""
              placeholder="wellCuratedIcon"
              layout="raw"
              style={{ objectFit: "contain", height: "22rem", width: "23rem" }}
            />
            <p
              style={{
                width: "80%",
                fontSize: "18px",
                letterSpacing: "0.12px",
                textAlign: "center",
                color: "#5d5d5d",
                margin: "30px auto",
              }}
            >
              ITMAP is industry’s first automated IT products recommendation
              platform that helps customers find the right product specific to
              their needs.
              <br /> <br /> Software, hardware or services you name it - our
              algorithms provide instant recommendations.
            </p>
            <Button
              onClick={linkedinOpenUrl}
              style={{
                display: "block",
                margin: "20px auto",
                backgroundColor: "#2b7c9f",
                padding: "15px 0px",
                borderRadius: "5px",
                color: "#fff",
                border: "none",
                outline: "none",
                width: "50%",
                textAlign: "center",
              }}
            >
              TRY FREE NOW
            </Button>
            {/* show hide div */}
            <div
              style={{
                // display: "flex",
                // justifyContent: "space-around",
                fontWeight: "bold",
                borderRadius: "30px",
                backgroundColor: "#d6ffff9f",
                position: "fixed",
                bottom: "30px",
                display: scrollSize >= 900 ? "inline-block" : "none",
                padding: "12px",
                zIndex: "1",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Link
                href={{
                  pathname: "/about-us",
                }}
              >
                <a
                  style={{
                    padding: "12px",
                    borderRadius: "30px",
                    color: "#5d5d5d",
                    color: "#000",
                    fontSize: "15px",
                  }}
                >
                  About
                </a>
              </Link>

              <Link href="/">
                <a
                  style={{
                    padding: "11px 24px",
                    backgroundColor: "#2b7c9f",
                    color: "#fff",
                    borderRadius: "30px",
                    fontSize: "15px",
                  }}
                >
                  Home
                </a>
              </Link>
              <Link href="/connect">
                <a
                  href="/connect"
                  style={{ padding: "12px", color: "#000", fontSize: "15px" }}
                >
                  Connect
                </a>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "50px 0",
              }}
            >
              <Image
                loader={myImageLoader}
                src={downArrow}
                alt=""
                placeholder="downArrow"
                layout="raw"
              />
            </div>
            {/* <p
              style={{
                backgroundColor: "#d9d9d9",
                margin: "20px",
                borderRadius: "50px",
                display: "flex",
                justifyContent: "space-around",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "bold",
                letterSpacing: "0.12px",
                color: "#000",
                textAlign: "center",
              }}
            >
              <a style={{ padding: "10px", color: "#000" }} href="#">
                Home
              </a>
              <a
                style={{
                  padding: "10px 30px",
                  backgroundColor: "#2b7c9f",
                  borderRadius: "20px",
                  color: "#fff",
                }}
                href="#"
              >
                About
              </a>
              <a style={{ padding: "10px", color: "#000" }} href="#">
                Connect
              </a>
            </p> */}
            <p
              style={{
                textAlign: "center",
                height: "62.5px",
                fontSize: "1.5rem",
                fontWeight: "300",
                lineHeight: "1.25",
                letterSpacing: "0.24px",
                textAlign: "center",
                color: "#5d5d5d",
                margin: "50px",
              }}
            >
              Narrow down your search and find the right product - <br /> in{" "}
              <span style={{ fontWeight: "bold" }}>3 easy steps</span>!
              <br />
              <Image
                loader={myImageLoader}
                src={beforeLine}
                alt=""
                placeholder="beforeLine"
                layout="raw"
                style={{ objectFit: "contain", marginTop: "20px" }}
              />
            </p>

            <div
              style={{
                margin: "200px 0px 150px 0px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                  border: "solid 0.3px #2b7c9f",
                  margin: "0px auto",
                  backgroundColor: "#fdffef",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    position: "relative",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "60px",
                    lineHeight: "60px",
                    // margin: "40px 6.5px 53px 16.2px",
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
                    textAlign: "center",
                    margin: "-30px 0px -10px 0px",
                    fontSize: "20px",
                  }}
                >
                  Input <br /> Requirements
                </p>
                <p
                  style={{
                    padding: "10%",
                    letterSpacing: "0.14px",
                    color: "#5d5d5d",
                    fontSize: "18px",
                    lineHeight: "1.33",
                    textAlign: "center",
                  }}
                >
                  Input your technical requirements, location, enterprise size
                  and budget on the platform
                </p>
              </div>

              {/* second */}
              <VLine
                x1={50}
                y1={1}
                x2={50}
                y2={27}
                ix={52}
                iy={11}
                rotate={90}
                sw={0.8}
                sd={1.6}
                // style={{
                //   position: "absolute",
                //   zIndex: "1",
                // }}
                // className="svgLine"
              />

              <div
                style={{
                  width: "70%",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                  border: "solid 0.3px #2b7c9f",
                  margin: "0px auto",
                  backgroundColor: "#fdffef",
                  marginTop: "-18px",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    position: "relative",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "60px",
                    lineHeight: "60px",
                    // margin: "40px 6.5px 53px 16.2px",
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
                    textAlign: "center",
                    margin: "-30px 0px -10px 0px",
                    fontSize: "20px",
                  }}
                >
                  Algorithmic <br /> Search
                </p>
                <p
                  style={{
                    padding: "10%",
                    // marginTop: "-10px",
                    letterSpacing: "0.14px",
                    color: "#5d5d5d",
                    fontSize: "18px",
                    lineHeight: "1.33",
                    textAlign: "center",
                  }}
                >
                  Our algorithms will find the list of right products for you -
                  instantly!
                </p>
              </div>

              {/* three */}
              <VLine
                x1={50}
                y1={1}
                x2={50}
                y2={27}
                ix={52}
                iy={11}
                rotate={90}
                sw={0.8}
                sd={1.6}
                // style={{ position: "absolute", zIndex: "1" }}
                // className="svgLine"
              />

              <div
                style={{
                  width: "70%",
                  height: "300px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
                  border: "solid 0.3px #2b7c9f",
                  margin: "0px auto",
                  backgroundColor: "#fdffef",
                  marginTop: "-18px",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    position: "relative",
                    top: "-10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60px",
                    height: "60px",
                    lineHeight: "60px",
                    // margin: "40px 6.5px 53px 16.2px",
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
                    textAlign: "center",
                    margin: "-30px 0px -10px 0px",
                    fontSize: "20px",
                  }}
                >
                  Product <br /> Selection
                </p>
                <p
                  style={{
                    padding: "10%",
                    // marginTop: "-10px",
                    letterSpacing: "0.14px",
                    color: "#5d5d5d",
                    fontSize: "18px",
                    lineHeight: "1.33",
                    textAlign: "center",
                  }}
                >
                  Finalize product selection through our in-depth product
                  comparison research and pay-per-minute consultants
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: "25px",
                fontWeight: "300",
                lineHeight: "1.25",
                letterSpacing: "0.18px",
                textAlign: "center",
                color: "#5d5d5d",
              }}
            >
              <span style={{ fontWeight: "bold" }}>ITMAP</span>
              <br /> A new way to{" "}
              <span style={{ fontWeight: "bold" }}>buy</span>
            </p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                loader={myImageLoader}
                src={beforeLine}
                alt=""
                placeholder="beforeLine"
                layout="raw"
                style={{
                  objectFit: "contain",
                  width: "50px",
                  height: "auto",
                  margin: "10px auto",
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 35px",
                marginBottom: "30px",
                marginTop: "40px",
              }}
            >
              <div
                className="cicle"
                style={{
                  minWidth: "90px",
                  minHeight: "90px",
                  maxWidth: "90px",
                  maxHeight: "90px",
                  border: "1px solid #2b7c9f",
                  borderRadius: "100%",
                  backgroundColor: "#fdffef",
                }}
              >
                <Image
                  loader={myImageLoader}
                  src={greenTick}
                  alt=""
                  placeholder="greenTick1"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    float: "left",
                    left: "0",
                    top: "-10px",
                  }}
                />
                <Image
                  loader={myImageLoader}
                  src={EliminateTimeImage}
                  alt=""
                  placeholder="EliminateTimeImage"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    left: "-5px",
                    top: "19px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "inline-block",
                  fontWeight: "500",
                  color: "#5d5d5d",
                  width: "60%",
                  objectFit: "contain",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "1.25",
                  letterSpacing: "0.12px",
                  textAlign: "left",
                }}
              >
                Eliminate Time consuming web searches
              </div>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 35px",
                marginBottom: "30px",
              }}
            >
              <div
                className="cicle"
                style={{
                  minWidth: "90px",
                  minHeight: "90px",
                  maxWidth: "90px",
                  maxHeight: "90px",
                  border: "1px solid #2b7c9f",
                  borderRadius: "100%",
                  backgroundColor: "#fdffef",
                }}
              >
                <Image
                  loader={myImageLoader}
                  src={greenTick}
                  alt=""
                  placeholder="greenTick2"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    float: "left",
                    left: "0",
                    top: "-10px",
                  }}
                />
                <Image
                  loader={myImageLoader}
                  src={advisoryImage}
                  alt=""
                  placeholder="advisoryImage"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    left: "-12px",
                    top: "13px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "inline-block",
                  fontWeight: "500",
                  color: "#5d5d5d",
                  width: "60%",
                  objectFit: "contain",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "1.25",
                  letterSpacing: "0.12px",
                  textAlign: "left",
                }}
              >
                Stop hiring expensive consultants or advisory services
              </div>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 35px",
                marginBottom: "30px",
              }}
            >
              <div
                className="cicle"
                style={{
                  minWidth: "90px",
                  minHeight: "90px",
                  maxWidth: "90px",
                  maxHeight: "90px",
                  border: "1px solid #2b7c9f",
                  borderRadius: "100%",
                  backgroundColor: "#fdffef",
                }}
              >
                <Image
                  loader={myImageLoader}
                  src={greenTick}
                  alt=""
                  placeholder="greenTick2"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    float: "left",
                    left: "0",
                    top: "-10px",
                  }}
                />
                <Image
                  loader={myImageLoader}
                  src={biasImage}
                  alt=""
                  placeholder="biasImage"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    left: "-10px",
                    top: "25px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "inline-block",
                  fontWeight: "500",
                  color: "#5d5d5d",
                  width: "60%",
                  objectFit: "contain",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "1.25",
                  letterSpacing: "0.12px",
                  textAlign: "left",
                }}
              >
                Remove confirmation bias
              </div>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 35px",
              }}
            >
              <div
                className="cicle"
                style={{
                  minWidth: "90px",
                  minHeight: "90px",
                  maxWidth: "90px",
                  maxHeight: "90px",
                  border: "1px solid #2b7c9f",
                  borderRadius: "100%",
                  backgroundColor: "#fdffef",
                }}
              >
                <Image
                  loader={myImageLoader}
                  src={greenTick}
                  alt=""
                  placeholder="greenTick2"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    float: "left",
                    left: "0",
                    top: "-10px",
                  }}
                />
                <Image
                  loader={myImageLoader}
                  src={genericImage}
                  alt=""
                  placeholder="genericImage"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    position: "relative",
                    left: "-10px",
                    top: "23px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "inline-block",
                  fontWeight: "500",
                  color: "#5d5d5d",
                  width: "60%",
                  objectFit: "contain",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "1.25",
                  letterSpacing: "0.12px",
                  textAlign: "left",
                }}
              >
                Reject generic advice
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#045377",
                height: "1550px",
                marginTop: "4rem",
              }}
            >
              {/* <img
                style={{
                  display: "block",
                  margin: "0px auto",
                  padding: "60px 0px 10px 0px",
                }}
                src={researchIcon}
                alt=""
              /> */}
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "300",
                  lineHeight: "1.25",
                  letterSpacing: "0.18px",
                  textAlign: "center",
                  color: "#fff",
                  padding: "50px 50px 0px 50px",
                }}
              >
                Use our research to{" "}
                <span style={{ fontWeight: "bold" }}>gain insights</span> on
                technology, simplify IT planning and operations
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  loader={myImageLoader}
                  src={line}
                  alt=""
                  placeholder="line"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "3rem",
                }}
              >
                <Image
                  loader={myImageLoader}
                  src={firstGroup}
                  alt=""
                  placeholder="line"
                  layout="raw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p
                style={{
                  fontSize: "19px",
                  fontWeight: "300",
                  letterSpacing: "0.14px",
                  textAlign: "center",
                  color: "#d6ffff",
                }}
              >
                Market Trends
              </p>
              <Image
                loader={myImageLoader}
                src={bestPracticeLogo}
                alt=""
                placeholder="bestPracticeLogo"
                layout="raw"
                style={{ objectFit: "contain", height: "15rem" }}
              />
              <p
                style={{
                  fontSize: "19px",
                  fontWeight: "300",
                  letterSpacing: "0.14px",
                  textAlign: "center",
                  color: "#d6ffff",
                }}
              >
                Operational <br /> Best Practices
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={ellips}
                    alt=""
                    placeholder="ellips"
                    layout="raw"
                  />
                  <Image
                    loader={myImageLoader}
                    src={girlOne}
                    alt=""
                    placeholder="girlOne"
                    layout="raw"
                    style={{ position: "absolute" }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "300",
                    letterSpacing: "0.14px",
                    textAlign: "center",
                    color: "#d6ffff",
                    position: "relative",
                  }}
                >
                  In Depth <br /> Product Evaluations
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={ellips}
                    alt=""
                    placeholder="ellips"
                    layout="raw"
                  />
                  <Image
                    loader={myImageLoader}
                    src={girlTwo}
                    alt=""
                    placeholder="girlTwo"
                    layout="raw"
                    style={{ position: "absolute", marginTop: "20px" }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "300",
                    letterSpacing: "0.14px",
                    textAlign: "center",
                    color: "#d6ffff",
                    position: "relative",
                  }}
                >
                  Technology <br /> Heat Maps
                </p>
              </div>
            </div>
            <div>
              {/* <img className="d-block m-auto pt-5" src={tookitImage} alt="" /> */}
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "300",
                  lineHeight: "1.25",
                  letterSpacing: "0.18px",
                  textAlign: "center",
                  color: "#5d5d5d",
                  padding: "50px 50px 0px 50px",
                }}
              >
                Use our{" "}
                <span style={{ fontWeight: "bold" }}>
                  templates and toolkits
                </span>{" "}
                to simply IT operations and ensure compliance​
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  loader={myImageLoader}
                  src={lineGreen}
                  alt=""
                  placeholder="lineGreen"
                  layout="raw"
                  style={{ objectFit: "contain", margin: "auto" }}
                />
              </div>
              <div
                style={{
                  marginTop: "60px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "start",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={ITPolicyImage}
                    alt=""
                    placeholder="ITPolicyImage"
                    layout="raw"
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      objectFit: "contain",
                      fontFamily: "Poppins",
                      fontWeight: "300",
                      fontSize: "17px",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "1.33",
                      textAlign: "center",
                      color: "#5d5d5d",
                      marginTop: "10px",
                    }}
                  >
                    IT Policy Samples
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={RFPImage}
                    alt=""
                    placeholder="RFPImage"
                    layout="raw"
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      objectFit: "contain",
                      fontFamily: "Poppins",
                      fontWeight: "300",
                      fontSize: "17px",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "1.33",
                      textAlign: "center",
                      color: "#5d5d5d",
                      marginTop: "10px",
                    }}
                  >
                    RFP Toolkits
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "start",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={Costmage}
                    alt=""
                    placeholder="Costmage"
                    layout="raw"
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      objectFit: "contain",
                      fontFamily: "Poppins",
                      fontWeight: "300",
                      fontSize: "17px",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "1.33",
                      textAlign: "center",
                      color: "#5d5d5d",
                      marginTop: "10px",
                    }}
                  >
                    Cost Calculators
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={ITStrategyImage}
                    alt=""
                    placeholder="ITStrategyImage"
                    layout="raw"
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      objectFit: "contain",
                      fontFamily: "Poppins",
                      fontWeight: "300",
                      fontSize: "17px",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "1.33",
                      textAlign: "center",
                      color: "#5d5d5d",
                      marginTop: "10px",
                    }}
                  >
                    IT Strategy Samples
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "start",
                  flexDirection: "row",
                  marginBottom: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "120px",
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    src={JobImage}
                    alt=""
                    placeholder="JobImage"
                    layout="raw"
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "auto",
                      margin: "auto",
                    }}
                  />
                  <p
                    style={{
                      objectFit: "contain",
                      fontFamily: "Poppins",
                      fontWeight: "300",
                      fontSize: "17px",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: "1.33",
                      textAlign: "center",
                      color: "#5d5d5d",
                      marginTop: "10px",
                    }}
                  >
                    Job Descriptions
                  </p>
                </div>
              </div>
            </div>
            {/* 2 grid  */}
            <div
              style={{
                backgroundColor: "#045377",
                height: "auto",
                padding: "100px 0px",
              }}
            >
              {/* <img className="d-block m-auto pt-5" src={trustedIcon} alt="" /> */}
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
                <span style={{ fontWeight: "bold" }}>ITMAP</span> <br />
                Your <span style={{ fontWeight: "bold" }}>trusted</span> IT{" "}
                <br />
                insights <span style={{ fontWeight: "bold" }}>partner​</span>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  loader={myImageLoader}
                  src={line}
                  alt=""
                  placeholder="line"
                  layout="raw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div
                style={{
                  backgroundColor: "#fdffef",
                  borderRadius: "5px",
                  border: "solid 0.5px #2b7c9f",
                  height: "400px",
                }}
                className="d-block text-center mt-5 ml-5 mr-5"
              >
                <Image
                  loader={myImageLoader}
                  src={recycleIcon}
                  alt=""
                  placeholder="recycleIcon"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    width: "35px",
                    height: "35px",
                    margin: "30px 0 20px 0",
                  }}
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
                <Image
                  loader={myImageLoader}
                  src={sycnIcon}
                  alt=""
                  placeholder="sycnIcon"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    width: "35px",
                    height: "35px",
                    margin: "35px 0 20px 0",
                  }}
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
                <Image
                  loader={myImageLoader}
                  src={adminMenLogo}
                  alt=""
                  placeholder="adminMenLogo"
                  layout="raw"
                  style={{
                    objectFit: "contain",
                    width: "50px",
                    height: "50px",
                    margin: "30px 0 20px 0",
                  }}
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
                  industry practitioners and consultants and are reviewed
                  annually for factual accuracy.
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
                <div>
                  <Image
                    loader={myImageLoader}
                    src={fileLogo}
                    alt=""
                    layout="raw"
                    placeholder="wellCuratedIcon"
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "auto",
                      margin: "30px 0 20px 0",
                    }}
                  />
                </div>
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
              </div>
            </div>
            {/* footer */}
            <div style={{ margin: "30px" }}>
              <div>
                <Image
                  loader={myImageLoader}
                  src={ITMAPLogo}
                  alt=""
                  layout="raw"
                  placeholder="ITMAPLogo"
                  style={{ padding: "20px", height: "auto", width: "auto" }}
                />
                <p
                  style={{
                    fontSize: "17px",
                    textAlign: "left",
                    color: "#707070",
                    padding: "0px 20px 20px 20px",
                  }}
                >
                  TECH24 is industry's first automated product recommendation
                  engine that helps enterprises choose the right
                  product/services best suited to their needs.
                </p>
              </div>
              <div style={{}}>
                <p
                  style={{
                    color: "#2b7c9f",
                    fontWeight: "bold",
                    padding: "5px 20px",
                    fontSize: "18px",
                  }}
                >
                  Address
                </p>
                <p
                  style={{
                    fontSize: "17px",
                    textAlign: "left",
                    color: "#707070",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                  <p>
                    <p
                      style={{
                        color: "#2b7c9f",
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                    >
                      ITMAP DMCC
                    </p>
                    <br />
                    Unit No: 3O-01-BA1437
                    <br />
                    Plot No: DMCC-PH2-J&GPlexS
                    <br />
                    DMCC
                    <br />
                    Dubai
                    <br />
                    United Arab Emirates
                  </p>
                </p>
              </div>

              {/* contact */}

              <div>
                <p
                  style={{
                    color: "#2b7c9f",
                    fontWeight: "bold",
                    padding: "0px 20px",
                    fontSize: "18px",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontSize: "17px",
                    textAlign: "left",
                    color: "#707070",
                    padding: "0px 20px 10px 20px",
                  }}
                >
                  For sales inquiries write to
                  <br />
                  <a href="mailto:sales@itmap.com">sales@itmap.com</a>
                  <br />
                  <br />
                  For support inquiries write to
                  <br />
                  <a href="mailto:support@itmap.com">support@itmap.com</a>
                  <br />
                  <br />
                  For others write to
                  <br />
                  <a href="mailto:inquiry@itmap.com">inquiry@itmap.com</a>
                  {/* NY Office : +1 234 567 8909
                  <br/>
                  <br />
                  Florida Office : +1 234 567 8909 */}
                </p>
              </div>

              {/* socialmedia */}

              <div>
                <p
                  style={{
                    color: "#2b7c9f",
                    fontWeight: "bold",
                    padding: "0px 20px",
                    fontSize: "18px",
                  }}
                >
                  Socials
                </p>
                <div
                  style={{
                    paddingLeft: "20px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  {/* <a href="https://www.linkedin.com/company/itmap-research-advisory-services/" target="_blank">
                  <img  src={LinkedinIcon.src} alt="" />
                  </a> */}
                  <a
                    // style={{ marginLeft: "20px" }}
                    href="https://twitter.com/ITMAP_research"
                    target="_blank"
                    aria-label="redirect to twitter page"
                  >
                    <Image
                      loader={myImageLoader}
                      src={TwitterIcon}
                      alt=""
                      layout="raw"
                      placeholder="TwitterIcon"
                      style={{ objectFit: "contain" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
  };
}

export default withRouter(connect(mapState, null)(SectionBySMMobile));
