import React from "react";
import { Container, Col, Row } from "reactstrap";
import LatestResearchCard from "./LatestResearchCard";

const LatestResearch = () => {
  return (
    <section className="latest-research-section">
      <Container>
        <p className="section-title">Latest Research</p>
        <div className="research-card-wrapper">
          {[1, 2, 3].map((data) => (
            <LatestResearchCard {...data} />
          ))}
        </div>
        <button className="custom-btn with-bg">View More</button>
      </Container>
    </section>
  );
};

export default LatestResearch;
