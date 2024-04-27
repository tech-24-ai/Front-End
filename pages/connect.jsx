import React, { Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import PageBanner from "../components/card/pageBanner";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Col,
  Row,
} from "reactstrap";
import { crudActions, connectActions, alertActions } from "../_actions";
import connectImage from "../public/new_images/Connect/connect-bg.svg";
import { Icon } from "react-icons-kit";
import { chevronRight, check } from "react-icons-kit/feather";
import ConnectRadioBox from "../components/form/connectRadio";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { isBrowser, isMobile } from "react-device-detect";
import Head from "next/head";
import { Space } from "antd";
import IconCard from "../components/card/IconCard";
import bgIcon from "../public/new_images/Connect/bgIcon.svg";
import location from "../public/new_images/Connect/location.svg";
import { ConnectQuestion } from "../components/icons";
import { FindIcon } from "../components/icons";
import { EmailIcon } from "../components/icons";

class Connect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactTypeId: null,
      connectList: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = state;
    if (state.contactTypeId) {
      newState.contactTypeId = state.contactTypeId;
    } else {
      newState.contactTypeId = props.contactTypeId;
    }
    return newState;
  }

  componentDidMount() {
    this.props.getCrud("contact_types", "contact_types", {
      orderBy: "sort_order",
      orderPos: "ASC",
    });
  }

  onChange = (value) => {
    const { connectData } = this.props;
    connectData[0] = {
      contactTypeId: value.id,
      contactTypeName: value.name,
      isVender: value.id == "1" && true,
      isConsulting: value.id == "2" && true,
      isCorrection: value.id == "3" && true,
      isService: value.id == "4" && true,
    };
    this.props.setStep1(connectData);

    this.setState({ contactTypeId: value.id });
  };

  onBackClick = () => {
    Router.push("/");
  };

  onNextClick = () => {
    const { contactTypeId } = this.state;
    if (contactTypeId) {
      Router.push("/connect-detail");
    } else {
      this.props.showError("Please select an option");
    }
  };

  setLocated = (item) => {
    this.setState({
      connectList: item,
    });
  };

  render() {
    const { contact_types } = this.props;
    const { contactTypeId, connectList } = this.state;
    console.log("contact_types", contact_types);
    console.log("contactTypeId", contactTypeId);

    return (
      <section className="connect-portal-section">
        <PageBanner
          titleNode={
            <div>
              <h4>Connect</h4>
            </div>
          }
          // image={connectImage}
        />
        <Container className="connect-body-container">
          <div className="row top-connect-container">
            <div className="col-md-4 ">
              <Space size={20} className="iconCard-content">
                <IconCard />
              </Space>
            </div>
            <div className="col-md-7">
              <h4 className="mt-3">How would you like us to help you?</h4>
              <ConnectRadioBox
                options={contact_types}
                value={contactTypeId}
                onChange={this.onChange}
              />
              <div className="next-btn">
                <Button
                  className="next-btn"
                  type="button"
                  onClick={() => this.onNextClick()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          <div className="row mid-connect-container">
            <div className="col-md-6 mid-left-connect-content">
              <h4>Get in Touch</h4>
              <p>
                Your email address will not be published. Required fields are
                marked*
              </p>
              <Form>
                <FormGroup>
                  <Input
                    id="exampleName"
                    name="name"
                    placeholder="Your Name *"
                    type="name"
                    className="custom-input"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Your Email *"
                    type="email"
                    className="custom-input"
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                    placeholder="Question *"
                    className="custom-textarea-input"
                  />
                </FormGroup>
                <Button className="send-btn">Send Message</Button>
              </Form>
            </div>
            <div className="col-md-6 mid-right-connect-content">
              <iframe
                className="bgIcon map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1662.1428480165212!2d55.14002641347944!3d25.068731192881344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6cada4c46285%3A0xdc22defd3201061c!2sDubai%20Multi%20Commodities%20Centre!5e0!3m2!1sen!2sin!4v1687417891764!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="row btm-connect-container">
            {/* <div className="btm-left-content">
              <div className="icon">
                <FindIcon />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "30px",
                }}
              >
                <h4>Address</h4>
                <p>
                  Unit No: 3O-01-BA1437,<br></br>
                  Plot No: DMCC-PH2-J&GPlexS<br></br>
                  DMCC, Dubai, United Arab Emirates.
                </p>
              </div>
            </div> */}

            <div className="col-md-12 btm-right-content">
              {/* <img src={EmailIcon.src} /> */}
              <div className="icon">
                <EmailIcon />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "30px",
                }}
              >
                <h4>Our Email</h4>
                <p>
                  For sales inquiries write to{" "}
                  <a href="mailto:sales@tech24.ai">sales@tech24.ai</a>
                  <br />
                  <br />
                  For support inquiries write to{" "}
                  <a href="mailto:support@tech24.ai">support@tech24.ai</a>
                  <br />
                  <br />
                  For others write to{" "}
                  <a href="mailto:inquiry@tech24.ai">inquiry@tech24.ai</a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { connectData, contact_types, authentication, confirm } = state;
  const { user } = authentication;

  return {
    user,
    connectData,
    contactTypeId:
      connectData[0] !== undefined ? connectData[0].contactTypeId : null,
    contact_types,
    confirm,
  };
};

const actionCreators = {
  getCrud: crudActions._getAll,
  setStep1: connectActions._addData,
  showError: alertActions.error,
};

export default connect(mapStateToProps, actionCreators)(Connect);
