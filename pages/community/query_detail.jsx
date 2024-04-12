import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Input } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Image from "next/image";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { DateIcon, ProfileIcon } from "../../components/icons";
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
import { RightOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { SettingOutlined } from '@ant-design/icons';
import { Collapse, Select } from 'antd';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
    {
        key: '1',
        label: 'This is panel header with arrow icon',
        children: <p>{text}</p>,
    },
    {
        key: '2',
        label: 'This is panel header with no arrow icon',
        children: <p>{text}</p>,
        showArrow: false,
    },
];
import axios from 'axios';
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


    let arrData = []
    communityFeature?.map((item) => {
        const random = Math.random().toString(36).substring(2, 6);
        const data = {
            id: random,
            value: item.name, title: item.name
        }
        arrData.push(data)
    })
   
    const [formData, setFormData, communitypost] = useState({
        // Initialize form data fields
        query: '',
        tag: '',
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response =   await crudService._getAll("communitypost",formData);
            const response = await axios.post('communitypost', formData);
            console.log('Data added successfully:', formData);
            // Optionally, update UI or show success message
        } catch (error) {
            console.error('Error adding data:', error);
            // Optionally, show error message
        }
    };

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const accordionData = [
        {
            title: 'FILTERS',
        },
        {
            title: 'Research Type',
            content: 'o Applied Research',
        },
        {
            title: 'Research Category',
            content: 'o Applied Research',
        },
        {
            title: 'Research Topics',
            content: 'o Applied Research',
        },
        {
            title: 'Research Vendors',
            content: 'o Applied Research',
        },
        {
            title: 'Research Tags',
            content: 'o Applied Research',
        },
    ];

    const accordionItemStyle = {
        borderBottom: '1px solid #ccc',
        marginBottom: '10px',
    };

    const accordionTitleStyle = {
        backgroundColor: '#f4f4f4',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        width: '100%',
        textAlign: 'left',
        outline: 'none',
    };

    const activeAccordionTitleStyle = {
        backgroundColor: '#ddd',
    };

    const accordionContentStyle = {
        padding: '10px',
    };


    return (
        <>
            <section className="community-section mt-4">
                <Container>
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="mt-5 mb-3"><span className="ml-2" style={{color:"grey",}}>Community <RightOutlined /></span> <span style={{ color: "#007aff" }}>All Community</span></h4>
                        </div>
                    </div>
                    <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search anything........"
                        prefix={<SearchOutlined />}
                        style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxSizing: 'border-box',
                        }}
                    />
                     </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="accordion mt-5" style={{width:"380px"}}>
                                {accordionData.map((item, index) => (
                                    <div className="accordion-item" key={index} style={accordionItemStyle}>
                                        <button
                                            className="accordion-title"
                                            style={{ ...accordionTitleStyle, ...(activeIndex === index ? activeAccordionTitleStyle : {}) }}
                                            onClick={() => toggleAccordion(index)}
                                            aria-expanded={activeIndex === index ? 'true' : 'false'}
                                        >
                                            {item.title}
                                            <span style={{float:"right"}}>{activeIndex === index ? '-' : '+'}</span>
                                        </button>
                                        {activeIndex === index && <div className="accordion-content" style={accordionContentStyle}>
                                            {item.content}</div>}
                                    </div>
                                ))}
                                 {/* <ul>
                                 {accordionData.map((item, index) => (
                                      <li key={index}>
                                        <div onClick={() => toggleAccordion(index)} className="accordion-header">
                                          <span>{item.title}</span>
                                          <span>{activeIndex === index ? '-' : '+'}</span>
                                        </div>
                                        {activeIndex === index && <div className="accordion-content">{item.content}</div>}
                                      </li>
                                    ))}
                                  </ul> */}
                            </div>
                        </div>
                        <div className="col-md-9 mt-5">
                            <span style={{ marginLeft: "150px",color:"grey" }}>Result : 6</span>
                            {/* <div className="sort-by " style={{float:"right",marginBottom:"-30px"}}>
                                <label htmlFor="sort-select">Sort By: </label>
                                <select id="sort-select">
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="date-asc">Date (Oldest first)</option>
                                    <option value="date-desc">Date (Newest first)</option>
                                </select>
                                </div> */}
                            <div className="row">
                            {communityFeature?.map((item, index) => (
                                    <div className="col-6 community-category-below mt-5">
                                        <Container style={{ marginLeft: "60px", }}>
                                            <div className="category-box" style={{ width: "300px", }}>
                                                <div className="category-banner-wrapper" id="categoryWrapper">
                                                    {/* {categoryList.map((data, i) => ( */}
                                                    <div
                                                        className="category-banner-block"
                                                    >
                                                        <div className="category-banner">
                                                            <div className="category-content">
                                                                <div className="content-head">
                                                                    <div className="custom-icon white medium">
                                                                       
                                                                    </div>
                                                                    <div className="category-content" style={{ minWidth: "70%" }}>
                                                                        <h6>{item.name}</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    <p class="card-text">{item.description}</p>
                                                                    <div className="content-x">
                                                                        <div className="user-icon">
                                                                            <p><UsergroupAddOutlined style={{ fontSize: "16px" }} /> {" "}Members : {item?.__meta__?.total_members}</p>
                                                                        </div>
                                                                        <div className="query-icon">
                                                                            <p><MessageOutlined style={{ fontSize: "16px" }} /> {" "}Queries : {item?.__meta__?.total_post_reply}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="learn-more-btn">
                                                                    <h6 className="btn-text">
                                                                        Join Community
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    {/* ))} */}
                                                </div>
                                            </div>
                                        </Container>
                                    </div>
                            ))}
                            </div>
                           
                         
                        </div>
                    </div>
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

