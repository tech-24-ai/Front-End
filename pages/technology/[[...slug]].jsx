import React from "react";

import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import {
  crudActions,
  editFlowActions,
  advancedModuleActions,
  alertActions,
  loaderActions,
} from "../../_actions";
import { crudService } from "../../_services/crud.service";
import { Container, Button, ButtonGroup, Row, Col } from "reactstrap";
import "antd/dist/antd.css";
import {
  BrowserView,
  MobileView,
  isMobile
} from "react-device-detect";
import CustomBreadcrumb from "../../components/breadcrumbs";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Modal } from "antd";
import NestedSearchModule from "../../components/nestedSearchModule";
import Head from "next/head";

class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "",
      categoryId: "",
      moduleId: "",
      moduleDefinition: "",
      isAllSelected: false,
      technoSelected: false,
      technology: "",
      search: false,
      options: [],
      isAnyChanged: false,
      isAdvanced: "",
      isToggle: false,
      meta: {
        title: "",
        description: "",
        keywords: "",
      },
      childrenIdList: [],
    };
  }

  handleRouteChange = () => {
    this.bindSessionData();
  };

  bindSessionData = async () => {
    let asPath = this.props.router.asPath;
    asPath = asPath.slice(1).split("/");
    const categoryId = sessionStorage.getItem("categoryId");
    if (!categoryId && asPath.length == 1) {
      this.props.router.push("business_applications");
      // this.fetchCategoryByName('business_applications');
    } else if (!categoryId && asPath.length == 2) {
      this.fetchCategoryByName(asPath[1]);
    } else if (!categoryId && asPath.length >= 3) {
      // this.fetchSlugModule(asPath[2]);
      this.fetchModuleParentBySlug(asPath[asPath.length - 1]);
    } else {
      this.setState({ categoryId: categoryId });
    }
    if (sessionStorage.getItem("childrenIds")) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      childrenIds.forEach((element) => {
        this.setState({ moduleId: element });
      });
    }
    const bgColor = sessionStorage.getItem("bgColor");
    this.setState({ bgColor: bgColor });
  };

  componentDidMount() {
    // let asPath = this.props.router.asPath;
    // asPath = asPath.slice(1).split("/");
    // if (asPath && asPath.length == 0 && !sessionStorage.getItem("categoryId")) {
    //   return this.onBackClick();
    // }
    this.bindSessionData();
    if (this.props && this.props.router) {
      this.props.router.events.on("routeChangeStart", this.handleRouteChange);
    }

    this.props.getAllCrud("page", "page/guideline");
  }

  componentWillUnmount() {
    if (this.props && this.props.router) {
      this.props.router.events.off("routeChangeStart", this.handleRouteChange);
    }
  }

  // fetchSlugModule = async (slug) => {
  //   console.log("module_slug", slug);
  //   const filterData = {
  //     seo_url_slug: slug,
  //     status: true,
  //     page: "technology",
  //   };
  //   await crudService
  //     ._getAll("module/parent", filterData)
  //     .then(async (result) => {
  //       if (result.data && result.data.length) {
  //         const { category_id, id, seo_url_slug, parent_id } = result.data[0];
  //         if (parent_id) {
  //           this.setState({
  //             childrenIdList: [id, ...this.state.childrenIdList],
  //           });
  //         } else {
  //           sessionStorage.setItem("categoryId", category_id);
  //           sessionStorage.setItem("moduleId", id);
  //           sessionStorage.setItem(
  //             "childrenIds",
  //             JSON.stringify(this.state.childrenIdList)
  //           );
  //           this.setState({ categoryId: category_id });
  //           this.setState({ moduleId: id });
  //           await crudService._get("categories", category_id).then((result) => {
  //             if (result.data) {
  //               this.setState({ bgColor: result.data.bg_color });
  //               sessionStorage.setItem("bgColor", result.data.bg_color);
  //             }
  //           });
  //         }
  //       } else {
  //         this.onBackClick();
  //       }
  //     });
  //   this.setState({ isAnyChanged: true });
  // };
  fetchModuleParentBySlug = async (slug) => {
    console.log("module_slug", slug);
    const filterData = {
      seo_url_slug: slug,
      status: true,
      page: "technology",
    };
    await crudService
      ._getAll("module/parent", filterData)
      .then(async (result) => {
        if (result.data && result.data.length) {
          this.extractParent(result.data[0]);
        } else {
          this.onBackClick();
        }
      });
    this.setState({ isAnyChanged: true });
  };

  extractParent = async (module) => {
    const { category_id, id, parent, name } = module;
    if (parent) {
      this.setState({
        childrenIdList: [id, ...this.state.childrenIdList],
      });
      this.extractParent(parent);
    } else {
      sessionStorage.setItem("categoryId", category_id);
      sessionStorage.setItem("moduleId", id);
      sessionStorage.setItem(
        "childrenIds",
        JSON.stringify(this.state.childrenIdList)
      );
      this.setState({ categoryId: category_id });
      this.setState({ moduleId: id });
      await crudService._get("categories", category_id).then((result) => {
        if (result.data) {
          this.setState({ bgColor: result.data.bg_color });
          sessionStorage.setItem("bgColor", result.data.bg_color);
        }
      });
    }
  };

  fetchCategoryByName = async (name) => {
    const filterData = {
      category_name: name.replace(/_/g, " "),
    };

    await crudService._getAll("categories", filterData).then(async (result) => {
      if (result.data && result.data.length) {
        const { id, bg_color } = result.data[0];
        sessionStorage.setItem("categoryId", id);
        sessionStorage.removeItem("moduleId");
        this.setState({ moduleId: "" });
        this.setState({ categoryId: id });
        this.setState({ bgColor: bg_color });
        sessionStorage.setItem("bgColor", bg_color);
      } else {
        this.onBackClick();
      }
    });
    this.setState({ isAnyChanged: true });
    //console.log("fetchCategoryByName",isAnyChanged)
  };

  onBackClick = () => {
    Router.push({
      pathname: "/",
    });
  };

  checkModuleSelected = () => {
    if (this.state.isAllSelected) {
      return true;
    } else {
      return false;
    }
  };

  onNextClick = () => {
    let moduleId;
    if (JSON.parse(sessionStorage.getItem("childrenIds")).length) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      childrenIds.forEach((element) => {
        moduleId = element;
      });
    } else {
      moduleId = sessionStorage.getItem("moduleId");
    }
    if (moduleId) {
      sessionStorage.setItem("isAdvanced", "true");
      this.props.advancedModuleSet({ value: "false" });
      this.setState({
        isToggle: true,
      });
      // Router.push({
      //   pathname: "/advanced",
      // });
    } else {
      this.props.showError("Please select an option to proceed to next screen");
    }
  };

  iconClick = () => {
    this.setState(!search);
  };

  setTechnoSelected = (bool) => {
    if (!this.checkModuleSelected()) {
      this.props.showError("Please select an option to proceed to next screen");
    } else {
      this.setState({ technoSelected: bool }, () => {
        if (!this.checkModuleSelected() && this.state.technoSelected) {
          this.props.showError(
            "Please select an option to proceed to next screen"
          );
        } else if (
          this.checkModuleSelected() &&
          this.state.technoSelected &&
          bool
        ) {
          this.onNextClick();
        }
      });
    }
  };

  nextClick = () => {
    const slugs = JSON.parse(sessionStorage.getItem("slugs"));
    // let pathname = "/steps";
    let pathname = "/questions";
    this.props.showLoader();
    slugs &&
      slugs.forEach((e) => {
        pathname = `${pathname}/${e}`;
      });
    Router.push({
      pathname: pathname,
    });

    const data = {
      isEdit: false,
    };
    this.props.editFlow(data);
  };

  modalCancelClick = () => {
    this.setState({
      isToggle: false,
    });
  };

  handleMeta = (e) => {
    this.setState({ meta: e });
  };

  render() {
    const { pages } = this.props;
    const { isToggle, bgColor, isAllSelected, meta, isAnyChanged } = this.state;
    return (
      <section className="datacenter-wrapper technology-page-section">
        <Container>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
            />
            <meta name="title" content={meta.title} />
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
          </Head>
          <div>
            <BrowserView>
              <div>
                <CustomBreadcrumb
                  isAnyChanged={isAnyChanged}
                  onChange={() => this.setState({ isAnyChanged: false })}
                  updateNote={(about) =>
                    this.setState({ moduleDefinition: about })
                  }
                  setMeta={(e) => this.handleMeta(e)}
                />

                <Row>
                  <Col sm={5}>
                    {sessionStorage.getItem("categoryId") ? (
                      <NestedSearchModule
                        isAnyChanged={isAnyChanged}
                        onChange={() => {
                          //console.log("NestedSearchModule",isAnyChanged)
                          this.setState({ isAnyChanged: true });
                        }}
                        isAllSelected={(e) => {
                          //console.log("NestedSearchModule",isAllSelected, e)
                          this.setState({ isAllSelected: e });
                        }}
                      />
                    ) : null}

                    <div className="button-wrapper">
                      <ButtonGroup>
                        <div
                          type="button"
                          // color="secondary"
                          className="custom-btn with-bg"
                          onClick={() => this.onBackClick()}
                        >
                          Back
                        </div>
                        <div
                          type="button"
                          // color="secondary"
                          className="custom-btn with-bg"
                          hidden={!isAllSelected}
                          onClick={() => this.setTechnoSelected(true)}
                        >
                          Next
                        </div>
                      </ButtonGroup>
                    </div>
                  </Col>
                  {this.state.moduleDefinition && (
                    <Col sm={7}>
                      <div
                        style={{
                          width: "550px",
                          minHeight: "50px",
                          padding: "10px",
                          objectFit: "contain",
                          marginLeft: "6rem",
                        }}
                      >
                        <h4>Technology Overview</h4>
                        {this.state.moduleDefinition
                          ? this.state.moduleDefinition
                          : "Definition not found"}
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </BrowserView>
          </div>

          <MobileView>
            <div className="datacenter-block">
              <CustomBreadcrumb
                isAnyChanged={isAnyChanged}
                onChange={() => {
                  //console.log("CustomBreadcrumb",isAnyChanged)
                  this.setState({ isAnyChanged: false });
                }}
                updateNote={(about) => {
                  //console.log("CustomBreadcrumb",isAnyChanged)
                  this.setState({ moduleDefinition: about });
                }}
                setMeta={(e) => this.handleMeta(e)}
              />
              <div className="datacenter-content">
                <div className="input-searchbox">
                  <div className="select-searchbox">
                    <div className="sub-title">
                      <h5>Select Technology</h5>
                    </div>

                    <NestedSearchModule
                      isAnyChanged={isAnyChanged}
                      onChange={() => {
                        //console.log("NestedSearchModule",isAnyChanged)
                        this.setState({ isAnyChanged: true });
                      }}
                      isAllSelected={(e) => {
                        //console.log("NestedSearchModule",e)
                        this.setState({ isAllSelected: e });
                      }}
                    />
                    {this.state.moduleDefinition && (
                      <div
                        style={{
                          marginTop: "3rem",
                        }}
                      >
                        <h4>Technology Overview</h4>
                        {this.state.moduleDefinition
                          ? this.state.moduleDefinition
                          : "Definition not found"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="site-btn margin">
                  <Button
                    className={`back-btn`}
                    onClick={() => this.onBackClick()}
                  >
                    Back
                  </Button>
                  <Button
                    className={`next-btn`}
                    hidden={!isAllSelected}
                    onClick={() => this.setTechnoSelected(true)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </MobileView>

          {isToggle && (
            <Modal
              centered={true}
              visible={isToggle}
              title={pages && pages.name}
              // onOk={this.nextClick}
              onCancel={this.modalCancelClick}
              transitionName="none"
              maskTransitionName="none"
              maskClosable={false}
              className="important-info-modal"
              width={isMobile ? "95%" : "75%"}
              footer={[
                <Button
                  className="okButton"
                  key="submit"
                  type="primary"
                  onClick={this.nextClick}
                >
                  Accept
                </Button>,
                <Button
                  className="okButton"
                  key="submit"
                  type="primary"
                  onClick={this.modalCancelClick}
                >
                  Decline
                </Button>,
              ]}
            >
              <div
                className="important-info-content"
                dangerouslySetInnerHTML={{ __html: pages && pages.html }}
              ></div>
            </Modal>
          )}
        </Container>
        {/* <BodyBackgroundColor color={bgColor && bgColor} /> */}

        <style global jsx>{`
          @media (max-width: 1440px) {
            .ant-modal-content {
              width: 100%;
              margin: auto;
            }
            .ant-modal-title {
              color: #191970;
            }
            .ant-modal-content .okButton {
              border-radius: 2.5px;
              border: solid 0.5px #191970;
              background-color: transparent;
              color: #191970;
              width: 35%;
            }
            .ant-modal-close-x {
              width: 30px;
              height: 30px;
              line-height: normal;
              color: #272727;
            }
            .ant-modal-footer {
              text-align: center !important;
            }
          }
        `}</style>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { authentication, confirm, advancedModule, category, pages } = state;
  const { user } = authentication;
  return {
    user,
    confirm,
    advancedModule,
    category,
    pages,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  showError: alertActions.warning,
  getData: crudActions._get,
  editFlow: editFlowActions._addData,
  advancedModuleSet: advancedModuleActions._addData,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(connect(mapStateToProps, actionCreators)(Modules));
