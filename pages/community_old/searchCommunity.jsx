import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import { crudService } from "../../_services";
import Router from "next/router";
import { SearchOutlined } from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { RightOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import moment from 'moment';
import { Input } from 'antd';
import ReactPaginate from "react-paginate-next";
import CommunityCategory from "../../components/community/index";
import CustomPagination from "../../components/pagination";
import { isMobile } from "react-device-detect";
import myImageLoader from "../../components/imageLoader";
import shorting_icon from "../../public/new_images/sorting_icon.svg";
import QuestionTab from "../../components/community/QuestionTab";




const Community = ({ router }) => {

    const [communityFeature, setCommunityFeature] = useState([]);
    const [sortBy, setSortBy] = useState("id_desc");
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);
    const itemsPerPage = 10;

    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(false);

    const { value } = Router.query;
    
    useEffect(() => {
        getAllPosts(searchQuery, currentPage, sortBy);
    }, [searchQuery, currentPage, sortBy]);

    useEffect(() => {
        if (value) {
            setSearchQuery(value);
            setCurrentPage(0);
            getAllPosts(value, 0, sortBy);
        }
    }, [value]);

    const getAllPosts = async (searchText, page, orderBy) => {
        try {
            const data = await crudService._getAll("communitypost", { search: searchText, page: page + 1, pageSize: itemsPerPage, orderBy: orderBy });
            setCommunityFeature(data.data?.data);
            setTotal(data.data?.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    //Filter
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0);
        setIsSearchActive(e.target.value.trim() !== "");
        getAllPosts(e.target.value, 0, sortBy);
    };


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

    const [formData, setFormData] = useState({
        query: "",
        tag: "",
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


    const handleSort = (e) => {
        setSortBy(e.target.value);
        getAllPosts(searchQuery, currentPage, e.target.value);
    };

    const handleAllCommunity = () => {
        Router.push("/community");
    }

    const sortOptions = [
        {
            value: "id_desc",
            label: "Most Recent",
        },
        {
            value: "id_asc",
            label: "Most Older",
        },
    ];

    return (
        <>
            <section className="query-section mt-6 search-community-section">
                <Container>
                    <div className="row" style={{ paddingTop: "38px" }}>
                        <div className="col-md-12">
                            <h4 className="mt-1 mb-3">
                                <span
                                    onClick={() => handleAllCommunity()}
                                    className="ml-2"
                                    style={{
                                        color: "#B0B8BF",
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                    }}
                                >
                                    Community <RightOutlined style={{ verticalAlign: "0" }} />
                                </span>{" "}
                                <span
                                    style={{
                                        color: "#0074D9",
                                        fontFamily: "Inter",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Search Result
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div className="mt-3 search-bar-community">
                        <Input
                            placeholder="Search anything.."
                            prefix={
                                <SearchOutlined
                                    style={{ color: "#0074D9", padding: "0 6px" }}
                                />
                            }
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                background: "#ffffff",
                                boxSizing: "border-box",
                            }}
                        />
                        <div className="sorting-community sorting-display">
                            <label className="sortby" htmlFor="sortDropdown">
                                Community:{" "}
                            </label>
                            <select
                                id="sortDropdown"
                                style={{ border: "none", background: "transparent" }}
                                value={sortBy}
                                onChange={handleSort}
                            >
                                {sortOptions.map(({ value, label }) => (
                                    <option
                                        className="sortby"
                                        style={{ color: "#001622" }}
                                        value={value}
                                    >
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <QuestionTab askQuestion={false} isSearch={false}
                    />
                    {/* {!isSearchActive && !searchQuery && (
                        <div className="mt-5" style={{ width: "100%" }}>
                            {communityFeature?.length > 0 && (
                                <CustomPagination
                                    pageCount={Math.ceil(total / itemsPerPage)}
                                    page={currentPage}
                                    onPageChange={({ selected }) => setCurrentPage(selected)}
                                />
                            )}
                        </div>
                    )} */}
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
