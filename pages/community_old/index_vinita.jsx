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
import { Card, Space } from 'antd';
const unProtectedRoutes = ["/community", "/community/[detail]"];



const Community = ({ community, getAllCrud }) => {

  const [posts, setPosts] = useState([]);
  const [fnColor, setFnColor] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [communityFeature, setCommunityFeature] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();

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

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await crudService._getAll("community");
        console.log("data", data);
        setCommunityFeature(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllPosts();
  }, []);


  let arrData = []
  communityFeature?.map((item) => {
    const random = Math.random().toString(36).substring(2, 6);
    const data = {
      id: random,
      value: item.name, title: item.name
    }
    arrData.push(data)
  })

  console.log("tree data", arrData)
  const genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
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
  const onChange = (newValue) => {
    setValue(newValue);
  };



  return (
    <>
      <section className="community-section mt-4">
        <PageBanner
          titleNode={
            <div>
              <h2 style={styles.title}>Welcome to the Tech 24 </h2>
              <h2 style={styles.title}>Community</h2>
              <p style={styles.subtitle}>Get answers from our community of experts.</p>
              <div className="mt-4" style={styles.inputGroup}>
                <TreeSelect
                  treeDataSimpleMode
                  defaultValue={value}
                  showSearch={true}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                  }}
                  placeholder="Search the community"
                  onChange={onChange}
                  loadData={onLoadData}
                  treeData={arrData}
                  style={{ width: "100%", height: "" }}
                />
              </div>
            </div>
          }
          image={CommunityImage}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="mt-5 mb-5" style={{ borderLeft: "5px solid #007aff " }}><span className="ml-2">Top</span> <span style={{ color: "#007aff" }}>Rated</span></h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div class=" card mb-3" >
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>

                <div class="card-body">
                  <h5 class="card-title">Primary Storage Discussion Group</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-outline-primary">Join Community</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class=" card mb-3" >
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>

                <div class="card-body">
                  <h5 class="card-title">Primary Storage Discussion Group</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-outline-primary">Join Community</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class=" card mb-3" >
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>

                <div class="card-body">
                  <h5 class="card-title">Primary Storage Discussion Group</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-outline-primary">Join Community</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class=" card mb-3" >

                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Primary Storage Discussion Group</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-outline-primary">Join Community</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4 className="mt-5 mb-5" style={{ borderLeft: "5px solid #007aff " }}><span className="ml-2">Trending</span> <span style={{ color: "#007aff" }}>Question</span></h4>
            </div>
          </div>
          <div className="row" >
            <div className="col-md-3">
              <div class="card mb-3" style={{ background: "gainsboro", }}>
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>
                <div class="card-body">

                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-primary" style={{ width: "200px" }}>Answer</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class=" card mb-3" style={{ background: "gainsboro", }}>
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>

                <div class="card-body">
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-primary" style={{ width: "200px" }}>Answer</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class=" card mb-3" style={{ background: "gainsboro", }} >
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage</h5>
                </div>

                <div class="card-body">
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-primary" style={{ width: "200px" }}>Answer</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div class=" card mb-3" style={{ background: "gainsboro", }}>
                <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                  <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU&auto=format&fit=max&w=128" style={{ width: "50px", }} alt="Card image cap" />
                  <h5 class="card-title mt-2 ml-4">Primary Storage </h5>
                </div>

                <div class="card-body">
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : 103  <MessageOutlined />Queries : 309</small></b></p>
                  <button type="button" class="btn btn-primary" style={{ width: "200px" }}>Answer</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4 className="mt-5 mb-5" style={{ borderLeft: "5px solid #007aff " }}><span className="ml-2">All</span> <span style={{ color: "#007aff" }}>Community</span></h4>
            </div>
          </div>
          <div className="row">
            {communityFeature?.map((item, index) => (
              <div className="col-md-3">
                <div class="card mb-3">
                  <div class="card-header" style={{ background: "gainsboro", display: "flex" }}>
                    <img class="card-img-top" src={item.image_url} style={{ width: "50px", }} alt="Card image cap" />
                    <h5 class="card-title ml-4 mt-2">{item.name}</h5>

                  </div>
                  <div class="card-body">
                    <p class="card-text">{item.description}</p>
                    <p class="card-text"><b><small class="text-muted"><UsergroupAddOutlined style={{ fontSize: "10px" }} />Members : {item?.__meta__?.total_members}  <MessageOutlined />Queries : {item?.__meta__?.total_post_reply}  </small></b></p>
                    <button type="button" class="btn btn-outline-primary">Join Community</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Define styles object
const styles = {
  searchContainer: {
    backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "350px",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap"
  },
  title: {
    color: "white",
    // textAlign: "center",

  },
  subtitle: {
    color: "white",
    // textAlign: "center",
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
    backgroundImage: "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "300px",

  },

  input: {
    width: "60%",
    height: "38px",
    textAlign: "center", display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productCol: {
    marginBottom: "20px"
  },
  productLink: {
    textDecoration: "none"
  },
  image: {
    maxWidth: "100%",
    height: "auto"
  }
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