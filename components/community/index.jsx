import React, { Fragment, useRef } from "react";
import Router, { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import { Button, Container } from "reactstrap";
import { crudService } from "../../_services";
import { userActions } from "../../_actions";
import { UsergroupAddOutlined, MessageOutlined } from "@ant-design/icons";
import { RoboAdvisor, ServiceProvider, Consultant } from "../icons";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation } from "swiper/core";

SwiperCore.use([Navigation]);

let counter = 7;

class CommunityCategory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      slides: [],
      changeIcon: false,
      hoverId: false,
    };
    this.swiperRef = React.createRef();
  }

  componentDidMount() {
    crudService
      ._getAll(
        "categories?orderBy=sort_order&orderPos=ASC&not_categories=[1,5]",
        {}
      )
      .then((result) => {
        this.setState({ categories: result.data });
        this.bindSlides();
      });
  }

  bindSlides = () => {
    const { categories, changeIcon } = this.state;
    let slides = [];

    if (categories && categories.length) {
      categories.forEach((element, index) => {
        if (changeIcon) {
          if (index >= counter) {
            slides.push(element);
          }
        } else {
          if (index < counter) {
            slides.push(element);
          }
        }
      });
    }
    this.setState({
      slides: slides,
    });
  };

  goToModules = (data) => {
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
        //pathname: `/${seoUrl.replace(/&/g, "and")}`,
      });
    } else {
      Router.push({
        pathname: `/technology/${seoUrl}`,
      });
    }
  };

  handleScroll = () => {
    const { changeIcon } = this.state;
    this.setState(
      {
        changeIcon: !changeIcon,
      },
      () => this.bindSlides()
    );
  };

  onCatHover = (id) => {
    this.setState({
      hoverId: id,
    });
  };

  handleGoToPage = (url) => {
    const restrictedUrls = ["/cummunity", "/community/query_detail"];
    if (!this.props.isloggedIn && restrictedUrls.includes(url)) {
      this.props.toggleLoginPopup(true);
      return false;
    }

    Router.push(url);
  };

  render() {
    const { changeIcon, slides, hoverId } = this.state;
    const { data } = this.props;
    if (!Array.isArray(data)) {
      return (
        <div style={{ paddingLeft: "100px" }}>No community data available</div>
      );
    }

    return (
      <div className="community-category-below">
        <div
          onClick={() => this.swiperRef.current.swiper.slidePrev()}
          className="view-more-icon"
          style={{
            left: "110px",
            marginTop: "10%",
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
        <div className="category-box">
          <div className="category-banner-wrapper" id="categoryWrapper">
            <Fragment>
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                ref={this.swiperRef}
              >
                {data.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="category-banner-block"
                      data-index={index}
                      key={index}
                    >
                      <div className="category-banner">
                        <div className="category-content">
                          <div className="content-head">
                            <div className="medium">
                              <Image
                                style={{ borderRadius: "4.8px" }}
                                src={slide.image_url}
                                alt={slide.name}
                                width={48}
                                height={48}
                              />
                            </div>
                            <div
                              className="category-content"
                              style={{ minWidth: "70%" }}
                            >
                              <h6>{slide.name}</h6>
                            </div>
                          </div>
                          <div className="card-body">
                            <p class="card-text">{slide.description}</p>
                            <div className="content-x">
                              <div className="user-icon">
                                <p>
                                  <UsergroupAddOutlined
                                    style={{ fontSize: "16px" }}
                                  />{" "}
                                  Members : {slide.__meta__.total_members}
                                </p>
                              </div>
                              <div className="query-icon">
                                <p>
                                  <MessageOutlined
                                    style={{ fontSize: "16px" }}
                                  />{" "}
                                  Queries : {slide.__meta__.total_posts}
                                </p>
                              </div>
                            </div>
                          </div>
                          <hr class="dotted-hr"></hr>
                          <div className="learn-more-btn">
                            <Button className="btn-text">Join Community</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                onClick={() => this.swiperRef.current.swiper.slideNext()}
                className="view-more-icon"
                style={{
                  right: "40px",
                  marginTop: "11%",
                  width: "36px",
                  height: "36px",
                }}
              >
                <ArrowRightOutlined />
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user, loggedIn } = authentication;
  return { user, confirm, isloggedIn: loggedIn };
};

const actionCreators = {
  toggleLoginPopup: userActions.toggleLoginPopup,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(CommunityCategory)
);
