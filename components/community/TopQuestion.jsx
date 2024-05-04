import React, { Fragment, useRef } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Container, Button } from "reactstrap";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";
import Link from "next/link";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QuestionCard from "./QuestionCard";

const TrendingQuestion = ({ trendingQuestions }) => {
  const slider = useRef(null);

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
                top:'33%'
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
                top:'33%'
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
                    dots: false,
                  },
                },
              ]}
              appendDots={(dots) => (
                <div>
                  <ul> {dots} </ul>
                </div>
              )}
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
