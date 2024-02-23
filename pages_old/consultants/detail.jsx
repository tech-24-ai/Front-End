import React, { useEffect, useState, useRef } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { DatePicker, Space, Card, Image, Rate, Carousel, Select } from "antd";
import { connect } from "react-redux";
import Router, { withRouter, useRouter } from "next/router";
import Link from "next/link";
import { crudActions, loaderActions } from "../../_actions";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import moment from "moment";
import { crudService } from "../../_services";
import { isBrowser } from "react-device-detect";

const consultantDetails = ({
  consultant,
  booking_history,
  args,
  getAllCrud,
  duration,
  slots,
  showLoader,
  hideLoader,
  time_zone,
}) => {
  const [loading, setLoading] = useState(false);
  const [isSlotsAvailable, setIsSlotsAvailable] = useState(null);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [skill, setSkill] = useState();
  const [selectedSkill, setSelectedSkill] = useState();
  const [timeDuration, setTimeDuration] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [bookingDate, setBookingDate] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [activeDisk, setActiveDisk] = useState();
  const [timings, setTimings] = useState();
  const [selectedTimeZone, setSelectedTimeZone] = useState();

  // date picker
  const selectDate = (date, dateString) => {
    setBookingDate(dateString);
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

  // console.log("time_data", time_data);
  // const uniqueArray = Array.from(
  //   new Set(time_data?.map((a) => JSON.stringify({ label: a.label })))
  // ).map((str) => JSON.parse(str));
  // skill's filtering
  useEffect(() => {
    const skills_data =
      consultant &&
      consultant[0].rates.map((item) => ({
        label: item.skill.toString(),
        value: item.skill.toString(),
        price: item.amount_per_hour.toString(),
      }));

    setSkill(skills_data);
  }, [consultant]);

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (selectedSkill != undefined) {
      getAllCrud("duration", "duration", {
        consultant_id: consultantsID,
        skill: selectedSkill,
      });
      const data = duration?.map((value) => {
        return {
          label: value.toString(),
          value: value.toString(),
        };
      });
      setTimeDuration(data);

      const [selectedRate] =
        skill && skill.filter((item) => item.value === selectedSkill);
      setSelectedPrice(selectedRate.price);
    }
  }, [selectedSkill]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (consultantsID) {
      getAllCrud("consultant", "consultants", {
        consultant_id: consultantsID,
      });
    }
    getAllCrud("time-zone", "time-zone");
  }, []);
  useEffect(() => {
    const consultantsID = sessionStorage.getItem("consultantID");
    if (
      bookingDate != undefined &&
      selectedTimeSlot != undefined &&
      selectedOffset != undefined
    ) {
      crudService
        ._getAll(
          "available-slots",
          {
            consultant_id: consultantsID,
            date: bookingDate,
            duration: selectedTimeSlot,
          },
          showLoader()
        )

        .then((response) => {
          setIsSlotsAvailable(response);
          hideLoader();
        });
    }
  }, [bookingDate, selectedTimeSlot, selectedOffset]);

  const sendData = () => {
    const consultantsID = sessionStorage.getItem("consultantID");
    let usersData = {};

    usersData["skill"] = selectedSkill;
    usersData["bookingDate"] = bookingDate;
    usersData["timeSlot"] = selectedTimeSlot;
    usersData["startTiming"] = timings;
    usersData["pricing"] = pricing;
    usersData["rate"] = selectedPrice;
    usersData["consultants_id"] = consultantsID;
    usersData["visitor_time_zone_id"] = visitor_time_zone_id;

    localStorage.setItem("usersData", JSON.stringify(usersData));
    Router.push(`payment`);
  };

  const pricing = selectedPrice * selectedTimeSlot;

  console.log("consultant", consultant);
  console.log("isSlotsAvailable", isSlotsAvailable);

  return (
    <Container>
      {consultant &&
        consultant.map((data) => (
          <div className="consultant-details">
            <p className="heading">consultant details</p>
            <div className="profile-container">
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={100}
                      height={100}
                      preview={false}
                      src={
                        data.image
                          ? data.image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
                      }
                      alt="profile-image"
                    />
                  </div>
                  <div className="profile-container-div1">
                    <p>
                      {data.first_name} {data.last_name}
                    </p>
                    {/* <p>Experience</p> */}
                    {/* {data && data.regions.map((item) => <p>{item.name}</p>)} */}
                    <p>{data.country?.name}</p>
                  </div>
                </div>
                <p className="profile-text">{data.details}</p>
              </div>
              <div className="profile-container-div2">
                <p className="heading">technologies</p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    maxHeight: "155px",
                    overflowY: "scroll",
                  }}
                >
                  {data &&
                    data.technologies?.map((module) => {
                      return module.name == "" ? <></> : <li>{module.name}</li>;
                    })}
                </div>
              </div>
            </div>

            <div className="work-container">
              <div className="div1">
                <p className="heading" style={{ marginBottom: "0px" }}>
                  Work Experience
                </p>
                <CarouselData data={data} />
              </div>
              <div className="div2">
                <p className="heading">Rate Card</p>
                {data &&
                  data.rates.map((item) => (
                    <p className="profile-text">
                      {item.skill} - $ {item.amount_per_hour}/ hour
                    </p>
                  ))}
              </div>
            </div>

            <div className="booking-container">
              <p className="heading">Book Schedule</p>
              <div>
                <Select
                  defaultValue="Select Skill"
                  style={{
                    width: isBrowser ? "200px" : "100%",
                  }}
                  onChange={(value) => setSelectedSkill(value)}
                  options={skill}
                />
                <Space
                  className="space-selector"
                  style={{
                    width: isBrowser ? "200px" : "100%",
                    fontWeight: "bold",
                    marginLeft: isBrowser ? "40px" : "0px",
                    height: "40px",
                  }}
                  direction="vertical"
                >
                  <DatePicker
                    placeholder="Select Date"
                    disabledDate={(current) =>
                      current.isBefore(moment().subtract(1, "day"))
                    }
                    onChange={selectDate}
                  />
                </Space>

                <Select
                  className="space-selector"
                  defaultValue="Select Duration"
                  style={{
                    width: isBrowser ? "200px" : "100%",
                  }}
                  onChange={(value) => setSelectedTimeSlot(value)}
                  options={timeDuration}
                />

                <Select
                  className="space-selector"
                  showSearch
                  style={{
                    width: isBrowser ? "250px" : "100%",
                    marginLeft: isBrowser ? "40px" : "0",
                  }}
                  placeholder="Select Time-Zone"
                  onChange={(value) => setSelectedTimeZone(value)}
                  // onSearch={(value) => console.log("search-value", value)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={time_data}
                />
              </div>

              <div className="slot-container">
                {isSlotsAvailable && isSlotsAvailable?.data?.message ? (
                  <div style={{ backgroundColor: "#F4F6F6", border: "none" }}>
                    {isSlotsAvailable.data.message}
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {isSlotsAvailable?.data?.message
                ? null
                : isSlotsAvailable &&
                  isSlotsAvailable.data?.map(
                    (item) =>
                      item?.length == 0 && (
                        <div
                          className="slot-container"
                          style={{ margin: "5px 0px 0px 0px" }}
                        >
                          <div
                            style={{
                              backgroundColor: "#F4F6F6",
                              border: "none",
                            }}
                          >
                            Slot not available on {bookingDate}
                          </div>
                        </div>
                      )
                  )}

              {isSlotsAvailable?.data?.message ? null : (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                  className="radioBox"
                >
                  {isSlotsAvailable?.data?.map((data, sIndex) => (
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        marginRight: "10px",
                      }}
                      className={`radio-box-wrapper column-class`}
                    >
                      <FormGroup>
                        <Label
                          style={{ minWidth: "200px" }}
                          className={
                            activeDisk == `${sIndex}-${sIndex}`
                              ? "labelChecked"
                              : ""
                          }
                        >
                          <Input
                            type="radio"
                            checked={activeDisk == `${sIndex}-${sIndex}`}
                            onClick={() => {
                              setActiveDisk(`${sIndex}-${sIndex}`);
                            }}
                            onChange={() =>
                              setTimings({
                                startTime: moment
                                  .parseZone(data.start)
                                  .utcOffset(selectedOffset)
                                  .format("LT"),
                                endTime: moment
                                  .parseZone(data.end)
                                  .utcOffset(selectedOffset)
                                  .format("LT"),
                                booking_utc_time: data.start,
                              })
                            }
                          />
                          {moment
                            .parseZone(data.start)
                            .utcOffset(selectedOffset)
                            .format("LT")}{" "}
                          to{" "}
                          {moment
                            .parseZone(data.end)
                            .utcOffset(selectedOffset)
                            .format("LT")}
                        </Label>
                      </FormGroup>
                    </div>
                  ))}
                </div>
              )}

              <div className="button-container">
                <div>
                  <p className="profile-text">
                    Booking Amount/Credits $ {(pricing = pricing || 0)}
                  </p>
                </div>
                {booking_history &&
                booking_history.booking_status == "Confirmed" ? (
                  <></>
                ) : (
                  <Button
                    style={{
                      opacity: activeDisk == undefined ? 0.5 : 1,
                      pointerEvents: activeDisk == undefined ? "none" : "unset",
                    }}
                    onClick={sendData}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </div>
            <BodyBackgroundColor color="#fff" />
          </div>
        ))}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { consultant, booking_history, duration, slots, time_zone } = state;
  return {
    consultant,
    booking_history,
    duration,
    slots,
    time_zone,
  };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(consultantDetails)
);

const CarouselData = ({ data }) => {
  const carousel = useRef(null);
  const next = () => {
    carousel.next();
  };
  const previous = () => {
    carousel.prev();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {data && data.works.length ? (
        <>
          <CaretLeftOutlined className="newbutton" onClick={previous} />
          <Carousel
            style={{ width: isBrowser ? "330px" : "100%" }}
            effect="fade"
            ref={(node) => (carousel = node)}
          >
            {data &&
              data.works.map((worksData) => (
                <div className="workContainer">
                  <Image
                    width={"55px"}
                    height={"45px"}
                    preview={false}
                    src={worksData.company_logo}
                    alt="logo"
                    style={{ borderRadius: "50%", marginLeft: "5px" }}
                  />
                  <div style={{ marginLeft: "25px", width: "100%" }}>
                    <p className="work-company">{worksData.company_name}</p>
                    <p style={{ fontWeight: "300", fontSize: "13px" }}>
                      {worksData.designation}
                    </p>
                    <p>
                      {worksData.from_year} to{" "}
                      {worksData.to_year == null
                        ? "Present"
                        : worksData.to_year}
                    </p>
                  </div>
                </div>
              ))}
          </Carousel>
          <CaretRightOutlined className="newbutton" onClick={next} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
