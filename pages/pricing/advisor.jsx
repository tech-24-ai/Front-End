import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import Image from "next/image";
import pricingIcon from "../../public/new_images/pricing.svg";
import { Input, Radio } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import ChatCard from "../../components/card/chatCard";
import Router from "next/router";

function advisor() {
  const [selectData, setSelectData] = useState();

  const sendData = () => {
    sessionStorage.setItem("selectData", selectData);
    Router.push("/troubleshoot");
  };
  console.log("selectData", selectData);
  return (
    <section className="pricing-advisor-section">
      <div className="page-heading">
        <p className="title">Pricing advisor</p>
        <Image
          loader={myImageLoader}
          src={pricingIcon}
          alt=""
          layout="raw"
          width={35}
          height={35}
          style={{ objectFit: "contain" }}
        />
      </div>
      <Container>
        <div className="pricing-advisor-content">
          <div className="card">
            <div className="card">
              <div className="title">Chatbot</div>
              <div className="dots">...</div>
            </div>
            <div className="chat-container">
              <ChatCard float="right" userIcon={true}>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </ChatCard>
              <ChatCard float="left" userIcon={true}>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </ChatCard>
            </div>

            <div className="ask-question">
              <h5>Ask Complex Questions & Get Better answers</h5>
              <Row>
                <Radio.Group
                  style={{ display: "flex" }}
                  defaultValue="a"
                  buttonStyle="solid"
                >
                  <Col md={4}>
                    <ChatCard>
                      <Radio.Button
                        value="You are an expert in the field of Data Management. I'm
                        going to ask you to complete some specific tasks for
                        troubleshooting the data related resources including
                        data governance, data architecture, Data Modeling and
                        design, database, Data security, Data Integration, Data
                        quality etc. But before you answer, I want you to do the
                        following: If you have any questions about my task or
                        uncertainty about delivering the best answer possible,
                        always ask bullet point questions for clarification
                        before generating your answer. Is that understood? Also
                        do not include words about ChatGPT or AI Language model
                        in your answers?"
                        style={{
                          height: "auto",
                          zIndex: "auto",
                        }}
                        onClick={(e) => setSelectData(e.target.value)}
                      >
                        You are an expert in the field of Data Management. I'm
                        going to ask you to complete some specific tasks for
                        troubleshooting the data related resources including
                        data governance, data architecture, Data Modeling and
                        design, database, Data security, Data Integration, Data
                        quality etc. But before you answer, I want you to do the
                        following: If you have any questions about my task or
                        uncertainty about delivering the best answer possible,
                        always ask bullet point questions for clarification
                        before generating your answer. Is that understood? Also
                        do not include words about ChatGPT or AI Language model
                        in your answers?
                      </Radio.Button>
                    </ChatCard>
                  </Col>
                  <Col md={4}>
                    <ChatCard>
                      <Radio.Button
                        value="What are some meals I can make for my picky toddler who
                        only eats orange-colored food?"
                        style={{
                          height: "auto",
                          zIndex: "auto",
                        }}
                        onClick={(e) => setSelectData(e.target.value)}
                      >
                        What are some meals I can make for my picky toddler who
                        only eats orange-colored food?
                      </Radio.Button>
                    </ChatCard>
                  </Col>
                  <Col md={4}>
                    <ChatCard>
                      <Radio.Button
                        value="What is HTML"
                        style={{
                          height: "auto",
                          zIndex: "auto",
                        }}
                        onClick={(e) => setSelectData(e.target.value)}
                      >
                        What is HTML
                      </Radio.Button>
                    </ChatCard>
                  </Col>
                </Radio.Group>
              </Row>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Input style={{ padding: "15px" }} placeholder="Enter here" />
                <p
                  style={{
                    marginLeft: "50px",
                    border: "1px solid #000",
                    padding: "15px 30px",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                  onClick={sendData}
                >
                  Send
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default advisor;
