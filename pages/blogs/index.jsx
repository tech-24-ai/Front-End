import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container } from "reactstrap";
import { crudService } from "../../_services";
import moment from "moment";
import { Pagination, TreeSelect } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Image } from "antd";
import PageBanner from "../../components/card/pageBanner";
import { isMobile, isBrowser } from "react-device-detect";
import CustomPagination from "../../components/pagination";
import SearchInput from "../../components/form/searchInput";
// import ReactPaginate from "react-paginate-next";

function Blogs({ router }) {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState("All");
  const [isHover, setIsHover] = useState("All");
  const [currentPage, setCurrentPage] = useState(4);
  // const [pageSize] = useState(21);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 12;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // const fetchData = async () => {
  //   try {
  //     const data = await crudService._getAll("blogs", { search: value, page: currentPage, pageSize: pageSize });
  //     setPosts(data.data);
  //     setTotalItems(data.totalItems);
  //     console.log("data", data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [value, currentPage, pageSize]);

  useEffect(() => {
    fetchBlogData();
  }, [page, value]);

  const fetchBlogData = () => {
    crudService
      ._getAll("blogs", {
        page: page + 1,
        pageSize: itemsPerPage,
        search: value,
      })
      .then((result) => {
        console.log("result", result);
        setPosts(result?.data);
        setTotalItems(result?.totalItems);
        const totalPage = Math.ceil(result?.data.total / result?.data.perPage);
        console.log("totalPage", totalPage);
        setPageCount(isNaN(totalPage) ? 0 : totalPage);
      });
  };

  // useEffect(() => {
  //   blogsList(0);
  //   let query = router.query;
  //   crudService._getAll("categories", {}).then((result) => {
  //     let categories = result.data;
  //     categories.unshift({
  //       name: "All",
  //       id: 0,
  //       color: "#C0C0C0",
  //     });
  //     if (query) {
  //       const currentCategory = categories.filter(
  //         (c) => c.name == query.cat
  //       )[0];
  //       if (currentCategory) {
  //         blogsList(currentCategory.id);
  //         setIsActive(query.cat);
  //         setIsHover(query.cat);
  //       }
  //     }
  //   });
  // }, []);

  // const blogsList = (id) => {
  //   crudService._getAll("blogs", { blog_topic_id: id }).then((result) => {
  //     setPosts(result.data);
  //   });
  // };

  // const searchPosts = async () => {
  //   try {
  //     const data = await crudService._getAll("blogs", { search: value });
  //     setPosts(data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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

  return (
    <>
      <section className="blogs-section">
        <PageBanner
          titleNode={
            <div className="banner-head">
              <h2 style={{ color: "white" }}>Welcome to the Tech 24 Blog</h2>

              <p style={{ color: "white" }}>Get our blogs</p>
              <hr></hr>
              <div className="mt-4" style={styles.inputGroup}>
                <div className="search-box">
                  <SearchInput
                    placeholder="Search anything"
                    className="bg"
                    onSearch={(value) => {
                      setPage(0);
                      setValue(value.slice(0, 60));
                    }}
                    defaultValue={value}
                  />
                </div>
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
              paddingBottom: "20px",
            }}
          >
            Blogs
          </h4>
          {posts?.data && posts?.data?.length > 0 ? (
            <div className="second-div">
              {posts?.data?.map((post, key) => (
                <Link href={`blogs/${post.slug}`} key={key}>
                  <div className="blog-list">
                    <div
                      className="blog-card"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ letterSpacing: "normal" }}>
                        <Image
                          className="latest-blog-list-img"
                          style={{ transition: "transform 0.5s ease" }}
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
                      <div
                        className="date-section"
                        style={
                          {
                            // display: "flex",
                            // justifyContent: "space-between",
                            // width: "100%",
                          }
                        }
                      >
                        <div
                          className="time"
                          style={{
                            fontWeight: 400,
                            fontSize: "17px",
                            color: "#001622",
                          }}
                        >
                          {post?.author}
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div className="date">
                            {moment(post.created_at).format("LL")}
                          </div>
                          <div className="custom-divider"></div>
                          <div className="time">{post?.read_time}</div>
                          {/* <div className="custom-divider"></div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontWeight: "400",
                fontSize: "14px",
                color: "#54616C",
                textAlign: "center",
                padding: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              No Data Available
            </p>
          )}

          <br></br>
          <div className="mt-5" style={{ width: "100%" }}>
            {posts?.data?.length > 0 && pageCount > 1 && (
              <CustomPagination
                pageCount={pageCount}
                page={page}
                onPageChange={({ selected }) => setPage(selected)}
              />
            )}
          </div>
        </Container>
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
