import React, { useState, useEffect } from "react";
import { Radio, Space, Tabs } from "antd";
import { connect } from "react-redux";
import { crudActions, alertActions } from "../_actions";
import Image from "next/image";
import {
  UserOutlined,
  HistoryOutlined,
  BookOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import UserProfile from "../components/userProfile/index";
import LoginCred from "../components/userProfile/loginCred";
import ProfessionalDetails from "../components/userProfile/professionalDetails";
import History from "../components/userProfile/history";
import BookedConsultant from "../components/userProfile/bookedConsultant";
import CreditPurchase from "../components/userProfile/creditPurchase";
import CreditPurchaseHistory from "../components/userProfile/creditPurchaseHistory";
import CreditRedeemHistory from "../components/userProfile/creditRedeemHistory";
import SubscriptionDetail from "../components/userProfile/subscriptionDetail";
import SubscriptionHistory from "../components/userProfile/subscriptionHistory";
import DonationHistory from "../components/userProfile/donationHistory";
import { isBrowser } from "react-device-detect";
import { Container, Input, Label, Form, FormGroup, Button } from "reactstrap";
import ProfileImg from "../public/new_images/Profile/profile.svg";
import ProfileIcon from "../public/new_images/Profile/profile-icon.svg";
import ProfileIconBg from "../public/new_images/Profile/profile-icon-bg.svg";
import ProfessionalIcon from "../public/new_images/Profile/professional-icon.svg";
import ProfessionalIconBg from "../public/new_images/Profile/professional-icon-bg.svg";
import SecurityIcon from "../public/new_images/Profile/security-icon.svg";
import SecurityIconBg from "../public/new_images/Profile/security-icon-bg.svg";
import SelectionIcon from "../public/new_images/Profile/professional-selection.svg";
import EducationIcon from "../public/new_images/Profile/education-icon.svg";
import AddIcon from "../public/new_images/Profile/add.svg";
import EditIcon from "../public/new_images/Profile/edit.svg";

const Profile = (props) => {
  const [selectedButton, setSelectedButton] = useState("Account");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const {
    authentication,
    get_subscription,
    subscription_history,
    purchase_history,
  } = props;

  const [editField, setEditField] = useState("");
  const [currentTab, setCurrentTab] = useState("personalTab");
  const [expandedPanel, setExpandedPanel] = useState("");
  const [data, setData] = useState(authentication.user.data.data);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [tooltipOpen, setTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState();

  const toggleTip = (id) => {
    tooltipOpen === id ? setTooltip(false) : setTooltip(id);
  };

  const TabChangeHandler = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChange = (panel) => (event) => {
    setExpandedPanel(expandedPanel === panel ? "" : panel);
  };

  const onChangeHandle = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    props.getAllCrud("get_subscription", "get_subscription");
    props.getAllCrud("subscription_history", "subscription_history");
    // props.getAllCrud("purchase_history", "purchase_history");
  }, []);

  useEffect(() => {
    if (
      get_subscription &&
      get_subscription != undefined &&
      get_subscription != null &&
      get_subscription.length
    ) {
      get_subscription.filter((activeSub) => {
        if (activeSub.is_active === 1 && activeSub.plans != null) {
          setActiveSubscription(activeSub);
        }
      });
    }
  }, [get_subscription]);
  // let selectedComponent;
  // switch (selectedButton) {
  //     case 'Account':
  //         selectedComponent = <UserProfile />;
  //         break;
  //     case 'Professional':
  //         selectedComponent = <ProfessionalDetails />;
  //         break;
  //     case 'Login':
  //         selectedComponent = <LoginCred />;
  //         break;
  //     default:
  //         selectedComponent = <UserProfile />;
  // }

  const componentMap = {
    Account: <UserProfile />,
    Professional: <ProfessionalDetails />,
    Login: <LoginCred />,
    History: <History />,
    BookedConsultant: <BookedConsultant />,
    CreditPurchase: <CreditPurchase />,
    // CreditPurchaseHistory: <CreditPurchaseHistory />,
    CreditRedeemHistory: <CreditRedeemHistory />,
    SubscriptionDetail: <SubscriptionDetail />,
    SubscriptionHistory: <SubscriptionHistory />,
    DonationHistory: <DonationHistory />,
  };

  const selectedComponent = componentMap[selectedButton] || <UserProfile />;

  useEffect(() => {
    const sessionData = sessionStorage.getItem("profileCreditPurchase");
    if (sessionData) {
      setSelectedButton(sessionData);
    }
    return () => {
      sessionStorage.removeItem("profileCreditPurchase");
    };
  }, []);

  return (
    <Container>
      <div className="profile-user">
        <div className="card-tab">
          <div
            className="mask"
            style={{ position: "relative", top: "20px" }}
          ></div>
          <div className="profile-alt" style={{ textAlign: "center" }}>
            {/* <img src={ProfileImg.src} alt="profile"/> */}
            <Image
              style={{ borderRadius: "50%" }}
              width={100}
              height={100}
              preview="false"
              src={
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU"
              }
              alt="profile"
            />
            <h4 className="profile-name">{data.name}</h4>
            <h6>{data.email}</h6>
          </div>

          <div
            className={`ctrl ${selectedButton === "Account" ? "selected" : ""}`}
            onClick={() => handleButtonClick("Account")}
            role="button"
            tabIndex={0}
          >
            <UserOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Account Information</h4>
              <p className="ctrl-detail">Profile Photo, and name</p>
            </div>
          </div>

          <div
            className={`ctrl ${selectedButton === "History" ? "selected" : ""}`}
            onClick={() => handleButtonClick("History")}
            role="button"
            tabIndex={1}
          >
            <HistoryOutlined style={{ marginLeft: "24px" }} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Booking History</h4>
              <p className="ctrl-detail">Upcoming and Past booking details </p>
            </div>
          </div>

          <div
            className={`ctrl ${
              selectedButton === "BookedConsultant" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("BookedConsultant")}
            role="button"
            tabIndex={2}
          >
            <BookOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Booked Consultants</h4>
              <p className="ctrl-detail">Consultants</p>
            </div>
          </div>

          <div
            className={`ctrl ${
              selectedButton === "CreditPurchase" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("CreditPurchase")}
            role="button"
            tabIndex={3}
          >
            <CreditCardOutlined style={{ marginLeft: "24px" }} />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Credit Purchase</h4>
              <p className="ctrl-detail">Credit Purchase</p>
            </div>
          </div>

          {/* <div
            className={`ctrl ${
              selectedButton === "CreditPurchaseHistory" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("CreditPurchaseHistory")}
            role="button"
            tabIndex={4}
          >
            <FileTextOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Credit Purchase History</h4>
              <p className="ctrl-detail">Credit Purchase History</p>
            </div>
          </div> */}

          <div
            className={`ctrl ${
              selectedButton === "CreditRedeemHistory" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("CreditRedeemHistory")}
            role="button"
            tabIndex={5}
          >
            <FileTextOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Credit Redeem History</h4>
              <p className="ctrl-detail">Credit Redeem History</p>
            </div>
          </div>

          <div
            className={`ctrl ${
              selectedButton === "SubscriptionDetail" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("SubscriptionDetail")}
            role="button"
            tabIndex={6}
          >
            <DollarCircleOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Subscription Detail</h4>
              <p className="ctrl-detail">SubscriptionDetail</p>
            </div>
          </div>

          {/* <div
            className={`ctrl ${
              selectedButton === "SubscriptionHistory" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("SubscriptionHistory")}
            role="button"
            tabIndex={7}
          >
            <ProfileOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Subscription History</h4>
              <p className="ctrl-detail">Subscription History</p>
            </div>
          </div> */}

          {/* <div
                        className={`ctrl ${selectedButton === 'Professional' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('Professional')}
                        role="button"
                        tabIndex={1}>
                        {
                            selectedButton === 'Professional' ?
                                <img src={ProfessionalIconBg.src} /> :
                                <img src={ProfessionalIcon.src} />
                        }
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px", justifyContent: "flex-end", marginTop: "10px" }}>
                            <h4 className="ctrl-title">Professional Details</h4>
                            <p className="ctrl-detail">Fill the your proffesional details </p>
                        </div>
                    </div> */}

          {/* <div
                        className={`ctrl ${selectedButton === 'Login' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('Login')}
                        role="button"
                        tabIndex={2}>
                        {
                            selectedButton === 'Login' ?
                                <img src={SecurityIconBg.src} /> :
                                <img src={SecurityIcon.src} />
                        }
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px", justifyContent: "flex-end", marginTop: "10px" }}>
                            <h4 className="ctrl-title">Login Details</h4>
                            <p className="ctrl-detail">Password & security</p>
                        </div>
                    </div> */}

          <div
            className={`ctrl ${
              selectedButton === "DonationHistory" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("DonationHistory")}
            role="button"
            tabIndex={7}
          >
            <ProfileOutlined style={{ marginLeft: "24px" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "15px",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <h4 className="ctrl-title">Donation History</h4>
              <p className="ctrl-detail">Donation History</p>
            </div>
          </div>
        </div>
        <div className="profile-content">{selectedComponent}</div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const {
    authentication,
    get_subscription,
    subscription_history,
    purchase_history,
  } = state;
  return {
    authentication,
    get_subscription,
    subscription_history,
    purchase_history,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  downloadInvoice: crudActions._downloadWithPost,
};

export default connect(mapStateToProps, actionCreators)(Profile);
