// import React, { useState, useEffect } from "react";
// import { Radio, Space, Tabs } from "antd";
// import { connect } from "react-redux";
// import { crudActions, alertActions } from "../_actions";
// import Image from "next/image";
// import {
//   UserOutlined,
//   HistoryOutlined,
//   BookOutlined,
//   CreditCardOutlined,
//   FileTextOutlined,
//   DollarCircleOutlined,
//   ProfileOutlined,
// } from "@ant-design/icons";
// import UserProfile from "../components/userProfile/index";
// import LoginCred from "../components/userProfile/loginCred";
// import ProfessionalDetails from "../components/userProfile/professionalDetails";
// import History from "../components/userProfile/history";
// import BookedConsultant from "../components/userProfile/bookedConsultant";
// import CreditPurchase from "../components/userProfile/creditPurchase";
// import CreditPurchaseHistory from "../components/userProfile/creditPurchaseHistory";
// import CreditRedeemHistory from "../components/userProfile/creditRedeemHistory";
// import SubscriptionDetail from "../components/userProfile/subscriptionDetail";
// import SubscriptionHistory from "../components/userProfile/subscriptionHistory";
// import DonationHistory from "../components/userProfile/donationHistory";
// import { isBrowser } from "react-device-detect";
// import { Container, Input, Label, Form, FormGroup, Button } from "reactstrap";
// import ProfileImg from "../public/new_images/Profile/profile.svg";
// import ProfileIcon from "../public/new_images/Profile/profile-icon.svg";
// import ProfileIconBg from "../public/new_images/Profile/profile-icon-bg.svg";
// import ProfessionalIcon from "../public/new_images/Profile/professional-icon.svg";
// import ProfessionalIconBg from "../public/new_images/Profile/professional-icon-bg.svg";
// import SecurityIcon from "../public/new_images/Profile/security-icon.svg";
// import SecurityIconBg from "../public/new_images/Profile/security-icon-bg.svg";
// import SelectionIcon from "../public/new_images/Profile/professional-selection.svg";
// import EducationIcon from "../public/new_images/Profile/education-icon.svg";
// import AddIcon from "../public/new_images/Profile/add.svg";
// import EditIcon from "../public/new_images/Profile/edit.svg";

// const Profile = (props) => {
//   const [selectedButton, setSelectedButton] = useState("Account");

//   const handleButtonClick = (buttonName) => {
//     setSelectedButton(buttonName);
//   };

//   const {
//     authentication,
//     get_subscription,
//     subscription_history,
//     purchase_history,
//   } = props;

//   const [editField, setEditField] = useState("");
//   const [currentTab, setCurrentTab] = useState("personalTab");
//   const [expandedPanel, setExpandedPanel] = useState("");
//   const [data, setData] = useState(authentication.user.data.data);
//   const [activeSubscription, setActiveSubscription] = useState(null);
//   const [tooltipOpen, setTooltip] = useState(false);
//   const [activeTab, setActiveTab] = useState();

//   const toggleTip = (id) => {
//     tooltipOpen === id ? setTooltip(false) : setTooltip(id);
//   };

//   const TabChangeHandler = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const handleChange = (panel) => (event) => {
//     setExpandedPanel(expandedPanel === panel ? "" : panel);
//   };

//   const onChangeHandle = (event) => {
//     setData({ ...data, [event.target.name]: event.target.value });
//   };

//   useEffect(() => {
//     props.getAllCrud("get_subscription", "get_subscription");
//     props.getAllCrud("subscription_history", "subscription_history");
//     // props.getAllCrud("purchase_history", "purchase_history");
//   }, []);

