import React, { Fragment, useEffect } from "react";
import { Space, List, Avatar } from "antd";
import { Container } from "reactstrap";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { CompanyIcon } from "../../components/icons";
import Router, { withRouter, useRouter } from "next/router";
import { connect } from "react-redux";
import Link from "next/link";
import { crudActions, loaderActions } from "../../_actions";
import moment from "moment";
import { crudService } from "../../_services";
import { isBrowser, isMobile } from "react-device-detect";
import Image from "next/future/image";

const ConsultantProfile = ({
  consultant,
  getAllCrud,
  createCrud,
  authentication,
}) => {
  useEffect(() => {
    if (!authentication.loggedIn) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (consultantsID) {
      getAllCrud("consultant", "consultants", {
        consultant_id: consultantsID,
      });
      createCrud("consultant_search_logs", "consultants/search_logs", {
        consultant_id: consultantsID,
      });
    }
    // getAllCrud("time-zone", "time-zone");
  }, []);

  const findMinRate = (rateArray) => {
    if (rateArray == undefined || !rateArray.length) {
      return 0;
    }
    const rateList = rateArray.map((rate) => rate.amount_per_hour);
    const minRate = Math.min(...rateList);
    return minRate;
  };

  const meetingRoute = () => {
    Router.push("create_meeting");
  };

  const hireRoute = () => {
    Router.push("hire");
  };

  const goToMessagePage = (data) => {
    // console.log("Data", data);
    if (data.chat_history && data.chat_history.length) {
      const {
        chat_history,
        first_name,
        last_name,
        country,
        profile_summary,
        image,
        rates,
      } = data;
      const lastChatHistory = chat_history[chat_history.length - 1];
      const profile = {
        fullName: `${first_name} ${last_name ? last_name : ""}`,
        country: country.name,
        summary: profile_summary,
        image: image,
        minRate: findMinRate(rates),
      };
      const messageDetail = {
        chat_history: lastChatHistory,
        consultant: profile,
      };
      localStorage.setItem("messageDetail", JSON.stringify(messageDetail));
      Router.push({
        pathname: "message",
      });
      // console.log("messageDetail", messageDetail);
    }
  };

  return (
    <section className="consultant-page-section profile">
      <div className="page-heading empty"></div>

      <Container>
        {isBrowser && (
          <div className="card">
            <div className="self-description-section">
              <div className="description">
                <div className="logo">
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    preview="false"
                    src={
                      consultant?.image
                        ? consultant?.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="profile"
                  />
                </div>
                <Space direction="vertical" className="detail">
                  <h5 className="title">
                    {consultant?.first_name} {consultant?.last_name}
                  </h5>
                  <p className="address">
                    <span className="icon">
                      <EnvironmentOutlined />
                    </span>
                    {consultant?.country?.name}
                  </p>
                </Space>
              </div>
              <div className="rate-detail">
                <p>Starts at</p>
                {consultant && consultant.is_company ? (
                  <p>
                    <span>$5000</span>/Project
                  </p>
                ) : (
                  <p>
                    <span>${findMinRate(consultant && consultant.rates)}</span>/
                    Hour
                  </p>
                )}
              </div>
            </div>
            <div className="self-summary-section">
              <div className="info">{consultant?.profile_summary}</div>
              <Space direction="horizontal">
                <div
                  className="custom-btn with-bg"
                  onClick={() => goToMessagePage(consultant)}
                  disabled={
                    consultant &&
                    consultant.chat_history &&
                    consultant.chat_history.length
                      ? false
                      : true
                  }
                >
                  Message
                </div>
                <div className="custom-btn outline" onClick={meetingRoute}>
                  Video Call
                </div>
                {/* <div className="custom-btn gray" onClick={hireRoute}>
                Hire for Project
              </div> */}
              </Space>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="card">
            <div className="self-description-section">
              <div className="description">
                <div className="logo">
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    preview="false"
                    src={
                      consultant?.image
                        ? consultant?.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="profile"
                  />
                </div>
                <Space direction="vertical" className="detail">
                  <h5 className="title">
                    {consultant?.first_name} {consultant?.last_name}
                  </h5>
                  <p className="address">
                    <span className="icon">
                      <EnvironmentOutlined />
                    </span>
                    {consultant?.country?.name}
                  </p>
                </Space>
              </div>
            </div>
            <div className="info">{consultant?.profile_summary}</div>
            <Space className="rate-card-wrapper" size={12}>
              <div className="rate-detail">
                <p>Starts at</p>
                {consultant && consultant.is_company ? (
                  <p>
                    <span>$5000</span>/Project
                  </p>
                ) : (
                  <p>
                    <span>${findMinRate(consultant && consultant.rates)}</span>/
                    Hour
                  </p>
                )}
              </div>
              {/* <div className="rate-detail" style={{display: "none"}}>
                <p>Project work</p>
                <p>
                  <span>$0</span>/ Hour
                </p>
              </div> */}
            </Space>

            <Space className="self-summary-section-mobile" size={12}>
              <div className="custom-btn outline" onClick={meetingRoute}>
                Video Call
              </div>
              <div
                className="custom-btn outline"
                onClick={() => goToMessagePage(consultant)}
                disabled={
                  consultant &&
                  consultant.chat_history &&
                  consultant.chat_history.length
                    ? false
                    : true
                }
              >
                Message
              </div>
            </Space>
          </div>
        )}
        <div className="card">
          <div className="expertise-section">
            <p className="title">Skills</p>
            <Space direction={isBrowser ? "" : "vertical"} wrap>
              {consultant &&
                consultant.rates.length > 0 &&
                consultant.rates.map(({ skill }) => (
                  <div className="custom-btn with-bg-light text-bg">
                    {skill}
                  </div>
                ))}
            </Space>
          </div>
        </div>
        <div className="card">
          <div className="expertise-section">
            <p className="title">Subskills</p>
            <Space direction={isBrowser ? "" : "vertical"} wrap>
              {consultant &&
                consultant.rates.length > 0 &&
                consultant.rates.map((skill) =>
                  skill.sub_skills?.map(({ name }) => (
                    <div className="custom-btn with-bg-light text-bg">
                      {name}
                    </div>
                  ))
                )}
            </Space>
          </div>
        </div>
        <div className="card">
          <div className="about-section">
            <p className="title">About</p>
            <p className="detail">{consultant?.details}</p>
          </div>
        </div>
        {/* 
        <div className="card">
          <div className="industries-section">
            <p className="title">Industries</p>
            <Space>
              {["Marketing & Advertising"].map((tech) => (
                <div className="custom-btn with-bg-light text-bg">{tech}</div>
              ))}
            </Space>
          </div>
        </div>
        <div className="card">
          <div className="language-section">
            <p className="title">Language</p>
            <Space>
              {["German"].map((tech) => (
                <div className="custom-btn with-bg-light text-bg">{tech}</div>
              ))}
            </Space>
          </div>
        </div> */}
        <div className="card">
          <div className="rate-section">
            <p className="title">Rate Card</p>

            <div className="rate-card-wrapper">
              {consultant &&
                consultant.rates.map((data) => (
                  <div className="rate-card">
                    <div className="rate-category">Category: {data.skill}</div>
                    <div className="rate">${data.amount_per_hour}/hr</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {consultant && !consultant.is_company && (
          <div className="card">
            <div className="work-section">
              <p className="title">Work</p>
              <List
                itemLayout="vertical"
                // size="small"
                dataSource={
                  consultant && consultant.works ? consultant.works : []
                }
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <div className="self-description-section">
                      <div className="description">
                        {item.company_logo ? (
                          <Image
                            style={{ borderRadius: "50%" }}
                            width={60}
                            height={60}
                            preview="false"
                            src={item.company_logo}
                            alt="company-logo"
                          />
                        ) : (
                          <div className="custom-icon">
                            <CompanyIcon style={{ width: 43, height: 40 }} />
                          </div>
                        )}
                        <div className="detail">
                          <div className="title">{item.company_name}</div>
                          <div className="designation">{item.designation}</div>
                          <div className="date">
                            {item.from_year} -
                            {item.is_present ? "Present" : item.to_year}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <p className="detail">
                    Armitage Communications joined the Napier Group in January
                    2019, expanding our expertise and client base. Armitage is a
                    leading agency supplying PR, marketing, video and animation
                    services to FTSE250 and Blue Chip companies in B2B sectors,
                    including engineering, telecommunications, utilities, and
                    construction.
                  </p> */}
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
        {/* <div className="card">
          <div className="education-section">
            <p className="title">Education</p>
            <List
              itemLayout="vertical"
              size="larg"
              dataSource={[
                { name: "Kingston University", course: "MBA", year: 2019 },
                { name: "University of Surrey", course: "MEng", year: 2022 },
              ]}
              renderItem={(item) => (
                <List.Item key={item.title}>
                  <div className="self-description-section">
                    <div className="description">
                      <div className="custom-icon">
                        <CompanyIcon style={{ width: 43, height: 40 }} />
                      </div>
                      <div className="detail">
                        <div className="title">{item.name}</div>
                        <div className="designation">{item.course}</div>
                        <div className="date">{item.year}</div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className="card">
          <div className="award-section">
            <p className="title">Awards</p>
            <List
              itemLayout="vertical"
              size="larg"
              dataSource={[
                {
                  name: "Associate Fellow of the Higher Education Academy",
                  year: 2020,
                },
                {
                  name: "Associate Fellow of the Higher Education Academy",
                  year: 2023,
                },
              ]}
              renderItem={(item) => (
                <List.Item key={item.title}>
                  <div className="self-description-section">
                    <div className="description">
                      <div className="custom-icon">
                        <CompanyIcon style={{ width: 43, height: 40 }} />
                      </div>
                      <div className="detail">
                        <div className="title">{item.name}</div>
                        <div className="date">{item.year}</div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div> */}
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { consultant, authentication } = state;
  return {
    consultant: consultant && consultant.length ? consultant[0] : null,
    authentication,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  createCrud: crudActions._create,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(ConsultantProfile)
);
