import React, { useState } from "react";
import { Image } from "antd";
import moment from "moment";
import Router from "next/router";
import { wrappReadMinute } from "../../_global";
import Link from "next/link";

const BlogCard = ({ key, data, redirectUrl = null }) => {
    const [showHoverClass, setShowHoverClass] = useState(null);

    const handleRedirect = () => {
        if (redirectUrl) {
            Router.push(redirectUrl);
        }
    };
    const splitBlogTags = (data) => {
        let tags = data.split(",");
        return tags;
    };
    return (
      <Link href={`blogs/${data.slug}`}>
        <div
          onMouseOver={() => setShowHoverClass(key)}
          onMouseOut={() => setShowHoverClass(null)}
          className={`research-list ${
            showHoverClass === key ? "showHoverClass" : ""
          } ${redirectUrl ? "hover" : ""}`}
          // onClick={() => handleRedirect()}
          style={{ height: "495px" }}
        >
          <div className="research-card" style={{ border: "none" }}>
            <div className="image-section">
              <Image
                // width={350}
                height={210}
                src={data.image}
                preview={false}
                alt=""
                placeholder="blog banner"
              />
              {/* <div className="research-category">{data.category.name}</div> */}
            </div>
            <div
              style={{ padding: "0px", minHeight: "225px" }}
              className="content-sections"
            >
              <Link href={`/blogs/category/${data.blog_topic_name.trim()}`}>
                <p
                  class="category bg hover "
                  style={{
                    background: "#cce3f7",
                    border: "1px solid #0074d9",
                    color: "#0074d9",
                  }}
                >
                  {data?.blog_topic_name}
                </p>
              </Link>

              <p className="research-heading">{data.name}</p>
              <p className="blog-tags-container">
                {splitBlogTags(data.details).map((tag) => (
                  <Link href={`/blogs/tags/${tag.trim().replace("#", "")}`}>
                    <div className="blog-tags hover" style={{
                        color: "#0074d9",
                    }}>{tag}</div>
                  </Link>
                ))}
              </p>
            </div>
            <div className="date-section" style={{ display: "block" }}>
              <Link href={`/blogs/author/${data?.author.trim()}`}>
                <div
                  className="time hover"
                  style={{
                    fontWeight: 400,
                    fontSize: "17px",
                    color: "#0074d9",
                  }}
                >
                  {data?.author}
                </div>
              </Link>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <div className="date">
                  {moment(data.created_at).format("LL")}
                </div>
                <div className="custom-divider"></div>
                <div className="time">{wrappReadMinute(data?.read_time)}</div>
                {/* <div className="custom-divider"></div> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
};

export default BlogCard;
