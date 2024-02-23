import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import {
  Button,
  Container,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Image, Rate, Space, Spin, Tabs } from "antd";
import { BrowserView, isBrowser } from "react-device-detect";
import { crudService } from "../../_services";
import Link from "next/link";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";

const visitorCredits = ({ visitor_credit, getAllCrud, postAPI }) => {
  const [isPaypalOpen, setIsPaypalOpen] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [inputCredits, setInputCredits] = useState(0);
  useEffect(() => {
    getVisitorCredit();
  }, []);

  const getVisitorCredit = () => {
    getAllCrud("visitor_credit", "visitor_credit");
  };

  // payment functions
  const date = moment().format("YYYY-MM-DD");

  const saveSubscription = (details, data) => {
    let url = `credit_purchase`;
    let payload = {};
    let transaction = {};
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    console.log("data", data);
    console.log("details", details);

    (payload["purchased_credit"] = inputCredits),
      (payload["amount_paid"] = inputCredits),
      (payload["paypal_transcation_id"] = data.orderID),
      (payload["purchase_date"] = date),
      (payload["transaction_details"] = JSON.stringify(details)),
      (payload["type"] = "Online"),
      crudService
        ._create(url, payload)
        .then((response) => {
          setIsPaypalOpen(false);
          setInputCredits(0);
          if (response.status === 200) {
            console.log("response", response);
            getVisitorCredit();
            getVisitorCredit();
          } else {
            console.log("Something wrong...!");
          }
        })
        .catch((error) => console.log("error", error));
  };

  const onSuccessOneTimePayment = (details, data) => {
    saveSubscription(details, data);
  };
  const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const cancelTransaction = (details) => {
    console.log("Cancelled", details);
  };
  const failTransaction = (details) => {
    console.log("Failed", details);
    setError(details);
  };
  console.log("visitor_credit", visitor_credit);
  return (
    <>
      {/* {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size="large" style={{ padding: "65px 0" }}>
            <Spin size="large" tip="Loading..." />
          </Space>
        </div>
      ) : ( */}
      <>
        {visitor_credit && (
          <>
            <div
              style={{
                width: "85%",
                margin: "20px auto",
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "10px",
                minHeight: "350px",
              }}
            >
              <div>
                <div
                // style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <p>Valid Till : {visitor_credit?.valid_till} 29-03-2025</p> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // marginTop: "50px",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p>
                    Current Balance : ${" "}
                    {visitor_credit?.[0]?.credit
                      ? visitor_credit?.[0]?.credit
                      : 0}
                  </p>

                  <Input
                    style={{
                      boxShadow: "0 3px 6px 0 rgba(0,0,0,.16)",
                      width: "200px",
                    }}
                    placeholder={"Enter credit to buy"}
                    onChange={(e) => setInputCredits(e.target.value)}
                  />
                  <br />
                  <Button
                    style={{
                      // padding: "8px 25px",
                      width: "200px",
                      pointerEvents: inputCredits > 0 ? "unset" : "none",
                      opacity: inputCredits > 0 ? 1 : 0.5,
                      border: "1px solid #333",
                    }}
                    onClick={() => setIsPaypalOpen(true)}
                  >
                    Buy Credits
                  </Button>
                </div>
              </div>
            </div>

            <Modal
              isOpen={isPaypalOpen}
              toggle={() => setIsPaypalOpen(false)}
              className=""
              backdrop="static"
              keyboard={false}
            >
              <ModalHeader
                toggle={() => setIsPaypalOpen(false)}
                style={{ backgroundColor: "#d1eaff" }}
              >
                Purchase Credit
              </ModalHeader>
              <ModalBody
                style={{
                  width: "80%",
                  margin: "50px auto",
                }}
              >
                <div>
                  <span>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={isTermChecked}
                        onChange={() => setIsTermChecked(!isTermChecked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        By accepting terms & conditions,
                        <br /> You are agree to our{" "}
                        <Link href={`/content/terms-and-conditions`} passHref>
                          <a target="_blank">Terms & Conditions</a>
                        </Link>
                      </label>
                    </div>
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "50px",
                    opacity: isTermChecked ? "1" : "0.5",
                    pointerEvents: isTermChecked ? "unset" : "none",
                  }}
                >
                  <PayPalButton
                    amount={inputCredits}
                    onSuccess={(details, data) => {
                      onSuccessOneTimePayment(details, data);
                    }}
                    options={{
                      clientId: paypalId,
                    }}
                    shippingPreference={"NO_SHIPPING"}
                    onCancel={(data) => {
                      cancelTransaction(data);
                    }}
                    catchError={(data) => {
                      failTransaction(data);
                    }}
                    onError={(data) => {
                      failTransaction(data);
                      console.log("failed tns", data);
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" onClick={() => setIsPaypalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <BodyBackgroundColor color={isBrowser ? "#fff" : "#F4F6F6"} />
          </>
        )}
      </>
      {/* )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  const { visitor_credit, credit_purchase } = state;
  return { visitor_credit, credit_purchase };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  // postAPI: crudActions._create,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(visitorCredits)
);
