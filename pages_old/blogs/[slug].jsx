import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { crudActions } from "../../_actions";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import Link from "next/dist/client/link";
import Head from "next/head";
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
} from "next-share";
import Image from "next/image";
import myImageLoader from "../../components/imageLoader";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import Icon from "react-icons-kit";
import { chevronLeft } from "react-icons-kit/feather";
import RadioBox from "../../components/form/radioBox";

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
    return (
      <section className="blog-single-wrapper">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width user-scalable=no"
          />
          <meta name="title" content={blog && blog.meta_title} />

          <meta name="description" content={blog && blog.meta_description} />
          <meta name="keywords" content={blog && blog.meta_keywords} />
        </Head>
        <BrowserView>
          <div className="blog-heading-section">
            <div className="blog-heading-text">
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

              <h1>
                {blog && blog.name}
                {/* Lorem ipsum is a placeholder text commonly used to demonstrate */}
              </h1>
            </div>
            <div>
              {/* <img
                src={blog && blog.image}
                alt=""
                style={{ width: "550px", height: "280px" }}
              /> */}
              {blog && (
                <Image
                  loader={myImageLoader}
                  src={blog.image}
                  className=""
                  alt=""
                  layout="raw"
                  height={280}
                  width={550}
                  style={{
                    objectFit: "fill",
                  }}
                />
              )}
            </div>
          </div>

          <div className="blog-single-content">
            <Row>
              <Col md={9} className="blog-text-area">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "0",
                      fontSize: "17px",
                      fontWeight: "600",
                    }}
                  >
                    {blog &&
                      new Date(
                        Date.parse(blog.created_at.replace(/-/g, "/"))
                      ).toLocaleDateString("en-US", options)}
                  </p>
                  {blog && (
                    <div
                      style={{
                        marginLeft: "50px",
                      }}
                    >
                      <LinkedinShareButton url={shareUrl} title={shareTitle}>
                        <LinkedinIcon size={25} round />
                      </LinkedinShareButton>
                      <TwitterShareButton
                        url={shareUrl}
                        title={shareTitle}
                        style={{ marginLeft: "10px" }}
                      >
                        <TwitterIcon size={25} round />
                      </TwitterShareButton>
                    </div>
                  )}
                </div>
                <p className="blog-hash-tags">{blog && blog.details}</p>
                <div style={{ marginTop: "80px" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: blog && blog.html }}
                  />
                </div>
              </Col>
              <Col md={3} className="blog-sidebar">
                {/* <div style={{ marginTop: "40px", marginBottom: "30px" }}>
                  <Link href="/blogs/">
                    <a
                      style={{
                        color: "#2b7c9f",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      <Icon
                        size={23}
                        icon={chevronLeft}
                        style={{ marginLeft: "-6px" }}
                      />
                      Back to all posts
                    </a>
                  </Link>
                </div> */}
                <h3 className="blog-sidebar-title">All Topics</h3>
                <div className="blog-sidebar-categories">
                  {/* <ul>
                    {categories &&
                      categories
                        .filter((e) => e.id != 5 && e.id != 1)
                        .map((data) => (
                          <li className="cat-item" key={data.id}>
                            <a href={`/blogs?cat=${data.name}`}>{data.name}</a>
                          </li>
                        ))}
                  </ul> */}
                  <div
                    style={{ marginTop: "20px" }}
                    className={`radio-box-wrapper`}
                  >
                    <div>
                      {categories &&
                        categories
                          .filter((e) => e.id != 5 && e.id != 1)
                          .map((data, key) => {
                            return (
                              <FormGroup key={key}>
                                <Label key={data.id}>
                                  <Input
                                    type="radio"
                                    onClick={() => {
                                      this.props.router.push(
                                        `/blogs?cat=${data.name}`
                                      );
                                    }}
                                  />
                                  {data.name}
                                </Label>
                              </FormGroup>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </BrowserView>

        <MobileView>
          <div className="blog-heading-section">
            <img
              src={blog && blog.image}
              alt=""
              style={{ height: "170px", width: "100%" }}
            />

            <div className="blog-heading-text">
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
                          <span>{`>  ${blog.blog_topic.name}`}</span>
                        </a>
                      </Link>
                    </h5>
                  </div>
                </div>
              )}
              <h1>{blog && blog.name}</h1>
            </div>
          </div>

          <div className="blog-single-content">
            {/*  <div className="goback">
              <Link href="/blogs/">
                <a
                  style={{
                    color: "#2b7c9f",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Go Back
                </a>
              </Link>
            </div> */}
            <Row>
              <Col md={12} className="blog-text-area">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "0",
                      fontSize: "17px",
                      fontWeight: "600",
                    }}
                  >
                    {blog &&
                      new Date(
                        Date.parse(blog.created_at.replace(/-/g, "/"))
                      ).toLocaleDateString("en-US", options)}
                  </p>
                  {blog && (
                    <div
                      style={{
                        marginLeft: "50px",
                      }}
                    >
                      <LinkedinShareButton url={shareUrl} title={shareTitle}>
                        <LinkedinIcon size={25} round />
                      </LinkedinShareButton>
                      <TwitterShareButton
                        url={shareUrl}
                        title={shareTitle}
                        style={{ marginLeft: "10px" }}
                      >
                        <TwitterIcon size={25} round />
                      </TwitterShareButton>
                    </div>
                  )}
                </div>
                <p className="blog-hash-tags">{blog && blog.details}</p>
                <div style={{ marginTop: "40px" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: blog && blog.html }}
                  />
                </div>
              </Col>
              <Col md={12} className="blog-sidebar">
                {/* <div style={{ marginTop: "40px", marginBottom: "30px" }}>
                  <Link href="/blogs/">
                    <a
                      style={{
                        color: "#2b7c9f",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      <Icon
                        size={23}
                        icon={chevronLeft}
                        style={{ marginLeft: "-6px" }}
                      />
                      Back to all posts
                    </a>
                  </Link>
                </div> */}
                <h3 className="blog-sidebar-title">All Topics</h3>
                <div className="blog-sidebar-categories">
                  {/* <ul>
                    {categories &&
                      categories
                        .filter((e) => e.id != 5 && e.id != 1)
                        .map((data) => (
                          <li className="cat-item" key={data.id}>
                            <a href={`/blogs?cat=${data.name}`}>{data.name}</a>
                          </li>
                        ))}
                  </ul> */}
                  <div
                    style={{ marginTop: "20px" }}
                    className={`radio-box-wrapper`}
                  >
                    <div>
                      {categories &&
                        categories
                          .filter((e) => e.id != 5 && e.id != 1)
                          .map((data, key) => {
                            return (
                              <FormGroup key={key}>
                                <Label key={data.id}>
                                  <Input
                                    type="radio"
                                    onClick={() => {
                                      this.props.router.push(
                                        `/blogs?cat=${data.name}`
                                      );
                                    }}
                                  />
                                  {data.name}
                                </Label>
                              </FormGroup>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </MobileView>

        <BodyBackgroundColor color="#F4F6F6" />
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
