import React, { Component } from "react";
import { Input, Label, Button } from "reactstrap";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import { editFlowActions } from "../_actions";
import Link from "next/link";
import Pen from "../public/images/datacenter/pen.svg";
class Summary extends Component {
  constructor(props) {
    super(props);
  }

  handleEdit = (stepId) => {
    Router.push({
      pathname: "/questions",
    });
    const data = {
      stepId: stepId,
      isEdit: true,
    };
    this.props.editFlow(data);
  };

  render() {
    const { steps, questionData, products } = this.props;
    let tabsDatas = [];
    if (steps && steps != "null" && typeof steps != "string") {
      steps.map((step) => {
        if (step && step.questions && step.questions.length) {
          step.questions.map((question) => {
            tabsDatas.push(question);
          });
        }
      });
    }

    return (
      <div className="select-category-block summary-wrapper">
        <div className="summary-dec-btn">
          <p>
            We found <span> {products && products.length} </span> products that
            match your selection criteria
          </p>
        </div>
        <div className="summary-block">
          <h5 className="summary-title button-dark-wrapper">
            Summary{" "}
            <div
              style={{ marginLeft: "10px" }}
              className="custom-btn with-bg"
              onClick={this.props.action}
            >
              View Report
            </div>
          </h5>
          <div className="summary-content-block">
            <div className="category-checkbox">
              <Input type="checkbox" id="editSummary" />
              <Label for="editSummary" className="custom-control-label">
                Environment
              </Label>
              <a onClick={() => this.handleEdit(1)} className="pen-icon">
                <img src={Pen.src} />
              </a>
              <ul>
                {tabsDatas &&
                  tabsDatas.map((item) => {
                    let filterQuestion = questionData.filter(
                      (data) => data.question_id == item.id
                    );
                    let value = [];
                    if (filterQuestion.length != 0 && filterQuestion[0].label) {
                      value = filterQuestion[0].label;
                    }
                    return (
                      <div>
                        <li>
                          <span></span>
                          <h6>
                            {item.name}
                            <span>
                              {" "}
                              -{" "}
                              {value
                                .map((data) => {
                                  let optionValue = data.name;

                                  if (
                                    data.hasOwnProperty("subOptions") &&
                                    data.subOptions.length
                                  ) {
                                    optionValue = `${optionValue} : ${data.subOptions
                                      .map((obj) => obj.name)
                                      .join(", ")}`;
                                  }

                                  if (
                                    data.hasOwnProperty("priority") &&
                                    data.priority.length
                                  ) {
                                    optionValue = `${optionValue} / ${data.priority
                                      .map((obj) => obj.value)
                                      .join(", ")}`;
                                  }
                                  return optionValue;
                                })
                                .join(", ")}
                            </span>
                          </h6>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { questionData, steps } = state;
  return {
    questionData,
    steps,
  };
};

const actionCreators = {
  editFlow: editFlowActions._addData,
};

export default withRouter(
  connect(mapStateToProps, actionCreators, null, { forwardRef: true })(Summary)
);
