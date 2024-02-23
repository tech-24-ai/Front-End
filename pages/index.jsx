import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { isMobile, isBrowser } from "react-device-detect";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";
import Categories from "../components/categories/index";
// import ResearchToolCategory from "../components/categories/researchToolCategory";
// import SearchModule from "../components/searchModule";
import Footer from "../components/footer";
import ArrowDown from "../public/images/category/arrowdown.svg";
import ArrowUp from "../public/images/category/arrowup.svg";
import { crudService, userService } from "../_services";
import { userActions } from "../_actions";
import roboAdvisorImage from "../public/new_images/robo-advisor-img.svg";
import consultantBanner from "../public/new_images/consultant_banner.svg";
import serviceProviderBanner from "../public/new_images/service-provider-banner.svg";
import chatIcon from "../public/new_images/chat-icon.svg";
import engageIcon from "../public/new_images/engage-icon.svg";
import userIcon from "../public/new_images/user-icon.svg";
import lessIcon from "../public/new_images/less-icon.svg";
import dollarIcon from "../public/new_images/dollar-icon.svg";
import oneIcon from "../public/new_images/one-icon.svg";
import twoIcon from "../public/new_images/two-icon.svg";
import threeIcon from "../public/new_images/three-icon.svg";
import searchIcon from "../public/new_images/search-icon.svg";
import businessIcon from "../public/new_images/business-application-icon.svg";
import itInfraIcon from "../public/new_images/it-infra-icon.svg";
import Head from "next/head";
import myImageLoader from "../components/imageLoader";
import TreeSelect from "../components/form/treeSelect";
import CategoryList from "../components/categories/categoryList";
import { OneIcon, TwoIcon, ThreeIcon } from "../components/icons";

