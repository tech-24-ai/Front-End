import React, { Component } from "react";
import { Space, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import InstaIconBlack from "../../public/new_images/InstaIconBlack.svg";
import LinkedInIconBlack from "../../public/new_images/LinkedInIconBlack.svg";
import FaceBookIconBlack from "../../public/new_images/FaceBookIconBlack.svg";
import TwitterIconBlack from "../../public/new_images/TwitterIconBlack.svg";
import leftArrowIndicator from "../../public/new_images/leftArrowIndicator.svg";
import rightArrowIndicator from "../../public/new_images/rightArrowIndicator.svg";
import rightArrowIndicatorWhite from "../../public/new_images/rightArrowIndicatorWhite.svg";
const { CheckableTag } = Tag;
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container, Row, Col, FormGroup, Label, Input, Card } from "reactstrap";
import { crudActions } from "../../_actions";
import Link from "next/dist/client/link";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
} from "next-share";
import Image from "next/image";
import myImageLoader from "../../components/imageLoader";
import { BrowserView } from "react-device-detect";
import SearchInput from "../../components/form/searchInput";
import { DateIcon, ProfileIcon } from "../../components/icons";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }
  componentDidMount() {
    const { asPath } = this.props.router;
    let slug = asPath.slice(1).split("/")[1];
    this.props.getCrud("blog", `blogs/${slug}`);

    // fetch category
    this.props.getCrud("categories", "categories");
  }

  render() {
    const { blog, categories } = this.props;
    const shareTitle = blog && blog.name;
    const slug = blog && blog.slug;
    const baseUrl = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI.replace(
      "/linkedin",
      ""
    );
    const shareUrl = `${baseUrl}/blogs/${slug}`;
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    let editorData = blog && JSON.parse(blog.html);
    let editorStyle = "";
    if (editorData?.css) {
      editorStyle = editorData.css;
    }
    if (editorData?.html) {
      editorData = editorData.html;
    }

    return (
      <section className="blog-detail-section">
        {blog && (
          <>
            <div className="page-banner">
              <div className="banner-bg">
                <Container>
                  <div
                    className="banner-container"
                    style={{ display: "unset" }}
                  >
                    <div className="banner-title-container blog-detail-heading-container">
                      <h4>{blog.name}</h4>
                      {/* <br />
                        <p className="sub-heading">
                          An enim nullam tempor sapien gravida donec enim ipsum
                          porta justo congue purus pretium ligula gravida donec
                          enim ipsum
                        </p> */}
                      <p className="home-blog">
                        Home{" "}
                        <span>
                          <Image
                            loader={myImageLoader}
                            src={rightArrowIndicatorWhite}
                            alt=""
                            layout="raw"
                            width={20}
                            height={20}
                          />
                        </span>{" "}
                        Blog
                      </p>
                    </div>
                    {/* <div></div> */}
                  </div>
                </Container>
              </div>
              <Container style={{ marginTop: "80px" }}>
                {blog && (
                  <div className="blog-breadcrumb">
                    <div style={{ display: "inline-block" }}>
                      <h5>
                        <Link href="/blogs">
                          <a>Blogs</a>
                        </Link>
                      </h5>
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <h5>
                        <Link href={`blogs?cat=${blog.blog_topic.name}`}>
                          <a>
                            <span>{`> ${blog.blog_topic.name}`}</span>
                          </a>
                        </Link>
                      </h5>
                    </div>
                  </div>
                )}
              </Container>
            </div>
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
                  {categories &&
                    categories
                      .filter((e) => e.id != 5 && e.id != 1)
                      .map((data, key) => {
                        return (
                          <FormGroup key={key}>
                            <Label
                              style={{ cursor: "pointer" }}
                              key={data.id}
                              onClick={() => {
                                this.props.router.push(
                                  `/blogs?cat=${data.name}`
                                );
                              }}
                            >
                              {data.name}
                            </Label>
                            <hr />
                          </FormGroup>
                        );
                      })}
                </div>

                {/* <p className="card-heading" style={{ marginTop: "80px" }}>
                    Recent Posts
                  </p>
                  <hr />
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

                <p className="card-heading">Tags</p>
                <hr />
                <div className="tags-container">
                  <Space wrap>
                    {blog?.details && (
                      <a
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
                          {blog?.details}
                        </CheckableTag>
                        <hr />
                      </a>
                    )}
                  </Space>
                </div>
              </div>

              <div className="second-div">
                <Card hoverable className="blog-card">
                  <Image
                    loader={myImageLoader}
                    src={blog.image}
                    alt=""
                    layout="raw"
                    width={900}
                    height={548}
                    style={{
                      objectFit: "cover",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                    }}
                  />
                  <div className="inner-text-container">
                    <div style={{ display: "flex" }}>
                      <ProfileIcon />
                      <p className="admin-text">Admin</p>

                      <DateIcon />

                      <p className="admin-text">
                        {blog &&
                          new Date(
                            Date.parse(blog.created_at.replace(/-/g, "/"))
                          ).toLocaleDateString("en-US", options)}
                      </p>
                    </div>
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: editorData,
                        }}
                      />
                    </div>
                    <p className="card-heading">Share:</p>

                    <div className="social-link">
                      <LinkedinShareButton url={shareUrl} title={shareTitle}>
                        <Image
                          loader={myImageLoader}
                          src={LinkedInIconBlack}
                          alt=""
                          placeholder="Website"
                          layout="raw"
                          height={25}
                          width={25}
                        />
                      </LinkedinShareButton>

                      <FacebookShareButton url={shareUrl} title={shareTitle}>
                        <Image
                          loader={myImageLoader}
                          src={FaceBookIconBlack}
                          alt=""
                          placeholder="twitter"
                          layout="raw"
                          height={25}
                          width={25}
                        />
                      </FacebookShareButton>

                      <TwitterShareButton url={shareUrl} title={shareTitle}>
                        <Image
                          loader={myImageLoader}
                          src={TwitterIconBlack}
                          alt=""
                          placeholder="Youtube"
                          layout="raw"
                          height={25}
                          width={25}
                        />
                      </TwitterShareButton>
                    </div>
                  </div>
                </Card>
                <div className="prev-next-footer">
                  <div style={{ textAlign: "left", width: "35%" }}>
                    <p className="admin-text">Previous:</p>
                    <div className="arrow-container">
                      <Image
                        loader={myImageLoader}
                        src={leftArrowIndicator}
                        alt=""
                        layout="raw"
                        width={20}
                        height={20}
                      />
                      <p style={{ marginLeft: "10px" }}>
                        Why a free afternoon each week can boost employees’
                        sense.
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", width: "29%" }}>
                    <p className="admin-text">Next:</p>
                    <div className="arrow-container">
                      <p style={{ marginRight: "10px" }}>
                        The 7 things Biden should do first to tackle climate
                        change.
                      </p>
                      <Image
                        loader={myImageLoader}
                        src={rightArrowIndicator}
                        alt=""
                        layout="raw"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </>
        )}
        {editorStyle && <BodyBackgroundColor style={editorStyle} />}
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { blog, categories } = state;
  return {
    blog: blog ? blog[0] : null,
    categories,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Blog));
