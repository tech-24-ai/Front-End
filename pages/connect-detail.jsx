import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container, Input, Label, Form, FormGroup, Button } from "reactstrap";
import { crudActions, connectActions } from "../_actions";
import SimpleReactValidator from "simple-react-validator";
import {
  connectFormFieldsVendor,
  connectFormFieldsConsulting,
  connectFormFieldsCorrection,
  connectFormFieldsConsultant,
  connectFormFieldsServiceProvider,
} from "../_constants/form";
import InputBox from "../components/form/inputBox";
import ConnectTypeHead from "../components/connect/connectTypeHead";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import connectIcon from "../public/new_images/Connect/connect-title.svg";
import ConnectBanner from "../components/card/connectBanner";
import ConnectTreeSelect from "../components/form/connectTreeSelect";
import CustomSelect from "../components/form/customSelect";

let connectFormFields = [];
class ConnectDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactType: null,
      contactTypeName: null,
      form: this.formState(),
      value: null,
    };
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      element: (message) => (
        <div className="srv-validation-message invalid-feedback">{message}</div>
      ),
    });
    const isConnectCheck = props.connectData && props.connectData[0];
    if (isConnectCheck) {
      connectFormFields =
        (isConnectCheck.isVender && connectFormFieldsVendor) ||
        (isConnectCheck.isConsulting && connectFormFieldsConsultant) ||
        (isConnectCheck.isCorrection && connectFormFieldsCorrection) ||
        (isConnectCheck.isService && connectFormFieldsServiceProvider);
    }
  }

  formState = () => {
    let form = {};
    if (connectFormFields) {
      connectFormFields.map((formField) => {
        form[formField.name] = formField.value;
      });
    }
    return form;
  };

  componentDidMount() {
    this.checkStep1();
  }

  checkStep1 = () => {
    const { contactTypeId } = this.props;

    if (!contactTypeId) {
      Router.push("/connect");
    }
  };

  handleError = () => {
    this.validator.showMessages();
    this.forceUpdate();
  };

  static getDerivedStateFromProps(props, state) {
    let newState = state;
    if (props.contactTypeName) {
      newState.contactTypeName = props.contactTypeName;
    }

    connectFormFields.map((formField) => {
      if (state.form[formField.name]) {
        newState.form[formField.name] = state.form[formField.name];
      } else if (props.organisationName) {
        newState.form[formField.name] = props[formField.name];
      }
    });
    return newState;
  }

  onChange = (event) => {
    event.persist();
    const newState = Object.assign({}, this.state);
    newState.form[event.target.name] = event.target.value;
    this.setState(newState);
    this.handleError();
  };

  onTreeSelectionChange = ({ name, value }) => {
    const newState = Object.assign({}, this.state);
    newState.form[name] = value;
    this.setState(newState);
    this.handleError();
  };

  onBackClick = () => {
    Router.push("/connect");
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.setStep2Data();
      Router.push("/connect-confirm");
    } else {
      this.handleError();
    }
  };

  setStep2Data = () => {
    const { connectData } = this.props;
    connectData[1] = this.state.form;
    this.props.setStep2(connectData);
  };

  render() {
    const { contactTypeName, form } = this.state;
    // console.log("contactTypeName", contactTypeName);
    const { connectData } = this.props;
    let errors = {};
    connectFormFields.map((formField) => {
      errors[formField.name] = this.validator.message(
        formField.name,
        form[formField.name],
        formField.validation
      );
    });

    return (
      <section className="connect-portal-section detail-page">
        <ConnectBanner
          titleNode={
            <div>
              <h4>Connect</h4>
            </div>
          }
          image={connectIcon}
        />
        <Container>
          <ConnectTypeHead contactTypeName={contactTypeName} />

          <div
            className="select-category-block"
            style={{ position: "relative", top: "60px" }}
          >
            <Form
              className="form-block consulting-form"
              noValidate
              onSubmit={this.onSubmit}
            >
              <div className="card">
                <span className="header-lable">Provide Details</span>
                <p className="header-detail">
                  Enter your all the Professional or Business Details
                </p>
                <div className="div-wrapper">
                  {connectFormFields &&
                    connectFormFields.map((connectFormField, index) => {
                      if (connectFormField.type === "text") {
                        return (
                          <FormGroup className="connect-formgroup-input">
                            <Label>
                              <span className="input-lable">
                                {connectFormField.lable}
                              </span>
                            </Label>

                            <Input
                              className={
                                errors[connectFormField.name]
                                  ? "is-invalid"
                                  : "input-emp"
                              }
                              type="text"
                              name={connectFormField.name}
                              value={form[connectFormField.name]}
                              placeholder={connectFormField.placeholder}
                              autoComplete="off"
                              onChange={this.onChange}
                            />
                            {errors[connectFormField.name] &&
                              errors[connectFormField.name]}
                          </FormGroup>
                        );
                      }

                      if (connectFormField.type === "textarea") {
                        return (
                          <FormGroup className="connect-formgroup-input">
                            <Label>
                              <span className="input-lable">
                                {connectFormField.lable}
                              </span>
                            </Label>
                            <Input
                              className={
                                errors[connectFormField.name]
                                  ? "textarea is-invalid"
                                  : "input-type-textarea"
                              }
                              type="textarea"
                              name={connectFormField.name}
                              value={form[connectFormField.name]}
                              placeholder={connectFormField.placeholder}
                              rows="5"
                              onChange={this.onChange}
                            />
                            {errors[connectFormField.name] &&
                              errors[connectFormField.name]}
                          </FormGroup>
                        );
                      }

                      if (connectFormField.type === "select") {
                        return (
                          <FormGroup className="connect-formgroup-input">
                            <Label>
                              <span className="input-lable">
                                {connectFormField.lable}
                              </span>
                            </Label>
                            <CustomSelect
                              onChange={(value, option) => {
                                this.onTreeSelectionChange({
                                  name: connectFormField.name,
                                  value: option,
                                });
                              }}
                              options={connectFormField.options}
                              value={form[connectFormField.name]}
                              connectFormField={connectFormField}
                              showSearch
                            />
                            {/* <Input
                              className={
                                errors[connectFormField.name]
                                  ? "is-invalid"
                                  : "input-emp"
                              }
                              type="select"
                              name={connectFormField.name}
                              value={form[connectFormField.name]}
                              placeholder={connectFormField.placeholder}
                              onChange={this.onChange}
                            >
                              <option selected hidden>
                                {connectFormField.placeholder}
                              </option>
                              {connectFormField.options &&
                                connectFormField.options.map((option) => {
                                  return (
                                    <option value={option.value}>
                                      {option.text}
                                    </option>
                                  );
                                })}
                            </Input> */}
                            {errors[connectFormField.name] &&
                              errors[connectFormField.name]}
                          </FormGroup>
                        );
                      }
                      if (connectFormField.type === "treeselect") {
                        return (
                          <FormGroup className="connect-formgroup-input">
                            <Label>
                              <span className="input-lable">
                                {connectFormField.lable}
                              </span>
                            </Label>
                            <ConnectTreeSelect
                              className={
                                errors[connectFormField.name]
                                  ? "is-invalid"
                                  : "input-emp"
                              }
                              url={connectFormField.url}
                              value={form[connectFormField.name]}
                              onChange={(value, option) =>
                                this.onTreeSelectionChange({
                                  name: connectFormField.name,
                                  value: value.map((d, i) => ({
                                    value: d,
                                    label: option[i],
                                  })),
                                })
                              }
                            />
                            {errors[connectFormField.name] &&
                              errors[connectFormField.name]}
                          </FormGroup>
                        );
                      }
                    })}
                </div>
              </div>

              <div
                className="change-btn margin"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  className="back-btn"
                  type="button"
                  color="secondary"
                  onClick={() => this.onBackClick()}
                >
                  Back
                </Button>
                {connectData &&
                connectData[0] &&
                connectData[0].isConsulting &&
                false ? (
                  <Button
                    className="nxt-btn"
                    type="submit"
                    disabled
                    color="secondary"
                  >
                    Pay
                  </Button>
                ) : (
                  <Button className="nxt-btn" type="submit" color="secondary">
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { connectData, authentication, confirm } = state;
  const { user } = authentication;
  return {
    user,
    connectData,
    contactTypeId:
      connectData[0] !== undefined ? connectData[0].contactTypeId : null,
    contactTypeName:
      connectData[0] !== undefined ? connectData[0].contactTypeName : null,
    organisationName:
      connectData[1] !== undefined ? connectData[1].organisationName : null,
    requirement:
      connectData[1] !== undefined ? connectData[1].requirement : null,
    companyAddress:
      connectData[1] !== undefined ? connectData[1].companyAddress : null,
    website: connectData[1] !== undefined ? connectData[1].website : null,
    domainExpertise:
      connectData[1] !== undefined ? connectData[1].domainExpertise : null,
    revenueRange:
      connectData[1] !== undefined ? connectData[1].revenueRange : null,
    numberEmployees:
      connectData[1] !== undefined ? connectData[1].numberEmployees : null,
    confirm,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
  setStep2: connectActions._addData,
};

export default connect(mapStateToProps, actionCreators)(ConnectDetail);
