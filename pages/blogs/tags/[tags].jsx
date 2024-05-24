import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container } from "reactstrap";
import { crudService } from "../../../_services";
import moment from "moment";
import { Image, Modal } from "antd";
import PageBanner from "../../../components/card/pageBanner";
import { isMobile, isBrowser } from "react-device-detect";
import CustomPagination from "../../../components/pagination";
import SearchInput from "../../../components/form/searchInput";
import { wrappReadMinute } from "../../../_global";
import CustomSort from "../../../components/sort/indext";
const shorting_icon = "../../../new_images/sorting_icon.svg";
const blogBannerImage = "../../../images/blog_banner.jpg";

function Blogs({ router }) {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 12;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [sortBy, setSortBy] = useState("desc");
  const slugQuery = router.query;
  const [sortByOrder, setSortByOrder] = useState(false);
  useEffect(() => {
    if (slugQuery.tags) {
      crudService
        ._getAll("blogs", {
          page: page + 1,
          pageSize: itemsPerPage,
          search: value,
          orderBy: "blogs.created_at",
          orderPos: sortBy,
          tags: slugQuery.tags,
        })
        .then((result) => {
          setPosts(result?.data);
          setTotalItems(result?.data.total);
          const totalPage = Math.ceil(
            result?.data.total / result?.data.perPage
          );

          setPageCount(isNaN(totalPage) ? 0 : totalPage);
        });
    }
  }, [slugQuery, page, value, sortBy]);

  const handleSort = (e) => {
    setSortBy(e.target.value);
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

  const splitBlogTags = (data) => {
    let tags = data.split(",");
    return tags;
  };
  return (
    <>
      <section className="blogs-section">
        <PageBanner
          titleNode={
            <div className="banner-head mt-4">
              <h2 style={{ color: "white" }}>Welcome to the Tech 24 Blog</h2>

              <p style={{ color: "white" }}>Get our blogs</p>
              <hr></hr>
              <div className="" style={styles.inputGroup}>
                <div className="search-box">
                  <SearchInput
                    placeholder="Search anything"
                    className="bg blogSearchInput"
                    onSearch={(value) => {
                      setPage(0);
                      setValue(value.slice(0, 60));
                    }}
                    maxLength={60}
                    defaultValue={value}
                  />
                </div>
              </div>
            </div>
          }
          backgroundImage={blogBannerImage}
          // image={""}
          height={isBrowser ? 386 : 220}
        />
        <Container className="blog-container">
          <div
            style={{
              display: "flex",
            }}
          >
            <h4
              className="blogTitle"
              style={{
                color: "#005dd4",
              }}
            >
              {`Blogs`}
            </h4>
            <span
              style={{
                color: "#005dd4",
                padding: 5,
              }}
            >{`(Filtered with Tag : ${slugQuery.tags})`}</span>
          </div>
          <div
            className="result-sort"
            style={{
              paddingBottom: "20px",
            }}
          >
            <div className="results">Results: {totalItems}</div>
            <CustomSort
              options={sortOptions}
              value={sortBy}
              onOptinChange={handleSort}
            />
          </div>
          {posts?.data && posts?.data?.length > 0 ? (
            <div className="second-div ">
              {posts?.data?.map((post, key) => (
                <Link href={`/blogs/${post.slug}`} key={key}>
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
                        <Link
                          href={`/blogs/category/${post.blog_topic_name.trim()}`}
                        >
                          <p
                            className="category bg"
                            style={{
                              background: "#cce3f7",
                              border: "1px solid #0074d9",
                              color: "#0074d9",
                            }}
                          >
                            {post.blog_topic_name}
                          </p>
                        </Link>

                        <p className="blog-heading">{post.name}</p>
                        <p className="blog-tags-container">
                          {splitBlogTags(post.details).map((tag) => (
                            <Link
                              href={`/blogs/tags/${tag
                                .trim()
                                .replace("#", "")}`}
                            >
                              <div
                                className="blog-tags"
                                style={{
                                  color: "#0074d9",
                                }}
                              >
                                {tag}
                              </div>
                            </Link>
                          ))}
                        </p>
                      </div>
                      <div className="date-section">
                        <Link href={`/blogs/author/${post?.author.trim()}`}>
                          <div
                            className="time"
                            style={{
                              fontWeight: 400,
                              fontSize: "17px",
                              color: "#0074d9",
                            }}
                          >
                            {post?.author}
                          </div>
                        </Link>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div className="date">
                            {moment(post.created_at).format("LL")}
                          </div>
                          <div className="custom-divider"></div>
                          <div className="time">
                            {wrappReadMinute(post?.read_time)}
                          </div>
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
    marginTop: "-15px",
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
