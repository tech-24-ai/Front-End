import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";

const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

import React, { Component } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon } from "../../components/icons";
class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      fnColor: "",
      isActive: "All",
      isHover: "All",
    };
  }

  blogsList = (id) => {
    crudService._getAll("blogs", { blog_topic_id: id }).then((result) => {
      this.setState({ posts: result.data });
    });
  };

  componentDidMount() {
    this.blogsList(0);
    let query = this.props.router.query;
    crudService._getAll("categories", {}).then((result) => {
      let categories = result.data;
      categories.unshift({
        name: "All",
        id: 0,
        color: "#C0C0C0",
      });
      if (query) {
        const cuurentCategory = categories.filter(
          (c) => c.name == query.cat
        )[0];
        if (cuurentCategory) {
          this.blogsList(cuurentCategory.id);
          this.setState({ isActive: query.cat, isHover: query.cat });
        }
      }

      this.setState({ posting: categories });
    });
  }

  render() {
    const { isActive, isHover } = this.state;

    console.log("Active:", isActive);
    return (
      <>
        <section className="blogs-section">
          <PageBanner
            titleNode={
              <div>
                <h4>Blogs</h4>
              </div>
            }
            image={blogsBannerImage}
          />
          <Container className="blog-container">
            <div className="div-one" style={{ padding: "20px" }}>
              <SearchInput
                style={{
                  minWidth: "unset",
                  height: "unset",
                  margin: "5px 0px 15px 0px",
                }}
                className="testSearchInput"
                suffix={<SearchOutlined />}
              />

              <div className="blogs-category-filters">
                <p className="card-heading">Blog Categories</p>
                <hr />
                {this.state.posting &&
                  this.state.posting
                    .filter((e) => e.id != 5 && e.id != 1)
                    .map((post, key) => (
                      <a
                        key={key}
                        onMouseOver={(e) =>
                          this.setState({ isHover: post.name })
                        }
                        onMouseOut={(e) => this.setState({ isHover: "" })}
                        onClick={() => {
                          this.setState({ isActive: post.name });
                          this.blogsList(post.id);
                        }}
                        style={{
                          padding: "5px 6px",
                          borderRadius: "5px",
                          fontWeight: "500",
                          fontSize:
                            this.state.isActive === post.name
                              ? "1.1rem"
                              : "0.8rem" && this.state.isHover === post.name
                              ? "1.1rem"
                              : "0.8rem",
                        }}
                      >
                        {post.name}
                        <hr />
                      </a>
                    ))}
              </div>

              {/* <p className="card-heading" style={{ marginTop: "80px" }}>
                Recent Posts
              </p> */}
              {/* <hr /> */}
              {/* <div className="recent-container">
                <Image
                  loader={myImageLoader}
                  src={blogsProfile}
                  alt=""
                  layout="raw"
                  width={135}
                  height={100}
                  style={{ borderRadius: "10px" }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <p className="recent-header-text">
                    Don't Count on Freeto Win You Customers
                  </p>
                  <p className="recent-body-text">March 04, 2023</p>
                </div>
              </div>
              <div className="recent-container">
                <Image
                  loader={myImageLoader}
                  src={blogsProfile}
                  alt=""
                  layout="raw"
                  width={135}
                  height={100}
                  style={{ borderRadius: "10px" }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <p className="recent-header-text">
                    Is Your Organization Building Bridges?
                  </p>
                  <p className="recent-body-text">March 04, 2023</p>
                </div>
              </div>
              <div className="recent-container">
                <Image
                  loader={myImageLoader}
                  src={blogsProfile}
                  alt=""
                  layout="raw"
                  width={135}
                  height={100}
                  style={{ borderRadius: "10px" }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <p className="recent-header-text">
                    What Makes a Degree Review Successful?
                  </p>
                  <p className="recent-body-text">March 04, 2023</p>
                </div>
              </div> */}

              <p className="card-heading">
                Tags
              </p>
              <hr />
              <div className="tags-container">
                <Space wrap>
                  {this.state.posts &&
                    this.state.posts
                      .filter((e) => e.id != 5 && e.id != 1)
                      .map((post, key) => (
                        <a
                          key={key}
                          onClick={() => {
                            // setIsActive(post.name);
                            // blogsList(post.id);
                          }}
                        >
                          <CheckableTag
                            className="tags"
                            // checked={selectedTags.includes(post)}
                            // onChange={(checked) => handleChange(post, checked)}
                          >
                            {post.details}
                          </CheckableTag>
                          <hr />
                        </a>
                      ))}
                </Space>
              </div>
            </div>

            <div className="second-div">
              {this.state.posts.length > 0
                ? this.state.posts.map((post, key) => (
                    <Link href={`blogs/${post.slug}`}>
                      <Card
                        key={key}
                        hoverable
                        className="blog-card"
                        onClick={() => <Link href={`blogs/${post.slug}`} />}
                        cover={
                          <Image
                            loader={myImageLoader}
                            src={
                              post.image
                                ? post.image
                                : "images/img_not_available.jpg"
                            }
                            alt=""
                            layout="raw"
                            width={380}
                            height={283}
                            style={{
                              borderTopRightRadius: "10px",
                              borderTopLeftRadius: "10px",
                            }}
                          />
                        }
                      >
                        <div style={{ display: "flex" }}>
                          <ProfileIcon />
                          <p className="admin-text">Admin</p>

                          <DateIcon />

                          <p className="admin-text">
                            {post &&
                              new Date(
                                Date.parse(post.created_at.replace(/-/g, "/"))
                              ).toLocaleDateString("en-US", options)}
                          </p>
                        </div>
                        <p className="card-heading">{post.blog_topic_name}</p>
                        <p className="blogs-card-body">{post.name}</p>
                        <p className="read-more">
                          Read More{" "}
                          <Image
                            loader={myImageLoader}
                            src={rightArrow}
                            alt=""
                            layout="raw"
                            width={20}
                            height={20}
                          />
                        </p>
                      </Card>
                    </Link>
                  ))
                : this.state.posts && this.state.posts.length == 0
                ?<p style={{padding: "20px"}}>
                No Blogs
                </p> 
                : ""}
            </div>
          </Container>
        </section>
      </>
    );
  }
}

export default withRouter(Blogs);
