import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container } from "reactstrap";
import { crudActions } from "../_actions";
import recycleIcon from "../public/images/header/Group 689@3x.png";
import gearIcon from "../public/images/about/gears.png";
import dollarIcon from "../public/images/about/dollar-icon.png";
import listIcon from "../public/images/about/to-do-list.png";

import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import yellowGirlPic from "../public/images/about/Picture6.svg";
import yellowDressMen from "../public/images/about/Picture4.svg";
import yellowProfileIcon from "../public/images/about/Picture5.svg";

import intelligenceIcon from "../public/images/about/Picture2.svg";
import girlManagementIcon from "../public/images/about/Picture1.svg";
import officeChairIcon from "../public/images/about/Picture3.svg";

import UnbiasedIcon from "../public/images/about/Picture16.svg";
import ComprehensiveIcon from "../public/images/about/Picture17.svg";
import AffordableIcon from "../public/images/about/Picture11.svg";
import Requirements from "../public/images/about/Picture10.svg";
import Enterprise from "../public/images/about/Picture12.svg";
import Location from "../public/images/about/Picture13.svg";
import Industry from "../public/images/about/Picture14.svg";
import Algorithm from "../public/images/about/Picture9.svg";
import Recommendations from "../public/images/about/Picture15.svg";

import smallArrow from "../public/images/about/smallArrow.png";
import rightArrowIcon from "../public/images/about/bigArrow.png";

import mobile_logo from "../public/images/about/mobile_logo.png";
import mobile_view from "../public/images/about/mobile_view.png";
import mobile_down_arrow from "../public/images/about/mobile_down_arrow.png";
import beforeLine from "../public/images/header/Rectangle 124.png";
import Head from "next/head";

class Index extends Component {
  componentDidMount() {
    // const { asPath } = this.props.router;
    // let slug = asPath.slice(1).split("/")[1];
    // this.props.getCrud("page", `page/${slug}`);
  }