//   useEffect(() => {
//     if (
//       get_subscription &&
//       get_subscription != undefined &&
//       get_subscription != null &&
//       get_subscription.length
//     ) {
//       get_subscription.filter((activeSub) => {
//         if (activeSub.is_active === 1 && activeSub.plans != null) {
//           setActiveSubscription(activeSub);
//         }
//       });
//     }
//   }, [get_subscription]);
//   // let selectedComponent;
//   // switch (selectedButton) {
//   //     case 'Account':
//   //         selectedComponent = <UserProfile />;
//   //         break;
//   //     case 'Professional':
//   //         selectedComponent = <ProfessionalDetails />;
//   //         break;
//   //     case 'Login':
//   //         selectedComponent = <LoginCred />;
//   //         break;
//   //     default:
//   //         selectedComponent = <UserProfile />;
//   // }

//   const componentMap = {
//     Account: <UserProfile />,
//     Professional: <ProfessionalDetails />,
//     Login: <LoginCred />,
//     History: <History />,
//     BookedConsultant: <BookedConsultant />,
//     CreditPurchase: <CreditPurchase />,
//     // CreditPurchaseHistory: <CreditPurchaseHistory />,
//     CreditRedeemHistory: <CreditRedeemHistory />,
//     SubscriptionDetail: <SubscriptionDetail />,
//     SubscriptionHistory: <SubscriptionHistory />,
//     DonationHistory: <DonationHistory />,
//   };

//   const selectedComponent = componentMap[selectedButton] || <UserProfile />;

//   useEffect(() => {
//     const sessionData = sessionStorage.getItem("profileCreditPurchase");
//     if (sessionData) {
//       setSelectedButton(sessionData);
//     }
//     return () => {
//       sessionStorage.removeItem("profileCreditPurchase");
//     };
//   }, []);

//   return (
//     <Container>
//       <div className="profile-user">
//         <div className="card-tab">
//           <div
//             className="mask"
//             style={{ position: "relative", top: "20px" }}
//           ></div>
//           <div className="profile-alt" style={{ textAlign: "center" }}>
//             {/* <img src={ProfileImg.src} alt="profile"/> */}
//             <Image
//               style={{ borderRadius: "50%" }}
//               width={100}
//               height={100}
//               preview="false"
//               src={
//                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
//               }
//               alt="profile"
//             />
//             <h4 className="profile-name">{data.name}</h4>
//             <h6>{data.email}</h6>
//           </div>

//           <div
//             className={`ctrl ${selectedButton === "Account" ? "selected" : ""}`}
//             onClick={() => handleButtonClick("Account")}
//             role="button"
//             tabIndex={0}
//           >
//             <UserOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Account Information</h4>
//               <p className="ctrl-detail">Profile Photo, and name</p>
//             </div>
//           </div>

//           <div
//             className={`ctrl ${selectedButton === "History" ? "selected" : ""}`}
//             onClick={() => handleButtonClick("History")}
//             role="button"
//             tabIndex={1}
//           >
//             <HistoryOutlined style={{ marginLeft: "24px" }} />

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Booking History</h4>
//               <p className="ctrl-detail">Upcoming and Past booking details </p>
//             </div>
//           </div>

//           <div
//             className={`ctrl ${
//               selectedButton === "BookedConsultant" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("BookedConsultant")}
//             role="button"
//             tabIndex={2}
//           >
//             <BookOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Booked Consultants</h4>
//               <p className="ctrl-detail">Consultants</p>
//             </div>
//           </div>

//           <div
//             className={`ctrl ${
//               selectedButton === "CreditPurchase" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("CreditPurchase")}
//             role="button"
//             tabIndex={3}
//           >
//             <CreditCardOutlined style={{ marginLeft: "24px" }} />

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Credit Purchase</h4>
//               <p className="ctrl-detail">Credit Purchase</p>
//             </div>
//           </div>

//           {/* <div
//             className={`ctrl ${
//               selectedButton === "CreditPurchaseHistory" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("CreditPurchaseHistory")}
//             role="button"
//             tabIndex={4}
//           >
//             <FileTextOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Credit Purchase History</h4>
//               <p className="ctrl-detail">Credit Purchase History</p>
//             </div>
//           </div> */}

