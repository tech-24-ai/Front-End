import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import { Container } from "reactstrap";
import { alertActions, crudActions } from "../../../_actions";
import { connect } from "react-redux";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { crudService } from "../../../_services";
import {
  Form,
  Space,
  Upload,
  Tabs,
  Card,
  Input,
  Select,
  Button,
  Modal,
  Label,
} from "antd";
import { RightOutlined } from "@ant-design/icons";
import view_icon from "../../../public/new_images/view_icon.svg";
import "draft-js/dist/Draft.css";
import "react-quill/dist/quill.snow.css";

import Router, { useRouter } from "next/router";
import myImageLoader from "../../../../../components/imageLoader";
import ShareSocialMedia from "../../../../../components/shareSocial";
import { ShareAltOutlined, SaveOutlined } from "@ant-design/icons";

import { isMobile } from "react-device-detect";


const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  useEffect(() => {
    getAllCrud("communitypost", "communitypost");
  }, [updateCom]);
  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};
const NewsDetails = ({ getAllCrud, success, showAlert, downloadDocument }) => {
  const router = useRouter();
  const slugQuery = router.query;
  console.log('slugQuery', slugQuery);
  const socialShareLink = window.location.href;

  const [description, setDescription] = useState("");
  const [communityQuestionDetail, setCommunityQuestionDetail] = useState();
  const [newsAnnouncementDetail, setNewsAnnouncementDetail] = useState();

 


  const [updateCom, setUpdateCom] = useState(false);

 
  const [communityData, setCommunityData] = useState();
  const [announceData, setAnnounceData] = useState();


 

  const fetchCommunityData = () => {
    if (slugQuery.community) {
      crudService
        ._getAll(`community/details/${slugQuery.community}`)
        .then((data) => {
          setCommunityData(data?.data);
        });
    }
  };
  // const fetchNewsData = () => {
  //   if (slugQuery.community) {
  //     crudService
  //       ._getAll(`get_news_announcements/${slugQuery.community}`)
  //       .then((data) => {
  //         setAnnounceData(data?.data);
  //         console.log('announce', data?.data);
  //       });
  //   }
  // };

  useEffect(() => {
    fetchCommunityData();
    // fetchNewsData();
  }, [updateCom]);

  useEffect(() => {
    if (slugQuery.news) {
      crudService
        ._getAll(`get_news_announcements/show/${slugQuery.news}`, {})
        .then((data) => {
          setNewsAnnouncementDetail(data?.data);
          console.log('setNewsAnnouncementDetail:', data?.data);
        });
    }
  }, [updateCom]);

  useEffect(() => {
    if (slugQuery.question) {
      crudService
        ._getAll(`communitypost/details/${slugQuery.question}`, {})
        .then((data) => {
          setCommunityQuestionDetail(data?.data);
        });
    }
  }, [updateCom]);

  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment();
    const blogPostDateTime = moment.utc(createdAt).local().format("MM-DD-YYYY hh:mm A");

    const diffMilliseconds = currentDateTime.diff(blogPostDateTime);
    const duration = moment.duration(diffMilliseconds);

    let humanReadableDiff;
    if (duration.asMinutes() < 60) {
      humanReadableDiff = duration.minutes() + " minutes ago";
    } else {
      humanReadableDiff = duration.humanize(true);
    }
    return humanReadableDiff;
  };

 

 
  const handleCommunity = () => {
    Router.push("/community");
  };

  const handleCommunityDetails = () => {
    Router.push(`/community/community_detail`);
  };
  // const handleCommunityDetails = ({ url_slug }) => {
  //   Router.push(`/community/${url_slug}`);
  // };

  return (
    <>
      {
      communityData 
      && (
        <Container>
          <div className="row">
            <div className="col-md-12">
              <h4 className="mt-4 mb-1">
                <span
                  className="questions_font_12px"
                  onClick={() => handleCommunity()}
                  style={{
                    color: "#B0B8BF",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Community <RightOutlined style={{ verticalAlign: "0" }} />
                </span>{" "}
                <span
                  className="questions_font_12px"
                  onClick={() => handleCommunityDetails()}
                  style={{
                    color: "#B0B8BF",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                    {communityData?.name}{" "}
                  <RightOutlined style={{ verticalAlign: "0" }} />
                </span>
                <span
                  className="questions_font_12px"
                  style={{
                    color: "#0074D9",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {newsAnnouncementDetail?.title &&
                    newsAnnouncementDetail?.title.length > 30
                    ? `${newsAnnouncementDetail?.title.substring(0, 30)}...`
                    : newsAnnouncementDetail?.title}
                </span>
              </h4>
            </div>
          </div>
         
          <div className="profile-container row" style={{ marginTop: "0" }}>
            <div className="community-tab-container questions-tab-container community-detail-wrapper col-md-9">
              <div className="cards-container">
                <Card
                  bordered={true}
                  style={{
                    width: "100%",
                    height: "fit-content",
                    marginTop: "1rem",
                  }}
                >
                  <div className="cards-header">
                    <div>
                      <div className="img">
                        <Image
                          style={{ borderRadius: "5px", zIndex: "1" }}
                          width={50}
                          height={50}
                          preview="false"
                          src={
                            "https://elasticbeanstalk-us-east-1-847794743507.s3.amazonaws.com/zhIkGvJgez"
                          }
                          alt="profile"
                        />
                      </div>
                      <div
                        className="profile"
                        style={{ flexDirection: "column", fontFamily: "Inter", maxWidth: '90%' }}
                      >
                        <h5>
                            {newsAnnouncementDetail?.title}
                        </h5>
                        <p>
{/* 
                          {communityQuestionDetail?.visitor?.name} {" ("}
                          {calculateTimeAgo(
                            communityQuestionDetail?.created_at
                          )}
                          {")"} */}
                        </p>
                      </div>
                    </div>


                  </div>
                  <p className="para questions_font_14px">
                    <span
                      style={{
                        fontFamily: "Inter",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: newsAnnouncementDetail?.description,
                      }}
                    ></span>
                  </p>

                  <div className="like-footer">
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        fontFamily: "Inter",
                        color: "#54616C",
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                      className="questions_font_12px"
                    >
                      <Image
                        loader={myImageLoader}
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                        width={16}
                        height={16}
                        preview="false"
                        src={view_icon}
                        alt="view-icon"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        {communityQuestionDetail?.views_counter} views
                      </span>
                    </p>
                    
                    <div className="questions_font_12px">
                        <ShareSocialMedia
                          link={window.location.href}
                          title={newsAnnouncementDetail?.name}
                        >
                          <div className="date share-btn">
                            <ShareAltOutlined /> Share
                          </div>
                        </ShareSocialMedia>
                      <div>
                        {/* <Image
                          loader={myImageLoader}
                          style={{ borderRadius: "5px", cursor: "pointer" }}
                          width={16}
                          height={16}
                          preview="false"
                          src={like_button}
                          alt="profile"
                        /> */}
                      </div>
                       
                      {/* <h6
                        className="questions_font_12px"
                        style={{
                          fontFamily: "Inter",
                        }}
                      >
                        Upvote <p></p>{" "}
                        {communityQuestionDetail?.__meta__?.total_helpful}
                      </h6> */}
                    </div>
                  </div>
                </Card>
              </div>

            </div>

            {communityData && (
              <div className="community-tab-container community-detail-card col-md-3">
                <div
                  className="cards-container"
                  style={{
                    display: isMobile && "unset",
                    gap: "unset",
                  }}
                >
                  <Card
                    bordered={true}
                    style={{
                      width: isMobile ? "100%" : 380,
                      height: "fit-content",
                      marginTop: "1rem",
                    }}
                    className="question_header_card"
                  >
                    <div
                      className="cards-header"
                      style={{
                        justifyContent: "flex-start",
                      }}
                    >
                      <Image
                        className="questions_image_48px"
                        loader={myImageLoader}
                        style={{ borderRadius: "2px" }}
                        width={56}
                        height={56}
                        preview="false"
                        src={
                          communityData?.image_url ||
                          "https://tech24-uat.s3.amazonaws.com/D10dkiDJHM"
                        }
                        alt="profile"
                        name="url"
                      />
                      <h6
                        style={{ fontFamily: "Poppins" }}
                        className="questions_font_14px"
                      >
                        {communityData?.name}
                      </h6>
                    
                    </div>
                    <hr />
                    <div
                      className="cards-body questions_font_12px"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: communityData?.description,
                        }}
                      ></span>
                    </div>
                    <hr />
                    <div
                      className="following-section"
                      style={{
                        justifyContent: isMobile && "space-evenly",
                        fontFamily: "Inter",
                      }}
                    >
                      <div>
                        <div className="head questions_font_14px">Answers</div>
                        <div className="count">
                          {communityData?.__meta__?.total_post_reply}
                        </div>
                      </div>
                      <div className="custom-border"></div>
                      <div>
                        <div className="head questions_font_14px">
                          Questions{" "}
                        </div>
                        <div className="count">
                          {communityData?.__meta__?.total_posts}
                        </div>
                      </div>
                    </div>
                 
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { communitypost } = state;
  return {
    communitypost,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  createCrud: crudActions._create,
  success: alertActions.success,
  showAlert: alertActions.warning,
  downloadDocument: crudActions._download,

};

export default connect(
  mapStateToProps,
  actionCreators
)(NewsDetails);
