import React from "react";
import PageBanner from "../components/card/pageBanner";
import ResearchCard from "../components/card/researchCard";
import legalImage from "../public/new_images/legal-bg.svg";
import researchIcon from "../public/new_images/research-icon.svg";
import templateIcon from "../public/new_images/template-icon.svg";
import toolIcon from "../public/new_images/tools-calculator-icon.svg";
import { Container, Col, Row } from "reactstrap";
import Categories from "../components/categories/legal";

function legal() {
  return (
    <section className="legal-page-section">
      <PageBanner
        titleNode={
          <div>
            <h4>Legal</h4>
          </div>
        }
        image={legalImage}
      />
      <Container>
        <div className="legal-body-container">
          <Categories />
        </div>
      </Container>
    </section>
  );
}

export default legal;
