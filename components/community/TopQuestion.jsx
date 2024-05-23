import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import Link from "next/link";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuestionCard from "./QuestionCard";
import { userActions } from "../../_actions";
import { withRouter } from "next/router";

const TrendingQuestion = ({ trendingQuestions }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const slider = useRef(null);

  useEffect(() => {
    if (!isInitialized) {
      setTimeout(() => {
        setIsInitialized(true);
        if (slider.current) {
          slider.current.slickGoTo(activeSlide);
        }
      }, 100);
    }
  }, [isInitialized, activeSlide]);

  const handleAfterChange = (currentSlide) => {
    setActiveSlide(currentSlide);
  };

  return (
    <Container>
      <div className="top-question">
        <div className="title-section">
          <p className="title">
            Top <span className="title bg">Questions</span>
          </p>
          <Link href="community">
            <p className="view-more">View more</p>
          </Link>
        </div>
      </div>
      <div className="trending-category-below">
        <div className="category-box">
          <div className="category-banner-wrapper" id="categoryWrapper">
            <div
              onClick={() => slider.current?.slickPrev()}
              className="view-more-arrow previous-arrow"
              style={{
                left: "-20px",
                marginTop: "0",
                top: "33%",
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
              className="view-more-arrow next-arrow"
              style={{
                right: "-18px",
                marginTop: "0",
                top: "33%",
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
                  breakpoint: 1440,
                  settings: {
                    slidesToShow: 2,
                    dots: false,
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    dots: true,
                  },
                  initialSlide: 0,
                },
              ]}
              appendDots={(dots) => (
                <div>
                  <ul>
                    {dots.map((dot, index) => {
                      const classNames = ["slick-dot"];

                      if (index === activeSlide) {
                        classNames.push("slick-active");
                      }

                      return React.cloneElement(dot, {
                        className: classNames.join(" "),
                        onClick: () => slider.current.slickGoTo(index),
                      });
                    })}
                  </ul>
                </div>
              )}
              afterChange={handleAfterChange}
              initialSlide={0}
            >
              {trendingQuestions?.slice(0, 5).map((data, index) => (
                <QuestionCard data={data} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user, loggedIn } = authentication;
  return { user, confirm, isloggedIn: loggedIn };
};

const actionCreators = {
  toggleLoginPopup: userActions.toggleLoginPopup,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(TrendingQuestion)
);
