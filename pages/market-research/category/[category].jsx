import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { Container, Button, Pagination } from "reactstrap";
import { crudService } from "../../../_services";
import SearchInput from "../../../components/form/searchInput";
import { crudActions } from "../../../_actions";
import { connect } from "react-redux";
import ResearchCard from "../../../components/marketResearch/ResearchCard";
import CustomFilter from "../../../components/filter";
import CustomBreadcrumb from "../../../components/breadcrumbs/Breadcrumb";
import CustomPagination from "../../../components/pagination";
import FilterOptionContainer from "../../../components/marketResearch/FilterOptionContainer";

import { checkDeviceTyepe } from "../../../utils/cookie";

const CategoryResearchList = ({ router }) => {
  // const { q } = Router.query;
  const slugQuery = router.query;
  const [researchData, setResearchData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);

  const [sortBy, setSortBy] = useState("id_desc");
  const itemsPerPage = 10;

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState({});

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



  const handleOptionChange = ({ name, value }) => {
    setFilteredData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleReset = () => {
    sessionStorage.removeItem("research_filter_category_id");
    setFilteredData({});
  };

  const research_filter_category_id = sessionStorage.getItem(
    "research_filter_category_id"
  );

  let filterData = [
    {
      heading: "Research Type",
      name: "document_type",
      multiple: false,
      options: typeOptions,
      value: filteredData["document_type"],
      multiple: true,
    },
    {
      heading: "Research Category",
      multiple: false,
      name: "category",
      options: categoryOptions,
      value: filteredData["category"],
      multiple: true,
    },
    {
      heading: "Research Topics",
      multiple: false,
      name: "topic",
      options: topicOptions,
      value: filteredData["topic"],
      multiple: true,
    },
    {
      heading: "Research Tags",
      multiple: false,
      name: "tags",
      options: tagOptions,
      value: filteredData["tags"],
      multiple: true,
    },
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
      label: "Most Older",
    },
  ];

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
   if(slugQuery && slugQuery.category){
    const sortData = sortBy?.split("_");
    let params = {
      orderBy: sortData[0],
      orderDirection: sortData[1] ?? "desc",
      page: page + 1,
      pageSize: itemsPerPage,
      search: "",
      category_txt: slugQuery.category,
      ...filteredData,
    };

    if (research_filter_category_id) {
      params = {
        category: [Number(research_filter_category_id)],
        ...params,
      };
    }
    crudService._getAll("market_research", params).then((result) => {
      setResearchData(result?.data?.data);
      const totalPage = Math.ceil(result?.data?.total / result?.data?.perPage);
      setPageCount(isNaN(totalPage) ? 0 : totalPage);
    });
   }

  }, [page, searchQuery, filteredData, sortBy]);


  return (
    <section className="research-list-section mt-4">
      <Container>
        <CustomBreadcrumb
          data={[
            { label: "Market Research", url: "/market-research" },
            {
              label: "All Research",
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
              <div className="results">Results<span style={{
              fontSize:14,
              padding: 5
            }}>{`(Filtered with Category : ${slugQuery.category})`}</span>: {researchData?.length}</div>
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
                {researchData?.length > 0 && pageCount > 1 && (
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
  connect(mapStateToProps, actionCreators)(CategoryResearchList)
);
