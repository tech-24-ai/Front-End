import React, { useState, Fragment } from "react";
import { Container } from "reactstrap";
import { Image } from "antd";
import Link from "next/link";
import moment from "moment";
import { ArrowRightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResearchCard from "./ResearchCard";

const LatestResearch = ({
  titleBorder = false,
  title = 'Latest <span class="title bg">Research</span>',
  data,
}) => {
  const dataDummay = [
    {
      id: 1,
      tilte:
        "Long-Term Trends in the Public Perception of Artificial Intelligence",
      description:
        "Analyses of text corpora over time can reveal trends in beliefs, interest, and sentiment about a to...",
      date: "Mar 07, 2024",
      read: "10 min read",
      image: "/images/home/research/research-1.png",
      category: "Clound Computing",
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
      category: "Data Storage",
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
      category: "Chatbot",
    },
  ];

  const parsedTitle = () => {
    return { __html: title };
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <Container>
      <div className="latest-research">
        <div className="title-section">
          <p className="title">
            {titleBorder && <span className="side-border-title"></span>}
            <span className="title" dangerouslySetInnerHTML={parsedTitle()} />
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
                  arrows: false,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  dots: true,
                  arrows: false,
                },
              },
            ]}
            appendDots={(dots) => (
              <div>
                <ul> {dots} </ul>
              </div>
            )}
          >
            {data?.map((data, index) => (
              <ResearchCard data={data} key={index} />
            ))}
          </Slider>
          {/* <Link href="researchs">
            <div className="view-more-icon d-none">
              <ArrowRightOutlined />
            </div>
          </Link> */}
        </div>
      </div>
    </Container>
  );
};

export default LatestResearch;
