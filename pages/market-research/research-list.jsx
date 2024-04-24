import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import { crudService } from "../../_services";
import SearchInput from "../../components/form/searchInput";
import Router from "next/router";

import { SearchOutlined } from "@ant-design/icons";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate-next";
import ResearchCard from "../../components/marketResearch/ResearchCard";
import CustomFilter from "../../components/filter";
import CustomBreadcrumb from "../../components/breadcrumbs/Breadcrumb";

const ResearchList = ({ router }) => {
  const [researchData, setResearchData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const [sortBy, setSortBy] = useState("id");
  const itemsPerPage = 6;

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});

  const { value } = Router.query;

  useEffect(() => {
    crudService
      ._getAll("market_research", {
        orderBy: sortBy,
        orderDirection: "desc",
        page: page + 1,
        pageSize: itemsPerPage,
        search: searchQuery,
        ...filteredData,
      })
      .then((result) => {
        console.log("result", result);
        setResearchData(result?.data?.data);
        const totalPage = Math.ceil(result?.data.total / result?.data.perPage);
        setPageCount(isNaN(totalPage) ? 0 : totalPage);
      });
  }, [page, searchQuery, filteredData, sortBy]);

  // filter options
  useEffect(() => {
    // category filter
    crudService._getAll("research_categories", {}).then(({ data }) => {
      if (data) {
        const options = data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setCategoryOptions(options);
      }
    });

    // topic filter
    crudService._getAll("research_topics", {}).then(({ data }) => {
      if (data) {
        const options = data.map((option) => ({
          value: option.id,
          label: option.title,
        }));
        setTopicOptions(options);
      }
    });
    // tags filter
    crudService._getAll("research_tags", {}).then(({ data }) => {
      if (data) {
        const options = data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setTagOptions(options);
      }
    });
    // type filter
    crudService._getAll("research_document_types", {}).then(({ data }) => {
      if (data) {
        const options = data.map((option) => ({
          value: option.id,
          label: option.name,
        }));
        setTypeOptions(options);
      }
    });
  }, []);

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

  const handleOptionChange = ({ name, value }) => {
    setFilteredData((prevState) => ({ ...prevState, [name]: value }));
  };

  const filterData = [
    {
      heading: "Research Type",
      name: "document_type",
      multiple: false,
      options: typeOptions,
    },
    {
      heading: "Research Category",
      multiple: false,
      name: "category",
      options: categoryOptions,
    },
    {
      heading: "Research Topics",
      multiple: false,
      name: "topic",
      options: topicOptions,
    },
    {
      heading: "Research Tags",
      multiple: false,
      name: "tags",
      options: tagOptions,
    },
  ];

  const sortOptions = [
    {
      value: "id",
      label: "Most Recent",
    },
    {
      value: "view_counts",
      label: "Most Viewed",
    },
  ];

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <section className="query-section research-list-section mt-6">
      <Container>
        <CustomBreadcrumb
          data={[
            { label: "Market Research", url: "/market-research" },
            {
              label: "Recently Added",
              url: "",
            },
          ]}
        />
        <br />
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
          <div className="mobile-display-n" style={{ width: "25%" }}>
            <CustomFilter
              data={filterData}
              handleOptionChange={handleOptionChange}
            />
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
            <div className="mt-3 content-card-display content-card-mobile latest-research ">
              <div className="research-section">
                {researchData?.map((item, index) => (
                  <ResearchCard
                    data={item}
                    key={index}
                    redirectUrl={`/market-research/${item.seo_url_slug}`}
                  />
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
