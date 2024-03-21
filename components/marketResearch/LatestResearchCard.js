import React from "react";
import { DocumentIcon } from "../icons";

const LatestResearchCard = ({ title, date, description }) => {
  return (
    <div className="latest-research-card">
      <div className="research-title-section-wrapper">
        <DocumentIcon height={60} width={46} />
        <div className="research-title-wrapper">
          <p className="title">Research Title</p>
          <p className="date">19-03-2024</p>
        </div>
      </div>
      <p className="research-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere
        arcu urna, non gravida erat tincidunt vitae.
      </p>
    </div>
  );
};

export default LatestResearchCard;
