import React, { useEffect, useState } from "react";
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
import profile_img from "../../public/new_images/profile.svg";
import edit_icon from "../../public/new_images/edit.png";

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

const QuestionTab = ({
  getAllCrud,
  showAlert,
  success,
  isSearch = true,
  askQuestion = true,
  componentName = "community",
  showLoader,
  hideLoader,
  downloadDocument,
}) => {
  const router = useRouter();
  const { community } = router.query;
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [tags, setTag] = useState([]);
  const [url, setUrl] = useState([]);
  const [tagsAPIData, setTagsAPIData] = useState();
  const [questionEditable, setQuestionEditable] = useState(null);
  const [prevFiles, setPrevFiles] = useState([]);
  const [updateCom, setUpdateCom] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [communityData, setCommunityData] = useState();
  const [headerSearch, setHeaderSearch] = useState();
  const [communityDetails, setCommunityDetails] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [sortByOrder, setSortByOrder] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;

  const handleEditorChange = (html) => {
    setDescription(html);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (title || description) {
      form.setFieldsValue({
        title,
        description,
      });
    }
  }, [title, form, description]);

  const onChange = (key) => {
    setSelectedIndex(key);
  };

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

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
  }, [updateCom, router.query]);

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

  useEffect(() => {
    let previousFiles = [];
    questionEditable &&
      url.map((file) => {
        file.id && file.id != -987654321 ? (
          previousFiles.push({ url: file?.url, name: file?.name })
        ) : (
          <></>
        );
      });

    setPrevFiles(previousFiles);
  }, [url]);

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

    // const finalUrl = [];
    showLoader();
    if (url && url.length > 0) {
      const index = 0;
      for (index; index < url.length; index++) {
        const details =
          !url[index].id &&
          (await crudService._upload("uploadmedia", url[index]));
        prevFiles.push({
          url: details?.data?.result,
          name: details?.data?.filename,
        });
      }

      const postData = {
        community_id: questionEditable || communityData?.id,
        title: title,
        description: description,
        tags: tags,
        url: JSON.stringify(prevFiles),
      };
      showLoader();
      if (questionEditable) {
        showLoader();
        crudService
          ._update("communitypost", questionEditable, postData)
          .then((response) => {
            hideLoader();
            if (response.status === 200) {
              setUpdateCom(true);
              setIsModalOpen(false);
              resetForm();
              fetchData();
              success(
                "Your post is being reviewed and will be shown after approval."
              );
            }
          })
          .catch(() => {
            hideLoader();
          });
      } else {
        crudService
          ._create("communitypost", postData)
          .then((response) => {
            hideLoader();
            if (response.status === 200) {
              setUpdateCom(true);
              setIsModalOpen(false);
              resetForm();
              success(
                "Your post is being reviewed and will be shown after approval."
              );
            }
          })
          .catch(() => {
            hideLoader();
          });
      }
    } else {
      const postData = {
        community_id: questionEditable || communityData?.id,
        title: title,
        description: description,
        tags: tags,
        url: [],
      };
      if (questionEditable) {
        showLoader();
        crudService
          ._update("communitypost", questionEditable, postData)
          .then((response) => {
            hideLoader();
            if (response.status === 200) {
              setUpdateCom(true);
              setIsModalOpen(false);
              resetForm();
              fetchData();
              success(
                "Your post is being reviewed and will be shown after approval."
              );
            }
          })
          .catch(() => {
            hideLoader();
          });
      } else {
        showLoader();
        crudService
          ._create("communitypost", postData)
          .then((response) => {
            hideLoader();
            if (response.status === 200) {
              setUpdateCom(true);
              setIsModalOpen(false);
              resetForm();
              success(
                "Your post is being reviewed and will be shown after approval."
              );
            }
          })
          .catch(() => {
            hideLoader();
          });
      }
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

  //Sorting

  useEffect(() => {
    fetchData();
  }, [page, headerSearch, sortBy, community]);

  const fetchData = () => {
    if (componentName == "community" && community) {
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
    }

    if (componentName == "profile") {
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
    Router.push(`/community/question/${url_slug}`);
  };

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUrl([
        ...url,
        {
          id: -987654321,
          name: file.name,
          url: e.target.result,
        },
        file,
      ]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleCommunity = () => {
    Router.push("/community");
  };

  const handleDocumentDownload = (item) => {
    const { id, name } = item;
    downloadDocument(
      id,
      name,
      `communitypost/download_attachment?attachment_id=${id}`
    );
  };

  const fetchTags = () => {
    crudService._getAll(`tags`).then((data) => {
      setTagsAPIData(data?.data);
    });
  };

  useEffect(() => {
    questionEditable ? fetchTags() : resetForm();
  }, [questionEditable]);

  let previewURL = [];
  url.map((data) => {
    data.id && previewURL.push(data);
  });

  const handleRemove = (file) => {
    setUrl((prevFileList) => {
      const newFileList = prevFileList.filter(
        (item) => item.name !== file.name
      );
      return newFileList;
    });
  };

  return (
    <div className="community-tab-container questions-tab-container community-detail-wrapper">
      {isSearch && (
        <div className="search-container">
          <SearchInput
            placeholder="Search anything"
            parentProps={{ style: { width: isMobile ? "84%" : "74%" } }}
            defaultValue={headerSearch}
            onSearch={(value) => {
              setHeaderSearch(value);
              setPage(0);
            }}
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
            maskClosable={false}
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
            onClick={(e) => {
              e.stopPropagation();
              gotoQuestionDetail(data?.url_slug);
            }}
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
                    src={data?.visitor?.profile_pic_url || profile_img}
                    alt="profile"
                  />
                  {/* <span className="label-counter">18</span> */}
                </div>
                <div
                  className="profile"
                  style={{
                    fontFamily: "Inter",
                    width: "95%",
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
              {data?.isQuestionEditable == 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setDescription(data?.description);
                    setTitle(data?.title);
                    setTag(data?.postTags?.map((e) => e.id));
                    setQuestionEditable(data?.community_id);
                    setUrl(data?.attachments);
                  }}
                >
                  <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "2px", cursor: "pointer" }}
                    width={32}
                    height={32}
                    preview="false"
                    src={edit_icon}
                    alt="profile"
                    className="edit_icon"
                  />
                </div>
              )}

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
              {data?.attachments?.map((item) => (
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
              {data?.postTags?.map((tag) => (
                <div
                  style={{ fontFamily: "Inter", backgroundColor: "unset" }}
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
      <div>
        <Modal
          maskClosable={false}
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
            initialValues={{
              title: title,
              description: description,
            }}
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
              label="Title"
            >
              <Input
                style={{
                  borderRadius: "2px",
                  border: "1px solid #D9DFE9",
                  padding: "12px",
                }}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
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
              name="description"
              label="Question"
            >
              <div>
                <ReactQuill
                  theme="snow"
                  style={{ height: "100px", borderRadius: "2px" }}
                  value={description}
                  onChange={handleEditorChange}
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
                fileList={previewURL}
                style={{ height: "30px!important" }}
                beforeUpload={beforeUpload}
                maxCount={1}
                accept=".png,.jpg,.jpeg,.svg,.mp4,.mov,.pdf"
                onRemove={handleRemove}
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
                  onClick={() => fetchTags()}
                  defaultValue={tags}
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
              {questionEditable ? "Update Question" : "Post Question"}
            </div>
            {/* </Space>
                    </Form.Item> */}
          </Form>
        </Modal>
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
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  downloadDocument: crudActions._download,
};

export default connect(mapStateToProps, actionCreators)(QuestionTab);
