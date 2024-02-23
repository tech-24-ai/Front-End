import React, { useEffect, useState } from "react";
import {
  Collapse,
  Button,
  Container,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Tabs, Image } from "antd";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import Link from "next/link";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import moment from "moment/moment";
import ReactPaginate from "react-paginate-next";
import { Select, Space, Avatar, List, Card, Row } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { CompanyIcon, MessageIcon } from "../../components/icons";

const History = ({ booking_history, getAllCrud }) => {
  const [activeTab, setActiveTab] = useState("past");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageChange = (selected) => {
    setPage(selected);
  };
  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    getAllCrud("booking_history", "booking_history", {
      bookingType: activeTab,
      consultant_id:
        window.location.pathname == "/Profile" ? undefined : consultantsID,
      page: page + 1,
      pageSize: 10,
    });
    console.log("consultantsID-history", consultantsID);
  }, [activeTab, page]);

  // pagination
  useEffect(() => {
    if (
      booking_history &&
      booking_history.data &&
      booking_history.data.length
    ) {
      setPageCount(Math.ceil(booking_history.total / booking_history.perPage));
    }
    console.log("booking_history", booking_history);
  }, [booking_history, activeTab]);

  const [expandedPanel, setExpandedPanel] = useState("");
  const handleChange = (panel) => (event) => {
    setExpandedPanel(expandedPanel === panel ? "" : panel);
  };

  // const onTabChange = (data) => {
  //   const currentCategory = booking_history.filter(
  //     (e) => e.bookingType == data
  //   )[0];
  //   console.log("currentCategory",currentCategory);
  // };

  const detailsRouter = (id) => {
    sessionStorage.setItem("booking_historyID", id);
    Router.push("/consultant/details");
  };

  const { TabPane } = Tabs;
  return (
    <>
      <div
        style={{
          minWidth: isBrowser ? "600px" : "unset",
          maxWidth: "700px",
          paddingLeft: isBrowser ? "130px" : "unset",
          paddingBottom: isBrowser ? "50px" : "unset",
        }}
      >
        {booking_history && (
          <div className="booking-history-case" style={{ marginTop: "60px" }}>
            {/* <BrowserView> */}
            <div>
              <Tabs
                activeKey={activeTab}
                onChange={(e) => {
                  setActiveTab(e);
                  setPage(0);
                  setPage(0);
                }}
              >
                <Tabs.TabPane tab={"Past Booking"} key={"past"}>
                  <div className="history-detail-card">
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
                      {booking_history?.data?.length > 0 ? (
                        booking_history.data.map((booking, key) => (
                          <a
                            key={key}
                            onClick={() => detailsRouter(booking.id)}
                            style={{ width: "100%" }}
                            className="card"
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                              }}
                            >
                              <div className="consultant-description">
                                <div className="profile-img">
                                  <Image
                                    style={{ borderRadius: "50%" }}
                                    width={80}
                                    height={80}
                                    preview={false}
                                    src={
                                      booking.consultant.image == null
                                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                        : booking.consultant.image
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <Space
                                  direction="vertical"
                                  className="con-his-count-sec"
                                >
                                  <h5>{booking.consultant.first_name}</h5>
                                  <p>
                                    <span className="environ-icon">
                                      <EnvironmentOutlined />
                                    </span>
                                    <span
                                      className="con-his-count-icon"
                                      style={{ marginLeft: "5px" }}
                                    >
                                      {booking.consultant.country.name}
                                    </span>
                                  </p>
                                </Space>
                              </div>

                              <div className="pay-detail">
                                <p>Booking Status</p>
                                <p>{booking.booking_status}</p>
                              </div>
                            </div>
                            <div className="consultant-rate-detail">
                              <div style={{ width: "100%" }}>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    marginTop: "14px",
                                  }}
                                >
                                  <div style={{ width: "46%" }}>
                                    <span className="consultant-lable">
                                      Payment Amount
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>
                                        $ {booking.transaction.total_amount}
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ width: "45%" }}>
                                    <span className="consultant-lable">
                                      Booking Durations
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>{booking.duration}min</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div style={{ width: "100%" }}>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    // marginTop: "14px"
                                  }}
                                >
                                  <div style={{ width: "46%" }}>
                                    <span
                                      className="consultant-lable"
                                      style={{ lineHeight: "0px" }}
                                    >
                                      Booking Date & Time
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>
                                        <span>{`${moment(
                                          new Date(booking.booking_date)
                                        )
                                          .startOf("day")
                                          .format("MM-DD-YYYY")}`}</span>{" "}
                                        <span>{`${moment(
                                          booking.booking_time,
                                          "HH:mm"
                                        ).format("hh:mm A")}`}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ width: "45%" }}>
                                    <span
                                      className="consultant-lable"
                                      style={{ lineHeight: "0px" }}
                                    >
                                      Booked Category & Skills
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>{booking.skill}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))
                      ) : (
                        <p className="data-unavailable">Data not found!</p>
                      )}
                    </div>
                  </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab={"Upcoming Booking"} key={"upcoming"}>
                  <div className="history-detail-card">
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
                      {booking_history?.data?.length > 0 ? (
                        booking_history.data.map((booking, key) => (
                          <a
                            key={key}
                            onClick={() => detailsRouter(booking.id)}
                            style={{ width: "100%" }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                              }}
                            >
                              <div className="consultant-description">
                                <div
                                  className="profile-img"
                                  style={{
                                    marginLeft: isBrowser && "unset",
                                  }}
                                >
                                  <Image
                                    style={{
                                      borderRadius: "50%",
                                    }}
                                    width={80}
                                    height={80}
                                    preview={false}
                                    src={
                                      booking.consultant.image == null
                                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                        : booking.consultant.image
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <Space direction="vertical">
                                  <h5>{booking.consultant.first_name}</h5>
                                  <p
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <span className="environ-icon">
                                      <EnvironmentOutlined />
                                    </span>
                                    {booking.consultant.country.name}
                                  </p>
                                </Space>
                              </div>

                              <div className="pay-detail">
                                <p>Booking Status</p>
                                <p>{booking.booking_status}</p>
                              </div>
                            </div>
                            <div className="consultant-rate-detail">
                              <div style={{ width: "100%" }}>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div style={{ width: "46%" }}>
                                    <span className="consultant-lable">
                                      Payment Amount
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>
                                        $ {booking.transaction.total_amount}
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ width: "45%" }}>
                                    <span className="consultant-lable">
                                      Booking Durations
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>{booking.duration}min</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div style={{ width: "100%" }}>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div style={{ width: "46%" }}>
                                    <span className="consultant-lable">
                                      Booking Date & Time
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>
                                        <span>{`${moment(
                                          new Date(booking.booking_date)
                                        )
                                          .startOf("day")
                                          .format("MM-DD-YYYY")}`}</span>{" "}
                                        <span>{`${moment(
                                          booking.booking_time,
                                          "HH:mm"
                                        ).format("hh:mm A")}`}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div style={{ width: "45%" }}>
                                    <span
                                      className="consultant-lable"
                                      style={{ lineHeight: "0px" }}
                                    >
                                      Booked Category & Skills
                                    </span>
                                    <div
                                      className="consultant-value2"
                                      style={{
                                        width: "100%",
                                        // border: "1px solid #f5f5f5"
                                      }}
                                    >
                                      <p>{booking.skill}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))
                      ) : (
                        <p className="data-unavailable">Data not found!</p>
                      )}
                    </div>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
            {/* </BrowserView> */}

            {booking_history?.data?.length > 1 && (
              <div
                style={{ marginTop: "40px" }}
                className="pagination d-flex justify-content-between align-items-center"
              >
                <div></div>
                <div className="issuesPagination">
                  <div style={{ marginRight: isBrowser ? "1.5rem" : "0px" }}>
                    <ReactPaginate
                      pageCount={pageCount}
                      initialPage={page}
                      forcePage={page}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={({ selected }) => setPage(selected)}
                      nextLabel="Next"
                      previousLabel="Previous"
                      breakLabel={pageCount > 4 ? "..." : null}
                      // breakLabel="..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { booking_history } = state;
  return {
    booking_history,
  };
};

// export default consultantCard;
const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(History));
