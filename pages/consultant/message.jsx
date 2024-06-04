import React, { useState, useEffect } from "react";
import { Space, Input, Avatar, Divider, Card, Tooltip, Row, Col } from "antd";
import { Container } from "reactstrap";
import {
  SearchOutlined,
  EnvironmentOutlined,
  SendOutlined,
  UserOutlined,
  InfoCircleOutlined,
  RightOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Image from "next/future/image";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import { crudActions, loaderActions, alertActions } from "../../_actions";
import Link from "next/link";

const Message = ({ getAllCrud, postAPI, warning, chat_log }) => {
  const [profile, setProfile] = useState(null);
  const [chatConfig, setChatConfig] = useState();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("messageDetail"));
    if (data) {
      setProfile(data.consultant);
      setChatConfig(data.chat_history);
    }
  }, []);

  useEffect(() => {
    getAllMessages();
  }, [chatConfig]);

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const getAllMessages = () => {
    if (chatConfig && chatConfig.chat_id) {
      getAllCrud("chat-log", "chat-log", {
        chat_id: chatConfig.chat_id,
      });
    }
  };

  const sendMessage = () => {
    if (!chatConfig && !chatConfig.chat_id) {
      return warning("Something went wrong!");
    }
    if (message) {
      console.log(message);
      postAPI("chat", "chat-log", {
        chat_id: chatConfig.chat_id,
        message: message,
      });
      setMessage("");
      setTimeout(() => {
        getAllMessages();
      }, 1000);
    } else {
      warning("Type a message");
    }
  };

  const messageList = [
    {
      message_by: "Visitor",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      message_by: "Consultant",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      message_by: "Visitor",
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      message_by: "Consultant",
      message: "Hi",
    },
  ];

  return (
    <section className="message-page-section">
      <Container>
        <div className="page-content">
          <Row gutter={[16, 16]}>
            <Col md={15} sm={24} xs={24}>
              {profile && (
                <MessageBox
                  logo={profile.image}
                  name={profile.fullName}
                  messageLogs={chat_log}
                  screenSize={screenSize}
                  message={message}
                  onChange={setMessage}
                  sendMessage={sendMessage}
                />
              )}
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
  const { chat_log } = state;
  return {
    chat_log,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  postAPI: crudActions._create,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  warning: alertActions.warning,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Message));

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
        {/* <Link href="create_meeting"> */}
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
        {/* </Link> */}
      </div>
    </div>
  );
};

const MessageBox = ({
  logo,
  name,
  message,
  messageLogs,
  screenSize,
  onChange = () => {},
  sendMessage,
}) => {
  return (
    <Card
      className="message-box-card card"
      title={
        <div className="profile-details">
          <Avatar
            className="profile-image"
            src={
              logo
                ? logo
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
            }
          />
          <div className="profile-title">{name}</div>
        </div>
      }
    >
      <div
        className="message-box-body"
        style={{ height: `${screenSize.dynamicHeight - 355}px` }}
      >
        {messageLogs &&
          messageLogs.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.message_by === "Visitor" ? "sent" : "received"
              }`}
            >
              <p>{message.message}</p>
            </div>
          ))}
      </div>
      <div className="message-box-input-wrapper">
        <Input
          className="message-input-box"
          placeholder="Type a new message"
          value={message}
          // prefix={
          //   <Tooltip title="Extra information">
          //     <InfoCircleOutlined
          //       style={{
          //         color: "rgba(0,0,0,.45)",
          //       }}
          //     />
          //   </Tooltip>
          // }
          onChange={(e) => onChange(e.target.value)}
        />
        <SendOutlined className="message-send-button" onClick={sendMessage} />
      </div>
    </Card>
  );
};
