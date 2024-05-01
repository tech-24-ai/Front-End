import React from "react";
import { connect } from "react-redux";
import { alertActions } from "../../_actions";
import { Modal } from "antd";
import ErrorImage from "../../public/images/error.svg";
import WarningImage from "../../public/images/warning.svg";
import SuccessIcon from "../../public/images/successIcon.svg";
import Router, { withRouter } from "next/router";
import { isMobile, isBrowser } from "react-device-detect";

class AlertComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onDismiss = () => {
    const { alert, router } = this.props;
    this.props.clear();

    // if (alert.type === "danger" && router.pathname === "/steps") {
    //   Router.push("/");
    // }

    if (alert.type === "danger" && alert.message === "Result not found!") {
      Router.push("/");
    }
  };

  render() {
    const { alert } = this.props;
    let visible = false;
    if (Object.keys(alert).length) {
      visible = true;
    }

    // if (process.browser) {
    //     window.setTimeout(() => {
    //         this.props.clear();
    //     }, 5000)
    // }
    let iconImage;
    switch (alert.type) {
      case "success":
        iconImage = SuccessIcon;
        break;
      case "warning":
        iconImage = WarningImage;
        break;
      case "danger":
        iconImage = ErrorImage;
        break;
      default:
        iconImage = "";
        break;
    }

    return (
      <React.Fragment>
        {isBrowser && visible && (
          <Modal
            centered={true}
            visible={visible}
            onOk={this.onDismiss}
            onCancel={this.onDismiss}
            footer={null}
            transitionName="none"
            maskTransitionName="none"
            style={{ textAlign: "center" }}
          >
            <div className={alert.type}>
              {iconImage && <img className="icon" src={iconImage.src} />}
              <h3>{alert.title}</h3>
            </div>
            {alert.message}
          </Modal>
        )}

        {isMobile && visible && (
          <Modal
            centered={true}
            visible={visible}
            onOk={this.onDismiss}
            onCancel={this.onDismiss}
            transitionName="none"
            maskTransitionName="none"
            style={{
              textAlign: "center",
              backgroundColor: "rgba(248, 248, 248, 0.92) !important",
            }}
            footer={[
              <span key="submit" onClick={this.onDismiss}>
                Ok
              </span>,
            ]}
          >
            <div className={alert.type}>
              <h3>Alert !</h3>
              <h3>{alert.title}</h3>
            </div>
            {alert.message}
          </Modal>
        )}
        {visible && (
          <style global jsx>{`
            @media (max-width: 1440px) {
              .ant-modal-content {
                width: 85% !important;
                height: auto !important;
                background-color: rgba(248, 248, 248, 0.92) !important;
                border-radius: 20px !important;
                margin: auto !important;
              }
              .ant-modal-close-x {
                display: none;
              }
              .ant-modal-body {
                border-bottom: 1px solid;
                color: #868181;
                font-size: 13px;
              }
              .ant-modal-footer {
                text-align: center !important;
                justify-content: center;
              }
              .ant-modal-footer span {
                font-weight: bold;
                color: #007aff;
              }
            }
          `}</style>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert,
    state,
  };
};

const actionCreators = {
  clear: alertActions.clear,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(AlertComponent)
);
