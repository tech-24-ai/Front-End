import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Button, Container, FormGroup, Input, Label } from "reactstrap";
import { crudActions, loaderActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Image, Rate } from "antd";
import moment from "moment";
import Router from "next/router";
import { isBrowser } from "react-device-detect";
import { crudService } from "../../_services";

const consultantComplaint = ({
  complaints,
  getAllPost,
  booking_history,
  getAllCrud,
  showLoader,
  hideLoader,
}) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let booking_historysID = sessionStorage.getItem("booking_historysID");
    console.log("booking_historysID", booking_historysID);

    if (booking_historysID) {
      getAllCrud("booking_history", "booking_history", {
        booking_id: booking_historysID,
      });
    }
    // console.log("consultantsID", consultantsID);
  }, []);

  const sendComplaintData = () => {
    crudService
      ._create(
        "complaints",
        {
          subject: subject,
          message: message,
          ref_id: booking_history[0]?.consultant_id,
        },
        showLoader()
      )
      .then((res) => {
        hideLoader();
        if (res.status == 200) {
          if (window.confirm("Create successfully")) {
            window.location.href = "/consultants/booking-details";
          }
        } else {
          alert("Something went wrong!");
        }
      });
  };
  // booking date
  const bookingDateObj =
    booking_history && booking_history.map((item) => item.booking_date);
  const bookingDate = moment(new Date(bookingDateObj))
    .startOf("day")
    .format("MM-DD-YYYY");

  // console.log("complaints", complaints);
  console.log("booking_history", booking_history);

  return (
    <Container>
      <div
        style={{
          width: isBrowser ? "85%" : "100%",
          margin: "0px auto",
          marginTop: isBrowser ? "0px" : "20px",
        }}
      >
        {booking_history &&
          booking_history.map((booking) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
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
                      booking.consultant.image == null
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                        : booking.consultant.image
                    }
                  />
                  <div className="text-style" style={{ marginLeft: "30px" }}>
                    {`${booking.consultant.first_name} ${
                      booking.consultant.last_name == null
                        ? ""
                        : booking.consultant.last_name
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
                      {booking.consultant?.country?.name}
                    </div>
                    <Rate
                      allowHalf
                      disabled={true}
                      defaultValue={booking?.consultant?.avg_rating}
                    />
                  </div>
                </div>
                {/* <p className="text-style">{booking.country.name}</p> */}

                <p className="text-style">{booking.consultant?.tags}</p>
                <p className="text-style">
                  {booking.consultant.profile_summary}{" "}
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #333",
                  marginLeft: isBrowser ? "20px" : "0px",
                  borderRadius: "10px",
                  width: isBrowser ? "50%" : "100%",
                  padding: "10px",
                  marginTop: isBrowser ? "0px" : "20px",
                }}
              >
                <p>Booking Date : {bookingDate}</p>
                <p>
                  Booking Time :{" "}
                  {moment(booking.booking_time, "HH:mm").format("hh:mm A")}
                </p>
                <p>Amount : $ {booking.transaction?.total_amount}</p>
                <FormGroup
                  style={{
                    boxShadow: "0 3px 6px 0 rgba(0,0,0,.16)",
                    minHeight: "10px",
                  }}
                >
                  <Input
                    className={"textarea"}
                    type="textarea"
                    style={{ minHeight: "10px" }}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="subject"
                  />
                </FormGroup>

                <FormGroup
                  style={{
                    boxShadow: "0 3px 6px 0 rgba(0,0,0,.16)",
                    minHeight: "100px",
                  }}
                >
                  <Input
                    className={"textarea"}
                    type="textarea"
                    style={{ minHeight: "100px" }}
                    placeholder="Complaint/Feedback Message"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormGroup>
                <Button
                  style={{
                    padding: "10px 30px",
                    border: "1px solid #333",
                    opacity: message.length > 2 && subject.length > 2 ? 1 : 0.5,
                    pointerEvents:
                      message.length > 2 && subject.length > 2
                        ? "unset"
                        : "none",
                  }}
                  onClick={sendComplaintData}
                >
                  Submit
                </Button>
              </div>
            </div>
          ))}
      </div>
      <BodyBackgroundColor color="#fff" />
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { complaints, booking_history } = state;
  return { complaints, booking_history };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  getAllPost: crudActions._create,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantComplaint)
);
