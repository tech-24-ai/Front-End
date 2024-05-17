import React, { useState } from "react";
import { Image } from "antd";
import moment from "moment";
import Router from "next/router";

const BlogCard = ({ key, data, redirectUrl = null }) => {
    const [showHoverClass, setShowHoverClass] = useState(null);

    const handleRedirect = () => {
        if (redirectUrl) {
            Router.push(redirectUrl);
        }
    };

    return (
        <div
            onMouseOver={() => setShowHoverClass(key)}
            onMouseOut={() => setShowHoverClass(null)}
            className={`research-list ${showHoverClass === key ? "showHoverClass" : ""
                } ${redirectUrl ? "hover" : ""}`}
            onClick={() => handleRedirect()}
            style={{ height: "462px" }}
        >
            <div className="research-card" style={{border: "none"}}>
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
                <div style={{ padding: "0px" }} className="content-sections">
                    <p class="category bg " style={{
                        background: "#cce3f7",
                        border: "1px solid #0074d9",
                        color: "#0074d9"
                    }} >{data.blog_topic_name}</p>
                    <p className="research-heading">{data.name}</p>
                    <p className="research-detail">{data.details}</p>
                    <div className="date-section">
                        <div className="date">{moment(data.created_at).format("LL")}</div>
                        {/* <div className="custom-divider"></div> */}
                        {/* {<div className="time">10 min read</div>} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
