import { useState, useEffect } from "react";
import { Container, Input } from "reactstrap";
import { crudService } from "../../_services";
import CommunityImage from "../../public/images/communityList.png";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import PageBanner from "../../components/card/pageBanner";
import { SearchOutlined } from "@ant-design/icons";
import SearchInput from "../../components/form/searchInput";
import React from "react";
import { TreeSelect } from "antd";

const unProtectedRoutes = ["/community", "/community/[detail]"];
import Router, { withRouter } from "next/router";

import CommunityCategory from "../../components/community/index";
import TrendingCategory from "../../components/community/trending";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";

const Community = ({ community, getAllCrud, router }) => {
  const [posts, setPosts] = useState([]);
  const [fnColor, setFnColor] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [communityFeature, setCommunityFeature] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();

  const [allCommunityFeature, setAllCommunityFeature] = useState([]);
  const [topRatedCommunityFeature, setTopRatedCommunityFeature] = useState([]);
  const [trendingQuestions, setTrendingQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCommunityData = await crudService._getAll("community");
        setAllCommunityFeature(allCommunityData.data);
        const topRatedCommunityData = await crudService._getAll(
          "community?top_rated"
        );
        setTopRatedCommunityFeature(topRatedCommunityData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTrendingQuestions = async () => {
      try {
        const trendingData = await crudService._getAll("tranding_question");
        setTrendingQuestions(trendingData.data);
      } catch (error) {
        console.error("Error fetching trending questions:", error);
      }
    };

    fetchTrendingQuestions();
  }, []);

  useEffect(() => {
    const searchPosts = async () => {
      try {
        const timeoutId = setTimeout(async () => {
          const data = await crudService._getAll("community", {
            search: value,
          });
          setCommunityFeature(data.data);
        }, 2000);
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    searchPosts();
  }, [value]);

  const handleViewAll = () => {
    Router.push("/community/all_community");
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

  // console.log("tree data", arrData);

  // const genTreeNode = (parentId, isLeaf = false) => {
  //   const random = Math.random().toString(36).substring(2, 6);
  //   return {
  //     id: random,
  //     pId: parentId,
  //     value: random,
  //     title: isLeaf ? "Tree Node" : "Expand to load",
  //     isLeaf,
  //   };
  // };
  // const onLoadData = ({ id }) =>
  //   new Promise((resolve) => {
  //     setTimeout(() => {
  //       // setTreeData(
  //       //     treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]),
  //       // );
  //       resolve(undefined);
  //     }, 300);
  //   });

  // const onChange = (newValue) => {
  //     const selectedCommunity = allCommunityFeature.find(feature => feature.name === newValue);
  //     setAllCommunityFeature(selectedCommunity ? [selectedCommunity] : []);
  //     setValue(newValue);
  // };
  const handleSearch = () => {
    // const selectedAllCommunity = allCommunityFeature.find(
    //   (feature) => feature.name === newValue
    // );
    // const selectedTopRatedCommunity = topRatedCommunityFeature.find(
    //   (feature) => feature.name === newValue
    // );

    // setAllCommunityFeature(selectedAllCommunity ? [selectedAllCommunity] : []);
    // setTopRatedCommunityFeature(
    //   selectedTopRatedCommunity ? [selectedTopRatedCommunity] : []
    // );
    // setValue(newValue);
    Router.push({
      pathname: "/community/searchCommunity",
      query: { value: search },
    });
  };

  const totalCounts = allCommunityFeature.reduce(
    (adder, community) => {
      adder.totalPosts += community.__meta__.total_posts;
      adder.totalPostReplies += community.__meta__.total_post_reply;
      adder.totalMembers += community.__meta__.total_members;
      return adder;
    },
    { totalPosts: 0, totalPostReplies: 0, totalMembers: 0 }
  );

  return (
    <section
      className="community-section community-listing-page"
      style={{ background: "#fff" }}
    >
      <PageBanner
        titleNode={
          <div className="banner-head">
            <h2 style={styles.title}>
              Welcome to the Tech 24 <br />
              Community
            </h2>
            <p style={styles.subtitle}>
              Get answer form our community of Experts
            </p>
            <div className="community-stats">
              <div className="stat-container">
                <h4>
                  {allCommunityFeature?.length}
                </h4>
                <p>Total Community</p>
              </div>
              <div className="stat-container">
                <h4>
                  {totalCounts.totalPosts}
                </h4>
                <p>Questions</p>
              </div>
              <div className="stat-container">
                <h4>
                  {totalCounts.totalPostReplies}
                </h4>
                <p>Answers</p>
              </div>
            </div>
            <div className="mt-4" style={styles.inputGroup}>
              <SearchInput
                placeholder="Search anything"
                className="SearchInput bg"
                value={search}
                onChange={(value) => setSearch(value)}
                suffix={
                  <SearchOutlined
                    style={{ color: "#1E96FF" }}
                    onClick={() => handleSearch()}
                  />
                }
              />
            </div>
          </div>
        }
        image={isMobile ? "" : CommunityImage}
      />

      <Container>
        <div className="top-rated">
          <div>
            <h4 className="mt-5 mb-4 d-flex">
              <div
                style={{
                  width: "4px",
                  height: "32px",
                  borderRadius: "0px 4px 4px 0px",
                  backgroundColor: "#0074D9",
                }}
              ></div>
              <span
                style={{
                  marginLeft: "1rem",
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#54616C",
                }}
              >
                Top
              </span>{" "}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "#0074D9",
                  marginLeft: "10px",
                }}
              >
                Rated
              </span>
            </h4>
          </div>
          <div
            className="community-category-container"
            style={{ width: "100%" }}
          >
            <CommunityCategory data={topRatedCommunityFeature} />
          </div>
        </div>

        <div className="trending-question">
          <div>
            <h4 className="mt-5 mb-4 d-flex">
              <div
                style={{
                  width: "4px",
                  height: "32px",
                  borderRadius: "0px 4px 4px 0px",
                  backgroundColor: "#0074D9",
                }}
              ></div>
              <span
                style={{
                  marginLeft: "1rem",
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#54616C",
                }}
              >
                Trending
              </span>{" "}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "#0074D9",
                  marginLeft: "10px",
                }}
              >
                Question
              </span>
            </h4>
          </div>
          <div className="community-category-container">
            <TrendingCategory trendingQuestions={trendingQuestions} />
          </div>
        </div>

        <div className="all-community">
          <div className="d-flex justify-content-between mt-5 mb-3">
            <h4 className="d-flex">
              <div
                style={{
                  width: "4px",
                  height: "32px",
                  borderRadius: "0px 4px 4px 0px",
                  backgroundColor: "#0074D9",
                }}
              ></div>
              <span
                style={{
                  marginLeft: "1rem",
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "#54616C",
                }}
              >
                All
              </span>
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "#0074D9",
                  marginLeft: "10px",
                }}
              >
                Community
              </span>
            </h4>
            <h4
              style={{
                fontWeight: 400,
                fontSize: "16px",
                color: "#0074D9",
                textDecoration: "underline",
                cursor: "pointer",
                // marginRight: isMobile ? 0 : "3.5rem",
                alignContent: "center",
              }}
              onClick={handleViewAll}
            >
              View all
            </h4>
          </div>
          <div
            className="community-category-container"
            style={{ width: "100%" }}
          >
            <CommunityCategory data={allCommunityFeature} />
          </div>
        </div>
      </Container>
    </section>
  );
};

// Define styles object
const styles = {
  searchContainer: {
    backgroundImage:
      "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "350px",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: 500,
  },
  subtitle: {
    color: "#E0E0E0",
    fontWeight: 400,
    fontSize: "16px",
  },
  inputGroup: {
    width: "100%",
    // width: isMobile ? "22rem" : "35rem",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center align content horizontally
    backgroundImage:
      "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "300px",
  },

  input: {
    width: "100%",
    height: "38px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productCol: {
    marginBottom: "20px",
  },
  productLink: {
    textDecoration: "none",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
};

const mapStateToProps = (state) => {
  const { community } = state;
  return {
    community,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));
