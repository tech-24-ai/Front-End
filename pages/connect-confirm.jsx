import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container, Label, Form, FormGroup, Button } from "reactstrap";
import { crudActions } from "../_actions";
import {
  connectFormFieldsVendor,
  connectFormFieldsConsulting,
  connectFormFieldsCorrection,
  connectFormFieldsConsultant,
  connectFormFieldsServiceProvider,
} from "../_constants/form";
import ConnectTypeHead from "../components/connect/connectTypeHead";
import { connectData } from "../_reducers/connect.reducer";
import ConnectBanner from "../components/card/connectBanner";
import connectIcon from "../public/new_images/Connect/connect-title.svg";

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
        (isConnectCheck.isConsulting && connectFormFieldsConsultant) ||
        (isConnectCheck.isService && connectFormFieldsServiceProvider) ||
        (isConnectCheck.isCorrection && connectFormFieldsCorrection);
    }
    console.log("props", props);
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
      } else if (props.formfieldData) {
        newState.form[formField.name] = props.formfieldData[formField.name];
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
    // console.log(
    //   "Form",
    //   form.skills.map((skill) => skill.value)
    // );
    // return false;

    const data = {
      contact_type_id: contactTypeId,
      your_name: form.yourName,
      email: form.yourEmail,
      mobile: form.yourContact,
      organisation_name: form.organisationName,
      requirement: form.requirement,
      company_address: form.companyAddress,
      website: form.website,
      domain_expertise: form.domainExpertise,
      revenue_range: form.revenueRange,
      number_employees: form.numberEmployees,
    };
    const consultantData = {
      first_name: form.firstName,
      email: form.email,
      mobile: form.mobile,
      linkedin_url: form.linkedInUrl,
      country_id: form.location?.value,
      years_of_experience: contactTypeId == 4 ? 0 : form.years_of_experience,
      number_of_employee: contactTypeId == 4 ? form.number_of_employee : 0,
      website: contactTypeId == 4 ? form.website : null,
      name_of_company_representative:
        contactTypeId == 4 ? form.name_of_company_representative : null,
      is_company: contactTypeId == 4 ? 1 : 0,
      skills: JSON.stringify(form.skills.map((skill) => skill.value)),
    };
    console.log("condata", consultantData);
    if (contactTypeId == 2 || contactTypeId == 4) {
      this.props.sendContact(
        "consultants/signup",
        "consultants/signup",
        consultantData
      );
    } else {
      this.props.sendContact("contacts", "contacts", data);
    }
    Router.push("/connect-success");
  };

  render() {
    const { contactTypeName, form } = this.state;
    return (
      <section className="connect-portal-section confirm-page">
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

          <div className="select-category-block">
            <div style={{ marginTop: "70px" }} className="thank-message-block">
              <div>Thanks for providing the following inputs.</div>
              <div>You can now go ahead and submit the form.</div>
            </div>
            <Form className="form-block consulting-form">
              {connectFormFields &&
                connectFormFields.map((connectFormField, index) => {
                  let label = connectFormField.lable;
                  let value = "";
                  if (
                    typeof form[connectFormField.name] == "object" &&
                    !Array.isArray(form[connectFormField.name])
                  ) {
                    value = form[connectFormField.name].label;
                  } else if (Array.isArray(form[connectFormField.name])) {
                    value = form[connectFormField.name]
                      .map((data) => data.label)
                      .toString();
                  } else {
                    value = form[connectFormField.name];
                  }
                  console.log("connectFormField", value);
                  return (
                    <FormGroup>
                      <Label className="detail-label">
                        {index + 1}. {label}
                      </Label>
                      <p>{value}</p>
                    </FormGroup>
                  );
                })}
            </Form>

            <div className="site-btn">
              <div
                className="custom-btn outline"
                type="button"
                color="secondary"
                onClick={() => this.onBackClick()}
              >
                Edit
              </div>
              <div
                className="custom-btn with-bg"
                type="submit"
                color="secondary"
                onClick={(e) => this.onSubmit(e)}
              >
                Submit
              </div>
            </div>
          </div>
        </Container>
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
    formfieldData: !undefined ? connectData[1] : null,
    alert,
  };
};

const actionCreators = {
  sendContact: crudActions._create,
};

export default connect(mapStateToProps, actionCreators)(ConnectConfirm);
