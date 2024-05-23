import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import { crudService } from "../_services";
import SearchInput from "../components/form/searchInput";
import Router from "next/router";

import { SearchOutlined } from "@ant-design/icons";
import { crudActions } from "../_actions";
import { connect } from "react-redux";
import ResearchCard from "../components/marketResearch/ResearchCard";
import CustomFilter from "../components/filter";
import CustomBreadcrumb from "../components/breadcrumbs/Breadcrumb";
import CustomPagination from "../components/pagination";
import FilterOptionContainer from "../components/marketResearch/FilterOptionContainer";
//import { isMobile } from "react-device-detect";
import { checkDeviceTyepe } from "../utils/cookie";
import BlogComponent from "../components/blog/BlogComponent";
import LatestBlog from "../components/blog/LatestBlog";
import CommunityCard from "../components/community/CommunityCard";
import BlogCard from "../components/blog/BlogCard";
import NotFound from "../components/notFound";

const SearchList = ({ router }) => {
    const { q } = Router.query;
    const [researchData, setResearchData] = useState([]);
    const [communityData, setCommunityData] = useState([]);
    const [blogsData, setBlogsData] = useState([]);
    const [total, setTotal] = useState(0);


    const [sortBy, setSortBy] = useState("id_desc");
    const itemsPerPage = 10;

    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [searchQuery, setSearchQuery] = useState(q);
    // const [filteredData, setFilteredData] = useState({});
    const [filteredData, setFilteredData] = useState({ category_type: "market_research" });

    const [screenSize, getDimension] = useState({
        dynamicWidth: window.innerWidth,
        dynamicHeight: window.innerHeight,
    });

    const setDimension = () => {
        getDimension({
            dynamicWidth: window.innerWidth,
            dynamicHeight: window.innerHeight,
        });
    };

    const { isMobile, isTablet, isBrowser } = checkDeviceTyepe(
        screenSize.dynamicWidth
    );

    useEffect(() => {
        window.addEventListener("resize", setDimension);
        return () => {
            window.removeEventListener("resize", setDimension);
        };
    }, [screenSize]);


    const categoryTypeOptions = [
        {
            value: "market_research",
            label: "Market Research",
        },
        {
            value: "community",
            label: "Discussion Groups",
        },
        {
            value: "blogs",
            label: "Blogs",
        },
    ];


    const handleOptionChange = ({ name, value }) => {
        setFilteredData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleReset = () => {
        sessionStorage.removeItem("research_filter_category_id");
        setSearchQuery("");
        setFilteredData({ category_type: "market_research" });
        setResearchData([]);
        setCommunityData([]);
        setBlogsData([]);
        setPage(0);
    };

    const research_filter_category_id = sessionStorage.getItem(
        "research_filter_category_id"
    );

    let filterData = [
        {
            heading: "Category Type",
            name: "category_type",
            multiple: false,
            options: categoryTypeOptions,
            value: filteredData["category_type"],
        }

    ];

    useEffect(() => {
        if (research_filter_category_id) {
            setFilteredData((prevState) => ({
                ...prevState,
                category: [Number(research_filter_category_id)],
            }));
        }
    }, [research_filter_category_id]);

    const sortOptions = [
        {
            value: "id_desc",
            label: "Most Recent",
        },
        {
            value: "id_asc",
            label: "Oldest",
        },
    ];

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const fetchData = (categoryType) => {
        const sortData = sortBy?.split("_");
        let params = {
            orderBy: 'created_at',
            orderDirection: sortData[1] ?? "desc",
            page: page + 1,
            pageSize: itemsPerPage,
            search: searchQuery,
            ...filteredData,
        };

        if (categoryType === "market_research") {
            crudService._getAll("market_research", params).then((result) => {
                setResearchData(result?.data?.data);
                setCommunityData([]);
                setBlogsData([]);
                setTotal(result?.data?.total);
                const totalPage = Math.ceil(result?.data?.total / result?.data?.perPage);
                setPageCount(isNaN(totalPage) ? 0 : totalPage);
            });
        } else if (categoryType === "community") {
            crudService._getAll("community", params).then((result) => {
                setCommunityData(result?.data?.data);
                setBlogsData([]);
                setResearchData([]);
                setTotal(result?.data?.total);
                const totalPage = Math.ceil(result?.data?.total / result?.data?.perPage);
                setPageCount(isNaN(totalPage) ? 0 : totalPage);
            });
        } else if (categoryType === "blogs") {
            let params = {
                orderBy: 'blogs.created_at',
                orderPos: sortData[1] ?? "desc",
                page: page + 1,
                pageSize: itemsPerPage,
                search: searchQuery,
                ...filteredData,
            };

            crudService._getAll("blogs", params).then((result) => {
                setBlogsData(result?.data?.data);
                setCommunityData([]);
                setResearchData([]);
                setTotal(result?.data?.total);
                const totalPage = Math.ceil(result?.data?.total / result?.data?.perPage);
                setPageCount(isNaN(totalPage) ? 0 : totalPage);
            });
        }
    };

    useEffect(() => {
        if (!searchQuery && q) {
            const url = new URL(window.location.href);
            url.searchParams.delete("q");
            window.history.replaceState({}, "", url.toString());
        }

        fetchData(filteredData["category_type"]);
    }, [page, searchQuery, filteredData, sortBy, filteredData["category_type"]]);


    return (
        <section className="search-list-section mt-4">
            <Container>
                <CustomBreadcrumb
                    data={[
                        { label: "Home", url: "/" },
                        {
                            label: "All Search",
                            url: "",
                        },
                    ]}
                />
                <br />
                <div className="search-box">
                    <SearchInput
                        placeholder="Search anything"
                        onSearch={(value) => setSearchQuery(value)}
                        defaultValue={searchQuery}
                        maxLength={60}
                    />
                </div>

                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className="mt-5"
                >
                    <div
                        className="mobile-display-n"
                        style={{ width: "25%", marginRight: 20 }}
                    >
                        <CustomFilter
                            data={filterData}
                            handleOptionChange={handleOptionChange}
                            handleReset={handleReset}
                        />
                    </div>
                    <div className="content-wrap">
                        <div className="result-sort">
                            <div className="results">Results: {total}</div>
                            <div className="sorting mobile-display-n">
                                <label className="sortby" htmlFor="sortDropdown">
                                    Sort By:{" "}
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
                        <div className="mt-3 content-card-display content-card-mobile latest-research">

                            {blogsData?.length > 0 || communityData?.length > 0 || researchData?.length > 0 ? (
                                <div className="research-section">
                                    {(filteredData["category_type"] === "market_research" && researchData) &&
                                        researchData.map((item, index) => (
                                            <ResearchCard
                                                data={item}
                                                key={index}
                                                redirectUrl={`/market-research/${item.seo_url_slug}`}
                                            />
                                        ))}
                                    {(filteredData["category_type"] === "community" && communityData) &&
                                        communityData.map((item, index) => (
                                            <CommunityCard
                                                data={item}
                                                key={index}
                                                redirectUrl={`/community/${item.url_slug}`}
                                            />
                                        ))}
                                    {(filteredData["category_type"] === "blogs" && blogsData && blogsData?.length > 0) &&
                                        blogsData.map((item, index) => (
                                            <BlogCard
                                                data={item}
                                                key={index}
                                                redirectUrl={`/blogs/${item.slug}`}
                                            />
                                        ))}
                                </div>
                            ) :
                                (<NotFound />)}
                            <div className="mt-5" style={{ width: "100%" }}>
                                {researchData?.length > 0 || blogsData?.length > 0 && pageCount > 1 && (
                                    <CustomPagination
                                        pageCount={pageCount}
                                        page={page}
                                        onPageChange={({ selected }) => setPage(selected)}
                                    />
                                )}
                                {(filteredData.category_type === "community" && communityData.length > 0 && pageCount > 1) && (
                                    <CustomPagination
                                        pageCount={pageCount}
                                        page={page}
                                        onPageChange={({ selected }) => setPage(selected)}
                                    />
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {(isMobile || isTablet) && (
                <FilterOptionContainer
                    sortData={{
                        options: sortOptions,
                        value: sortBy,
                        setState: setSortBy,
                    }}
                    filterData={{
                        options: filterData,
                        value: filteredData,
                        setState: setFilteredData,
                        handleReset: handleReset,
                    }}
                />
            )}
        </section>
    );
};

const mapStateToProps = (state) => {
    const { market_research } = state;
    return {
        market_research,
    };
};

const actionCreators = {
    getAllCrud: crudActions._getAll,
};

export default withRouter(
    connect(mapStateToProps, actionCreators)(SearchList)
);
