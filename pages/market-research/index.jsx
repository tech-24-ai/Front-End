import React, { useState, useEffect } from "react";
import PageBanner from "../../components/card/pageBanner";
import { Container, Col, Row } from "reactstrap";
import { SearchOutlined } from "@ant-design/icons";
import CategoryCard from "../../components/marketResearch/CategoryCard";
import { crudActions } from "../../_actions";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import LatestResearch from "../../components/marketResearch/LatestResearch";
import SearchInput from "../../components/form/searchInput";
function MarketResearch({
  market_research,
  getAllCrud,
  categories,
  all_research,
  router,
}) {
  const marketBannerImage = "../../images/market-research.jpg";
  useEffect(() => {
    getAllCrud("market_research", "market_research", {
      orderBy: "created_at",
      orderDirection: "desc",
      pageSize: 5,
    });
    getAllCrud("all_research", "market_research",{});
    getAllCrud("categories", "research_categories", {
      orderBy: "total_research",
    });
  }, []);

  // search
  const handleSearch = (searchText) => {
    const slicedSearchText = searchText.slice(0, 60); // Limit search text to 0 to 60 characters
    router.push(`${router.asPath}/research-list?q=${slicedSearchText}`);
  };

  const handleRedirect = (category_id) => {
    sessionStorage.setItem("research_filter_category_id", category_id);
    Router.push("/market-research/research-list");
  };

  useEffect(() => {
    sessionStorage.removeItem("research_filter_category_id");
  }, []);

  return (
    <section className="market-research-portal-section">
      <PageBanner
        titleNode={
          <div>
            <h4>Market Research</h4>
            <p className="sub-title subSecondTitle">
              Gain insights on technology, simplify IT planning and operations.
              <br />
              <br />
             Try it now. It's free!
            </p>
            <div className="mt-4" style={styles.inputGroup}>
              <div className="search-box">
                <SearchInput
                  className="bg marketReseachInput"
                  placeholder="Search anything"
                  onSearch={(value) => handleSearch(value)}
                  maxLength={60}
                  
                />
              </div>
            </div>
          </div>
        }
        backgroundImage={marketBannerImage}
        backgroundStyle={{ height: "386px" }}
      />

      <LatestResearch
        titleBorder={true}
        title='Recently <span class="title bg">Added</span>'
        data={market_research}
        viewMore={false}
      />

      <Container>
        <div className="latest-research">
          <div className="title-section">
            <p className="title">
              <span className="side-border-title"></span>
              Popular <span class="title bg">Categories</span>
            </p>
          </div>
          <div className="custom-grid-container">
            {categories?.map((data) => (
              <div
                className="custom-grid-item hover"
                onClick={() => {
                  handleRedirect(data.id);
                }}
              >
                <CategoryCard
                  heading={data.name}
                  description={`${data?.__meta__?.total_research}+ research`}
                  image={data.bg_image}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <LatestResearch
        titleBorder={true}
        title='Other <span class="title bg">Research</span>'
        data={all_research}
      />
    </section>
  );
}

// Define styles object
const styles = {
  searchContainer: {
    backgroundImage:
      "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "350px",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  title: {
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: 500,
  },
  subtitle: {
    color: "#E0E0E0",
    fontWeight: 400,
    fontSize: "16px",
  },
  inputGroup: {
    width: "100%",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center align content horizontally
    backgroundImage:
      "url(https://answersstaticfilecdnv2.azureedge.net/static/images/banner.png)",
    height: "300px",
  },

  input: {
    width: "60%",
    height: "38px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  productCol: {
    marginBottom: "20px",
  },
  productLink: {
    textDecoration: "none",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
};

const mapStateToProps = (state) => {
  const { market_research, categories, all_research } = state;

  return {
    market_research,
    all_research,
    categories,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  getCrud: crudActions._get,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(MarketResearch)
);
