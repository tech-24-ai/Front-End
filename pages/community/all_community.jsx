import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import { crudService } from "../../_services";
import Router from "next/router";
import { SearchOutlined } from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { RightOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import moment from "moment";
import { Input } from "antd";
import ReactPaginate from "react-paginate-next";
import CommunityCategory from "../../components/community/index";
import CustomPagination from "../../components/pagination";
import SearchInput from "../../components/form/searchInput";
import NotFound from "../../components/notFound";
import CustomSort from "../../components/sort/indext";

const Community = ({ router }) => {
  const { q } = Router.query;
  const [communityFeature, setCommunityFeature] = useState([]);
  const [sortBy, setSortBy] = useState("desc");
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState(q);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (!searchQuery && q) {
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.replaceState({}, "", url.toString());
    }
    getAllPosts();
  }, [currentPage, searchQuery, sortBy]);

  const getAllPosts = async () => {
    try {
      const data = await crudService._getAll("community", {
        search: searchQuery,
        page: currentPage + 1,
        pageSize: itemsPerPage,
        orderBy: "updated_at",
        orderDirection: sortBy,
      });
      setCommunityFeature(data.data?.data);
      setTotal(data.data?.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Filter
  const handleSearch = () => {
    if (!searchQuery && q) {
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.replaceState({}, "", url.toString());
    }
    getAllPosts();
  };

  const communityDetails = (data) => {
    Router.push(data?.url_slug);
  };

  const joinCommunity = (community_id) => {
    crudService
      ._create("community/join", { community_id })
      .then(() => window.location.reload());
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleAllCommunity = () => {
    Router.push("/community");
  };

  const sortOptions = [
    {
      value: "desc",
      label: "Most Recent",
    },
    {
      value: "asc",
      label: "Most Older",
    },
  ];

  return (
    <>
      <section className="query-section mt-6">
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
                  }}
                >
                  All Discussion Groups
                </span>
              </h4>
            </div>
          </div>
          <div className="search-box mt-3">
            <SearchInput
              placeholder="Search anything"
              defaultValue={searchQuery}
              onSearch={(value) => setSearchQuery(value)}
              maxLength={60}
            />
          </div>

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="mt-5"
          >
            <div className="content-wrap">
              <div className="result-sort">
                <div className="results">Results: {total}</div>
                <CustomSort
                  options={sortOptions}
                  value={sortBy}
                  onOptinChange={handleSort}
                />
              </div>
              <div className="mt-4 content-card-display">
                {communityFeature && communityFeature?.length > 0 ? (
                  communityFeature.map((item, index) => (
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
                                {/* <hr class="dotted-hr"></hr> */}
                                {/* <hr className="dashed" /> */}

                                {/* <div className="learn-more-box-ac">
                                                                {item.communityMember.length === 0 ? (
                                                                    <Button className="btn-box"
                                                                        onClick={() => joinCommunity(item.id)}
                                                                    >
                                                                        Join Community
                                                                    </Button>
                                                                ) : (
                                                                    <p style={{
                                                                            textAlign: "left",
                                                                            width: "100%",
                                                                            paddingLeft: "5px",
                                                                            marginTop: "14px",
                                                                            fontWeight: "600",
                                                                            fontFamily: "Inter"
                                                                             }}>
                                                                        Member since {moment(item.communityMember[0]?.created_at).format("MMMM DD, YYYY")}
                                                                    </p>
                                                                )}
                                                            </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
          {!isSearchActive && !searchQuery && (
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
          )}
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
