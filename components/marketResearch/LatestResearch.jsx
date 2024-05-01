import React, { useState, Fragment, useRef } from "react";
import { Container } from "reactstrap";
import { Image } from "antd";
import Link from "next/link";
import moment from "moment";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResearchCard from "./ResearchCard";

const LatestResearch = ({
  titleBorder = false,
  title = 'Latest <span class="title bg">Research</span>',
  data,
  viewMore = true
}) => {
  console.log("data", data);

  const parsedTitle = () => {
    return { __html: title };
  };

  const slider = useRef(null);

  return (
    <Container>
      <div className="latest-research">
        <div className="title-section">
          <p className="title">
            {titleBorder && <span className="side-border-title"></span>}
            <span className="title" dangerouslySetInnerHTML={parsedTitle()} />
          </p>
          {viewMore == true && <Link href="/market-research/research-list">
            <p className="view-more">View more</p>
          </Link>
          }
        </div>

        <div className="research-section">
          <div
            onClick={() => slider.current?.slickPrev()}
            className="view-more-icon"
            style={{
              left: "75px",
              zIndex: "99",
              marginTop: "15%",
              position: "absolute",
              width: "36px",
              height: "36px",
            }}
          >
            <ArrowLeftOutlined
              style={{
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div
            onClick={() => slider.current?.slickNext()}
            className="view-more-icon"
            style={{
              right: "75px",
              zIndex: "99",
              marginTop: "15%",
              position: "absolute",
              width: "36px",
              height: "36px",
            }}
          >
            <ArrowRightOutlined
              style={{
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <Slider
            ref={slider}
            speed={500}
            slidesToScroll={1}
            slidesToShow={3}
            arrows={false}
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 2,
                  dots: true,
                },
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                  dots: true,
                },
              },
            ]}
            appendDots={(dots) => (
              <div>
                <ul> {dots} </ul>
              </div>
            )}
          >
            {data?.map((item, index) => (
              <ResearchCard data={item} key={index} redirectUrl={`/market-research/${item.seo_url_slug}`} />
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};

export default LatestResearch;
