import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import { RightOutlined } from "@ant-design/icons";
import { crudActions, alertActions } from "../../_actions";
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
import SearchInput from "../form/searchInput";
import Image from "next/future/image";

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

const QuestionTab = ({
  getAllCrud,
  showAlert,
  success,
  isSearch = true,
  askQuestion = true,
  componentName = "community",
}) => {
  const router = useRouter();
  const { community } = router.query;
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
    // const id = sessionStorage.getItem("community_id");
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

  const handleOk = () => {
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
      //Upload API
      crudService
        ._upload("uploadmedia", url[0])
        .then((data) => {
          const postData = {
            community_id: communityData?.id,
            title: title,
            description: description,
            tags: tags,
            url: [data?.data?.result],
          };

          crudService._create("communitypost", postData).then((response) => {
            if (response.status === 200) {
              setUpdateCom(true);
              setIsModalOpen(false);
              resetForm();
              success(
                "Your post is being reviewed and will be shown after approval."
              );
            }
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      const postData = {
        community_id: communityData?.id,
        title: title,
        description: description,
        tags: tags,
        url: [],
      };

      crudService._create("communitypost", postData).then((response) => {
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
    crudService
      ._create("communitypost/vote", {
        community_post_id: data?.community_id,
        vote_type: type,
      })
      .then((data) => {
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

  const [headerSearch, setHeaderSearch] = useState();
  const [communityDetails, setCommunityDetails] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [sortByOrder, setSortByOrder] = useState(false);

  const itemsPerPage = 10;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  //Sorting

  useEffect(() => {
    fetchData();
  }, [page, sortBy, community]);

  const fetchData = () => {
    if (componentName == "community") {
      crudService
        ._getAll(`communitypost/${community}`, {
          orderBy: sortBy,
          orderDirection: "DESC",
          page: page + 1,
          pageSize: itemsPerPage,
          search: headerSearch,
          // search: searchQuery,
          // ...filteredData,
        })
        .then((result) => {
          setCommunityDetails(result?.data);
          const totalPage = Math.ceil(
            result?.data.total / result?.data.perPage
          );

          setPageCount(isNaN(totalPage) ? 0 : totalPage);
        });
    } else if (componentName == "profile") {
      crudService
        ._getAll(`visitor_queries_history`, {
          orderBy: sortBy,
          orderDirection: "DESC",
          page: page + 1,
          pageSize: itemsPerPage,
          search: headerSearch,
        })
        .then((result) => {
          setCommunityDetails(result?.data);
          const totalPage = Math.ceil(
            result?.data.total / result?.data.perPage
          );

          setPageCount(isNaN(totalPage) ? 0 : totalPage);
        });
    }
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const options = [
    {
      value: "id",
      label: "Most Recent",
    },
    {
      value: "views_counter",
      label: "Most Viewed",
    },
    {
      value: "total_post_replies",
      label: "Most Answers",
    },
    {
      value: "total_helpful",
      label: "Most Voted",
    },
  ];

  useEffect(() => {
    //getCommunityData();
  }, []);

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
    const baseHref = window.location.href;
    Router.replace(`${baseHref}/question/${url_slug}`);
  };

  const beforeUpload = (file) => {
    setUrl([...url, file]);
    return false;
  };

  const handleCommunity = () => {
    Router.push("/community");
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="community-tab-container questions-tab-container community-detail-wrapper">
      {isSearch && (
        <div className="search-container">
          {/* <Search
            style={{ width: isMobile ? "84%" : "65%" }}
            placeholder="Search a question..."
            onSearch={onSearch}
            enterButton
            onChange={headerSearchFunction}
            value={headerSearch}
          /> */}

          <SearchInput
            placeholder="Search anything"
            className="SearchInput"
            parentProps={{ style: { width: isMobile ? "84%" : "74%" } }}
            value={headerSearch}
            onChange={(value) => setHeaderSearch(value)}
            suffix={
              <SearchOutlined
                style={{ color: "#1E96FF" }}
                onClick={() => handleSearch()}
              />
            }
          />

          <Image
            onClick={() => setSortByOrder(!sortByOrder)}
            loader={myImageLoader}
            style={{ borderRadius: "2px", cursor: "pointer", display: "none" }}
            width={44}
            height={44}
            preview="false"
            src={shorting_icon}
            alt="profile"
            className="shorting_icon"
          />

          <Modal
            visible={sortByOrder}
            footer={null}
            onCancel={() => {
              setSortByOrder(false);
            }}
          >
            <div className="sorting shorting_icon">
              <label className="sortby" htmlFor="sortDropdown">
                Sort By:{" "}
              </label>
              <select
                id="sortDropdown"
                style={{ border: "none", background: "transparent" }}
                value={sortBy}
                onChange={handleSort}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </Modal>

          <div className="sorting mobile-display-n d-none community_filter_section">
            <label className="sortby" htmlFor="sortDropdown">
              Sort By:{" "}
            </label>
            <select
              id="sortDropdown"
              style={{ border: "none", background: "transparent" }}
              value={sortBy}
              onChange={handleSort}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {selectedIndex == "1" && askQuestion && (
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
          className="questions_font_16px ask_question_small"
        >
          Ask a Question
        </div>
      )}

      <div>
        <Modal visible={isModalOpen} onCancel={handleCancel} footer={null}>
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

      <div className="cards-container">
        {communityDetails?.data?.map((data) => (
          <Card
            bordered={true}
            style={{
              width: "100%",
              height: "fit-content",
              marginTop: "1rem",
              cursor: "pointer",
            }}
            onClick={() => gotoQuestionDetail(data?.url_slug)}
          >
            <div className="cards-header">
              <div>
                <div className="img">
                  <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "5px", zIndex: "1" }}
                    width={50}
                    height={50}
                    preview="false"
                    src={
                      data?.visitor?.profile_pic_url ||
                      "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                    }
                    alt="profile"
                  />
                  {/* <span className="label-counter">18</span> */}
                </div>
                <div
                  className="profile"
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  <h5>{data?.title}</h5>
                  <p>
                    {!isMobile && (
                      <>
                        {data?.visitor?.name}{" "}
                        <div className="custom-border"></div>
                      </>
                    )}
                    {calculateTimeAgo(data?.created_at)}
                  </p>
                </div>
              </div>

              {/* <div className="follow">
                <p className="button">Follow</p>
                <div className="img">
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
              </div> */}
            </div>
            <p
              className="para questions_font_14px"
              style={{
                fontFamily: "Inter",
              }}
            >
              <span
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></span>
            </p>
            <div className="chips">
              {data?.postTags?.map((tag) => (
                <div
                  style={{ fontFamily: "Inter" }}
                  className="questions_font_10px"
                >
                  {tag?.name}
                </div>
              ))}
            </div>
            <div className="chips" style={{ fontFamily: "Inter" }}>
              <p className="questions_font_12px">
                {data?.__meta__?.total_post_replies} answers
              </p>
              <h6 className="custom-border"></h6>
              <p className="questions_font_12px">{data?.views_counter} views</p>
            </div>
            {/* <div className="like-footer">
                <div className="ans">
                  <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "5px" }}
                    width={16}
                    height={16}
                    preview="false"
                    src={message_icon}
                    alt="profile"
                  />
                  Answer
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
                        voteCommunity(data, 1);
                      }}
                    />
                  </div>
                  <h6>
                    Upvote <p></p> {data?.__meta__?.total_helpful}
                  </h6>
                  <div className="left-border">
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px", cursor: "pointer" }}
                      width={16}
                      height={16}
                      preview="false"
                      src={dislike_button}
                      alt="profile"
                      onClick={() => {
                        voteCommunity(data, 0);
                      }}
                    />
                  </div>
                </div>
              </div> */}
          </Card>
        ))}
      </div>
      <br></br>
      <div className="mt-5" style={{ width: "100%" }}>
        {communityDetails?.data?.length > 0 && pageCount > 1 && (
          <CustomPagination
            pageCount={pageCount}
            page={page}
            onPageChange={({ selected }) => setPage(selected)}
          />
        )}
      </div>
    </div>
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
};

export default connect(mapStateToProps, actionCreators)(QuestionTab);
