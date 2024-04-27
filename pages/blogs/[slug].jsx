import React, { Component, Fragment } from "react";
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
import { BookmarkIcon, DateIcon, ProfileIcon } from "../../components/icons";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import moment from "moment";
import { LikeOutlined } from "@ant-design/icons";
import { ShareAltOutlined } from "@ant-design/icons";
import { SaveOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";

import { Avatar, Button, Comment, Form, List } from "antd";
import CustomBreadcrumb from "../../components/breadcrumbs/Breadcrumb";
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

  saveToLibrary = (id) => {
    this.props.createCrud("save_to_library", "market_research/save", { id });
  };

  render() {
    const { comments, submitting, value } = this.state;
    const { blog, categories, blogs, authentication } = this.props;
    // const limitedData = blogs.slice(0, 4);
    const limitedData = blogs ? blogs.slice(0, 4) : [];
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
    // let editorData = blog && JSON.parse(blog.html);
    let editorData = blog && blog.html;
    let editorStyle = "";
    if (editorData?.css) {
      editorStyle = editorData.css;
    }
    if (editorData?.html) {
      editorData = editorData.html;
    }

    let processedEditorData = "";
    if (editorData) {
      processedEditorData = editorData.replace(/\\\\n/g, "");
    }

    return (
      <section className="blog-detail-section">
        {blog && (
          <>
            <Container style={{ marginTop: "3rem" }}>
              {blog && (
                <CustomBreadcrumb
                  data={[
                    { label: "Blogs", url: "/blogs" },
                    {
                      label: blog.blog_topic.name,
                      url: "",
                    },
                  ]}
                />
              )}
            </Container>

            <Container className="blog-container">
              <div className="row">
                <div className="col-md-8">
                  <div className="second-div">
                    <div className="blog-card">
                      <Image
                        s
                        loader={myImageLoader}
                        src={blog.image}
                        alt=""
                        width={900}
                        height={548}
                        style={{
                          objectFit: "cover",
                          borderTopRightRadius: "10px",
                          borderTopLeftRadius: "10px",
                        }}
                      />
                      <div className="inner-text-container">
                        {/* <div style={{ display: "flex" }}>
                      <ProfileIcon />
                      <p className="admin-text">Admin</p>

                      <DateIcon />

                      <p className="admin-text">
                        {blog &&
                          new Date(
                            Date.parse(blog.created_at.replace(/-/g, "/"))
                          ).toLocaleDateString("en-US", options)}
                      </p>
                    </div> */}
                        <div>
                          <h3>{blog.meta_title}</h3>
                        </div>
                        <div>
                          {/* <p>{editorData}</p> */}
                          {/* <div
                        dangerouslySetInnerHTML={{
                          __html: editorData ,
                        }}
                      /> */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: processedEditorData,
                            }}
                          />
                        </div>
                        <div className="social-section">
                          {/* <div className="like">1.1K</div>
                          <div className="custom-divider"></div> */}
                          <div className="share-btn">
                            <ShareAltOutlined /> Share
                          </div>
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
                        </div>
                        {/* <div className="row">
                      <div className="col-md-12" style={{border:"1px solid #caced1", background:"#caced1"}}>
                    <Comment
                    
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                  
                    content={
                      
                      <Input
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                        placeholder="Write a comment..."
                        style={{height:"200px",border:"white",pointerEvents:"none",background:"#caced1",color:"white"}}
                      />
                    
                    }
                    
                  />
                  <button className="btn btn-primary btn-sm mb-2 mr-2" style={{float:"right",width:"80px"}}>Post</button>
                   </div>
                    </div> */}
                        {/* <div class="py-4">
                        <div class="row row-cols-1 g-4 mb-4">

                          <div class="col">
                              <div class="h-100 card-review">
                                <div class="pb-0 d-flex flex-row justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                      <img class="rounded-circle me-2"
                                            src="https://via.placeholder.com/256/fe669e/fff.png" />
                                      <div class="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm">
                                          <b className="ml-3">Studio KonKon 9h</b>
                                          <small class="text-muted">14th Sept 2021</small>
                                      </div>
                                    </div>
                                    <span class="fs-1 my-0 fw-bolder text-success">10</span>
                                </div>
                                <div class="card-body py-2">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div class="pt-0 d-flex flex-row align-items-center text-muted">
                                    <span class="me-1"><i class="zmdi zmdi-comments"></i></span>
                                  
                                    <p className="like-review ml-5"><LikeOutlined /> <b className="mt-3">5</b></p>
                                    <p className="like-review ml-5"><MessageOutlined /> <b className="mt-3">Reply</b></p>

                                </div>

                                <p class="stretched-link">-View more Reply</p>
                              </div>
                          </div>

                          <div class="col">
                              <div class="h-100 card-review">
                                <div class="pb-0 d-flex flex-row justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                      <img class="rounded-circle me-2"
                                            src="https://via.placeholder.com/256/fe669e/fff.png" />
                                      <div class="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm">
                                          <b className="ml-3">Studio KonKon 9h</b>
                                          <small class="text-muted">14th Sept 2021</small>
                                      </div>
                                    </div>
                                    <span class="fs-1 my-0 fw-bolder text-success">10</span>
                                </div>
                                <div class="card-body py-2">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div class="pt-0 d-flex flex-row align-items-center text-muted">
                                    <span class="me-1"><i class="zmdi zmdi-comments"></i></span>
                                  
                                    <p className="like-review ml-5"><LikeOutlined /> <b className="mt-3">5</b></p>
                                    <p className="like-review ml-5"><MessageOutlined /> <b className="mt-3">Reply</b></p>

                                </div>

                                <p class="stretched-link">-View more Reply</p>
                              </div>
                          </div>

                          <div class="col">
                              <div class="h-100 card-review">
                                <div class="pb-0 d-flex flex-row justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                      <img class="rounded-circle me-2"
                                            src="https://via.placeholder.com/256/fe669e/fff.png" />
                                      <div class="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm">
                                          <b className="ml-3">Studio KonKon 9h</b>
                                          <small class="text-muted">14th Sept 2021</small>
                                      </div>
                                    </div>
                                    <span class="fs-1 my-0 fw-bolder text-success">10</span>
                                </div>
                                <div class="card-body py-2">
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div class="pt-0 d-flex flex-row align-items-center text-muted">
                                    <span class="me-1"><i class="zmdi zmdi-comments"></i></span>
                                  
                                    <p className="like-review ml-5"><LikeOutlined /> <b className="mt-3">5</b></p>
                                    <p className="like-review ml-5"><MessageOutlined /> <b className="mt-3">Reply</b></p>

                                </div>

                                <p class="stretched-link">-View more Reply</p>
                              </div>
                          </div>


                        </div>
                    </div> */}
                        {/* <div className="social-link">
                      <LinkedinShareButton url={shareUrl} title={shareTitle}>
                        <Image
                          loader={myImageLoader}
                          src={LinkedInIconBlack}
                          alt=""
                          placeholder="Website"
                          
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
                          
                          height={25}
                          width={25}
                        />
                      </TwitterShareButton>
                    </div> */}
                      </div>
                    </div>
                    {/* <div className="prev-next-footer">
                  <div style={{ textAlign: "left", width: "35%" }}>
                    <p className="admin-text">Previous:</p>
                    <div className="arrow-container">
                      <Image
                        loader={myImageLoader}
                        src={leftArrowIndicator}
                        alt=""
                        
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
                        
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                </div> */}
                  </div>
                </div>

                <div className="col-md-4">
                  <h4
                    className="related-blog mt-4"
                    style={{ paddingBottom: "1rem" }}
                  >
                    Related Blogs
                  </h4>

                  <div className="row">
                    <div className="second-div">
                      {/* {limitedData.map((item, index) => ( */}
                      {limitedData &&
                        limitedData.map((blogs) => (
                          // <Link href={`blogs/${item.slug}`}>
                          <div className="col-md-12 blog-list">
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

                                <p className="blogs-card-body">{blogs.name}</p>
                                <p className="blog-detail">{blogs.details} </p>
                              </div>
                              <div className="date-section">
                                <div className="date">
                                  {moment(blogs.created_at).format("LL")}
                                </div>
                                <div className="custom-divider"></div>
                                {/* {<div className="time">10 min read</div>} */}
                              </div>
                            </div>
                          </div>

                          // </Link>
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
  const { blog, categories, blogs, authentication } = state;
  return {
    blog: blog ? blog[0] : null,
    categories,
    blogs,
    authentication,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
  createCrud: crudActions._create,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Blog));
