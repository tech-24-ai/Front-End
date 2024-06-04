import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import { Container, Input, Label, Form, FormGroup, Button } from "reactstrap";
import Image from "next/future/image";
import InputBox from "../../components/form/inputBox";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { crudActions, loaderActions, alertActions } from "../../_actions";
import { crudService } from "../../_services";

const SignUpPage = ({
  getAllCrud,
  showLoader,
  hideLoader,
  warning,
  success,
  error,
}) => {
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const [dataObj, setDataObj] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    tags: "",
    summary: "",
    details: "",
    linkedIn_url: "",
  });

  const handleFormReset = () => {
    setDataObj({
      ...dataObj,
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      tags: "",
      summary: "",
      details: "",
      linkedIn_url: "",
    });
  };

  const consultantSignUp = () => {
    if (dataObj.first_name.length <= 2) {
      warning("Enter first name properly");
    } else if (dataObj.last_name.length <= 2) {
      warning("Enter first last properly");
    } else if (dataObj.mobile < 11) {
      warning("Enter mobile number properly");
    } else {
      crudService
        ._create(
          "consultants/signup",
          {
            first_name: dataObj.first_name,
            middle_name: "",
            last_name: dataObj.last_name,
            // image: "",
            tags: dataObj.tags,
            // country_id: 91,
            profile_summary: dataObj.summary,
            details: dataObj.details,
            linkedin_url: dataObj.linkedIn_url,
            email: dataObj.email,
            mobile: dataObj.mobile,
          },
          showLoader()
        )
        .then((res) => {
          hideLoader();
          if (res.status == 200) {
            success("Sign Up Request Successfully Created");
            setIsPaymentDone(true);
          } else {
            error("Something went wrong!");
          }
        });
    }
  };

  console.log("dataObj", dataObj);

  const inputCSS = {
    // boxShadow: "0 3px 6px 0 rgba(0,0,0,.16)",
    marginTop: "20px",
    borderRadius: "10px",
  };
  return (
    <section className="consultant-sign-up-page-section">
      <Container>
        <div style={{ width: "100%", margin: "0px auto" }}>
          <div className="card">
            <span className="header-lable">Consultant Sign-Up</span>
            {/* <p className="header-detail">Enter your account details</p> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Label className="label">First Name</Label>
                <InputBox
                  style={inputCSS}
                  placeholder="First Name *"
                  value={dataObj.first_name}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, first_name: e.target.value })
                  }
                />
                <Label className="label">Last Name</Label>

                <InputBox
                  style={inputCSS}
                  placeholder="Last Name *"
                  value={dataObj.last_name}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, last_name: e.target.value })
                  }
                />
                <Label className="label">Email Address</Label>

                <InputBox
                  style={inputCSS}
                  type={"email"}
                  placeholder="Email Address *"
                  value={dataObj.email}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, email: e.target.value })
                  }
                />
                <Label className="label">Mobile Number</Label>

                <InputBox
                  style={inputCSS}
                  placeholder="Mobile Number *"
                  value={dataObj.mobile}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, mobile: e.target.value })
                  }
                  maxLength={10}
                  pattern="[0-9]*"
                  required
                />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <Label className="label">Tags</Label>

                <InputBox
                  style={inputCSS}
                  placeholder="Tags"
                  value={dataObj.tags}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, tags: e.target.value })
                  }
                />
                <Label className="label">Profile Summary</Label>

                <InputBox
                  style={inputCSS}
                  placeholder="Profile Summary"
                  value={dataObj.summary}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, summary: e.target.value })
                  }
                />
                <Label className="label">Details</Label>

                <InputBox
                  style={inputCSS}
                  placeholder="Details"
                  value={dataObj.details}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, details: e.target.value })
                  }
                />
                <Label className="label">LinkedIn URL</Label>

                <InputBox
                  style={inputCSS}
                  placeholder="LinkedIn URL"
                  value={dataObj.linkedIn_url}
                  onChange={(e) =>
                    setDataObj({ ...dataObj, linkedIn_url: e.target.value })
                  }
                />
              </div>
            </div>
            <br />
            {/* {!isPaymentDone && (
              <div className="custom-btn with-bg" onClick={consultantSignUp}>
                Submit
              </div>
            )} */}
          </div>
          <div
            className="changed-btn margin"
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
              onClick={handleFormReset}
            >
              Reset
            </Button>
            {!isPaymentDone && (
              <Button
                className="nxt-btn"
                type="submit"
                color="secondary"
                onClick={consultantSignUp}
              >
                Submit
              </Button>
            )}
            {!isPaymentDone && (
              <Button
                className="next-btn"
                type="submit"
                color="secondary"
                onClick={consultantSignUp}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  warning: alertActions.warning,
  success: alertActions.success,
  error: alertActions.error,
};

export default withRouter(connect(mapStateToProps, actionCreators)(SignUpPage));
