import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container, Label, Form, FormGroup, Button } from "reactstrap";
import { crudActions } from "../_actions";
import {
  connectFormFieldsVendor,
  connectFormFieldsConsulting,
  connectFormFieldsCorrection,
} from "../_constants/form";

import ConnectTypeHeader from "../components/connect/connectTypeHeader";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { connectData } from "../_reducers/connect.reducer";

let connectFormFields = [];
class ConnectConfirm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactTypeId: null,
      contactTypeName: null,
      form: this.formState(),
    };
    const isConnectCheck = props.connectData && props.connectData[0];
    if (isConnectCheck) {
      connectFormFields =
        (isConnectCheck.isVender && connectFormFieldsVendor) ||
        (isConnectCheck.isConsulting && connectFormFieldsConsulting) ||
        (isConnectCheck.isCorrection && connectFormFieldsCorrection);
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
    this.checkStep2();
  }

  checkStep1 = () => {
    const { setStep1 } = this.props;

    if (!setStep1) {
      Router.push("/connect");
    }
  };
  checkStep2 = () => {
    const { setStep2 } = this.props;

    if (!setStep2) {
      Router.push("/connect-detail");
    }
  };

  static getDerivedStateFromProps(props, state) {
    let newState = state;
    if (props.contactTypeName) {
      newState.contactTypeName = props.contactTypeName;
    }
    if (props.contactTypeId) {
      newState.contactTypeId = props.contactTypeId;
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

  onBackClick = () => {
    Router.push("/connect-detail");
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { contactTypeId, form } = this.state;

    const data = {
      contact_type_id: contactTypeId,
      organisation_name: form.organisationName,
      requirement: form.requirement,
      company_address: form.companyAddress,
      website: form.website,
      domain_expertise: form.domainExpertise,
      revenue_range: form.revenueRange,
      number_employees: form.numberEmployees,
    };

    this.props.sendContact("contacts", "contacts", data);
    Router.push("/connect-success");
  };

  render() {
    const { contactTypeName, form } = this.state;
    return (
      <section className="connect-consulting-wrapper connect-inclusion-wrapper">
        <Container>
          <ConnectTypeHeader contactTypeName={contactTypeName} />

          <div className="select-category-block">
            <div className="thank-message-block">
              <div>Thanks for providing the following inputs.</div>
              <div>You can now go ahead and submit the form.</div>
            </div>
            <Form className="form-block consulting-form">
              {connectFormFields &&
                connectFormFields.map((connectFormField, index) => {
                  return (
                    <FormGroup>
                      <Label className="detail-label">
                        {index + 1}. {connectFormField.lable}
                      </Label>
                      <p>{form[connectFormField.name]}</p>
                    </FormGroup>
                  );
                })}
            </Form>

            <div className="site-btn margin">
              <Button
                className="back-btn"
                type="button"
                color="secondary"
                onClick={() => this.onBackClick()}
              >
                Edit
              </Button>
              <Button
                className="next-btn"
                type="submit"
                color="secondary"
                onClick={(e) => this.onSubmit(e)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { connectData, authentication, alert } = state;
  const { user } = authentication;
  return {
    user,
    connectData,
    setStep1: connectData[0] !== undefined ? true : false,
    setStep2: connectData[1] !== undefined ? true : false,
    contactTypeId:
      connectData[0] !== undefined ? connectData[0].contactTypeId : null,
    contactTypeName:
      connectData[0] !== undefined ? connectData[0].contactTypeName : null,
    organisationName:
      connectData[1] !== undefined ? connectData[1].organisationName : null,
    corrections:
      connectData[1] !== undefined ? connectData[1].corrections : null,
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
    alert,
  };
};

const actionCreators = {
  sendContact: crudActions._create,
};

export default connect(mapStateToProps, actionCreators)(ConnectConfirm);
