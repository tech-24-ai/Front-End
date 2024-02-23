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
    <div className="subscription-detail">
      <div className="pro-subscription-history-section">
        <div
          className="subsciption-history-section"
          style={{ marginBottom: "20px" }}
        >
          {/* <h4>Subscription Detail</h4> */}

          <div style={{ margin: "20px" }}>
            <Tabs>
              <Tabs.TabPane
                className="card"
                style={{
                  borderRadius: "unset",
                  border: "none",
                  boxShadow: "unset",
                }}
                tab={"Subscription Detail"}
                key={"1"}
              >
                {/* <BrowserView> */}
                <div className="card" id="userPaymentList">
                  <div>
                    {activeSubscription ? (
                      <>
                        <div style={{ width: "100%" }}>
                          <div className="detail-subcription-case">
                            <div style={{ width: "46%" }}>
                              <span className="detail-subscription-lable">
                                Start Date
                              </span>
                              <div
                                className="detail-subscription-value"
                                style={{ width: "100%" }}
                              >
                                <p>
                                  {activeSubscription.subscription_start_date}
                                </p>
                              </div>
                            </div>
                            <div style={{ width: "45%" }}>
                              <span className="detail-subscription-lable">
                                End Date
                              </span>
                              <div
                                className="detail-subscription-value"
                                style={{ width: "100%" }}
                              >
                                <p>
                                  {activeSubscription.subscription_end_date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <div className="detail-subcription-case">
                            <div style={{ width: "46%" }}>
                              <span className="detail-subscription-lable">
                                Plan
                              </span>
                              <div
                                className="detail-subscription-value"
                                style={{ width: "100%" }}
                              >
                                <p>{activeSubscription.plans.plan_name}</p>
                              </div>
                            </div>
                            <div style={{ width: "45%" }}>
                              <span className="detail-subscription-lable">
                                Status
                              </span>
                              <div
                                className="detail-subscription-value"
                                style={{ width: "100%" }}
                              >
                                <p>
                                  {activeSubscription.is_active
                                    ? "Active"
                                    : "Inactive"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={{ width: "100%" }}>
                          <div className="detail-subcription-case">
                            <div style={{ width: "46%" }}>
                              <span className="detail-subscription-lable">
                                Transaction Id
                              </span>
                              <div
                                className="detail-subscription-value"
                                style={{ width: "100%" }}
                              >
                                <p></p>
                              </div>
                            </div>
                            <div style={{ width: "45%" }}>
                              <span className="detail-subscription-lable">
                                Receipts
                              </span>
                              <div
                                className="detail-subscription-value"
                                style={{ width: "100%" }}
                              >
                                <p></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* {activeSubscription.plan_id == 1 &&
                                                                        data.register_from === "Linkedin" ? (
                                                                        <div></div>
                                                                    ) : (
                                                                        <div className="d-flex flex-row">
                                                                            <div
                                                                                style={{
                                                                                    marginTop: "5px",
                                                                                    background: "red"
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
                                                                    )} */}
                      </>
                    ) : (
                      <p className="result-not-found">Result not found!</p>
                    )}
                  </div>
                </div>
                {/* </BrowserView> */}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
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
