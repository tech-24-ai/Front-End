import React, { useEffect, useState } from "react";
import { Input, Radio, DatePicker, Button, Upload } from "antd";
import { Container } from "reactstrap";
import {
  SearchOutlined,
  EnvironmentOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Image from "next/future/image";
import InputBox from "../../components/form/inputBox";
import myImageLoader from "../../components/imageLoader";

import AddTitleIcon from "../../public/new_images/AddTitleIcon.svg";
import DualProfileIcon from "../../public/new_images/DualProfileIcon.svg";
import DescriptionIcon from "../../public/new_images/DescriptionIcon.svg";
import UploadFileIcon from "../../public/new_images/UploadFileIcon.svg";
import CompletionDateIcon from "../../public/new_images/CompletionDateIcon.svg";
import ProjectCostIcon from "../../public/new_images/ProjectCostIcon.svg";
import ProtectionIcon from "../../public/new_images/ProtectionIcon.svg";
import { crudActions } from "../../_actions";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import moment from "moment";
import themeConfig from "../../config/themeConfig";

const HireConsultant = ({ consultant, getAllCrud }) => {
  const [profile, setProfile] = useState();
  const [skills, setSkills] = useState();
  const { TextArea } = Input;

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (consultantsID) {
      getAllCrud("consultant", "consultants", {
        consultant_id: consultantsID,
      });
    }
  }, []);

  useEffect(() => {
    const profileData = {};
    const skills_data = [];
    const lastName = "";
    consultant &&
      consultant.map((data) => {
        profileData = {
          lastName: data.last_name == "null" ? "" : data.last_name,
          name: `${data.first_name} ${lastName}`,
          country: data.country.name,
          summary: data.profile_summary,
          image: data.image,
        };
        skills_data = data.rates.map((item) => ({
          label: item.skill.toString(),
          value: item.skill.toString(),
          price: item.amount_per_hour.toString(),
        }));
      });
    setSkills(skills_data);
    setProfile(profileData);
  }, [consultant]);

  const findMinRate = (rateArray) => {
    if (!rateArray?.length) {
      return 0;
    }
    const rateList = rateArray.map((data) => data.price);
    const minRate = Math.min(...rateList);
    return minRate;
  };

  // date picker
  const selectDate = (date, dateString) => {
    moment(date._d).format("YYYY-MM-DD");
  };

  //   file uploading
  const props = {
    action: "//jsonplaceholder.typicode.com/posts/",
    listType: "picture",
    previewFile(file) {
      console.log("Your upload file:", file);
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  };

  console.log("hire-consultant", consultant);

  return (
    <section className="hire-consultant-page">
      <Container>
        <div>
          <div className="heading-flex">
            <Image
              loader={myImageLoader}
              src={DualProfileIcon}
              alt=""
              layout="raw"
            />

            <h4>Hire for project</h4>
          </div>

          <div className="hire-flex">
            <Image
              loader={myImageLoader}
              src={AddTitleIcon}
              alt=""
              layout="raw"
            />

            <InputBox className="inputBox" placeholder="Add title" />
          </div>

          <div className="hire-flex">
            <Image
              loader={myImageLoader}
              src={DescriptionIcon}
              alt=""
              layout="raw"
            />

            <TextArea
              className="inputBox description"
              placeholder="Description"
            />
          </div>

          <div className="hire-flex">
            <Image
              loader={myImageLoader}
              src={UploadFileIcon}
              alt=""
              layout="raw"
            />

            <InputBox className="inputBox" placeholder="Upload File" />

            {/* <Upload className="inputBox" {...props}>
              <Button className="inputBox" icon={<UploadOutlined />}>
                Upload File
              </Button>
            </Upload> */}
          </div>

          <div className="hire-flex">
            <Image
              loader={myImageLoader}
              src={CompletionDateIcon}
              alt=""
              layout="raw"
            />

            {/* <InputBox className="inputBox" placeholder="Completion Date" /> */}

            <DatePicker
              className="inputBox"
              placeholder="Select Date"
              disabledDate={(current) =>
                current.isBefore(moment().subtract(1, "day"))
              }
              format={"dddd, MMM D, YYYY"}
              onChange={selectDate}
            />
          </div>

          <div className="hire-flex">
            <Image
              loader={myImageLoader}
              src={ProjectCostIcon}
              alt=""
              layout="raw"
            />

            <InputBox
              type="number"
              className="inputBox"
              placeholder="Project Cost"
            />
          </div>
          <br />
          <hr />
          {/* <Divider /> */}

          <div className="hire-calculation">
            <div>
              <p>Project cost</p>
              <p>{themeConfig.appName} fee</p>
              <p className="total">Total</p>
            </div>
            <div className="calc">
              <p>$0</p>
              <p>$0</p>
              <p className="total">$0</p>
              {/* <button>Continue</button> */}
              <div className="custom-btn with-bg">Continue</div>
            </div>
          </div>
        </div>

        {/* aside div */}

        <div>
          <div className="right-section">
            <div className="card">
              <div className="self-description-section">
                <div className="logo">
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    preview={false}
                    src={
                      profile?.image
                        ? profile?.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="profile"
                  />
                </div>
                <h5 className="title">{profile?.name}</h5>
                <p className="address">
                  <span className="icon">
                    <EnvironmentOutlined />
                  </span>
                  {profile?.country}
                </p>
                <p className="designation">{profile?.summary}</p>
                <div className="rate-detail">
                  <p>Video Meeting</p>
                  <p>
                    <span>$ {findMinRate(skills)}</span>/ min (all inclusive)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-protection-section">
            <Image
              loader={myImageLoader}
              src={ProtectionIcon}
              alt=""
              layout="raw"
            />
            <h4>100% payment protection</h4>
            <p>
              Your funds are safe with {themeConfig.appName} until you approve
              Mike's work
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { consultant } = state;
  return {
    consultant,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(HireConsultant)
);
