import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions } from "../../_actions";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { BrowserView, MobileView } from "react-device-detect";
import Tooltip from "react-tooltip-lite";
import { Tabs } from "antd";

const UserProfile = (props) => {
  const { authentication, get_subscription, subscription_history } = props;

  const [data, setData] = useState(authentication.user.data.data);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [tooltipOpen, setTooltip] = useState(false);

  const toggleTip = (id) => {
    tooltipOpen === id ? setTooltip(false) : setTooltip(id);
  };

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
        <Tabs.TabPane tab={"Subscription History"} key={"1"}>
          <div style={{ width: "100%", marginTop: "3.25rem" }}>
            <div className="purchasePanelArea">
              <BrowserView>
                <div className="payment-list-page pb-5">
                  <div className="payment-list" id="userPurchaseList">
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
                        {subscription_history &&
                        subscription_history.length > 0 ? (
                          subscription_history.map((subscription, key) => (
                            <div key={key}>
                              <div className="row dataRow">
                                <div className="col">
                                  {subscription.subscription_start_date}
                                </div>
                                <div className="col">
                                  {subscription.subscription_end_date}
                                </div>
                                <div className="col">
                                  {subscription.plans &&
                                    subscription.plans.plan_name}
                                </div>
                                <div
                                  className="col VendorNameCol"
                                  style={{ display: "flex" }}
                                >
                                  {/* {subscription.is_active
                                ? subscription.is_active > 1
                                  ? "In Future"
                                  : "Active"
                                : "Expired"} */}
                                  {subscription.status}
                                  {subscription.status == "Pending" ||
                                  subscription.status == "Rejected" ? (
                                    <div
                                      className=""
                                      style={{ marginLeft: "10px" }}
                                    >
                                      <img
                                        src="images/Component 8@2x.png"
                                        alt=""
                                        className="invoiceIcon"
                                        style={{
                                          height: "15px",
                                          width: "15px",
                                        }}
                                        onClick={() =>
                                          toggleTip(subscription.id)
                                        }
                                      />
                                      <Tooltip
                                        content={
                                          <div
                                            className="controlled-example"
                                            style={{
                                              fontSize: "12px",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}
                                          >
                                            <p>{subscription.remarks}</p>
                                            <button
                                              type="button"
                                              className="controlled-example_close-button"
                                              style={{ marginTop: "-2rem" }}
                                              onClick={() =>
                                                toggleTip(subscription.id)
                                              }
                                            >
                                              &times;
                                            </button>
                                          </div>
                                        }
                                        isOpen={
                                          tooltipOpen === subscription.id
                                            ? true
                                            : false
                                        }
                                        tagName="span"
                                        direction="down-end"
                                        className="customTooltip"
                                        tipContentClassName="customTooltipContent"
                                        padding={20}
                                        useDefaultStyles={false}
                                        styles={{ left: "4rem" }}
                                        background="#fcfdf5"
                                        arrow={false}
                                      ></Tooltip>
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  {subscription.transactions
                                    ? subscription.transactions.transaction_code
                                    : ""}
                                </div>
                                <div className="col">
                                  {subscription.plan_id == 1 &&
                                  data.register_from === "Linkedin" ? (
                                    <div></div>
                                  ) : (
                                    <div className="d-flex flex-row">
                                      <div
                                        style={{
                                          // paddingRight: "12px",
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
                                              subscription.id,
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
                            </div>
                          ))
                        ) : (
                          <p className="result-not-found">Result not found!</p>
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
      <BrowserView></BrowserView>
      <MobileView>
        <Container style={{ padding: "0 5px" }}>
          {subscription_history ? (
            subscription_history.map((subscription, key) => (
              <Row
                key={key}
                className="d-flex flex-column py-1 TableViewMobile"
              >
                <Col className="cardHead-mobile">
                  <div className="d-flex">
                    <div className="px-2 flex-grow-1 ">
                      <Label>Transaction ID</Label>
                      <h6>
                        {subscription.transactions
                          ? subscription.transactions.transaction_code
                          : ""}
                      </h6>
                    </div>
                    <div className="px-2">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Label>Status</Label>
                        {subscription.status == "Pending" ||
                        subscription.status == "Rejected" ? (
                          <div className="" style={{ marginLeft: "10px" }}>
                            <img
                              src="images/Component 8@2x.png"
                              alt=""
                              className="invoiceIcon"
                              style={{ height: "12px", width: "12px" }}
                              onClick={() => toggleTip(subscription.id)}
                            />
                            <Tooltip
                              content={
                                <div
                                  className="controlled-example"
                                  style={{
                                    fontSize: "12px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <p>{subscription.remarks}</p>
                                  <button
                                    type="button"
                                    className="controlled-example_close-button"
                                    style={{ marginTop: "-2rem" }}
                                    onClick={() => toggleTip(subscription.id)}
                                  >
                                    &times;
                                  </button>
                                </div>
                              }
                              isOpen={
                                tooltipOpen === subscription.id ? true : false
                              }
                              tagName="span"
                              direction="down-end"
                              className="customTooltip"
                              tipContentClassName="customTooltipContent"
                              padding={20}
                              useDefaultStyles={false}
                              background="#fcfdf5"
                            ></Tooltip>
                          </div>
                        ) : null}
                      </div>
                      <h6
                        style={{
                          color:
                            subscription.status == "Approved"
                              ? "#00960c"
                              : subscription.status == "Approved"
                              ? "#F29339"
                              : "#ed0000",
                        }}
                      >
                        {/* subscription.is_active
                              ? subscription.is_active > 1
                                ? "In Future"
                                : "Active"
                              : "Expired" */}
                        {subscription.status}
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col className="cardBody-mobile">
                  <div className="d-flex">
                    <div className="px-2 flex-fill">
                      <Label>Start Date</Label>
                      <h6>{subscription.subscription_start_date}</h6>
                    </div>
                    <div className="px-2 flex-fill">
                      <Label>End Date</Label>
                      <h6>{subscription.subscription_start_date}</h6>
                    </div>
                    {subscription.plan_id == 1 &&
                    data.register_from === "Linkedin" ? (
                      <div className="px-2" style={{ width: "55px" }}></div>
                    ) : (
                      <div
                        className="px-2 d-flex justify-content-center"
                        onClick={() =>
                          props.downloadInvoice(
                            "download-invoice",
                            subscription.id,
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
            ))
          ) : (
            <p className="result-not-found">Result not found!</p>
          )}
        </Container>
      </MobileView>
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
