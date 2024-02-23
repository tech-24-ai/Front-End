import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { isMobile, isBrowser } from "react-device-detect";
import Link from "next/link";
import Router from "next/router";
import Categories from "../components/categories/newCategory";
import ResearchToolCategory from "../components/categories/researchToolCategory";
import SearchModule from "../components/searchModule";
import Footer from "../components/footer";
import ArrowDown from "../public/images/category/arrowdown.svg";
import ArrowUp from "../public/images/category/arrowup.svg";
import { crudService, userService } from "../_services";
import { userActions } from "../_actions";
import SectionBySM from "../components/SectionBySM";
import searchLogo from "../public/images/header/Explore IT.png";
import SectionBySMMobile from "../components/SectionBySMMobile";
import headerLogo from "../public/images/header/Group 659.png";
import MILogo from "../public/images/header/Group 338.png";
import Head from "next/head";

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
            content="Top 10 vendors, Product recommendations, IT Market Research, Market Insights, Product reviews, Vendor reviews, ITMAP Top 10."
          />
        </Head>
        <Container>
          <div className="content-wrapper">
            <div className="content-title-wrapper">
              <h3 className="main-title text-center">
                TECH24 - Your One Stop Shop for All IT needs!
              </h3>
              <p className="main-title-two text-center">
                What would like do today?
              </p>
            </div>
          </div>
        </Container>
        <Categories />
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
