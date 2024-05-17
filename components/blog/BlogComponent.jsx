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
import { isMobile, isBrowser } from "react-device-detect";

const BlogComponent = ({ getAllCrud, blogs }) => {
    const [showHoverClass, setShowHoverClass] = useState(null);

    const slider = useRef();

    useEffect(() => {
        getAllCrud("blogs", "blogs", {
            orderBy: "blogs.created_at",
            orderPos: "desc",
            pageSize: 9,
        });
    }, []);

    return (
        <Container>
            <div className="latest-blog hover">
                <div className="blog-section" style={{ display: "flex", flexWrap: "wrap" }}>
                    {blogs?.slice(0, 9).map((data, index) => (
                        <div
                            onClick={() => Router.push(`/blogs/${data.slug}`)}
                            onMouseOver={() => setShowHoverClass(index)}
                            onMouseOut={() => setShowHoverClass(null)}
                            className={`blog-list ${showHoverClass === index ? "showHoverClass" : ""
                                }`}
                            style={{ width: "100%" }}
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
                                        src={data.image}
                                        preview={false}
                                        alt=""
                                        placeholder="blog banner"
                                        className="latest-blog-list-img"
                                    />
                                    <p className="category"
                                        // style={{
                                        //     background: "rgba(0, 116, 217, .2)",
                                        //     color: "#0074d9"
                                        // }}
                                        >
                                            {data.blog_topic_name}</p>
                                    <p className="blog-heading">{data.name}</p>
                                    <p className="blog-detail">{data.details}</p>
                                </div>
                                <div className="date-section">
                                    <div className="date">
                                        {moment(data.created_at).format("LL")}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
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

export default withRouter(connect(mapStateToProps, actionCreators)(BlogComponent));
