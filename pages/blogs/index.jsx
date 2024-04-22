import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import moment from "moment";
import { Pagination } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};


import React, { Component, useEffect, useState } from "react";
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
      currentPage: 1,
      totalItems: 50, // Total number of items in your list
      pageSize: 10, // Number of items per page
      value: '',
      posts: [],
    };
    this.searchPosts = this.searchPosts.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    
  }
  

  blogsList = (id) => {
    crudService._getAll("blogs", { blog_topic_id: id }).then((result) => {
      this.setState({ posts: result.data });
    });
  };

  componentDidMount() {
    // Initial search on component mount
    this.searchPosts();
  }

  async searchPosts() {
    const { value } = this.state;
    try {
      const data = await crudService._getAll("blogs", { search: value });
      this.setState({ posts: data.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleSearchChange(event) {
    this.setState({ value: event.target.value }, () => {
      // Search after state update (with a delay)
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(this.searchPosts, 300);
    });
  }

  
  

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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  
  render() {
    const { value, posts } = this.state;
    const { isActive, isHover } = this.state;
    const { currentPage, totalItems, pageSize } = this.state;
    return (
      <>
        <section className="blogs-section">
      
        <PageBanner 
            titleNode={
              <div>
                 <h2 style={{color:"white"}}>
                Welcome to the Tech 24 <br />
                Blog
              </h2>

              <p style={{color:"white"}}>
                Get our blogs
              </p>
                {/* <h4>Blogs</h4> */}
                <hr></hr>
                <SearchInput
                  style={{
                    minWidth: "unset",
                    height: "unset",
                    margin: "5px 0px 15px 0px",
                  }}
                  value={value}
                  onChange={this.handleSearchChange}
                  className="testSearchInput"
                  suffix={<SearchOutlined />}
                />
              </div>
            }
            image={blogsBannerImage}
          />
      
          <Container className="blog-container">
            <h4 className="blogTitle" style={{ color: "#005dd4", paddingLeft: "14px", paddingBottom: "20px" }}>Blogs</h4>
            <div className="row">
            <div className="second-div">
              {this.state.posts.length > 0 
                ? this.state.posts
                .slice((currentPage - 1) * pageSize, currentPage * pageSize) // Extract posts for the current page
                .map((post, key) => (
                  <Link href={`blogs/${post.slug}`}>
                    
              <div className="blog-list">
              <div className="blog-card" style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'space-between'}}>
                <div style={{letterSpacing: 'normal' }}>
                <Image className="blogImage" style={{
                transition: 'transform 0.5s ease',
                }}
                  width={350}
                  height={210}
                  src={post.image}
                  preview={false}
                  alt=""
                  placeholder="blog banner"
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)'; // Zoom in on hover
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)'; // Zoom out on mouse out
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
                )) : this.state.posts && this.state.posts.length == 0
                  ? <p style={{ padding: "20px" }}>
                    No Blogs
                  </p>
                  : ""}

            </div>
            </div>
            
          </Container>
            {posts.length > 0 && (
            <Pagination
              defaultCurrent={currentPage}
              onChange={this.handlePageChange}
              pageSize={pageSize}
              total={totalItems}
            />
          )}
        </section>
      </>
    );
  }
}

export default withRouter(Blogs);
