import React, { useState, useEffect } from "react";
import { Input, Row, Col, Rate } from "antd";
import { Container, FormGroup } from "reactstrap";
import {
  EnvironmentOutlined,
  RightOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import { crudActions, loaderActions, alertActions } from "../../_actions";
import Link from "next/link";
import myImageLoader from "../../components/imageLoader";
import CompletionDateIcon from "../../public/new_images/CompletionDateIcon.svg";
import { crudService } from "../../_services";

const rating = ({
  getAllCrud,
  reviews,
  showLoader,
  hideLoader,
  success,
  error,
}) => {
  const [profile, setProfile] = useState(null);
  const [ratingMessage, setRatingMessage] = useState();
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ratingData"));
    if (data) {
      setProfile(data.consultant);
    }
  }, []);

  //   console.log("profile", profile);

  const inputCSS = {
    height: "55px",
    width: "500px",
    borderRadius: "16px",
    marginTop: "18px",
  };

  //   rating and review
  const rateConsultant = () => {
    crudService
      ._create(
        "reviews",
        {
          consultant_id: profile?.consultant_id,
          booking_id: profile?.booking.id,
          rating: ratingValue,
          review: ratingMessage,
        },
        showLoader()
      )
      .then((res) => {
        hideLoader();
        if (res.status == 200) {
          success("Thankyou for rating");
          Router.push("/consultant/details");
        } else {
          error("Something went wrong!");
        }
      });
  };

  return (
    <section className="message-page-section consultant-details-page-section rating-page">
      <Container>
        <div className="page-content">
          <h3>Rating</h3>
          <br />
          <Row gutter={[16, 16]}>
            <Col md={15} sm={24} xs={24}>
              <div className="right-section w-100">
                <div className="meeting-date-section wrapper">
                  <div className="title-section">
                    <Image
                      loader={myImageLoader}
                      src={CompletionDateIcon}
                      alt=""
                      layout="raw"
                      className="date-icon"
                    />
                    <div>
                      <div className="date">{profile?.scheduleDate}</div>
                      <h5 className="timeZone">
                        ({profile?.booking?.timezone?.offset}){" "}
                        {profile?.booking?.timezone?.zone}
                      </h5>
                    </div>
                    <div>
                      <div className="time">{profile?.startTime}</div>
                      <h5 className="timeZone">
                        {profile?.booking?.booking_status}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="meeting-date-section wrapper">
                  <div className="meeting-minute-section">
                    <label htmlFor="">Booked Skill</label>
                    <div className="duration">{profile?.booking?.skill}</div>
                  </div>
                  <div className="meeting-minute-section ml-10">
                    <label htmlFor="">Duration</label>
                    <div className="duration">
                      {profile?.booking?.duration} min
                    </div>
                  </div>

                  <div className="meeting-minute-section ml-10">
                    <label htmlFor="">Rate Consultant</label>
                    <div className="duration">
                      <Rate
                        allowHalf
                        defaultValue={0}
                        onChange={(e) => setRatingValue(e)}
                      />
                    </div>
                  </div>
                </div>

                {/* <div style={{ display: "flex", alignItems: "baseline" }}>
                  <p>Rate Consultant : </p>
                  <Rate
                    style={{ marginLeft: "20px" }}
                    allowHalf
                    defaultValue={0}
                    onChange={(e) => setRatingValue(e)}
                  />
                </div> */}
                <FormGroup>
                  <Input.TextArea
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                    style={inputCSS}
                    placeholder="Review Message"
                    value={ratingMessage}
                    onChange={(e) => setRatingMessage(e.target.value)}
                  />
                </FormGroup>
                <p
                  onClick={() => {
                    rateConsultant();
                  }}
                  className="custom-btn with-bg"
                >
                  Submit
                </p>
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              {profile && (
                <Profile
                  id={profile.consultant_id}
                  logo={profile.image}
                  name={profile.fullName}
                  country={profile.country}
                  summary={profile.summary}
                  minRate={profile.minRate}
                />
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { reviews } = state;
  return { reviews };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  success: alertActions.success,
  error: alertActions.error,
};

export default withRouter(connect(mapStateToProps, actionCreators)(rating));

const goToMeetingPage = (id) => {
  sessionStorage.setItem("consultantID", id);
  Router.push({
    pathname: "create_meeting",
  });
};

const Profile = ({ logo, name, country, summary, minRate, id }) => {
  return (
    <div className="card">
      <div className="profile-wrapper">
        <div className="logo">
          <Image
            style={{ borderRadius: "50%" }}
            width={80}
            height={80}
            preview="false"
            src={
              logo
                ? logo
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
            }
            alt="profile"
          />
        </div>
        <h5 className="title">{name}</h5>
        <p className="address">
          <span className="icon">
            <EnvironmentOutlined />
          </span>
          {country}
        </p>
        {summary && <p className="designation">{summary}</p>}

        <div className="min-rate-wrapper" onClick={() => goToMeetingPage(id)}>
          <div className="min-rate-title">
            <div className="icon">
              <VideoCameraOutlined />
            </div>
            <div className="title">Book video call</div>
          </div>
          <div className="min-rate">
            <p>
              <span>$</span>
              {minRate}
              <span>/hr</span>
            </p>
            <div className="go-to-icon">
              <RightOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
