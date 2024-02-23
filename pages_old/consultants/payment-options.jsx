import React, { useEffect, useState } from "react";
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
import { Tabs, Image, Space, Spin, Rate, Input } from "antd";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import { PayPalButton } from "react-paypal-button-v2";
import { useRouter } from "next/router";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { crudService } from "../../_services";
import moment from "moment";
import Router from "next/router";
import Link from "next/link";

const consultantsPayment = ({ getAllCrud, consultant, visitor_credit }) => {
  const [isPaypalOpen, setIsPaypalOpen] = useState(false);
  const [isPaypalOpenTwo, setIsPaypalOpenTwo] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [isTermCheckedTwo, setIsTermCheckedTwo] = useState(false);
  const [sentUserData, setSentUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseHours, setPurchaseHours] = useState(0);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const [error, setError] = useState(false);
  const [totalCredit, setTotalCredit] = useState();

  useEffect(() => {
    let sentUserData = localStorage.getItem("usersData");
    if (sentUserData) {
      setSentUserData(JSON.parse(sentUserData));
    }
  }, []);

  console.log("sentUserData", sentUserData);

  const date = moment().format("YYYY-MM-DD");

  const consultantsID = sessionStorage.getItem("consultantID");
  const number = moment(sentUserData.startTiming?.startTime, ["h:mm A"]).format(
    "HH:mm"
  );
  // console.log("number", number);
  const saveSubscription = (details, data) => {
    let url = `schedule_booking`;
    let payload = {};
    let transaction = {};
    setIsLoading(true);
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    console.log("data", data);
    console.log("details", details);

    (payload["consultant_id"] = consultantsID),
      (payload["amount_per_hour"] = sentUserData.rate),
      (payload["booking_date"] = sentUserData.bookingDate),
      (payload["duration"] = sentUserData.timeSlot),
      (payload["skill"] = sentUserData.skill),
      (payload["is_credit"] = false),
      (payload["remarks"] = "yes"),
      (payload["booking_time"] = number),
      (payload["type"] = "Online"),
      (payload["sub_amount"] = sentUserData.pricing),
      (payload["taxes"] = 0),
      (payload["total_amount"] = sentUserData.pricing),
      (payload["paypal_transaction_id"] = data.orderID),
      (payload["transaction_details"] = JSON.stringify(details)),
      (payload["transaction_date"] = date),
      (payload["booking_utc_time"] = sentUserData.startTiming.booking_utc_time),
      (payload["visitor_time_zone_id"] = sentUserData.visitor_time_zone_id),
      crudService
        ._create(url, payload)
        .then((response) => {
          setIsLoading(false);
          setIsPaypalOpen(false);
          if (response.status === 200) {
            console.log("response", response);
            sessionStorage.setItem("booking_historysID", response.data.data.id);

            Router.push(`/consultants/booking-details`);
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

  useEffect(() => {
    if (consultantsID) {
      getAllCrud("consultant", "consultants", {
        consultant_id: consultantsID,
      });
    }
  }, []);

  console.log("consultant", consultant);

  // for visitor purchase

  useEffect(() => {
    getAllCrud("visitor_credit", "visitor_credit");
  }, [isLoadingTwo]);

  const scheduleAPICalling = (details, data) => {
    let url = `schedule_booking`;
    let payload = {};
    let transaction = {};
    setIsLoading(true);
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    console.log("data", data);
    console.log("details", details);

    (payload["consultant_id"] = consultantsID),
      (payload["amount_per_hour"] = sentUserData.rate),
      (payload["booking_date"] = sentUserData.bookingDate),
      (payload["duration"] = sentUserData.timeSlot),
      (payload["skill"] = sentUserData.skill),
      (payload["is_credit"] = true),
      (payload["remarks"] = "yes"),
      (payload["booking_time"] = number),
      (payload["type"] = "Online"),
      (payload["sub_amount"] = sentUserData.pricing),
      (payload["taxes"] = 0),
      (payload["total_amount"] = sentUserData.pricing),
      (payload["booking_utc_time"] = sentUserData.startTiming.booking_utc_time),
      (payload["visitor_time_zone_id"] = sentUserData.visitor_time_zone_id),
      crudService
        ._create(url, payload)
        .then((response) => {
          setIsLoading(false);
          setIsPaypalOpen(false);
          if (response.status === 200) {
            console.log("response", response);
            sessionStorage.setItem("booking_historysID", response.data.data.id);

            Router.push(`/consultants/booking-details`);
          } else {
            console.log("Something wrong...!");
          }
        })
        .catch((error) => console.log("error", error));
  };
  const bookingByCredits = (details, data) => {
    let url = `credit_purchase`;
    let payload = {};
    let transaction = {};
    setIsLoadingTwo(true);
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    console.log("data", data);
    console.log("details", details);

    (payload["purchased_credit"] = purchaseHours),
      (payload["amount_paid"] = purchaseHours),
      (payload["paypal_transcation_id"] = data.orderID),
      (payload["purchase_date"] = date),
      (payload["transaction_details"] = JSON.stringify(details)),
      (payload["type"] = "Online"),
      crudService
        ._create(url, payload)
        .then((response) => {
          setIsLoadingTwo(false);
          setIsPaypalOpenTwo(false);
          setPurchaseHours(0);
          if (response.status === 200) {
            console.log("response", response);
            // console.log("schedule APi fn is called");
            // scheduleAPIWrapper();
          } else {
            console.log("Something wrong...!");
          }
        })
        .catch((error) => console.log("error", error));
  };

  const onSuccessOneTimeCreditPayment = (details, data) => {
    bookingByCredits(details, data);
  };
  const paypalIdTwo = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const cancelCreditTransaction = (details) => {
    console.log("Cancelled", details);
  };
  const failCreditTransaction = (details) => {
    console.log("Failed", details);
    setError(details);
  };

  useEffect(() => {
    if (sentUserData?.pricing > visitor_credit && visitor_credit[0]?.credit) {
      setTotalCredit(sentUserData?.pricing - visitor_credit[0]?.credit);
    } else if (
      visitor_credit[0]?.credit == undefined ||
      visitor_credit[0]?.credit == null
    ) {
      setTotalCredit(sentUserData?.pricing);
    }
  }, [sentUserData]);

  console.log("totalCredit", totalCredit);

  return (
    <>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size="large" style={{ padding: "65px 0" }}>
            <Spin size="large" tip="Loading..." />
          </Space>
        </div>
      ) : (
        <>
          {visitor_credit && (
            <Container
              style={{
                width: isBrowser ? "85%" : "100%",
                margin: "0px auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  flexDirection: isBrowser ? "unset" : "column",
                }}
              >
                <div
                  style={{
                    width: isBrowser ? "50%" : "100%",
                    border: "1px solid #333",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <>
                    {consultant?.map((data) => (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            width={100}
                            height={100}
                            alt="icon"
                            preview={false}
                            style={{ borderRadius: "50px" }}
                            src={
                              data.image == null
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                                : data.image
                            }
                          />
                          <div style={{ marginLeft: "30px" }}>
                            {`${data.first_name} ${
                              data.last_name == null ? "" : data.last_name
                            }`}
                            <div>
                              <span style={{ marginRight: "5px" }}>
                                <Image
                                  width={15}
                                  height={18}
                                  alt="location-icon"
                                  preview={false}
                                  src={
                                    "https://cdn-icons-png.flaticon.com/128/9077/9077975.png"
                                  }
                                />
                              </span>
                              {data?.country?.name}
                            </div>
                            <Rate
                              allowHalf
                              disabled={true}
                              defaultValue={data.avg_rating}
                            />
                          </div>
                        </div>
                        <p style={{ marginTop: "15px" }}>
                          {data.profile_summary}
                        </p>
                        <p style={{ marginTop: "15px" }}>{data.tags}</p>
                      </div>
                    ))}
                    <h3>Booking Details</h3>
                    <p style={{ marginTop: "15px" }}>
                      Skill : {sentUserData.skill}
                    </p>
                    <p>Booking Date : {sentUserData.bookingDate}</p>
                    <p>Duration : {sentUserData.timeSlot} min</p>
                    <p>Start Time : {sentUserData?.startTiming?.startTime}</p>
                    <p>End Time : {sentUserData?.startTiming?.endTime}</p>
                    <p>Rate : $ {sentUserData.rate} /min</p>
                    <p>Total Amount : $ {sentUserData.pricing}</p>
                  </>
                </div>

                <div
                  style={{
                    width: isBrowser ? "50%" : "100%",
                    border: "1px solid #333",
                    borderRadius: "10px",
                    padding: "10px",
                    marginLeft: isBrowser ? "20px" : "0px",
                    marginTop: isBrowser ? "0px" : "10px",
                  }}
                >
                  <h3>Pay ${sentUserData.pricing} using Wallet</h3>
                  <p>
                    Available Credit Balance :{" "}
                    <span style={{ fontWeight: "500", fontSize: "16px" }}>
                      $
                      {visitor_credit[0]?.credit == null
                        ? 0
                        : visitor_credit[0]?.credit}
                    </span>
                  </p>

                  {totalCredit && (
                    <p>
                      Add{" "}
                      <span style={{ fontWeight: "500", fontSize: "18px" }}>
                        ${totalCredit}
                      </span>{" "}
                      to make payment thought wallet
                    </p>
                  )}

                  <Input
                    type={"number"}
                    placeholder={`Purchase ${
                      totalCredit == null ? "" : `$ ${totalCredit}`
                    } Credits`}
                    // defaultValue={totalCredit && totalCredit}
                    onChange={(e) => setPurchaseHours(e.target.value)}
                    style={{ maxWidth: "200px", padding: "10px" }}
                  />
                  <br />
                  <Button
                    style={{
                      padding: "10px 30px",
                      pointerEvents: purchaseHours > 0 ? "unset" : "none",
                      opacity: purchaseHours > 0 ? 1 : 0.5,
                      border: "1px solid #333",
                      marginTop: "20px",
                    }}
                    onClick={() => setIsPaypalOpenTwo(true)}
                  >
                    Buy Credits
                  </Button>
                  <br />
                  <br />
                  {visitor_credit &&
                    visitor_credit[0]?.credit >= sentUserData?.pricing && (
                      <Button
                        style={{
                          padding: "10px 30px",
                          border: "1px solid #333",
                        }}
                        onClick={scheduleAPICalling}
                      >
                        Pay ${sentUserData?.pricing} Now
                      </Button>
                    )}
                  <br />
                  <br />
                  <h3>Pay ${sentUserData.pricing} using Paypal</h3>
                  <Button
                    style={{ padding: "10px 30px", border: "1px solid #333" }}
                    onClick={() => setIsPaypalOpen(true)}
                  >
                    Book Consultant
                  </Button>
                  {/* {purchaseHours > 10 && <a href="#">Connect with the sales</a>} */}
                </div>
              </div>
              {/* for buying credits */}
              <Modal
                isOpen={isPaypalOpenTwo}
                toggle={() => setIsPaypalOpenTwo(false)}
                className=""
                backdrop="static"
                keyboard={false}
              >
                <ModalHeader
                  toggle={() => setIsPaypalOpenTwo(false)}
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
                          checked={isTermCheckedTwo}
                          onChange={() =>
                            setIsTermCheckedTwo(!isTermCheckedTwo)
                          }
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
                      opacity: isTermCheckedTwo ? "1" : "0.5",
                      pointerEvents: isTermCheckedTwo ? "unset" : "none",
                    }}
                  >
                    <PayPalButton
                      amount={purchaseHours}
                      onSuccess={(details, data) => {
                        onSuccessOneTimeCreditPayment(details, data);
                      }}
                      options={{
                        clientId: paypalIdTwo,
                      }}
                      shippingPreference={"NO_SHIPPING"}
                      onCancel={(data) => {
                        cancelCreditTransaction(data);
                      }}
                      catchError={(data) => {
                        failCreditTransaction(data);
                      }}
                      onError={(data) => {
                        failCreditTransaction(data);
                        console.log("failed tns", data);
                      }}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="warning"
                    onClick={() => setIsPaypalOpenTwo(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              {/* for paypal payment */}

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
                  Schedule Booking
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
                      amount={sentUserData.pricing}
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
                  <Button
                    color="warning"
                    onClick={() => setIsPaypalOpen(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <BodyBackgroundColor color="#fff" />
            </Container>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { booking_history, schedule_booking, consultant, visitor_credit } =
    state;
  return {
    booking_history,
    schedule_booking,
    consultant,
    visitor_credit,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  getAllPost: crudActions._create,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantsPayment)
);
