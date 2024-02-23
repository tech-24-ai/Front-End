import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { crudActions, alertActions, userActions } from "../../_actions";
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Router from "next/router";

import PaypalSubscription from "../../components/subscription/PaypalSubscription";
import Switch from "react-switch";
import Image from "next/image";
import Check from "../../public/new_images/Pricing/check.svg";
import CheckRight from "../../public/new_images/Pricing/check-wh.svg";
import Close from "../../public/new_images/Pricing/close.svg";
import PageBanner from "../../components/card/pageBanner";
import pricingIcon from "../../public/new_images/pricing-bg.svg";

const Pricing = (props) => {
  const {
    authentication,
    getAllCrud,
    showError,
    plans,
    get_subscription,
    toggleLoginPopup,
  } = props;
  const { user, loggedIn } = authentication;
  const [isPaymentInProcess, setIsPaymentInProcess] = useState(false);
  const [subsPlan, setSubsPlan] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [futureSubscribed, setFutureSubscribed] = useState(null);
  const [pendingSubscription, setPendingSubscription] = useState(null);
  const [isAdvanceYrly, setIsAdvanceYrly] = useState(true);
  const [isPremiumYrly, setIsPremiumYrly] = useState(false);

  const [checked, setChecked] = useState(true);

  const handleClick = () => {
    setChecked(!checked);
  };

  const handleBuySubscription = (plan) => {
    if (!loggedIn) {
      return toggleLoginPopup(true);
    }
    setSubsPlan(plan);
    setIsPaymentInProcess(true);
  };

  useEffect(() => {
    props.getAllCrud("plans", "plans");

    if (loggedIn) {
      props.getAllCrud("get_subscription", "get_subscription");
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return setFutureSubscribed(null);
    }
    get_subscription &&
      get_subscription.filter((activeSub) => {
        if (activeSub.is_active === 1 && activeSub.plans != null) {
          setActiveSubscription(activeSub);
        }

        if (activeSub.is_active === 2) {
          setFutureSubscribed(activeSub);
        }
        if (activeSub.is_active === 0 && activeSub.status === "Pending") {
          setPendingSubscription(activeSub);
        }
      });
  }, [get_subscription]);
  const planConfig = {
    Basic: {
      color: "#fff",
      textColor: "#fff",
      backgroundColor: "#075aee",
      featureOne: true,
      featureTwo: true,
      featureThree: false,
      featureFour: false,
      isToggleBtn: false,
      planDuration: "Yearly",
    },
    // Advance: {
    //   color: "#000000",
    //   textColor: "#70798B",
    //   backgroundColor: "#fff",
    //   featureOne: true,
    //   featureTwo: true,
    //   featureThree: true,
    //   featureFour: false,
    //   isToggleBtn: false,
    //   // planSetter: setIsAdvanceYrly,
    //   planDuration: isAdvanceYrly ? "Yearly" : "Monthly",
    // },
    Premium: {
      color: "#000000",
      textColor: "#70798B",
      backgroundColor: "#fff",
      featureOne: true,
      featureTwo: true,
      featureThree: true,
      featureFour: true,
      isToggleBtn: true,
      planSetter: setIsPremiumYrly,
      planDuration: isPremiumYrly ? "Yearly" : "Monthly",
    },
  };

  const profileTab = () => {
    sessionStorage.setItem("profileCreditPurchase", "CreditPurchase");
    Router.push("/Profile");
  };

  return (
    <section className="pricing-section">
      <PageBanner
        titleNode={
          <div>
            <h4>Pricing</h4>
          </div>
        }
        image={pricingIcon}
      />
      <Container
      // className="pricing_plans"
      >
        <h4>
          Choose The Right Plan For
          <br></br>
          Your Business
        </h4>

        {/* <div onClick={profileTab} className="custom-btn with-bg buy-button">
          Buy Credit
        </div> */}

        {/* <FormGroup style={{ display: "none" }}>
                    <Label check>
                        <CustomInput
                            type="switch"
                            id="exampleSwitch"
                            checked={checked}
                            onChange={handleClick}
                        />
                    </Label>
                </FormGroup> */}
        <Row className="plan-container">
          {Object.keys(planConfig).map(
            (p, key) =>
              plans &&
              plans
                .filter(
                  (fp) => fp.plan_name === p
                  // &&
                  // fp.plan_duration === planConfig[p].planDuration
                )
                .map((plan) => (
                  <Col md={12} lg={6} key={key}>
                    <div
                      className="card mb-3"
                      style={{
                        background:
                          // plan.plan_category ==
                          // (activeSubscription &&
                          //   activeSubscription.plans.plan_category)
                          //   ? "#075aee"
                          //   : "#fff",
                          (!loggedIn && plan.plan_category == 1) ||
                          plan.plan_category ==
                            (activeSubscription &&
                              activeSubscription.plans.plan_category)
                            ? "#075aee"
                            : "#fff",
                      }}
                    >
                      <div
                        className="card-header card-m-head"
                        style={{
                          backgroundColor:
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#075aee"
                            //   : "#fff",
                            (!loggedIn && plan.plan_category == 1) ||
                            plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category)
                              ? "#075aee"
                              : "#fff",
                          color:
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#fff"
                            //   : "#000",
                            (!loggedIn && plan.plan_category == 1) ||
                            plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category)
                              ? "#fff"
                              : "#000",
                          display: "flex",
                          height: "100px",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderBottom: "1px solid",
                          borderColor:
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#fff"
                            //   : "#000",
                            (!loggedIn && plan.plan_category == 1) ||
                            plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category)
                              ? "#fff"
                              : "#000",
                        }}
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              fontfamily: "Poppins",
                              fontSize: "30px",
                              fontWeight: "600",
                              lineHeight: "45px",
                              letterSpacing: "0.6px",
                              textAlign: "left",
                            }}
                          >
                            {plan.plan_name}
                          </span>
                          <span
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "500",
                              lineHeight: "30px",
                              letterSpacing: "0.1px",
                              textAlign: "left",
                              color: planConfig[plan.plan_name].textColor,
                            }}
                          >
                            {planConfig[plan.plan_name].featureThree
                              ? "Recommended"
                              : "Free"}
                          </span>
                        </div>

                        {
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {/* <span
                            style={{
                              fontfamily: "Poppins",
                              fontSize: "30px",
                              fontWeight: "600",
                              lineHeight: "45px",
                              letterSpacing: "0.6px",
                              textAlign: "right",
                            }}
                          >
                            {plan.current_price_or_special_price ||
                            plan.plan_price > 0
                              ? plan.current_price_or_special_price > 0
                                ? `$ ${plan.current_price_or_special_price}`
                                : `$ ${plan.plan_price}`
                              : "$ 00.00"}
                          </span>
                          <span
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "30px",
                              letterSpacing: "0.1px",
                              textAlign: "right",
                              color: planConfig[plan.plan_name].textColor,
                            }}
                          >
                            {plan.plan_duration}
                            Per Month
                          </span> */}
                          </div>
                        }

                        {/* (
                        {plan.current_price_or_special_price ||
                          plan.plan_price > 0
                          ? plan.current_price_or_special_price > 0
                            ? `$ ${plan.current_price_or_special_price} / ${plan.plan_duration}`
                            : `$ ${plan.plan_price} / ${plan.plan_duration}`
                          : "Free"}
                        ) */}
                        {/* {planConfig[plan.plan_name].isToggleBtn && (
                          <Switch
                            onChange={
                              (e) => planConfig[plan.plan_name].planSetter(e)
                              // console.log(
                              //   "E",
                              //   planConfig[plan.plan_name].planSetter(e)
                              // )
                            }
                            checked={
                              planConfig[plan.plan_name].planDuration ==
                                "Yearly"
                                ? true
                                : false
                            }
                            width={84}
                            offColor="#008800"
                            onColor="#008800"
                            offHandleColor={
                              planConfig[plan.plan_name].headerColor
                            }
                            onHandleColor={
                              planConfig[plan.plan_name].headerColor
                            }
                            uncheckedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: 12,
                                  color: "white",
                                  paddingRight: 16,
                                }}
                              >
                                Monthly
                              </div>
                            }
                            checkedIcon={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                  fontSize: 12,
                                  color: "white",
                                  paddingLeft: 12,
                                }}
                              >
                                Yearly
                              </div>
                            }
                          />
                        )} */}
                      </div>

                      <ul
                        className="list-group list-group-flush align-items-start"
                        style={{
                          background:
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#075aee"
                            //   : "#fff",
                            (!loggedIn && plan.plan_category == 1) ||
                            plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category)
                              ? "#075aee"
                              : "#fff",
                        }}
                      >
                        <li
                          className="list-group-item d-flex flex-row"
                          style={{
                            width: "100%",
                            alignItems: "flex-start",
                            border: "none",
                            background:
                              (!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category)
                                ? "#075aee"
                                : "#fff",
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#075aee"
                            //   : "#fff",
                          }}
                        >
                          {plan.description1 && (
                            <Fragment>
                              {/* <Icon
                                size={30}
                                icon={
                                  planConfig[plan.plan_name].featureOne
                                    ? iosCheckmarkEmpty
                                    : iosCloseEmpty
                                }

                                style={{
                                  color: planConfig[plan.plan_name].featureOne
                                    ? "black"
                                    : "white",
                                  height: "fit-content",
                                }}
                              /> */}
                              {(!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category) ? (
                                <img src={CheckRight.src} />
                              ) : (
                                <img src={Check.src} />
                              )}
                              {/* {plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category) ? (
                                <img src={CheckRight.src} />
                              ) : (
                                <img src={Check.src} />
                              )} */}
                              <div
                                className="ml-3"
                                style={{
                                  color:
                                    (!loggedIn && plan.plan_category == 1) ||
                                    plan.plan_category ==
                                      (activeSubscription &&
                                        activeSubscription.plans.plan_category)
                                      ? "#fff"
                                      : "#000",
                                  // plan.plan_category ==
                                  // (activeSubscription &&
                                  //   activeSubscription.plans.plan_category)
                                  //   ? "#fff"
                                  //   : "#000",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  lineHeight: "25px",
                                  letterSpacing: "0px",
                                }}
                              >
                                {plan.description1}
                              </div>
                            </Fragment>
                          )}
                        </li>
                        <li
                          className="list-group-item d-flex flex-row"
                          style={{
                            border: "none",
                            // background: planConfig[plan.plan_name].featureThree
                            //   ? "#075aee"
                            //   : "#fff",
                            background:
                              (!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category)
                                ? "#075aee"
                                : "#fff",
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#075aee"
                            //   : "#fff",
                          }}
                        >
                          {plan.description2 && (
                            <Fragment>
                              {/* <Icon
                                size={30}
                                icon={
                                  planConfig[plan.plan_name].featureTwo
                                    ? iosCheckmarkEmpty
                                    : iosCloseEmpty
                                }
                                style={{
                                  color: planConfig[plan.plan_name].featureTwo
                                    ? "#009243"
                                    : "#da4b00",
                                  height: "fit-content",
                                  margin: "auto",
                                }}
                              /> */}
                              {/* {plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category) ? (
                                <img src={CheckRight.src} />
                              ) : (
                                <img src={Check.src} />
                              )} */}
                              {(!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category) ? (
                                <img src={CheckRight.src} />
                              ) : (
                                <img src={Check.src} />
                              )}
                              <div
                                className="ml-3"
                                style={{
                                  color:
                                    (!loggedIn && plan.plan_category == 1) ||
                                    plan.plan_category ==
                                      (activeSubscription &&
                                        activeSubscription.plans.plan_category)
                                      ? "#fff"
                                      : "#000",
                                  // plan.plan_category ==
                                  // (activeSubscription &&
                                  //   activeSubscription.plans.plan_category)
                                  //   ? "#fff"
                                  //   : "#000",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  lineHeight: "25px",
                                  letterSpacing: "0px",
                                }}
                              >
                                {plan.description2}
                              </div>
                            </Fragment>
                          )}
                        </li>
                        <li
                          className="list-group-item d-flex flex-row"
                          style={{
                            border: "none",
                            // background: planConfig[plan.plan_name].featureThree
                            //   ? "#075aee"
                            //   : "#fff",
                            background:
                              // plan.plan_category ==
                              // (activeSubscription &&
                              //   activeSubscription.plans.plan_category)
                              //   ? "#075aee"
                              //   : "#fff",
                              (!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category)
                                ? "#075aee"
                                : "#fff",
                          }}
                        >
                          {plan.description3 && (
                            <Fragment>
                              {(!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category) ? (
                                <img src={CheckRight.src} />
                              ) : (
                                <img src={Check.src} />
                              )}
                              {/* {plan.plan_category ==
                              (activeSubscription &&
                                activeSubscription.plans.plan_category) ? (
                                <img src={CheckRight.src} />
                              ) : (
                                <img src={Check.src} />
                              )} */}
                              <div
                                className="ml-3"
                                style={{
                                  color:
                                    (!loggedIn && plan.plan_category == 1) ||
                                    plan.plan_category ==
                                      (activeSubscription &&
                                        activeSubscription.plans.plan_category)
                                      ? "#fff"
                                      : "#000",
                                  // plan.plan_category ==
                                  // (activeSubscription &&
                                  //   activeSubscription.plans.plan_category)
                                  //   ? "#fff"
                                  //   : "#000",
                                  fontFamily: "Poppins",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  lineHeight: "25px",
                                  letterSpacing: "0px",
                                }}
                              >
                                {plan.description3}
                              </div>
                            </Fragment>
                          )}
                        </li>
                        {/* <li className="list-group-item d-flex flex-row">
                                                    {plan.description4 && (
                                                        <Fragment>
                                                            <Icon
                                                                size={30}
                                                                icon={
                                                                    planConfig[plan.plan_name].featureFour
                                                                        ? iosCheckmarkEmpty
                                                                        : iosCloseEmpty
                                                                }
                                                                style={{
                                                                    color: planConfig[plan.plan_name].featureFour
                                                                        ? "#009243"
                                                                        : "#da4b00",
                                                                    height: "fit-content",
                                                                    borderRadius: "50%",
                                                                    border: "1px solid #bababa",
                                                                    margin: "auto",
                                                                }}
                                                            />

                                                            <div className="ml-3">{plan.description4}</div>
                                                        </Fragment>
                                                    )}
                                                </li> */}
                        <li
                          className="list-group-item d-flex flex-row"
                          style={{
                            width: "100%",
                            alignItems: "center",
                            border: "none",
                            background:
                              // plan.plan_category ==
                              // (activeSubscription &&
                              //   activeSubscription.plans.plan_category)
                              //   ? "#075aee"
                              //   : "#fff",
                              (!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category)
                                ? "#075aee"
                                : "#fff",
                          }}
                        >
                          {plan.description4 && (
                            <Fragment>
                              {(!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category) ? (
                                <img src={Close.src} />
                              ) : (
                                <img src={Check.src} />
                              )}

                              <div
                                className="ml-3"
                                style={{
                                  color:
                                    (!loggedIn && plan.plan_category == 1) ||
                                    plan.plan_category ==
                                      (activeSubscription &&
                                        activeSubscription.plans.plan_category)
                                      ? "#fff"
                                      : "#000",
                                  // color: plan.plan_category == (activeSubscription && activeSubscription.plans.plan_category)
                                  //   ? "#fff" : "#000",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  lineHeight: "25px",
                                  letterSpacing: "0px",
                                }}
                              >
                                {plan.description4}
                              </div>
                            </Fragment>
                          )}
                        </li>
                        <li
                          // className="list-group-item d-flex flex-row align-items-end"
                          style={{
                            // background: planConfig[plan.plan_name].featureThree
                            //   ? "#075aee"
                            //   : "#fff",
                            background:
                              (!loggedIn && plan.plan_category == 1) ||
                              plan.plan_category ==
                                (activeSubscription &&
                                  activeSubscription.plans.plan_category)
                                ? "#075aee"
                                : "#fff",
                            // plan.plan_category ==
                            // (activeSubscription &&
                            //   activeSubscription.plans.plan_category)
                            //   ? "#075aee"
                            //   : "#fff",
                            position: "relative",
                            margin: "auto",
                            padding: "20px 0px 0px 0px",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            fontWeight: "600",
                            lineHeight: "25px",
                            letterSpacing: "0px",
                          }}
                        >
                          {plan.plan_category ===
                          (activeSubscription &&
                            activeSubscription.plans.plan_category) ? (
                            <h6
                              style={{
                                color: "#f5f5f5",
                                fontSize: "16px",
                                padding: "10px 16px",
                                height: "50px",
                                width: "209px",
                                borderRadius: "16px",
                                lineHeight: "34px",
                              }}
                            >
                              Current Subscription
                            </h6>
                          ) : plan.plan_category >
                              (activeSubscription &&
                                activeSubscription.plans.plan_category) &&
                            plan.plan_category >
                              (pendingSubscription &&
                                pendingSubscription.plans.plan_category) ? (
                            plan.plan_category ===
                            (futureSubscribed &&
                              futureSubscribed.plans.plan_category) ? (
                              <h6
                                style={{
                                  color: "#bababa",
                                  fontSize: "16px",
                                  padding: "6px 25px",
                                  height: "56px",
                                  width: "209px",
                                  borderRadius: "16px",
                                }}
                              >
                                Future Subscribed
                              </h6>
                            ) : (
                              <Button
                                // color="primary"
                                style={{
                                  fontSize: "16px",
                                  padding: "8px 25px",
                                  fontWeight: planConfig[plan.plan_name]
                                    .featureThree
                                    ? "600"
                                    : "500",
                                  background:
                                    plan.plan_category ==
                                    (activeSubscription &&
                                      activeSubscription.plans.plan_category)
                                      ? "#fff"
                                      : "#075aee",
                                  color:
                                    plan.plan_category ==
                                    (activeSubscription &&
                                      activeSubscription.plans.plan_category)
                                      ? "#075aee"
                                      : "#fff",
                                  height: "56px",
                                  width: "209px",
                                  borderRadius: "16px",
                                  borderWidth: "0px",
                                }}
                                // onClick={() => handleBuySubscription(plan)}
                                onClick={profileTab}
                              >
                                {!loggedIn && plan.plan_category == 1
                                  ? "Subscribe for Free"
                                  : "BUY CREDITS"}
                              </Button>
                            )
                          ) : plan.plan_category ===
                            (pendingSubscription &&
                              pendingSubscription.plans.plan_category) ? (
                            <h6 style={{ color: "#bababa" }}>
                              Approval Pending
                            </h6>
                          ) : (
                            <div> </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </Col>
                ))
          )}
        </Row>

        <Modal
          isOpen={isPaymentInProcess}
          toggle={() => setIsPaymentInProcess(false)}
          className=""
          backdrop="static"
          keyboard={false}
        >
          <ModalHeader
            toggle={() => setIsPaymentInProcess(false)}
            style={{ backgroundColor: "#d1eaff" }}
          >
            Plan Subscription
          </ModalHeader>
          <ModalBody
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PaypalSubscription
              plan={subsPlan}
              user={user}
              setIsPaymentInProcess={setIsPaymentInProcess}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="warning"
              onClick={() => setIsPaymentInProcess(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { authentication, plans, get_subscription } = state;
  return {
    authentication,
    get_subscription,
    plans,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  showError: alertActions.error,
  toggleLoginPopup: userActions.toggleLoginPopup,
};

export default connect(mapStateToProps, actionCreators)(Pricing);
