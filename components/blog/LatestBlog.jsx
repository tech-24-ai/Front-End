import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import moment from "moment";
import { Image } from "antd";
const LatestBlog = ({ getAllCrud, blogs }) => {
  useEffect(() => {
    getAllCrud("blogs", "blogs", {
      pageSize: 3,
    });
  }, []);

  return (
    <Container>
      <div className="latest-blog">
        <div className="title-section">
          <p className="title">
            Latest <span className="title bg">Blogs</span>
          </p>
          <Link href="blogs">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="blog-section">
          {blogs?.slice(0, 3).map((data) => (
            <div className="blog-list">
              <div className="blog-card">
                <Image
                  // width={350}
                  // height={210}
                  src={data.image}
                  preview={false}
                  alt=""
                  placeholder="blog banner"
                />
                <p className="category bg">{data.blog_topic_name}</p>
                <p className="blog-heading">{data.name}</p>
                <p className="blog-detail">{data.details}</p>
                <div className="date-section">
                  <div className="date">
                    {moment(data.created_at).format("LL")}
                  </div>
                  <div className="custom-divider"></div>
                  {/* {<div className="time">10 min read</div>} */}
                </div>
              </div>
            </div>
          ))}
          <Link href="blogs">
            <div className="view-more-icon">
              <ArrowRightOutlined />
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { blogs, authentication } = state;
  return {
    blogs,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(LatestBlog));
