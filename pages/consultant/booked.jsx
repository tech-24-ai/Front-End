import React, { useEffect, useState } from "react";
import { Col, Container, Label, Row } from "reactstrap";
import { Tabs, Image, Rate } from "antd";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";

const BookedConsultants = ({ booked_consultants, getAllCrud }) => {
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
    <div className="booked-container" style={{ width: "600px" }}>
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
                                <p className="data-unavailable">
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
      </div>
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
  connect(mapStateToProps, actionCreators)(BookedConsultants)
);
