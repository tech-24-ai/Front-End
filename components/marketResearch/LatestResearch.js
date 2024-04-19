import React, { useState } from "react";
import { Container } from "reactstrap";
import { Image } from "antd";
import Link from "next/link";
import moment from "moment";
import { ArrowRightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LatestResearch = () => {
  const [showHoverClass, setShowHoverClass] = useState(null);
  const data = [
    {
      id: 1,
      tilte:
        "Long-Term Trends in the Public Perception of Artificial Intelligence",
      description:
        "Analyses of text corpora over time can reveal trends in beliefs, interest, and sentiment about a to...",
      date: "Mar 07, 2024",
      read: "10 min read",
      image: "/images/home/research/research-1.png",
    },
    {
      id: 2,
      tilte:
        "Long-Term Trends in the Public Perception of Artificial Intelligence",
      description:
        "Analyses of text corpora over time can reveal trends in beliefs, interest, and sentiment about a to...",
      date: "Mar 07, 2024",
      read: "18 min read",
      image: "/images/home/research/research-2.png",
    },
    {
      id: 3,
      tilte:
        "Long-Term Trends in the Public Perception of Artificial Intelligence",
      description:
        "Analyses of text corpora over time can reveal trends in beliefs, interest, and sentiment about a to...",
      date: "Mar 07, 2024",
      read: "22 min read",
      image: "/images/home/research/research-3.png",
    },
  ];

  return (
    <Container>
      <div className="latest-research">
        <div className="title-section">
          <p className="title">
            Latest <span className="title bg">Research</span>
          </p>
          <Link href="researchs">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="research-section">
          <Slider
            speed={500}
            slidesToScroll={1}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  dots: true,
                  arrows: false
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  dots: true,
                  arrows: false
                },
              },
            ]}
            appendDots={(dots) => (
              <div>
                <ul> {dots} </ul>
              </div>
            )}
          >
            {data.map((data, index) => (
              <div
                onMouseOver={() => setShowHoverClass(index)}
                onMouseOut={() => setShowHoverClass(null)}
                className={`research-list ${
                  showHoverClass === index ? "showHoverClass" : ""
                }`}
              >
                <div
                  className="research-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    border: "2px solid #D9DFE9",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <Image
                      // width={350}
                      // height={210}
                      src={data.image}
                      preview={false}
                      alt=""
                      placeholder="research banner"
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <p className="research-heading">{data.tilte}</p>
                    <p className="research-detail">{data.description}</p>
                    <div className="date-section">
                      <div className="date">{data.date}</div>
                      <div className="custom-divider"></div>
                      {/* {<div className="time">10 min read</div>} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <Link href="researchs">
            <div className="view-more-icon d-none">
              <ArrowRightOutlined />
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default LatestResearch;
