import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import moment from "moment";
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
                <hr></hr>
                <SearchInput
                  style={{
                    minWidth: "unset",
                    height: "unset",
                    margin: "5px 0px 15px 0px",
                  }}
                  className="testSearchInput"
                  suffix={<SearchOutlined />}
                />
              </div>
            }
            image={blogsBannerImage}
          />
          <Container className="blog-container">
            <h4 style={{ color: "#005dd4", paddingLeft: "14px", paddingBottom: "20px" }}>Blogs</h4>
            <div className="row">
            <div className="second-div">
              {this.state.posts.length > 0
                ? this.state.posts.map((post, key) => (
                  <div className="blog-list">
                    <div className="blog-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                      <div>
                        <Image
                          width={350}
                          height={210}
                          src={post.image}
                          preview={false}
                          alt=""
                          placeholder="blog banner"
                        />
                        <p className="category bg">{post.blog_topic_name}</p>
                        <p className="blog-heading">{post.name}</p>
                        <p className="blog-detail" >{post.details}</p>
                      </div>
                      <div className="date-section">
                        <div className="date">
                          {moment(post.created_at).format("LL")}
                        </div>
                        <div className="custom-divider"></div>
                        {/* {<div className="time">10 min read</div>} */}
                      </div>
                    </div>
                  </div>
                )) : this.state.posts && this.state.posts.length == 0
                  ? <p style={{ padding: "20px" }}>
                    No Blogs
                  </p>
                  : ""}


            </div>
            </div>
            {/* <div className="second-div">
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
                          
                          width={380}
                          height={283}
                          style={{
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "10px",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                          }}
                        />
                      }
                    >
                      <p className="card-heading">{post.blog_topic_name}</p>
                      <p className="blogs-card-body">{post.name}</p>
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
                    </Card>
                  </Link>
                ))
                : this.state.posts && this.state.posts.length == 0
                  ? <p style={{ padding: "20px" }}>
                    No Blogs
                  </p>
                  : ""}
            </div> */}
            
          </Container>
        </section>
      </>
    );
  }
}

export default withRouter(Blogs);
