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

SwiperCore.use([Navigation, Pagination]);

const CommunityCategory_former = ({ data, isloggedIn, toggleLoginPopup }) => {
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
    <div className="community-category-below">
      {!isMobile && (
        <div
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="view-more-icon"
          style={{
            left: "77px",
            marginTop: "6%",
            zIndex: "99",
            position: "absolute",
            width: "36px",
            height: "36px",
          }}
        >
          <ArrowLeftOutlined
            style={{
              color: "#fff",
              fontSize: "16px",
            }}
          />
        </div>
      )}
      <div className="category-box">
        <div className="category-banner-wrapper" id="categoryWrapper">
          <Swiper
            spaceBetween={50}
            slidesPerView={isMobile == true ? 1 : 3}
            pagination={
              isMobile == true
                ? {
                    clickable: true,
                    renderBullet: function (index, className) {
                      if (index < 6) {
                        return `<span class="${className}" style="margin-top: 10px;"></span>`;
                      } else {
                        return "";
                      }
                    },
                  }
                : false
            }
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            ref={swiperRef}
            breakpoints={{
              1200: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
            }}
          >
            {data.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="category-banner-block"
                  data-index={index}
                  key={index}
                >
                  <div
                    className="category-banner"
                    data-index={index}
                    key={index}
                    style={{ height: "220px" }}
                  >
                    <div
                      className="category-content"
                      style={{ height: "unset" }}
                    >
                      <div
                        className="content-head"
                        onClick={() => {
                          sessionStorage.setItem(
                            "community_id",
                            slide?.url_slug
                          );
                          Router.push("community/community_detail");
                        }}
                      >
                        <div className="icon-bg" style={{ height: "unset" }}>
                          <img
                            className="icon-image"
                            src={slide.image_url}
                            style={{ borderRadius: "4.8px" }}
                            alt={slide.name}
                            width={48}
                          />
                        </div>
                        <div className="category-text">
                          <h6 style={{ margin: "0", fontFamily: "Poppins" }}>
                            {slide.name}
                          </h6>
                        </div>
                      </div>
                      <div
                        className="content-structure"
                        style={{ height: "unset" }}
                      >
                        <p className="card-description">{slide.description}</p>
                        <div className="content-x">
                          <div className="user-icon">
                            <p>
                              <EyeOutlined
                                style={{
                                  fontSize: "16px",
                                  verticalAlign: "0.04em",
                                }}
                              />{" "}
                              Answers : {slide.__meta__.total_post_reply}
                            </p>
                          </div>
                          <div className="query-icon">
                            <p>
                              <MessageOutlined
                                style={{
                                  fontSize: "16px",
                                  verticalAlign: "0.04em",
                                }}
                              />{" "}
                              Questions : {slide.__meta__.total_posts}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {isBrowser && (
            <div
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="view-more-icon"
              style={{
                right: "-14px",
                marginTop: "7%",
                width: "36px",
                height: "36px",
                position: "absolute",
              }}
            >
              <ArrowRightOutlined />
            </div>
          )}
        </div>
      </div>
    </div>
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
