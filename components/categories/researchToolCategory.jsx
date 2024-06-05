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
import { Col, Row, FormGroup } from "reactstrap";
import { TreeSelect } from "antd";
import Image from "next/image";
import myImageLoader from "../imageLoader";

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
    //
  }

  goToModules = (data) => {
    sessionStorage.removeItem("bgColor");
    sessionStorage.removeItem("categoryId");
    sessionStorage.removeItem("moduleId");
    sessionStorage.removeItem("childrenIds");
    sessionStorage.removeItem("isAdvanced");

    sessionStorage.setItem("categoryId", data.id);
    sessionStorage.setItem("bgColor", data.bg_color);
    // const seoUrl = data.name.replace(/ /g, "_").toLowerCase();
    Router.push({
      pathname: `/d/${data.seo}`,
    });
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
    const mobileColors = [
      {
        header: "#846a62",
        color: "#c9bab6",
      },
      {
        header: "#84bf40",
        color: "#b5d98c",
      },
      {
        header: "#607985",
        color: "#b5c3c9",
      },
    ];

    const renderButtons = [
      {
        id: 1,
        name: "Research",
        color: "#846a62",
        seo: "research",
        detail: "In-depth Product Comparisons, Best Practices and more",
        bg_color: "#d4e0fe",
        image:
          "https://elasticbeanstalk-us-east-1-847794743507.s3.amazonaws.com/zhIkGvJgez",
        mobHeader: "#b155ef",
        mobColor: "#dec2f0",
      },
      {
        id: 2,
        name: "Templates",
        color: "#AED581",
        seo: "template",
        bg_color: "#d4e0fe",
        detail: "RFP templates, IT Policy templates and more",
        image:
          "https://elasticbeanstalk-us-east-1-847794743507.s3.amazonaws.com/DBIe1tJPYO",
        mobHeader: "#b155ef",
        mobColor: "#dec2f0",
      },
      {
        id: 3,
        name: "Tools & Calculators",
        color: "#90A4AE",
        seo: "tools_calculators",
        bg_color: "#d4e0fe",
        detail: "Sizing and Cost Calculators",
        image:
          "https://elasticbeanstalk-us-east-1-847794743507.s3.amazonaws.com/AbHsOlf0wW",
        mobHeader: "#b155ef",
        mobColor: "#dec2f0",
      },
    ];

    return (
      <div className="category-below">
        <Container style={{ marginTop: "30px", width: "99%" }}>
          <div className="category-box">
            <h5 style={{ color: "#000" }}>Explore our research repository</h5>
            <div
              className="category-banner-wrapper research-category"
              id="researchCategoryWrapper"
            >
              {renderButtons.map((data, i) => (
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
                          <Image
                            className="banner2"
                            loader={myImageLoader}
                            src={data.image}
                            alt=""
                            layout="raw"
                            width={30}
                            height={30}
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
          </div>
        </Container>
        {isMobile && (
          <Container>
            <div className="mobile-view">
              <div className="arrow-down-up">
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
