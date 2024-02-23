import React from "react";

import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import {
  crudActions,
  editFlowActions,
  advancedModuleActions,
} from "../_actions";
import { crudService } from "../_services/crud.service";
import { Container, Button, ButtonGroup, Row, Col } from "reactstrap";
import "antd/dist/antd.css";
import { BrowserView, MobileView } from "react-device-detect";
import CustomBreadcrumb from "../components/breadcrumbs";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { alertActions } from "../_actions";
import { Modal } from "antd";
import NestedSearchModule from "../components/nestedSearchModule";

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
    };
  }

  handleRouteChange = () => {
    this.bindSessionData();
  };

  bindSessionData = () => {
    const categoryId = sessionStorage.getItem("categoryId");
    this.setState({ categoryId: categoryId });
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
    this.bindSessionData();
    if (this.props && this.props.router) {
      this.props.router.events.on("routeChangeStart", this.handleRouteChange);
    }

    this.props.getAllCrud("page", "page/guideline");
  }

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
      sessionStorage.setItem("isAdvanced", "false");
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
    Router.push({
      pathname: "/questions",
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

  render() {
    const { pages } = this.props;
    const { isToggle, bgColor, isAllSelected } = this.state;
    // console.log("Route", this.props.router);
    // console.log("Router", Router);
    return (
      <section className="datacenter-wrapper">
        <Container>
          <div>
            <BrowserView>
              <div>
                <CustomBreadcrumb
                  isAnyChanged={this.state.isAnyChanged}
                  onChange={() => this.setState({ isAnyChanged: false })}
                  updateNote={(about) =>
                    this.setState({ moduleDefinition: about })
                  }
                />

                <Row>
                  <Col sm={5}>
                    <NestedSearchModule
                      onChange={() => this.setState({ isAnyChanged: true })}
                      isAllSelected={(e) => this.setState({ isAllSelected: e })}
                    />
                    <div className="button-wrapper">
                      <ButtonGroup>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={() => this.onBackClick()}
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={() => this.setTechnoSelected(true)}
                        >
                          Next
                        </Button>
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
                isAnyChanged={this.state.isAnyChanged}
                onChange={() => this.setState({ isAnyChanged: false })}
                updateNote={(about) =>
                  this.setState({ moduleDefinition: about })
                }
              />
              <div className="datacenter-content">
                <div className="input-searchbox">
                  <div className="select-searchbox">
                    <div className="sub-title">
                      <h5>Select Technology</h5>
                    </div>

                    <NestedSearchModule
                      onChange={() => this.setState({ isAnyChanged: true })}
                      isAllSelected={(e) => this.setState({ isAllSelected: e })}
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
                    onClick={() => this.setTechnoSelected(true)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </MobileView>

          <Modal
            centered={true}
            visible={isToggle}
            title={pages && pages.name}
            onOk={this.nextClick}
            onCancel={this.modalCancelClick}
            transitionName="none"
            maskTransitionName="none"
            footer={[
              <Button
                className="okButton"
                key="submit"
                type="primary"
                onClick={this.nextClick}
              >
                OK
              </Button>,
            ]}
          >
            <div
              dangerouslySetInnerHTML={{ __html: pages && pages.html }}
            ></div>
          </Modal>
        </Container>
        <BodyBackgroundColor color={bgColor && bgColor} />

        <style global jsx>{`
          @media (max-width: 575px) {
            .ant-modal-content {
              width: 80%;
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
              width: 25px;
              height: 25px;
              line-height: normal;
              color: #272727;
              display: none;
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
};

export default withRouter(connect(mapStateToProps, actionCreators)(Modules));
