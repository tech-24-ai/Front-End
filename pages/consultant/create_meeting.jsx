import React, { useState, useEffect, Fragment } from "react";
import { Space, Input, Radio, Divider, DatePicker } from "antd";
import { Container } from "reactstrap";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import InputBox from "../../components/form/inputBox";
import RadioBox from "../../components/form/radioBox";
import ConnectRadioBox from "../../components/form/connectRadio";
import CustomSelect from "../../components/form/customSelect";
import moment from "moment";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import { crudActions, loaderActions, alertActions } from "../../_actions";
import { crudService } from "../../_services";
import AddTitleIcon from "../../public/new_images/AddTitleIcon.svg";
import DescriptionIcon from "../../public/new_images/DescriptionIcon.svg";
import CompletionDateIcon from "../../public/new_images/CompletionDateIcon.svg";
import DualProfileIcon from "../../public/new_images/DualProfileIcon.svg";
import myImageLoader from "../../components/imageLoader";
import { isBrowser, isMobile } from "react-device-detect";
import momentTimezone from "moment-timezone";
import themeConfig from "../../config/themeConfig";

const createMeeting = ({
  consultant,
  getAllCrud,
  duration,
  time_zone,
  showLoader,
  hideLoader,
  showWarning,
  authentication,
}) => {
  const { TextArea } = Input;
  const [profile, setProfile] = useState({});
  const [bookingDate, setBookingDate] = useState();
  const [selectedDuration, setSelectedDuration] = useState();
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState();
  const [selectedTimeZone, setSelectedTimeZone] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const [selectedPrice, setSelectedPrice] = useState();
  const [timeDuration, setTimeDuration] = useState();
  const [availableSlots, setAvailableSlots] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [defaultLocalTimezone, setDefaultLocalTimezone] = useState();

  useEffect(() => {
    if (!authentication.loggedIn) {
      Router.push("/");
    }
    const consultantsID = sessionStorage.getItem("consultantID");
    if (consultantsID) {
      getAllCrud("consultant", "consultants", {
        consultant_id: consultantsID,
      });
    }
    getAllCrud("time-zone", "time-zone");
  }, []);

  useEffect(() => {
    const defaultZone = time_zone?.find(
      (item) => item.zone === momentTimezone.tz.guess()
    );
    // console.log("defaultZone", defaultZone);
    if (defaultZone && !selectedTimeZone) {
      setSelectedTimeZone(`${defaultZone.id} ${defaultZone.offset}`);
    }
  }, [time_zone]);

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (selectedSkill != undefined) {
      getAllCrud("duration", "duration", {
        consultant_id: consultantsID,
        skill_id: selectedSkill,
      });
      const [selectedRate] =
        skills && skills.filter((item) => item.value === selectedSkill);
      setSelectedPrice(selectedRate.price);
    }
  }, [selectedSkill]);

  // set duration state
  useEffect(() => {
    if (selectedSkill != undefined) {
      const data = duration?.map((value) => {
        return {
          name: `${value.toString()} Min`,
          id: value.toString(),
        };
      });
      setTimeDuration(data);
    }
  }, [duration]);

  useEffect(() => {
    const profileData = {};
    const skills_data = [];
    const lastName = "";
    consultant &&
      consultant.map((data) => {
        skills_data = data.rates.map((item) => ({
          label: item.skill.toString(),
          value: item.skill_id.toString(),
          price: item.amount_per_hour.toString(),
        }));

        profileData = {
          lastName: data.last_name == "null" ? "" : data.last_name,
          name: `${data.first_name} ${lastName}`,
          country: data.country.name,
          summary: data.profile_summary,
          image: data.image,
          rate: findMinRate(skills_data),
          is_company: data.is_company,
        };
      });
    setSkills(skills_data);
    setProfile(profileData);
  }, [consultant]);

  const handleDurationChange = (data) => {
    setSelectedDuration(data.id);
  };
  const handleSlotChange = (data) => {
    setSelectedSlot(data);
  };

  // date picker
  const selectDate = (date, dateString) => {
    setBookingDate({
      label: dateString,
      value: moment(date._d).format("YYYY-MM-DD"),
    });
  };

  // time-zones
  const time_data = time_zone?.map((item) => {
    return {
      label: `(${item.offset}) ${item.name}`,
      value: `${item.id} ${item.offset}`,
    };
  });

  const dateTimeRegex = /^\d+\sUTC\s+/;
  const selectedOffset = selectedTimeZone?.replace(dateTimeRegex, "");
  const visitor_time_zone_id = selectedTimeZone?.split(" ")[0];

  const findMinRate = (rateArray) => {
    if (!rateArray.length) {
      return 0;
    }
    const rateList = rateArray.map((data) => data.price);
    const minRate = Math.min(...rateList);
    return minRate;
  };

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (
      bookingDate != undefined &&
      selectedDuration != undefined &&
      selectedOffset != undefined
    ) {
      crudService
        ._getAll(
          "available-slots",
          {
            consultant_id: consultantsID,
            date: bookingDate.value,
            duration: selectedDuration,
          },
          showLoader()
        )

        .then((response) => {
          if (response.status == 200) {
            if (response.data.message) {
              setAvailableSlots({ message: response.data.message });
            }

            if (response.data && response.data.length) {
              const slotData = response.data.map((slot) => ({
                name: `${moment
                  .parseZone(slot.start)
                  .utcOffset(selectedOffset)
                  .format("LT")} to ${moment
                  .parseZone(slot.end)
                  .utcOffset(selectedOffset)
                  .format("LT")}`,
                id: slot.start,
                booking_utc_time: slot.start,
              }));
              setAvailableSlots(slotData);
            }
          }

          // console.log("Response", slotData);
          // setIsSlotsAvailable(response);
          hideLoader();
        });
    }
  }, [bookingDate, selectedDuration, selectedOffset]);

  const totalPrice = ((selectedPrice / 60) * selectedDuration).toFixed(2);
  const goToConfirmPage = () => {
    const consultantsID = sessionStorage.getItem("consultantID");
    let meetingData = {};

    if (!selectedDuration || !selectedSlot) {
      return showWarning("Pls select all required fields!");
    }

    const [timeZoneDetail] = time_zone?.filter(
      (data) => data.id == visitor_time_zone_id
    );

    const [skill] = skills.filter((data) => data.value === selectedSkill);

    meetingData["skill"] = skill.label;
    meetingData["bookingDate"] = bookingDate;
    meetingData["duration"] = selectedDuration;
    meetingData["meetingTiming"] = selectedSlot;
    meetingData["totalPrice"] = totalPrice;
    meetingData["rate"] = selectedPrice;
    meetingData["consultants_id"] = consultantsID;
    meetingData["timeZone"] = timeZoneDetail;
    meetingData["profile"] = profile;

    localStorage.setItem("meetingDetail", JSON.stringify(meetingData));
    Router.push(`payment`);
  };

  return (
    <section className="consultant-page-section create-meeting">
      <Container>
        <div className="page-content">
          <div className="left-section">
            <div className="heading-section title-section">
              <Image
                loader={myImageLoader}
                src={DualProfileIcon}
                alt=""
                layout="raw"
              />
              <h5 className="heading-text">Create meeting</h5>
            </div>
            {/* <div className="title-section">
              <Image
                loader={myImageLoader}
                src={AddTitleIcon}
                alt=""
                layout="raw"
              />
              <InputBox placeholder="Add title" handleInput={setTitle} />
            </div> */}
            {isBrowser && (
              <div className="wrapper">
                <div className="title-section">
                  <Image
                    loader={myImageLoader}
                    src={CompletionDateIcon}
                    alt=""
                    layout="raw"
                  />
                  <CustomSelect
                    className="skill-selection"
                    placeholder="Select Skill"
                    onChange={(value) => setSelectedSkill(value)}
                    options={skills}
                  />
                  <DatePicker
                    style={{
                      minWidth: "fit-content",
                      marginLeft: "-50px",
                    }}
                    placeholder="Select Date"
                    disabledDate={(current) =>
                      current.isBefore(moment().subtract(1, "day"))
                    }
                    format={"dddd, MMM D, YYYY"}
                    onChange={selectDate}
                  />
                </div>
              </div>
            )}
            {isMobile && (
              <Fragment>
                <div className="wrapper">
                  <CustomSelect
                    className="skill-selection"
                    placeholder="Select Skill"
                    onChange={(value) => setSelectedSkill(value)}
                    options={skills}
                  />
                </div>
                <div className="wrapper">
                  <div className="title-section">
                    <Image
                      loader={myImageLoader}
                      src={CompletionDateIcon}
                      alt=""
                      layout="raw"
                    />

                    <DatePicker
                      placeholder="Select Date"
                      disabledDate={(current) =>
                        current.isBefore(moment().subtract(1, "day"))
                      }
                      format={"dddd, MMM D, YYYY"}
                      onChange={selectDate}
                    />
                  </div>
                </div>
              </Fragment>
            )}
            <div className="wrapper">
              <div style={{ padding: "0px" }} className="title-section">
                <CustomSelect
                  className="time-zone-selection"
                  placeholder="Select Time-Zone"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  onChange={(value) => {
                    console.log("Value", value);
                    setSelectedTimeZone(value);
                  }}
                  options={time_data}
                  value={selectedTimeZone}
                />
              </div>
            </div>
            <div className="meeting-minute-section duration">
              <label htmlFor="">Duration</label>
              <ConnectRadioBox
                options={timeDuration}
                value={selectedDuration}
                onChange={handleDurationChange}
              />
            </div>

            <div className="meeting-minute-section slots">
              <label htmlFor="">Available Slots</label>
              {availableSlots && availableSlots.message && (
                <div className="slot-not-available">
                  {availableSlots.message}
                </div>
              )}
              {availableSlots && !availableSlots.message && (
                <ConnectRadioBox
                  options={availableSlots}
                  value={selectedSlot && selectedSlot.id}
                  onChange={handleSlotChange}
                />
              )}
            </div>
            {/* <div className="title-section">
              <Image
                loader={myImageLoader}
                src={DescriptionIcon}
                alt=""
                layout="raw"
              />
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />
            </div> */}
            <Divider />
            <div className="estimate-section">
              <div className="estimate">
                <h5 className="title">Estimate</h5>
                <p className="text">You'll be billed by the minute</p>
              </div>
              <div className="amount">
                <h5 className="rate">${isNaN(totalPrice) ? 0 : totalPrice}</h5>
                <p className="text">Inclusive of {themeConfig.appName} fees</p>
              </div>
            </div>

            <div className="custom-btn with-bg" onClick={goToConfirmPage}>
              Continue
            </div>
          </div>
          <div className="right-section">
            <div className="card">
              <div className="self-description-section">
                <div className="logo">
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={100}
                    height={100}
                    preview="false"
                    src={
                      profile.image
                        ? profile.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                    }
                    alt="profile"
                  />
                </div>
                <h5 className="title">{profile.name}</h5>
                <p className="address">
                  <span className="icon">
                    <EnvironmentOutlined />
                  </span>
                  {profile.country}
                </p>
                <p className="designation">{profile.summary}</p>
                <div className="rate-detail">
                  {/* <p>Starts at</p> */}

                  <p>
                    Starts at{" "}
                    {profile.is_company ? (
                      <Fragment>
                        <span>$ 5000</span>/Project
                      </Fragment>
                    ) : (
                      <Fragment>
                        <span>$ {findMinRate(skills)}</span>/Hour
                      </Fragment>
                    )}
                    <br />
                    (all inclusive)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  const {
    consultant,
    booking_history,
    duration,
    slots,
    time_zone,
    authentication,
  } = state;
  return {
    consultant,
    booking_history,
    duration,
    slots,
    time_zone,
    authentication,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  showWarning: alertActions.warning,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(createMeeting)
);
