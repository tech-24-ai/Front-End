import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Input } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CommunityImage from "../../public/images/communityList.png";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon } from "../../components/icons";
import { Icon } from "react-icons-kit";
import Router from "next/router";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import PageBanner from "../../components/card/pageBanner";
import { SearchOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import React from "react";
import { TreeSelect } from "antd";
import { Card, Space } from "antd";
const unProtectedRoutes = ["/community", "/community/[detail]"];

import CommunityCategory from "../../components/community/index";
import TrendingCategory from "../../components/community/trending";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";

const Community = ({ community, getAllCrud }) => {
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
        const data = await crudService._getAll("community", { search: value });
        console.log("data", data);
        setCommunityFeature(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setTimeout(() => {
      searchPosts();
    }, 300);
  }, [value]);
  console.log("search", search);

  // useEffect(() => {
  //     const getAllPosts = async () => {
  //         try {
  //             const data = await crudService._getAll("community");
  //             console.log("data", data);
  //             setCommunityFeature(data.data);
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     };
  //     getAllPosts();
  // }, []);

  const handleViewAll = () => {
    Router.push("/community/query_detail");
  };

  let arrData = [];

  console.log("communityFeature", communityFeature);

  communityFeature?.map((item) => {
    const random = Math.random().toString(36).substring(2, 6);
    const data = {
      id: random,
      value: item.name,
      title: item.name,
    };
    arrData.push(data);
  });

  console.log("tree data", arrData);

  const genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? "Tree Node" : "Expand to load",
      isLeaf,
    };
  };
  const onLoadData = ({ id }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        // setTreeData(
        //     treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]),
        // );
        resolve(undefined);
      }, 300);
    });

  // const onChange = (newValue) => {
  //     const selectedCommunity = allCommunityFeature.find(feature => feature.name === newValue);
  //     setAllCommunityFeature(selectedCommunity ? [selectedCommunity] : []);
  //     setValue(newValue);
  // };
  const onChange = (newValue) => {
    const selectedAllCommunity = allCommunityFeature.find(
      (feature) => feature.name === newValue
    );
    const selectedTopRatedCommunity = topRatedCommunityFeature.find(
      (feature) => feature.name === newValue
    );

    setAllCommunityFeature(selectedAllCommunity ? [selectedAllCommunity] : []);
    setTopRatedCommunityFeature(
      selectedTopRatedCommunity ? [selectedTopRatedCommunity] : []
    );
    Router.push({
      pathname: "/community/query_detail",
      query: { value: newValue },
    });
    setValue(newValue);
  };

  return (
    <section className="community-section community-listing-page mt-4" style={{background: "#fff"}}>
      <PageBanner
        titleNode={
          <div>
            <h2 style={styles.title}>
              Welcome to the Tech 24 <br />
              Community
            </h2>

            <p style={styles.subtitle}>
              Get answer form our community of Experts
            </p>
            <div className="mt-4" style={styles.inputGroup}>
              <TreeSelect
                allowClear
                treeDataSimpleMode
                defaultValue={value}
                showSearch={true}
                dropdownStyle={{
                  maxHeight: 90,
                  overflow: "auto",
                }}
                placeholder="Search anything..."
                onChange={onChange}
                // loadData={onLoadData}
                treeData={arrData}
                style={{ width: "100%", height: "", color: "#fff" }}
                suffixIcon={<SearchOutlined />}
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
                marginRight: "2rem",
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
    width: "60%",
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
