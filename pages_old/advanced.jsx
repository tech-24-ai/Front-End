import React from "react";

import Router, { withRouter } from "next/router";
import { Container, ButtonGroup, Button } from "reactstrap";
import RadioBox from "../components/form/radioBox";
import { connect } from "react-redux";
import {
  editFlowActions,
  advancedModuleActions,
  crudActions,
  alertActions,
} from "../_actions";
import CustomBreadcrumb from "../components/breadcrumbs";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";

import { Modal } from "antd";

import { BrowserView, MobileView } from "react-device-detect";
class AdvancedSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "",
      isAdvanced: "",
      isToggle: false,
    };
  }

  onNextClick = () => {
    if (!this.state.isAdvanced) {
      this.props.showError("Please select an option to proceed to next screen");
    } else {
      this.setState({
        isToggle: true,
      });
    }
  };

  nextClick = () => {
    Router.push({
      pathname: "/steps",
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

  onBackClick = () => {
    const { categoryId } = this.state;
    Router.push({
      pathname: "/technology",
      query: { categoryId: categoryId },
    });
  };

  componentDidMount() {
    this.props.getCrud("page", "page/guideline");

    const categoryId = sessionStorage.getItem("categoryId");
    this.setState({ categoryId: categoryId });
    const moduleId = sessionStorage.getItem("moduleId");
    this.setState({ moduleId: moduleId });
    const isAdvanced = sessionStorage.getItem("isAdvanced");
    this.setState({ isAdvanced: isAdvanced });
    const bgColor = sessionStorage.getItem("bgColor");
    this.setState({ bgColor: bgColor });
  }

  onChange = (event) => {
    this.setState({
      isAdvanced: event.value,
    });
    console.log("event.value", event.value);
    sessionStorage.setItem("isAdvanced", event.value);
    this.props.advancedModuleSet({ value: event.value });
  };

  render() {
    const { pages } = this.props;
    const { isToggle, bgColor } = this.state;
    const options = [
      { name: "Basic Search", id: "false", isSearch: true },
      { name: "Advanced Search", id: "true", isSearch: true },
    ];

    return (
      <section>
        <Container>
          <CustomBreadcrumb />

          <BrowserView>
            <div className="button-wrapper advanced-wrapper">
              <RadioBox
                options={options}
                label={options.name}
                value={this.state.isAdvanced}
                onChange={this.onChange}
              />
            </div>
            <div className="button-wrapper">
              <ButtonGroup>
                <Button
                  type="button"
                  color="secondary"
                  onClick={this.onBackClick}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  color="secondary"
                  onClick={this.onNextClick}
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </BrowserView>

          <MobileView>
            <div className="datacenter-block">
              <div className="datacenter-content">
                <div className="input-searchbox">
                  <div className="select-searchbox">
                    <RadioBox
                      options={options}
                      label={options.name}
                      value={this.state.isAdvanced}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="site-btn margin">
                  <Button
                    type="button"
                    className={`back-btn`}
                    color="secondary"
                    onClick={this.onBackClick}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className={`next-btn`}
                    color="secondary"
                    onClick={this.onNextClick}
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

const actionCreators = {
  editFlow: editFlowActions._addData,
  advancedModuleSet: advancedModuleActions._addData,
  getCrud: crudActions._getAll,
  showError: alertActions.warning,
};

const mapStateToProps = (state) => {
  const { advancedModule, category, pages } = state;
  return {
    advancedModule,
    category,
    pages,
  };
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(AdvancedSelect)
);
