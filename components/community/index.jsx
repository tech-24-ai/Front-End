import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { isBrowser, isMobile } from "react-device-detect";
import CommunityCard from "./CommunityCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Button } from "reactstrap";

SwiperCore.use([Navigation, Pagination]);

const CommunityCategory_former = ({ data, isloggedIn, toggleLoginPopup }) => {
  const slider = useRef(null);
  const [categories, setCategories] = useState([]);
  const [slides, setSlides] = useState([]);
  const [changeIcon, setChangeIcon] = useState(false);
  const [hoverId, setHoverId] = useState(false);
  const swiperRef = useRef(null);
  const counter = 7;

  useEffect(() => {
    crudService
      ._getAll(
        "categories?orderBy=sort_order&orderPos=ASC&not_categories=[1,5]",
        {}
      )
      .then((result) => {
        setCategories(result.data);
        bindSlides(result.data);
      });
  }, []);

  const bindSlides = (categories) => {
    let updatedSlides = [];

    if (categories && categories.length) {
      categories.forEach((element, index) => {
        if (changeIcon) {
          if (index >= counter) {
            updatedSlides.push(element);
          }
        } else {
          if (index < counter) {
            updatedSlides.push(element);
          }
        }
      });
    }
    setSlides(updatedSlides);
  };

  const goToModules = (data) => {
    sessionStorage.removeItem("bgColor");
    sessionStorage.removeItem("categoryId");
    sessionStorage.removeItem("moduleId");
    sessionStorage.removeItem("childrenIds");
    sessionStorage.removeItem("isAdvanced");

    sessionStorage.setItem("categoryId", data.id);
    sessionStorage.setItem("bgColor", data.bg_color);
    const seoUrl = data.name.replace(/ /g, "_").toLowerCase();
    if (!!data.no_flow) {
      Router.push({
        pathname: `/d/${seoUrl.replace(/&/g, "and")}`,
      });
    } else {
      Router.push({
        pathname: `/technology/${seoUrl}`,
      });
    }
  };

  const handleScroll = () => {
    setChangeIcon(!changeIcon);
    bindSlides(categories);
  };

  const onCatHover = (id) => {
    setHoverId(id);
  };

  const handleGoToPage = (url) => {
    const restrictedUrls = ["/cummunity", "/community/all_community"];
    if (!isloggedIn && restrictedUrls.includes(url)) {
      toggleLoginPopup(true);
      return false;
    }

    Router.push(url);
  };

  const joinCommunity = (community_id) => {
    crudService
      ._create("community/join", { community_id })
      .then(() => window.location.reload());
  };

  if (!Array.isArray(data)) {
    return (
      <div style={{ paddingLeft: "100px" }}>No community data available</div>
    );
  }

  return (
    <Container style={{ padding: "0" }}>
      <div className="trending-category-below">
        <div className="category-box">
          <div className="category-banner-wrapper" id="categoryWrapper">
            <div
              onClick={() => slider.current?.slickPrev()}
              className="view-more-arrow previous-arrow"
              style={{
                left: "-18px",
                marginTop: "0px",
                top: "45%",
              }}
            >
              <ArrowLeftOutlined
                style={{
                  color: "#fff",
                  fontSize: "16px",
                }}
              />
            </div>
            <div
              onClick={() => slider.current?.slickNext()}
              className="view-more-arrow next-arrow"
              style={{
                right: "-18px",
                marginTop: "0px",
                top: "45%",
              }}
            >
              <ArrowRightOutlined
                style={{
                  color: "#fff",
                  fontSize: "16px",
                }}
              />
            </div>
            <Slider
              ref={slider}
              speed={500}
              slidesToScroll={1}
              slidesToShow={3}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2,
                    dots: false,
                  },
                },

                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    dots: false,
                  },
                },
              ]}
              appendDots={(dots) => (
                <div>
                  <ul> {dots} </ul>
                </div>
              )}
            >
              {data?.slice(0, 5).map((data, index) => (
                <CommunityCard data={data} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user, loggedIn } = authentication;
  return { user, confirm, isloggedIn: loggedIn };
};

const actionCreators = {
  toggleLoginPopup: userActions.toggleLoginPopup,
};

export default connect(
  mapStateToProps,
  actionCreators
)(CommunityCategory_former);
