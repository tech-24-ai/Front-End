import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  CustomInput,
  ButtonGroup,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import Hide from "../public/new_images/hide.svg";
import Show from "../public/images/input/show.svg";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";
import loginIcon from "../public/new_images/login-bg.svg";
import EmailIcon from "../public/new_images/email-icon.svg";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import themeConfig from "../../config/themeConfig";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      user: {
        email: "",
        password: "",
        mobile: "",
      },
      submitted: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    // if (user.email && user.password && user.mobile) {
    //     this.props.register(user);
    // }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };

  toggleShow = () => {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  };

  render() {
    const { hidden, submitted, user } = this.state;
    return (
      <section className="signup-wrapper">
        <Container>
          <div className="form-login-container">
            <div
              // className="signup-block"
              style={{
                width: "40%",
                height: "100vh",
              }}
            >
              <BrowserView
                // viewClassName="login-title-link"
                style={{ position: "relative", top: "20px" }}
              >
                <h3
                  style={{
                    fontSize: "42px",
                    fontWeight: "600",
                    lineHeight: "56px",
                  }}
                  className="sign-title"
                >
                  Sign Up
                </h3>
                <h6 className="login-details">Enter your account details</h6>
              </BrowserView>
              <Form
                className="form-block signup-form"
                style={{ position: "relative", top: "50px" }}
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <h6>Name</h6>
                  <Input
                    type="name"
                    name="name"
                    id="Name"
                    placeholder="Name"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={user.name}
                    style={{
                      height: "64px",
                      left: "0px",
                      right: "0px",
                      top: "28px",
                      border: "1px solid #CFDBD5",
                      borderRadius: "8px",
                    }}
                  />
                  {/* {isBrowser && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: "20px",
                                                width: "26px",
                                                height: "22.7px",
                                                top: "48px"
                                            }}
                                        >
                                            <img
                                                src={EmailIcon.src}
                                            />
                                        </div>
                                    )} */}
                </FormGroup>
                {submitted && !user.name && (
                  <div
                    style={{
                      position: "absolute",
                      top: "96px",
                    }}
                    // className="help-block"
                  >
                    Name is required
                  </div>
                )}
                <FormGroup>
                  <h6 style={{ position: "relative", top: "6px" }}>Email</h6>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={user.email}
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
                      style={{
                        position: "absolute",
                        right: "20px",
                        width: "26px",
                        height: "22.7px",
                        top: "158px",
                      }}
                    >
                      <img src={EmailIcon.src} />
                    </div>
                  )}
                </FormGroup>
                {submitted && !user.email && (
                  <div
                    style={{
                      position: "absolute",
                      top: "204px",
                    }}
                    // className="help-block"
                  >
                    Email is required
                  </div>
                )}
                <FormGroup>
                  <h6 style={{ position: "relative", top: "6px" }}>Password</h6>
                  <Input
                    type={hidden ? "password" : "text"}
                    name="password"
                    id="Password"
                    placeholder="Password"
                    autoComplete="off"
                    className="password"
                    onChange={this.handleChange}
                    value={user.password}
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
                        top: "260px",
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
                {submitted && !user.password && (
                  <div
                    style={{
                      position: "absolute",
                      top: "310px",
                    }}
                    // className="help-block"
                  >
                    Password is required
                  </div>
                )}
                <FormGroup
                  className="checkbox-password"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    top: "18px",
                    position: "relative",
                  }}
                >
                  {isBrowser && (
                    <CustomInput
                      type="checkbox"
                      id="exCustomCheckbox"
                      label="I agree to receive email and updates"
                      background="#F5F5FA"
                    />
                  )}
                  {isBrowser && (
                    <CustomInput
                      type="checkbox"
                      id="CustomCheckbox"
                      label="I have read and agree to Terms of Service"
                      background="#F5F5FA"
                    />
                  )}
                </FormGroup>
                {/* <FormGroup>
                                    <h6>Phone Number</h6>
                                    <PhoneInput
                                        onChange={(value) =>
                                            this.handleChange({ target: { name: "mobile", value } })
                                        }
                                        country={"in"}
                                        placeholder="Phone number"
                                        value={user.mobile}
                                        inputProps={{
                                            required: true,
                                            autoFocus: true,
                                        }}
                                    />
                                    {submitted && !user.mobile && (
                                        <div className="help-block">Mobile Number is required</div>
                                    )}
                                </FormGroup> */}
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
                      Create an account{" "}
                      {isMobile && (
                        <span>
                          <img src={RightArrow.src} className="arrow" />
                        </span>
                      )}
                    </Button>
                  </ButtonGroup>
                </div>

                {/* <div className="login-signup-btn site-btn button-wrapper">
                                    <Button 
                                        style={{
                                            background: "#075aee", borderRadius: "8px", height: "50px"
                                        }}
                                    color="secondary">Sign Up</Button>
                                    <Link href="/login">
                                        <a className="login-btn">Login</a>
                                    </Link>
                                </div> */}
                <div
                  // className="input-link"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "max-content",
                  }}
                >
                  <p>By Signing in, you agree to {themeConfig.appName}’s</p>
                  <div style={{ marginLeft: "6px" }}>
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
                src="new_images/login-bg.svg"
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

const actionCreators = {
  register: userActions.register,
};

export default connect(null, actionCreators)(SignUp);
