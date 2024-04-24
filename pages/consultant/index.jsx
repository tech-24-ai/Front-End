import React, { Fragment, useState, useEffect } from "react";
import Image from "next/future/image";
import PageBanner from "../../components/card/pageBanner";
import consultantBannerImage from "../../public/new_images/consultant_banner.svg";
import chatIcon from "../../public/new_images/chat-icon.svg";
import engageIcon from "../../public/new_images/engage-icon.svg";
import userIcon from "../../public/new_images/user-icon.svg";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import ReactPaginate from "react-paginate-next";

import {
  isBrowser,
  BrowserView,
  MobileView,
  isMobile,
} from "react-device-detect";
import ConsultantCard from "../../components/consultant/ConsultantCard";
import ConsultantFilter from "../../components/consultant/ConsultantFilter";
import NotFound from "../../components/notFound";
import { LoadingDotIcon } from "../../components/icons";

const consultantList = ({ consultants, getAllCrud, authentication }) => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [filterList, setFilterList] = useState({});
  const [searchText, setSearchText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(authentication);
    if (!authentication.loggedIn) {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    if (page) {
      setPage(0);
    } else {
      handleFetchConsultant({ search: searchText });
    }
  }, [filterList, searchText]);

  useEffect(() => {
    handleFetchConsultant({ search: searchText });
  }, [page]);

  const handleFetchConsultant = ({ search = null }) => {
    setIsLoading(true);
    getAllCrud("consultants", "consultants", {
      page: page + 1,
      pageSize: 12,
      is_company: 0,
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

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section className="consultant-page-section">
      <PageBanner
        titleNode={
          <Fragment>
            <h4>Talk to a Consultant </h4>
            <div className="title-content">
              <Image
                className="consultant-banner"
                loader={myImageLoader}
                src={chatIcon}
                alt=""
                width={24}
                height={22}
                style={{ objectFit: "contain" }}
              />
              <p>Talk to a consultant and pay per minute.</p>
            </div>
            <div className="title-content">
              <Image
                className="consultant-banner"
                loader={myImageLoader}
                src={engageIcon}
                alt=""
                layout="raw"
                width={24}
                height={22}
                style={{ objectFit: "contain" }}
              />
              <p>Engage with a consultant over a video conference.</p>
            </div>
            <div className="title-content">
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
                Discuss strategy, technology and costs with the consultant or
                hire for a project.
              </p>
            </div>
            <a
              href="#consultant-list-container"
              className="custom-btn bg-white"
            >
              Book Appointment Now
            </a>
          </Fragment>
        }
        image={consultantBannerImage}
      />

      <Container>
        <ConsultantFilter
          data={filterList}
          setState={setFilterList}
          setSearchText={setSearchText}
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
            {consultants && consultants?.data?.length > 0 ? (
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