//           <div
//             className={`ctrl ${
//               selectedButton === "CreditRedeemHistory" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("CreditRedeemHistory")}
//             role="button"
//             tabIndex={5}
//           >
//             <FileTextOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Credit Redeem History</h4>
//               <p className="ctrl-detail">Credit Redeem History</p>
//             </div>
//           </div>

//           <div
//             className={`ctrl ${
//               selectedButton === "SubscriptionDetail" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("SubscriptionDetail")}
//             role="button"
//             tabIndex={6}
//           >
//             <DollarCircleOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Subscription Detail</h4>
//               <p className="ctrl-detail">SubscriptionDetail</p>
//             </div>
//           </div>

//           {/* <div
//             className={`ctrl ${
//               selectedButton === "SubscriptionHistory" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("SubscriptionHistory")}
//             role="button"
//             tabIndex={7}
//           >
//             <ProfileOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Subscription History</h4>
//               <p className="ctrl-detail">Subscription History</p>
//             </div>
//           </div> */}

//           {/* <div
//                         className={`ctrl ${selectedButton === 'Professional' ? 'selected' : ''}`}
//                         onClick={() => handleButtonClick('Professional')}
//                         role="button"
//                         tabIndex={1}>
//                         {
//                             selectedButton === 'Professional' ?
//                                 <img src={ProfessionalIconBg.src} /> :
//                                 <img src={ProfessionalIcon.src} />
//                         }
//                         <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px", justifyContent: "flex-end", marginTop: "10px" }}>
//                             <h4 className="ctrl-title">Professional Details</h4>
//                             <p className="ctrl-detail">Fill the your proffesional details </p>
//                         </div>
//                     </div> */}

//           {/* <div
//                         className={`ctrl ${selectedButton === 'Login' ? 'selected' : ''}`}
//                         onClick={() => handleButtonClick('Login')}
//                         role="button"
//                         tabIndex={2}>
//                         {
//                             selectedButton === 'Login' ?
//                                 <img src={SecurityIconBg.src} /> :
//                                 <img src={SecurityIcon.src} />
//                         }
//                         <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px", justifyContent: "flex-end", marginTop: "10px" }}>
//                             <h4 className="ctrl-title">Login Details</h4>
//                             <p className="ctrl-detail">Password & security</p>
//                         </div>
//                     </div> */}

//           <div
//             className={`ctrl ${
//               selectedButton === "DonationHistory" ? "selected" : ""
//             }`}
//             onClick={() => handleButtonClick("DonationHistory")}
//             role="button"
//             tabIndex={7}
//           >
//             <ProfileOutlined style={{ marginLeft: "24px" }} />
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginLeft: "15px",
//                 justifyContent: "flex-end",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 className="ctrl-title">Donation History</h4>
//               <p className="ctrl-detail">Donation History</p>
//             </div>
//           </div>
//         </div>
//         <div className="profile-content">{selectedComponent}</div>
//       </div>
//     </Container>
//   );
// };

// const mapStateToProps = (state) => {
//   const {
//     authentication,
//     get_subscription,
//     subscription_history,
//     purchase_history,
//   } = state;
//   return {
//     authentication,
//     get_subscription,
//     subscription_history,
//     purchase_history,
//   };
// };

// const actionCreators = {
//   getAllCrud: crudActions._getAll,
//   downloadInvoice: crudActions._downloadWithPost,
// };

// export default connect(mapStateToProps, actionCreators)(Profile);

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, Card, Input, Select, Slider, Modal, Button } from "antd";
import { Container } from "reactstrap";
import myImageLoader from "../components/imageLoader";
import Online_image from "../public/new_images/online_icon.svg";
import date_image from "../public/new_images/date_icon.svg";
import database_icon from "../public/new_images/database_icon.svg";
import three_dot_icon from "../public/new_images/3dots.svg";
import message_icon from "../public/new_images/message_icon.svg";
import like_button from "../public/new_images/like_button.svg";
import dislike_button from "../public/new_images/dislike_button.svg";
import { crudActions, alertActions } from "../_actions";
import { connect } from "react-redux";
import Router from "next/router";
import moment from "moment";

