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

import roboAdvisorIcon from "../../public/new_images/robo_advisor.svg";

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
    const categoryList = [
      {
        title: "AI-based Robo Advisor for Free",
        description: [
          "Find the right software, hardware or service",
          "Troubleshoot problems",
          "Reduce costs",
          "Get best practice guidance",
        ],
        icon: { white: "robo_advisor.svg", blue: "robo_advisor_blue.svg" },
      },
      {
        title: "Talk to a consultant",
        description: [
          "Engage with a consultant over a video conference.",
          "Pay per minute.",
          "Discuss strategy, technology and costs.",
        ],
        icon: {
          white: "talk_to_consultant.svg",
          blue: "talk_to_consultant_blue.svg",
        },
      },
      {
        title: "Work with a service provider",
        description: [
          "Pay at 20% less than market rates",
          "App development, managed services, custom integration, UI design, Assessments & more",
        ],
        icon: {
          white: "service_provider.svg",
          blue: "service_provider_blue.svg",
        },
      },
      {
        title: "Access our Research Portal",
        description: [
          "In-depth product comparison reports.",
          "Top Use cases",
          "Calculators",
          "Tools and more",
        ],
        icon: {
          white: "research_portal.svg",
          blue: "research_portal_blue.svg",
        },
      },
    ];

    return (
      <div className="category-below">
        <Container style={{ marginTop: "30px", width: "99%" }}>
          <div className="category-box">
            <div className="category-banner-wrapper" id="categoryWrapper">
              {categoryList.map((data, index) => (
                <div
                  className="category-banner-block"
                  // data-index={i}
                  // key={i}
                  //   onClick={() => {
                  //     this.goToModules(data);
                  //   }}
                >
                  <div className="category-banner" key={index}>
                    <div
                      className="category-content"
                      //   onMouseEnter={() => this.onCatHover(data.id)}
                    >
                      <div className="icon-container">
                        <a
                          href=""
                          target="_blank"
                          aria-label="redirect to website"
                        >
                          <Image
                            loader={myImageLoader}
                            // src={roboAdvisorIcon}
                            src={`/new_images/${data.icon.white}`}
                            alt=""
                            placeholder="Website"
                            layout="raw"
                            height={35}
                            width={25}
                          />
                        </a>
                      </div>

                      <h6>{data.title}</h6>
                      <div className="learn-more-btn">Learn More</div>
                    </div>

                    <div
                      className="category-hover"
                      style={{ backgroundColor: "#0d99ff" }}
                    >
                      <div className="category-hover-content">
                        <div
                          className="category-img"
                          style={{ position: "relative" }}
                        >
                          <Image
                            className="banner1"
                            loader={myImageLoader}
                            src={`/new_images/${data.icon.blue}`}
                            alt=""
                            layout="raw"
                            width={35}
                            height={30}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="category-content">
                          <h6>{data.title}</h6>
                        </div>
                        <ul>
                          {data.description.map((des, idx) => (
                            <li key={idx}>{des}</li>
                          ))}
                        </ul>
                      </div>
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
