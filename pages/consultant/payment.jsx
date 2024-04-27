import React, { useState, useEffect, Fragment } from "react";
import { Space, Input, Radio, Divider, DatePicker } from "antd";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/future/image";
import InputBox from "../../components/form/inputBox";
import RadioBox from "../../components/form/radioBox";
import ConnectRadioBox from "../../components/form/connectRadio";
import CustomSelect from "../../components/form/customSelect";
import moment from "moment";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import { crudActions, loaderActions } from "../../_actions";
import { crudService } from "../../_services";
import AddTitleIcon from "../../public/new_images/AddTitleIcon.svg";
import DescriptionIcon from "../../public/new_images/DescriptionIcon.svg";
import CompletionDateIcon from "../../public/new_images/CompletionDateIcon.svg";
import myImageLoader from "../../components/imageLoader";
import { PayPalButton } from "react-paypal-button-v2";
import Link from "next/link";
import { isBrowser, isMobile } from "react-device-detect";
import themeConfig from "../../config/themeConfig";

const createMeeting = ({
  consultant,
  getAllCrud,
  duration,
  time_zone,
  showLoader,
  hideLoader,
  visitor_credit,
}) => {
  const { TextArea } = Input;
  const [meetingData, setMeetingData] = useState();

  const consultantsID = sessionStorage.getItem("consultantID");
  const [isPaypalOpen, setIsPaypalOpen] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [totalCredit, setTotalCredit] = useState();
  const [purchaseHours, setPurchaseHours] = useState(0);
  const [isTermCheckedTwo, setIsTermCheckedTwo] = useState(false);
  const [isPaypalOpenTwo, setIsPaypalOpenTwo] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const [visitorCredit, setVisitorCredit] = useState();

  // console.log("meetingData", meetingData);

  const date = moment().format("YYYY-MM-DD");

  const number = moment
    .parseZone(meetingData?.meetingTiming?.booking_utc_time)
    .format("HH:mm");

  useEffect(() => {
    getAllCrud("visitor_credit", "visitor_credit");
  }, [isLoadingTwo, isLoading]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("meetingDetail"));
    setMeetingData(data);
    const creditData = visitor_credit && visitor_credit[0]?.credit;
    setVisitorCredit(creditData);
  }, [isLoadingTwo, visitor_credit]);

  useEffect(() => {
    if (meetingData?.totalPrice > visitorCredit) {
      setTotalCredit(meetingData?.totalPrice - visitorCredit);
    } else if (
      visitorCredit == undefined ||
      visitorCredit == null ||
      visitorCredit == 0
    ) {
      setTotalCredit(meetingData?.totalPrice);
    }
  }, [meetingData]);

  const scheduleAPICalling = (details, data) => {
    showLoader();
    let url = `schedule_booking`;
    let payload = {};
    let transaction = {};
    setIsLoading(true);
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    (payload["consultant_id"] = consultantsID),
      (payload["amount_per_hour"] = meetingData.rate),
      (payload["booking_date"] = meetingData.bookingDate.value),
      (payload["duration"] = meetingData.duration),
      (payload["skill"] = meetingData.skill),
      (payload["is_credit"] = true),
      (payload["remarks"] = "yes"),
      (payload["booking_time"] = number),
      (payload["type"] = "Online"),
      (payload["sub_amount"] = meetingData.totalPrice),
      (payload["taxes"] = 0),
      (payload["total_amount"] = meetingData.totalPrice),
      (payload["booking_utc_time"] =
        meetingData?.meetingTiming?.booking_utc_time),
      (payload["visitor_time_zone_id"] = meetingData.timeZone.id),
      crudService
        ._create(url, payload)
        .then((response) => {
          setIsLoading(false);
          setIsPaypalOpen(false);
          if (response.status === 200) {
            sessionStorage.setItem("booking_historyID", response.data.data.id);
            Router.push(`details`);
            hideLoader();
          } else {
            console.log("Something wrong...!");
          }
        })
        .catch((error) => console.log("error", error));
  };
  const bookingByCredits = (details, data) => {
    showLoader();
    let url = `credit_purchase`;
    let payload = {};
    let transaction = {};
    setIsLoadingTwo(true);
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

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
          if (response.status === 200) {
            window.location.reload();
            hideLoader();
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
    // setError(details);
  };

  const crateMeeting = (details, data) => {
    showLoader();
    let url = `schedule_booking`;
    let payload = {};
    let transaction = {};
    setIsLoading(true);
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    payload["consultant_id"] = consultantsID;
    payload["amount_per_hour"] = meetingData.rate;
    payload["booking_date"] = meetingData.bookingDate.value;
    payload["duration"] = meetingData.duration;
    payload["skill"] = meetingData.skill;
    payload["is_credit"] = false;
    payload["remarks"] = "";
    payload["booking_time"] = number;
    payload["type"] = "Online";
    payload["sub_amount"] = meetingData.totalPrice;
    payload["taxes"] = 0;
    payload["total_amount"] = meetingData.totalPrice;
    payload["paypal_transaction_id"] = data.orderID;
    payload["transaction_details"] = JSON.stringify(details);
    payload["transaction_date"] = date;
    payload["booking_utc_time"] = meetingData?.meetingTiming?.booking_utc_time;
    payload["visitor_time_zone_id"] = meetingData.timeZone.id;
    crudService
      ._create(url, payload)
      .then((response) => {
        setIsLoading(false);
        setIsPaypalOpen(false);
        if (response.status === 200) {
          setIsPaymentDone(true);
          sessionStorage.setItem("booking_historyID", response.data.data.id);

          Router.push(`details`);
        } else {
          console.log("Something wrong...!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onSuccessOneTimePayment = (details, data) => {
    crateMeeting(details, data);
  };
  const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const cancelTransaction = (details) => {
    console.log("Cancelled", details);
  };
  const failTransaction = (details) => {
    console.log("Failed", details);
    // setError(details);
  };

  return (
    <section className="consultant-page-section payment">
      <Container>
        <div className="page-content">
          <div className="left-section">
            <div className="heading-section">
              <h5 className="heading-text">Confirm meeting</h5>
            </div>
            <div className="meeting-date-section wrapper">
              <div className="title-section">
                <Image
                  loader={myImageLoader}
                  src={CompletionDateIcon}
                  alt=""
                  layout="raw"
                />
                <div className="date">{meetingData?.bookingDate?.label}</div>
                {isBrowser && (
                  <div className="time">{meetingData?.meetingTiming?.name}</div>
                )}
              </div>
            </div>
            {isMobile && (
              <div
                className="meeting-date-section wrapper"
                style={{ marginTop: "1rem" }}
              >
                <div className="title-section">
                  <Image
                    loader={myImageLoader}
                    src={CompletionDateIcon}
                    alt=""
                    layout="raw"
                  />
                  <div className="time">{meetingData?.meetingTiming?.name}</div>
                </div>
              </div>
            )}
            <h5 className="time-zone-label">
              ({meetingData?.timeZone.offset}) {meetingData?.timeZone.zone}
            </h5>
            <div className="meeting-date-section wrapper">
              <div className="meeting-minute-section">
                <label htmlFor="">Skill</label>
                <div className="duration">{meetingData?.skill}</div>
              </div>

              <div className="meeting-minute-section">
                <label htmlFor="">Duration</label>
                <div className="duration">{meetingData?.duration} min</div>
              </div>
            </div>

            <Divider />
            <div className="estimate-section">
              <div className="estimate">
                <h5 className="title">Estimate</h5>
                <p className="text">You'll be billed by the minute</p>
              </div>
              <div className="amount">
                <h5 className="rate">${meetingData?.totalPrice}</h5>
                <p className="text">Inclusive of {themeConfig.appName} fees</p>
              </div>
            </div>

            {!isPaymentDone && (
              <div
                className="custom-btn with-bg"
                onClick={() => setIsPaypalOpen(true)}
              >
                Pay with PayPal
              </div>
            )}

            {/* payment using wallet */}

            <div className="estimate-section pay-with-credit">
              <div className="estimate">
                <h5 className="title">
                  {/* Pay ${meetingData?.totalPrice} using Wallet */}
                  Available Credit Balance
                </h5>
              </div>
              <div className="amount">
                <h5 className="rate">
                  $
                  {visitor_credit && visitorCredit == null
                    ? 0
                    : visitor_credit && visitorCredit}
                </h5>
                {/* <p className="text">Available Credit Balance</p> */}
                {/* <p className="text">Inclusive of {themeConfig.appName} fees</p> */}
              </div>
            </div>

            {visitor_credit && visitorCredit >= meetingData?.totalPrice && (
              <div className="custom-btn with-bg" onClick={scheduleAPICalling}>
                Pay with Wallet
              </div>
            )}

            {visitorCredit == undefined ||
            visitorCredit < meetingData?.totalPrice ? (
              <div className="estimate-section" style={{ marginTop: "1rem" }}>
                <div className="estimate">
                  <h5 className="title">
                    <p>
                      Add{" "}
                      <span style={{ fontWeight: "500", fontSize: "18px" }}>
                        ${totalCredit}
                      </span>{" "}
                      to make payment through wallet
                    </p>

                    <br />
                  </h5>
                </div>
              </div>
            ) : (
              ""
            )}

            {visitorCredit >= meetingData?.totalPrice ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  columnGap: "10px",
                }}
              >
                <Input
                  type={"number"}
                  placeholder="Enter Credits"
                  // placeholder={`Purchase ${
                  //   totalCredit == null ? "" : `$ ${totalCredit}`
                  // } Credits`}
                  onChange={(e) => setPurchaseHours(e.target.value)}
                  style={{
                    maxWidth: "200px",
                    padding: "15px 22px",
                    borderRadius: "10px",
                  }}
                />
                <div
                  className="custom-btn with-bg"
                  style={{
                    pointerEvents: purchaseHours > 0 ? "unset" : "none",
                    opacity: purchaseHours > 0 ? 1 : 0.5,
                  }}
                  onClick={() =>
                    purchaseHours > 0 ? setIsPaypalOpenTwo(true) : ""
                  }
                >
                  Buy Credits
                </div>
              </div>
            )}

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
                        onChange={() => setIsTermCheckedTwo(!isTermCheckedTwo)}
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
          </div>
          <div className="right-section">
            <div className="card">
              <div className="self-description-section">
                <div className="logo">
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    preview="false"
                    src={
                      meetingData?.profile.image
                        ? meetingData?.profile.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="profile"
                  />
                </div>
                <h5 className="title">
                  {meetingData?.profile.name} {meetingData?.profile.lastName}
                </h5>
                <p className="address">
                  <span className="icon">
                    <EnvironmentOutlined />
                  </span>
                  {meetingData?.profile.country}
                </p>
                <p className="designation">{meetingData?.profile.summary}</p>
                <div className="rate-detail">
                  {/* <p>Starts at</p> */}

                  <p>
                    Starts at{" "}
                    {meetingData?.profile.is_company ? (
                      <Fragment>
                        <span>$ 5000</span>/Project
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span>$ {meetingData?.profile.rate}</span>/Hour
                      </Fragment>
                    )}
                    <br />
                    (all inclusive)
                  </p>
                </div>
              </div>
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
                amount={meetingData?.totalPrice}
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
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const {
    consultant,
    booking_history,
    duration,
    slots,
    time_zone,
    visitor_credit,
  } = state;
  return {
    consultant,
    booking_history,
    duration,
    slots,
    time_zone,
    visitor_credit,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(createMeeting)
);
