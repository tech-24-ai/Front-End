import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";
import { Image, Rate } from "antd";
import { connect } from "react-redux";
import { withRouter, useRouter } from "next/router";
import { crudActions } from "../../_actions";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import Router from "next/router";
import moment from "moment";
import Link from "next/link";
import { isBrowser } from "react-device-detect";

const bookingDetails = ({
  booking_history,
  booking_cancel,
  getAllCrud,
  args,
  getAllPost,
  downloadInvoice,
}) => {
  const [reason, setReason] = useState("");
  const [booking_id, setBooking_id] = useState();
  const [modal, setModal] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [finalDate, setFinalDate] = useState();
  const [bookingDate, setBookingDate] = useState();

  const toggle = () => setModal(!modal);
  // cancel booking
  const cancelBooking = () => {
    const booking_historyID = sessionStorage.getItem("booking_historysID");
    getAllPost("booking_cancel", "booking/cancel", {
      booking_id: booking_historyID,
      reason: reason,
    });
    toggle();
    setTimeout(() => {
      Router.push("/consultants/history");
    }, 1000);

    console.log("booking_cancel", booking_cancel);
  };

  useEffect(() => {
    setBooking_id(booking_history[0]?.transaction.booking_history_id);
    const booking_historyID = sessionStorage.getItem("booking_historysID");
    if (booking_historyID != undefined) {
      getAllCrud("booking_history", "booking_history", {
        booking_id: booking_historyID,
      });
    }
  }, []);

  useEffect(() => {
    const bookingDateObj = booking_history[0]?.booking_date;
    setBookingDate(
      moment(new Date(bookingDateObj)).startOf("day").format("MM-DD-YYYY")
    );
  }, [booking_history?.length]);

  // window.onbeforeunload = () => {
  //   sessionStorage.clear();
  // };
  // send data to complaint page
  const sendDataToComplaint = () => {
    let booking_history_id = booking_id;

    sessionStorage.setItem("booking_history_id", booking_history_id);
    Router.push(`complaint`);
  };
  const sendData = (booking) => {
    let sendData = { booking };
    sendData["booking"] = booking.created_at;
    sessionStorage.setItem("sendData", JSON.stringify(sendData));
    Router.push(`rating`);
    console.log("data", booking);
  };

  // payment date and time
  useEffect(() => {
    if (booking_history?.length == 1) {
      // const dateObj = booking_history?.map(
      //   (item) => item.transaction.transaction_details
      // );
      // const parsedObj = dateObj && JSON.parse(dateObj[0]);
      // const date = parsedObj && parsedObj.create_time;
      const date = booking_history[0]?.transaction?.transaction_date;
      const data = moment(date).local().format("MM-DD-YYYY");
      setFinalDate(data);
    }
  }, [booking_history?.length]);

  const gotoChatPage = () => {
    let chat_history_id = booking_history?.map((data) => data);

    sessionStorage.setItem("chat_history_id", JSON.stringify(chat_history_id));
    Router.push("chats");
  };

  useEffect(() => {
    return () => {
      window.sessionStorage.removeItem("booking_historysID");
    };
  }, []);

  console.log("booking-history-details", booking_history && booking_history[0]);
  let booking = booking_history && booking_history[0];

  return (
    <Container>
      {booking_history && (
        <div className="booking-details-container">
          <p className="heading">Booking Details</p>
          <div className="flex-container">
            <div className="div-one">
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    width={100}
                    height={100}
                    alt="icon"
                    preview={false}
                    style={{ borderRadius: "50%" }}
                    src={
                      booking?.consultant.image == null
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                        : booking?.consultant.image
                    }
                  />
                  <div className="text-style" style={{ marginLeft: "30px" }}>
                    {`${booking?.consultant.first_name} ${
                      booking?.consultant.last_name == null
                        ? ""
                        : booking?.consultant.last_name
                    }`}
                    <div className="text-style">
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
                      {booking?.consultant?.country?.name}
                    </div>
                    <Rate
                      allowHalf
                      disabled={true}
                      defaultValue={booking?.consultant.avg_rating}
                    />
                  </div>
                </div>
                <p className="text-style">{booking?.consultant?.tags}</p>
                <p className="text-style">
                  {booking?.consultant.profile_summary}{" "}
                </p>
              </div>
              <div className="text-style"></div>
            </div>

            <div
              className="div-one text-style"
              style={{
                marginLeft: isBrowser ? "20px" : "0px",
                marginTop: isBrowser ? "0px" : "10px",
              }}
            >
              <p>Schedule Date : {bookingDate}</p>
              <p>
                Schedule Time :{" "}
                {moment(booking?.booking_time, "HH:mm").format("hh:mm A")}
              </p>
              <p>Duration : {booking?.duration} min</p>
              <p>Booked Skill : {booking?.skill}</p>
              <p>Booking Status : {booking?.booking_status}</p>

              {booking?.booking_status == "Confirmed" && (
                <p>
                  Meeting Link :{" "}
                  <a
                    className="link-section"
                    target="_blank"
                    href={booking?.meeting_link}
                  >
                    {booking?.meeting_link}
                  </a>
                </p>
              )}

              <p>Zoom Meeting ID : {booking?.zoom_meeting_id}</p>

              <p>Payment Amount : $ {booking?.transaction.sub_amount}</p>
              <p>
                Transaction Id : {booking?.transaction.paypal_transaction_id}
              </p>
              <p>Payment Date : {finalDate && finalDate}</p>
              <p>Payment Method : Paypal</p>
            </div>
          </div>

          <div className="button-container">
            <div>
              <Button
                className="Button"
                onClick={() =>
                  downloadInvoice(
                    "download-invoice",
                    booking?.invoices == null
                      ? alert("Something went wrong !")
                      : booking?.invoices?.id,
                    "Booking_Receipt.pdf",
                    "EUBOOKING_RECEIPT"
                  )
                }
              >
                Download Receipt
              </Button>
            </div>
            {/* <Link href={"chats"}> */}
            <Button onClick={gotoChatPage} className="Button">
              Chat
            </Button>
            {/* </Link> */}
            <div>
              {booking?.booking_status == "Scheduled" && (
                <Button
                  style={{ marginRight: "30px" }}
                  className="Button"
                  onClick={() => sendData(booking && booking)}
                  // href="rating"
                >
                  Rate Consultant
                </Button>
              )}
              {booking?.booking_status == "Confirmed" && (
                <Button
                  style={{ marginRight: isBrowser ? "30px" : "0px" }}
                  className="Button"
                  onClick={toggle}
                >
                  Cancel
                </Button>
              )}

              <Modal isOpen={modal} toggle={toggle} {...args}>
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
                    <Input
                      className={"textarea"}
                      type="textarea"
                      style={{ height: "150px" }}
                      placeholder={"Reason"}
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
                          <Link href={"cancellation"}>
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
                    className="Button"
                    onClick={cancelBooking}
                    color="primary"
                    style={{
                      opacity: isTermChecked ? 1 : 0.5,
                      pointerEvents: isTermChecked ? "unset" : "none",
                    }}
                  >
                    Yes
                  </Button>{" "}
                  <Button className="Button" color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <Link href={"complaint"}>
                <Button className="Button" onClick={sendDataToComplaint}>
                  Complain / Feedback
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <BodyBackgroundColor color="#fff" />
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { booking_history, booking_cancel } = state;
  return {
    booking_history,
    booking_cancel,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  getAllPost: crudActions._create,
  downloadInvoice: crudActions._downloadWithPost,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(bookingDetails)
);
