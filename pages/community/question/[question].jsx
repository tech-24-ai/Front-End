import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import { Container } from "reactstrap";

import like_button from "../../../public/new_images/like_button.svg";
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
  Tree,
  Divider,
} from "antd";
import {
  RightOutlined,
  ShareAltOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import shorting_icon from "../../../public/new_images/sorting_icon.svg";
import view_icon from "../../../public/new_images/view_icon.svg";
import reply_icon from "../../../public/new_images/reply_icon.svg";
import "draft-js/dist/Draft.css";
import "react-quill/dist/quill.snow.css";
import community from "../..";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import myImageLoader from "../../../components/imageLoader";
import profile_img from "../../../public/new_images/profile.svg";
import hide_icon from "../../../public/new_images/hide.svg";
import show_icon from "../../../public/images/input/show.svg";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import { isMobile } from "react-device-detect";

import ShareSocialMedia from "../../../components/shareSocial";
import { FlageIcon, ReplyIcon } from "../../../components/icons";
import ReportAbuseModal from "../../../components/community/ReportAbuseModal";
import { calculateDateTime } from "../../../_global";
import { Fragment } from "react";

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

  const [reportModalVisible, setReportModalVisible] = useState("");

  const [reportTypes, setReportTypes] = useState([]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

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
    if (replyText == undefined || replyText == null || replyText.trim() == "") {
      showAlert("Please add description.");
      return;
    }
    const postData = {
      parent_id: parent_id,
      community_post_id: community_post_id,
      description: replyText,
    };
    showLoader();
    setIsModalOpen(false);
    setIsReplayModalOpen({ isReplayModelOpen: false, details: {} });
    crudService
      ._create("communitypostreply", postData)
      .then((response) => {
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
      })
      .catch(() => {
        hideLoader();
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
      })
      .catch(() => {
        hideLoader();
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
      })
      .catch(() => {
        hideLoader();
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

  const fetchComments = (commentId) => {
    crudService
      ._getAll(`communitypostreply/comments?&parent_id=${commentId}`)
      .then((data) => {
        const treeData = bindComments(communityAnswers, commentId, data?.data);
        setCommunityAnswers(treeData);
      });
  };

  const bindComments = (tree, commentId, newComments) => {
    if (tree.id === commentId) {
      tree.comments = newComments;

      return tree;
    }

    const updatedComments = tree.comments?.map((comment) =>
      bindComments(comment, commentId, newComments)
    );

    if (updatedComments) {
      return { ...tree, comments: updatedComments };
    }

    if (Array.isArray(tree)) {
      const updatedList = tree?.map((comment) =>
        bindComments(comment, commentId, newComments)
      );

      return updatedList;
    }

    return tree;
  };

  const prepareCommentData = (comments, commentLevel = 1) => {
    const data = comments.map(
      ({
        comments,
        created_at,
        description,
        id,
        parent_id,
        updated_at,
        visitor,
        __meta__,
        community_post_id,
      }) => {
        return {
          id,
          community_post_id,
          title: description,
          key: id,
          children: comments?.length
            ? prepareCommentData(comments, commentLevel + 1)
            : [],
          created_at,
          parent_id,
          updated_at,
          visitor,
          description,
          total_comments: __meta__?.total_comments ?? 0,
          commentLevel,
        };
      }
    );

    return data;
  };

  const renderComments = (commentData) => {
    const treeData = prepareCommentData(commentData);
    return (
      <Tree
        showLine={{ showLeafIcon: false }}
        selectable={false}
        autoExpandParent={true}
        blockNode={true}
        treeData={treeData}
        titleRender={(comment) => {
          return (
            <div
              className="comment-wrapper"
              style={{
                marginBottom: "10px",
              }}
            >
              <div>
                <div
                  className="cards-header"
                  style={{ alignItems: "flex-start" }}
                >
                  <div>
                    <div className="img">
                      <Image
                        style={{ borderRadius: "5px", zIndex: "1" }}
                        width={50}
                        height={50}
                        preview="false"
                        src={comment?.visitor?.profile_pic_url || profile_img}
                        alt="profile"
                      />
                      {/* <span className="label-counter">18</span> */}
                    </div>
                    <div
                      className="profile"
                      style={{
                        flexDirection: "column",
                        // alignItems: "center",
                        fontFamily: "Inter",
                        // marginTop: "-0.5rem",
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
                        {/* <div
                          className="custom-border"
                          style={{ margin: "0 5px", height: "8px" }}
                        ></div> */}

                        {calculateDateTime(comment?.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="follow">
                    <div className="right-side-section">
                      {comment.commentLevel < 5 && (
                        <div
                          className="reply-btn"
                          onClick={() =>
                            setIsReplayModalOpen({
                              isReplayModelOpen: true,
                              details: { ...comment, parent_id: comment.id },
                            })
                          }
                        >
                          <ReplyIcon /> <span className="btn-title">Reply</span>
                        </div>
                      )}
                      <ShareSocialMedia
                        link={window.location.href}
                        title={communityQuestionDetail?.title}
                      >
                        <div className="share-btn">
                          <ShareAltOutlined />{" "}
                          <span className="btn-title">Share</span>
                        </div>
                      </ShareSocialMedia>
                      <div
                        className="report-btn"
                        onClick={() => setReportModalVisible("comment")}
                      >
                        <FlageIcon />
                        <span className="btn-title">Report</span>
                      </div>
                      {reportModalVisible === "comment" && (
                        <ReportAbuseModal
                          reportTypes={reportTypes}
                          isModalOpen={reportModalVisible === "comment"}
                          closeModel={() => setReportModalVisible("")}
                          data={{
                            ...comment,
                            community_id: communityData?.id,
                          }}
                          reportFor="comment"
                          heading="Report this Comment"
                        />
                      )}
                    </div>
                    {/* <EyeOutlined
                        title="view comments"
                        onClick={() => viewComments(comment)}
                      /> */}
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
                      __html: comment?.title,
                    }}
                  ></span>
                </p>
              </div>
              {comment?.total_comments > 0 && !comment?.children.length && (
                <PlusSquareOutlined
                  className="expand-btn"
                  onClick={() => fetchComments(comment.key)}
                />
              )}
              {comment.comments?.length > 0 && (
                <div style={{ padding: "0 1rem" }}>
                  {renderComments(comment.comments)}
                </div>
              )}
            </div>
          );
        }}
      />
    );
  };

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
                  {communityData?.name}
                  {" (Question)"}
                  <RightOutlined
                    style={{ verticalAlign: "0", padding: "0 6px" }}
                  />
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
          <h5 style={{ margin: "1.4rem 0" }}>Question</h5>
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
                            profile_img
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
                          {calculateDateTime(
                            communityQuestionDetail?.created_at
                          )}
                          {")"}
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
                        __html: communityQuestionDetail?.description,
                      }}
                    ></span>
                  </p>
                  <div className="chips">
                    {communityQuestionDetail?.attachments?.map((item) => (
                      <div
                        style={{ fontFamily: "Inter", cursor: "pointer" }}
                        className="questions_font_10px"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDocumentDownload(item);
                        }}
                      >
                        {item?.name || "Attachment"}
                      </div>
                    ))}
                  </div>
                  <div className="chips">
                    {communityQuestionDetail?.postTags?.map((tag) => (
                      <div
                        style={{
                          fontFamily: "Inter",
                          backgroundColor: "unset",
                        }}
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
                        title={communityQuestionDetail?.title}
                      >
                        <div className="share-btn">
                          <ShareAltOutlined />{" "}
                          <span className="btn-title">Share</span>
                        </div>
                      </ShareSocialMedia>
                      <div
                        className="report-btn"
                        onClick={() => setReportModalVisible("question")}
                      >
                        <FlageIcon />
                        <span className="btn-title">Report</span>
                      </div>
                      {reportModalVisible === "question" && (
                        <ReportAbuseModal
                          reportTypes={reportTypes}
                          isModalOpen={reportModalVisible === "question"}
                          closeModel={(value) => setReportModalVisible(value)}
                          data={communityQuestionDetail}
                          reportFor="question"
                          heading="Report this Question"
                        />
                      )}
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
                                answer?.visitor?.profile_pic_url || profile_img
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
                            <p>{calculateDateTime(answer?.created_at)}</p>
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
                            {answer?.comments &&
                            answer?.comments.length > 0 &&
                            !isMobile ? (
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
                                onClick={() =>
                                  setIsShowReplies(
                                    isShowReplies == answer?.id
                                      ? null
                                      : answer?.id
                                  )
                                }
                              >
                                {isShowReplies == answer?.id
                                  ? "Hide Replies"
                                  : "View Replies"}
                              </div>
                            ) : (
                              <>
                                {answer?.comments &&
                                  answer?.comments.length > 0 && (
                                    <div
                                      style={{
                                        border: "1px solid #D9DFE9",
                                        padding: "5px 12px",
                                        borderRadius: "4px",
                                        backgroundColor: "#D9DFE9",
                                        cursor: "pointer",
                                        marginLeft: "6px",
                                      }}
                                      onClick={() =>
                                        setIsShowReplies(
                                          isShowReplies == answer?.id
                                            ? null
                                            : answer?.id
                                        )
                                      }
                                    >
                                      <Image
                                        loader={myImageLoader}
                                        style={{
                                          borderRadius: "5px",
                                        }}
                                        width={16}
                                        height={16}
                                        preview="false"
                                        src={
                                          isShowReplies == answer?.id
                                            ? hide_icon
                                            : show_icon
                                        }
                                        alt="eye-icon"
                                      />
                                    </div>
                                  )}
                              </>
                            )}
                          </div>
                          <div className="right-side-section">
                            <ShareSocialMedia
                              link={window.location.href}
                              title={communityQuestionDetail?.title}
                            >
                              <div className="share-btn">
                                <ShareAltOutlined />{" "}
                                <span className="btn-title">Share</span>
                              </div>
                            </ShareSocialMedia>
                            <div
                              className="report-btn"
                              onClick={() => setReportModalVisible("answer")}
                            >
                              <FlageIcon />
                              <span className="btn-title">Report</span>
                            </div>
                            {reportModalVisible === "answer" && (
                              <ReportAbuseModal
                                reportTypes={reportTypes}
                                isModalOpen={reportModalVisible === "answer"}
                                closeModel={() => setReportModalVisible("")}
                                data={{
                                  ...answer,
                                  community_id: communityData?.id,
                                }}
                                reportFor="answer"
                                heading="Report this Answer"
                              />
                            )}

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

                      {answer?.comments?.length > 0 && <Divider />}

                      <div className="community-comments-wrapper">
                        {answer?.comments?.length > 0 &&
                          isShowReplies == answer?.id &&
                          renderComments(answer?.comments)}
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
                      maskClosable={false}
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
                              modules={modules}
                              formats={formats}
                              theme="snow"
                              value={description}
                              onChange={(e) => setDescription(e)}
                              style={{ height: "100px", borderRadius: "2px" }}
                              placeholder="Write your answer here"
                            />
                          </div>
                        </Form.Item>
                        <br />
                        <br />
                        <br />
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
                            width: "100%",
                            background: "#0074D9",
                            borderRadius: "2px",
                            padding: "12px 16px",
                            color: "#fff",
                            fontWeight: 500,
                            fontFamily: "Inter",
                            fontSize: "18px",
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
                      maskClosable={false}
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
                              modules={modules}
                              formats={formats}
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
                            width: "100%",
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
                        src={communityData?.image_url || profile_img}
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
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  downloadDocument: crudActions._download,
};

export default connect(
  mapStateToProps,
  actionCreators
)(CommunityQuestionDetail);
