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
import {isBrowser } from "react-device-detect";
import Router, { withRouter } from "next/router";

import CommunityCategory from "../../components/community/index";
import TrendingCategory from "../../components/community/trending";
import NewsAnnouncementsData from "../../components/community/news_and_announcement";

import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";

const Community = ({ community, getAllCrud, router }) => {
  const [posts, setPosts] = useState([]);
  const [fnColor, setFnColor] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [communityFeature, setCommunityFeature] = useState([]);
  const [value, setValue] = useState();
  
  const [allnewsAnnouncementsData, setallnewsAnnouncementsData] = useState([]);
  const [allCommunityFeature, setAllCommunityFeature] = useState([]);
  const [topRatedCommunityFeature, setTopRatedCommunityFeature] = useState([]);
  const [trendingQuestions, setTrendingQuestions] = useState([]);
  const [stats, setStats] = useState(null);
  const marketBannerImage = "../../images/market-research.jpg";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCommunityData = await crudService._getAll("community?orderBy=created_at&orderDirection=desc");
        setAllCommunityFeature(allCommunityData.data);
        const topRatedCommunityData = await crudService._getAll(
          "community?page=1&pageSize=5&orderBy=top_rated"
        );
        setTopRatedCommunityFeature(topRatedCommunityData?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const newsfetchData = async () => {
      try {
        const allnewsAnnouncementsData = await crudService._getAll("get_news_announcements/latest?pageSize=5&orderBy=created_at&orderDirection=desc");
        setallnewsAnnouncementsData(allnewsAnnouncementsData.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    newsfetchData();
  }, []);

  useEffect(() => {
    const statsFetch = async () => {
      try {
        const statsData = await crudService._getAll("community_stats");
        if (statsData?.data?.data && statsData.data.data.length > 0) {
          const setItem = statsData.data.data[0];
          setStats(setItem);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    statsFetch();
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

  const handleSearch = (searchValue) => {
    Router.push({
      pathname: "/community/searchCommunity",
      query: { value: searchValue },
    });
  };

  // const totalCounts = allCommunityFeature.reduce(
  //   (adder, community) => {
  //     adder.totalPosts += community.__meta__.total_posts;
  //     adder.totalPostReplies += community.__meta__.total_post_reply;
  //     adder.totalMembers += community.__meta__.total_members;
  //     return adder;
  //   },
  //   { totalPosts: 0, totalPostReplies: 0, totalMembers: 0 }
  // );

  return (
    <section
      className="community-section community-listing-page"
      style={{ background: "#fff" }}
    >
      <PageBanner
        titleNode={
          <div className="banner-head">
           
            <h4 className="newtabTitle newTitlefortab">Welcome to the Tech 24 Community</h4>
            <p className="sub-title">
            Get answer form our community of Experts
              </p>
            {stats && (
              <div className="community-stats communityStats">
                <div className="stat-container">
                  <h4>{stats?.total_member}</h4>
                  <p>Total Members</p>
                </div>
                <div className="stat-container">
                  <h4>{stats?.total_question}</h4>
                  <p>Questions</p>
                </div>
                <div className="stat-container">
                  <h4>{stats?.total_answer}</h4>
                  <p>Answers</p>
                </div>
              </div>
            )}
            <div className="mt-4" style={styles.inputGroup}>
              <SearchInput
                placeholder="Search anything"
                className="bg searchCommunity"
                maxLength={60}
                onSearch={(value) => handleSearch(value)}
                
              />
            </div>
          </div>
        }
        backgroundImage={marketBannerImage}
        // height={isBrowser ? 386 : 220}
         backgroundStyle={{ height: "386px" }}
        // image={isMobile ? "" : CommunityImage}
      />

      <Container>
      <div className="all-community">
          
       
        </div>
        <div className="top-rated">
          <div>
            <h4 className="mb-4 d-flex justify-content-between" style={{marginTop:"90px"}}>
            <div style={{
              display:'flex'
            }}>
            <div 
                style={{
                  width: "4px",
                  display:'inline-block',
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
                Most Active
              </span>{" "}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "#0074D9",
                  marginLeft: "10px",
                }}
              >
                Discussion Groups
              </span> 
            </div>
              <div className="float-right justify-content-between align-self-center">
           
            <h4
              style={{
                fontWeight: 400,
                fontSize: "16px",
                color: "#0074D9",
                textDecoration: "underline",
                cursor: "pointer",
                alignContent: "center",
              }}
              onClick={handleViewAll}
            >
              View all
            </h4>
          </div>
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
                Questions
              </span>
            </h4>
          </div>
          <div className="community-category-container">
            <TrendingCategory trendingQuestions={trendingQuestions} />
          </div>
        </div>
        {/* new accoupation */}
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
                Latest  
              </span>{" "}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "24px",
                  color: "#0074D9",
                  marginLeft: "10px",
                }}
              >
                News & Announcements
              </span>
            </h4>
          </div>
          <div className="community-category-container">
            <NewsAnnouncementsData allnewsAnnouncementsData={allnewsAnnouncementsData} />
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
  const { community,get_news_announcements } = state;
  return {
    community,
    get_news_announcements,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));
