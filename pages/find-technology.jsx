import React from "react";
import { Container } from "reactstrap";
import TreeSelect from "../components/form/treeSelect";
import { OneIcon, TwoIcon, ThreeIcon } from "../components/icons";
import CategoryList from "../components/categories/categoryList";
import { Space } from "antd";
import ResearchCard from "../components/card/researchCard";

import {
  CalculatorIcon,
  ResearchIcon,
  TemplateIcon,
} from "../components/icons";
import { isBrowser, MobileView, BrowserView } from "react-device-detect";

function index() {
  return (
    <section className="research-portal-section" id="research-portal-section">
      <div className="research-portal-banner-bg">
        <Container className="research-portal-banner-container">
          <div className="left-section">
            {isBrowser ? (
              <h4>
                Find The Right Technology
                <br /> For Your Enterprise
              </h4>
            ) : (
              <h4>Find The Right Technology For Your Enterprise</h4>
            )}
            <div className="input-content find-technology-searchbtn">
              <TreeSelect
                className="home-page-search-module"
                placeholder="Enter software, hardware or service category, and we will find the right product for you"
              />
            </div>
          </div>
          <div className="right-section">
            <p>
              Narrow down your search and find the right product -{" "}
              <span>in 3 Easy Steps!</span>
            </p>
            <div className="input-requirement">
              <div className="content">
                <h6 className="title">Input Requirements</h6>
                <p className="text">
                  Input your technical requirements, location, enterprise size
                  and budget on the platform
                </p>
              </div>
              <div className="img">
                <OneIcon />
              </div>
            </div>
            <div className="algorithmic-search">
              <div className="content">
                <h6 className="title">Algorithmic Search</h6>
                <p className="text">
                  Our algorithms will find the list of right products for you -
                  instantly!
                </p>
              </div>
              <div className="img">
                <TwoIcon />
              </div>
            </div>
            <div className="product-selection">
              <div className="content">
                <h6 className="title">Product Selection</h6>
                <p className="text">
                  Finalize product selection through our in-depth product
                  comparison research and pay-per-minute consultants
                </p>
              </div>
              <div className="img">
                <ThreeIcon />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container className="research-portal-category-container">
        <h4 className="main-title">or Browse from a Category below</h4>
        <CategoryList />
      </Container>
{/* 
      <div className="research-repository-section base-bg">
        <Container className="market-research-body-container">
          <h4 className="title">Explore our Research Repository</h4>
          <BrowserView>
            <Space size={20} className="research-content">
              <ResearchCard
                arrowIcon={true}
                icon={<ResearchIcon />}
                imageWidth={78}
                iconBGColor=""
                title="Research"
                pathname="/d/research"
                text="In-depth Product Comparisons, Top Use Cases, Market Trends, Technology Overviews, Cheatsheets and more"
              />
              <ResearchCard
                icon={<TemplateIcon />}
                imageWidth={83.92}
                arrowIcon={true}
                iconBGColor=""
                title="Templates"
                pathname="/d/template"
                text="IT Policy Templates, RFP Templates, Project Templates and more"
              />
              <ResearchCard
                icon={<CalculatorIcon />}
                arrowIcon={true}
                iconBGColor=""
                imageWidth={106}
                title="Tools & Calculators"
                pathname="/d/tools_calculators"
                text="Calculators for Sizing and Cost Estimation, Tools & More"
              />
            </Space>
          </BrowserView>
          <MobileView>
            <Space
              size={18}
              className="research-content mobile"
              direction="horizontal"
            >
              <ResearchCard
                arrowIcon={true}
                icon={<ResearchIcon height={62} width={46} />}
                iconBGColor=""
                title="Research"
                pathname="/d/research"
              />
              <ResearchCard
                icon={<TemplateIcon height={62} width={49} />}
                arrowIcon={true}
                iconBGColor=""
                title="Templates"
                pathname="/d/template"
              />
            </Space>
            <Space className="research-content mobile">
              <ResearchCard
                icon={<CalculatorIcon height={62} width={62} />}
                arrowIcon={true}
                iconBGColor=""
                title="Tools & Calculators"
                pathname="/d/tools_calculators"
              />
            </Space>
          </MobileView>
        </Container>
      </div> */}
    </section>
  );
}

export default index;
