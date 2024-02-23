import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions } from "../../_actions";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { BrowserView, MobileView } from "react-device-detect";
import Tooltip from "react-tooltip-lite";
import { Tabs } from "antd";

const SubscriptionHistory = (props) => {
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
    <div className="subscription-detail">
      <div className="pro-subscription-history-section">
        <div className="subsciption-history-section">
          <h4>Subscription History</h4>

          <div style={{ margin: "20px" }}>
            <Tabs className="card">
              <Tabs.TabPane
                className="card"
                // tab={"Subscription History"}
                key={"1"}
              >
                <div style={{ width: "100%", marginBottom: "20px" }}>
                  <div className="purchasePanelArea">
                    {/* <BrowserView> */}
                    <div className="payment-list-page">
                      <div className="payment-list" id="userPurchaseList">
                        <div>
                          {subscription_history &&
                          subscription_history.length > 0 ? (
                            subscription_history.map((subscription, key) => (
                              <>
                                <div style={{ width: "100%" }} key={key}>
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
                                          {subscription.subscription_start_date}
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
                                          {subscription.subscription_end_date}
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
                                        <p>
                                          {subscription.plans &&
                                            subscription.plans.plan_name}
                                        </p>
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
                                        <p>{subscription.status}</p>
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
                                        <p>
                                          {subscription.transactions
                                            ? subscription.transactions
                                                .transaction_code
                                            : ""}
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{ width: "45%" }}>
                                      <span className="detail-subscription-lable">
                                        Invoice / Receipts
                                      </span>
                                      <div
                                        className="detail-subscription-value"
                                        style={{ width: "100%" }}
                                      >
                                        <p>
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
                                                  style={{
                                                    color: "#009243",
                                                    fontSize: "10px",
                                                  }}
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
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <p className="result-not-found">
                              Result not found!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* </BrowserView> */}
                  </div>
                </div>
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

export default connect(mapStateToProps, actionCreators)(SubscriptionHistory);

// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { crudActions } from "../../_actions";
// import { Container, Row, Col, Label } from "reactstrap";
// import { BrowserView, MobileView } from "react-device-detect";
// import { Tabs } from "antd";

// const UserProfile = (props) => {
//     const { authentication, get_subscription } = props;
//     const [data, setData] = useState(authentication.user.data.data);
//     const [activeSubscription, setActiveSubscription] = useState(null);

//     useEffect(() => {
//         props.getAllCrud("get_subscription", "get_subscription");
//         props.getAllCrud("subscription_history", "subscription_history");
//         // props.getAllCrud("purchase_history", "purchase_history");
//     }, []);

//     useEffect(() => {
//         if (
//             get_subscription &&
//             get_subscription != undefined &&
//             get_subscription != null &&
//             get_subscription.length
//         ) {
//             get_subscription.filter((activeSub) => {
//                 if (activeSub.is_active === 1) {
//                     setActiveSubscription(activeSub);
//                 }
//             });
//         }
//     }, [get_subscription]);

//     return (
//         <div style={{ position: 'relative', top: "60px" }}>
//             <div className="pro-subscription-history-section">
//                 <div className="subsciption-history-section">
//                     <h4>Subscription History</h4>

//                     <div style={{ margin: "20px" }}>
//                         <Tabs>
//                             <Tabs.TabPane
//                                 // tab={"Subscription Detail"}
//                                 key={"1"}>
//                                 <div style={{ width: "100%", marginTop: "0rem" }}>
//                                     <div className="purchasePanelArea">
//                                         <BrowserView>
//                                             <div className="payment-list-page pb-5">
//                                                 <div className="payment-list" id="userPaymentList">
//                                                     <div className="payment-table table-responsive" style={{ overflow: "hidden" }}>
//                                                         <div className="PaymentTableData">
//                                                             {activeSubscription ? (
//                                                                 <>
//                                                                     <div style={{ width: "100%" }}>

//                                                                         <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "14px" }}>

//                                                                             <div style={{ width: "46%" }}>
//                                                                                 <span className="detail-subscription-lable">
//                                                                                     Start Date
//                                                                                 </span>
//                                                                                 <div className="detail-subscription-value" style={{ width: "100%" }}>
//                                                                                     <p>
//                                                                                         {activeSubscription.subscription_start_date}
//                                                                                     </p>
//                                                                                 </div>

//                                                                             </div>
//                                                                             <div style={{ width: "45%" }}>
//                                                                                 <span className="detail-subscription-lable">
//                                                                                     End Date
//                                                                                 </span>
//                                                                                 <div className="detail-subscription-value" style={{ width: "100%" }}>
//                                                                                     <p>
//                                                                                         {activeSubscription.subscription_end_date}
//                                                                                     </p>
//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>

//                                                                     </div>

//                                                                     <div style={{ width: "100%" }}>

//                                                                         <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "14px" }}>

//                                                                             <div style={{ width: "46%" }}>
//                                                                                 <span className="detail-subscription-lable">
//                                                                                     Plan
//                                                                                 </span>
//                                                                                 <div className="detail-subscription-value" style={{ width: "100%" }}>
//                                                                                     <p>
//                                                                                         {activeSubscription.plans.plan_name}
//                                                                                     </p>
//                                                                                 </div>

//                                                                             </div>
//                                                                             <div style={{ width: "45%" }}>
//                                                                                 <span className="detail-subscription-lable">
//                                                                                     Status
//                                                                                 </span>
//                                                                                 <div className="detail-subscription-value" style={{ width: "100%" }}>
//                                                                                     <p>
//                                                                                         {/* {activeSubscription.is_active
//                                                                                             ? "Active"
//                                                                                             : "Inactive"} */}
//                                                                                             Approved
//                                                                                     </p>
//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>

//                                                                     </div>

//                                                                     <div style={{ width: "100%" }}>

//                                                                         <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "14px" }}>

//                                                                             <div style={{ width: "46%" }}>
//                                                                                 <span className="detail-subscription-lable">
//                                                                                     Transaction Id
//                                                                                 </span>
//                                                                                 <div className="detail-subscription-value" style={{ width: "100%" }}>
//                                                                                     <p>

//                                                                                     </p>
//                                                                                 </div>

//                                                                             </div>
//                                                                             <div style={{ width: "45%" }}>
//                                                                                 <span className="detail-subscription-lable">
//                                                                                     Invoice / Receipts
//                                                                                 </span>
//                                                                                 <div className="detail-subscription-value" style={{ width: "100%" }}>
//                                                                                     <p>

//                                                                                     </p>
//                                                                                 </div>
//                                                                             </div>
//                                                                         </div>

//                                                                     </div>

//                                                                     {/* {activeSubscription.plan_id == 1 &&
//                                                                         data.register_from === "Linkedin" ? (
//                                                                         <div></div>
//                                                                     ) : (
//                                                                         <div className="d-flex flex-row">
//                                                                             <div
//                                                                                 style={{
//                                                                                     marginTop: "5px",
//                                                                                     background: "red"
//                                                                                 }}
//                                                                             >
//                                                                                 <img
//                                                                                     src="images/document@2x.png"
//                                                                                     alt=""
//                                                                                     className="invoiceIcon"
//                                                                                 />
//                                                                             </div>
//                                                                             <div>
//                                                                                 <button
//                                                                                     className="btn"
//                                                                                     style={{ color: "#009243" }}
//                                                                                     onClick={() =>
//                                                                                         props.downloadInvoice(
//                                                                                             "download-invoice",
//                                                                                             activeSubscription.id,
//                                                                                             "Subscription_Receipt.pdf"
//                                                                                         )
//                                                                                     }
//                                                                                 >
//                                                                                     Download
//                                                                                 </button>
//                                                                             </div>
//                                                                         </div>
//                                                                     )} */}
//                                                                 </>
//                                                             ) : (
//                                                                 <p className="result-not-found">
//                                                                     Result not found!
//                                                                 </p>

//                                                             )}

//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </BrowserView>
//                                     </div>
//                                 </div>
//                             </Tabs.TabPane>
//                         </Tabs>
//                         <div style={{ width: "100%", marginTop: "3.25rem" }}>
//                             <MobileView>
//                                 <Container style={{ padding: "0 5px" }}>
//                                     {activeSubscription ? (
//                                         <Row className="d-flex flex-column py-1 TableViewMobile">
//                                             <Col className="cardHead-mobile">
//                                                 <div className="d-flex">
//                                                     <div className="px-2 flex-grow-1 ">
//                                                         <Label>Transaction ID</Label>
//                                                         <h6>
//                                                             {activeSubscription.transactions
//                                                                 ? activeSubscription.transactions.transaction_code
//                                                                 : ""}
//                                                         </h6>
//                                                     </div>
//                                                     <div className="px-2">
//                                                         <Label>Status</Label>
//                                                         <h6
//                                                             style={{
//                                                                 color: activeSubscription.is_active
//                                                                     ? "#00960c"
//                                                                     : "#ed0000",
//                                                             }}
//                                                         >
//                                                             {activeSubscription.is_active ? "Active" : "Expired"}
//                                                         </h6>
//                                                     </div>
//                                                 </div>
//                                             </Col>
//                                             <Col className="cardBody-mobile">
//                                                 <div className="d-flex">
//                                                     <div className="px-2 flex-fill">
//                                                         <Label>Start Date</Label>
//                                                         <h6>{activeSubscription.subscription_start_date}</h6>
//                                                     </div>
//                                                     <div className="px-2 flex-fill">
//                                                         <Label>End Date</Label>
//                                                         <h6>{activeSubscription.subscription_start_date}</h6>
//                                                     </div>
//                                                     {activeSubscription.plan_id == 1 &&
//                                                         data.register_from === "Linkedin" ? (
//                                                         <div className="px-2" style={{ width: "55px" }}></div>
//                                                     ) : (
//                                                         <div
//                                                             className="px-2 d-flex justify-content-center"
//                                                             onClick={() =>
//                                                                 props.downloadInvoice(
//                                                                     "download-invoice",
//                                                                     activeSubscription.id,
//                                                                     "Subscription_Receipt.pdf"
//                                                                 )
//                                                             }
//                                                         >
//                                                             <img
//                                                                 src="images/Group 3184@2x.png"
//                                                                 alt=""
//                                                                 className="invoiceIcon"
//                                                                 style={{ height: "17px" }}
//                                                             />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </Col>
//                                         </Row>
//                                     ) : (
//                                         <p className="result-not-found">Result not found!</p>
//                                     )}
//                                 </Container>
//                             </MobileView>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// };

// const mapStateToProps = (state) => {
//     const {
//         authentication,
//         get_subscription,
//         subscription_history,
//         purchase_history,
//     } = state;
//     return {
//         authentication,
//         get_subscription,
//         subscription_history,
//         purchase_history,
//     };
// };

// const actionCreators = {
//     getAllCrud: crudActions._getAll,
//     downloadInvoice: crudActions._downloadWithPost,
// };

// export default connect(mapStateToProps, actionCreators)(UserProfile);
