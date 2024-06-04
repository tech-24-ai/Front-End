import React, { useState, useEffect, Fragment } from "react";
import { Button, Input, TextArea } from "antd";
import {
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Image from "next/future/image";
import InputBox from "../../components/form/inputBox";
import RadioBox from "../../components/form/radioBox";
import ConnectRadioBox from "../../components/form/connectRadio";
import CustomSelect from "../../components/form/customSelect";
import moment from "moment";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import { crudActions, loaderActions, alertActions } from "../../_actions";
import { crudService } from "../../_services";
import AddTitleIcon from "../../public/new_images/AddTitleIcon.svg";
import DescriptionIcon from "../../public/new_images/DescriptionIcon.svg";
import CompletionDateIcon from "../../public/new_images/CompletionDateIcon.svg";
import DualProfileIcon from "../../public/new_images/DualProfileIcon.svg";
import myImageLoader from "../../components/imageLoader";
import ProtectionIcon from "../../public/new_images/ProtectionIcon.svg";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Link from "next/link";
import { isMobile, isBrowser } from "react-device-detect";
import themeConfig from "../../config/themeConfig";

const consultantDetails = ({
  consultant,
  getAllCrud,
  booking_history,
  warning,
  showLoader,
  hideLoader,
  booking_cancel,
  success,
  error,
  downloadInvoice,
  authentication,
}) => {
  const [profile, setProfile] = useState();
  const [finalDate, setFinalDate] = useState();
  const [scheduleDate, setScheduleDate] = useState();
  const [startTime, setStartTime] = useState();
  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [reloadComponent, setReloadComponent] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (!authentication.loggedIn) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    const booking_historyID = sessionStorage.getItem("booking_historyID");
    if (booking_historyID) {
      getAllCrud("booking_history", "booking_history", {
        booking_id: booking_historyID,
      });
    }
  }, [reloadComponent]);

  const findMinRate = (rateArray) => {
    if (!rateArray.length) {
      return 0;
    }
    const rateList = rateArray.map((data) => data.amount_per_hour);
    const minRate = Math.min(...rateList);
    return minRate;
  };

  const goToMessagePage = () => {
    if (booking_history && booking_history.length) {
      const { chat_history, consultant } = booking_history[0];
      const profile = {
        fullName: `${consultant.first_name} ${
          consultant.last_name ? consultant.last_name : ""
        }`,
        consultant_id: consultant.id,
        country: consultant?.country.name,
        summary: consultant.profile_summary,
        image: consultant.image,
        minRate: findMinRate(consultant.rates),
      };
      const messageDetail = {
        chat_history,
        consultant: profile,
      };
      localStorage.setItem("messageDetail", JSON.stringify(messageDetail));
      Router.push({
        pathname: "message",
      });
      // console.log("messageDetail", messageDetail);
    } else {
      warning("Oops, Something went wrong!");
    }
  };

  useEffect(() => {
    const profileData = {};
    const lastName = "";
    if (booking_history && booking_history.length) {
      const { consultant } = booking_history[0];
      profileData = {
        lastName: consultant.last_name == "null" ? "" : consultant.last_name,
        name: `${consultant.first_name} ${lastName}`,
        country: consultant.country.name,
        summary: consultant.profile_summary,
        image: consultant.image,
      };
      setProfile(profileData);
    }
  }, [booking_history]);

  // payment date and time
  useEffect(() => {
    // if (booking_history?.length == 1) {
    const date =
      booking_history && booking_history[0]?.transaction?.transaction_date;
    const data = moment(date).local().format("dddd, MMMM Do YYYY");
    setFinalDate(data);

    const scheduleDateObj =
      booking_history && booking_history[0]?.booking_utc_time;

    const scheduleDateData = moment(scheduleDateObj)
      .local()
      .format("dddd, MMMM Do YYYY");
    setScheduleDate(scheduleDateData);
    // }

    const offset =
      booking_history &&
      booking_history[0]?.timezone?.offset.replace("UTC ", "");

    console.log("offset", offset);
    console.log("scheduleDateObj", scheduleDateObj);
    const number = moment
      .parseZone(scheduleDateObj != null && scheduleDateObj)
      // .format("HH:mm")
      .utcOffset(offset != null && offset)
      .format("LT");

    console.log("number", number);
    setStartTime(number);
  }, [booking_history?.length]);

  let booking = booking_history && booking_history[0];

  // console.log("consultant-details", consultant);
  // console.log("booking_history-details", booking_history);

  const goToFeedbackPage = () => {
    if (booking_history && booking_history.length) {
      const { consultant } = booking_history[0];
      const profile = {
        fullName: `${consultant.first_name} ${
          consultant.last_name ? consultant.last_name : ""
        }`,
        consultant_id: consultant.id,
        country: consultant?.country.name,
        summary: consultant.profile_summary,
        image: consultant.image,
        minRate: findMinRate(consultant.rates),
        booking: booking_history[0],
        scheduleDate: scheduleDate,
        startTime: startTime,
      };
      const feedbackDetail = {
        consultant: profile,
      };
      localStorage.setItem("feedbackData", JSON.stringify(feedbackDetail));
      Router.push({
        pathname: "feedback",
      });
    } else {
      warning("Oops, Something went wrong!");
    }
  };

  const gotoRatingPage = () => {
    if (booking_history && booking_history.length) {
      const { consultant } = booking_history[0];
      const profile = {
        fullName: `${consultant.first_name} ${
          consultant.last_name ? consultant.last_name : ""
        }`,
        consultant_id: consultant.id,
        country: consultant?.country.name,
        summary: consultant.profile_summary,
        image: consultant.image,
        minRate: findMinRate(consultant.rates),
        booking: booking_history[0],
        scheduleDate: scheduleDate,
        startTime: startTime,
      };
      const ratingDetail = {
        consultant: profile,
      };
      localStorage.setItem("ratingData", JSON.stringify(ratingDetail));
      Router.push({
        pathname: "rating",
      });
    } else {
      warning("Oops, Something went wrong!");
    }
  };

  // cancel booking
  const cancelBooking = () => {
    crudService
      ._create(
        "booking/cancel",
        {
          booking_id: booking?.id,
          reason: reason,
        },
        showLoader()
      )
      .then((res) => {
        if (res.status == 200) {
          success("Booking cancelled successfully");
          setReloadComponent(true);
        }
      });
    toggle();

    console.log("booking_cancel", booking_cancel);
  };

  return (
    <section className="consultant-details-page-section">
      <Container>
        <div className="flex-container">
          <div className="right-section">
            <div className="heading-container">
              <h5 className="heading-text">Meeting details</h5>
              <div className="button-container">
                <div
                  className="custom-btn with-bg"
                  onClick={() => goToMessagePage()}
                >
                  Message
                </div>
                {booking?.booking_status == "Confirmed" && (
                  <div className="custom-btn with-bg">
                    <a target="_blank" href={booking?.meeting_link}>
                      Join
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="meeting-date-section wrapper">
              <div className="title-section">
                <Image
                  loader={myImageLoader}
                  src={CompletionDateIcon}
                  alt=""
                  layout="raw"
                />
                <div>
                  <div className="date">{scheduleDate}</div>
                  <h5 className="timeZone">
                    ({booking?.timezone?.offset}) {booking?.timezone?.zone}
                  </h5>
                </div>
                <div>
                  <div className="time">{startTime}</div>
                  <h5 className="timeZone">{booking?.booking_status}</h5>
                </div>
              </div>
            </div>

            <div className="meeting-date-section wrapper">
              <div className="meeting-minute-section">
                <label htmlFor="">Booked Skill</label>
                <div className="duration">{booking?.skill}</div>
              </div>
              <div className="meeting-minute-section ml-10">
                <label htmlFor="">Duration</label>
                <div className="duration">{booking?.duration} min</div>
              </div>
            </div>

            <div className="meeting-minute-section">
              <label htmlFor="">Zoom Meeting ID</label>
              <div className="duration">{booking?.zoom_meeting_id}</div>
            </div>
            {/* <div className="meeting-minute-section">
              <label htmlFor="">Transaction Id</label>
              <div className="meeting-link">
                {booking?.transaction.paypal_transaction_id}
              </div>
            </div> */}
            {/* <div className="date-and-time">
              <div className="meeting-minute-section">
                <label htmlFor="">Payment Amount</label>
                <div className="duration">
                  {" "}
                  $ {booking?.transaction.sub_amount}
                </div>
              </div>
              <div className="meeting-minute-section">
                <label htmlFor="">Payment Date</label>
                <div className="duration">{finalDate && finalDate}</div>
              </div>
            </div> */}
            {/* <div className="meeting-minute-section">
              <label htmlFor="">Payment Method</label>
              <div className="duration">PayPal</div>
            </div> */}
          </div>

          <div className="left-section">
            <div className="card">
              <div className="self-description-section">
                <div className="logo">
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    preview="false"
                    src={
                      profile?.image
                        ? profile?.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="profile"
                  />
                </div>
                <h5 className="title">{profile?.name}</h5>
                <p className="address">
                  <span className="icon">
                    <EnvironmentOutlined />
                  </span>
                  {profile?.country}
                </p>
                <p className="designation">{profile?.summary}</p>
                <div className="rate-detail">
                  <p>Payment Amount</p>
                  <p>
                    <span>$ {booking?.transaction?.total_amount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-wrapper">
          <div className="button-section">
            <div className="payment-details">
              <div>
                <p>Transaction Id:</p>
                <p>Payment Date:</p>
                <p>Payment Method:</p>
              </div>
              <div>
                <p>
                  {booking?.transaction?.paypal_transaction_id
                    ? booking?.transaction?.paypal_transaction_id
                    : `Wallet Payment`}
                </p>
                <p>{finalDate}</p>
                <p>
                  {booking?.transaction?.paypal_transaction_id
                    ? "PayPal"
                    : "Wallet"}
                </p>
              </div>
            </div>

            <br />
            <div className="btn-container">
              <div
                className="custom-btn with-bg"
                onClick={() =>
                  downloadInvoice(
                    "download-invoice",
                    booking?.invoices == null
                      ? error("Something went wrong !")
                      : booking?.invoices?.id,
                    "Booking_Receipt.pdf",
                    "EUBOOKING_RECEIPT"
                  )
                }
              >
                Download Receipt
              </div>
              <div
                onClick={() => goToFeedbackPage()}
                className="custom-btn with-bg"
              >
                Complain/Feedback
              </div>
              {/* cancel booking */}
              {booking?.booking_status == "Confirmed" && (
                <div onClick={toggle} className="custom-btn with-bg">
                  Cancel
                </div>
              )}

              {booking?.booking_status == "Scheduled" && (
                <div onClick={gotoRatingPage} className="custom-btn with-bg">
                  Rating
                </div>
              )}

              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  Do you really want to cancel booking !
                </ModalHeader>
                <ModalBody>
                  <FormGroup
                    style={{
                      boxShadow: "0 3px 6px 0 rgba(0,0,0,.16)",
                      marginTop: "20px",
                    }}
                  >
                    <Input.TextArea
                      className={"textarea"}
                      type="textarea"
                      style={{ height: "150px" }}
                      placeholder={"Reason"}
                      autoSize={{
                        minRows: 4,
                        maxRows: 6,
                      }}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </FormGroup>
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
                          <Link href={"/terms_and_conditions"}>
                            <a target="_blank">
                              Cancellation Terms & Conditions
                            </a>
                          </Link>
                        </label>
                      </div>
                    </span>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="custom-btn with-bg"
                    onClick={cancelBooking}
                    color="primary"
                    style={{
                      opacity: isTermChecked ? 1 : 0.5,
                      pointerEvents: isTermChecked ? "unset" : "none",
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    className="custom-btn with-bg"
                    color="secondary"
                    onClick={toggle}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>

          <div className="payment-details-section">
            <div>
              <Image
                loader={myImageLoader}
                src={ProtectionIcon}
                alt=""
                layout="raw"
              />
              <h4>100% payment protection</h4>
              <p>
                Your funds are safe with {themeConfig.appName} until you approve{" "}
                {profile?.name}
                's work
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { consultant, booking_history, booking_cancel, authentication } = state;
  return {
    consultant,
    booking_history,
    booking_cancel,
    authentication,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  warning: alertActions.warning,
  success: alertActions.success,
  error: alertActions.error,
  downloadInvoice: crudActions._downloadWithPost,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantDetails)
);
