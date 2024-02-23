import React, { Fragment } from "react";
import Router, { withRouter } from "next/router";
import { connect } from "react-redux";
import {
  crudActions,
  alertActions,
  loaderActions,
  questionActions,
  currentQuestionActions,
  userActions,
} from "../../_actions";
import { Container, Row, Col, Button } from "reactstrap";
import StepQuestionTabs from "../../components/steps-question/tabs";
import StepQuestionTabContent from "../../components/steps-question/tabs-content";
import CustomBreadcrumb from "../../components/breadcrumbs";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { crudService } from "../../_services";
import { isBrowser, isMobile } from "react-device-detect";
import { Modal } from "antd";
import Link from "next/link";
import Head from "next/head";

class Steps extends React.PureComponent {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
    this.tabsRef = React.createRef();
    this.state = {
      moduleId: null,
      categoryId: null,
      isAdvanced: "",
      bgColor: "",
      activeTab: 1,
      totalTabs: 0,
      tabsDatas: [],
      error: true,
      prevTab: 1,
      showSummary: false,
      showSummaryButton: false,
      isClick: false,
      currentQuestionId: null,
      isToggle: false,
      isAnyChanged: false,
    };
    this.time = 0;
  }

  toggleTab = (value) => {
    const { activeTab } = this.state;
    if (activeTab !== value) {
      this.setState({
        activeTab: value,
        isClick: true,
      });
    }
  };

  checkCategory = () => {
    const categoryId = sessionStorage.getItem("categoryId");
    if (!categoryId) {
      Router.push("/");
    }
  };

  async componentDidMount() {
    this.time = new Date();
    const { steps } = this.props;
    const bgColor = sessionStorage.getItem("bgColor");
    this.setState({ bgColor: bgColor });
    const categoryId = sessionStorage.getItem("categoryId");
    this.setState({ categoryId: categoryId });
    const isAdvanced = sessionStorage.getItem("isAdvanced");
    this.setState({ isAdvanced: isAdvanced });

    let moduleId;
    if (
      !!sessionStorage.getItem("childrenIds") &&
      JSON.parse(sessionStorage.getItem("childrenIds")).length
    ) {
      let childrenIds = JSON.parse(sessionStorage.getItem("childrenIds"));
      childrenIds.forEach((element) => {
        moduleId = element;
      });
    } else if (sessionStorage.getItem("moduleId")) {
      moduleId = sessionStorage.getItem("moduleId");
    } else {
      let asPath = this.props.router.asPath;
      asPath = asPath.slice(1).split("/").slice(1);
      const filterData = {
        seo_url_slug: asPath[asPath.length - 1],
        status: true,
      };
      await crudService._getAll("modules", filterData).then(async (result) => {
        if (result.data && result.data.length) {
          const { category_id, id } = result.data[0];
          sessionStorage.setItem("categoryId", category_id);
          this.setState({ categoryId: category_id });
          moduleId = id;
          this.setState({ isAnyChanged: true });
          await crudService._get("categories", category_id).then((result) => {
            if (result.data) {
              this.setState({ bgColor: result.data.bg_color });
            }
          });
        } else {
          Router.push({
            pathname: "/",
          });
        }
      });
    }
    this.setState({ moduleId: moduleId });
    this.checkCategory();

    const filterData = {
      module_id: moduleId,
      is_advanced: isAdvanced == "true" ? 1 : 0,
    };

    this.props.getAllCrud("steps", "steps", filterData);

    let tabsDatas = [];
    if (steps && steps.length) {
      steps.forEach((step) => {
        if (step.questions && step.questions.length) {
          step.questions.map((question) => {
            tabsDatas.push(question);
          });
        }
      });
    }

    if (this.props.editFlow.isEdit && !this.state.isClick) {
      tabsDatas.some((tab, index) => {
        if (tab.step_id == this.props.editFlow.stepId) {
          this.setState({
            activeTab: index + 1,
          });
          return true;
        }
      });
    }
  }

  onBackClick = () => {
    this.childRef.current.getValidatonData("back");

    if (this.props.totalTabs == this.state.activeTab) {
      this.setState({
        showSummaryButton: false,
      });
    }
    if (this.state.activeTab == 1) {
      // Router.push({
      //   pathname: "/advanced",
      // });
      Router.push({
        pathname: "/technology",
      });
    }
  };

  onNextClick = () => {
    const { questionData, currentQuestion } = this.props;
    const { error } = this.state;
    this.childRef.current.getValidatonData("next");
    if (!error) {
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

      let questionDataArray = {
        question_id: tabsDatas[this.state.activeTab - 1].id,
        name: tabsDatas[this.state.activeTab - 1].name,
      };
      const index = questionData.findIndex(
        (x) => x.question_id == tabsDatas[this.state.activeTab - 1].id
      );

      // if (index === -1) {
      //   questionData.push(questionDataArray);

      //   currentQuestion.push(
      //     (tabsDatas[this.state.activeTab - 1].id =
      //       tabsDatas[this.state.activeTab - 1].id)
      //   );
      // }
    }
    if (questionData && questionData.length) {
      questionData[questionData.length - 1].start_date =
        this.time.toISOString();
      questionData[questionData.length - 1].end_date = new Date().toISOString();
    }
    this.time = new Date();
    this.props.setQuestionStep(questionData);
    this.props.currentQuestionSet(currentQuestion);
  };

  showErrorMessage = (buttonType) => {
    const { activeTab } = this.state;
    const { totalTabs } = this.props;
    if (buttonType == "back") {
      const { activeTab } = this.state;
      if (activeTab !== 1) {
        this.toggleTab(activeTab - 1);
      }
    } else {
      if (activeTab !== totalTabs) {
        this.toggleTab(activeTab + 1);
        if (totalTabs == activeTab + 1) {
          this.setState({
            showSummaryButton: true,
          });
        }
      }
    }
  };

  checkQuestionValidation = () => {
    const { questionData } = this.props;
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

    const currentQuestion = tabsDatas[this.state.activeTab - 1];

    let questionIds = [];
    if (questionData && questionData.length) {
      questionData.forEach((element) => {
        questionIds.push(element.question_id);
      });
    }

    if (
      currentQuestion.option_type == "multi_radiobox" &&
      questionIds.includes(currentQuestion.id)
    ) {
      let questionLabels = questionData.find(
        (e) => e.question_id == currentQuestion.id
      );
      let questionLabelValues = questionLabels.label.map((e) => e.value);
      let unselectedPriority = questionLabels.label
        .filter((e) => e.priority && e.priority.length == 0)
        .map((e) => e.value);
      let currentPriority = currentQuestion.options
        .filter((e) => e.have_priority == 1)
        .map((e) => e.id);
      if (
        !questionLabelValues.includes(0) &&
        questionLabels.label.length <
          currentQuestion.options.filter((e) => e.id > 0).length
      ) {
        return false;
      } else if (
        questionLabels.label.length > 1 &&
        questionLabelValues.includes(0)
      ) {
        return false;
      }

      // check priority selected or not
      if (unselectedPriority.find((e) => currentPriority.includes(e))) {
        return false;
      }
    }
    if (questionIds.includes(currentQuestion.id)) {
      return true;
    } else {
      return false;
    }
  };

  checkIsPriorityQuestion = () => {
    const { steps } = this.props;
    let tabsQuestions = [];
    if (steps && steps.length) {
      steps.map((step) => {
        if (step && step.questions && step.questions.length) {
          step.questions.map((question) => {
            tabsQuestions.push(question);
          });
        }
      });
    }

    const currentQuestion = tabsQuestions[this.state.activeTab - 1];

    if (
      currentQuestion &&
      currentQuestion.options &&
      currentQuestion.options.length
    ) {
      let isPriorityOption = currentQuestion.options.filter(
        (e) => e.have_priority == true
      );
      if (isPriorityOption && isPriorityOption.length) {
        return true;
      } else {
        return false;
      }
    }
  };

  handleValidation = (value, buttonType) => {
    if (buttonType === "next" && !this.checkQuestionValidation()) {
      this.setState(
        {
          error: true,
        },
        () => {
          this.props.showError(
            this.checkIsPriorityQuestion()
              ? "Please select priority levels for all options to proceed to the next page. Else, select No preferences/Not applicable"
              : "Please select an option to proceed to next screen"
          );
        }
      );
    } else {
      this.setState(
        {
          error: false,
        },
        () => {
          this.showErrorMessage(buttonType);
        }
      );
    }
  };
  onOKClick = () => {
    this.setState({
      isToggle: false,
    });
  };
  onReportClick = () => {
    const { isloggedIn } = this.props;

    if (this.checkQuestionValidation()) {
      const { user, questionData } = this.props;
      const { moduleId, categoryId, isAdvanced } = this.state;

      let questionArray = [];
      let priorityArray = [];
      let countryId = "";
      let industryId = "";
      questionData &&
        questionData.map((item) => {
          if (item.label) {
            item.label.map((e) => {
              if (e.priority) {
                priorityArray.push(e.priority.map((e) => e.value)[0]);
              } else {
                priorityArray = [];
              }
            });
            if (
              item.question_id != "country_select" &&
              item.question_id != "industry_select"
            ) {
              const newObj = {
                id: item.question_id,
                start_date: item.start_date,
                end_date: item.end_date,
                value: item.label
                  .map((e) => e.value)
                  .join()
                  .split(","),
                subValue: [],
                priority:
                  priorityArray.length > 0
                    ? priorityArray.join().split(",")
                    : [],
              };
              questionArray.push(newObj);
            }
          }

          if (item.question_id == "country_select") {
            countryId = !!item.label ? item.label[0].value : "";
          }

          if (item.question_id == "industry_select") {
            industryId = !!item.label ? item.label[0].value : "";
          }
        });
      const data = {
        category_id: parseInt(categoryId),
        module_id: parseInt(moduleId),
        country_id: countryId,
        industry_id: industryId,
        is_advanced: isAdvanced == "true" ? 1 : 0,
        questions: JSON.stringify(questionArray),
        isloggedIn: isloggedIn,
      };

      if (!isloggedIn) {
        crudService._create("search_reports", data);
        return this.props.toggleLoginPopup(true, {
          message: "Register to view recommendations - Its Free!",
          BtnText: "Login with LinkedIn",
        });
      }

      this.props.showLoader();
      crudService._create("search_reports", data).then((result) => {
        if (result.status === 200) {
          if (result.data.searchReportId) {
            sessionStorage.setItem(
              "searchReportId",
              result.data.searchReportId
            );
            if (sessionStorage.getItem("searchReportId")) {
              Router.push({
                pathname: "/products",
              });
            } else {
              this.props.showError("Something went wrong please try again.");
            }
          }
        }
      });
    } else {
      this.setState(
        {
          error: true,
        },
        () => {
          this.props.showError(
            "Please select an option to proceed to next screen"
          );
        }
      );
    }
  };

  render() {
    const { steps, editFlow } = this.props;
    const { showSummary, showSummaryButton, bgColor, isToggle, isAnyChanged } =
      this.state;
    let { activeTab } = this.state;
    let categoryCounter = null;
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

    if (steps && tabsDatas && tabsDatas[activeTab - 1]) {
      categoryCounter = steps.findIndex(
        (item) => item.id === tabsDatas[activeTab - 1].step_id
      );
    }

    return (
      <section className="question-page-section">
        <Container>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
            />
          </Head>
          <CustomBreadcrumb
            isAnyChanged={isAnyChanged}
            onChange={() => this.setState({ isAnyChanged: false })}
            updateNote={(e) => {}}
            setMeta={(e) => {}}
          />

          <div className="datascale-block">
            <div className="step-progress">
              <div>
                {!showSummary && (
                  <div>
                    <div className="datascale-progress-wrapper">
                      <div className="datascale-progress">
                        <Row>
                          {steps && !steps.length && (
                            <h4>Not found any flow</h4>
                          )}

                          {isBrowser && (
                            <Fragment>
                              {steps &&
                                steps[categoryCounter].questions &&
                                steps[categoryCounter].questions.length && (
                                  <React.Fragment
                                    key={`tab-${steps[categoryCounter].id}`}
                                  >
                                    <Col md={12} className="progress-col">
                                      <div className="scale-wrapper scale-progress">
                                        {/* <h5>{step.name}</h5> */}
                                        <StepQuestionTabs
                                          toggleTab={this.toggleTab}
                                          activeTab={activeTab}
                                          tabsDatas={tabsDatas}
                                          ref={this.tabsRef}
                                          questions={
                                            steps[categoryCounter].questions
                                          }
                                          editFlow={editFlow}
                                        />
                                      </div>
                                    </Col>
                                  </React.Fragment>
                                )}
                            </Fragment>
                          )}

                          {isMobile && (
                            <Fragment>
                              {steps &&
                                steps[categoryCounter].questions &&
                                steps[categoryCounter].questions.length && (
                                  <React.Fragment
                                    key={`tab-${steps[categoryCounter].id}`}
                                  >
                                    <Col md={4} className="progress-col">
                                      <div className="scale-wrapper scale-progress">
                                        {/* <h5>{steps[categoryCounter].name}</h5> */}
                                        <StepQuestionTabs
                                          toggleTab={this.toggleTab}
                                          activeTab={activeTab}
                                          tabsDatas={tabsDatas}
                                          ref={this.tabsRef}
                                          questions={
                                            steps[categoryCounter].questions
                                          }
                                          editFlow={editFlow}
                                        />
                                      </div>
                                    </Col>
                                  </React.Fragment>
                                )}
                            </Fragment>
                          )}
                        </Row>
                      </div>
                    </div>

                    <div className="datascale-content">
                      {steps &&
                        steps != "null" &&
                        typeof steps != "string" &&
                        steps.map((step) => {
                          return (
                            <React.Fragment key={`tab-content-${step.id}`}>
                              <StepQuestionTabContent
                                ref={this.childRef}
                                checkValidation={this.handleValidation}
                                activeTab={activeTab}
                                tabsDatas={tabsDatas}
                                questions={step.questions}
                                editFlow={editFlow}
                              />
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </div>
                )}

                {steps && (
                  <div className="site-btn margin">
                    <div
                      className="custom-btn with-bg back-btn"
                      type="button"
                      // color="secondary"
                      onClick={() => this.onBackClick()}
                    >
                      Back
                    </div>
                    {!showSummaryButton && (
                      <div
                        type="button"
                        className="custom-btn with-bg next-btn"
                        // color="secondary"
                        onClick={() => this.onNextClick()}
                      >
                        Next
                      </div>
                    )}
                    {showSummaryButton && (
                      <div
                        type="button"
                        className="custom-btn with-bg next-btn"
                        // color="secondary"
                        onClick={() => this.onReportClick()}
                      >
                        VIEW REPORT
                      </div>
                    )}
                  </div>
                )}

                {/* {!steps && <p>No steps found</p>} */}
              </div>
            </div>
          </div>
        </Container>
        {/* <BodyBackgroundColor color={bgColor && bgColor} /> */}
        {isToggle && (
          <Modal
            centered={true}
            visible={isToggle}
            // onOk={this.onOKClick}
            transitionName="none"
            maskTransitionName="none"
            footer={[
              <Button key="submit" type="primary" onClick={this.onOKClick}>
                OK
              </Button>,
            ]}
          >
            <p>
              Please Login to View Report{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </p>
          </Modal>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    steps,
    category,
    authentication,
    confirm,
    currentQuestion,
    questionData,
    editFlow,
  } = state;
  const { user } = authentication;

  let totalTabs = 0;
  if (steps && steps != "null" && typeof steps != "string") {
    steps.forEach((element) => {
      if (element.questions) {
        totalTabs += element.questions.length;
      }
    });
  }

  return {
    isloggedIn: authentication.loggedIn,
    user,
    steps,
    categoryName: category ? category.name : "",
    confirm,
    totalTabs,
    currentQuestion,
    questionData,
    editFlow,
    category,
    state,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  getCrud: crudActions._get,
  showError: alertActions.error,
  setQuestionStep: questionActions._addData,
  currentQuestionSet: currentQuestionActions._addData,
  tracking: crudActions._create,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  showAlert: alertActions.success,
  toggleLoginPopup: userActions.toggleLoginPopup,
};

export default withRouter(
  connect(mapStateToProps, actionCreators, null, { forwardRef: true })(Steps)
);