const Profile = ({
  getAllCrud,
  updateCrud,
  visitorprofile,
  visitorcommunityprofile,
  visitor_community,
  visitor_queries_history,
  visitor_points_history,
  countries,
  visitor_profile_levels,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProfileData, setUpdateProfileData] = useState({
    alternate_email: "",
    country_code: 0,
    mobile: 0,
    profile_pic_url:
      "https://cdn.pixabay.com/photo/2024/02/29/21/39/squirrel-8605258_1280.jpg",
  });

  const onChange = (key) => {
    console.log(key);
  };
  const showEditModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllCrud("visitorcommunityprofile", "visitorcommunityprofile");
    getAllCrud("visitorprofile", "visitorprofile");
    getAllCrud("visitor_community", "visitor_community");
    getAllCrud("visitor_queries_history", "visitor_queries_history");
    // getAllCrud("visitor_points_history", "visitor_points_history");
    getAllCrud("visitor_profile_levels", "visitor_profile_levels");
  }, []);
  const fetchCountry = () => {
    getAllCrud("countries", "countries");
  };

  const countyList = countries?.map((item) => {
    return { value: item.phonecode, label: item.phonecode };
  });

  const updateProfile = () => {
    updateCrud("visitorprofile", "visitorprofile", visitorprofile?.id, {
      alternate_email: updateProfileData.alternate_email,
      country_code: updateProfileData.country_code,
      mobile: updateProfileData.mobile,
      profile_pic_url: updateProfileData.profile_pic_url,
    });
    setIsModalOpen(false);
  };

  const Tab1 = () => {
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const handleSignOutOk = () => {
      setIsSignOutModalOpen(false);
      Router.push("/logout");
    };
    const showSignOutModal = () => {
      setIsSignOutModalOpen(true);
    };
    const handleSignOutCancel = () => {
      setIsSignOutModalOpen(false);
    };
    return (
      <div className="profile-tab-container">
        <div className="input-container">
          <div>
            <h6>First Name</h6>
            <h5>Meraj</h5>
          </div>
          <div>
            <h6>Last Name</h6>
            <h5>Shekh</h5>
          </div>
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Country/Region</h6>
            <h5>India</h5>
          </div>
          <div>
            <h6>City/District</h6>
            <h5>{visitorprofile?.visitor_ip_city}</h5>
          </div>
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Job Title</h6>
            <h5>Software Developer</h5>
          </div>
          <div>
            <h6>Company Name</h6>
            <h5>Intelloger</h5>
          </div>
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Email</h6>
            <h5>{visitorprofile?.email}</h5>
          </div>
          <div>
            <h6>Contact Number</h6>
            <h5>{visitorprofile?.mobile || "-"}</h5>
          </div>
          {!visitorprofile?.mobile && (
            <div onClick={() => setIsModalOpen(true)} className="add">
              Add
            </div>
          )}
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Alternate Email</h6>
            <h5>{visitorprofile?.alternate_email || "-"}</h5>
          </div>
          {!visitorprofile?.alternate_email && (
            <div onClick={() => setIsModalOpen(true)} className="add">
              Add
            </div>
          )}
        </div>
        <hr />
        <div className="delete-container">
          <div>{/* Delete Account */}</div>
          <div onClick={showSignOutModal}>Sign Out</div>
        </div>
        <Modal
          className="sign-out-container"
          title="Sign Out"
          open={isSignOutModalOpen}
          onOk={handleSignOutOk}
          onCancel={handleSignOutCancel}
          footer={[
            <div
              onClick={handleSignOutCancel}
              className="sign-out-modal-button"
            >
              Cancel
            </div>,
            <div
              onClick={handleSignOutOk}
              className="sign-out-modal-button confirm"
            >
              Confirm
            </div>,
          ]}
        >
          <div className="edit-profile-container">
            <p>Are you sure you want to sign out?</p>
          </div>
        </Modal>
      </div>
    );
  };

  const Tab2 = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { Search } = Input;
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearchSelect = (value) => {
      console.log("search:", value);
    };
    return (
      <div className="community-tab-container">
        <div className="search-container">
          <Search
            style={{ width: "65%" }}
            placeholder="Search a question..."
            onSearch={onSearch}
            enterButton
          />
          <Select
            style={{
              width: "30%",
            }}
            showSearch
            placeholder="Sort By"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearchSelect}
            filterOption={filterOption}
            options={[
              {
                value: "name",
                label: "Name",
              },
              {
                value: "date",
                label: "Date",
              },
              {
                value: "most recent",
                label: "Most Recent",
              },
            ]}
          />
        </div>
        <div className="cards-container">
          {visitor_community?.map((data) => (
            <Card
              bordered={true}
              style={{
                width: 380,
                height: "fit-content",
              }}
            >
              <div className="cards-header">
                <Image
                  loader={myImageLoader}
                  style={{ borderRadius: "2px" }}
                  width={56}
                  height={56}
                  preview="false"
                  src={data?.image_url}
                  alt="profile"
                />
                <h6>{data?.name}</h6>
                <Image
                  loader={myImageLoader}
                  style={{ borderRadius: "2px", cursor: "pointer" }}
                  width={24}
                  height={24}
                  preview="false"
                  src={three_dot_icon}
                  alt="profile"
                />
              </div>
              <hr />
              <div className="cards-body">{data?.description}</div>
              <hr />
              <div className="following-section">
                <div>
                  <div className="head">Members</div>
                  <div className="count">{data?.__meta__?.total_members}</div>
                </div>
                <div className="custom-border"></div>
                <div>
                  <div className="head">Questions</div>
                  <div className="count">{data?.__meta__?.total_posts}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const Tab3 = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const { Search } = Input;
    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearchSelect = (value) => {
      console.log("search:", value);
    };

    const calculateTimeAgo = (createdAt) => {
      const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
      const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
      const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
      const duration = moment.duration(diffMilliseconds);
      const humanReadableDiff = duration.humanize(true);
      return humanReadableDiff;
    };

    return (
      <div className="community-tab-container questions-tab-container">
        <div className="search-container">
          <Search
            style={{ width: "65%" }}
            placeholder="Search a question..."
            onSearch={onSearch}
            enterButton
          />
          <Select
            style={{
              width: "30%",
            }}
            showSearch
            placeholder="Sort By"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearchSelect}
            filterOption={filterOption}
            options={[
              {
                value: "name",
                label: "Name",
              },
              {
                value: "date",
                label: "Date",
              },
              {
                value: "most recent",
                label: "Most Recent",
              },
            ]}
          />
        </div>
        <div className="cards-container">
          {visitor_queries_history?.map((data) => (
            <Card
              bordered={true}
              style={{
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <div className="cards-header">
                <div>
                  <div className="img">
                    <Image
                      style={{ borderRadius: "5px" }}
                      width={50}
                      height={50}
                      preview="false"
                      src={
                        data?.visitor?.profile_pic_url ||
                        "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                      }
                      alt="profile"
                    />
                  </div>
                  <div className="profile">
                    <h5>{data?.visitor?.name}</h5>
                    <p>
                      {data?.title} <div className="custom-border"></div>
                      {calculateTimeAgo(data?.created_at)}
                    </p>
                  </div>
                </div>

                <div className="follow">
                  <p className="button">Follow</p>
                  <div className="img">
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "2px", cursor: "pointer" }}
                      width={32}
                      height={32}
                      preview="false"
                      src={three_dot_icon}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>
              <p className="para">{data?.description}</p>
              <div className="chips">
                {data?.postTags?.map((tag) => (
                  <div>{tag?.name}</div>
                ))}
              </div>
              <div className="chips">
                <p>{data?.__meta__?.total_post_replies} answers</p>
                <h6 className="custom-border"></h6>
                <p>{data?.views_counter} views</p>
              </div>
              <div className="like-footer">
                <div className="ans">
                  <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "5px" }}
                    width={16}
                    height={16}
                    preview="false"
                    src={message_icon}
                    alt="profile"
                  />
                  Answer
                </div>
                <div className="rating">
                  <div>
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={16}
                      height={16}
                      preview="false"
                      src={like_button}
                      alt="profile"
                    />
                  </div>
                  <h6>
                    Upvote <p></p> {data?.__meta__?.total_helpful}
                  </h6>
                  <div className="left-border">
                    <Image
                      loader={myImageLoader}
                      style={{ borderRadius: "5px" }}
                      width={16}
                      height={16}
                      preview="false"
                      src={dislike_button}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const Tab4 = () => {
    console.log("visitor_profile_levels", visitor_profile_levels?.[0]);

    const topMarks = {
      0: { label: "Level l \n New Bee", style: { whiteSpace: "pre" } },
      20: { label: "Level 2 \n Starter", style: { whiteSpace: "pre" } },
      40: { label: "Level 3 \n Action Taker", style: { whiteSpace: "pre" } },
      60: { label: "Level 4 \n Contributor", style: { whiteSpace: "pre" } },
      80: { label: "Level 5 \n Pro", style: { whiteSpace: "pre" } },
      100: { label: "Level 6 \n Legend", style: { whiteSpace: "pre" } },
    };

    const bottomMarks = {
      0: "3000 pts",
      20: "3000 pts",
      40: "3000 pts",
      60: "3000 pts",
      80: "3000 pts",
      100: "3000 pts",
    };
    return (
      <div className="levels-tab-container">
        <Card
          bordered={true}
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <p className="sliderTitle">
            Starter since {visitor_profile_levels?.[0]?.joined_at}
          </p>
          <div className="slider-container">
            <Slider
              className="slider-one"
              handleStyle={{ display: "none" }}
              trackStyle={{ display: "none" }}
              railStyle={{ display: "none" }}
              marks={topMarks}
              step={null}
              defaultValue={50}
              style={{ marginBottom: 20 }}
            />
            <Slider
              marks={bottomMarks}
              step={null}
              handleStyle={{
                backgroundColor: "#0074D9",
                height: "16.48px",
                width: "16.48px",
              }}
              trackStyle={{ backgroundColor: "#0074D9", height: "8px" }}
              railStyle={{ backgroundColor: "#EBEBF0", height: "8px" }}
              defaultValue={50}
              onChange={(value) => console.log(value)}
              tooltipVisible={false}
            />
          </div>
          <div className="level-calculation">
            <div>
              <p>
                {visitor_profile_levels?.[0]?.total_points_earned}
                <span>Points</span>
              </p>
            </div>
            <div>
              <h6>
                Answer = {visitor_profile_levels?.[0]?.answer_point_info} point
              </h6>
              <div className="custom-border"></div>
              <h6>
                Upvote = {visitor_profile_levels?.[0]?.upvote_point_info} point
              </h6>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Profile",
      children: <Tab1 />,
    },
    {
      key: "2",
      label: "Community",
      children: <Tab2 />,
    },
    {
      key: "3",
      label: "Questions",
      children: <Tab3 />,
    },
    {
      key: "4",
      label: "Levels",
      children: <Tab4 />,
    },
    // {
    //   key: "5",
    //   label: "Following",
    //   children: <Tab3 />,
    // },
  ];

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Container>
      <div className="profile-container">
        <Tabs
          className="header-tabs"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
        {items.map((tab) => (
          <Tabs.TabPane tab={tab.label} key={tab.key}>
            {tab.children}
          </Tabs.TabPane>
        ))}
        <Card
          bordered={true}
          style={{
            minWidth: "368",
            height: "fit-content",
          }}
        >
          <div className="card-header-data">
            <Image
              loader={myImageLoader}
              style={{ borderRadius: "2px" }}
              width={80}
              height={80}
              preview="false"
              src={
                visitorcommunityprofile?.data[0]?.profile_pic_url ||
                "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
              }
              alt="profile"
            />

            <div className="level">Level 2: Starter</div>
            <div>
              <span>{visitorcommunityprofile?.data[0]?.level_up_points}</span>{" "}
              {visitorcommunityprofile?.data[0]?.level_up_text}
            </div>
          </div>
          <hr />
          <div className="following-section">
            <div>
              <p className="head">Contributions</p>
              <p className="count">
                {visitorcommunityprofile?.data[0]?.contributions}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <span className="custom-border"></span>
              <div style={{ flexDirection: "column" }}>
                <p className="head">Followers</p>
                <p className="count">200</p>
              </div>
              <span className="custom-border"></span>
            </div>
            <div>
              <p className="head">Following</p>
              <p className="count">100</p>
            </div>
          </div>
          <hr />
          <div className="online-section">
            <div>
              {/* <Image
                loader={myImageLoader}
                width={16}
                height={16}
                preview="false"
                src={Online_image}
                alt="online-now"
              />
              <span className="online">Online Now</span> */}
            </div>

            <div>
              <Image
                loader={myImageLoader}
                width={16}
                height={16}
                preview="false"
                src={date_image}
                alt="date-icon"
              />
              <span className="join-date">
                {visitorcommunityprofile?.data[0]?.joined_at}
              </span>
            </div>
            <hr />
            <div onClick={showEditModal} className="button">
              Edit Profile
            </div>
          </div>
        </Card>
        <Modal
          title="Edit Profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div onClick={updateProfile} className="profile-modal-button">
              Save
            </div>,
          ]}
        >
          <div className="edit-profile-container">
            <div className="profile-header">
              <div>
                <Image
                  style={{ borderRadius: "4px" }}
                  // loader={myImageLoader}
                  className="mdg"
                  src={
                    visitorcommunityprofile?.data[0]?.profile_pic_url ||
                    "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                  }
                  alt=""
                  placeholder="Logo"
                  width={64}
                  height={64}
                />
              </div>
              <div className="profile-button">
                <h6>Profile Picture</h6>
                <div>
                  <div className="remove">Remove</div>
                  <div className="upload">Upload</div>
                </div>
              </div>
            </div>
            <div className="profile-details">
              <div>
                <p>Alternate Email</p>
                <Input
                  name="alternate_email"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUpdateProfileData((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                  placeholder="Enter your email ID here"
                />
              </div>
              <div>
                <p>Phone Number</p>
                <div className="phone-number">
                  <Select
                    showSearch
                    placeholder="+91"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={countyList}
                    onClick={fetchCountry}
                    onChange={(e) => {
                      setUpdateProfileData((prev) => ({
                        ...prev,
                        ["country_code"]: e,
                      }));
                    }}
                  />
                  <Input
                    name="mobile"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setUpdateProfileData((prev) => ({
                        ...prev,
                        [name]: value,
                      }));
                    }}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const {
    visitorprofile,
    visitorcommunityprofile,
    visitor_community,
    visitor_queries_history,
    visitor_points_history,
    countries,
    visitor_profile_levels,
  } = state;
  return {
    visitorprofile,
    visitorcommunityprofile,
    visitor_community,
    visitor_queries_history,
    visitor_points_history,
    countries,
    visitor_profile_levels,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  updateCrud: crudActions._update,
};

export default connect(mapStateToProps, actionCreators)(Profile);
