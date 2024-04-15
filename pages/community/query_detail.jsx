import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon, SearchIcon } from "../../components/icons";
import { Icon } from "react-icons-kit";
import Router from "next/router";
import community from ".";
import PageBanner from "../../components/card/pageBanner";
import blogsBannerImage from "../../public/new_images/blogs-bg.svg";
import blogsProfile from "../../public/new_images/blog-profile.svg";
import rightArrow from "../../public/new_images/right-arrow.svg";
import myImageLoader from "../../components/imageLoader";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { RightOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import moment from 'moment';
import { Input } from 'antd';
import ReactPaginate from "react-paginate-next";


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
    {
        key: "1",
        label: "This is panel header with arrow icon",
        children: <p>{text}</p>,
    },
    {
        key: "2",
        label: "This is panel header with no arrow icon",
        children: <p>{text}</p>,
        showArrow: false,
    },
];
import axios from "axios";
const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
};

const Community = ({ router }) => {
    const [posts, setPosts] = useState([]);
    const [fnColor, setFnColor] = useState("");
    const [isActive, setIsActive] = useState("All");
    const [isHover, setIsHover] = useState("All");
    const [communityFeature, setCommunityFeature] = useState([]);
    const [sortBy, setSortBy] = useState("recent");
    const [currentPage, setCurrentPage] = useState(0); 
    const [totalPages, setTotalPages] = useState(0); 

    useEffect(() => {
        // Fetch data or perform any side effect here
        // Example: fetchPosts();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const data = await crudService._getAll("community");
                console.log("data", data);
                setCommunityFeature(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getAllPosts();
    }, []);
    //pagination

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await crudService._getAll("community");
                setCommunityFeature(data.data);
                setTotalPages(Math.ceil(data.data.length / postsPerPage));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const postsPerPage = 10;
    const pageCount = Math.ceil(communityFeature.length / postsPerPage);
    const offset = currentPage * postsPerPage;
    const currentPageData = communityFeature.slice(offset, offset + postsPerPage);



    //
    let arrData = [];
    communityFeature?.map((item) => {
        const random = Math.random().toString(36).substring(2, 6);
        const data = {
            id: random,
            value: item.name,
            title: item.name,
        };
        arrData.push(data);
    });

    const [formData, setFormData, communitypost] = useState({
        // Initialize form data fields
        query: "",
        tag: "",
        // Add more fields as needed
    });
    const parseDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [month, day, year] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');
        const parsedDate = new Date(year, month - 1, day, hours, minutes);
        return parsedDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response =   await crudService._getAll("communitypost",formData);
            const response = await axios.post("communitypost", formData);
            console.log("Data added successfully:", formData);
            // Optionally, update UI or show success message
        } catch (error) {
            console.error("Error adding data:", error);
            // Optionally, show error message
        }
    };

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const communityDetails = (data) => {
        sessionStorage.setItem("community_id", data?.url_slug);
        Router.push("community_detail");
    };

    const joinCommunity = (community_id) => {
        crudService._create("community/join", { community_id })
            .then(() => window.location.reload());
    };
    const accordionData = [
        {
            title: "FILTERS",
        },
        {
            title: "Research Type",
            content: "o Applied Research",
        },
        {
            title: "Research Category",
            content: "o Applied Research",
        },
        {
            title: "Research Topics",
            content: "o Applied Research",
        },
        {
            title: "Research Vendors",
            content: "o Applied Research",
        },
        {
            title: "Research Tags",
            content: "o Applied Research",
        },
    ];

    const accordionItemStyle = {
        borderBottom: "1px solid #ccc",
        marginBottom: "10px",
    };

    const accordionTitleStyle = {
        backgroundColor: "#f2f4f7",
        border: "none",
        cursor: "pointer",
        padding: "10px",
        width: "100%",
        textAlign: "left",
        outline: "none",
    };

    const activeAccordionTitleStyle = {
        backgroundColor: "#f2f4f7",
    };

    const accordionContentStyle = {
        padding: "10px",
    };
    const handleSort = (e) => {
        setSortBy(e.target.value);
    };
    return (
        <>
            <section className="query-section mt-4">
                <Container>
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="mt-5 mb-3">
                                <span className="ml-2" style={{ color: "#B0B8BF", fontFamily: "Inter", fontSize: "14px" }}>
                                    Community <RightOutlined style={{ verticalAlign: "0" }} />
                                </span>{" "}
                                <span style={{ color: "#0074D9", fontFamily: "Inter", fontSize: "14px" }}>All Community</span>
                            </h4>
                        </div>
                    </div>
                    <div className="search-box">
                        <Input
                            placeholder="Search anything.."
                            prefix={<SearchOutlined style={{ color: "#0074D9", padding: "0 6px" }} />}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                background: "#ffffff",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                        className="mt-5"
                    >
                        <div className="mobile-display-n" style={{ width: "272px" }}>
                            <div className="accordion-container">
                            {accordionData.map((item, index) => (
                                <div
                                    className="accordion-item"
                                    key={index}
                                    style={accordionItemStyle}
                                >
                                    <button
                                        className="accordion-title"
                                        style={{
                                            ...accordionTitleStyle,
                                            ...(item.title === "FILTERS" ? { background: "#f2f4f7", color: "#001622", fontFamily: "Inter", fontSize: "16px", fontWeight: "600"} : {}),
                                            ...(activeIndex === index
                                                ? activeAccordionTitleStyle
                                                : {}),
                                        }}
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeIndex === index ? "true" : "false"}
                                    >
                                        {item.title}
                                        {item.title !== "FILTERS" && (
                                            <span style={{ float: "right", color: "#0074D9"}}>
                                                {activeIndex === index ? "-" : "+"}
                                            </span>
                                        )}
                                    </button>
                                    {activeIndex === index && (
                                        <div
                                            className="accordion-content"
                                            style={accordionContentStyle}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className="content-wrap" 
                        // style={{
                        //     width: "75%",
                        //     display: "flex",
                        //     flexDirection: "column",
                        //     marginLeft: "2rem",
                        // }}
                        >
                            <div className="result-sort">
                                <div className="results">Results: {communityFeature.length}</div>
                                <div className="sorting mobile-display-n">
                                    <label className="sortby" htmlFor="sortDropdown">Sort By: </label>
                                    <select id="sortDropdown" style={{border: "none", background: "transparent"}} value={sortBy} onChange={handleSort}>
                                        <option className="sortby" style={{ color: "#001622"}} value="recent">Most Recent</option>
                                    </select>
                                </div>
                            </div>
                            <div
                                className="mt-5 content-card-display content-card-mobile"
                                // style={{
                                //     width: "100%",
                                //     display: "flex",
                                //     flexWrap: "wrap",
                                // }}
                            >
                                {communityFeature?.map((item, index) => (
                                    <div
                                        className="col-6 community-category-below community-category-mobile"
                                        style={{ marginTop: "-1rem" }}
                                    >
                                        <div
                                            className="category-box"
                                            style={{ minWidth: "100%" }}
                                        >
                                            <div
                                                className="category-banner-wrapper"
                                                id="categoryWrapper"
                                            >
                                                <div className="category-banner-block">
                                                    <div
                                                        className="category-banner"
                                                        style={{ maxWidth: "100%" }}
                                                    >
                                                        <div className="category-content">
                                                            <div className="content-head" onClick={() => communityDetails(item)}>
                                                                <div className="custom-icon white medium">
                                                                    <img src={item.image_url} />
                                                                </div>
                                                                <div
                                                                    className="category-content"
                                                                    style={{ minWidth: "70%" }}
                                                                >
                                                                    <h6>{item.name}</h6>
                                                                </div>
                                                            </div>
                                                            <div className="card-body" onClick={() => communityDetails(item)}>
                                                                <p class="card-description">{item.description}</p>
                                                                <div className="content-x">
                                                                    <div className="user-icon">
                                                                        <p>
                                                                            <UsergroupAddOutlined
                                                                                style={{ fontSize: "16px" }}
                                                                            />{" "}
                                                                            Members : {item?.__meta__?.total_members}
                                                                        </p>
                                                                    </div>
                                                                    <div className="query-icon">
                                                                        <p>
                                                                            <MessageOutlined
                                                                                style={{ fontSize: "16px" }}
                                                                            />{" "}
                                                                            Queries : {item?.__meta__?.total_post_reply}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="learn-more-btn">
                                                                {item.communityMember.length === 0 ? (
                                                                    <Button className="btn-text"
                                                                        onClick={() => joinCommunity(item.id)}
                                                                    >
                                                                        Join Community
                                                                    </Button>
                                                                ) : (
                                                                    <p style={{ textAlign: "left", width: "100%", paddingLeft: "5px" }}>
                                                                        Member since {item.communityMember[0]?.created_at ? parseDate(item.communityMember[0].created_at) : 'N/A'}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ReactPaginate
                        pageCount={totalPages}
                        onPageChange={handlePageChange}
                        initialPage={currentPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </Container>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    const { community } = state;
    return {
        community,
    };
};

const actionCreators = {
    getCrud: crudActions._getAll,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Community));
