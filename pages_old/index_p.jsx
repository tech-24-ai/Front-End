import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { isMobile, isBrowser } from "react-device-detect";
import Link from "next/link";
import Router from "next/router";
import Categories from "../components/categories";
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
        <div>
          <Container>
            <div className="explore-content">
              <div className="explore-title-link">
                {isBrowser && (
                  <Row>
                    <Col
                      xs={12}
                      sm={12}
                      md={7}
                      lg={7}
                      xl={12}
                      className="explore-title"
                    >
                      <h3
                        className="main-title text-left"
                        style={{ margin: "50px 0px 50px 300px" }}
                      >
                        Find the right technology for your enterprise
                        {/* isBrowser && <img src={searchLogo.src} alt="" /> */}
                      </h3>
                    </Col>
                  </Row>
                )}
                {/* {isMobile &&
                    <Link href="/login"><a className="Logout-link">Logout</a></Link>
                  } */}
              </div>
              {/* {isMobile && (
                <div
                  style={{
                    marginTop: "-20%",
                    // display: "flex",
                    // justifyContent: "space-around",
                    // marginLeft: "-50px",
                    width: "150px",
                  }}
                >
                  <div>
                    <img
                      style={{ backgroundColor: "red" }}
                      src={headerLogo}
                      alt=""
                    />
                  </div>
                  <div><img src={MILogo} alt="" /></div>
                </div>
              )} */}
              <SearchModule />
            </div>
          </Container>

          <Categories />
          <ResearchToolCategory />

          <div style={{ marginTop: "100px" }}>
            <SectionBySM />
          </div>

          {/* {isBrowser && <Footer />} */}
        </div>
        {isMobile && <SectionBySMMobile />}
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
