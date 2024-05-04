import React, { useEffect } from "react";
import Image from "next/image";
import { Tabs, Card, Input, Select } from "antd";
import { Container } from "reactstrap";
import myImageLoader from "../components/imageLoader";
import three_dot_icon from "../public/new_images/3dots.svg";
import message_icon from "../public/new_images/message_icon.svg";
import like_button from "../public/new_images/like_button.svg";
import dislike_button from "../public/new_images/dislike_button.svg";
import { crudActions } from "../_actions";
import { connect } from "react-redux";
import moment from "moment";

const Profile = ({
  getAllCrud,
  visitor_community,
  visitor_queries_history,
}) => {
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    getAllCrud("visitor_community", "visitor_community");
    getAllCrud("visitor_queries_history", "visitor_queries_history");
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
      const blogPostDateTime = moment.utc(createdAt).local().format("MM-DD-YYYY hh:mm A");
   
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
            {/* {visitor_community?.map((data) => ( */}
            <div
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
                  src={"https://tech24-uat.s3.amazonaws.com/D10dkiDJHM"}
                  alt="profile"
                />
                <h6>{"React JS"}</h6>
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Perferendis dolore est dolorem quas quisquam voluptatum
                temporibus molestias.
              </div>
              <hr />
              <div className="following-section">
                <div>
                  <div className="head">Members</div>
                  <div className="count">1</div>
                </div>
                <div className="custom-border"></div>
                <div>
                  <div className="head">Questions</div>
                  <div className="count">200</div>
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
  const { visitor_community, visitor_queries_history } = state;
  return {
    visitor_community,
    visitor_queries_history,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default connect(mapStateToProps, actionCreators)(Profile);
