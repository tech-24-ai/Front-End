import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container } from "reactstrap";
import { crudService } from "../../_services";
import Router from "next/router";
import {
  SearchOutlined,
  CloseCircleOutlined,
  RightOutlined,
  EyeOutlined,
  MessageOutlined
} from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import moment from "moment";
import { Card, Input, Select, Modal, Label } from "antd";
import CustomPagination from "../../components/pagination";
import { isMobile, isBrowser } from "react-device-detect";
import myImageLoader from "../../components/imageLoader";
import Image from "next/future/image";
import SearchInput from "../../components/form/searchInput";
const sorting_icon = "../../new_images/sorting_icon.svg";

const Community = ({ router }) => {
  const { value } = Router.query;
  const [communityFeature, setCommunityFeature] = useState([]);
  const [communityList, setCommunityList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [sortBy, setSortBy] = useState("created_at_desc");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState(value);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [responseType, setResponseType] = useState(null);
  const [sortByOrder, setSortByOrder] = useState(false);

  useEffect(() => {
    getAllPosts(searchQuery, currentPage, sortBy, orderDirection);
  }, [searchQuery, currentPage, sortBy, orderDirection]);

  useEffect(() => {
    if (value) {
      setSearchQuery(value);
      setCurrentPage(0);
      getAllPosts(value, 0, sortBy, orderDirection);
    }
  }, [value]);

  const getAllPosts = async (searchText, page, sortBy, orderDirection) => {
    try {
      let orderBy;
      let orderDirection;
      if (sortBy === "created_at_desc") {
        orderBy = "created_at";
        orderDirection = "DESC";
      } else if (sortBy === "created_at_asc") {
        orderBy = "created_at";
        orderDirection = "ASC";
      }

      const data = await crudService._getAll("communitypost/search", {
        search: searchText,
        page: page + 1,
        pageSize: itemsPerPage,
        orderBy: orderBy,
        orderDirection: orderDirection,
      });

      if (data?.data?.response_type === 1) {
        setCommunityFeature(data.data?.data);
        setCommunityList([]);
        setNewsList([]);
      } else if (data?.data?.response_type === 2) {
        setCommunityList(data.data?.data);
        setCommunityFeature([]);
        setNewsList([]);
      } else if (data?.data?.response_type === 3) {
        console.log("console news", data.data?.data)
        setNewsList(data.data?.data);
        setCommunityFeature([]);
        setCommunityList([]);
      }

      setResponseType(data?.data?.response_type);
      setTotal(data.data?.lastPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Filter
  const handleSearch = (searchText) => {

    const filteredText = searchText.trim().slice(0, 60);

    setSearchQuery(filteredText);
    setCurrentPage(0);
    if (filteredText === "") {
      Router.push("/community/searchCommunity");
    } else {
      Router.push(`/community/searchCommunity?value=${encodeURIComponent(filteredText)}`);
    }

    getAllPosts(filteredText, 0, sortBy, orderDirection);
  };


  const communityDetails = (data) => {
    sessionStorage.setItem("community_id", data?.url_slug);
    Router.push(data?.url_slug);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === "Most Recent") {
      setOrderDirection("DESC");
    } else {
      setOrderDirection("ASC");
    }
    getAllPosts(searchQuery, currentPage, e.target.value, orderDirection);
  };

  const handleAllCommunity = () => {
    Router.push("/community");
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

  const gotoQuestionDetail = (url_slug) => {
    Router.replace(`/community/question/${url_slug}`);
  };
  const gotoNewsDetail = (url_slug) => {
    Router.replace(`/community/news/${url_slug}`);
  };
  const sortOptions = [
    {
      value: "created_at_desc",
      label: "Most Recent"
    },
    {
      value: "created_at_asc",
      label: "Oldest"
    }
  ];
  const getBreadcrumbText = () => {
    if (responseType === 1) {
      return "Question & Answers";
    } else if (responseType === 2) {
      return "Discussion Group";
    } else if (responseType === 3) {
      return "News";
    } else {
      return "Result data";
    }
  };
  return (
    <>
      <section className="query-section mt-6 search-community-section community-tab-container questions-tab-container community-detail-wrapper">
        <Container>
          <div className="row" style={{ paddingTop: "38px" }}>
            <div className="col-md-12">
              <h4 className="mt-1 mb-3">
                <span
                  onClick={() => handleAllCommunity()}
                  className="ml-2"
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
                  style={{
                    color: "#B0B8BF",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Search Result <RightOutlined style={{ verticalAlign: "0" }} />
                </span>{" "}
                <span
                  style={{
                    color: "#0074D9",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {getBreadcrumbText()}
                </span>
              </h4>
            </div>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h4 style={{
              marginLeft: "9px",
              fontSize: "large",
              fontWeight: "500",
              fontFamily: 'Inter'
            }}>
              {getBreadcrumbText()}
            </h4>
            {
              isMobile && !isBrowser &&
              <Image
                onClick={() => setSortByOrder(!sortByOrder)}
                style={{
                  borderRadius: "2px",
                  cursor: "pointer",
                  display: "none",
                }}
                width={44}
                height={44}
                preview={false}
                src={sorting_icon}
                alt="profile"
                className="shorting_icon"
              />
            }

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
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </Modal>
          </div>
          <div className="mt-3 search-bar-community">
            <SearchInput
              placeholder="Search anything"
              defaultValue={searchQuery}
              maxLength={60}
              onSearch={(value) => handleSearch(value)}
            />
            {!isMobile && isBrowser &&
              <div className="sorting-community sorting-display">
                <label className="sortby" htmlFor="sortDropdown">
                  Sort By:{" "}
                </label>
                <select
                  id="sortDropdown"
                  style={{ border: "none", background: "transparent", marginBottom: "0.6rem" }}
                  value={sortBy}
                  onChange={handleSort}
                >
                  {sortOptions.map(({ value, label }) => (
                    <option
                      className="sortby"
                      style={{ color: "#001622", border: "none" }}
                      value={value}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            }
          </div>

          <div className="cards-container">

            {communityFeature.length > 0 && communityFeature?.map((data) => (
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
                  <p className="questions_font_12px">
                    {data?.views_counter} views
                  </p>
                </div>
              </Card>
            ))}
            {
              <div className="questions-tab-container" style={{ marginTop: "1rem" }}>
                <ul>
                  {newsList && newsList.length > 0 && (
                    newsList.map((data) => (
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

                          <span
                            style={{
                              fontFamily: "Inter",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: data.description,
                            }}
                          ></span>
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
                    ))

                  )}
                </ul>
              </div>
            }
            <div className="content-wrap">
              <div className="mt-4 content-card-display">
                {communityList.length > 0 && communityList.map((item, index) => (
                  <div
                    className="community-category-below community-category-mobile"
                    style={{
                      marginTop: "-1rem",
                      height: "280px",
                      paddingRight: "0px",
                      flex: "0 0 calc(50%  - 20px)",
                    }}
                  >
                    <div className="category-box">
                      <div
                        className="category-banner-wrapper"
                        id="categoryWrapper"
                      >
                        <div className="category-banner-block">
                          <div
                            className="category-banner"
                            style={{ height: "220px" }}
                          >
                            <div className="category-content">
                              <div
                                className="content-header"
                                onClick={() => communityDetails(item)}
                              >
                                <div className="icon-bg">
                                  <img
                                    src={item.image_url}
                                    style={{ borderRadius: "4.8px" }}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="icon-image"
                                  />
                                </div>
                                <div
                                  className="category-text"
                                  style={{ maxWidth: "70%" }}
                                >
                                  <h6>{item.name}</h6>
                                </div>
                              </div>
                              <div
                                className="card-body"
                                style={{ paddingTop: "12px" }}
                                onClick={() => communityDetails(item)}
                              >
                                <p class="card-description">
                                  {item.description}
                                </p>
                                <div className="content-x">
                                  <div className="user-icon">
                                    <p>
                                      <EyeOutlined
                                        style={{
                                          fontSize: "16px",
                                          verticalAlign: "0.04em",
                                        }}
                                      />{" "}
                                      Answers :{" "}
                                      {item?.__meta__?.total_post_reply}
                                    </p>
                                  </div>
                                  <div className="query-icon">
                                    <p>
                                      <MessageOutlined
                                        style={{
                                          fontSize: "16px",
                                          verticalAlign: "0.04em",
                                        }}
                                      />{" "}
                                      Queries : {item?.__meta__?.total_posts}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* {!isSearchActive && !searchQuery && (
                    <div className="mt-5" style={{ width: "100%" }}>
                      {communityFeature?.length > 0 &&
                        Math.ceil(total / itemsPerPage) > 1 && (
                          <CustomPagination
                            pageCount={Math.ceil(total / itemsPerPage)}
                            page={currentPage}
                            onPageChange={({ selected }) => setCurrentPage(selected)}
                          />
                        )}
                    </div>
                  )} */}
              </div>
            </div>
          </div>
          <br></br>
          <div className="mt-5" style={{ width: "100%" }}>
            {communityFeature?.length > 0 && total > 1 && (
              <CustomPagination
                pageCount={total}
                page={currentPage}
                onPageChange={({ selected }) => setCurrentPage(selected)}
              />
            )}
          </div>
        </Container>
      </section >
    </>
  );
};

const mapStateToProps = (state) => {
  const { community } = state;
  return {
    community,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));
