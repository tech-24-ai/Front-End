import React from "react";
import { FormGroup, Row, Col, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";
import { isBrowser, isMobile, BrowserView } from "react-device-detect";
import { crudActions, alertActions, loaderActions } from "../../_actions";
import { withRouter } from "next/router";
import Search from "../../public/images/input/search.svg";
import MobileSearch from "../../public/images/input/search2.svg";
import { TreeSelect } from "antd";
import Link from "next/link";
import "antd/dist/antd.css";
import { crudService } from "../../_services";
import prevArrow from "../../public/images/header/icon-ionic-ios-arrow-back.png";
import nextArrow from "../../public/images/header/icon-ionic-ios-arrow-forward.png";
import Image from "next/image";
import myImageLoader from "../imageLoader";

class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchValue: "",
      aboutValue: "",
      categorySlug: "",
      moduleSlug: "",
      modules: [],
      childrenIds: [],
    };
  }

  onSearchEvent = () => {
    let moduleId = null;
    const { router } = this.props;
    if (sessionStorage.getItem("moduleId")) {
      moduleId = sessionStorage.getItem("moduleId");
    }

    if (sessionStorage.getItem("childrenIds")) {
      const childrenIdsession = JSON.parse(
        sessionStorage.getItem("childrenIds")
      );
      childrenIdsession.forEach((element) => {
        moduleId = element;
      });
    }
    if (moduleId) {
      router.push(
        `/technology/${this.state.categorySlug}/${this.state.moduleSlug}`
      );
    } else {
      this.props.showError("Please select technology from dropdown");
    }
  };

  getParentData = (array) => {
    // let childrenIds = [];
    if (array.parent) {
      this.getParentData(array.parent);
      // childrenIds.push(array.id);
      this.setState({
        childrenIds: [...this.state.childrenIds, array.id],
      });
    } else {
      sessionStorage.setItem("moduleId", array.id);
      this.setState({ moduleSlug: array.seo_url_slug });
    }
    sessionStorage.setItem(
      "childrenIds",
      JSON.stringify(this.state.childrenIds)
    );
  };

  onChange = (event, node) => {
    this.setState({ childrenIds: [] });
    if (node) {
      if (node.category_id) {
        this.props.showLoader();
        crudService._get("categories", node.category_id).then((result) => {
          if (result.data) {
            sessionStorage.setItem("bgColor", result.data.bg_color);
            this.setState({
              categorySlug: result.data.name.replace(/ /g, "_").toLowerCase(),
            });
          }
        });

        sessionStorage.setItem("categoryId", node.category_id);
      }

      this.setState({
        searchValue: event,
        aboutValue: node.about,
      });
    }

    if (typeof event === "string") {
      this.props.showError("Please Select Child Technology");
    } else {
      this.props.showLoader();
      crudService
        ._getAll("module/parent", { module_id: event })
        .then((result) => {
          if (result.data && result.data[0]) {
            this.getParentData(result.data[0]);
          }
        });
    }
  };

  componentDidMount() {
    if (!this.props.isHeader) {
      this.props.showLoader();
      crudService
        ._getAll("module/categories?not_categories=[5,1]", {})
        .then((result) => {
          this.setState({ modules: result.data });
        });
    }
  }

  renderChildren = (array) => {
    let result = [];
    const localArray = array;
    for (let i = 0; i < localArray.length; i++) {
      let node = localArray[i];
      const finalArray = {
        title: localArray[i].name,
        value: localArray[i].id,
        about: localArray[i].about,
        category_id: localArray[i].category_id,
        parent_id: localArray[i].parent_id,
        bg_color: localArray[i].bg_color ? localArray[i].bg_color : "",
        children: node.children && this.renderChildren(node.children),
      };

      result.push(finalArray);
    }
    return result;
  };

  render() {
    const { aboutValue, modules, searchValue } = this.state;
    const { isHeader, isloggedIn } = this.props;

    let selectedValue;

    if (typeof searchValue != "string") {
      selectedValue = searchValue;
    }

    return (
      <React.Fragment>
        {isHeader ? (
          /*  <FormGroup className="search-box-wrapper">
            <TreeSelect
              showSearch
              style={{ width: "90%", float: "left" }}
              value={selectedValue || undefined}
              placeholder="Enter technology"
              treeNodeFilterProp="title"
              showArrow={false}
              treeData={
                modules && modules.length && this.renderChildren(modules)
              }
              onSelect={this.onChange}
            />
            <img
              onClick={this.onSearchEvent}
              src={isMobile ? MobileSearch.src : Search.src}
            />
          </FormGroup> */
          <div className="main-menu-wrapper">
            <BrowserView viewClassName="navbar-link-wrapper">
              <Nav className="navbar-link-wrapper">
                {/* <NavItem>
                  <Link href="/connect">
                    <a>Connect</a>
                  </Link>
                </NavItem> */}
                {isloggedIn && (
                  <NavItem>
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                  </NavItem>
                )}
                {!isloggedIn && (
                  <NavItem>
                    <Link href="/login">
                      <a>Sign in</a>
                    </Link>
                  </NavItem>
                )}
                {isloggedIn && (
                  <NavItem>
                    <Link href="/logout">
                      <a>Logout</a>
                    </Link>
                  </NavItem>
                )}
              </Nav>
            </BrowserView>
          </div>
        ) : (
          <Row>
            {isBrowser && (
              <Col
                xs={12}
                sm={12}
                md={7}
                lg={7}
                xl={7}
                className="search-block text-center"
                style={{ marginLeft: "300px" }}
              >
                <FormGroup
                  className="search-box-wrapper"
                  // style={{
                  //   position: "absolute",
                  //   top: "50%",
                  //   left: "45%",
                  //   width: "100%",
                  // }}
                >
                  {/* <a href="#" style={{ position: "relative", left: "-42%" }}>
                    <img src={prevArrow} alt="" />
                  </a> */}

                  <TreeSelect
                    style={{
                      fontWeight: "bolder",
                      width: "95.2%",
                      fontSize: "13px",
                    }}
                    showSearch
                    value={this.state.searchValue || undefined}
                    placeholder={
                      isMobile
                        ? "Enter technology or service"
                        : "Enter software, hardware or service category and we will find the right fit for you!"
                    }
                    showArrow={false}
                    treeNodeFilterProp="title"
                    treeData={
                      modules && modules.length && this.renderChildren(modules)
                    }
                    onSelect={this.onChange}
                  />
                  <div style={{ marginLeft: "10px", marginTop: "5px" }}>
                    <Image
                      className={`${isMobile ? "mobileSearchBar" : ""}`}
                      loader={myImageLoader}
                      width={25}
                      height={25}
                      onClick={this.onSearchEvent}
                      src={isMobile ? MobileSearch.src : Search.src}
                      alt="searchIcon"
                      placeholder="searchIcon"
                    />
                  </div>
                  {/* <a href="#" style={{ position: "relative", right: "-28%" }}>
                    <img src={nextArrow} alt="" />
                  </a> */}
                </FormGroup>
                {/* aboutValue */}
              </Col>
            )}
          </Row>
        )}

        {/* for mobile view */}

        <Row className="search-block-container">
          {isMobile && (
            <Col xs={12} sm={12} md={7} lg={7} xl={7} className="search-block">
              <p
                style={{
                  marginTop: "60px",
                  textAlign: "center",
                  textTransform: "capitalize",
                  color: "#000",
                }}
              >
                Find the right technology for your enterprise
              </p>
              <FormGroup
                className="search-box-wrapper"
                style={{
                  width: "100%",
                  marginTop: "60px",
                }}
              >
                {/* <a href="#" style={{ marginLeft: "-30px" }}>
                  <img src={prevArrow} alt="" />
                </a> */}

                <TreeSelect
                  style={{ fontSize: "0.8rem" }}
                  showSearch
                  value={this.state.searchValue || undefined}
                  placeholder={
                    isMobile
                      ? "Enter software, hardware or service"
                      : "Search..."
                  }
                  showArrow={false}
                  treeNodeFilterProp="title"
                  treeData={
                    modules && modules.length && this.renderChildren(modules)
                  }
                  onSelect={this.onChange}
                />
                <Image
                  className={`${isMobile ? "mobileSearchBar" : ""}`}
                  loader={myImageLoader}
                  onClick={this.onSearchEvent}
                  src={isMobile ? MobileSearch.src : Search.src}
                  width={25}
                  height={25}
                  alt="searchIcon"
                  layout="raw"
                  placeholder="searchIcon2"
                  style={{ objectFit: "contain" }}
                />
                {/* <a href="#" style={{ marginRight: "-30px" }}>
                  <img src={nextArrow} alt="" />
                </a> */}
              </FormGroup>
              {/* aboutValue */}
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm } = state;
  const { user, loggedIn } = authentication;
  return { user, confirm, isloggedIn: loggedIn };
};

const actionCreators = {
  showError: alertActions.error,
  clears: crudActions._clear,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(connect(mapStateToProps, actionCreators)(SearchBox));
