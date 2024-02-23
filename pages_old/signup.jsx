import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  CustomInput,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import Hide from "../public/images/input/hide.svg";
import Show from "../public/images/input/show.svg";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";

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
          <div className="signup-block">
            <div className="signup-content">
              <h3 className="main-title">Signup</h3>
              <Form
                className="form-block signup-form"
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={this.handleChange}
                    value={user.email}
                  />
                  {submitted && !user.email && (
                    <div className="help-block">Email is required</div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type={hidden ? "password" : "text"}
                    name="password"
                    id="Password"
                    placeholder="Password"
                    autoComplete="off"
                    className="password"
                    onChange={this.handleChange}
                    value={user.password}
                  />
                  {submitted && !user.password && (
                    <div className="help-block">Password is required</div>
                  )}
                  <div className="hide-show-image">
                    <img
                      src={hidden ? `${Hide.src}` : `${Show.src}`}
                      className="hide"
                      onClick={this.toggleShow}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
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
                </FormGroup>

                <div className="login-signup-btn site-btn button-wrapper">
                  <Button color="secondary">Sign Up</Button>
                  <Link href="/login">
                    <a className="login-btn">Login</a>
                  </Link>
                </div>
                <div className="input-link">
                  <p>By Signing in, you agree to ITMAP’s</p>
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
