import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions, alertActions } from "../../_actions";
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
import { BrowserView, MobileView } from "react-device-detect";
import { Icon } from "react-icons-kit";
import { compose } from "react-icons-kit/ionicons/compose";
import { androidDoneAll } from "react-icons-kit/ionicons/androidDoneAll";
import Tooltip from "react-tooltip-lite";

const UserProfile = (props) => {
  const {
    authentication,
    get_subscription,
    subscription_history,
    purchase_history,
  } = props;

  const [editField, setEditField] = useState("");
  const [currentTab, setCurrentTab] = useState("personalTab");
  const [expandedPanel, setExpandedPanel] = useState("");
  const [data, setData] = useState(authentication.user.data.data);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [tooltipOpen, setTooltip] = useState(false);

  const toggleTip = (id) => {
    tooltipOpen === id ? setTooltip(false) : setTooltip(id);
  };

  const TabChangeHandler = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (panel) => (event) => {
    setExpandedPanel(expandedPanel === panel ? "" : panel);
  };

  const editButtonHandler = (field) => {
    // if (editField === field) {
    //   //   props.update_user_details(data);
    //   setEditField("");
    // } else {
    //   setEditField(field);
    // }
  };

  const onChangeHandle = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
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
        if (activeSub.is_active === 1 && activeSub.plans != null) {
          setActiveSubscription(activeSub);
        }
      });
    }
  }, [get_subscription]);

  return (
    <div style={{ margin: "20px" }}>
      {/* <h3 style={{ marginBottom: "2rem" }}>Your Profile</h3> */}
      {/* Personal Profile */}
      <div style={{ width: "100%" }}>
        <div className="profilePanel">
          <div className="flex-grow-1">
            {/* <h3 className="accordionTitle">Personal Details</h3> */}
          </div>
          <div onClick={handleChange("panel1")}>
            {/* <h5 className="accordionButton">
              {expandedPanel === "panel1" ? "Less" : "More"}
            </h5> */}
          </div>
        </div>
        <Collapse
          className="profilePanelArea"
          isOpen={expandedPanel === "panel1" ? false : true}
        >
          {/* <div
            className="profileImage"
            style={{ padding: "1rem 0", cursor: "pointer" }}
          >
            <img
              src="/public/images/Profile picture@2x.png"
              alt=""
              style={{ height: "66px", width: "66px", borderRadius: "50%" }}
            />
          </div> */}
          <div style={{ maxWidth: "700px", marginTop: "2rem" }}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <div className="paper">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div className="titleField">
                        <FormGroup>
                          <Label>Name</Label>
                          {editField === "name" ? (
                            <Input
                              type="text"
                              name="name"
                              value={data.name}
                              onChange={onChangeHandle}
                            />
                          ) : (
                            <h5 className="paperText">{data.name}</h5>
                          )}
                        </FormGroup>
                      </div>
                    </div>
                    <div>
                      {/* <div
                        style={{ marginTop: "60%", cursor: "pointer" }}
                        onClick={() => editButtonHandler("name")}
                      >
                        {editField === "name" ? (
                          <Icon size={25} icon={androidDoneAll} />
                        ) : (
                          <Icon size={25} icon={compose} />
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </Col>
              {/* <Col xs={12} sm={12} md={6}>
                <div className="paper">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div className="titleField">
                        <FormGroup>
                          <Label>Designation</Label>
                          {editField === "designation" ? (
                            <Input
                              type="text"
                              name="designation"
                              value={data.designation}
                              onChange={onChangeHandle}
                            />
                          ) : (
                            <h5 className="paperText">{data.designation}</h5>
                          )}
                        </FormGroup>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ marginTop: "60%", cursor: "pointer" }}
                        onClick={() => editButtonHandler("designation")}
                      >
                        {editField === "designation" ? (
                          <Icon size={25} icon={androidDoneAll} />
                        ) : (
                          <Icon size={25} icon={compose} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col> */}
              <Col xs={12} sm={12} md={6}>
                <div className="paper">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div className="titleField">
                        <FormGroup>
                          <Label>Email</Label>
                          {editField === "email" ? (
                            <Input
                              type="text"
                              name="email"
                              value={data.email}
                              onChange={onChangeHandle}
                            />
                          ) : (
                            <h5 className="paperText">{data.email}</h5>
                          )}
                        </FormGroup>
                      </div>
                    </div>
                    <div>
                      {/* <div
                        style={{ marginTop: "60%", cursor: "pointer" }}
                        onClick={() => editButtonHandler("email")}
                      >
                        {editField === "email" ? (
                          <Icon size={25} icon={androidDoneAll} />
                        ) : (
                          <Icon size={25} icon={compose} />
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </Col>
              {/*
              <Col xs={12} sm={12} md={6}>
                <div className="paper">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div className="titleField">
                        <FormGroup>
                          <Label>Mobile</Label>
                          {editField === "mobile" ? (
                            <Input
                              type="text"
                              name="mobile"
                              value={data.mobile}
                              onChange={onChangeHandle}
                            />
                          ) : (
                            <h5 className="paperText">{data.mobile}</h5>
                          )}
                        </FormGroup>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ marginTop: "60%", cursor: "pointer" }}
                        onClick={() => editButtonHandler("mobile")}
                      >
                        {editField === "mobile" ? (
                          <Icon size={25} icon={androidDoneAll} />
                        ) : (
                          <Icon size={25} icon={compose} />
                        )}
                        </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <div className="paper">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div className="titleField">
                        <FormGroup>
                          <Label>Company</Label>
                          {editField === "company" ? (
                            <Input
                              type="text"
                              name="company"
                              value={data.company}
                              onChange={onChangeHandle}
                            />
                          ) : (
                            <h5 className="paperText">{data.company}</h5>
                          )}
                        </FormGroup>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ marginTop: "60%", cursor: "pointer" }}
                        onClick={() => editButtonHandler("company")}
                      >
                        {editField === "company" ? (
                          <Icon size={25} icon={androidDoneAll} />
                        ) : (
                          <Icon size={25} icon={compose} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>*/}
            </Row>
          </div>
        </Collapse>
      </div>

      {/* Subscription Detail */}
      {/* <div style={{ width: "100%", marginTop: "3.25rem" }}>
        <div className="subscriptionPanel">
          <div className="flex-grow-1">
            <h3 className="accordionTitle">Subscription Details</h3>
          </div>
          <div onClick={handleChange("panel2")}>
            <h5 className="accordionButton">
              {expandedPanel === "panel2" ? "Less" : "More"}
            </h5>
          </div>
        </div>
        <Collapse
          className="subscriptionPanelArea"
          isOpen={expandedPanel === "panel2" ? true : false}
        >
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
                              ? activeSubscription.transactions.transaction_code
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
                        <p className="result-not-found">Result not found!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserView>
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
        </Collapse>
      </div> */}

      {/* Subscription History */}
      {/* <div style={{ width: "100%", marginTop: "3.25rem" }}>
        <div className="paymentPanel">
          <div className="flex-grow-1">
            <h3 className="accordionTitle">Subscription History</h3>
          </div>
          <div onClick={handleChange("panel3")}>
            <h5 className="accordionButton">
              {expandedPanel === "panel3" ? "Less" : "More"}
            </h5>
          </div>
        </div>
        <Collapse
          className="paymentPanelArea"
          isOpen={expandedPanel === "panel3" ? true : false}
        >
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
                    {subscription_history && subscription_history.length > 0 ? (
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
                                    style={{ height: "15px", width: "15px" }}
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
        </Collapse>
      </div> */}

      {/* Purchase History */}
      <div style={{ width: "100%", marginTop: "3.25rem" }}>
        {/* <div className="purchasePanel">
          <div className="flex-grow-1">
            <h3 className="accordionTitle">Purchase History</h3>
          </div>
          <div onClick={handleChange("panel4")}>
            <h5 className="accordionButton">
              {expandedPanel === "panel4" ? "Less" : "More"}
            </h5>
          </div>
        </div> */}
        <Collapse
          className="purchasePanelArea"
          isOpen={expandedPanel === "panel4" ? true : false}
        >
          <BrowserView>
            <div className="payment-list-page pb-5">
              <div className="payment-list" id="userPurchaseList">
                <div className="payment-table table-responsive">
                  <div className="PaymentTableData">
                    <div className="row headRow">
                      <div className="col">Purchase Date</div>
                      <div className="col">Document</div>
                      <div className="col">Price</div>
                      <div className="col">Transaction Id</div>
                      <div className="col">Invoice / Receipts</div>
                    </div>
                    {purchase_history && purchase_history.length > 0 ? (
                      purchase_history.map((document, key) => (
                        <div key={key}>
                          <div className="row dataRow">
                            <div className="col">{document.purchase_date}</div>
                            <div className="col">
                              {document.documents
                                ? document.documents.name
                                : ""}
                            </div>
                            <div className="col">{document.document_price}</div>
                            <div className="col">
                              {document.transactions &&
                                document.transactions.transaction_code}
                            </div>
                            <div className="col">
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
                                        document.invoices.id,
                                        "Purchase_Receipt.pdf"
                                      )
                                    }
                                  >
                                    Download
                                  </button>
                                </div>
                              </div>
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
          <MobileView>
            <Container style={{ padding: "0 5px" }}>
              {purchase_history &&
                purchase_history.map((document, key) => (
                  <Row
                    key={key}
                    className="d-flex flex-column py-1 TableViewMobile"
                  >
                    <Col className="cardHead-mobile">
                      <div className="d-flex">
                        <div className="px-2 flex-grow-1 ">
                          <Label>Transaction ID</Label>
                          <h6>{document.transactions?.transaction_code}</h6>
                        </div>
                        <div className="px-2">
                          <Label>Price</Label>
                          <h6>{document.document_price}</h6>
                        </div>
                      </div>
                    </Col>
                    <Col className="cardBody-mobile">
                      <div className="d-flex">
                        <div className="px-2 flex-fill">
                          <Label>Date</Label>
                          <h6>{document.purchase_date}</h6>
                        </div>
                        <div className="px-2 flex-fill">
                          <Label>Document</Label>
                          <h6>
                            {document.documents ? document.documents.name : ""}
                          </h6>
                        </div>
                        <div
                          className="px-2 d-flex justify-content-center"
                          onClick={() =>
                            props.downloadInvoice(
                              "download-invoice",
                              document.invoices.id,
                              "Purchase_Receipt.pdf"
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
                      </div>
                    </Col>
                  </Row>
                ))}
            </Container>
          </MobileView>
        </Collapse>
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
