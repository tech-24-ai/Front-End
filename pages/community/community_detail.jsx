import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import three_dot_icon from "../../public/new_images/3dots.svg";
import message_icon from "../../public/new_images/message_icon.svg";
import like_button from "../../public/new_images/like_button.svg";
import dislike_button from "../../public/new_images/dislike_button.svg";
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
import Router from "next/router";
import ReactPaginate from "react-paginate-next";

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

const CommunityDetail = ({ getAllCrud, showAlert }) => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (key) => {
    console.log(key);
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
    const id = sessionStorage.getItem("community_id");
    if (id) {
      crudService._getAll(`community/details/${id}`).then((data) => {
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
  }

  const handleOk = () => {

    if(!title){
      showAlert("Please add title");
      return
    }

    if(!description){
      showAlert("Please add descriptions");
      return
    }

    const finalUrl = []
    if(url && url.length > 0){
      //Upload API
      crudService
          ._upload("uploadmedia", url[0])
          .then((data) => {
            // File uploaded successfully, update state and handle any further actions
            console.log("data", data?.data?.result);

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
                resetForm()
              }
            });
          })
          .catch((error) => {
            console.log("asdasd")
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
           resetForm()
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

  const Tab1 = () => {
    console.log("tab 1")
    const [headerSearch, setHeaderSearch] = useState();
    const [communityDetails, setCommunityDetails] = useState([]);
    const [sortBy, setSortBy] = useState("id"); 

    const itemsPerPage = 2;
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState({});

    const calculateTimeAgo = (createdAt) => {
      const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
      const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
      const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
      const duration = moment.duration(diffMilliseconds);
      const humanReadableDiff = duration.humanize(true);
      return humanReadableDiff;
    };

    //Sorting
   
 
    useEffect(() => {
      const id = sessionStorage.getItem("community_id");
      crudService
        ._getAll(`communitypost/${id}`, {
          orderBy: sortBy,
          orderDirection: "DESC",
          page: page + 1,
          pageSize: itemsPerPage,
          search: headerSearch
          // search: searchQuery,
          // ...filteredData,
        })
        .then((result) => {
          console.log("result", result);
          setCommunityDetails(result?.data);
          const totalPage = Math.ceil(result?.data.total / result?.data.perPage);
          console.log("totalPage", totalPage);
          setPageCount(isNaN(totalPage) ? 0 : totalPage);
        });
    }, [page, searchQuery, filteredData, sortBy, headerSearch]);

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

    return (
      <div className="community-tab-container questions-tab-container community-detail-wrapper">
        <div className="search-container">
          {/* <Search
            style={{ width: isMobile ? "84%" : "65%" }}
            placeholder="Search a question..."
            onSearch={onSearch}
            enterButton
            onChange={headerSearchFunction}
            value={headerSearch}
          /> */}

          <Input
            placeholder="Search anything.."
            allowClear
            prefix={
              <SearchOutlined style={{ color: "#0074D9", padding: "0 6px" }} />
            }
            onChange={(e) => {
              setHeaderSearch(e?.target?.value);
            }}
            value={headerSearch}
            style={{
              width: isMobile ? "84%" : "65%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "#ffffff",
              boxSizing: "border-box",
            }}
          />

          {isMobile ? (
            <Image
              loader={myImageLoader}
              style={{ borderRadius: "2px", cursor: "pointer" }}
              width={44}
              height={44}
              preview="false"
              src={shorting_icon}
              alt="profile"
            />
          ) : (
            <>
                <div className="sorting mobile-display-n">
                  <label className="sortby" htmlFor="sortDropdown">Sort By: </label>
                  <select
                    id="sortDropdown"
                    style={{ border: "none", background: "transparent" }}
                    value={sortBy}
                    onChange={handleSort}
                  >
                    {options.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              
              {/* <Select
                style={{
                  width: "30%",
                }}
                showSearch
                placeholder="Sort By"
                optionFilterProp="children"
                // onChange={onChange}
                options={[
                  {
                    value: "most recent",
                    label: "Most Recent",
                  },
                  {
                    value: "asc",
                    label: "asc",
                  },
                  {
                    value: "dsc",
                    label: "dsc",
                  },
                ]}
              /> */}
            </>
          )}
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
                  <div className="profile">
                    <h5>{data?.visitor?.name}</h5>
                    <p>
                      {!isMobile && (
                        <>
                          {data?.title} <div className="custom-border"></div>
                        </>
                      )}
                      {calculateTimeAgo(data?.created_at)}
                    </p>
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
              <p className="para">{data?.description}</p>
              <div className="chips">
                {data?.postTags?.map((tag) => (
                  <div>{tag?.name}</div>
                ))}
              </div>
              <div className="chips">
                <p>{data?.__meta__?.total_post_replies} answers</p>
                <h6 className="custom-border"></h6>
                <p>{data?.views_counter} views</p>
              </div>
              <div className="like-footer">
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
              </div>
            </Card>
          ))}
        </div>
        <br></br>
        {communityDetails?.data?.length > 0 && (
          <ReactPaginate
            pageCount={pageCount}
            initialPage={page}
            forcePage={page}
            onPageChange={({ selected }) => setPage(selected)}
            previousLabel={
              <span
                style={{
                  color: "#000",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                {"<"}
              </span>
            }
            nextLabel={
              <span
                style={{
                  color: "#000",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                {">"}
              </span>
            }
            activeClassName={"selected-page"}
            pageClassName={"other-page"}
          />
        )}
      </div>
    );
  };

  const Tab2 = () => {
    return (
      <div className="questions-tab-container">
        <ul>
          <li
            style={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#001622",
            }}
          >
            Lorem ipsum dolor sit amet consectetur
            <p
              style={{ fontWeight: "400", fontSize: "14px", color: "#54616C" }}
            >
              Lorem ipsum dolor sit amet consectetur. Urna cursus lectus risus
              sit in et. Nec pellentesque curabitur ultrices ultricies habitant
              eget aenean aliquet id. Et arcu id quam interdum vivamus facilisi
              elementum ultricies.
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "12px",
                color: "#B0B8BF",
              }}
            >
              2 days ago
            </p>
          </li>
          <hr />
          <li
            style={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#001622",
            }}
          >
            Lorem ipsum dolor sit amet consectetur
            <p
              style={{ fontWeight: "400", fontSize: "14px", color: "#54616C" }}
            >
              Lorem ipsum dolor sit amet consectetur. Urna cursus lectus risus
              sit in et. Nec pellentesque curabitur ultrices ultricies habitant
              eget aenean aliquet id. Et arcu id quam interdum vivamus facilisi
              elementum ultricies.
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "12px",
                color: "#B0B8BF",
              }}
            >
              2 days ago
            </p>
          </li>
          <hr />
          <li
            style={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#001622",
            }}
          >
            Lorem ipsum dolor sit amet consectetur
            <p
              style={{ fontWeight: "400", fontSize: "14px", color: "#54616C" }}
            >
              Lorem ipsum dolor sit amet consectetur. Urna cursus lectus risus
              sit in et. Nec pellentesque curabitur ultrices ultricies habitant
              eget aenean aliquet id. Et arcu id quam interdum vivamus facilisi
              elementum ultricies.
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "12px",
                color: "#B0B8BF",
              }}
            >
              2 days ago
            </p>
          </li>
          <hr />
          <li
            style={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#001622",
            }}
          >
            Lorem ipsum dolor sit amet consectetur
            <p
              style={{ fontWeight: "400", fontSize: "14px", color: "#54616C" }}
            >
              Lorem ipsum dolor sit amet consectetur. Urna cursus lectus risus
              sit in et. Nec pellentesque curabitur ultrices ultricies habitant
              eget aenean aliquet id. Et arcu id quam interdum vivamus facilisi
              elementum ultricies.
            </p>
            <p
              style={{
                fontWeight: "400",
                fontSize: "12px",
                color: "#B0B8BF",
              }}
            >
              2 days ago
            </p>
          </li>
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
    setUrl([...url,file]);
    return false;
  }

  const items = [
    {
      key: "1",
      label: "Questions",
      children: <Tab1 />,
    },
    {
      key: "2",
      label: "News & Announcements",
      children: <Tab2 />,
    },
  ];

  return (
    <Container>
      <div className="profile-container">
        <Tabs className="header-tabs" defaultActiveKey="1" onChange={onChange}>
          {items.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.key}>
              {tab.children}
            </Tabs.TabPane>
          ))}
        </Tabs>
        {communityData && (
          <div className="community-tab-container community-detail-card">
            <div
              className="cards-container"
              style={{
                display: isMobile && "unset",
              }}
            >
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
                }}
              >
                Ask a Question
              </div>
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
                      onChange={(e) => {setTitle(e.target.value)}}
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

              <Card
                bordered={true}
                style={{
                  width: isMobile ? "100%" : 380,
                  height: "fit-content",
                  marginTop: "1rem",
                }}
              >
                <div className="cards-header">
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
                <div className="cards-body">{communityData?.description}</div>
                <hr />
                <div
                  className="following-section"
                  style={{
                    justifyContent: isMobile && "space-evenly",
                  }}
                >
                  <div>
                    <div className="head">Members</div>
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
                <hr />
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
                    {communityData?.communityMember?.[0]?.created_at}
                  </p>
                )}
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
};

export default connect(mapStateToProps, actionCreators)(CommunityDetail);
