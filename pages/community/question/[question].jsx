import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import { Container } from "reactstrap";

import three_dot_icon from "../../../public/new_images/3dots.svg";
import message_icon from "../../../public/new_images/message_icon.svg";
import like_button from "../../../public/new_images/like_button.svg";
import dislike_button from "../../../public/new_images/dislike_button.svg";
import { alertActions, crudActions, loaderActions } from "../../../_actions";
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
import { RightOutlined, ShareAltOutlined } from "@ant-design/icons";
import shorting_icon from "../../../public/new_images/sorting_icon.svg";
import view_icon from "../../../public/new_images/view_icon.svg";
import reply_icon from "../../../public/new_images/reply_icon.svg";
import "draft-js/dist/Draft.css";
import "react-quill/dist/quill.snow.css";
import community from "../..";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import share_icon from "../../../public/images/share-android.svg";
import flag_icon from "../../../public/images/triangle-flag.svg";
import linkedin_icon from "../../../public/images/linkedin/Linkedin.svg";
import facebook_icon from "../../../public/images/linkedin/Facebook.svg";
import email_icon from "../../../public/images/linkedin/Email.svg";
import twitter_icon from "../../../public/images/linkedin/X - jpeg.svg";
import myImageLoader from "../../../components/imageLoader";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import { isMobile } from "react-device-detect";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";
import ShareSocialMedia from "../../../components/shareSocial";
import { FlageIcon } from "../../../components/icons";
import ReportAbuseModal from "../../../components/community/ReportAbuseModal";

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
const CommunityQuestionDetail = ({
  getAllCrud,
  success,
  showAlert,
  downloadDocument,
  showLoader,
  hideLoader,
}) => {
  const router = useRouter();
  const slugQuery = router.query;
  console.log("QUESTIONPage", slugQuery);
  const socialShareLink = window.location.href;

  const [description, setDescription] = useState("");
  const [communityQuestionDetail, setCommunityQuestionDetail] = useState();
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [replyResponse, setReplyResponse] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplayModalOpen, setIsReplayModalOpen] = useState({
    isReplayModelOpen: false,
    details: {},
  });
  const [communityAnswers, setCommunityAnswers] = useState();

  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const [reportTypes, setReportTypes] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  useEffect(() => {
    fetchReportTypes();
  }, []);

  const fetchReportTypes = () => {
    crudService
      ._getAll("repost_abuse/types")
      .then((response) => {
        setReportTypes(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching report types:", error);
      });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setReportDescription(event.target.value);
  };

  const handleSubmit = (data, community_post_id, event) => {
    if (!selectedOption || !reportDescription) {
      return;
    }
    getPostReplies();

    const postData = {
      report_abuse_type_id: selectedOption,
      community_id: communityData?.id,
      community_post_id: communityQuestionDetail?.id,
      community_post_reply_id: 3,
      reason: reportDescription,
    };
    crudService
      ._create("repost_abuse", postData)
      .then((response) => {
        setSelectedOption("");
        setReportDescription("");
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
      });
  };
  const handleModalClose = () => {
    setShareModalVisible(false);
    setSocialModalVisible(false);
    setReportModalVisible(false);
  };

  const openShareModal = () => {
    setShareModalVisible(true);
  };

  const openSocialModal = () => {
    setSocialModalVisible(true);
  };

  const openReportModal = () => {
    setReportModalVisible(true);
  };

  const handleEditorChange = (html) => {
    setReplyResponse(html);
  };

  const [updateCom, setUpdateCom] = useState(false);
  const [form] = Form.useForm();
  const onChange = (key) => {};

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const [communityData, setCommunityData] = useState();

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsReplayModalOpen({ isReplayModelOpen: false, details: {} });
  };

  const joinCommunity = () => {
    crudService
      ._create("community/join", { community_id: communityData?.id })
      .then(() => window.location.reload());
  };

  const handleOk = (parent_id, community_post_id, replyText, isReply) => {
    setIsModalOpen(false);
    setIsReplayModalOpen({ isReplayModelOpen: false, details: {} });
    showLoader();
    if (replyText == undefined || replyText == null || replyText.trim() == "") {
      showAlert("Please add description.");
      return;
    }
    const postData = {
      parent_id: null,
      community_post_id: community_post_id,
      description: replyText,
    };

    crudService._create("communitypostreply", postData).then((response) => {
      hideLoader();
      if (response.status === 200) {
        isReply
          ? setIsReplayModalOpen({ isReplayModelOpen: false, details: {} })
          : setIsModalOpen(false);
        !isReply ? setDescription("") : setReplyResponse("");
        setUpdateCom(true);
        isReply
          ? success(
              "Your reply is being reviewed and will be shown after approval."
            )
          : success(
              "Your answer is being reviewed and will be shown after approval."
            );
      }
    });
  };

  const voteCommunity = (data, type) => {
    showLoader();
    crudService
      ._create("communitypost/vote", {
        community_post_id: data?.id,
        vote_type: type,
      })
      .then((data) => {
        hideLoader();
        data.status == 200 && setUpdateCom(true);
      });
  };

  const voteCommunityPostReplies = (data, type) => {
    showLoader();
    crudService
      ._create("communitypostreply/vote", {
        community_post_reply_id: data?.id,
        vote_type: type,
      })
      .then((data) => {
        hideLoader();
        data.status == 200 && setUpdateCom(true);
      });
  };

  useEffect(() => {
    if (slugQuery.question) {
      crudService
        ._getAll(`communitypost/details/${slugQuery.question}`, {})
        .then((data) => {
          if (data) {
            const { community, ...postDetails } = data.data;
            setCommunityData(community);
            setCommunityQuestionDetail(postDetails);
          }
        });
    }
  }, [updateCom, slugQuery]);

  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment();
    const blogPostDateTime = moment
      .utc(createdAt)
      .local()
      .format("MM-DD-YYYY hh:mm A");

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

  const getPostReplies = () => {
    const id = communityQuestionDetail?.id;

    if (id) {
      crudService
        ._getAll(`communitypostreply?&community_post_id=${id}`)
        .then((data) => {
          setCommunityAnswers(data?.data);
        });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getPostReplies();
    }, 100);
  }, [communityQuestionDetail, updateCom]);

  const viewComments = (comment) => {
    sessionStorage.setItem(
      "community_question_id",
      communityQuestionDetail?.url_slug
    );
    sessionStorage.setItem("community_parent_id", comment?.id);
    sessionStorage.setItem("community_post_details", JSON.stringify(comment));
    Router.push(`/community/question/comments`);
  };

  const handleCommunity = () => {
    Router.push("/community");
  };

  const handleCommunityDetails = ({ url_slug }) => {
    Router.push(`/community/${url_slug}`);
  };

  const handleDocumentDownload = (item) => {
    const { id, name } = item;
    downloadDocument(
      id,
      name,
      `communitypost/download_attachment?attachment_id=${id}`
    );
  };

  console.log("communityData", communityData);
  return (
    <>
      {communityData && (
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
                  onClick={() => handleCommunityDetails(communityData)}
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
                  {communityQuestionDetail?.title &&
                  communityQuestionDetail?.title.length > 30
                    ? `${communityQuestionDetail?.title.substring(0, 30)}...`
                    : communityQuestionDetail?.title}
                </span>
              </h4>
            </div>
          </div>
          {communityQuestionDetail?.is_discussion_open == 0 && (
            <div
              style={{
                color: "#001622",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                border: "1px solid #A6D6FF",
                borderRadius: "8px",
                padding: "10px 12px",
                backgroundColor: "#EAF5FF",
                marginTop: "2rem",
              }}
              className="questions_font_12px"
            >
              Please note that this query has been closed and hances you cannot
              post new responses to this query.{" "}
            </div>
          )}
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
                            communityQuestionDetail?.visitor?.profile_pic_url ||
                            ""
                          }
                          alt="profile"
                        />
                        {/* <span className="label-counter">18</span> */}
                      </div>
                      <div
                        className="profile"
                        style={{
                          flexDirection: "column",
                          fontFamily: "Inter",
                          maxWidth: "90%",
                        }}
                      >
                        <h5>{communityQuestionDetail?.title}</h5>
                        <p>
                          {/* {!isMobile && (
                      <>
                        {communityQuestionDetail?.title}{" "}
                        <div className="custom-border"></div>
                      </>
                    )} */}
                          {communityQuestionDetail?.visitor?.name} {" ("}
                          {calculateTimeAgo(
                            communityQuestionDetail?.created_at
                          )}
                          {")"}
                        </p>
                      </div>
                    </div>

                    {/* <div className="follow">
                      <div className="img" onClick={openShareModal}>
                        <Image
                          loader={myImageLoader}
                          style={{ borderRadius: "2px", cursor: "pointer" }}
                          width={32}
                          height={32}
                          preview="false"
                          src={three_dot_icon}
                          alt="profile"
                        />
                      </div>

                      <Modal
                        visible={
                          shareModalVisible ||
                          socialModalVisible ||
                          reportModalVisible
                        }
                        onCancel={handleModalClose}
                        footer={null}
                        onClick={false}
                        width={190}
                        bodyStyle={{
                          height: 100,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        style={
                          isMobile
                            ? { position: "relative", left: "6.5rem" }
                            : { position: "relative", left: "8rem" }
                        }
                      >
                        <div
                          style={{
                            width: "100%",
                            background: "#F9FAFB",
                            background: "",
                            padding: "6px",
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "20px",
                            justifyContent: "space-between",
                          }}
                        >
                          <a onClick={openSocialModal}>
                            <Image
                              loader={myImageLoader}
                              style={{ borderRadius: "2px", marginTop: "1px" }}
                              width={16}
                              height={16}
                              preview="false"
                              src={share_icon}
                              alt="profile"
                              name="url"
                            />{" "}
                            Share it
                          </a>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            background: "#F9FAFB",
                            background: "",
                            padding: "6px",
                            display: "flex",
                            flexDirection: "row",
                            fontSize: "20px",
                            color: "#FF3B3B",
                            justifyContent: "space-between",
                            borderTop: "1px solid #EBEBF0",
                          }}
                        >
                          <a onClick={openReportModal}>
                            <Image
                              loader={myImageLoader}
                              style={{ borderRadius: "2px", marginTop: "1px" }}
                              width={18}
                              height={18}
                              preview="false"
                              src={flag_icon}
                              alt="profile"
                              name="url"
                            />{" "}
                            Report
                          </a>
                        </div>
                      </Modal>
                      <Modal
                        visible={socialModalVisible}
                        onCancel={handleModalClose}
                        footer={null}
                      >
                        <span
                          style={{
                            marginBottom: "-20px",
                            fontWeight: "500",
                            fontSize: "20px",
                            fontFamily: "Poppins",
                            cursor: "pointer",
                          }}
                        >
                          Share
                        </span>
                        <hr />

                        <div style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              margin: "30px 0 10px 0",
                            }}
                          >
                            <LinkedinShareButton url={socialShareLink}>
                              <Image
                                loader={myImageLoader}
                                style={{ borderRadius: "2px" }}
                                width={56}
                                height={56}
                                preview="false"
                                src={linkedin_icon}
                                alt="profile"
                                name="url"
                              />
                              <div
                                style={{
                                  color: "#001622",
                                  textAlign: "center",
                                }}
                              >
                                Linkedin
                              </div>
                            </LinkedinShareButton>
                            <FacebookShareButton
                              url={socialShareLink}
                              quote={communityQuestionDetail?.title}
                            >
                              <Image
                                loader={myImageLoader}
                                style={{ borderRadius: "2px" }}
                                width={56}
                                height={56}
                                preview="false"
                                src={facebook_icon}
                                alt="profile"
                                name="url"
                              />
                              <div
                                style={{
                                  color: "#001622",
                                  textAlign: "center",
                                }}
                              >
                                Facebook
                              </div>
                            </FacebookShareButton>
                            <EmailShareButton
                              url={socialShareLink}
                              subject={communityQuestionDetail?.title}
                            >
                              <Image
                                loader={myImageLoader}
                                style={{ borderRadius: "2px" }}
                                width={56}
                                height={56}
                                preview="false"
                                src={email_icon}
                                alt="profile"
                                name="url"
                              />
                              <div
                                style={{
                                  color: "#001622",
                                  textAlign: "center",
                                }}
                              >
                                Email
                              </div>
                            </EmailShareButton>

                            <TwitterShareButton
                              url={socialShareLink}
                              title={communityQuestionDetail?.title}
                            >
                              <Image
                                loader={myImageLoader}
                                style={{ borderRadius: "2px" }}
                                width={56}
                                height={56}
                                preview="false"
                                src={twitter_icon}
                                alt="profile"
                                name="url"
                              />
                              <div
                                style={{
                                  color: "#001622",
                                  textAlign: "center",
                                }}
                              >
                                X (twitter)
                                <br />
                              </div>
                            </TwitterShareButton>
                          </div>
                        </div>
                      </Modal>

                      <Modal
                        visible={reportModalVisible}
                        footer={null}
                        onCancel={handleModalClose}
                      >
                        <span
                          style={{
                            marginBottom: "-20px",
                            fontWeight: "500",
                            fontSize: "20px",
                            fontFamily: "Poppins",
                            cursor: "pointer",
                          }}
                        >
                          Report this Question
                        </span>
                        <hr />
                        <Form
                          name="validateOnly"
                          layout="vertical"
                          autoComplete="off"
                          onSubmit={handleSubmit}
                        >
                          <Form.Item
                            style={{
                              fontWeight: 500,
                              fontFamily: "Inter",
                              fontSize: "14px",
                              color: "#4C4C4C",
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            label="Report a question"
                            name="report a question"
                          >
                            <select
                              value={selectedOption}
                              onChange={handleOptionChange}
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "2px",
                                padding: "12px",
                                fontWeight: 400,
                                fontSize: "16px",
                                color: "#001622",
                                fontFamily: "Inter",
                                width: "100%",
                              }}
                            >
                              {reportTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </Form.Item>
                          <Form.Item
                            style={{
                              fontWeight: 500,
                              fontFamily: "Inter",
                              fontSize: "14px",
                              color: "#4C4C4C",
                            }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            name="description"
                            label="Description"
                          >
                            <div style={{ width: "100%" }}>
                              <textarea
                                style={{
                                  width: "100%",
                                  height: "70px",
                                  padding: "10px",
                                }}
                                placeholder="Write a brief why you are reporting this question"
                                onChange={handleDescriptionChange}
                                value={reportDescription}
                              ></textarea>
                            </div>
                          </Form.Item>

                          <div
                            onClick={(e) => handleSubmit()}
                            className="btn"
                            type="submit"
                            style={{
                              width: isMobile ? "100%" : "470px",
                              background: "#0074D9",
                              borderRadius: "2px",
                              padding: "12px 16px",
                              color: "#fff",
                              fontWeight: 500,
                              fontFamily: "Inter",
                              fontSize: "18px",
                              marginTop: "1.2rem",
                            }}
                          >
                            Submit
                          </div>
                        </Form>
                      </Modal>
                    </div> */}
                  </div>
                  <p className="para questions_font_14px">
                    <span
                      style={{
                        fontFamily: "Inter",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: communityQuestionDetail?.description,
                      }}
                    ></span>
                  </p>
                  <div className="chips">
                    {communityQuestionDetail?.attachments?.map((item) => (
                      <div
                        style={{ fontFamily: "Inter", cursor: "pointer" }}
                        className="questions_font_10px"
                        onClick={() => handleDocumentDownload(item)}
                      >
                        {item?.name || "Attachment"}
                      </div>
                    ))}
                  </div>
                  <div className="chips">
                    {communityQuestionDetail?.postTags?.map((tag) => (
                      <div
                        style={{ fontFamily: "Inter" }}
                        className="questions_font_10px"
                      >
                        {tag?.name}
                      </div>
                    ))}
                  </div>
                  {/* <div className="chips">
              <p>
                {communityQuestionDetail?.__meta__?.total_post_replies} answers
              </p>
              <h6 className="custom-border"></h6>
              <p>{communityQuestionDetail?.views_counter} views</p>
            </div> */}
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
                    <div className="right-side-section">
                      <ShareSocialMedia
                        link={window.location.href}
                        title={communityQuestionDetail?.name}
                      >
                        <div className="share-btn">
                          <ShareAltOutlined />{" "}
                          <span className="btn-title">Share</span>
                        </div>
                      </ShareSocialMedia>
                      <div
                        className="report-btn"
                        onClick={() => setReportModalVisible(true)}
                      >
                        <FlageIcon />
                        <span className="btn-title">Report</span>
                      </div>
                      <ReportAbuseModal
                        reportTypes={reportTypes}
                        isModalOpen={reportModalVisible}
                        closeModel={(value) => setReportModalVisible(value)}
                        data={communityQuestionDetail}
                        reportFor="question"
                      />
                      <div className="rating questions_font_12px">
                        <div>
                          <Image
                            loader={myImageLoader}
                            style={{ borderRadius: "5px", cursor: "pointer" }}
                            width={16}
                            height={16}
                            preview="false"
                            src={like_button}
                            alt="profile"
                            onClick={() => {
                              voteCommunity(communityQuestionDetail, 1);
                            }}
                          />
                        </div>
                        <h6
                          className="questions_font_12px"
                          style={{
                            fontFamily: "Inter",
                          }}
                        >
                          Upvote <p></p>{" "}
                          {communityQuestionDetail?.__meta__?.total_helpful}
                        </h6>
                        {/* <div className="left-border">
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px", cursor: "pointer" }}
                      width={16}
                      height={16}
                      preview="false"
                      src={dislike_button}
                      alt="profile"
                      onClick={() => {
                        voteCommunity(communityQuestionDetail, 0);
                      }}
                    />
                  </div> */}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        borderLeft: "2px solid red",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                        borderColor: "#0074D9",
                        borderWidth: "4px",
                        height: isMobile ? "24px" : "26px",
                      }}
                    ></div>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: "20px",
                        fontFamily: "Poppins",
                        color: "#54616C",
                        marginLeft: "10px",
                      }}
                      className="questions_font_16px"
                    >
                      Answers ({communityAnswers?.length})
                    </div>
                  </div>

                  {communityQuestionDetail?.is_discussion_open == 1 ? (
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Inter",
                        color: "#FFFFFF",
                        padding: "4px 16px",
                        borderRadius: "2px",
                        backgroundColor: "#0074D9",
                        cursor: "pointer",
                      }}
                      className="questions_font_12px"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Answer this Question
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div
                  className="cards-container"
                  style={{
                    marginTop: 0,
                  }}
                >
                  {communityAnswers?.map((answer) => (
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
                                answer?.visitor?.profile_pic_url ||
                                "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                              }
                              alt="profile"
                            />
                            {/* <span className="label-counter">18</span> */}
                          </div>
                          <div
                            className="profile"
                            style={{ flexDirection: "column" }}
                          >
                            <h5>{answer?.visitor?.name}</h5>
                            <p>{calculateTimeAgo(answer?.created_at)}</p>
                          </div>
                          {answer?.is_correct_answer == 1 && (
                            <>
                              <div
                                className="custom-border best-answer"
                                style={{
                                  height: "20px",
                                  backgroundColor: "#D9DFE9",
                                  width: "1px",
                                }}
                              ></div>

                              <div
                                style={{
                                  border: "1px solid #FFCC00",
                                  borderRadius: "4px",
                                  padding: "6px 12px",
                                  fontFamily: "Inter",
                                  fontWeight: 500,
                                  fontSize: "12px",
                                  color: "#C79F00",
                                  height: "30px",
                                  backgroundColor: "rgba(255, 204, 0, 0.22)",
                                }}
                              >
                                Best Answer
                              </div>
                            </>
                          )}
                        </div>

                        <div className="follow">
                          {/* <p className="button">Follow</p> */}
                          <div className="img">
                            {/* <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "2px", cursor: "pointer" }}
                      width={32}
                      height={32}
                      preview="false"
                      src={three_dot_icon}
                      alt="profile"
                    /> */}
                          </div>
                        </div>
                      </div>
                      <p className="para questions_font_14px">
                        <span
                          style={{
                            fontFamily: "Inter",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: answer?.description,
                          }}
                        ></span>
                      </p>
                      {/* <div
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Inter",
                      color: "#0074D9",
                      margin: 0,
                    }}
                  >
                    Read More
                  </div> */}
                      {/* <div className="chips">
                {communityQuestionDetail?.postTags?.map((tag) => (
                  <div>{tag?.name}</div>
                ))}
              </div> */}
                      {/* <div className="chips">
              <p>
                {communityQuestionDetail?.__meta__?.total_post_replies} answers
              </p>
              <h6 className="custom-border"></h6>
              <p>{communityQuestionDetail?.views_counter} views</p>
            </div> */}
                      {communityQuestionDetail?.is_discussion_open == 1 && (
                        <div
                          className="like-footer"
                          style={{ marginTop: "1.5rem" }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              onClick={() =>
                                setIsReplayModalOpen({
                                  isReplayModelOpen: true,
                                  details: answer,
                                })
                              }
                              style={{
                                border: "1px solid #D9DFE9",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                backgroundColor: "#D9DFE9",
                                display: "flex",
                                width: "7rem",
                                cursor: "pointer",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              className="hide_replies"
                            >
                              <Image
                                loader={myImageLoader}
                                style={{
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}
                                width={16}
                                height={16}
                                preview="false"
                                src={reply_icon}
                                alt="reply-icon"
                              />

                              <div
                                style={{
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Inter",
                                  color: "#54616C",
                                  marginLeft: "5px",
                                }}
                                className="replies"
                              >
                                Reply
                              </div>
                            </div>
                            {answer?.comments && answer?.comments.length > 0 ? (
                              <div
                                style={{
                                  border: "1px solid #D9DFE9",
                                  padding: "8px 12px",
                                  borderRadius: "4px",
                                  backgroundColor: "#F2F4F7",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Inter",
                                  color: "#54616C",
                                  marginLeft: isMobile ? "6px" : "10px",
                                  color: "#0074D9",
                                  cursor: "pointer",
                                }}
                                className="questions_font_12px"
                                onClick={() => setIsShowReplies(!isShowReplies)}
                              >
                                {isShowReplies
                                  ? "Hide Replies"
                                  : "View Replies"}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="right-side-section">
                            <ShareSocialMedia
                              link={window.location.href}
                              title={communityQuestionDetail?.name}
                            >
                              <div className="share-btn">
                                <ShareAltOutlined />{" "}
                                <span className="btn-title">Share</span>
                              </div>
                            </ShareSocialMedia>
                            {/* <div className="report-btn">
                              <FlageIcon />
                              <span className="btn-title">Report</span>
                            </div> */}

                            <div className="rating">
                              <div>
                                <Image
                                  loader={myImageLoader}
                                  style={{
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                  }}
                                  width={16}
                                  height={16}
                                  preview="false"
                                  src={like_button}
                                  alt="profile"
                                  onClick={() => {
                                    voteCommunityPostReplies(answer, 1);
                                  }}
                                />
                              </div>

                              <h6 className="questions_font_12px">
                                Upvote <p></p> {answer?.__meta__?.total_helpful}
                              </h6>
                            </div>
                            {/* <div className="left-border">
                  <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "5px", cursor: "pointer" }}
                    width={16}
                    height={16}
                    preview="false"
                    src={dislike_button}
                    alt="profile"
                    onClick={() => {
                      voteCommunityPostReplies(answer, 0);
                    }}
                  />
                </div> */}
                          </div>
                        </div>
                      )}

                      {answer?.comments.length > 0 &&
                        isShowReplies &&
                        answer?.comments.map((comment) => (
                          <>
                            <hr className="dotted" />
                            <div className="cards-header">
                              <div>
                                <div className="img">
                                  <Image
                                    style={{ borderRadius: "5px", zIndex: "1" }}
                                    width={50}
                                    height={50}
                                    preview="false"
                                    src={
                                      comment?.visitor?.profile_pic_url ||
                                      "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                                    }
                                    alt="profile"
                                  />
                                  {/* <span className="label-counter">18</span> */}
                                </div>
                                <div
                                  className="profile"
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    fontFamily: "Inter",
                                    marginTop: "-0.5rem",
                                  }}
                                >
                                  <h5 className="questions_font_14px">
                                    {comment?.visitor?.name}
                                  </h5>
                                  <p
                                    style={{
                                      margin: 0,
                                      alignItems: "center",
                                      fontFamily: "",
                                    }}
                                  >
                                    <div
                                      className="custom-border"
                                      style={{ margin: "0 5px", height: "8px" }}
                                    ></div>

                                    {calculateTimeAgo(comment?.created_at)}
                                  </p>
                                </div>
                              </div>

                              <div className="follow">
                                {/* <p className="button">Follow</p> */}
                                <EyeOutlined
                                  title="view comments"
                                  onClick={() => viewComments(comment)}
                                />
                                {/* <div className="img">
                              <Image
                                loader={myImageLoader}
                                style={{
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                                width={32}
                                height={32}
                                preview="false"
                                src={three_dot_icon}
                                alt="profile"
                              />
                            </div> */}
                              </div>
                            </div>
                            <p
                              className="para"
                              style={{
                                fontFamily: "Inter",
                              }}
                            >
                              <span
                                className="questions_font_12px"
                                dangerouslySetInnerHTML={{
                                  __html: comment?.description,
                                }}
                              ></span>
                            </p>
                          </>
                        ))}
                      <div>
                        {answer?.comments?.length > 2 && isShowReplies && (
                          <div
                            style={{
                              border: "1px solid #D9DFE9",
                              padding: "8px 12px",
                              borderRadius: "4px",
                              backgroundColor: "#F2F4F7",
                              fontSize: isMobile ? "12px" : "14px",
                              fontWeight: 500,
                              width: "105px",
                              fontFamily: "Inter",
                              color: "#54616C",
                              marginLeft: isMobile ? "6px" : "10px",
                              color: "#0074D9",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              sessionStorage.setItem(
                                "community_question_id",
                                communityQuestionDetail?.url_slug
                              );
                              sessionStorage.setItem(
                                "community_parent_id",
                                answer?.id
                              );
                              sessionStorage.setItem(
                                "community_post_details",
                                JSON.stringify(answer)
                              );
                              Router.push("question/comments");
                            }}
                          >
                            View More
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
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
                  <div>
                    <Modal
                      visible={isModalOpen}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <span
                        style={{
                          marginBottom: "-20px",
                          fontWeight: "500",
                          fontSize: "20px",
                          fontFamily: "Poppins",
                          cursor: "pointer",
                        }}
                      >
                        Answer this Question
                      </span>
                      {/* <div className="mt-2 mb-3">
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#54616C",
                        fontFamily: "Inter",
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Egit liboro erat curcus.
                    </span>
                  </div> */}
                      <Form
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                      >
                        <Form.Item
                          style={{
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            color: "#4C4C4C",
                          }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          label="Question"
                        >
                          <div
                            style={{
                              backgroundColor: "#D9DFE9",
                              borderRadius: "2px",
                              padding: "12px",
                              fontWeight: 400,
                              fontSize: "16px",
                              color: "#54616C",
                              fontFamily: "Inter",
                            }}
                          >
                            {communityQuestionDetail?.title}
                          </div>
                        </Form.Item>
                        <Form.Item
                          style={{
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            color: "#4C4C4C",
                          }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          name="description"
                          label="Answer"
                          onChange={(e) => setDescription(e.target.value)}
                        >
                          <div>
                            <ReactQuill
                              theme="snow"
                              value={description}
                              onChange={(e) => setDescription(e)}
                              style={{ height: "100px", borderRadius: "2px" }}
                              placeholder="Write your answer here"
                            />
                          </div>
                        </Form.Item>

                        <div
                          onClick={(e) =>
                            handleOk(
                              null,
                              communityQuestionDetail?.id,
                              description,
                              false
                            )
                          }
                          className="btn"
                          style={{
                            width: isMobile ? "100%" : "470px",
                            background: "#0074D9",
                            borderRadius: "2px",
                            padding: "12px 16px",
                            color: "#fff",
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "18px",
                            marginTop: "2.5rem",
                          }}
                        >
                          Submit
                        </div>
                      </Form>
                    </Modal>

                    {/* replay modal */}
                    <Modal
                      visible={isReplayModalOpen?.isReplayModelOpen}
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <span
                        style={{
                          marginBottom: "-20px",
                          fontWeight: "500",
                          fontSize: "20px",
                          fontFamily: "Poppins",
                          cursor: "pointer",
                        }}
                      >
                        Reply
                      </span>
                      <div className="mt-2 mb-3">
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#54616C",
                            fontFamily: "Inter",
                            fontSize: "16px",
                          }}
                        >
                          {" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: isReplayModalOpen?.details?.description,
                            }}
                          ></span>
                        </span>
                      </div>
                      <Form
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                      >
                        <Form.Item
                          style={{
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            color: "#4C4C4C",
                          }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          name="replyResponse"
                          label="Response"
                          onChange={(e) => setReplyResponse(e.target.value)}
                        >
                          <div>
                            <ReactQuill
                              theme="snow"
                              value={replyResponse}
                              onChange={handleEditorChange}
                              style={{ height: "100px", borderRadius: "2px" }}
                              placeholder="Write your answer here"
                            />
                          </div>
                        </Form.Item>

                        <div
                          onClick={() =>
                            handleOk(
                              isReplayModalOpen?.details?.parent_id == null
                                ? isReplayModalOpen?.details?.id
                                : isReplayModalOpen?.details?.parent_id,
                              isReplayModalOpen?.details?.community_post_id,
                              replyResponse,
                              true
                            )
                          }
                          className="btn"
                          style={{
                            width: isMobile ? "100%" : "470px",
                            background: "#0074D9",
                            borderRadius: "2px",
                            padding: "12px 16px",
                            color: "#fff",
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "18px",
                            marginTop: "2.5rem",
                          }}
                        >
                          Submit
                        </div>
                      </Form>
                    </Modal>
                  </div>

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
                      {/* <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "2px", cursor: "pointer" }}
                    width={24}
                    height={24}
                    preview="false"
                    src={three_dot_icon}
                    alt="profile"
                  /> */}
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
                    {/* <hr />
                {communityData?.communityMember?.length === 0 ? (
                  <div
                    onClick={() => joinCommunity()}
                    style={{
                      width: "100%",
                      border: "1.5px solid #0074D9",
                      padding: "12px 16px",
                      borderRadius: "2px",
                      fontWeight: "500",
                      fontSize: "18px",
                      color: "#0074D9",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Join Community
                  </div>
                ) : (
                  <p
                    style={{
                      textAlign: "left",
                      width: "100%",
                      paddingLeft: "5px",
                      marginTop: "15px",
                      marginBottom: isMobile ? "5px" : "-5px",
                      fontWeight: "600",
                      fontFamily: "Inter",
                    }}
                  >
                    Member since{" "}
                    {moment(
                      communityData?.communityMember[0]?.created_at
                    ).format("MMMM DD, YYYY")}
                  </p>
                )} */}
                  </Card>
                  {/* ))} */}
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
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(
  mapStateToProps,
  actionCreators
)(CommunityQuestionDetail);
