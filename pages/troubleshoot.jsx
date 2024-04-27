import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import myImageLoader from "../components/imageLoader";
import Image from "next/future/image";
import troubleshootIcon from "../public/new_images/troubleshoot.svg";
import { Input } from "antd";
import ChatCard from "../components/card/chatCard";
import { crudService } from "../_services";
import { alertActions, crudActions, loaderActions } from "../_actions";
import { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { LoadingDotIcon } from "../components/icons";
import themeConfig from "../config/themeConfig";

function troubleshoot({ getAllCrud, showLoader, hideLoader, error }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stopChat, setStopChat] = useState("");

  const scrollableDivRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    scrollToNewMessage();
  }, [chatMessage]);

  const scrollToNewMessage = () => {
    if (scrollableDivRef.current) {
      const newMessageElement = scrollableDivRef.current.lastElementChild;
      if (newMessageElement) {
        newMessageElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const selectData = JSON.parse(sessionStorage.getItem("selectData"));

  useEffect(() => {
    // console.log("fn-called from subject prompt");
    const selectData = JSON.parse(sessionStorage.getItem("selectData"));
    if (selectData) {
      setChatMessage((prevData) => [
        ...prevData,
        {
          type: "received",
          message: `Welcome to ${themeConfig.appName}, we will be happy to assist you in troubleshooting your issues for ${selectData.subject}`,
        },
      ]);

      crudService
        ._create(
          "openai/chat-table",
          {
            prompt_id: selectData.id,
            chat_id: 1,
            role: "system",
          },
          showLoader()
        )
        .then((res) => {
          if (res.status == 200) {
            hideLoader();
          } else {
            error("Something went wrong!");
          }
        });
    }
  }, []);

  const liveChatting = () => {
    setChatInput("");
    console.log("fn called from live chatting");
    const selectData = JSON.parse(sessionStorage.getItem("selectData"));
    setChatMessage((prevData) => [
      ...prevData,
      { type: "sent", message: stopChat ? stopChat : chatInput },
    ]);
    crudService
      ._create(
        "openai/chat-table",

        {
          prompt_id: selectData.id,
          chat_id: 1,
          input_question: stopChat ? stopChat : chatInput,
          role: "user",
        },

        setIsLoading(true)
      )
      .then((res) => {
        setIsLoading(false);
        if (res.status == 200) {
          // setStopChat("");
          setChatMessage((prevData) => [
            ...prevData,
            {
              type: "received",
              message:
                res.data?.choices.length > 0 &&
                res.data.choices[0].message.content,
            },
          ]);
        } else {
          error("Something went wrong!");
        }
      });
  };

  const handleKeyDown = (event) => {
    if ((event.shiftKey || event.ctrlKey) && event.keyCode === 13) {
      const input = event.target;
      const { selectionStart, selectionEnd, value } = input;
      const beforeCursor = value.substring(0, selectionStart);
      const afterCursor = value.substring(selectionEnd);
      const splittedText = `${beforeCursor}\n${afterCursor}`;
      setChatInput(splittedText);
    }
  };

  const stopChatFn = () => {
    setStopChat("Stop Chat");
  };

  useEffect(() => {
    if (stopChat) {
      liveChatting();
    }
  }, [stopChat]);

  // stop chat when user redirect to any other tab
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== router.asPath) {
        if (!stopChat) {
          const userResponse = window.confirm("Do you want to Stop Chat!");
          if (userResponse) {
            stopChatFn();
          }
        }
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, stopChat, stopChatFn]);

  const onlyChats = (e) => {
    e.preventDefault();
    if (e.keyCode === 13 && !e.ctrlKey && !e.shiftKey) {
      liveChatting();
      setChatInput("");
    }
  };

  return (
    <section
      className="pricing-advisor-section trouble-subject-section"
      style={{ marginBottom: "30px" }}
    >
      <div className="page-heading">
        <p className="title">Troubleshoot issues</p>
        <Image
          loader={myImageLoader}
          src={troubleshootIcon}
          alt=""
          layout="raw"
          width={35}
          height={35}
          style={{ objectFit: "contain" }}
        />
      </div>
      <Container>
        <div className="pricing-advisor-content troubleshoot">
          <div className="card">
            <div className="card">
              <div className="title">
                Troubleshoot {selectData.subject} Issues
              </div>
              {/* <div className="dots">...</div> */}
            </div>
            <div ref={scrollableDivRef} className="chat-container">
              {chatMessage &&
                chatMessage.map((item) => (
                  <ChatCard
                    float={item.type === "sent" ? "right" : "left"}
                    key={item.id}
                  >
                    <div style={{ fontSize: "16px", fontWeight: "500" }}>
                      {item.message.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </ChatCard>
                ))}
            </div>

            {stopChat ? (
              <></>
            ) : (
              <div className="chat-button-container">
                <Input.TextArea
                  autoSize={{
                    minRows: 1,
                    maxRows: 5,
                  }}
                  className="input"
                  placeholder="Type..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPressEnter={onlyChats}
                />
                {isLoading ? (
                  <p className="animation">
                    <LoadingDotIcon />
                  </p>
                ) : (
                  <p onClick={liveChatting} className="send-button">
                    Send
                  </p>
                )}

                <p
                  className="send-button stop-chat-button"
                  onClick={stopChatFn}
                >
                  Stop Chat
                </p>
              </div>
            )}

            {/* <div className="ask-question">
              <h5>Ask Complex Questions & Get Better answers</h5>
              <Row>
                <Col md={4}>
                  <ChatCard>
                    What are some meals I can make for my picky toddler who only
                    eats orange-colored food?
                  </ChatCard>
                </Col>
                <Col md={4}>
                  <ChatCard>
                    What are some meals I can make for my picky toddler who only
                    eats orange-colored food?
                  </ChatCard>
                </Col>
                <Col md={4}>
                  <ChatCard>
                    What are some meals I can make for my picky toddler who only
                    eats orange-colored food?
                  </ChatCard>
                </Col>
              </Row>
              <Input placeholder="Enter here" suffix={<SendOutlined />} />
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  );
}

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  error: alertActions.error,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(troubleshoot)
);
