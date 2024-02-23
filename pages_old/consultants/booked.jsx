import React, { useEffect, useState } from "react";
import { Col, Container, Label, Row } from "reactstrap";
import { Tabs, Image, Rate } from "antd";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";

const bookedConsultants = ({ booked_consultants, getAllCrud }) => {
  useEffect(() => {
    getAllCrud("booked_consultants", "booked_consultants");
  }, []);

  const onClickID = (data) => {
    sessionStorage.setItem("consultantID", data.id);
    // console.log("booked-consultant-id", data.id);
    Router.push("/consultants/history");
  };

  console.log("booked_consultants", booked_consultants);

  return (
    <div className="booked-container">
      <div style={{ margin: "20px" }}>
        {/* <div className="site-title">
          <div style={{ display: "inline-block" }}>
            <h5>Booked Consultant</h5>
          </div>
        </div> */}
        <BrowserView>
          <div>
            <Tabs>
              <Tabs.TabPane tab={"Booked Consultant"} key={"1"}>
                <div style={{ width: "100%", marginTop: "3.25rem" }}>
                  <div className="purchasePanelArea">
                    <BrowserView>
                      <div className="payment-list-page pb-5">
                        <div className="payment-list" id="userPurchaseList">
                          <div className="payment-table table-responsive">
                            <div className="PaymentTableData">
                              <div className="row headRow">
                                <div className="col">Name</div>
                                <div className="col">Skills</div>
                                <div className="col">Profile Summary</div>
                                <div className="col">Number of Booking</div>
                                <div className="col">Avg Rating </div>
                              </div>
                              {booked_consultants &&
                              booked_consultants.length > 0 ? (
                                booked_consultants.map((data, key) => (
                                  <a key={key} onClick={() => onClickID(data)}>
                                    <div
                                      className="row dataRow"
                                      style={{ backgroundColor: "#F4F6F6" }}
                                    >
                                      <div className="col">
                                        <Image
                                          width={40}
                                          height={40}
                                          alt="icon"
                                          preview={false}
                                          src={data.image}
                                          style={{ borderRadius: "50px" }}
                                        />
                                        <br />
                                        {`${data.first_name} ${
                                          data.last_name == null
                                            ? ""
                                            : data.last_name
                                        }`}
                                      </div>
                                      <div className="col show-more-skill">
                                        {data.skills.map((item) => (
                                          <p>{item.skill}</p>
                                        ))}
                                      </div>
                                      <div className="col show-more">
                                        {data.profile_summary}
                                      </div>
                                      <div className="col">
                                        {data.__meta__.total_booking}
                                      </div>
                                      <div className="col">
                                        <Rate
                                          allowHalf
                                          disabled={true}
                                          defaultValue={data.avg_rating}
                                        />
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
                    </BrowserView>
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </BrowserView>

        <MobileView>
          <Container style={{ padding: "0 5px" }}>
            {booked_consultants ? (
              booked_consultants.map((data, key) => (
                <Row
                  onClick={() => onClickID(data)}
                  key={key}
                  className="d-flex flex-column py-1 TableViewMobile"
                >
                  <Col className="cardHead-mobile">
                    <div className="d-flex">
                      <div className="px-2 flex-grow-1 ">
                        <h6>
                          <Image
                            width={40}
                            height={40}
                            alt="icon"
                            preview={false}
                            src={data.image}
                            style={{ borderRadius: "50px" }}
                          />
                          <br />
                          {`${data.first_name} ${
                            data.last_name == null ? "" : data.last_name
                          }`}
                        </h6>
                      </div>
                      <div className="px-2 flex-grow-1 ">
                        <Label>Avg. Rating</Label>
                        <h6>{data.avg_rating}</h6>
                      </div>
                      <div className="px-2 flex-grow-1 ">
                        <Label>Number of Booking</Label>
                        <h6>{data.__meta__.total_booking}</h6>
                      </div>
                    </div>
                  </Col>
                  <Col className="cardHead-mobile">
                    <div className="d-flex">
                      <div className="px-2 flex-grow-1 ">
                        <Label>Profile Summary</Label>
                        <h6>{data.profile_summary}</h6>
                      </div>
                    </div>
                  </Col>
                  <Col className="cardHead-mobile">
                    <div className="d-flex">
                      <div className="px-2 flex-grow-1 ">
                        <Label>Skill</Label>
                      </div>
                    </div>
                    <h6 className="scroll-container w-100">
                      {data.skills.map((item) => (
                        <p className="scroll-child">{item.skill}</p>
                      ))}
                    </h6>
                  </Col>
                </Row>
              ))
            ) : (
              <p className="result-not-found">Result not found!</p>
            )}
          </Container>
        </MobileView>
      </div>
      <BodyBackgroundColor color={isBrowser ? "#fff" : "#F4F6F6"} />
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
