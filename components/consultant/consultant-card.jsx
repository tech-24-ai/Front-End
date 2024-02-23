import { Card, Image, Rate, Carousel } from "antd";
import { Button } from "reactstrap";
import { isMobile, isBrowser } from "react-device-detect";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const consultantCard = ({ consultants }) => {
  const detailsRouter = (id) => {
    sessionStorage.setItem("consultantID", id);
    Router.push("/consultants/detail");
  };

  const findMin = (rateArray) => {
    const rateList = rateArray.map((rate) => rate.amount_per_hour);
    const minRate = Math.min(...rateList);
    return minRate;
  };
  return (
    <>
      {consultants &&
        consultants.data.map((data) => {
          return (
            <Card
              className="consultantCard"
              hoverable
              style={{
                minHeight: isBrowser ? "450px" : "400px",
                border: "1px solid #e5e7eb",
                backgroundColor: "#F4F6F6",
                borderRadius: "10px",
                // backgroundColor: "rgb(235,235,235)",
              }}
            >
              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "block", textAlign: "center" }}>
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={100}
                      height={100}
                      preview={false}
                      src={
                        data.image
                          ? data.image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                      }
                      alt="profile"
                    />
                  </div>
                  <div>
                    <p className="name">
                      {data.first_name} {data.last_name}
                    </p>

                    <p className="region">
                      <span>
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
                      {data?.country?.name}
                    </p>
                    <p className="proffession">{data.profile_summary}</p>
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: "125px",
                    overflowY: "scroll",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {data &&
                    data.technologies?.map((module) => {
                      return module.name == "" ? (
                        <></>
                      ) : (
                        <div>
                          <ul>
                            <li>{module.name}</li>
                          </ul>
                        </div>
                      );
                    })}
                </div>
                <br />
                <div
                  style={{
                    position: "absolute",
                    bottom: "35px",
                    left: "0px",
                    right: "0px",
                  }}
                >
                  {data && data.works.length ? (
                    <p className="region">Past Experience</p>
                  ) : (
                    <></>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "15px 0px",
                      marginBottom: "40px",
                    }}
                  >
                    <CarouselData data={data} />
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  right: "0px",
                }}
              >
                <Button
                  onClick={() => detailsRouter(data.id)}
                  className="button"
                >
                  {data.rates.length
                    ? `Speak to Consultant Starting from $ ${findMin(
                        data.rates
                      )}`
                    : `Speak to Consultant`}
                </Button>
              </div>
            </Card>
          );
        })}
    </>
  );
};

const mapStateToProps = (state) => {
  const { consultants } = state;
  return {
    consultants,
  };
};

export default withRouter(connect(mapStateToProps)(consultantCard));

const CarouselData = ({ data }) => {
  const carousel = useRef(null);
  const next = () => {
    carousel.next();
  };
  const previous = () => {
    carousel.prev();
  };
  // console.log("data", data);
  return (
    <>
      {data && data.works.length ? (
        <>
          {data.works.length > 1 && (
            <CaretLeftOutlined className="newbutton" onClick={previous} />
          )}
          <Carousel
            style={{ width: isBrowser ? "330px" : "100%" }}
            effect="fade"
            ref={(node) => (carousel = node)}
          >
            {data &&
              data.works.map((worksData) => (
                <div className="workContainer">
                  <Image
                    width={"55px"}
                    height={"45px"}
                    preview={false}
                    src={worksData.company_logo}
                    alt="logo"
                    style={{ marginLeft: "10px", borderRadius: "50%" }}
                  />
                  <div style={{ marginLeft: "20px", width: "100%" }}>
                    <p style={{ fontSize: "14px" }}>{worksData.company_name}</p>
                    <p style={{ fontWeight: "300", fontSize: "12px" }}>
                      {worksData.designation}
                    </p>
                  </div>
                </div>
              ))}
          </Carousel>
          {data.works.length > 1 && (
            <CaretRightOutlined className="newbutton" onClick={next} />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
