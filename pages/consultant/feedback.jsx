import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "antd";
import { Container, FormGroup } from "reactstrap";
import {
  EnvironmentOutlined,
  RightOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Image from "next/future/image";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import { crudActions, loaderActions, alertActions } from "../../_actions";
import Link from "next/link";
import myImageLoader from "../../components/imageLoader";
import CompletionDateIcon from "../../public/new_images/CompletionDateIcon.svg";
import { crudService } from "../../_services";

const feedback = ({
  getAllCrud,
  complaints,
  showLoader,
  hideLoader,
  success,
  error,
}) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("feedbackData"));
    if (data) {
      setProfile(data.consultant);
    }
  }, []);

  console.log("profile", profile);

  const inputCSS = {
    height: "55px",
    width: "500px",
    borderRadius: "16px",
    marginTop: "18px",
  };

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendComplaintData = () => {
    setMessage("");
    setSubject("");
    if (subject.length > 2 && message.length > 2) {
      crudService
        ._create(
          "complaints",
          {
            subject: subject,
            message: message,
            ref_id: profile?.consultant_id,
          },
          showLoader()
        )
        .then((res) => {
          hideLoader();
          if (res.status == 200) {
            success("Submit successfully");
            Router.push("/consultant/details");
          } else {
            error("Something went wrong!");
          }
        });
    }
  };

  console.log("complaints", complaints);

  return (
    <section className="message-page-section consultant-details-page-section feedback-page">
      <Container>
        <div className="page-content">
          <h3>Feedback and Complaint</h3>
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
                </div>

                <FormGroup>
                  <Input
                    // type="number"
                    style={inputCSS}
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Input.TextArea
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                    style={inputCSS}
                    placeholder="Complaint/Feedback Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormGroup>
                <p
                  onClick={() => {
                    sendComplaintData();
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
  const { complaints } = state;
  return { complaints };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  success: alertActions.success,
  error: alertActions.error,
};

export default withRouter(connect(mapStateToProps, actionCreators)(feedback));

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
