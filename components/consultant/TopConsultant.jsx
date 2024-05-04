import React, { useEffect, useRef } from "react";
import { Container } from "reactstrap";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { Image } from "antd";
import Router, { withRouter } from "next/router";
import Slider from "react-slick";
const TopConsultant = ({ getAllCrud, consultants, authentication }) => {
  const { loggedIn } = authentication;
  const slider = useRef();
  useEffect(() => {
    getAllCrud("consultants", "consultants", {
      pageSize: 3,
      orderBy: "top_consultants",
      orderPos: "desc",
      is_company: false,
    });
  }, []);

  if (!Array.isArray(consultants)) {
    return false;
  }

  const goToProfilePage = (id) => {
    if (loggedIn) {
      sessionStorage.setItem("consultantID", id);
      Router.push("/consultant/profile");
    }
  };

  return (
    <Container>
      <div className="top-consultant">
        <div className="title-section">
          <p className="title">
            Top <span className="title bg">Consultants</span>
          </p>
          <Link href="consultant">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="consultant-section">
          <div
            onClick={() => slider.current?.slickPrev()}
            className="view-more-arrow previous-arrow"
            style={{
              left: "-5px",
              marginTop: "0px",
              top:'48%'
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
              right: "-10px",
              marginTop: "0",
              top:"48%"
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
            {consultants?.slice(0, 3).map((data) => (
              <div className="consultant-list">
                <div
                  className="consultant-card hover"
                  onClick={() => {
                    goToProfilePage(data.id);
                  }}
                >
                  <Image
                    preview={false}
                    src={
                      data.image ??
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="consultant profile"
                    placeholder="consultant profile"
                  />
                </div>
              </div>
            ))}
          </Slider>
          {/* <Link href="consultant">
            <div className="view-more-icon">
              <ArrowRightOutlined />
            </div>
          </Link> */}
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { consultants, authentication } = state;
  return {
    consultants,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(TopConsultant)
);