let counter = 6;
let arrLength = 6;
class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      changeIcon: false,
    };
  }

  checkAuth = () => {
    if (this.props.isloggedIn) {
      userService.IsUserLoggedIn();
    }
    if (!this.props.isloggedIn) {
      this.props.guest();
    }
  };

  componentDidMount = () => {
    this.checkAuth();

    crudService
      ._getAll("categories?orderBy=sort_order&orderPos=ASC", {})
      .then((result) => {
        this.setState({ categories: result.data });
      });

    sessionStorage.removeItem("bgColor");
    sessionStorage.removeItem("categoryId");
    sessionStorage.removeItem("moduleId");
    sessionStorage.removeItem("childrenIds");
    sessionStorage.removeItem("isAdvanced");
    sessionStorage.removeItem("slugs");
    sessionStorage.removeItem("consultantID");
    sessionStorage.removeItem("booking_historyID");
    localStorage.removeItem("meetingDetail");
    localStorage.removeItem("messageDetail");
    localStorage.removeItem("vulnerability");
  };

  onScroll = () => {
    const { categories } = this.state;
    arrLength = categories.length;

    if (arrLength <= counter) {
      arrLength -= 1;
      if (arrLength == 6) {
        counter = 6;
        arrLength = categories.length;
      }
      this.setState({
        changeIcon: false,
      });
      document.getElementById("categoryWrapper").scrollTo(0, 0);
    } else if (arrLength > counter) {
      counter += 1;
      this.setState({
        changeIcon: true,
      });
      document.getElementById("categoryWrapper").scrollTo(0, 200);
    }
  };

  render() {
    const { isloggedIn } = this.props;
    const { changeIcon } = this.state;
    return (
      <section className="explore-wrapper">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
          />
          <meta name="title" content="IT Market Research for Everyone" />
          <meta
            name="description"
            content="Get free top 10 vendor recommendations instantly for enterprise business applications, cybersecurity, IT infrastructure, AI, Cloud Computing and physical security"
          />
          <meta
            name="keywords"
            content="Top 10 vendors, Product recommendations, IT Market Research, Market Insights, Product reviews, Vendor reviews, TECH24 Top 10."
          />
        </Head>
        <Container>
          <div className="content-wrapper">
            <div className="content-title-wrapper">
              <h3 className="main-title text-center">
                TECH24 - Your One Stop Shop for All IT needs!
              </h3>
              <p className="main-title-two text-center">
                What would you like to do today?
              </p>
            </div>
          </div>
        </Container>
        <Categories />

        {/* <Container>
          <div className="video-section ">
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7018145159905226753?compact=1"
              height={isBrowser ? "500" : "350"}
              width="100%"
              frameborder="0"
              allowfullscreen=""
              title="ITMAP market-research"
            ></iframe>
          </div>
        </Container> */}

        {/* IT-Robo section */}
        {/* <section className="robo-advisor-section" id="robo-advisor-section">
          <div className="robo-advisor-banner-bg">
            <Container className="robo-advisor-banner">
              <div className="title">
                <h4>
                  Meet Industry's first <br /> Robo-Advisor for IT
                </h4>
                <h6>Try free now!</h6>
              </div>
              <div className="image">
                <Image
                  className="robo-banner"
                  loader={myImageLoader}
                  src={roboAdvisorImage}
                  alt=""
                  layout="raw"
                  width={400}
                  height={400}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Container>
          </div>
          <Container className="robo-advisor-content">
            <h3>What would you like to do today?</h3>
            <div className="card-container">
              <div className="card">
                <div className="custom-icon">
                  <Image
                    loader={myImageLoader}
                    src={`/new_images/engine.svg`}
                    alt=""
                    placeholder="Website"
                    layout="raw"
                    height={30}
                    width={25}
                  />
                </div>
                <h5>Product Recommendation Engine</h5>
                <div className="custom-btn btn-gray">Explore More</div>
              </div>
              <div className="card">
                <div className="custom-icon">
                  <Image
                    loader={myImageLoader}
                    src={`/new_images/troubleshoot.svg`}
                    alt=""
                    placeholder="Troubleshoot"
                    layout="raw"
                    height={30}
                    width={25}
                  />
                </div>
                <h5>Troubleshoot Issues</h5>
                <div className="custom-btn btn-gray">Explore More</div>
              </div>
              <div className="card">
                <div className="custom-icon">
                  <Image
                    loader={myImageLoader}
                    src={`/new_images/pricing.svg`}
                    alt=""
                    placeholder="Pricing"
                    layout="raw"
                    height={25}
                    width={25}
                  />
                </div>
                <h5>Get Pricing Guidance</h5>
                <div className="custom-btn btn-gray">Explore More</div>
              </div>
            </div>
          </Container>
        </section> */}

        {/* Talk to consultant section */}
        {/* <section className="consultant-section" id="consultant-section">
          <div className="page-banner">
            <div className="banner-bg">
              <Container className="banner-container">
                <div className="banner-title-container">
                  <h4>Talk to a Consultants</h4>
                  <div className="title-content">
                    <Image
                      className="consultant-banner"
                      loader={myImageLoader}
                      src={chatIcon}
                      alt=""
                      layout="raw"
                      width={20}
                      height={20}
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
                      width={20}
                      height={20}
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
                      width={20}
                      height={20}
                      style={{ objectFit: "contain" }}
                    />
                    <p>
                      User can Discuss strategy, technology and costs with the
                      consultant or higher for project.
                    </p>
                  </div>
                  <div className="custom-btn bg-white">
                    Book Appointment Now
                  </div>
                </div>
                <div className="banner-image-container">
                  <Image
                    className="consultant-banner"
                    loader={myImageLoader}
                    src={consultantBanner}
                    alt=""
                    layout="raw"
                    width={400}
                    height={400}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Container>
            </div>
          </div>
        </section> */}

        {/* service provider section */}
        {/* <section
          className="service-provider-section"
          id="service-provider-section"
        >
          <div className="service-provider-banner-bg">
            <Container className="service-provider-banner-container">
              <div className="title">
                <h4>Work with a service provider</h4>
                <div className="title-content">
                  <Image
                    className="consultant-banner"
                    loader={myImageLoader}
                    src={lessIcon}
                    alt=""
                    layout="raw"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                  />
                  <p>Pay at 20% less than market rates</p>
                </div>
                <div className="title-content">
                  <Image
                    className="consultant-banner"
                    loader={myImageLoader}
                    src={dollarIcon}
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
              </div>
              <div className="image">
                <Image
                  className="consultant-banner"
                  loader={myImageLoader}
                  src={serviceProviderBanner}
                  alt=""
                  layout="raw"
                  width={400}
                  height={400}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Container>
          </div>
        </section> */}

        {/* research portal section */}
        {/* <section
          className="research-portal-section"
          id="research-portal-section"
        >
          <div className="research-portal-banner-bg">
            <Container className="research-portal-banner-container">
              <div className="left-section">
                <h4>
                  Find The Right Technology
                  <br /> For Your Enterprise
                </h4>
                <div className="title-content">
                  <TreeSelect
                    className="home-page-search-module"
                    placeholder="Enter software, hardware or service category, and we will find the right product for you"
                  />
                </div>
              </div>
              <div className="right-section">
                <p>
                  Narrow down your search and find the right product -{" "}
                  <span>in 3 Easy Steps!</span>
                </p>
                <div className="input-requirement">
                  <div className="content">
                    <h6 className="title">Input Requirements</h6>
                    <p className="text">
                      Input your technical requirements, location, enterprise
                      size and budget on the platform
                    </p>
                  </div>
                  <div className="img">
                    <OneIcon />
                  </div>
                </div>
                <div className="algorithmic-search">
                  <div className="content">
                    <h6 className="title">Algorithmic Search</h6>
                    <p className="text">
                      Our algorithms will find the list of right products for
                      you - instantly!
                    </p>
                  </div>
                  <div className="img">
                    <TwoIcon />
                  </div>
                </div>
                <div className="product-selection">
                  <div className="content">
                    <h6 className="title">Product Selection</h6>
                    <p className="text">
                      Finalize product selection through our in-depth product
                      comparison research and pay-per-minute consultants
                    </p>
                  </div>
                  <div className="img">
                    <ThreeIcon />
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <Container className="research-portal-category-container">
            <h4 className="main-title">or Browse from a Category below</h4>
            <CategoryList />
          </Container>
        </section> */}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
  };
};

const actionCreators = {
  guest: userActions.guest,
};

export default connect(mapStateToProps, actionCreators)(Home);
