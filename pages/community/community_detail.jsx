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
import { Button, Modal } from 'antd';
import { Form, Space , Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

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
const Profile = ({ getAllCrud, visitor_queries_history }) => {
  const [updateCom, setUpdateCom] = useState(false);
  const [updateProfileData, setUpdateProfileData] = useState({
    community_id: "",
    title: 0,
    tags: [],
    description: "",
    url: "",

  });
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    getAllCrud("visitorprofile", "visitorprofile");
  }, [updateCom]);

  const updateProfile = () => {
    crudService
      ._update("communitypost", communitypost, {
        community_id: updateProfileData.community_id,
        title: updateProfileData.title,
        tags: updateProfileData.tags,
        description: updateProfileData.description,
        url: updateProfileData.url,
      })
      .then((data) => {
        data.status == 200 && setUpdateCom(true);
      });
    setIsModalOpen(false);
  };
  const [communityData, setCommunityData] = useState();
  useEffect(() => {
    getAllCrud("visitor_queries_history", "visitor_queries_history");
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const id = sessionStorage.getItem("community_id");
    if (id) {
      crudService._getAll(`community/details/${id}`).then((data) => {
        setCommunityData(data);
      });
    }
    return () => {
      sessionStorage.removeItem("community_id");
    };
  }, []);
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
          {visitor_queries_history?.map((data) => (
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
                      style={{ borderRadius: "5px" }}
                      width={50}
                      height={50}
                      preview="false"
                      src={
                        data?.visitor?.profile_pic_url ||
                        "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                      }
                      alt="profile"
                    />
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
                      style={{ borderRadius: "5px" }}
                      width={16}
                      height={16}
                      preview="false"
                      src={like_button}
                      alt="profile"
                    />
                  </div>
                  <h6>
                    Upvote <p></p> {data?.__meta__?.total_helpful}
                  </h6>
                  <div className="left-border">
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={16}
                      height={16}
                      preview="false"
                      src={dislike_button}
                      alt="profile"
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
 
  const handleEditorChange = (content, editor) => {
      // Your code to handle editor content changes
  };

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
        <div className="community-tab-container">
          <div className="cards-container">
            <div  onClick={showModal}
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
            {/* <Button type="primary" onClick={showModal}>
              Open Modal
            </Button> */}
            <Modal title="Ask a Question" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              
           <span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egit liboro erat curcus</span>
             
               <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                <Form.Item
                 rules={[
                  {
                    required: true,
                  },
                ]}
                  name="Question"
                  label="Question"
                 
                >
                    <Editor
                      initialValue="<p>Please enter content</p>"
                      init={{
                          height: 300,
                          menubar: true,
                          plugins: [
                              'advlist autolink lists link image',
                              'charmap print preview anchor help',
                              'searchreplace visualblocks code',
                              'insertdatetime media table paste wordcount'
                          ],
                          toolbar:
                              'undo redo | formatselect | bold italic | \
                              alignleft aligncenter alignright | \
                              bullist numlist outdent indent | help'
                      }}
                    onEditorChange={handleEditorChange}
                  />
                </Form.Item>
               
                <Form.Item
                 rules={[
                  {
                    required: true,
                  },
                ]}
                  name="Title"
                  label="Title"
                 
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Attachment" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card" style={{height:"30px"}}>
                  <button
                    style={{
                      border: 0,
                      background: 'none',
                    
                    }}
                    type="button"
                  >
                    <PlusOutlined />Add
                  </button>
                </Upload>
              </Form.Item>
                <Form.Item label="Tags"  rules={[
                  {
                    required: true,
                  },
                ]}>
                  <Space.Compact>
                    <Form.Item
                      name={['Tag1', 'Tag2']}
                      noStyle
                      rules={[{ required: true, message: 'Tags is required' }]}
                    >
                      <Select placeholder="Select Tags" style={{width:"460px"}}>
                        <Option value="1">Tag 1</Option>
                        <Option value="2">Tag 2</Option>
                        <Option value="3">ag 3</Option>
                        <Option value="4">Tag 4</Option>

                      </Select>
                    </Form.Item>
                  
                  </Space.Compact>
                </Form.Item>
             
                <Form.Item>
                  <Space>
                    <SubmitButton onClick={updateProfile}  form={form}>Submit</SubmitButton>
                    <Button htmlType="reset">Reset</Button>
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
                    communityData?.data?.image_url ||
                    "https://tech24-uat.s3.amazonaws.com/D10dkiDJHM"
                  }
                  alt="profile"
                />
                <h6>{communityData?.data?.name}</h6>
                <Image
                  loader={myImageLoader}
                  style={{ borderRadius: "2px", cursor: "pointer" }}
                  width={24}
                  height={24}
                  preview="false"
                  src={three_dot_icon}
                  alt="profile"
                />
              </div>
              <hr />
              <div className="cards-body">
                {communityData?.data?.description}
              </div>
              <hr />
              <div className="following-section">
                <div>
                  <div className="head">Members</div>
                  <div className="count">
                    {communityData?.data?.__meta__.total_members}
                  </div>
                </div>
                <div className="custom-border"></div>
                <div>
                  <div className="head">Questions</div>
                  <div className="count">
                    {communityData?.data?.__meta__.total_posts}
                  </div>
                </div>
              </div>
              <hr />
              <div
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
            </Card>
            {/* ))} */}
          </div>
        </div>
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
};

export default connect(mapStateToProps, actionCreators)(Profile);