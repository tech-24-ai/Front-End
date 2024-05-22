import React, { useState } from "react";
import { Image } from "antd";
import moment from "moment";
import Router from "next/router";
import Link from "next/link";

const ResearchCard = ({ key, data, redirectUrl = null }) => {
  const [showHoverClass, setShowHoverClass] = useState(null);

  const handleRedirect = () => {
    if (redirectUrl) {
      Router.push(redirectUrl);
    }
  };

  const handleClick = (e) => {
    if (data?.category?.name) {
      e.stopPropagation();
      Router.push("/market-research/category/" + data?.category?.name);
    }
  };

  return (
    <div
      onMouseOver={() => setShowHoverClass(key)}
      onMouseOut={() => setShowHoverClass(null)}
      className={`research-list ${
        showHoverClass === key ? "showHoverClass" : ""
      } ${redirectUrl ? "hover" : ""}`}
      onClick={() => handleRedirect()}
      style={{height: "462px"}}
    >
      <div className="research-card">
        <div className="image-section">
          <Image
            // width={350}
            // height={210}
            src={data.image}
            preview={false}
            alt=""
            placeholder="research banner"
          />
          <div className="research-category" onClick={(e) => handleClick(e)}>{data.category.name}</div>
        </div>
        <div style={{ padding: "20px" }} className="content-sections">
          <p className="research-heading">{data.name}</p>
          <p className="research-detail">{data.details}</p>
          <div className="date-section">
            <div className="date">{moment(data.created_at).format("LL")}</div>
            {/* <div className="custom-divider"></div> */}
            {/* {<div className="time">10 min read</div>} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
