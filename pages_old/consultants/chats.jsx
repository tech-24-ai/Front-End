import { Image } from "antd";
import { Button, Container, FormGroup, Input } from "reactstrap";

import React, { useState, useEffect } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { crudService } from "../../_services";

const ChatPage = ({ postAPI, getAllCrud, chat_log }) => {
  const [message, setMessage] = useState("");
  const [sentChatData, setSentChatData] = useState("");

  useEffect(() => {
    let chat_history_id = sessionStorage.getItem("chat_history_id");
    if (chat_history_id) {
      setSentChatData(JSON.parse(chat_history_id));
    }
  }, []);

  useEffect(() => {
    if (sentChatData) {
      sentChatData[0]?.chat_history?.chat_id &&
        getAllCrud("chat-log", "chat-log", {
          chat_id: sentChatData[0]?.chat_history?.chat_id,
        });
    }
  }, [sentChatData]);

  const getAllChatMessage = () => {
    if (sentChatData) {
      sentChatData[0]?.chat_history?.chat_id &&
        getAllCrud("chat-log", "chat-log", {
          chat_id: sentChatData[0]?.chat_history?.chat_id,
        });
    }
  };

  console.log("sentChatData", sentChatData[0]);
  console.log("chat_log", chat_log);

  const sendChats = () => {
    if (message.length > 0) {
      postAPI("chat-log", "chat-log", {
        chat_id: sentChatData[0]?.chat_history?.chat_id,
        message: message,
      });
      setMessage(" ");
      getAllChatMessage();
      getAllChatMessage();
    } else {
      alert("Type a message");
    }
  };

  return (
    chat_log && (
      <Container className="consultant-chat-container">
        <header>
          <div className="userProfile">
            <Image
              style={{ borderRadius: "50%" }}
              width={50}
              height={50}
              preview={false}
              alt="profile-image"
              src={
                sentChatData[0]?.consultant?.image == null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                  : sentChatData[0]?.consultant?.image
              }
            />

            <span style={{ marginLeft: "20px" }}>
              {`${sentChatData[0]?.consultant.first_name} ${
                sentChatData[0]?.consultant.last_name == null
                  ? ""
                  : sentChatData[0]?.consultant.last_name
              }`}
            </span>
          </div>
        </header>
        {chat_log?.chat_id != undefined ? (
          <></>
        ) : (
          <>
            <div className="scroll-container">
              <div className="flex-box">
                {chat_log?.map((data) => (
                  <>
                    {data.message_by == "Consultant" ? (
                      <div
                        className="chat-rendering-section"
                        style={{
                          backgroundColor: "lightgreen",
                          marginRight: "auto",
                        }}
                      >
                        {data.message}
                      </div>
                    ) : (
                      <div
                        className="chat-rendering-section"
                        style={{
                          backgroundColor: "#ddd",
                          marginLeft: "auto",
                          marginRight: "0px",
                        }}
                      >
                        {data.message}
                      </div>
                    )}
                  </>
                ))}
                {chat_log && chat_log.length == 0 ? (
                  <div>Start conversation!</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}
        <div className="input-container">
          <Input
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            style={{
              pointerEvents:
                sentChatData[0]?.chat_history?.allow_visitor_message == 0 ||
                sentChatData[0]?.booking_status == "Cancelled"
                  ? "none"
                  : "unset",
              opacity:
                sentChatData[0]?.chat_history?.allow_visitor_message == 0 ||
                sentChatData[0]?.booking_status == "Cancelled"
                  ? 0.5
                  : 1,
            }}
            onClick={sendChats}
          >
            Send
          </Button>
        </div>
        <BodyBackgroundColor color="#F4F6F6" />
      </Container>
    )
  );
};

const mapStateToProps = (state) => {
  const { chat_log } = state;
  return { chat_log };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  postAPI: crudActions._create,
};

export default withRouter(connect(mapStateToProps, actionCreators)(ChatPage));
