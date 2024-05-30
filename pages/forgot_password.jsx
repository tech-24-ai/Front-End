import React from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  CustomInput,
  Button,
  ButtonGroup,
} from "reactstrap";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import Hide from "../public/new_images/hide.svg";
import Show from "../public/images/input/show.svg";
import RightArrow from "../public/images/input/rightarrow.svg";
import RightLinArrow from "../public/images/linkedin/arrow.png";
import LinkedinIcon from "../public/images/linkedin/linked_icon.png";
import OrIcon from "../public/new_images/login-lines.svg";
import EmailIcon from "../public/new_images/email-icon.svg";
import Password from "../public/new_images/password-bg.svg";
import UserIcon from "../public/images/input/user.svg";
import loginIcon from "../public/new_images/login-bg.svg";
import LockIcon from "../public/images/input/lock.svg";
import { userActions, loaderActions } from "../_actions";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      hidden: true,
    };
  }

  checkAuth = () => {
    if (this.props.isloggedIn) {
      Router.push("/");
    }
  };

  componentDidMount() {
    this.props.hideLoader();
    this.checkAuth();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    if (email && password) {
      this.props.login(email, password);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  toggleShow = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  };
  toggleShows = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  };
  linkedinOpenUrl = () => {
    const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_LINKEDIN_SCOPE}&state=${process.env.NEXT_PUBLIC_LINKEDIN_STATE}`;
    window.open(linkedinUrl, "_self");
  };

  render() {
    const { email, password, submitted, hidden } = this.state;
    const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${process.env.NEXT_PUBLIC_LINKEDIN_SCOPE}&state=${process.env.NEXT_PUBLIC_LINKEDIN_STATE}`;
    return (
      <section className="login-wrapper">
        <Container>
          <div className="form-login-container">
            <div
              style={{
                width: "40%",
                height: "100vh",
              }}
            >
              <BrowserView
                // viewClassName="login-title-link"
                style={{ position: "relative", top: "100px" }}
              >
                <h3
                  style={{
                    fontSize: "42px",
                    fontWeight: "600",
                    lineHeight: "56px",
                  }}
                  className="sign-title"
                >
                  Forgot password?
                </h3>
                <h6 className="login-details">
                  Enter your email below, you will receive an email with
                  instructions on how to reset your password in a few minutes.
                  You can also set a new password if you’ve never set one
                  before.
                </h6>
              </BrowserView>
              <Form
                className="form-block login-form"
                style={{ position: "relative", top: "150px" }}
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  {/* {isMobile && (
                    <span className="usericon">
                      <img src="new_images/email-icon.svg" />
                    </span>
                  )} */}
                  <h6>Email</h6>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Enter email"
                    autoComplete="off"
                    value={email}
                    onChange={this.handleChange}
                    // className="email"
                    style={{
                      height: "64px",
                      left: "0px",
                      right: "0px",
                      top: "28px",
                      border: "1px solid #CFDBD5",
                      borderRadius: "8px",
                    }}
                  />
                  {isBrowser && (
                    <div
                      // className="hide-show-image"
                      style={{
                        position: "absolute",
                        right: "20px",
                        width: "26px",
                        height: "22.7px",
                        top: "48px",
                      }}
                    >
                      <img src={EmailIcon.src} />
                    </div>
                  )}
                </FormGroup>
                {submitted && !email && (
                  <div className="help-block">Password is required</div>
                )}
                <div className="loginWrapper">
                  <ButtonGroup vertical style={{ width: "100%" }}>
                    <Button
                      style={{
                        background: "#075aee",
                        borderRadius: "8px",
                        height: "50px",
                        color: "#fff",
                      }}
                    >
                      Start recovery{" "}
                      {isMobile && (
                        <span>
                          <img src={RightArrow.src} className="arrow" />
                        </span>
                      )}
                    </Button>
                  </ButtonGroup>
                </div>

                <div
                  // className="input-link"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <p>You don’t have an account?</p>
                  <div style={{ marginLeft: "6px" }}>
                    <Link
                      href="/content/[slug]"
                      as={`/content/privacy-and-policy`}
                    >
                      Create an account
                    </Link>
                  </div>
                </div>
              </Form>
            </div>

            <div
              className="login-svg"
              style={{
                width: "50%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#075aee",
              }}
            >
              <img
                style={{ width: "80%", height: "50%" }}
                src="new_images/password-bg.svg"
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

function mapState(state) {
  const { authentication } = state;
  return {
    isloggedIn: authentication.loggedIn,
  };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
  hideLoader: loaderActions.hide,
};

export default connect(mapState, actionCreators)(ForgotPassword);
