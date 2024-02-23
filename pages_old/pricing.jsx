import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { crudActions, alertActions, userActions } from "../_actions";
import {
  Container,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Icon } from "react-icons-kit";
import Link from "next/link";
import Router from "next/router";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { iosCheckmarkEmpty } from "react-icons-kit/ionicons/iosCheckmarkEmpty";
import { iosCloseEmpty } from "react-icons-kit/ionicons/iosCloseEmpty";
import PaypalSubscription from "../components/subscription/PaypalSubscription";
import Switch from "react-switch";

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
      headerColor: "#ebebeb",
      featureOne: true,
      featureTwo: true,
      featureThree: false,
      featureFour: false,
      isToggleBtn: false,
      planDuration: "Yearly",
    },
    Advance: {
      headerColor: "#d1eaff",
      featureOne: true,
      featureTwo: true,
      featureThree: true,
      featureFour: true,
      isToggleBtn: false,
      // planSetter: setIsAdvanceYrly,
      planDuration: isAdvanceYrly ? "Yearly" : "Monthly",
    },
    // Premium: {
    //   headerColor: "#fff2d5",
    //   featureOne: true,
    //   featureTwo: true,
    //   featureThree: true,
    //   featureFour: true,
    //   isToggleBtn: true,
    //   planSetter: setIsPremiumYrly,
    //   planDuration: isPremiumYrly ? "Yearly" : "Monthly",
    // },
  };
  return (
    <section className="connect-vendor-wrapper connect-inclusion-wrapper">
      <Container className="pricing_plans">
        <Row>
          <Col md={4}>
            <p style={{ fontSize: "26px" }}>Pricing</p>
          </Col>
        </Row>

        <Row>
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
                  <Col md={12} lg={4} key={key}>
                    <div className="card mb-3">
                      <div
                        className="card-header"
                        style={{
                          backgroundColor:
                            planConfig[plan.plan_name].headerColor,
                          fontWeight: 500,
                          letterSpacing: "0.24px",
                          fontStyle: "normal",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {plan.plan_name} (
                        {plan.current_price_or_special_price ||
                        plan.plan_price > 0
                          ? plan.current_price_or_special_price > 0
                            ? `$ ${plan.current_price_or_special_price} / ${plan.plan_duration}`
                            : `$ ${plan.plan_price} / ${plan.plan_duration}`
                          : "Free"}
                        )
                        {planConfig[plan.plan_name].isToggleBtn && (
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
                        )}
                      </div>
                      <ul className="list-group list-group-flush align-items-start">
                        <li
                          className="list-group-item d-flex flex-row"
                          style={{ width: "100%", alignItems: "center" }}
                        >
                          {plan.description1 && (
                            <Fragment>
                              <Icon
                                size={30}
                                icon={
                                  planConfig[plan.plan_name].featureOne
                                    ? iosCheckmarkEmpty
                                    : iosCloseEmpty
                                }
                                style={{
                                  color: planConfig[plan.plan_name].featureOne
                                    ? "#009243"
                                    : "#da4b00",
                                  height: "fit-content",
                                  borderRadius: "50%",
                                  border: "1px solid #bababa",
                                }}
                              />

                              <div className="ml-3">{plan.description1}</div>
                            </Fragment>
                          )}
                        </li>
                        <li className="list-group-item d-flex flex-row">
                          {plan.description2 && (
                            <Fragment>
                              <Icon
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
                                  borderRadius: "50%",
                                  border: "1px solid #bababa",
                                  margin: "auto",
                                }}
                              />

                              <div className="ml-3">{plan.description2}</div>
                            </Fragment>
                          )}
                        </li>
                        <li className="list-group-item d-flex flex-row">
                          {plan.description3 && (
                            <Fragment>
                              <Icon
                                size={30}
                                icon={
                                  planConfig[plan.plan_name].featureThree
                                    ? iosCheckmarkEmpty
                                    : iosCloseEmpty
                                }
                                style={{
                                  color: planConfig[plan.plan_name].featureThree
                                    ? "#009243"
                                    : "#da4b00",
                                  height: "fit-content",
                                  borderRadius: "50%",
                                  border: "1px solid #bababa",
                                  margin: "auto",
                                }}
                              />

                              <div className="ml-3">{plan.description3}</div>
                            </Fragment>
                          )}
                        </li>
                        <li className="list-group-item d-flex flex-row">
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
                        </li>
                        <li className="list-group-item d-flex flex-row align-items-end">
                          {plan.plan_category ===
                          (activeSubscription &&
                            activeSubscription.plans.plan_category) ? (
                            <h6 style={{ color: "#bababa" }}>
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
                              <h6 style={{ color: "#bababa" }}>
                                Future Subscribed
                              </h6>
                            ) : (
                              <Button
                                color="primary"
                                style={{
                                  fontSize: "12px",
                                  padding: "8px 25px",
                                }}
                                onClick={() => handleBuySubscription(plan)}
                              >
                                {!loggedIn && plan.plan_category == 1
                                  ? "Subscribe for Free"
                                  : "BUY NOW"}
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

        {/*  <Row>
          {plans &&
            plans.map((plan, key) => (
              <Col md={12} lg={4} key={key}>
                {plan.plan_name == "Basic" ||
                (planConfig[plan.plan_name] &&
                  planConfig[plan.plan_name].planDuration ==
                    plan.plan_duration) ? (
                  <div className="card mb-3">
                    <div
                      className="card-header"
                      style={{
                        backgroundColor: planConfig[plan.plan_name].headerColor,
                        fontWeight: 500,
                        letterSpacing: "0.24px",
                        fontStyle: "normal",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {plan.plan_name} (
                      {plan.current_price_or_special_price ||
                      plan.plan_price > 0
                        ? plan.current_price_or_special_price > 0
                          ? `$ ${plan.current_price_or_special_price} / ${plan.plan_duration}`
                          : `$ ${plan.plan_price} / ${plan.plan_duration}`
                        : "Free"}
                      )
                      {planConfig[plan.plan_name].isToggleBtn && (
                        <Switch
                          onChange={(e) =>
                            planConfig[plan.plan_name].planSetter(e)
                          }
                          checked={
                            planConfig[plan.plan_name].planDuration == "Yearly"
                              ? true
                              : false
                          }
                          width={80}
                          uncheckedIcon={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 11,
                                color: "orange",
                                paddingRight: 13,
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
                      )}
                    </div>
                    <ul className="list-group list-group-flush align-items-start">
                      <li
                        className="list-group-item d-flex flex-row"
                        style={{ width: "100%", alignItems: "center" }}
                      >
                        {plan.description1 && (
                          <Fragment>
                            <Icon
                              size={30}
                              icon={
                                planConfig[plan.plan_name].featureOne
                                  ? iosCheckmarkEmpty
                                  : iosCloseEmpty
                              }
                              style={{
                                color: planConfig[plan.plan_name].featureOne
                                  ? "#009243"
                                  : "#da4b00",
                                height: "fit-content",
                                borderRadius: "50%",
                                border: "1px solid #bababa",
                              }}
                            />

                            <div className="ml-3">{plan.description1}</div>
                          </Fragment>
                        )}
                      </li>
                      <li className="list-group-item d-flex flex-row">
                        {plan.description2 && (
                          <Fragment>
                            <Icon
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
                                borderRadius: "50%",
                                border: "1px solid #bababa",
                                margin: "auto",
                              }}
                            />

                            <div className="ml-3">{plan.description2}</div>
                          </Fragment>
                        )}
                      </li>
                      <li className="list-group-item d-flex flex-row">
                        {plan.description3 && (
                          <Fragment>
                            <Icon
                              size={30}
                              icon={
                                planConfig[plan.plan_name].featureThree
                                  ? iosCheckmarkEmpty
                                  : iosCloseEmpty
                              }
                              style={{
                                color: planConfig[plan.plan_name].featureThree
                                  ? "#009243"
                                  : "#da4b00",
                                height: "fit-content",
                                borderRadius: "50%",
                                border: "1px solid #bababa",
                                margin: "auto",
                              }}
                            />

                            <div className="ml-3">{plan.description3}</div>
                          </Fragment>
                        )}
                      </li>
                      <li className="list-group-item d-flex flex-row align-items-end">
                        {plan.id ===
                        (activeSubscription && activeSubscription.plan_id) ? (
                          <h6 style={{ color: "#bababa" }}>
                            Current Subscription
                          </h6>
                        ) : plan.id >
                          (activeSubscription && activeSubscription.plan_id) ? (
                          plan.id ===
                          (futureSubscribed && futureSubscribed.plan_id) ? (
                            <h6 style={{ color: "#bababa" }}>
                              Future Subscribed
                            </h6>
                          ) : (
                            <Button
                              color="primary"
                              style={{ fontSize: "12px", padding: "8px 25px" }}
                              onClick={() => handleBuySubscription(plan)}
                            >
                              {!loggedIn && plan.id === 1
                                ? "Subscribe for free"
                                : "BUY NOW"}
                            </Button>
                          )
                        ) : (
                          <div> </div>
                        )}
                      </li>
                    </ul>
                  </div>
                ) : null}
              </Col>
            ))}

          <p style={{ marginLeft: "15px", fontWeight: "500" }}>
            If you are an organization, please write to{" "}
            <span
              style={{
                fontWeight: "bold",
                textDecoration: "underline",
                color: "#007bff",
              }}
            >
              <a href="mailto:sales@itmap.com">sales@itmap.com</a>
            </span>{" "}
            for group deals.{" "}
          </p>
        </Row> */}

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
      <BodyBackgroundColor color="#F4F6F6" />
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
