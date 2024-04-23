import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container } from "reactstrap";
import { crudService } from "../../_services";
import moment from "moment";
import { Pagination, TreeSelect } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import PageBanner from "../../components/card/pageBanner";
import { isMobile, isBrowser } from "react-device-detect";
import ReactPaginate from "react-paginate-next";

function Blogs({ router }) {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async () => {
    try {
      const data = await crudService._getAll("blogs", { search: value, page: currentPage, pageSize: pageSize });
      setPosts(data.data);
      setTotalItems(data.totalItems);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(); 
  }, [value, currentPage, pageSize]); 
  
  
  
  useEffect(() => {
    blogsList(0);
    let query = router.query;
    crudService._getAll("categories", {}).then((result) => {
      let categories = result.data;
      categories.unshift({
        name: "All",
        id: 0,
        color: "#C0C0C0",
      });
      if (query) {
        const currentCategory = categories.filter(
          (c) => c.name == query.cat
        )[0];
        if (currentCategory) {
          blogsList(currentCategory.id);
          setIsActive(query.cat);
          setIsHover(query.cat);
        }
      }
    });
  }, []);

  let arrData = [];

  posts?.map((item) => {
    const random = Math.random().toString(36).substring(2, 6);
    const data = {
      id: random,
      value: item.name,
      title: item.name,
    };
    arrData.push(data);
  });

  const blogsList = (id) => {
    crudService._getAll("blogs", { blog_topic_id: id }).then((result) => {
      setPosts(result.data);
    });
  };

  const searchPosts = async () => {
    try {
      const data = await crudService._getAll("blogs", { search: value });
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSearchChange = (value) => {
  //   setValue(value);
  //   // Search after state update (with a delay)
  //   clearTimeout(searchTimeout);
  //   const searchTimeout = setTimeout(searchPosts, 300);
  // };

  const handleSearchChange = (value) => {
    setValue(value);
    setCurrentPage(1);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const onLoadData = async (treeNode) => {
    const { value } = treeNode.props;
    if (value) {
      const data = await crudService._getAll("blogs", { search: value });
      return data.data.map((item) => ({
        value: item.name,
        title: item.name,
      }));
    }
    return [];
  };


  const treeSelectWidth = isBrowser ? 568 : 343;

  return (
    <>
      <section className="blogs-section">
        <PageBanner
          titleNode={
            <div>
              <h2 style={{ color: "white" }}>
                Welcome to the Tech 24 <br />
                Blog
              </h2>

              <p style={{ color: "white" }}>Get our blogs</p>
              <hr></hr>
              <div className="mt-4" style={styles.inputGroup}>
                <TreeSelect
                  allowClear
                  treeDataSimpleMode
                  defaultValue={value}
                  showSearch={true}
                  dropdownStyle={{
                    maxHeight: 150,
                    overflow: "auto",
                  }}
                  placeholder="Search Anything..."
                  onChange={handleSearchChange}
                  loadData={onLoadData} 
                  treeData={arrData}
                  style={{ width: treeSelectWidth, height: "", color: "#fff" }}
                  suffixIcon={<SearchOutlined />}
                />
              </div>
            </div>
          }
          image={""}
          height={isBrowser ? 386 : 220}
        />
        <Container className="blog-container">
          <h4
            className="blogTitle"
            style={{
              color: "#005dd4",
              paddingLeft: "14px",
              paddingBottom: "20px",
            }}
          >
            Blogs
          </h4>
          <div className="row">
            <div className="second-div">
              {posts.length > 0 ? (
                posts
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((post, key) => (
                    <Link href={`blogs/${post.slug}`} key={key}>
                      <div className="blog-list">
                        <div
                          className="blog-card"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ letterSpacing: "normal" }}>
                            <Image
                              className="blogImage"
                              style={{ transition: "transform 0.5s ease" }}
                              width={350}
                              height={210}
                              src={post.image}
                              preview={false}
                              alt=""
                              placeholder="blog banner"
                              onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.1)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                              }}
                            />
                            <p className="category bg">{post.blog_topic_name}</p>
                            <p className="blog-heading">{post.name}</p>
                            <p className="blog-detail">{post.details}</p>
                          </div>
                          <div className="date-section">
                            <div className="date">
                              {moment(post.created_at).format("LL")}
                            </div>
                            <div className="custom-divider"></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              ) : posts && posts.length === 0 ? (
                <p style={{ padding: "20px" }}>No Blogs</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
        {/* <ReactPaginate
          pageCount={Math.ceil(totalItems / pageSize)}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          previousLabel={<span style={{ color: '#000', fontSize: '20px', fontWeight: 500 }}>{'<'}</span>}
          nextLabel={<span style={{ color: '#000', fontSize: '20px', fontWeight: 500 }}>{'>'}</span>}
          // activeClassName={"selected-page"}
          // pageClassName={"other-page"}
        /> */}
        <Pagination
          defaultCurrent={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
        />
      </section>
    </>
  );
}

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

export default withRouter(Blogs);
