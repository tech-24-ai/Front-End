import React from "react";
import PageBanner from "../components/card/pageBanner";
import ResearchCard from "../components/card/researchCard";
import marketBannerImage from "../public/new_images/market-banner-img.svg";
import researchIcon from "../public/new_images/research-icon.svg";
import templateIcon from "../public/new_images/template-icon.svg";
import toolIcon from "../public/new_images/tools-calculator-icon.svg";
import { Container, Col, Row } from "reactstrap";
import {
  MarketTrends,
  InDepthProduct,
  Operational,
  Technology,
  Policy,
  Calculator,
  Description,
  Strategy,
  ToolKits,
  Chat,
  Clock,
  Cursor,
  User,
} from "../components/icons";
import TemplateCard from "../components/card/templateCard";
import { Space } from "antd";
import { isBrowser } from "react-device-detect";
import Link from "next/link";

function marketResearch() {
  const templateList = [
    {
      title: (
        <span>
          IT Policy
          <br /> Sample
        </span>
      ),
      icon: <Policy style={{ with: 46, height: 60 }} />,
    },
    {
      title: (
        <span>
          Cost
          <br /> Calculator
        </span>
      ),
      icon: <Calculator style={{ with: 60, height: 60 }} />,
    },
    {
      title: (
        <span>
          {" "}
          Job
          <br /> Description
        </span>
      ),
      icon: <Description style={{ with: 48, height: 60 }} />,
    },
    {
      title: (
        <span>
          {" "}
          IT Strategy
          <br /> Samples
        </span>
      ),
      icon: <Strategy style={{ with: 60, height: 60 }} />,
    },
    {
      title: (
        <span>
          RFP <br />
          ToolKits
        </span>
      ),
      icon: <ToolKits style={{ with: 45, height: 60 }} />,
    },
  ];

  return (
    <section className="market-research-portal-section">
      <PageBanner
        titleNode={
          <div>
            <h4>Market Research</h4>
            <p className="sub-title">
              Gain insights on technology, simplify IT planning and operations.
              <br />
              Try it now. It's free!
            </p>
            <a href="/donations" className="custom-btn bg-white">
              Donate to Keep Research Free!
            </a>
          </div>
        }
        image={marketBannerImage}
      />
      <Container className="market-research-body-container">
        <h4 className="title">Explore our Research Repository</h4>

        <Space size={20} className="research-content">
          <ResearchCard
            arrowIcon={true}
            image={researchIcon}
            imageWidth={isBrowser ? 58 : 45}
            imageHeight={isBrowser ? 106 : 62}
            title="Research"
            pathname="/d/research"
            text="In-depth Product Comparisons, Top Use Cases, Market Trends, Technology Overviews, Cheatsheets and more"
          />
          <ResearchCard
            image={templateIcon}
            imageWidth={isBrowser ? 59 : 40}
            imageHeight={isBrowser ? 106 : 62}
            arrowIcon={true}
            title="Templates"
            pathname="/d/template"
            text="IT Policy Templates, RFP Templates, Project Templates and more"
          />
          <ResearchCard
            image={toolIcon}
            arrowIcon={true}
            imageWidth={isBrowser ? 76 : 50}
            imageHeight={isBrowser ? 106 : 62}
            title="Tools & Calculators"
            pathname="/d/tools_calculators"
            text="Calculators for Sizing and Cost Estimation, Tools & More"
          />
        </Space>
        {/* <div className="market-trend-section">
          <h4 className="title">
            Use our research to gain insights on technology, simplify IT
            planning and operations
          </h4>
          <div className="market-trend-content">
            <div className="market-trend-card-container">
              <div className="card">
                <p>
                  Market
                  <br /> Trends
                </p>
                <MarketTrends />
              </div>
              <div className="card">
                <p>
                  Operational
                  <br /> Best Practices
                </p>
                <Operational />
              </div>
            </div>
            <div className="market-trend-card-container">
              <div className="card">
                <p>
                  In Depth
                  <br /> Product Evaluations
                </p>
                <InDepthProduct />
              </div>
              <div className="card">
                <p>
                  Technology
                  <br /> Heat Maps
                </p>
                <Technology />
              </div>
            </div>
          </div> 
        </div>*/}

        {/* <div className="template-toolkit-section">
          <h4 className="title">
            Use our templates and toolkits to simply IT operations and ensure
            compliance
          </h4>

          <div className="template-card-container">
            {templateList.map((data) => (
              <TemplateCard {...data} />
            ))}
          </div>
        </div>

        <div className="itmap-new-way-section">
          <h4 className="title">ITMap New Way to Buy</h4>
          <p className="sub-title">
            We provide a wide of selection of buy types for you and your
            business!
          </p>
          <div className="content">
            <Row>
              <Col md={6}>
                <div className="custom-icon light">
                  <Clock />
                </div>
                <p>Eliminate Time consuming web searches</p>
              </Col>
              <Col md={6}>
                <div className="custom-icon light">
                  <User />
                </div>
                <p>Stop hiring expensive consultants or advisory services</p>
              </Col>
              <Col md={6}>
                <div className="custom-icon light">
                  <Cursor />
                </div>
                <p>Reject generic advice</p>
              </Col>

              <Col md={6}>
                <div className="custom-icon light">
                  <Chat />
                </div>
                <p>Remove confirmation bias</p>
              </Col>
            </Row>
          </div>
        </div> */}
      </Container>
    </section>
  );
}

export default marketResearch;
