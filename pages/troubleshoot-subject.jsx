import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import myImageLoader from "../components/imageLoader";
import Image from "next/image";
import troubleshootIcon from "../public/new_images/troubleshoot.svg";
import { Input, Radio } from "antd";
import ChatCard from "../components/card/chatCard";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { crudActions } from "../_actions";

function troubleshootSubject({ getAllCrud, chat_gpt }) {
  useEffect(() => {
    getAllCrud("chat_gpt", "openai/chat_gpt");
  }, []);

  const selectedData = (id) => {
    const filterData = chat_gpt.filter((data) => data.id == id);
    console.log("selectedData", filterData);
    sessionStorage.setItem("selectData", JSON.stringify(filterData[0]));
    Router.push("/troubleshoot");
  };

  return (
    <section className="pricing-advisor-section">
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
        <div className="pricing-advisor-content trouble-section">
          <div className="card">
            <div className="card">
              <div className="title">Select Option</div>
              {/* <div className="dots">...</div> */}
            </div>
            <div className="chat-container">
              {chat_gpt &&
                chat_gpt.map((item) => (
                  <ChatCard>
                    <Radio.Button
                      className="radio-button"
                      key={item.id}
                      value={item.id}
                      onClick={(e) => selectedData(e.target.value)}
                    >
                      {item.subject}
                    </Radio.Button>
                  </ChatCard>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const mapStateToProps = (state) => {
  const { chat_gpt } = state;
  return { chat_gpt };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  // showLoader: loaderActions.show,
  // hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(troubleshootSubject)
);
