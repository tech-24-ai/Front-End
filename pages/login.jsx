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
import UserIcon from "../public/images/input/user.svg";
import loginIcon from "../public/new_images/login-bg.svg";
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
    document.querySelector(".main-content").classList.add("login");
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
    return (
      <section className="login-wrapper">
        <Container>
          <div className="form-login-container">
            <div className="sign-content">
              {
                isMobile == false && <BrowserView className="login-title-tank">
                <h3>Sign in</h3>
                <h6>Enter your account details</h6>
              </BrowserView>
              }
              {
                isMobile == true && <MobileView className="login-title-tank">
                <h3>Sign in</h3>
                <h6>Enter your account details</h6>
              </MobileView>
              }
              <FormGroup style={{ marginTop: "2rem", position: "relative" }}>
                <h6>Email</h6>
                <Input
                  type="email"
                  name="email"
                  id="Email"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={email}
                  onChange={this.handleChange}
                  className="sign-email"
                />
                {isBrowser && (
                  <div
                    className="hide-show-image"
                    style={{
                      position: "absolute",
                      right: "20px",
                      width: "26px",
                      height: "22.7px",
                      bottom: "18px",
                      margin: "auto",
                    }}
                  >
                    <img src={EmailIcon.src} />
                  </div>
                )}
                {isMobile && (
                  <div
                    className="hide-show-image"
                    style={{
                      position: "absolute",
                      right: "20px",
                      width: "26px",
                      height: "22.7px",
                      bottom: "18px",
                      margin: "auto",
                    }}
                  >
                    <img src={EmailIcon.src} />
                  </div>
                )}
              </FormGroup>
              {submitted && !email && (
                <div className="help-block">Email is required</div>
              )}

              <FormGroup style={{ position: "relative" }}>
                {/* {isMobile && (
                  <span className="lockicon">
                    <img src="images/input/lock.svg" />
                  </span>
                )} */}
                <h6>Password</h6>
                <Input
                  type={hidden ? "password" : "text"}
                  name="password"
                  id="Password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  className="sign-password"
                  value={password}
                  onChange={this.handleChange}
                />
                {isBrowser && (
                  <div
                    className="hide-show-image"
                    style={{
                      position: "absolute",
                      right: "20px",
                      width: "26px",
                      height: "22.7px",
                      bottom: "18px",
                      margin: "auto",
                    }}
                  >
                    <img
                      src={hidden ? `${Hide.src}` : `${Show.src}`}
                      className="hide"
                      onClick={this.toggleShow}
                    />
                  </div>
                )}
                {isMobile && (
                  <div
                    className="hide-show-image"
                    style={{
                      position: "absolute",
                      right: "20px",
                      width: "26px",
                      height: "22.7px",
                      bottom: "18px",
                      margin: "auto",
                    }}
                  >
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


              <div className="signinWrapper">
                <ButtonGroup vertical style={{ width: "100%" }}>
                  <div
                    className="custom-btn with-bg"
                    onClick={this.handleSubmit}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    Login{" "}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {isMobile ==  false && (
                      <span style={{ margin: 8 }}>
                        <img className="icon" src={OrIcon.src} />
                      </span>
                    )}
                    {isMobile == true && (
                      <span style={{ margin: 8 }}>
                        <img className="icon" src={OrIcon.src} />
                      </span>
                    )}
                  </div>
                  <div
                    className="custom-btn outline"
                    onClick={this.linkedinOpenUrl}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      borderRadius: "8px",
                      top: "10px",
                      fontWeight: "600",
                       background:"black",
                      color:"white",
                    }}
                  >
                    <span>Sign in with LinkedIn</span>
                  </div>
                </ButtonGroup>
              </div>

              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "100%",
                  height: "40px",
                }}
              >
                

                    <p className="signup-link">You don’t have an account?
                      {" "}
                      <Link href="/[slug]" as={`/sign_up`}>
                        Create an account
                      </Link>
                    </p>
              </div> */}
            </div>
            <div className="login-svg">
              <img style={{ width: "50%" }} src="new_images/login-bg.svg" />
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
