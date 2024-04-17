import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, Card, Input, Select } from "antd";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import three_dot_icon from "../../public/new_images/3dots.svg";
import message_icon from "../../public/new_images/message_icon.svg";
import like_button from "../../public/new_images/like_button.svg";
import dislike_button from "../../public/new_images/dislike_button.svg";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import moment from "moment";
import { crudService } from "../../_services";
import { Button, Modal } from "antd";
import { Form, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "draft-js/dist/Draft.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import community from ".";
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
const Profile = ({ getAllCrud }) => {
  const [editorHtml, setDescription] = useState("");
  const [title, setTitle] = useState();
  const [tags, setTag] = useState([]);
  const [url, setUrl] = useState([]);
  // const [description, setDescription] = useState();

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArray = value.split(",").map((tags) => tags.trim()); // Split tags by comma and trim whitespace
    setTag(tagsArray);
  };

  const handleEditorChange = (html) => {
    setDescription(html); // Assuming setDescription is a function to update the description state variable
  };

  console.log("tags", tags);
  const [updateCom, setUpdateCom] = useState(false);
  const [communitypost, setCommunityPost] = useState(null);
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
  const [communityDetails, setCommunityDetails] = useState();

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
      crudService._getAll(`communitypost/${id}`).then((data) => {
        setCommunityDetails(data?.data);
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

  const handleOk = () => {
    const postData = {
      community_id: 2,
      title: "hiii title",
      tags: [1],
      description: "editorHtml",
      url: [
        "https://tech24-uat.s3.amazonaws.com/sFx4ojGLbY",
        "https://tech24-uat.s3.amazonaws.com/gSOthJ2Dfr",
        "https://tech24-uat.s3.amazonaws.com/MBhs17gY4T",
      ],
    };
    console.log("post data", postData);

    crudService
      ._create("communitypost", postData)
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          console.log("Response data:", responseData);
          // Data added successfully
          setUpdateCom(true);
          setIsModalOpen(false);
        } else {
          console.error("Failed to add data:", response);
        }
      })
      .catch((error) => {
        console.error("Error adding data:", error);
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

  const Tab1 = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { Search } = Input;
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearchSelect = (value) => {
      console.log("search:", value);
    };

    const calculateTimeAgo = (createdAt) => {
      const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
      const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
      const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
      const duration = moment.duration(diffMilliseconds);
      const humanReadableDiff = duration.humanize(true);
      return humanReadableDiff;
    };

    return (
      <div className="community-tab-container questions-tab-container">
        <div className="search-container">
          <Search
            style={{ width: "65%" }}
            placeholder="Search a question..."
            onSearch={onSearch}
            enterButton
          />
          <Select
            style={{
              width: "30%",
            }}
            showSearch
            placeholder="Sort By"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearchSelect}
            filterOption={filterOption}
            options={[
              {
                value: "name",
                label: "Name",
              },
              {
                value: "date",
                label: "Date",
              },
              {
                value: "most recent",
                label: "Most Recent",
              },
            ]}
          />
        </div>
        <div className="cards-container">
          {communityDetails?.map((data) => (
            <Card
              bordered={true}
              style={{
                width: "fit-content",
                height: "fit-content",
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
                      {data?.title} <div className="custom-border"></div>
                      {calculateTimeAgo(data?.created_at)}
                    </p>
                  </div>
                </div>

                <div className="follow">
                  <p className="button">Follow</p>
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

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const options = [
    {
      label: "Tag 1",
      value: "1",
    },
    {
      label: "Tag 2",
      value: "2",
    },
    {
      label: "Tag 3",
      value: "3",
    },
    {
      label: "Tag 4",
      value: "4",
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
          <div className="community-tab-container">
            <div className="cards-container">
              <div
                onClick={showModal}
                style={{
                  width: "100%",
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
                <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                  <span style={{ marginBottom: "-20px", fontWeight: "700" }}>
                    Ask a Question
                  </span>
                  <div className="mt-2 mb-3">
                    <span>
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Egit liboro erat curcus.
                    </span>
                  </div>

                  <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                  >
                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      label="Title"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="description"
                      label="Question"
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={editorHtml}
                          onChange={handleEditorChange}
                          style={{ height: "100px" }}
                        />
                      </div>
                    </Form.Item>

                    <Form.Item
                      onChange={(e) => setUrl(e.target.value)}
                      style={{ marginTop: "55px" }}
                      label="Attachment"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="url"
                        action="/upload.do"
                        listType="picture-card"
                        style={{ height: "30px!important" }}
                      >
                        <button
                          style={{
                            border: 0,
                            background: "none",
                          }}
                          type="button"
                        >
                          <PlusOutlined />
                          Add
                        </button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      label="Tags"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Space.Compact>
                        <Form.Item
                          name={["Tag1", "Tag2", "Tag3", "Tag4"]}
                          noStyle
                          // rules={[{ required: true, message: 'Tags is required' }]}
                          onChange={(e) =>
                            console.log("testing tag", e.target.value)
                          }
                          // onChange={handleTagsChange}
                        >
                          <Select
                            mode="multiple"
                            name="tag[]"
                            style={{
                              width: "470px",
                            }}
                            placeholder="select one Tag"
                            defaultValue={[]}
                            options={options}
                            optionRender={(option) => (
                              <Space>
                                <span role="img" aria-label={option.data.label}>
                                  {option.data.emoji}
                                </span>
                                {option.data.desc}
                              </Space>
                            )}
                          />
                        </Form.Item>
                      </Space.Compact>
                    </Form.Item>

                    <Form.Item>
                      <Space>
                        <div
                          onClick={handleOk}
                          className="btn"
                          style={{
                            width: "470px",
                            background: "#afaaaa",
                            color: "white",
                          }}
                        >
                          Post Question
                        </div>
                      </Space>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>

              <Card
                bordered={true}
                style={{
                  width: 380,
                  height: "fit-content",
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
                <div className="following-section">
                  <div>
                    <div className="head">Members</div>
                    <div className="count">
                      {communityData?.__meta__.total_members}
                    </div>
                  </div>
                  <div className="custom-border"></div>
                  <div>
                    <div className="head">Questions</div>
                    <div className="count">
                      {communityData?.__meta__.total_posts}
                    </div>
                  </div>
                </div>
                <hr />
                {communityData?.communityMember.length === 0 ? (
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
                      marginBottom: "-5px",
                      fontWeight: "600",
                      fontFamily: "Inter",
                    }}
                  >
                    Member since {communityData?.communityMember[0]?.created_at}
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
};

export default connect(mapStateToProps, actionCreators)(Profile);
