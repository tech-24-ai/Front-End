import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import { RightOutlined } from "@ant-design/icons";
import { crudActions, alertActions, loaderActions } from "../../_actions";
import { connect } from "react-redux";
import moment from "moment";
import { crudService } from "../../_services";
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
import shorting_icon from "../../public/new_images/sorting_icon.svg";
import "draft-js/dist/Draft.css";
import "react-quill/dist/quill.snow.css";
import community from ".";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
// import ReactPaginate from "react-paginate-next";
import CustomPagination from "../../components/pagination";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import { isMobile } from "react-device-detect";
import QuestionTab from "../../components/community/QuestionTab";

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

const CommunityDetail = ({
  getAllCrud,
  showAlert,
  success,
  showLoader,
  hideLoader,
}) => {
  const router = useRouter();
  console.log("router.query", router.query);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState();
  const [tags, setTag] = useState([]);
  const [url, setUrl] = useState([]);
  const [tagsAPIData, setTagsAPIData] = useState();

  const handleEditorChange = (html) => {
    setDescription(html);
  };

  const [updateCom, setUpdateCom] = useState(false);
  const [form] = Form.useForm();
  const [selectedIndex, setSelectedIndex] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (key) => {
    setSelectedIndex(key);
  };

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const [communityData, setCommunityData] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchCommunityData = () => {
    const { community } = router.query;
    if (community) {
      crudService._getAll(`community/details/${community}`).then((data) => {
        setCommunityData(data?.data);
      });
    }
  };

  useEffect(() => {
    getAllCrud("visitorprofile", "visitorprofile");
    fetchCommunityData();
  }, [updateCom]);

  const joinCommunity = () => {
    crudService
      ._create("community/join", { community_id: communityData?.id })
      .then(() => window.location.reload());
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTag([]);
    setUrl([]);
  };

  const handleOk = async () => {
    showLoader();
    setIsModalOpen(false);
    if (!title) {
      showAlert("Please add title");
      return;
    }

    if (!description) {
      showAlert("Please add descriptions");
      return;
    }

    const finalUrl = [];

    if (url && url.length > 0) {
      const index = 0;

      for (index; index < url.length; index++) {
        const details = await crudService._upload("uploadmedia", url[index]);
        finalUrl.push({
          url: details?.data?.result,
          name: details?.data?.filename,
        });
      }

      if (index == url.length) {
        const postData = {
          community_id: communityData?.id,
          title: title,
          description: description,
          tags: tags,
          url: JSON.stringify(finalUrl),
        };

        crudService._create("communitypost", postData).then((response) => {
          hideLoader();
          if (response.status === 200) {
            setUpdateCom(true);
            setIsModalOpen(false);
            resetForm();
            success(
              "Your post is being reviewed and will be shown after approval."
            );
          }
        });
      }

      //Upload API
      // crudService
      //   ._upload("uploadmedia", url[index])
      //   .then((data) => {

      //   })
      //   .catch((error) => {
      //     console.log("error", error);
      //   });
    } else {
      const postData = {
        community_id: communityData?.id,
        title: title,
        description: description,
        tags: tags,
        url: [],
      };

      crudService._create("communitypost", postData).then((response) => {
        hideLoader();
        if (response.status === 200) {
          setUpdateCom(true);
          setIsModalOpen(false);
          resetForm();
          success(
            "Your post is being reviewed and will be shown after approval."
          );
        }
      });
    }
  };

  const voteCommunity = (data, type) => {
    showLoader();
    crudService
      ._create("communitypost/vote", {
        community_post_id: data?.community_id,
        vote_type: type,
      })
      .then((data) => {
        hideLoader();
        data.status == 200 && fetchCommunityData();
      });
  };

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

  const Tab2 = () => {
    const [newsData, setNewsData] = useState([]);
    useEffect(() => {
      console.log("communityData", communityData);
      fetchNewsData(communityData?.id);
    }, []);

    const fetchNewsData = (communityId) => {
      if (communityId && selectedIndex == 2) {
        crudService
          ._getAll(`get_news_announcements?community_id=${communityId}`)
          .then((data) => {
            setNewsData(data?.data);
          })
          .catch((error) => {
            console.error("Error fetching news data:", error);
          });
      }
    };
    const gotoNewsDetail = (url_slug) => {
      Router.replace(`/community/news/${url_slug}`);
    };
    // const [newsData, setNewsData] = useState([]);
    // const fetchNewsData = () => {
    //   const id = sessionStorage.getItem("community_id");
    //   if (id) {
    //     crudService._getAll(`get_news_announcements?community_id=${22}`)
    //       .then((data) => {
    //         setNewsData(data?.data);
    //         console.log("data", data);
    //         console.log("news log", data?.data);
    //       })
    //       .catch((error) => {
    //         showAlert("Error occurred while fetching news data.");
    //         console.error("Error fetching news data:", error);
    //       });
    //   }
    // };
    // console.log("news data", newsData);
    // useEffect(() => {
    //   fetchNewsData();
    // }, []);

    return (
      <div className="questions-tab-container">
        <ul>
          {newsData &&
            newsData.map((data) => (
              <li
                key={data.id}
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "#001622",
                  cursor: "pointer",
                }}
                onClick={() => gotoNewsDetail(data?.url_slug)}
              >
                {data.title}
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#54616C",
                  }}
                >
                  {data.description}
                </p>
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    color: "#B0B8BF",
                  }}
                >
                  {calculateTimeAgo(data?.created_at)}
                </p>
                <hr />
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const tagsOptions = tagsAPIData?.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const gotoQuestionDetail = (url_slug) => {
    sessionStorage.setItem("community_question_id", url_slug);
    Router.push("question");
  };

  const beforeUpload = (file) => {
    setUrl([...url, file]);
    return false;
  };

  const items = [
    {
      key: "1",
      label: "Questions",
      children: <QuestionTab />,
    },
    {
      key: "2",
      label: "News & Announcements",
      children: <Tab2 />,
    },
  ];

  const handleCommunity = () => {
    Router.push("/community");
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-12 community_details_header">
          <h4 className="mt-5 mb-1">
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
              style={{
                color: "#0074D9",
                fontFamily: "Inter",
                fontSize: "14px",
              }}
            >
              {communityData?.name}
            </span>
          </h4>
        </div>
      </div>
      <div className="profile-container row" style={{ marginTop: "1.5rem" }}>
        <Tabs
          className="header-tabs col-md-9 community_header_tab"
          defaultActiveKey="1"
          onChange={onChange}
        >
          {items.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.key}>
              {tab.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
        {communityData && (
          <div className="community-tab-container community-detail-card col-md-3">
            <div
              className="cards-container"
              style={{
                display: isMobile && "unset",
              }}
            >
              {selectedIndex == "1" ? (
                <div
                  onClick={showModal}
                  style={{
                    width: isMobile ? "100%" : 380,
                    padding: "12px 16px",
                    borderRadius: "2px",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#FFFFFF",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: "#0074D9",
                    fontFamily: "Inter",
                  }}
                  className="questions_font_16px ask_question_large"
                >
                  Ask a Question
                </div>
              ) : (
                <></>
              )}
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
                    }}
                  >
                    Ask a Question
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
                      name="title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      label="Title"
                    >
                      <Input
                        style={{
                          borderRadius: "2px",
                          border: "1px solid #D9DFE9",
                          padding: "12px",
                        }}
                        value={title}
                      />
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
                      value={description}
                      name="description"
                      label="Question"
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={description}
                          onChange={handleEditorChange}
                          style={{ height: "100px", borderRadius: "2px" }}
                        />
                      </div>
                    </Form.Item>

                    <Form.Item
                      style={{
                        fontWeight: 500,
                        fontFamily: "Inter",
                        fontSize: "14px",
                        color: "#4C4C4C",
                        marginTop: isMobile ? "90px" : "55px",
                      }}
                      label="Attachment"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="url"
                        action={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploadmedia`}
                        listType="picture-card"
                        fileList={url}
                        style={{ height: "30px!important" }}
                        beforeUpload={beforeUpload}
                        maxCount={1}
                      >
                        <button
                          style={{
                            border: 0,
                            background: "none",
                            display: "contents",
                          }}
                          type="button"
                        >
                          <PlusOutlined />
                          Add
                        </button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      style={{
                        fontWeight: 500,
                        fontFamily: "Inter",
                        fontSize: "14px",
                        color: "#4C4C4C",
                      }}
                      label="Tags"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Form.Item
                        style={{
                          fontWeight: 500,
                          fontFamily: "Inter",
                          fontSize: "14px",
                          color: "#4C4C4C",
                        }}
                      >
                        <Select
                          showArrow
                          className="ask-question-tag"
                          mode="multiple"
                          style={{
                            width: isMobile ? "100%" : "470px",
                            borderRadius: "2px",
                            border: "1px solid #D9DFE9",
                            padding: "12px 0",
                          }}
                          placeholder="Select tags"
                          onClick={() => {
                            crudService._getAll(`tags`).then((data) => {
                              setTagsAPIData(data?.data);
                            });
                          }}
                          defaultValue={[]}
                          options={tagsOptions}
                          value={tags}
                          onChange={(e) => setTag(e)}
                        />
                      </Form.Item>
                    </Form.Item>

                    {/* <Form.Item>
                      <Space> */}
                    <div
                      onClick={handleOk}
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
                      }}
                    >
                      Post Question
                    </div>
                    {/* </Space>
                    </Form.Item> */}
                  </Form>
                </Modal>
              </div>

              <Card
                bordered={true}
                style={{
                  width: isMobile ? "100%" : 380,
                  height: "fit-content",
                }}
                className="community_top_card_small"
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
                    className="questions_font_14px"
                    style={{
                      fontFamily: "Poppins",
                    }}
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
                  {communityData?.description}
                </div>
                <hr />
                <div
                  className="following-section"
                  style={{
                    justifyContent: isMobile && "space-evenly",
                  }}
                >
                  <div>
                    <div
                      className="head questions_font_14px"
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      Answers
                    </div>
                    <div className="count">
                      {communityData?.__meta__?.total_post_reply}
                    </div>
                  </div>
                  <div className="custom-border"></div>
                  <div>
                    <div
                      className="head questions_font_14px"
                      style={{ fontFamily: "Inter" }}
                    >
                      Questions
                    </div>
                    <div className="count">
                      {communityData?.__meta__?.total_posts}
                    </div>
                  </div>
                </div>
                {/* <hr /> */}
                {/* {communityData?.communityMember?.length === 0 ? (
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
                    {moment(communityData.communityMember[0]?.created_at).format("MMMM DD, YYYY")}
                  </p>
                )} */}
                {/* show question and answer */}
                {/* <div className="chips">
                    <p>{communityData?.__meta__?.total_post_replies} answers</p>
                    <h6 className="custom-border"></h6>
                    <p> {communityData?.__meta__?.total_posts} Question</p>
                  </div> */}
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
  showAlert: alertActions.warning,
  success: alertActions.success,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default connect(mapStateToProps, actionCreators)(CommunityDetail);
