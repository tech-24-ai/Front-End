import React, { useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";

import Link from "next/link";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import moment from "moment";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Image } from "antd";
import Slider from "react-slick";
import { wrappReadMinute } from "../../_global";
const LatestBlog = ({ getAllCrud, blogs }) => {
  const [showHoverClass, setShowHoverClass] = useState(null);

  const slider = useRef();

  useEffect(() => {
    getAllCrud("blogs", "blogs", {
      orderBy: "blogs.created_at",
      orderPos: "desc",
      pageSize: 5,
    });
  }, []);

  const splitBlogTags = (data) => {
    let tags = data.split(",");
    return tags;
  };

  return (
    <Container>
      <div className="latest-blog hover">
        <div className="title-section">
          <p className="title">
            Latest <span className="title bg">Blogs</span>
          </p>
          <Link href="blogs">
            <p className="view-more">View more</p>
          </Link>
        </div>
        <div className="blog-section">
          <div
            onClick={() => slider.current?.slickPrev()}
            className="view-more-arrow previous-arrow"
            style={{
              left: "-8px",
              marginTop: "0px",
              top: "45%",
            }}
          >
            <ArrowLeftOutlined
              style={{
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <div
            onClick={() => slider.current?.slickNext()}
            className="view-more-arrow next-arrow"
            style={{
              right: "-14px",
              marginTop: "0px",
              top: "45%",
            }}
          >
            <ArrowRightOutlined
              style={{
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </div>
          <Slider
            ref={slider}
            speed={500}
            slidesToScroll={1}
            slidesToShow={3}
            arrows={false}
            responsive={[
              {
                breakpoint: 1440,
                settings: {
                  slidesToShow: 2,
                  dots: false,
                },
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 1,
                  dots: true,
                  initialSlide: 0,
                },
              },
            ]}
            appendDots={(dots) => (
              <div>
                <ul> {dots} </ul>
              </div>
            )}
          >
            {blogs?.slice(0, 3).map((data, index) => (
              <Link href={`/blogs/${data.slug}`} key={index}>
              <div
                // onClick={() => Router.push(`/blogs/${data.slug}`)}
                onMouseOver={() => setShowHoverClass(index)}
                onMouseOut={() => setShowHoverClass(null)}
                style={{
                  width: "100%"
                }}
                className={`blog-list ${
                  showHoverClass === index ? "showHoverClass" : ""
                }`}
              >
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
                      // width={350}
                      // height={210}
                      src={data.image}
                      preview={false}
                      alt=""
                      placeholder="blog banner"
                      className="latest-blog-list-img"
                    />
                    <p className="category bg">
                    <Link href={`/blogs/category/${data.blog_topic_name.trim()}`}>
                        {data?.blog_topic_name}
                          </Link>
                          </p>
                    <p className="blog-heading">{data.name}</p>
                    <p className="blog-tags-container">
                          {splitBlogTags(data?.details).map((tag) => (
                            <div className="blog-tags">
                              <Link href={`/blogs/tags/${tag.trim().replace("#","")}`}>
                                {tag}
                                </Link>
                            </div>
                          ))}</p>
                  </div>
                  <div className="date-section">
                    <div className="date">
                      {moment(data.created_at).format("LL")}
                    </div>
                    <div className="custom-divider"></div>
                    <div className="time">
                      {wrappReadMinute(data?.read_time)}
                    </div>
                    <div className="custom-divider"></div>
                    <div className="time">
                      <Link
                          href={`/blogs/author/${data?.author
                            .trim()}`}
                        >
                          {data?.author}
                        </Link>
                      </div>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </Slider>
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
