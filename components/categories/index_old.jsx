import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { isMobile, isTablet, isBrowser } from "react-device-detect";
import { Icon } from "react-icons-kit";
import { iosArrowBack } from "react-icons-kit/ionicons/iosArrowBack";
import { iosArrowForward } from "react-icons-kit/ionicons/iosArrowForward";
import Arrow from "../../public/images/category/arrow.svg";
import { crudService } from "../../_services";
import ArrowDown from "../../public/images/category/arrowdown.svg";
import ArrowUp from "../../public/images/category/arrowup.svg";
import centerLogo from "../../public/images/header/Group 594.png";
import moreIcon from "../../public/images/header/Group 550.png";
import { Col, Row, FormGroup } from "reactstrap";
import { TreeSelect } from "antd";
import Image from "next/image";
import myImageLoader from "../imageLoader";

let counter = isMobile ? 7 : 7;
class Categories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      slides: [],
      changeIcon: false,
      hoverId: false,
    };
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

  render() {
    const { changeIcon, slides, hoverId } = this.state;

    const mobileColors = [
      {
        header: "#10acdc",
        color: "#abdcea",
      },
      {
        header: "#5878ef",
        color: "#c2ccf0",
      },
      {
        header: "#ffa867",
        color: "#eed5c4",
      },
      {
        header: "#075aee",
        color: "#abc4f0",
      },
      {
        header: "#42c656",
        color: "#bbe4c1",
      },
      {
        header: "#8592ac",
        color: "#d0d4dc",
      },
      {
        header: "#b155ef",
        color: "#dec2f0",
      },
    ];

    return (
      <div className="category-below">
        <Container style={{ marginTop: "30px", width: "99%" }}>
          <div className="category-box">
            <h5 style={{ color: "#000" }}>Or browse from a category below</h5>
            {/* {!isMobile && (
                            <div className="arrow-feature"><Icon onClick={this.handleScroll} size={32} icon={changeIcon ? iosArrowBack : iosArrowForward} /></div>
                        )} */}

            <div className="category-banner-wrapper" id="categoryWrapper">
              {slides.map((data, i) => (
                <div
                  className="category-banner-block"
                  data-index={i}
                  key={i}
                  onClick={() => {
                    this.goToModules(data);
                  }}
                >
                  <div
                    className="category-banner"
                    style={{
                      backgroundColor: !isMobile
                        ? data.color
                        : mobileColors[i]
                        ? mobileColors[i].color
                        : "",
                      borderBottomColor:
                        isBrowser || isTablet ? data.color : "",
                      borderBottomStyle: isBrowser || isTablet ? "solid" : "",
                    }}
                  >
                    <div
                      className="category-img mobile-view"
                      style={{
                        backgroundColor: mobileColors[i]
                          ? mobileColors[i].header
                          : "",
                      }}
                    >
                      <Image
                        loader={myImageLoader}
                        src={data.image}
                        className="banner1"
                        alt=""
                        layout="raw"
                        width={34}
                        height={34}
                        style={{ objectFit: "contain" }}
                      />
                      <div className="arrow-right">
                        <Image
                          loader={myImageLoader}
                          src={ArrowDown}
                          alt=""
                          placeholder="ArrowDown"
                          layout="raw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    <div
                      className="category-content"
                      onMouseEnter={() => this.onCatHover(data.id)}
                    >
                      <h6>{data.name}</h6>
                    </div>

                    <div
                      className="category-hover"
                      style={{ backgroundColor: data.color }}
                    >
                      <div className="category-hover-content">
                        <div
                          className="category-img"
                          style={{ position: "relative" }}
                        >
                          {/* <img src={data.image} className="banner1" /> */}
                          <Image
                            className="banner1"
                            loader={myImageLoader}
                            src={data.image}
                            alt=""
                            layout="raw"
                            width={34}
                            height={34}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="category-content">
                          <h6>{data.name}</h6>
                        </div>
                      </div>
                      <p>{data.detail}</p>
                      <h6>Explore</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <p
              style={{
                textAlign: "right",
                margin: "10px 10px 0px 0px",
                fontWeight: "600",
                letterSpacing: "0.08px",
                color: "#0060d0",
              }}
            >
              <img src={moreIcon} alt="" />
            </p> */}
            {/* <div
              style={{
                textAlign: "center",
                display: "block",
                margin: "50px auto",
              }}
            >
              <a href="#scroll">
                <img style={{ cursor: "pointer" }} src={centerLogo} alt="" />
              </a>
            </div> */}
          </div>
        </Container>
        {isMobile && (
          <Container>
            <div className="mobile-view">
              <div className="arrow-down-up">
                {/* <img
                  onClick={this.handleScroll}
                  src={changeIcon ? ArrowUp : ArrowDown}
                  className="arrowdown active"
                /> */}
                {/* <img src={ArrowUp.src} className="arrowup" /> */}
                <Image
                  loader={myImageLoader}
                  src={ArrowUp}
                  className="arrowup"
                  alt=""
                  placeholder="ArrowUp"
                  layout="raw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              {/* <div className="footer-link">
                                <Link href="/"><a className="active">Home</a></Link>
                                <Link href="/content/[slug]" as={`/content/about-us`}><a>About Us</a></Link>
                                <Link href="/connect"><a>Connect</a></Link>
                            </div> */}
            </div>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user } = authentication;
  return { user, confirm };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Categories);
