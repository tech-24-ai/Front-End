import React, { Fragment } from "react";
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
import homeBackground from "../public/images/home/Hero.png";
import myImageLoader from "../components/imageLoader";
import TreeSelect from "../components/form/treeSelect";
import CategoryList from "../components/categories/categoryList";
import { OneIcon, TwoIcon, ThreeIcon } from "../components/icons";
import themeConfig from "../config/themeConfig";
import LatestResearch from "../components/marketResearch/LatestResearch";
import LatestBlog from "../components/blog/LatestBlog";
import TopConsultant from "../components/consultant/TopConsultant";

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
      <Fragment>
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
            content={`Top 10 vendors, Product recommendations, IT Market Research, Market Insights, Product reviews, Vendor reviews, ${themeConfig.appName} Top 10.`}
          />
        </Head>
        <section className="explore-wrapper">
          <section className="home-page-title">
            <Container>
              <div className="content-wrapper">
                <div className="content-title-wrapper">
                  <h3 className="main-title text-center">
                    {themeConfig.appName}
                    <br></br>
                    Your One Stop Shop for All IT needs!
                  </h3>
                  <p className="main-title-two text-center">
                    What would you like to do today?
                  </p>
                </div>
              </div>
            </Container>
          </section>
          <Categories />
          {/* <LatestResearch /> */}
        </section>
        <section>
          <LatestBlog />
          <TopConsultant />
        </section>
      </Fragment>
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
