import React, { Fragment } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Container, Button, ButtonGroup, Col, Row } from "reactstrap";
import { crudActions, connectActions, alertActions } from "../_actions";
import { Icon } from "react-icons-kit";
import { chevronRight, check } from "react-icons-kit/feather";
import RadioBox from "../components/form/radio";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { isBrowser, isMobile } from "react-device-detect";
import Head from "next/head";

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
    this.props.getCrud("contact_types", "contact_types");
  }

  onChange = (value) => {
    const { connectData } = this.props;
    connectData[0] = {
      contactTypeId: value.id,
      contactTypeName: value.name,
      isVender: value.id == "1" && true,
      isConsulting: value.id == "2" && true,
      isCorrection: value.id == "3" && true,
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
      this.props.showError("Please select option");
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

    return (
      <section className="connect-vendor-wrapper connect-inclusion-wrapper">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=5.0, user-scalable=no"
          />
          <meta name="title" content="Connect with ITMAP" />
          <meta
            name="description"
            content="Reach out to us for any corrections, queries, consulting and vendor inclusion"
          />
          <meta
            name="keywords"
            content="Queries, Corrections, Consulting and vendor inclusion, ITMAP Support, Contacts"
          />
        </Head>
        <Container>
          {isBrowser && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <div className="site-title">
                  <h5>Connect</h5>
                </div>
                <RadioBox
                  options={contact_types}
                  value={contactTypeId}
                  label="How would you like us to help you?"
                  onChange={this.onChange}
                />

                <div className="site-btn margin">
                  {/* <Button
                    className="back-btn"
                    type="button"
                    color="secondary"
                    disabled
                    onClick={() => this.onBackClick()}
                  >
                    Back
                  </Button> */}

                  <Button
                    className="next-btn"
                    type="button"
                    color="secondary"
                    onClick={() => this.onNextClick()}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div style={{ marginLeft: "192px" }}>
                <p style={{ marginTop: "5px" }}>
                  <h4 style={{ fontSize: "20px", marginBottom: "26px" }}>
                    Address
                  </h4>
                  <strong style={{ fontWeight: 500, fontSize: "20px" }}>
                    ITMAP DMCC
                  </strong>
                  <br />
                  Unit No: 3O-01-BA1437
                  <br />
                  Plot No: DMCC-PH2-J&GPlexS
                  <br />
                  DMCC
                  <br />
                  Dubai
                  <br />
                  United Arab Emirates
                </p>
                <p>
                  <h4 style={{ fontSize: "20px" }}>Email</h4>
                  For sales inquiries write to{" "}
                  <a href="mailto:sales@itmap.com">sales@itmap.com</a>
                  <br />
                  <br />
                  For support inquiries write to{" "}
                  <a href="mailto:support@itmap.com">support@itmap.com</a>
                  <br />
                  <br />
                  For others write to{" "}
                  <a href="mailto:inquiry@itmap.com">inquiry@itmap.com</a>
                </p>
              </div>
            </div>
          )}

          {isMobile && (
            <Fragment>
              <div className="site-title">
                <h5>Connect</h5>
              </div>
              <div className="input-searchbox mt-3">
                <div className="select-searchbox open">
                  <div className="input-block">
                    <div className="search-list-box">
                      <ul>
                        {contact_types &&
                          contact_types.map((item, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                this.setLocated(item.name), this.onChange(item);
                              }}
                            >
                              {item.name}
                              {isMobile && (
                                <span>
                                  {connectList === item.name ? (
                                    <Icon size={18} icon={check} />
                                  ) : (
                                    <Icon size={18} icon={chevronRight} />
                                  )}
                                </span>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="site-btn margin"
                style={{ display: "flex", justifyContent: "end" }}
              >
                {/* <Button
                    className="back-btn"
                    type="button"
                    color="secondary"
                    disabled
                    onClick={() => this.onBackClick()}
                  >
                    Back
                  </Button> */}
                <Button
                  className="next-btn"
                  type="button"
                  color="secondary"
                  onClick={() => this.onNextClick()}
                >
                  Next
                </Button>
              </div>
            </Fragment>
          )}
        </Container>
        <BodyBackgroundColor color="#F4F6F6" />
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
