import React, { Fragment, useState, useEffect } from "react";
import Image from "next/future/image";
import PageBanner from "../../components/card/pageBanner";
import fragmentIcon from "../../public/new_images/ServiceProvider/fragment-icon.svg";
import currencyIcon from "../../public/new_images/ServiceProvider/currency-icon.svg";
import serviceProviderImage from "../../public/new_images/ServiceProvider/serviceProvider-bg.svg";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import { crudActions } from "../../_actions";
import { crudService } from "../../_services";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import ReactPaginate from "react-paginate-next";

import { isBrowser, isMobile } from "react-device-detect";
import ConsultantFilter from "../../components/consultant/ConsultantFilter";
import ConsultantCard from "../../components/consultant/ConsultantCard";
import NotFound from "../../components/notFound";
import { LoadingDotIcon } from "../../components/icons";
import themeConfig from "../../config/themeConfig";

const consultantList = ({ consultants, getAllCrud, authentication }) => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [filterList, setFilterList] = useState({});
  const [searchText, setSearchText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authentication.loggedIn) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    handleFetchConsultant({ search: searchText });
  }, [page]);

  useEffect(() => {
    if (page) {
      setPage(0);
    } else {
      handleFetchConsultant({ search: searchText });
    }
  }, [filterList, searchText]);

  const handleFetchConsultant = ({ search = null }) => {
    const isFilterApplied = Object.keys(filterList).length;
    console.log("isFilterApplied", isFilterApplied);
    setIsLoading(true);
    getAllCrud("consultants", "consultants", {
      page: page + 1,
      pageSize: 12,
      is_company: 1,
      filters: filterList,
      search,
    });
  };

  useEffect(() => {
    if (consultants && consultants.data && consultants.data.length) {
      setPageCount(Math.ceil(consultants.total / consultants.perPage));
    }
    if (consultants && consultants.data) {
      setIsLoading(false);
    }
  }, [consultants]);

  return (
    <section className="consultant-page-section">
      <PageBanner
        titleNode={
          <Fragment>
            <h4>Work with a service provider</h4>
            <div className="title-content">
              <Image
                className="consultant-banner"
                loader={myImageLoader}
                src={currencyIcon}
                alt=""
                layout="raw"
                width={24}
                height={22}
                style={{ objectFit: "contain" }}
              />
              <p>Pay at 20% less than market rates</p>
            </div>
            <div className="title-content">
              <Image
                className="consultant-banner"
                loader={myImageLoader}
                src={fragmentIcon}
                alt=""
                layout="raw"
                width={20}
                height={20}
                style={{ objectFit: "contain" }}
              />
              <p>
                App development, managed services, custom integration, UI
                design, Assessments & more
              </p>
            </div>
            <div className="title-content">
              <Image
                className="consultant-banner"
                loader={myImageLoader}
                src={fragmentIcon}
                alt=""
                layout="raw"
                width={20}
                height={20}
                style={{ objectFit: "contain" }}
              />
              <p>{themeConfig.appName} will manage SLAs and payments</p>
            </div>
            {/* <div className="title-content">
                            <Image
                                className="consultant-banner"
                                loader={myImageLoader}
                                src={userIcon}
                                alt=""
                                layout="raw"
                                width={24}
                                height={22}
                                style={{ objectFit: "contain" }}
                            />
                            <p>
                                User can Discuss strategy, technology and costs with the
                                consultant or higher for project.
                            </p>
                        </div> */}
            {/* <div className="custom-btn bg-white">Book Appointment Now</div> */}
          </Fragment>
        }
        image={serviceProviderImage}
      />

      <Container>
        <ConsultantFilter
          data={filterList}
          setState={setFilterList}
          setSearchText={setSearchText}
          isCompany={true}
        />
      </Container>

      <Container
        style={{
          paddingLeft: isBrowser ? "2.5rem" : "",
          paddingRight: isBrowser ? "2.5rem" : "",
        }}
      >
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <LoadingDotIcon />
          </div>
        ) : (
          <Fragment>
            <ConsultantCard />
            {consultants && consultants.data.length > 0 ? (
              <div
                style={{ marginTop: "40px" }}
                className="pagination d-flex justify-content-between align-items-center"
              >
                <div></div>
                <div className="issuesPagination">
                  <div style={{ marginRight: "1.5rem" }}>
                    <ReactPaginate
                      pageCount={pageCount}
                      initialPage={page}
                      forcePage={page}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={({ selected }) => setPage(selected)}
                      nextLabel="Next"
                      previousLabel="Previous"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <NotFound />
            )}
          </Fragment>
        )}
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { consultants, authentication } = state;
  return {
    consultants,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantList)
);
