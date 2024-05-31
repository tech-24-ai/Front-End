import React from "react";
import { connect } from "react-redux";
import { TabContent, TabPane, Row, Col } from "reactstrap";
import {
  crudActions,
  questionActions,
  currentQuestionActions,
  editFlowActions,
} from "../../_actions";
import RadioBox from "../../components/form/radioBox";
import CheckBox from "../../components/form/checkBox";
import SelectBox from "../../components/form/select";
import MultiRadio from "../../components/form/multiRadio";
import QuestionTooltip from "../form/questionTooltip";

let currentQuestionObject = {};

class StepQuestionTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: [],
      refresh: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    let form = [];
    if (props.questionData && props.questionData.length) {
      props.questionData.forEach((element) => {
        form[element.question_id] = element.label;
      });
    }
    newState.form = form;
    return newState;
  }

  onChange = (data) => {
    const { questionData, currentQuestion } = this.props;
    // // Not Sure Option --> Other(14), Not required (93), Not Sure (113), Not applicable (159), No preference (191), No preferences (195), Not Sure/Not Applicable (717), All of the above (920), All of the above options(1035)
    // var notSureOption = [14, 93, 113, 159, 191, 195, 717, 920, 1035];

    let value;
    let label;
    // Data Set in Redux

    let tabsDatas = [];
    if (this.props.steps && this.props.steps.length) {
      this.props.steps.map((step) => {
        if (step && step.questions && step.questions.length) {
          step.questions.map((question) => {
            tabsDatas.push(question);
          });
        }
      });
    }
    const currentQuestionData = tabsDatas.filter(
      (e) => e.id == data.question_id
    )[0];

    let filterQuestion = questionData.filter(
      (item) => item.question_id == data.question_id
    );
    let questionExists = [];
    if (filterQuestion.length != 0) {
      questionExists = filterQuestion[0];
    }

    if (
      data.option_type &&
      questionExists.question_id &&
      "value" in questionExists
    ) {
      value = questionExists.value;
      label = questionExists.label;
      const optionsExist = label.some((item) => item.name == data.label);
      if (optionsExist) {
        const getSubOptions = label.filter((item) => item.name == data.label)[0]
          .subOptions;
        let optionsLength = 0;
        if (getSubOptions != undefined) {
          optionsLength = getSubOptions.length;
        }

        const index = label.findIndex((x) => x.name == data.label);
        if (optionsLength == 0) {
          label.splice(index, 1);
        }
      } else {
        let labelObject;
        if (data.subOptionLength != 0 && data.option_type) {
          labelObject = {
            name: data.label,
            value: data.value,
            subOptions: [],
            priority: [],
          };
        } else {
          labelObject = {
            name: data.label,
            value: data.value,
          };
        }

        const notSureIndex = label.findIndex((x) => x.value == 0);
        if (
          (currentQuestionData.option_type == "multi_radiobox" ||
            currentQuestionData.option_type == "checkbox") &&
          (currentQuestionData.isNotSure || data.value == 0)
        ) {
          // check notSure option
          if (data.value == 0) {
            label = [labelObject];
          } else {
            if (notSureIndex !== -1) {
              label.splice(notSureIndex, 1);
            }
            label = [...label, labelObject];
          }
        } else {
          label = [...label, labelObject];
        }
      }
    } else {
      let labelObject;
      if (data.subOptionLength != 0 && data.option_type) {
        labelObject = {
          name: data.label,
          value: data.value,
          subOptions: [],
          priority: [],
        };
      } else {
        labelObject = { name: data.label, value: data.value };
      }
      label = [labelObject];
    }

    // object already exists code start
    let index = questionData.findIndex(
      (x) => x.question_id == data.question_id
    );

    // here you can check specific property for an object whether it exist in your array or not
    let questionDataArray = {
      question_id: data.question_id,
      name: data.name,
      label,
      value,
    };
    if (label.length) {
      if (index === -1) {
        questionData.push(questionDataArray);
        currentQuestion.push((data.question_id = data.question_id));
      } else {
        questionData[index] = questionDataArray;
      }
      // object already exists code end
    } else {
      questionData.splice(index, 1);
    }
    this.props.setQuestionStep(questionData);
    this.props.currentQuestionSet(currentQuestion);
    this.setState({
      refresh: true,
    });
    currentQuestionObject = data;
  };

  onSubOptionChange = (subData, isMultiRadio = false) => {
    const { questionData, activeTab } = this.props;

    let label = questionData[activeTab - 1].label;
    let exists = label.some(
      (item) =>
        item.subOptions &&
        item.subOptions.some((sub) => sub.name == subData.label)
    );
    let subOptionObject = [];
    if (exists) {
      const findCurrentOption = label.filter(
        (item) => item.name == subData.parent_label
      )[0];
      const index = findCurrentOption.subOptions.findIndex(
        (x) => x.name == subData.label
      );
      findCurrentOption.subOptions.splice(index, 1);
    } else {
      let subOptionArray = {
        name: subData.label,
        value: subData.value,
      };
      subOptionObject = label.filter(
        (item) => item.name == subData.parent_label
      );
      if (isMultiRadio) {
        subOptionObject[0].subOptions = [subOptionArray];
      } else {
        subOptionObject[0].subOptions = [
          ...subOptionObject[0].subOptions,
          subOptionArray,
        ];
      }
    }

    this.props.setQuestionStep(questionData);
  };

  onChangePriority = (data) => {
    const { questionData, activeTab } = this.props;
    let label = questionData[activeTab - 1].label;
    let priorityObject = label.find((item) => item.name == data.parent_label);
    let priorityArray = {
      name: data.label,
      value: data.value,
    };
    priorityObject.priority = [priorityArray];
    this.props.setQuestionStep(questionData);
    this.setState({
      refresh: true,
    });
  };

  getValidatonData = (buttonType) => {
    this.props.checkValidation(currentQuestionObject, buttonType);
    if (buttonType == "next") {
      currentQuestionObject = {};
    }
  };

  componentDidMount() {
    const { editFlow } = this.props;
    if (editFlow && !editFlow.isEdit) {
      this.props.clearQuestionStep();
      this.props.clearCurrentQuestionSet();
      this.props.clearEditFlow();
    }

    this.props.getAllCrud(
      "countries",
      "countries?orderBy=sort_order&orderPos=ASC",
      []
    );
    this.props.getAllCrud("industries", "industries", []);
  }

  render() {
    const { questions, activeTab, tabsDatas, countries, industries } =
      this.props;
    if (questions?.length) {
      return (
        <React.Fragment>
          <TabContent activeTab={activeTab}>
            {questions?.map((question, index) => {
              const isExist = question.options.some(
                (element) => element.id == 0
              );

              if (!isExist && question.isNotSure) {
                question.options.push({
                  id: 0,
                  name: "No Preferences/Not Applicable",
                  pivot: {
                    option_id: 0,
                    question_id: question.id,
                    sort_order: 0,
                  },
                  sub_options: [],
                });
              }
              // Not Sure Option --> Not required (93), Not Sure (113), Not applicable (159), No preference (191), No preferences (195), Not Sure/Not Applicable (717)
              const notSureOption = [93, 113, 159, 191, 195, 717];
              let optionArray = question.options.map((e) => {
                if (notSureOption.includes(e.id)) {
                  return {
                    ...e,
                    id: 0,
                  };
                }
                return e;
              });
              let tabIndex =
                tabsDatas.findIndex((tab) => tab.id == question.id) + 1;

              let checkValueArray = [];
              let subOptionValueArray = [];
              let priorityArray = {};
              let questionData = this.state.form[question.id];
              if (questionData) {
                questionData.map((item) => {
                  item?.subOptions?.map((sub) => {
                    subOptionValueArray.push(sub.value);
                  });

                  item?.priority?.map((p) => {
                    priorityArray[item.value] = p.value;
                  });
                });
                checkValueArray = questionData.map((data) => data.value);
              }

              return (
                <TabPane tabId={tabIndex} key={question.name}>
                  <Row>
                    <Col sm="12">
                      {question.option_type === "country_select" && (
                        <div>
                          <SelectBox
                            isClearable={true}
                            options={countries}
                            label={question.name}
                            notes={question.notes}
                            tooltip={question.name}
                            value={questionData && questionData[0].value}
                            onChange={this.onChange}
                            question_id={question.id}
                            name={question.name}
                            ref={question.id}
                            id={question.id}
                          />
                        </div>
                      )}
                      {question.option_type === "industry_select" && (
                        <div>
                          <SelectBox
                            isClearable={true}
                            options={industries}
                            label={question.name}
                            notes={question.notes}
                            tooltip={question.name}
                            value={questionData && questionData[0].value}
                            onChange={this.onChange}
                            question_id={question.id}
                            name={question.name}
                            id={question.id}
                          />
                        </div>
                      )}

                      {question.option_type === "select" && (
                        <div>
                          <SelectBox
                            isClearable={true}
                            options={optionArray}
                            label={question.name}
                            notes={question.notes}
                            tooltip={question.name}
                            value={questionData && questionData[0].value}
                            onChange={this.onChange}
                            question_id={question.id}
                            name={question.name}
                            id={question.id}
                          />
                        </div>
                      )}

                      {question.option_type === "radiobox" && (
                        <div>
                          <RadioBox
                            options={optionArray}
                            label={question.name}
                            notes={question.notes}
                            value={questionData && questionData[0].value}
                            onChange={this.onChange}
                            name={question.name}
                            id={question.id}
                          />
                        </div>
                      )}

                      {question.option_type === "checkbox" && (
                        <div>
                          <CheckBox
                            options={optionArray}
                            label={question.name}
                            notes={question.notes}
                            value={checkValueArray}
                            onChange={this.onChange}
                            subValue={subOptionValueArray}
                            onOptionChange={this.onSubOptionChange}
                            name={question.name}
                            id={question.id}
                          />
                        </div>
                      )}

                      {question.option_type === "multi_radiobox" && (
                        <div>
                          <MultiRadio
                            options={optionArray}
                            label={question.name}
                            notes={question.notes}
                            onChange={this.onChange}
                            onOptionChange={this.onSubOptionChange}
                            onChangePriority={this.onChangePriority}
                            value={checkValueArray}
                            subValue={subOptionValueArray}
                            priority={priorityArray}
                            name={question.name}
                            id={question.id}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </TabPane>
              );
            })}
          </TabContent>
        </React.Fragment>
      );
    }
    return "";
  }
}

const mapStateToProps = (state) => {
  const { steps, countries, industries, questionData, currentQuestion } = state;
  return {
    steps,
    countries,
    industries,
    questionData,
    currentQuestion,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  setQuestionStep: questionActions._addData,
  clearQuestionStep: questionActions._clear,
  currentQuestionSet: currentQuestionActions._addData,
  clearCurrentQuestionSet: currentQuestionActions._clear,
  clearEditFlow: editFlowActions._clear,
};

export default connect(mapStateToProps, actionCreators, null, {
  forwardRef: true,
})(StepQuestionTabContent);
