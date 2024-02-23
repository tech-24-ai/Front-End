import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Button, Container, FormGroup, Input } from "reactstrap";
import { crudActions, loaderActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Rate } from "antd";
import { crudService } from "../../_services";
import { Image } from "antd";
import moment from "moment";

const consultantRating = ({
  reviews,
  booking_history,
  getAllCrud,
  showLoader,
  hideLoader,
}) => {
  const [message, setMessage] = useState();
  const [ratingValue, setRatingValue] = useState();

  const rateConsultant = () => {
    crudService
      ._create(
        "reviews",
        {
          consultant_id: booking_history[0]?.consultant.id,
          booking_id: booking_history[0]?.chat_history.booking_id,
          rating: ratingValue,
          review: message,
        },
        showLoader()
      )
      .then((res) => {
        hideLoader();
        if (res.status == 200) {
          if (window.confirm("Rating successfully")) {
            window.location.href = "/consultants/booking-details";
          }
        } else {
          alert("Something went wrong!");
        }
      });
  };

  console.log("reviews", reviews);

  useEffect(() => {
    const booking_historyID = sessionStorage.getItem("booking_historysID");
    console.log("booking_historyID", booking_historyID);
    if (booking_historyID) {
      getAllCrud("booking_history", "booking_history", {
        booking_id: booking_historyID,
      });
    }
  }, []);

  console.log("booking_history-rating", booking_history);

  // useEffect(() => {
  //   let data = sessionStorage.getItem("booking");
  //   // console.log("data rating", data);
  //   if (data) {
  //     setSentData(JSON.parse(data));
  //   }
  // }, []);
  // // console.log("sentData", sentData);

  // booking date
  const bookingDateObj =
    booking_history && booking_history.map((item) => item.booking_date);
  const bookingDate = moment(new Date(bookingDateObj))
    .startOf("day")
    .format("MM-DD-YYYY");
  return (
    <Container>
      <p>Rate a consultant</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {booking_history &&
          booking_history.map((data) => (
            <>
              <div
                style={{
                  width: "50%",
                  border: "1px solid #333",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={110}
                    height={110}
                    preview={false}
                    src={data.consultant?.image}
                    alt="profile-image"
                  />
                  <div style={{ marginLeft: "40px" }}>
                    {`${data.consultant?.first_name} ${
                      data.consultant?.last_name == null
                        ? ""
                        : data.consultant?.last_name
                    }`}{" "}
                    <p>
                      <Image
                        width={15}
                        height={18}
                        alt="location-icon"
                        preview={false}
                        src={
                          "https://cdn-icons-png.flaticon.com/128/9077/9077975.png"
                        }
                      />
                      <span style={{ marginLeft: "5px" }}>
                        {data?.consultant?.country.name}
                      </span>
                    </p>
                  </div>
                </div>
                <p>{data.consultant?.profile_summary}</p>
                <p>{data.consultant?.tags}</p>
              </div>

              <div
                style={{
                  width: "50%",
                  border: "1px solid #333",
                  borderRadius: "10px",
                  padding: "10px",
                  marginLeft: "20px",
                }}
              >
                <p>Booking Date : {bookingDate}</p>
                <p>Amount : $ {data.transaction.total_amount}</p>
                <p>Durations : {data.duration} min</p>
                <p>Skill : {data.skill}</p>
                <p>Status : {data.booking_status}</p>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <p>Rate Consultant : </p>
                  <Rate
                    style={{ marginLeft: "20px" }}
                    allowHalf
                    defaultValue={5}
                    onChange={(e) => setRatingValue(e)}
                  />
                </div>
                <br />
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
                    placeholder={"Review"}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormGroup>
                <Button
                  style={{ padding: "10px 30px", border: "1px solid #333" }}
                  onClick={rateConsultant}
                >
                  Submit
                </Button>
              </div>
            </>
          ))}
      </div>
      <BodyBackgroundColor color="#fff" />
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { reviews, booking_history } = state;
  return { reviews, booking_history };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantRating)
);
