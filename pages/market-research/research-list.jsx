import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Router from "next/router";

import { SearchOutlined } from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { RightOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { MessageOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ReactPaginate from "react-paginate-next";
import ResearchCard from "../../components/marketResearch/ResearchCard";

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
const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

const ResearchList = ({ router }) => {
  const [researchData, setResearchData] = useState([]);

  const [sortBy, setSortBy] = useState("recent");
  const itemsPerPage = 6;

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { value } = Router.query;

  useEffect(() => {
    crudService
      ._getAll("market_research", {
        orderBy: "id",
        orderDirection: "desc",
        page: page + 1,
        pageSize: itemsPerPage,
        search: searchQuery,
      })
      .then((result) => {
        console.log("result", result);
        setResearchData(result?.data?.data);
        const totalPage = Math.ceil(result?.data.total / result?.data.perPage);
        setPageCount(isNaN(totalPage) ? 0 : totalPage);
      });
  }, [page, searchQuery]);

  //Filter
  const handleSearch = (searchValue) => {
    if (searchValue == null) {
      return false;
    }
    const timerId = setTimeout(() => {
      setSearchQuery(searchValue);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  };

  const [formData, setFormData] = useState({
    query: "",
    tag: "",
  });
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [month, day, year] = datePart.split("-");
    const [hours, minutes] = timePart.split(":");
    const parsedDate = new Date(year, month - 1, day, hours, minutes);
    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "FILTERS",
    },
    {
      title: "Research Type",
      content: "O  Applied Research",
    },
    {
      title: "Research Category",
      content: "O  Applied Research",
    },
    {
      title: "Research Topics",
      content: "O  Applied Research",
    },
    {
      title: "Research Vendors",
      content: "O  Applied Research",
    },
    {
      title: "Research Tags",
      content: "O  Applied Research",
    },
  ];

  const accordionItemStyle = {
    borderBottom: "1px solid #ccc",
    // marginBottom: "10px",
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
  const goToHomePage = () => {
    Router.push("/market-research");
  };

  return (
    <>
      <section className="query-section research-list-section mt-6">
        <Container>
          <div className="row">
            <div className="col-md-12">
              <h4 className="mt-5 mb-3">
                <span
                  className="ml-2"
                  style={{
                    color: "#B0B8BF",
                    fontFamily: "Inter",
                    fontSize: "14px",
                  }}
                >
                  Market Research{" "}
                  <RightOutlined style={{ verticalAlign: "0" }} />
                </span>{" "}
                <span
                  onClick={() => goToHomePage()}
                  style={{
                    color: "#0074D9",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Recently Added
                </span>
              </h4>
            </div>
          </div>
          <div className="search-box">
            <SearchInput
              placeholder="Search anything..."
              className="SearchInput"
              onChange={(value) => handleSearch(value)}
              prefix={<SearchOutlined />}
              allowClear={true}
            />
          </div>

          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="mt-5"
          >
            <div className="mobile-display-n" style={{ width: "24%" }}>
              <div className="accordion-container">
                {accordionData.map((item, index) => (
                  <div
                    className="accordion-item"
                    key={index}
                    style={{
                      accordionItemStyle,
                      ...(item.title === "FILTERS"
                        ? { background: "#f2f4f7" }
                        : { borderBottom: "1px solid #ccc" }),
                      ...(item.title === "Research Tags"
                        ? { borderBottom: "none" }
                        : { borderBottom: "1px solid #ccc" }),
                    }}
                  >
                    <button
                      className="accordion-title"
                      style={{
                        ...accordionTitleStyle,
                        ...(item.title === "FILTERS"
                          ? {
                              background: "#f2f4f7",
                              color: "#001622",
                              fontFamily: "Inter",
                              fontSize: "16px",
                              fontWeight: "600",
                            }
                          : { background: "#fafafc" }),
                        ...(activeIndex === index
                          ? activeAccordionTitleStyle
                          : {}),
                      }}
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={activeIndex === index ? "true" : "false"}
                    >
                      {item.title}
                      {item.title !== "FILTERS" && (
                        <span style={{ float: "right", color: "#0074D9" }}>
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
            <div className="content-wrap">
              <div className="result-sort">
                <div className="results">Results: {researchData?.length}</div>
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
                    <option
                      className="sortby"
                      style={{ color: "#001622" }}
                      value="recent"
                    >
                      Most Recent
                    </option>
                  </select>
                </div>
              </div>
              <div className="mt-3 content-card-display content-card-mobile latest-research ">
                <div className="research-section">
                  {researchData?.map((item, index) => (
                    <ResearchCard data={item} key={index} />
                  ))}
                </div>
                <div className="mt-5" style={{ width: "100%" }}>
                  {researchData?.length > 0 && (
                    <ReactPaginate
                      pageCount={pageCount}
                      initialPage={page}
                      forcePage={page}
                      onPageChange={({ selected }) => setPage(selected)}
                      previousLabel={
                        <span
                          style={{
                            color: "#000",
                            fontSize: "20px",
                            fontWeight: 500,
                          }}
                        >
                          {"<"}
                        </span>
                      }
                      nextLabel={
                        <span
                          style={{
                            color: "#000",
                            fontSize: "20px",
                            fontWeight: 500,
                          }}
                        >
                          {">"}
                        </span>
                      }
                      activeClassName={"selected-page"}
                      pageClassName={"other-page"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
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
  connect(mapStateToProps, actionCreators)(ResearchList)
);
