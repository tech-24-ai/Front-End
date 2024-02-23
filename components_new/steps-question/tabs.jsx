import React from "react";
import { connect } from "react-redux";
import { isBrowser, isMobile } from "react-device-detect";

class StepQuestions extends React.PureComponent {
  toggle = (tab) => {
    this.props.toggleTab(tab);
  };

  render() {
    const { questions, tabsDatas, activeTab, editFlow } = this.props;
    let width = 100 / tabsDatas.length;

    let tabClass = "";

    if (tabsDatas && tabsDatas.length) {
      return (
        <React.Fragment>
          {isBrowser && (
            <div className="nav">
              {tabsDatas &&
                tabsDatas.map((question, index) => {
                  let tabIndex = index + 1;
                  // let tabIndex = tabsDatas.findIndex((tab) => tab.id == question.id) + 1;

                  if (activeTab == tabIndex) {
                    tabClass = "active";
                  } else {
                    if (activeTab > tabIndex) {
                      tabClass = "done";
                    } else {
                      tabClass = "";
                    }
                  }

                  // if(editFlow.isEdit){
                  //     tabClass = 'done'
                  // }

                  return (
                    <div
                      className="nav-tabs"
                      key={question.id}
                      style={{ width: `${width}%` }}
                    >
                      <div
                        className={`nav-link ${tabClass}`}
                        onClick={() => {
                          this.toggle(tabIndex);
                        }}
                      >
                        <span
                          className={
                            editFlow.isEdit && activeTab == tabIndex
                              ? "span-border"
                              : ""
                          }
                        >
                          {tabIndex}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {isMobile && (
            <div className="progress-menu">
              {tabsDatas &&
                tabsDatas.map((question, key) => {
                  let tabIndex = key + 1;
                  // let tabIndex = tabsDatas.findIndex((tab) => tab.id == question.id) + 1;
                  if (activeTab == tabIndex) {
                    tabClass = "active";
                  } else {
                    if (activeTab > tabIndex) {
                      tabClass = "done";
                    } else {
                      tabClass = "";
                    }
                  }
                  // if(editFlow.isEdit){
                  //     tabClass = 'done'
                  // }
                  return (
                    <span
                      key={key}
                      className={tabClass}
                      onClick={() => {
                        this.toggle(tabIndex);
                      }}
                    >
                      {tabIndex}
                    </span>
                  );
                })}
            </div>
          )}
        </React.Fragment>
      );
    }
    return "";
  }
}

const mapStateToProps = () => {
  return {};
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators, null, {
  forwardRef: true,
})(StepQuestions);
