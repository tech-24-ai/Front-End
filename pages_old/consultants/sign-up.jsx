import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Button, Container, FormGroup, Input } from "reactstrap";
import { crudActions, loaderActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Card } from "antd";
import { crudService } from "../../_services";

const signUp = ({ getAllCrud, getAllPost, showLoader, hideLoader }) => {
  const [dataObj, setDataObj] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: 0,
    tags: "",
    summary: "",
    details: "",
    linkedIn_url: "",
  });

  const consultantSignUp = () => {
    if (dataObj.first_name.length <= 2) {
      alert("enter first name properly");
    } else if (dataObj.last_name.length <= 2) {
      alert("enter last name properly");
    } else if (dataObj.mobile < 11) {
      alert("enter mobile number properly");
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
            alert("Sign Up Request Successfully Created");
          } else {
            alert("Something went wrong!");
          }
        });
    }
  };

  console.log("dataObj", dataObj);

  const inputCSS = {
    boxShadow: "0 3px 6px 0 rgba(0,0,0,.16)",
    marginTop: "20px",
  };
  return (
    <Container>
      <div>
        <div style={{ width: "85%", margin: "0px auto" }}>
          <p>Consultant sign up</p>
          <Card
            hoverable
            style={{
              width: "60%",
              margin: "0px auto",
              minHeight: "450px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#fff",
              borderRadius: "10px",
              backgroundColor: "rgb(235,235,235)",
            }}
          >
            <Input
              style={inputCSS}
              placeholder="First Name *"
              onChange={(e) =>
                setDataObj({ ...dataObj, first_name: e.target.value })
              }
            />

            <Input
              style={inputCSS}
              placeholder="Last Name *"
              onChange={(e) =>
                setDataObj({ ...dataObj, last_name: e.target.value })
              }
            />

            <Input
              style={inputCSS}
              type={"email"}
              placeholder="Email Address *"
              onChange={(e) =>
                setDataObj({ ...dataObj, email: e.target.value })
              }
            />
            <Input
              style={inputCSS}
              placeholder="Mobile Number *"
              onChange={(e) =>
                setDataObj({ ...dataObj, mobile: e.target.value })
              }
            />

            <Input
              style={inputCSS}
              placeholder="Tags"
              onChange={(e) => setDataObj({ ...dataObj, tags: e.target.value })}
            />
            <Input
              style={inputCSS}
              placeholder="Profile Summary"
              onChange={(e) =>
                setDataObj({ ...dataObj, summary: e.target.value })
              }
            />

            <Input
              style={inputCSS}
              placeholder="Details"
              onChange={(e) =>
                setDataObj({ ...dataObj, details: e.target.value })
              }
            />
            <Input
              style={inputCSS}
              placeholder="LinkedIn URL"
              onChange={(e) =>
                setDataObj({ ...dataObj, linkedIn_url: e.target.value })
              }
            />

            <br />
            <Button onClick={consultantSignUp} style={{ padding: "10px 30px" }}>
              Submit
            </Button>
          </Card>
        </div>
        <BodyBackgroundColor color="#fff" />
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  getAllPost: crudActions._create,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(connect(mapStateToProps, actionCreators)(signUp));
