import React from "react";
import { Select, Space, Avatar, List, Card, Row, Col } from "antd";
import Image from "next/image";
import { EnvironmentOutlined } from "@ant-design/icons";
import Swiper from "../swiper/index";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { CompanyIcon, MessageIcon } from "../icons";

const ConsultantCard = ({ consultants, authentication }) => {
  const { loggedIn } = authentication;

  const findMinRate = (rateArray) => {
    if (!rateArray.length) {
      return 0;
    }
    const rateList = rateArray.map((rate) => rate.amount_per_hour);
    const minRate = Math.min(...rateList);
    return minRate;
  };

  const goToProfilePage = (id) => {
    if (loggedIn) {
      sessionStorage.setItem("consultantID", id);
      Router.push("/consultant/profile");
    }
  };

  const goToMessagePage = (data) => {
    // console.log("data", data);
    if (loggedIn && data.chat_history && data.chat_history.length) {
      const {
        chat_history,
        first_name,
        last_name,
        country,
        profile_summary,
        image,
        rates,
        id,
      } = data;
      const lastChatHistory = chat_history[chat_history.length - 1];
      const profile = {
        fullName: `${first_name} ${last_name ? last_name : ""}`,
        consultant_id: id,
        country: country.name,
        summary: profile_summary,
        image: image,
        minRate: findMinRate(rates),
      };
      const messageDetail = {
        chat_history: lastChatHistory,
        consultant: profile,
      };
      localStorage.setItem("messageDetail", JSON.stringify(messageDetail));
      Router.push({
        pathname: "consultant/message",
      });
      // console.log("messageDetail", messageDetail);
    }
  };

  const handleMessageClick = (data) => {
    if (loggedIn && data.chat_history && data.chat_history.length) {
      const {
        chat_history,
        first_name,
        last_name,
        country,
        profile_summary,
        image,
        rates,
        id,
      } = data;
      const lastChatHistory = chat_history[chat_history.length - 1];
      const profile = {
        fullName: `${first_name} ${last_name ? last_name : ""}`,
        consultant_id: id,
        country: country.name,
        summary: profile_summary,
        image: image,
        minRate: findMinRate(rates),
      };
      const messageDetail = {
        chat_history: lastChatHistory,
        consultant: profile,
      };
      localStorage.setItem("messageDetail", JSON.stringify(messageDetail));
      Router.push({
        pathname: "consultant/message",
      });
    }
  };

  return (
    <Row
      gutter={[16, 16]}
      className="consultant-list-container"
      id="consultant-list-container"
    >
      {consultants &&
        consultants.data.length > 0 &&
        consultants.data.map((data) => (
          <Col
            key={data.id}
            sm={24}
            xs={24}
            md={12}
            xl={8}
            lg={8}
            xxl={8}
            className="consultant-list-item"
          >
            <Card className="card" hoverable>
              <div className="self-description-section">
                <div className="description">
                  <div
                    className="logo"
                    style={{ cursor: "pointer" }}
                    onTouchStart={() => goToProfilePage(data.id)}
                    onClick={() => goToProfilePage(data.id)}
                  >
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={100}
                      height={100}
                      preview="false"
                      src={
                        data.image
                          ? data.image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                      }
                      alt="profile"
                    />
                  </div>
                  <Space direction="vertical" className="detail">
                    <h5
                      className="title"
                      style={{ cursor: "pointer", maxWidth: "9rem" }}
                      onTouchStart={() => goToProfilePage(data.id)}
                      onClick={() => goToProfilePage(data.id)}
                    >
                      {data.first_name} {data.last_name}
                    </h5>
                    <p className="address">
                      <span className="icon">
                        <EnvironmentOutlined />
                      </span>
                      {data?.country?.name}
                    </p>
                  </Space>
                </div>
                <div className="rate-detail">
                  <p>Starts at</p>
                  {data.is_company ? (
                    <p>
                      <span>$5000</span>/Project
                    </p>
                  ) : (
                    <p>
                      <span>${findMinRate(data.rates)}</span>/Hour
                    </p>
                  )}
                </div>
              </div>

              {data.rates && data.rates.length > 0 && (
                <div
                  className="skill-section"
                  style={{
                    marginBottom: data.is_company && loggedIn ? "5rem" : "",
                  }}
                >
                  <p className="sub-title">Skills</p>
                  <Swiper
                    spaceBetween={5}
                    nodes={data.rates.map((rate) => (
                      <div className="custom-btn btn-gray">{rate.skill}</div>
                    ))}
                  />
                </div>
              )}
              {data &&
                !data.is_company &&
                data.works &&
                data.works.length > 0 && (
                  <div
                    className="experience-section"
                    style={{ marginBottom: loggedIn ? "5rem" : "" }}
                  >
                    <p className="sub-title">Experience</p>
                    <Swiper
                      spaceBetween={5}
                      nodes={
                        data &&
                        data.works.map((work) => (
                          <div className="experience">
                            {work.company_logo ? (
                              <div className="company-logo">
                                <Image
                                  width={60}
                                  height={60}
                                  preview="false"
                                  src={work.company_logo}
                                  alt="logo"
                                  // style={{ marginLeft: "10px", borderRadius: "50%" }}
                                />
                              </div>
                            ) : (
                              <div className="custom-icon small">
                                <CompanyIcon />
                              </div>
                            )}
                            <div className="detail">
                              <div className="title">{work.company_name}</div>
                              <div className="designation">
                                {work.designation}
                              </div>
                              <div className="date">
                                {work.from_year} -
                                {work.is_present ? "Present" : work.to_year}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    />
                  </div>
                )}

              {data.rates &&
                data.rates.length === 0 &&
                data.works &&
                data.works.length === 0 && (
                  <div style={{ minHeight: "10rem" }}></div>
                )}
              {loggedIn && (
                <div className="button-section">
                  <div
                    className="custom-btn outline"
                    onTouchStart={() => goToProfilePage(data.id)}
                    onClick={() => goToProfilePage(data.id)}
                  >
                    <CompanyIcon style={{ color: "#000" }} />
                    View profile
                  </div>
                  <div
                    className="custom-btn fill"
                    onTouchStart={() => handleMessageClick(data)}
                    onClick={() => goToMessagePage(data)}
                    disabled={
                      data.chat_history && data.chat_history.length
                        ? false
                        : true
                    }
                  >
                    <MessageIcon style={{ color: "#fff" }} /> Message
                  </div>
                </div>
              )}
            </Card>
          </Col>
        ))}
    </Row>
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
  connect(mapStateToProps, actionCreators)(ConsultantCard)
);