  render() {
    return (
      <section className="about-us-section">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
          />
          <meta name="title" content="Who is TECH24" />
          <meta
            name="description"
            content="Learn how TECH24 provides instant product recommendations and market insights."
          />
          <meta name="keywords" content="About TECH24, Top 10 vendors" />
        </Head>
        <div>
          <h5 className="headerTitle">About Us</h5>
          <div className="who-we-are">
            <h4>Who are we?</h4>
            <img
              style={{
                marginTop: "-20px",
              }}
              height={7}
              width={80}
              src={beforeLine.src}
              alt=""
            />
            <p>
              TECH24 is industry's first automated product recommendation engine
              that helps enterprises choose the right product/services best
              suited to their needs.
            </p>
          </div>
          <div className="divider"></div>
          <div className="our-mission">
            <h4>Our Mission</h4>
            <img
              style={{
                marginTop: "-20px",
              }}
              height={7}
              width={80}
              src={beforeLine.src}
              alt=""
            />
            <p>
              TECH24 is on a mission to make IT Market Research affordable for
              everyone. Our goal is to simplify and accelerate
              technology-decision making for IT buyers and sellers.
            </p>
          </div>
          <div className="divider"></div>
          <div className="our-values">
            <h4>Our Values</h4>
            <div className="bottom-border"></div>
            <div
              className="our-values-card-container"
              style={{
                width: "50%",
              }}
            >
              <div className="unbiased">
                <div className="heading-section">
                  <div className="">
                    <img
                      // style={{ margin: "30px 0 10px 0" }}
                      src={UnbiasedIcon.src}
                      width={25}
                      alt=""
                    />
                  </div>
                  <div className="head-text">Unbiased</div>
                </div>
                <div className="content-section">
                  <p>
                    TECH24 strives to provide a neutral view of the market by
                    automating the technology decision-making process through
                    its proprietary algorithms.
                  </p>
                </div>
              </div>
              {/* <div className="divider"></div> */}
              <div className="comprehensive">
                <div className="heading-section">
                  <div className="">
                    <img
                      // style={{ margin: "50px 0 10px 0" }}
                      src={ComprehensiveIcon.src}
                      width={25}
                      alt=""
                    />
                  </div>
                  <div className="head-text">Comprehensive</div>
                </div>
                <div className="content-section">
                  <p>
                    We continuously monitor and track new product announcements
                    and new vendors in all major markets. We currently track
                    over 9000 vendors and 20,000 products and services on our
                    platform.
                  </p>
                </div>
              </div>
              {/* <div className="divider-two"></div> */}
              <div className="affordable">
                <div className="heading-section">
                  <div className="affordableImg">
                    <img
                      // style={{ margin: "50px 0 10px 0", marginLeft: "-10px" }}
                      src={AffordableIcon.src}
                      width={16}
                      alt=""
                    />
                  </div>
                  <div className="head-text">Affordable</div>
                </div>
                <div className="content-section">
                  <p>
                    We offer our recommendation platform free of cost. Our
                    market research is affordable, and the pricing model is
                    designed to cater to a broad range of IT decision makers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="plateform">
            <h4>
              The TECH24 Recommendation platform
              <br />
              <img
                height={7}
                width={80}
                style={{ textAlign: "center" }}
                src={beforeLine.src}
                alt=""
              />
            </h4>
            <div>
              <div className="part1">
                <div className="Requirements">
                  <div className="text">Your Technical Requirements</div>
                  <div className="logo">
                    <img src={Requirements.src} width={30} alt="" />
                  </div>
                  <div className="arrow">
                    <img
                      src={rightArrowIcon.src}
                      width={150}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                <div className="Budget">
                  <div className="text">Your Budget</div>
                  <div className="logo">
                    <img src={AffordableIcon.src} width={20} alt="" />
                  </div>
                  <div className="arrow">
                    <img
                      src={rightArrowIcon.src}
                      width={150}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                <div className="Enterprise">
                  <div className="text">Size of your Enterprise</div>
                  <div className="logo">
                    <img src={Enterprise.src} width={35} alt="" />
                  </div>
                  <div className="arrow">
                    <img
                      src={rightArrowIcon.src}
                      width={150}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                <div className="Location">
                  <div className="text">Your Location</div>
                  <div className="logo">
                    <img src={Location.src} width={35} alt="" />
                  </div>
                  <div className="arrow">
                    <img
                      src={rightArrowIcon.src}
                      width={150}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
                <div className="Industry">
                  <div className="text">Your Industry</div>
                  <div className="logo">
                    <img src={Industry.src} width={30} alt="" />
                  </div>
                  <div className="arrow">
                    <img
                      src={rightArrowIcon.src}
                      width={150}
                      height={20}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="part2">
                <div>
                  <img
                    style={{ marginBottom: "10px" }}
                    src={Algorithm.src}
                    width={100}
                    alt=""
                  />
                  <p
                    style={{
                      fontWeight: "500",
                      color: "rgb(93, 93, 93)",
                    }}
                  >
                    TECH24 Recommendation Engine Algorithm
                  </p>
                </div>
              </div>
              <div className="part3">
                <div className="arrow">
                  <img src={smallArrow.src} width={100} height={20} alt="" />
                </div>
                <div className="content">
                  <img
                    className="vendorLogo"
                    src={Recommendations.src}
                    alt=""
                  />
                  <p>Vendor-neutral Recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* start for mobile view */}

          {/* <div className="mobile_container">
            <div className="mobile_text_container">
              <div className="text">
                Your Technical{" "}
                <span style={{ marginLeft: "-10px" }}>Requirements</span>
              </div>
              <div className="text">Your Budget</div>
              <div className="text">Size of your Enterprise</div>
              <div className="text">Your Location</div>
              <div className="text">Your Industry</div>
            </div>
            <div className="mobile_image">
              <img
                style={{
                  height: "140px",
                }}
                src={mobile_logo.src}
                alt=""
              />
            </div>
            <div className="mobile_part2">
              <div>
                <img
                  style={{ marginTop: "10px" }}
                  src={Algorithm.src}
                  width={80}
                  alt=""
                />
                <p className="textTwo">ITMAP Recommendation Engine Algorithm</p>
              </div>
            </div>
            <div style={{ marginTop: "5px" }}>
              <div className="content">
                <img
                  className="mobile_down_img"
                  src={mobile_down_arrow.src}
                  alt=""
                />
                <p className="textTwo">Vendor-neutral Recommendations</p>
              </div>
            </div>
          </div> */}

          {/* end for mobile view */}

          {/* <div className="divider"></div> */}
          <div className="ProcurementAndSourcingLeaders">
            <div
              style={{
                marginLeft: "10%",
              }}
            >
              <div className="it-buyerContainer">
                <div className="flexContainer">
                  <img
                    className="image"
                    src={yellowDressMen.src}
                    width={30}
                    alt=""
                  />
                  <h5 className="h5Heading">
                    Procurement and Sourcing Leaders
                  </h5>
                </div>
                <div className="it-buyer-cards">
                  <ul
                  // className="ulStyling"
                  >
                    <li className="liStyling">
                      Our recommendation engine helps shortlists vendors quickly
                    </li>
                    <li className="liStyling">
                      Our RFP templates simplifies procurement process
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="it-buyerContainer"
                // containerTwo"
              >
                <div className="flexContainer">
                  <img
                    className="image"
                    src={yellowProfileIcon.src}
                    width={30}
                    alt=""
                  />
                  <h5 className="h5Heading">IT Leaders</h5>
                </div>
                <div className="it-buyer-cards">
                  <ul
                  // className="ulStyling"
                  >
                    <li className="liStyling">
                      Our IT policy templates simplify policy formulation and
                      roll out.
                    </li>
                    <li className="liStyling">
                      Our Research provides actionable insights on technology
                      and trends.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="it-buyerContainer"
                // containerThree"
              >
                <div className="flexContainer">
                  <img
                    className="image"
                    src={yellowGirlPic.src}
                    width={30}
                    alt=""
                  />
                  <h5 className="h5Heading">IT Architects</h5>
                </div>
                <div className="it-buyer-cards">
                  <ul
                  // className="ulStyling"
                  >
                    <li className="liStyling">
                      Our In-depth product comparisons help select the right
                      product and design the right solutions
                    </li>
                    <li className="liStyling">
                      Our Research on operations best practices helps keep the
                      lights on.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h4 className="heading IT-buyer-heading">
              We simplify technology decision making for the IT buyer
              <div className="bottom-border simplifyBorder"></div>
            </h4>
          </div>
          <div className="WeHelpTechnologyProviders">
            <h4
              className="heading IT-buyer-headingTwo"
              // style={{ marginLeft: "10%" }}
            >
              We help technology providers create competitive differentiation
            </h4>
            <div className="bottom-border weBorder"></div>
            <div className="whiteBoxConatiner">
              <div
                className="it-buyerContainerTwo"
                // yellowDivOne"
              >
                <div className="flexContainerTwo">
                  <img
                    className="imageTwo"
                    src={intelligenceIcon.src}
                    width={30}
                    alt=""
                  />
                  <h5 className="h5HeadingTwo">
                    Competitive Intelligence Teams​
                  </h5>
                </div>
                <div className="it-buyer-cards">
                  <ul className="ulStylingTwo">
                    <li className="liStyling">
                      Our In-depth product comparisons helps CI teams track
                      product and features announcements from competition and
                      create battle cards.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="it-buyerContainerTwo"
                // yellowDivTwo"
              >
                <div className="flexContainerTwo">
                  <img
                    className="imageTwo"
                    src={girlManagementIcon.src}
                    width={30}
                    alt=""
                  />
                  <h5 className="h5HeadingTwo">Product Management Leaders</h5>
                </div>
                <div className="it-buyer-cards">
                  <ul className="ulStylingTwo">
                    <li className="liStyling">
                      Our In-depth product comparisons help PMs prioritize
                      features and create comprehensive product roadmaps.
                    </li>
                    <li className="liStyling">
                      Our Research provides actionable insights on technology
                      and trends.
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="it-buyerContainerTwo mobilePadding"
                // yellowDivThree"
              >
                <div className="flexContainerTwo">
                  <img
                    className="imageTwo"
                    src={officeChairIcon.src}
                    width={30}
                    alt=""
                  />
                  <h5 className="h5HeadingTwo">Office of the CTO</h5>
                </div>
                <div className="it-buyer-cards">
                  <ul className="ulStylingTwo">
                    <li className="liStyling">
                      Our Research provides actionable insights on technology
                      and trends that help making the right investments.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="divider"></div> */}
          <hr className="page-end-line" />
        </div>
        <BodyBackgroundColor color="#D4D4D4" />
      </section>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { pages } = state;
//   return {
//     pages,
//   };
// };

// const actionCreators = {
//   getCrud: crudActions._getAll,
// };

export default withRouter(Index);
