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
import Hide from "../public/images/input/hide.svg";
import Show from "../public/images/input/show.svg";
import RightArrow from "../public/images/input/rightarrow.svg";
import RightLinArrow from "../public/images/linkedin/arrow.png";
import LinkedinIcon from "../public/images/linkedin/linked_icon.png";
import UserIcon from "../public/images/input/user.svg";
import LockIcon from "../public/images/input/lock.svg";
import { userActions, loaderActions } from "../_actions";
import { linkedinConstants } from "../_constants";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

class Login extends React.Component {
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
          <div className="login-block">
            <div className="login-content">
              <BrowserView viewClassName="login-title-link">
                <h3 className="main-title">Sign in</h3>
              </BrowserView>
              <MobileView viewClassName="login-title-link">
                <h3 className="main-title">Please login to continue</h3>
              </MobileView>
              <Form
                className="form-block login-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  {isMobile && (
                    <span className="usericon">
                      <img src="images/input/user.svg" />
                    </span>
                  )}
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Email"
                    autoComplete="off"
                    value={email}
                    onChange={this.handleChange}
                    className="email"
                  />
                </FormGroup>
                {submitted && !email && (
                  <div className="help-block">Email is required</div>
                )}
                <FormGroup>
                  {isMobile && (
                    <span className="lockicon">
                      <img src="images/input/lock.svg" />
                    </span>
                  )}
                  <Input
                    type={hidden ? "password" : "text"}
                    name="password"
                    id="Password"
                    placeholder="Password"
                    autoComplete="off"
                    className="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  {isBrowser && (
                    <div className="hide-show-image">
                      <img
                        src={hidden ? `${Hide.src}` : `${Show.src}`}
                        className="hide"
                        onClick={this.toggleShow}
                      />
                    </div>
                  )}
                </FormGroup>
                {submitted && !password && (
                  <div className="help-block">Password is required</div>
                )}
                {/* <FormGroup className="checkbox-password">
                  {isBrowser && (
                    <CustomInput
                      type="checkbox"
                      id="exCustomCheckbox"
                      label="Remember Me"
                    />
                  )}
                  <a href="#" className="forget-password">
                    Forgot Password ?
                  </a>
                </FormGroup> */}

                <div className="loginWrapper">
                  <ButtonGroup>
                    <Button color="default">
                      Login{" "}
                      {isMobile && (
                        <span>
                          <img src={RightArrow.src} className="arrow" />
                        </span>
                      )}
                    </Button>
                    <Button onClick={this.linkedinOpenUrl}>
                      <span>
                        <img className="icon" src={LinkedinIcon.src} />
                        Sign in with LinkedIn
                        <img className="arrow" src={RightLinArrow.src} />
                      </span>
                    </Button>
                  </ButtonGroup>
                </div>

                <div className="input-link">
                  <p>By Signing in, you agree to TECH24’s</p>
                  <Link
                    href="/content/[slug]"
                    as={`/content/terms-and-conditions`}
                  >
                    Terms and Conditions
                  </Link>{" "}
                  |{" "}
                  <Link
                    href="/content/[slug]"
                    as={`/content/privacy-and-policy`}
                  >
                    Privacy Policy
                  </Link>
                </div>
              </Form>
              {isMobile && (
                <div className="no-register-block">
                  {/* <div className="register-link-btn">
                    <p>Not registered yet? </p>
                    <Button className="signup-btn">Sign Up</Button>
                  </div> */}
                  {/* <div className="bottom-links">
                    <p>Version 1.0</p>
                    <p> © 2022 ITMAP, All rights reserved. </p>
                  </div> */}
                </div>
              )}
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

export default connect(mapState, actionCreators)(Login);
