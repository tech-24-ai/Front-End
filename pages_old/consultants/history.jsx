import React, { useEffect, useState } from "react";
import {
  Collapse,
  Button,
  Container,
  Row,
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

const consultantBookingHistory = ({ booking_history, getAllCrud }) => {
  const [activeTab, setActiveTab] = useState("past");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    getAllCrud("booking_history", "booking_history", {
      bookingType: activeTab,
      consultant_id:
        window.location.pathname == "/profile" ? undefined : consultantsID,
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
    sessionStorage.setItem("booking_historysID", id);
    Router.push("/consultants/booking-details");
  };

  console.log("booking_history", booking_history);

  return (
    <>
      {booking_history && (
        <div style={{ margin: "20px" }}>
          {/* <div className="site-title">
        <div style={{ display: "inline-block" }}>
          <h5>Booking History</h5>
        </div>
      </div> */}
          <BrowserView>
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
                  <div style={{ width: "100%", marginTop: "3.25rem" }}>
                    <div className="purchasePanelArea">
                      <div className="payment-list-page pb-5">
                        <div className="payment-list">
                          <div className="payment-table table-responsive">
                            <div className="PaymentTableData">
                              <div className="row headRow">
                                <div className="col">Booking Date & Time</div>
                                <div className="col">Name</div>
                                <div className="col">Payment Amount</div>
                                <div className="col">Booking Durations</div>
                                <div className="col">
                                  Booked Category & Skills
                                </div>
                                <div className="col">Booking Status</div>
                              </div>
                              {booking_history?.data?.length > 0 ? (
                                booking_history.data.map((booking, key) => (
                                  <a
                                    key={key}
                                    onClick={() => detailsRouter(booking.id)}
                                  >
                                    <div
                                      className="row dataRow"
                                      style={{ backgroundColor: "#F4F6F6" }}
                                    >
                                      <div className="col">
                                        <span>{`${moment(
                                          new Date(booking.booking_date)
                                        )
                                          .startOf("day")
                                          .format("MM-DD-YYYY")}`}</span>
                                        <br />
                                        <span>{`${moment(
                                          booking.booking_time,
                                          "HH:mm"
                                        ).format("hh:mm A")}`}</span>
                                      </div>
                                      <div className="col">
                                        <Image
                                          width={40}
                                          height={40}
                                          alt="icon"
                                          preview={false}
                                          style={{ borderRadius: "50px" }}
                                          src={
                                            booking.consultant.image == null
                                              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                              : booking.consultant.image
                                          }
                                        />
                                        <br />
                                        {`${booking.consultant.first_name} ${
                                          booking.consultant.last_name == null
                                            ? ""
                                            : booking.consultant.last_name
                                        }`}
                                      </div>
                                      <div className="col">
                                        $ {booking.transaction.total_amount}
                                      </div>
                                      <div className="col">
                                        {booking.duration} min
                                      </div>
                                      <div className="col">{booking.skill}</div>
                                      <div className="col">
                                        {booking.booking_status}
                                      </div>
                                    </div>
                                  </a>
                                ))
                              ) : (
                                <p className="result-not-found">
                                  Result not found!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.TabPane>

                <Tabs.TabPane tab={"Upcoming Booking"} key={"upcoming"}>
                  <div style={{ width: "100%", marginTop: "3.25rem" }}>
                    <div className="purchasePanelArea">
                      <div className="payment-list-page pb-5">
                        <div className="payment-list">
                          <div className="payment-table table-responsive">
                            <div className="PaymentTableData">
                              <div className="row headRow">
                                <div className="col">Booking Date & Time</div>
                                <div className="col">Name</div>

                                <div className="col">Payment Amount</div>
                                <div className="col">Booking Durations</div>
                                <div className="col">
                                  Booked Category & Skills
                                </div>
                                <div className="col">Booking Status</div>
                              </div>
                              {booking_history?.data?.length > 0 ? (
                                booking_history.data.map((booking, key) => (
                                  <div
                                    key={key}
                                    onClick={() => detailsRouter(booking.id)}
                                  >
                                    <a
                                      style={{
                                        cursor: "pointer",
                                        backgroundColor: "#F4F6F6",
                                      }}
                                      className="row dataRow"
                                    >
                                      <div className="col">
                                        <span>{`${moment(
                                          new Date(booking.booking_date)
                                        )
                                          .startOf("day")
                                          .format("MM-DD-YYYY")}`}</span>
                                        <br />
                                        <span>{`${moment(
                                          booking.booking_time,
                                          "HH:mm"
                                        ).format("hh:mm A")}`}</span>
                                      </div>
                                      <div className="col">
                                        <Image
                                          width={40}
                                          height={40}
                                          alt="icon"
                                          preview={false}
                                          style={{ borderRadius: "50px" }}
                                          src={
                                            booking.consultant.image == null
                                              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                              : booking.consultant.image
                                          }
                                        />
                                        <br />
                                        {`${booking.consultant.first_name} ${
                                          booking.consultant.last_name == null
                                            ? ""
                                            : booking.consultant.last_name
                                        }`}
                                      </div>
                                      <div className="col">
                                        $ {booking.transaction.total_amount}
                                      </div>
                                      <div className="col">
                                        {booking.duration} min
                                      </div>
                                      <div className="col">{booking.skill}</div>
                                      <div className="col">
                                        {booking.booking_status}
                                      </div>
                                    </a>
                                  </div>
                                ))
                              ) : (
                                <p className="result-not-found">
                                  Result not found!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </BrowserView>

          {/* mobile design */}
          <MobileView>
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
                  <Container style={{ padding: "0 5px" }}>
                    {booking_history?.data?.length > 0 ? (
                      booking_history.data.map((booking, key) => (
                        <Row
                          key={key}
                          className="d-flex flex-column py-1 TableViewMobile"
                          onClick={() => detailsRouter(booking.id)}
                        >
                          <Col className="cardBody-mobile">
                            <div className="d-flex">
                              <div className="px-2 flex-grow-1 w-50">
                                <h6>
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="icon"
                                    preview={false}
                                    style={{ borderRadius: "50px" }}
                                    src={
                                      booking.consultant.image == null
                                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                        : booking.consultant.image
                                    }
                                  />
                                  <br />
                                  {`${booking.consultant.first_name} ${
                                    booking.consultant.last_name == null
                                      ? ""
                                      : booking.consultant.last_name
                                  }`}
                                </h6>
                              </div>
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booking Status</Label>
                                <h6>{booking.booking_status}</h6>
                              </div>
                            </div>
                          </Col>

                          <Col className="cardBody-mobile">
                            <div className="d-flex">
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booking Date & Time</Label>
                                <h6>
                                  <span>{`${moment(
                                    new Date(booking.booking_date)
                                  )
                                    .startOf("day")
                                    .format("MM-DD-YYYY")}`}</span>
                                  <br />
                                  <span>{`${moment(
                                    booking.booking_time,
                                    "HH:mm"
                                  ).format("hh:mm A")}`}</span>
                                </h6>
                              </div>
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booking Durations</Label>
                                <h6>{booking.duration} min</h6>
                              </div>
                            </div>
                          </Col>

                          <Col className="cardBody-mobile">
                            <div className="d-flex">
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booked Category & Skills</Label>
                                <h6>{booking.skill}</h6>
                              </div>
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Payment Amount</Label>
                                <h6>$ {booking.transaction.total_amount}</h6>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <p className="result-not-found">Result not found!</p>
                    )}
                  </Container>
                </Tabs.TabPane>

                <Tabs.TabPane tab={"Upcoming Booking"} key={"upcoming"}>
                  <Container style={{ padding: "0 5px" }}>
                    {booking_history?.data?.length > 0 ? (
                      booking_history.data.map((booking, key) => (
                        <Row
                          key={key}
                          className="d-flex flex-column py-1 TableViewMobile"
                          onClick={() => detailsRouter(booking.id)}
                        >
                          <Col className="cardBody-mobile">
                            <div className="d-flex">
                              <div className="px-2 flex-grow-1 w-50">
                                <h6>
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="icon"
                                    preview={false}
                                    style={{ borderRadius: "50px" }}
                                    src={
                                      booking.consultant.image == null
                                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                        : booking.consultant.image
                                    }
                                  />
                                  <br />
                                  {`${booking.consultant.first_name} ${
                                    booking.consultant.last_name == null
                                      ? ""
                                      : booking.consultant.last_name
                                  }`}
                                </h6>
                              </div>
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booking Status</Label>
                                <h6>{booking.booking_status}</h6>
                              </div>
                            </div>
                          </Col>

                          <Col className="cardBody-mobile">
                            <div className="d-flex">
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booking Date & Time</Label>
                                <h6>
                                  <span>{`${moment(
                                    new Date(booking.booking_date)
                                  )
                                    .startOf("day")
                                    .format("MM-DD-YYYY")}`}</span>
                                  <br />
                                  <span>{`${moment(
                                    booking.booking_time,
                                    "HH:mm"
                                  ).format("hh:mm A")}`}</span>
                                </h6>
                              </div>
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booking Durations</Label>
                                <h6>{booking.duration} min</h6>
                              </div>
                            </div>
                          </Col>

                          <Col className="cardBody-mobile">
                            <div className="d-flex">
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Booked Category & Skills</Label>
                                <h6>{booking.skill}</h6>
                              </div>
                              <div className="px-2 flex-grow-1 w-50">
                                <Label>Payment Amount</Label>
                                <h6>$ {booking.transaction.total_amount}</h6>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <p className="result-not-found">Result not found!</p>
                    )}
                  </Container>
                </Tabs.TabPane>
              </Tabs>
            </div>
          </MobileView>

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
                  />
                </div>
              </div>
            </div>
          )}

          <BodyBackgroundColor color={isBrowser ? "#fff" : "#F4F6F6"} />
        </div>
      )}
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

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantBookingHistory)
);
