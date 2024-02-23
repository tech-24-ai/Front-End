import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { isMobile } from "react-device-detect";
import { Icon } from "react-icons-kit";
import { iosArrowBack } from "react-icons-kit/ionicons/iosArrowBack";
import { iosArrowForward } from "react-icons-kit/ionicons/iosArrowForward";
import Arrow from "../../public/images/category/arrow.svg";
import { crudService } from "../../_services";
import ArrowDown from "../../public/images/category/arrowdown.svg";
import ArrowUp from "../../public/images/category/arrowup.svg";
// import './styles.css';

let counter = isMobile ? 6 : 7;
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
    crudService._getAll("blogs", {}).then((result) => {
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
    sessionStorage.removeItem("slugs");
    sessionStorage.removeItem("moduleId");
    sessionStorage.removeItem("childrenIds");
    sessionStorage.removeItem("isAdvanced");

    sessionStorage.setItem("categoryId", data.id);
    sessionStorage.setItem("bgColor", data.bg_color);
    if (!!data.no_flow) {
      Router.push({
        pathname: "/d",
      });
    } else {
      Router.push({
        pathname: "/technology",
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
        <Container>
          <div className="category-box">
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
                      borderBottomColor: !isMobile ? data.color : "",
                      borderBottomStyle: !isMobile ? "solid" : "",
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
                      <img src={data.image} className="banner1" />
                      <div className="arrow-right">
                        <img src={ArrowDown} />
                      </div>
                    </div>
                    <div
                      className="category-content"
                      onHover={() => this.onCatHover(data.id)}
                    >
                      <h6>{data.name}</h6>
                    </div>

                    <div
                      className="category-hover"
                      style={{ backgroundColor: "#000" }}
                    >
                      <div className="category-hover-content">
                        <div className="category-img">
                          <img src={data.image} className="banner1" />
                        </div>
                        <div className="category-content">
                          <h6>{data.name}</h6>
                        </div>
                      </div>
                      <p>{data.details.substring(0, 100)}</p>
                      <h6>Read More</h6>
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
                <img
                  onClick={this.handleScroll}
                  src={changeIcon ? ArrowUp.src : ArrowDown.src}
                  className="arrowdown active"
                />
                <img src={ArrowUp.src} className="arrowup" />
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
