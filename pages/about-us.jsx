import React from "react";
import PageBanner from "../components/card/pageBanner";
import aboutUsBannerImage from "../public/new_images/about-us-bg.svg";
import missionImage from "../public/new_images/mission.svg";
import recommendations from "../public/new_images/recommendations.svg";
import { Button, Container } from "reactstrap";
import Image from "next/image";
import myImageLoader from "../components/imageLoader";
import {
  UnbiasedIcon,
  ComprehensiveIcon,
  AffordableIcon,
  RequirementsIcon,
  BudgetIcon,
  EnterpriseIcon,
  YourLocationIcon,
  YourIndustryIcon,
  SettingsIcon,
  ITBuyerIcon,
} from "../components/icons";
import { isBrowser, isMobile } from "react-device-detect";
import themeConfig from "../config/themeConfig";

function aboutUs() {
  return (
    <section className="about-us-section">
      <PageBanner
        titleNode={
          <div>
            <h4>About us</h4>
          </div>
        }
        image={aboutUsBannerImage}
      />
      <Container className="about-us-body-container">
        <div className="content-container">
          <div>
            {/* <p className="heading">our story</p>
            <p className="paragraph">
              Vero homero perfecto mei ut, sonet aperiam an nec. Ni nec dict
              altera legimu. Me vita de lege ndos expet end ista aliu mi ando,
              haeo tibi que com titure viset cut.Proin tempus elit a laoreet
              volut pat. homero perfecto mei ut, sonet aperiam an nec. Ni nec
              dict altera legimu. Me vita de lege ndos expet end is ad. Ex mei
              omita aliu mi ando
            </p>
            <Button className="download-btn">download company profile</Button> */}

            <div>
              <p className="inner-heading">Who we are</p>
              <p className="paragraph">
                {themeConfig.appName} is industry's first community-led Market
                Research and Consulting company.
              </p>
            </div>
            <div>
              <p className="inner-heading">Our Mission</p>
              <p className="paragraph">
                {themeConfig.appName} is on a mission to make IT Market Research
                affordable for everyone. Our goal is to simplify and accelerate
                technology-decision making for IT buyers and sellers.
              </p>
            </div>
          </div>
          <div>
            {/* <Image
              loader={myImageLoader}
              src={missionImage}
              alt=""
              layout="raw"
              width={572.4}
              height={396}
              style={{ objectFit: "contain" }}
            /> */}
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7018145159905226753?compact=1"
              height="399"
              width="710"
              frameborder="0"
              allowfullscreen=""
              title="Embedded post"
            ></iframe>
          </div>
        </div>
        {/* <div className="content-container">
          <div>
            <p className="inner-heading">Who we are</p>
            <p className="paragraph">
              {themeConfig.appName} is industry's first automated product recommendation engine
              that helps enterprises choose the right product/services best
              suited to their needs.
            </p>
          </div>
          <div>
            <p className="inner-heading">Our Mission</p>
            <p className="paragraph">
              {themeConfig.appName} is on a mission to make IT Market Research affordable for
              everyone. Our goal is to simplify and accelerate
              technology-decision making for IT buyers and sellers.
            </p>
          </div>
        </div> */}
      </Container>
      <Container className="our-values-container">
        <div className="our-values-inner-container">
          <div>
            <div className="boxes">
              <UnbiasedIcon />
              <div>
                <p className="box-heading">Unbiased</p>
                <p className="paragraph">
                  {themeConfig.appName} strives to provide a neutral view of the
                  market by automating the technology decision-making process
                  through its proprietary algorithms.
                </p>
              </div>
            </div>
            <div className="boxes comprehensive">
              <ComprehensiveIcon />
              <div>
                <p className="box-heading">Comprehensive</p>
                <p className="paragraph">
                  We continuously monitor and track new product announcements
                  and new vendors in all major markets. We currently track over
                  9000 vendors and 20,000 products and services on our platform.
                </p>
              </div>
            </div>
            <div className="boxes">
              <AffordableIcon />
              <div>
                <p className="box-heading">Affordable</p>
                <p className="paragraph">
                  We offer our recommendation platform free of cost. Our market
                  research is affordable, and the pricing model is designed to
                  cater to a broad range of IT decision makers
                </p>
              </div>
            </div>
          </div>
          <div className="right-our-values">
            <div className="our-values">Our values</div>
            {/* <p className="white-paragraph">
              An enim nullam tempor sapien gravida donec enim ipsum porta justo
              integer at odio velna vitae auctor integer congue magna at pretium
            </p> */}
          </div>
        </div>
      </Container>
      <Container className="recommendation-section">
        {/* <p className="heading">
          The {themeConfig.appName} Recommendation <br /> Platform
        </p>
        <div className="box-container">
          <div className="recommendation-boxes">
            <p className="box-heading">Your Technical Requirements</p>
            <RequirementsIcon />
          </div>
          <div className="recommendation-boxes">
            <p className="box-heading">
              Your <br /> Budget
            </p>
            <BudgetIcon />
          </div>
          <div className="recommendation-boxes">
            <p className="box-heading">
              Size of your <br /> Enterprise
            </p>
            <EnterpriseIcon />
          </div>
          <div className="recommendation-boxes">
            <p className="box-heading">
              Your <br /> Location
            </p>
            <YourLocationIcon />
          </div>
          <div className="recommendation-boxes">
            <p className="box-heading">
              Your <br /> Industry
            </p>
            <YourIndustryIcon />
          </div>
          {isMobile && (
            <div className="recommendation-boxes">
              <p className="box-heading">
                {themeConfig.appName} Recommendation <br /> Engine Algorithm
              </p>
              <SettingsIcon />
            </div>
          )}
        </div>
        <div className="engine-algorithm-container">
          {isBrowser && (
            <div className="algorithm-div">
              <p className="box-heading">
                {themeConfig.appName} Recommendation <br /> Engine Algorithm
              </p>
              <SettingsIcon />
            </div>
          )}
          <div className="recommendations-div">
            <p className="box-heading" style={{ color: "white" }}>
              Vendor-neutral <br /> Recommendations
            </p>
            <Image
              loader={myImageLoader}
              src={recommendations}
              alt=""
              layout="raw"
              width={60}
              height={60}
              className="box-img"
            />
          </div>
        </div> */}

        {/* IT buyer section */}
        {/* <p
          className="heading"
          style={{ marginTop: "100px", marginLeft: "50px" }}
        >
          We simplify technology <br />
          decision making for the IT buyer
        </p>
        <div className="IT-buyer-section">
          <div>
            <ITBuyerIcon />
            <p className="box-heading custom-styling">
              Procurement and Sourcing Leaders
            </p>
            <ul>
              <li className="paragraph">
                Our recommendation engine helps shortlists vendors quickly
              </li>
              <li className="paragraph">
                Our RFP templates simplifies procurement process
              </li>
            </ul>
          </div>
          <div>
            <ITBuyerIcon />
            <p className="box-heading custom-styling">IT Leaders</p>
            <ul>
              <li className="paragraph">
                Our IT policy templates simplify policy formulation and roll
                out.
              </li>
              <li className="paragraph">
                Our Research provides actionable insights on technology and
                trends.
              </li>
            </ul>
          </div>
          <div>
            <ITBuyerIcon />
            <p className="box-heading custom-styling">IT Architects</p>
            <ul>
              <li className="paragraph">
                Our In-depth product comparisons help select the right product
                and design the right solutions
              </li>
              <li className="paragraph">
                Our Research on operations best practices helps keep the lights
                on.
              </li>
            </ul>
          </div>
        </div> */}
      </Container>
      <div className="simplify-technology-container">
        <Container>
          <div>
            <div className="heading">
              We simplify <br /> technology <br /> decision making <br /> for
              the IT buyer
            </div>
          </div>
          <div>
            <div className="boxes">
              <ITBuyerIcon />
              <div>
                <p className="box-heading">Procurement and Sourcing Leaders</p>
                <p className="paragraph">
                  <ul>
                    <li className="paragraph">
                      Our recommendation engine helps shortlists vendors quickly
                    </li>
                    <li className="paragraph">
                      Our RFP templates simplifies procurement process
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="boxes comprehensive">
              <ITBuyerIcon />
              <div>
                <p className="box-heading">IT Leaders</p>
                <p className="paragraph">
                  <ul>
                    <li className="paragraph">
                      Our IT policy templates simplify policy formulation and
                      roll out.
                    </li>
                    <li className="paragraph">
                      Our Research provides actionable insights on technology
                      and trends.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="boxes">
              <ITBuyerIcon />
              <div>
                <p className="box-heading">IT Architects</p>
                <p className="paragraph">
                  <ul>
                    <li className="paragraph">
                      Our In-depth product comparisons help select the right
                      product and design the right solutions
                    </li>
                    <li className="paragraph">
                      Our Research on operations best practices helps keep the
                      lights on.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="help-technology-container">
        <Container className="container">
          <div>
            <div className="heading">
              {/* We simplify <br /> technology <br /> decision making <br /> for
              the IT buyer */}
              We help technology <br /> providers create competitive <br />{" "}
              differentiation
            </div>
          </div>
          <div>
            <div className="boxes">
              <UnbiasedIcon />
              <div>
                <p className="box-heading">Competitive Intelligence Teams</p>
                <p className="paragraph">
                  <ul>
                    <li>
                      Our In-depth product comparisons helps CI teams track
                      product and features announcements from competition and
                      create battle cards.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="boxes comprehensive">
              <ComprehensiveIcon />
              <div>
                <p className="box-heading">Product Management Leaders</p>
                <p className="paragraph">
                  <ul>
                    <li>
                      Our In-depth product comparisons help PMs prioritize
                      features and create comprehensive product roadmaps.
                    </li>
                    <li>
                      Our Research provides actionable insights on technology
                      and trends.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="boxes">
              <AffordableIcon />
              <div>
                <p className="box-heading">Office of the CTO</p>
                <p className="paragraph">
                  <ul>
                    <li>
                      Our Research provides actionable insights on technology
                      and trends that help making the right investments.
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default aboutUs;
