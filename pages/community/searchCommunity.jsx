import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container } from "reactstrap";
import { crudService } from "../../_services";
import Router from "next/router";
import {
  SearchOutlined,
  CloseCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import moment from "moment";
import { Card, Input, Select, Modal, Label } from "antd";
import CustomPagination from "../../components/pagination";
import { isMobile } from "react-device-detect";
import myImageLoader from "../../components/imageLoader";
import Image from "next/future/image";
import SearchInput from "../../components/form/searchInput";

const Community = ({ router }) => {
  const { value } = Router.query;
  const [communityFeature, setCommunityFeature] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState(value);

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
      const data = await crudService._getAll("communitypost/search", {
        search: searchText,
        page: page + 1,
        pageSize: itemsPerPage,
        orderBy: sortBy,
        orderDirection: orderDirection,
      });

      if (data?.data?.response_type === 1) {
        setCommunityFeature(data.data?.data);
      } else if (data?.data?.response_type === 2) {
        console.log("console");
      }

      setTotal(data.data?.lastPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Filter
  const handleSearch = (searchText) => {
    setSearchQuery(searchText);
    setCurrentPage(0);
    // setIsSearchActive(searchText.trim() !== "");
    getAllPosts(searchText, 0, sortBy);
  };

  let arrData = [];
  communityFeature?.map((item) => {
    const random = Math.random().toString(36).substring(2, 6);
    const data = {
      id: random,
      value: item.name,
      title: item.name,
    };
    arrData.push(data);
  });

  const [formData, setFormData] = useState({
    query: "",
    tag: "",
  });
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [month, day, year] = datePart.split("-");
    const [hours, minutes] = timePart.split(":");
    const parsedDate = new Date(year, month - 1, day, hours, minutes);
    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const communityDetails = (data) => {
    sessionStorage.setItem("community_id", data?.url_slug);
    Router.push("community_detail");
  };

  const joinCommunity = (community_id) => {
    crudService
      ._create("community/join", { community_id })
      .then(() => window.location.reload());
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    if (e.target.label === "Most Recent") {
      setOrderDirection("DESC");
    } else {
      setOrderDirection("ASC");
    }
    getAllPosts(searchQuery, currentPage, e.target.value, orderDirection);
  };

  // const handleClearSearch = () => {
  //   setSearchQuery("");
  //   setCurrentPage(0);
  //   setIsSearchActive(false);
  //   getAllPosts("", 0, sortBy);
  // };
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

  const sortOptions = [
    {
      value: "created_at",
      label: "Most Recent",
    },
    {
      value: "created_at",
      label: "Oldest",
    },
  ];
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
                    color: "#0074D9",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Search Result
                </span>
              </h4>
            </div>
          </div>
          <div className="mt-3 search-bar-community">
            <SearchInput
              placeholder="Search anything"
              defaultValue={searchQuery}
              onSearch={(value) => handleSearch(value)}
            />
            <div className="sorting-community sorting-display">
              <label className="sortby" htmlFor="sortDropdown">
                Sort By:{" "}
              </label>
              <select
                id="sortDropdown"
                style={{ border: "none", background: "transparent" }}
                value={sortBy}
                onChange={handleSort}
              >
                {sortOptions.map(({ value, label }) => (
                  <option
                    className="sortby"
                    style={{ color: "#001622" }}
                    value={value}
                  >
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="cards-container">
            {communityFeature?.map((data) => (
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
      </section>
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
