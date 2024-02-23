import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions } from "../../_actions";
import { Container, Row, Col, Label } from "reactstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { Tabs } from "antd";

const UserProfile = (props) => {
  const { authentication, get_subscription } = props;
  const [data, setData] = useState(authentication.user.data.data);
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    props.getAllCrud("get_subscription", "get_subscription");
    props.getAllCrud("subscription_history", "subscription_history");
    // props.getAllCrud("purchase_history", "purchase_history");
  }, []);

  useEffect(() => {
    if (
      get_subscription &&
      get_subscription != undefined &&
      get_subscription != null &&
      get_subscription.length
    ) {
      get_subscription.filter((activeSub) => {
        if (activeSub.is_active === 1) {
          setActiveSubscription(activeSub);
        }
      });
    }
  }, [get_subscription]);

  return (
    <div style={{ margin: "20px" }}>
      <Tabs>
        <Tabs.TabPane tab={"Subscription Detail"} key={"1"}>
          <div style={{ width: "100%", marginTop: "3.25rem" }}>
            <div className="purchasePanelArea">
              <BrowserView>
                <div className="payment-list-page pb-5">
                  <div className="payment-list" id="userPaymentList">
                    <div className="payment-table table-responsive">
                      <div className="PaymentTableData">
                        <div className="row headRow">
                          <div className="col">Start Date</div>
                          <div className="col">End Date</div>
                          <div className="col">Plan</div>
                          <div className="col">Status</div>
                          <div className="col">Transaction Id</div>
                          <div className="col">Invoice / Receipts</div>
                        </div>

                        <div>
                          {activeSubscription ? (
                            <div className="row dataRow">
                              <div className="col">
                                {activeSubscription.subscription_start_date}
                              </div>
                              <div className="col">
                                {activeSubscription.subscription_end_date}
                              </div>
                              <div className="col">
                                {activeSubscription.plans.plan_name}
                              </div>
                              <div className="col VendorNameCol">
                                {activeSubscription.is_active
                                  ? "Active"
                                  : "Inactive"}
                              </div>
                              <div className="col">
                                {activeSubscription.transactions
                                  ? activeSubscription.transactions
                                      .transaction_code
                                  : ""}
                              </div>

                              <div className="col">
                                {activeSubscription.plan_id == 1 &&
                                data.register_from === "Linkedin" ? (
                                  <div></div>
                                ) : (
                                  <div className="d-flex flex-row">
                                    <div
                                      style={{
                                        marginTop: "5px",
                                      }}
                                    >
                                      <img
                                        src="images/document@2x.png"
                                        alt=""
                                        className="invoiceIcon"
                                      />
                                    </div>
                                    <div>
                                      <button
                                        className="btn"
                                        style={{ color: "#009243" }}
                                        onClick={() =>
                                          props.downloadInvoice(
                                            "download-invoice",
                                            activeSubscription.id,
                                            "Subscription_Receipt.pdf"
                                          )
                                        }
                                      >
                                        Download
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
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
              </BrowserView>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
      <div style={{ width: "100%", marginTop: "3.25rem" }}>
        <MobileView>
          <Container style={{ padding: "0 5px" }}>
            {activeSubscription ? (
              <Row className="d-flex flex-column py-1 TableViewMobile">
                <Col className="cardHead-mobile">
                  <div className="d-flex">
                    <div className="px-2 flex-grow-1 ">
                      <Label>Transaction ID</Label>
                      <h6>
                        {activeSubscription.transactions
                          ? activeSubscription.transactions.transaction_code
                          : ""}
                      </h6>
                    </div>
                    <div className="px-2">
                      <Label>Status</Label>
                      <h6
                        style={{
                          color: activeSubscription.is_active
                            ? "#00960c"
                            : "#ed0000",
                        }}
                      >
                        {activeSubscription.is_active ? "Active" : "Expired"}
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col className="cardBody-mobile">
                  <div className="d-flex">
                    <div className="px-2 flex-fill">
                      <Label>Start Date</Label>
                      <h6>{activeSubscription.subscription_start_date}</h6>
                    </div>
                    <div className="px-2 flex-fill">
                      <Label>End Date</Label>
                      <h6>{activeSubscription.subscription_start_date}</h6>
                    </div>
                    {activeSubscription.plan_id == 1 &&
                    data.register_from === "Linkedin" ? (
                      <div className="px-2" style={{ width: "55px" }}></div>
                    ) : (
                      <div
                        className="px-2 d-flex justify-content-center"
                        onClick={() =>
                          props.downloadInvoice(
                            "download-invoice",
                            activeSubscription.id,
                            "Subscription_Receipt.pdf"
                          )
                        }
                      >
                        <img
                          src="images/Group 3184@2x.png"
                          alt=""
                          className="invoiceIcon"
                          style={{ height: "17px" }}
                        />
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            ) : (
              <p className="result-not-found">Result not found!</p>
            )}
          </Container>
        </MobileView>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    authentication,
    get_subscription,
    subscription_history,
    purchase_history,
  } = state;
  return {
    authentication,
    get_subscription,
    subscription_history,
    purchase_history,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  downloadInvoice: crudActions._downloadWithPost,
};

export default connect(mapStateToProps, actionCreators)(UserProfile);
