import React, { useEffect, useState } from "react";
import { Col, Container, Label, Row } from "reactstrap";
import { Tabs, Image, Rate, Space } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Swiper from "../../components/swiper/index";

const bookedConsultants = ({ booked_consultants, getAllCrud }) => {
  useEffect(() => {
    getAllCrud("booked_consultants", "booked_consultants");
  }, []);

  const onClickID = (data) => {
    sessionStorage.setItem("consultantID", data.id);
    // console.log("booked-consultant-id", data.id);
    Router.push("/consultant/history");
  };

  console.log("booked_consultants", booked_consultants);

  return (
    <div className="booked-consultant-wrapper booking-history-case">
      {booked_consultants && (
        <div style={{ marginTop: "60px" }}>
          <div>
            <Tabs>
              <Tabs.TabPane tab={"Booked Consultant"} key={"1"}>
                <div className="history-detail-card" id="userPurchaseList">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "unset",
                      border: "none",
                      boxShadow: "unset",
                    }}
                    className="card"
                  >
                    {booked_consultants && booked_consultants.length > 0 ? (
                      booked_consultants.map((data, key) => (
                        <a
                          key={key}
                          onClick={() => onClickID(data)}
                          style={{ width: "100%" }}
                          className="card"
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              marginBottom: "-20px",
                            }}
                          >
                            <div className="consultant-description">
                              <div className="profile-img">
                                {isBrowser && (
                                  <Image
                                    style={{ borderRadius: "50%" }}
                                    width={80}
                                    height={80}
                                    preview={false}
                                    src={data.image}
                                    alt="profile"
                                  />
                                )}
                                {isMobile && (
                                  <Image
                                    style={{ borderRadius: "50%" }}
                                    width={60}
                                    height={60}
                                    preview={false}
                                    src={data.image}
                                    alt="profile"
                                  />
                                )}
                              </div>
                              <div className="profile-text-consultant">
                                <Space direction="vertical">
                                  <h5>
                                    {`${data.first_name} ${
                                      data.last_name == null
                                        ? ""
                                        : data.last_name
                                    }`}
                                  </h5>

                                  <p
                                    style={{
                                      display: "flex",
                                      alignItems: "baseline",
                                      margin: "0px",
                                    }}
                                  >
                                    {/* <span style={{ width: "6rem" }}> */}
                                    <EnvironmentOutlined />
                                    {/* Number of Booking */}
                                    {/* </span> */}
                                    {/* <span style={{ margin: "10px" }}>
                                      {data.__meta__.total_booking}
                                    </span> */}
                                    <p
                                      style={{
                                        marginLeft: "5px",
                                        marginBottom: "0rem",
                                      }}
                                    >
                                      {data?.country.name}
                                    </p>
                                  </p>
                                  <Rate
                                    allowHalf
                                    disabled={true}
                                    defaultValue={data.avg_rating}
                                    style={{ fontSize: "16px" }}
                                  />
                                </Space>
                              </div>
                            </div>

                            <div className="pay-detail">
                              <p>Bookings</p>
                              <p
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  margin: "0px",
                                }}
                              >
                                {data.__meta__.total_booking}
                              </p>
                            </div>
                          </div>
                          <div className="consultant-rate-detail">
                            <div style={{ width: "100%" }}>
                              <div className="consultant-detail-block">
                                <div className="consultant-detail-content">
                                  <span className="consultant-lable">
                                    Profile Summary
                                  </span>
                                  <div
                                    className="consultant-value2"
                                    style={{
                                      width: "100%",
                                      // border: "1px solid #f5f5f5",
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <p
                                      style={
                                        {
                                          // marginLeft: "12px"
                                        }
                                      }
                                    >
                                      {data.profile_summary}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div style={{ width: "100%" }}>
                              <div className="consultant-detail-block">
                                <div className="consultant-detail-content">
                                  <span className="consultant-lable">
                                    Skills
                                  </span>
                                  <div
                                    className="consultant-value2"
                                    style={{
                                      width: "100%",
                                      // border: "1px solid #f5f5f5"
                                    }}
                                  >
                                    {data.skills && data.skills.length > 0 && (
                                      <div
                                        className="skill-section"
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        {/* <Swiper
                                                                                        spaceBetween={5}
                                                                                        nodes={data.skills.map((item) => (
                                                                                            <div className="custom-btn btn-gray">{item.skill}</div>
                                                                                        ))}
                                                                                    /> */}
                                        {data.skills.map((item) => (
                                          <p>
                                            {/* {item.name} */}
                                            <span style={{ margin: "0px 4px" }}>
                                              {""}
                                            </span>
                                          </p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <p className="data-unavailable">Result not found!</p>
                    )}
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { booked_consultants } = state;
  return {
    booked_consultants,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(bookedConsultants)
);
