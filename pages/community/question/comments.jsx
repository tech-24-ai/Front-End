import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "reactstrap";
import myImageLoader from "../../../components/imageLoader";
import three_dot_icon from "../../../public/new_images/3dots.svg";
import message_icon from "../../../public/new_images/message_icon.svg";
import like_button from "../../../public/new_images/like_button.svg";
import dislike_button from "../../../public/new_images/dislike_button.svg";
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
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import shorting_icon from "../../../public/new_images/sorting_icon.svg";
import view_icon from "../../../public/new_images/view_icon.svg";
import reply_icon from "../../../public/new_images/reply_icon.svg";
import "draft-js/dist/Draft.css";
import "react-quill/dist/quill.snow.css";
import community from "..";
import dynamic from "next/dynamic";
import Router from "next/router";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

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
const CommunityQuestionDetail = ({ getAllCrud, success, showAlert }) => {
  const [communityQuestionDetail, setCommunityQuestionDetail] = useState();
  const communityAnswer = JSON.parse(
    sessionStorage.getItem("community_post_details")
  );
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [replyResponse, setReplyResponse] = useState();
  const [isReplayModalOpen, setIsReplayModalOpen] = useState({
    isReplayModelOpen: false,
    details: {},
  });
  const [communityAnswers, setCommunityAnswers] = useState();
  const handleEditorChange = (html) => {
    setReplyResponse(html);
  };

  const [updateCom, setUpdateCom] = useState(false);
  const [form] = Form.useForm();
  const onChange = (key) => {
    console.log(key);
  };

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const [communityData, setCommunityData] = useState();

  const handleCancel = () => {
    setIsReplayModalOpen({ isReplayModelOpen: false, details: {} });
  };

  const fetchCommunityData = () => {
    const id = sessionStorage.getItem("community_id");
    if (id) {
      crudService._getAll(`community/details/${id}`).then((data) => {
        setCommunityData(data?.data);
      });
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [updateCom]);

  const handleOk = (parent_id, community_post_id, replyText, isReply) => {
    if (replyText == undefined || replyText == null || replyText.trim() == "") {
      showAlert("Please add description.");
      return;
    }
    const postData = {
      parent_id: parent_id || null,
      community_post_id: community_post_id,
      description: replyText,
    };

    crudService._create("communitypostreply", postData).then((response) => {
      if (response.status === 200) {
        setIsReplayModalOpen({ isReplayModelOpen: false, details: {} });
        setReplyResponse("");
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
    crudService
      ._create("communitypost/vote", {
        community_post_id: data?.community_id,
        vote_type: type,
      })
      .then((data) => {
        data.status == 200 && fetchCommunityData();
      });
  };

  const voteCommunityPostReplies = (data, type) => {
    crudService
      ._create("communitypostreply/vote", {
        community_post_reply_id: data?.id,
        vote_type: type,
      })
      .then((data) => {
        data.status == 200 && setUpdateCom(true);
      });
  };

  useEffect(() => {
    const id = sessionStorage.getItem("community_question_id");

    if (id) {
      crudService._getAll(`communitypost/details/${id}`, {}).then((data) => {
        setCommunityQuestionDetail(data?.data);
      });
    }
  }, [updateCom]);

  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
    const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
    const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
    const duration = moment.duration(diffMilliseconds);
    const humanReadableDiff = duration.humanize(true);
    return humanReadableDiff;
  };

  const getPostReplies = () => {
    const id = sessionStorage.getItem("community_parent_id");
    if (id) {
      crudService
        ._getAll(`communitypostreply/comments?&parent_id=${id}`)
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

  const viewMoreComments = (answer) => {
    sessionStorage.setItem(
      "community_question_id",
      communityQuestionDetail?.url_slug
    );
    sessionStorage.setItem("community_post_id", communityQuestionDetail?.id);
    sessionStorage.setItem("community_parent_id", answer?.id);
    sessionStorage.setItem("community_post_details", JSON.stringify(answer));
    setIsShowReplies("");
    setTimeout(() => {
      getPostReplies();
    }, 100);
  };

  const viewComments = (comment) => {
    sessionStorage.setItem("community_parent_id", comment?.id);
    sessionStorage.setItem("community_post_details", JSON.stringify(comment));
    setIsShowReplies("");
    setTimeout(() => {
      getPostReplies();
    }, 100);
  };

  return (
    <Container>
      <div className="profile-container row">
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
                        "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                      }
                      alt="profile"
                    />
                  </div>
                  <div className="profile" style={{ flexDirection: "column" }}>
                    <h5>{communityQuestionDetail?.title}</h5>
                    <p>
                      {communityQuestionDetail?.visitor?.name}
                      {"("}
                      {calculateTimeAgo(communityQuestionDetail?.created_at)}
                      {")"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="para">
                <span
                  dangerouslySetInnerHTML={{
                    __html: communityQuestionDetail?.description,
                  }}
                ></span>
              </p>
              <div className="chips">
                {communityQuestionDetail?.postTags?.map((tag) => (
                  <div>{tag?.name}</div>
                ))}
              </div>

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
                          communityAnswer?.visitor?.profile_pic_url ||
                          "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                        }
                        alt="profile"
                      />
                    </div>
                    <div
                      className="profile"
                      style={{ flexDirection: "column" }}
                    >
                      <h5>{communityAnswer?.visitor?.name}</h5>
                      <p>{calculateTimeAgo(communityAnswer?.created_at)}</p>
                    </div>
                  </div>
                </div>
                <p className="para">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: communityAnswer?.description,
                    }}
                  ></span>
                </p>
              </Card>
            </Card>
          </div>
          <div style={{ marginTop: "3rem" }}>
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
                    fontSize: isMobile ? "16px" : "20px",
                    fontFamily: "Poppins",
                    color: "#54616C",
                    marginLeft: "10px",
                  }}
                >
                  Comments ({communityAnswers?.length})
                </div>
              </div>
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
                  <p className="para">
                    <span
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
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                            width: isMobile ? "auto" : "7rem",
                            cursor: "pointer",
                          }}
                        >
                          <Image
                            loader={myImageLoader}
                            style={{ borderRadius: "5px", cursor: "pointer" }}
                            width={16}
                            height={16}
                            preview="false"
                            src={reply_icon}
                            alt="reply-icon"
                          />
                          {!isMobile && (
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Inter",
                                color: "#54616C",
                                marginLeft: "5px",
                              }}
                            >
                              Reply
                            </div>
                          )}
                        </div>
                        {answer?.comments && answer?.comments.length > 0 ? (
                          <div
                            style={{
                              border: "1px solid #D9DFE9",
                              padding: "8px 12px",
                              borderRadius: "4px",
                              backgroundColor: "#F2F4F7",
                              fontSize: isMobile ? "12px" : "14px",
                              fontWeight: 500,
                              fontFamily: "Inter",
                              color: "#54616C",
                              marginLeft: isMobile ? "6px" : "10px",
                              color: "#0074D9",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              setIsShowReplies(
                                isShowReplies == answer.id ? "" : answer.id
                              )
                            }
                          >
                            {isShowReplies == answer.id
                              ? "Hide Replies"
                              : "View Replies"}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="rating">
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
                              voteCommunityPostReplies(answer, 1);
                            }}
                          />
                        </div>
                        <h6>
                          Upvote <p></p> {answer?.__meta__?.total_helpful}
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
                            voteCommunityPostReplies(answer, 0);
                          }}
                        />
                      </div> */}
                      </div>
                    </div>
                  )}
                  {answer?.comments.length > 0 &&
                    isShowReplies == answer.id &&
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
                              }}
                            >
                              <h5>{comment?.visitor?.name}</h5>
                              <p style={{ margin: 0, alignItems: "center" }}>
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
                      style={{ borderRadius: "2px", cursor: "pointer" }}
                      width={32}
                      height={32}
                      preview="false"
                      src={three_dot_icon}
                      alt="profile"
                    />
                            </div> */}
                          </div>
                        </div>
                        <p className="para">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: comment?.description,
                            }}
                          ></span>
                        </p>
                      </>
                    ))}
                  <div>
                    {answer?.comments?.length > 5 &&
                      isShowReplies == answer.id && (
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
                          onClick={() => viewMoreComments(answer)}
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
                display: "unset",
                gap: "unset",
              }}
            >
              <div>
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
                          communityQuestionDetail?.id,
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
                  width: "100%",
                  height: "fit-content",
                  marginTop: "1rem",
                }}
              >
                <div
                  className="cards-header"
                  style={{
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
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
                  <h6>{communityData?.name}</h6>
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
                <div className="cards-body">
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
                  }}
                >
                  <div>
                    <div className="head">Answers</div>
                    <div className="count">
                      {communityData?.__meta__?.total_members}
                    </div>
                  </div>
                  <div className="custom-border"></div>
                  <div>
                    <div className="head">Questions</div>
                    <div className="count">
                      {communityData?.__meta__?.total_posts}
                    </div>
                  </div>
                </div>
              </Card>
              {/* ))} */}
            </div>
          </div>
        )}
      </div>
    </Container>
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
};

export default connect(
  mapStateToProps,
  actionCreators
)(CommunityQuestionDetail);
