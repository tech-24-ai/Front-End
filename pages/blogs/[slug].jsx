import React, { Component, Fragment } from "react";
import { Space, Tag } from "antd";
import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";
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
import { Modal } from "antd";

import Image from "next/image";
import myImageLoader from "../../components/imageLoader";
import { BrowserView } from "react-device-detect";
import SearchInput from "../../components/form/searchInput";
import { BookmarkIcon, DateIcon, ProfileIcon } from "../../components/icons";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import moment from "moment";
import { LikeOutlined } from "@ant-design/icons";
import { ShareAltOutlined } from "@ant-design/icons";
import { SaveOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";

import { Avatar, Button, Comment, Form, List } from "antd";
import CustomBreadcrumb from "../../components/breadcrumbs/Breadcrumb";
import ShareSocialMedia from "../../components/shareSocial";
import Head from "next/head";
const { TextArea } = Input;

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
    this.state = {
      blogs: null,
      comments: [],
      submitting: false,
      value: "",
      meta: {
        title: "",
        description: "",
      },
      showModal: false,
      modalMessage: "",
    };
  }

  handleSubmit = () => {
    const { value, comments } = this.state;
    if (!value) return;
    this.setState({ submitting: true });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...comments,
          {
            author: "Han Solo",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: <p>{value}</p>,
            datetime: moment("2016-11-22").fromNow(),
          },
        ],
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  componentDidMount() {
    const { asPath } = this.props.router;
    let slug = asPath.slice(1).split("/")[1];
    this.props.getCrud("blog", `blogs/${slug}`);
    this.props.getCrud("blogs", "blogs");

    // fetch category
    this.props.getCrud("categories", "categories");
  }
  componentDidUpdate(prevProps) {
    const { asPath } = this.props.router;
    const prevAsPath = prevProps.router.asPath;

    if (asPath !== prevAsPath) {
      let slug = asPath.slice(1).split("/")[1];
      this.props.getCrud("blog", `blogs/${slug}`);
      this.props.getCrud("blogs", "blogs");
      // fetch category
      this.props.getCrud("categories", "categories");
    }
  }

  // saveToLibrary = (id) => {
  //   this.props.createCrud("save_to_library", "blogs/save", { id });
  // };
  saveToLibrary = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      await this.props.createCrud("save_to_library", "blogs/save", { id });
      this.setState({
        modalMessage: "Blog saved successfully!",
        showModal: true,
      });
    } catch (error) {
      console.error("Error saving blog:", error);
      this.setState({
        modalMessage: "Failed to save blog. Please try again later.",
        showModal: true,
      });
    }
  };

  // To reload the page
  reloadPage = () => {
    window.location.reload();
  };

  handleMeta = (e) => {
    this.setState({ meta: e });
  };

  render() {
    const { comments, submitting, value, meta, showModal, modalMessage } =
      this.state;
    const { blog, categories, blogs, authentication } = this.props;
    // const limitedData = blogs.slice(0, 4);
    const limitedData = blog ? blog.related_blogs.slice(0, 4) : [];
    const shareTitle = blog && blog.name;
    const slug = blog && blog.slug;
    const baseUrl = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI?.replace(
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
    // let editorData = blog && blog.html;
    console.log("editor", editorData);
    let editorStyle = "";
    if (editorData) {
      if (editorData?.css) {
        editorStyle = editorData.css;
      }
      if (editorData?.html) {
        editorData = editorData.html;
      }
    }

    // let processedEditorData = "";
    // if (editorData) {
    //   processedEditorData = editorData.replace(/\\\\n/g, "");
    // }
    const splitBlogTags = (data) => {
      let tags = data.split(",");
      return tags;
    };

    return (
      <section className="blog-detail-section">
        {blog && (
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
              />
              <meta name="title" content={blog.meta_title} />
              <meta name="description" content={blog.meta_description} />
            </Head>
            <Container style={{ marginTop: "3rem" }}>
              {blog && (
                <CustomBreadcrumb
                  data={[
                    { label: "Blogs", url: "/blogs" },
                    {
                      label: blog.name,
                      url: "",
                    },
                  ]}
                  setMeta={(e) => this.handleMeta(e)}
                />
              )}
            </Container>
            <Container className="blog-container">
              <div className="row" style={{ width: "100%" }}>
                <div className="col-md-8">
                  <div className="second-div">
                    <div className="blog-card">
                      <Image
                        loader={myImageLoader}
                        src={blog.banner || blog.image}
                        alt=""
                        width={900}
                        height={345}
                        style={{
                          objectFit: "cover",
                          borderTopRightRadius: "10px",
                          borderTopLeftRadius: "10px",
                        }}
                      />
                      <div className="card-heading">
                        {blog.blog_topic?.name}
                      </div>

                      <div className="inner-text-container">
                        <div>
                          <h3>{blog.name}</h3>
                        </div>

                        {blog?.author && (
                          <div className="time">by {blog?.author}</div>
                        )}
                        <div className="date-section">
                          <ClockCircleOutlined />
                          <div className="time">{blog?.read_time}</div>
                          <div className="dot-separator"></div>
                          <div className="date">
                            Published {moment(blog.created_at).format("LL")}
                          </div>
                        </div>

                        <br />
                        <div>
                          {/* <p>{editorData}</p> */}
                          {/* <div
                        dangerouslySetInnerHTML={{
                          __html: editorData ,
                        }}
                      /> */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: editorData,
                            }}
                            style={{
                              maxWidth: "100%",
                              overflow: "hidden",
                            }}
                          />
                        </div>
                        <br />
                        <div className="blog-tags-container">
                          {splitBlogTags(blog.details).map((tag) => (
                            <div className="blog-tags">{tag}</div>
                          ))}
                        </div>
                        <br />

                        <div className="social-section">
                          {/* <div className="like">1.1K</div>
                          <div className="custom-divider"></div> */}
                          <ShareSocialMedia
                            link={window.location.href}
                            title={blog?.name}
                          >
                            <div className="share-btn">
                              <ShareAltOutlined /> Share
                            </div>
                          </ShareSocialMedia>
                          {authentication.loggedIn &&
                            blog?.is_saved_blog == null && (
                              <Fragment>
                                <div className="custom-divider"></div>
                                <div
                                  className="save-btn"
                                  onClick={() => this.saveToLibrary(blog?.id)}
                                >
                                  <BookmarkIcon height={15} width={12} /> Save
                                </div>
                              </Fragment>
                            )}
                          <Modal
                            cancelButtonProps={{ style: { display: "none" } }}
                            title="Save Blog"
                            visible={this.state.showModal}
                            onOk={() => {
                              this.setState({ showModal: false });
                              this.reloadPage();
                            }}
                          >
                            <p>{this.state.modalMessage}</p>
                          </Modal>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <h4
                    className="related-blog"
                    style={{ paddingBottom: "1rem" }}
                  >
                    Related Blogs
                  </h4>

                  <div className="row">
                    <div className="second-div">
                      {/* {limitedData.map((item, index) => ( */}
                      {limitedData &&
                        limitedData.map((blogs) => (
                          <Link href={`/blogs/${blogs.slug}`}>
                            <div className="col-md-12 blog-list hover">
                              <div
                                className="blog-card"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <Image
                                    tyle={{
                                      transition: "transform 0.5s ease",
                                    }}
                                    // width={350}
                                    // height={210}
                                    width={380}
                                    height={283}
                                    src={blogs.image}
                                    preview={false}
                                    alt=""
                                    placeholder="blog banner"
                                    onMouseOver={(e) => {
                                      e.target.style.transform = "scale(1.1)"; // Zoom in on hover
                                    }}
                                    onMouseOut={(e) => {
                                      e.target.style.transform = "scale(1)"; // Zoom out on mouse out
                                    }}
                                  />
                                  <p className="card-heading">
                                    {blogs.blog_topic.name}
                                  </p>

                                  <p className="blogs-card-body">
                                    {blogs.name}
                                  </p>
                                  <p className="blog-detail">
                                    {blogs.details}{" "}
                                  </p>
                                </div>
                                <div className="date-section">
                                  <div className="date">
                                    {moment(blogs.created_at).format("LL")}
                                  </div>
                                  {/* <div className="custom-divider"></div> */}
                                  <div className="time">{blogs?.read_time}</div>
                                  {/* <div className="custom-divider"></div> */}
                                  <div className="time">{blogs?.author}</div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
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

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const mapStateToProps = (state) => {
  const { blog, categories, authentication } = state;
  return {
    blog: blog ? blog[0] : null,
    categories,
    authentication,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
  createCrud: crudActions._create,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Blog));
