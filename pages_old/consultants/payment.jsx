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
import { Tabs, Image, Space, Spin, Rate } from "antd";
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

const consultantsPayment = ({ getAllCrud, consultant }) => {
  const [isPaypalOpen, setIsPaypalOpen] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [sentUserData, setSentUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

            Router.push(`booking-details`);
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
          {consultant?.map((data) => (
            <Container
              style={{ width: isBrowser ? "85%" : "100%", margin: "0px auto" }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: isBrowser ? "unset" : "column",
                    marginTop: isBrowser ? "0px" : "10px",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #333",
                      borderRadius: "10px",
                      width: isBrowser ? "50%" : "100%",
                      padding: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                    <p style={{ marginTop: "15px" }}>{data.profile_summary}</p>
                    <p style={{ marginTop: "15px" }}>{data.tags}</p>
                  </div>
                  <div
                    style={{
                      border: "1px solid #333",
                      borderRadius: "10px",
                      width: isBrowser ? "50%" : "100%",
                      marginLeft: isBrowser ? "10px" : "0px",
                      marginTop: isBrowser ? "0px" : "10px",
                      padding: "10px",
                    }}
                  >
                    <p style={{ marginTop: "15px" }}>
                      Skill : {sentUserData.skill}
                    </p>
                    <p>Booking Date : {sentUserData.bookingDate}</p>
                    <p>Duration : {sentUserData.timeSlot} min</p>
                    <p>Start Time : {sentUserData?.startTiming?.startTime}</p>
                    <p>End Time : {sentUserData?.startTiming?.endTime}</p>
                    <p>Rate : $ {sentUserData.rate} /min</p>
                    <p>Total Amount : $ {sentUserData.pricing}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Link href={"payment-options"}>
                  <Button
                    style={{ padding: "10px 30px", border: "1px solid #333" }}
                    // onClick={() => setIsPaypalOpen(true)}
                  >
                    Confirm
                  </Button>
                </Link>
              </div>

              <Modal
                isOpen={isPaypalOpen}
                // toggle={() => setIsPaypalOpen(false)}
                className=""
                backdrop="static"
                keyboard={false}
              >
                <ModalHeader
                  // toggle={() => setIsPaypalOpen(false)}
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
          ))}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { booking_history, schedule_booking, consultant } = state;
  return {
    booking_history,
    schedule_booking,
    consultant,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  getAllPost: crudActions._create,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantsPayment)
);
