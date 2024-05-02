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

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { RightOutlined } from "@ant-design/icons";
import {
  Tabs,
  Card,
  Input,
  Select,
  Slider,
  Modal,
  Button,
  Upload,
  Divider,
} from "antd";
import { Container } from "reactstrap";
import myImageLoader from "../components/imageLoader";
import date_image from "../public/new_images/date_icon.svg";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons";
import { crudActions, alertActions } from "../_actions";
import { connect } from "react-redux";
import Router from "next/router";
import moment from "moment";
import { crudService } from "../_services";
import { isMobile } from "react-device-detect";
import { Menu, Dropdown } from "antd";
import {
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import {
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import profile_img from "../public/new_images/profile.svg";
import { Pagination } from "antd";
import CustomPagination from "../components/pagination";
import SearchInput from "../components/form/searchInput";
import {  Timeline, Icon } from 'antd';
import QuestionTab from "../components/community/QuestionTab";
import shorting_icon from "../public/new_images/sorting_icon.svg";

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
  router,
  visitor_library,
}) => {
  const { q } = Router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCom, setUpdateCom] = useState(false);
  const [visitorquerieshistory, setvisitor_queries_history] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  const [visitorActivity, setvisitorActivity] = useState([]);
  const [sortByOrder, setSortByOrder] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // const [mode, setMode] = useState('left');
  // const onChange = (e) => {
  //   setMode(e.target.value);
  // };


  const [updateProfileData, setUpdateProfileData] = useState({
    alternate_email: "",
    country_code: "",
    mobile: "",
    profile_pic_url: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("id");
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [questionPage, setQuestionPage] = useState(0);
  const [questionPageCount, setQuestionPageCount] = useState(0);

  const [libraryPage, setLibraryPage] = useState(0);
  const [libraryPageCount, setLibraryPageCount] = useState(0);

  const [libraryData, setLibraryData] = useState([]);

  const [searchQuery, setSearchQuery] = useState(q);
  const [filteredData, setFilteredData] = useState({});
  const [mode, setMode] = useState('left');
  // const [researchData, setResearchData] = useState([]);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const options = [
    {
      value: "id",
      label: "Most Recent",
    },
    {
      value: "views_counter",
      label: "Most Viewed",
    },
    {
      value: "total_post_replies",
      label: "Most Answers",
    },
    {
      value: "total_helpful",
      label: "Most Voted",
    },
  ];

  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
    const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
    const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
    const duration = moment.duration(diffMilliseconds);
    const humanReadableDiff = duration.humanize(true);
    return humanReadableDiff;
  };


  const [sortType, setSortType] = useState("asc");

  const handleMenuClick = (e) => {
    if (e.key === "asc" || e.key === "desc") {
      setSortType(e.key);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="asc" icon={<SortAscendingOutlined />}>
        Sort Ascending
      </Menu.Item>
      <Menu.Item key="desc" icon={<SortDescendingOutlined />}>
        Sort Descending
      </Menu.Item>
    </Menu>
  );
  //tab 2 data
  useEffect(() => {
    crudService
      ._getAll("visitor_activities", {
        orderBy: sortBy,
        orderDirection: "desc",
        page: page + 1,
        pageSize: itemsPerPage,
        search: searchQuery,
        ...filteredData,
      })
      .then((result) => {
        setvisitorActivity(result?.data?.data);
        const totalPage = Math.ceil(result?.data?.total / itemsPerPage);
        setPageCount(isNaN(totalPage) ? 0 : totalPage);
      });
  }, [page]);

  // tab3 data

  useEffect(() => {
    crudService
      ._getAll("visitor_queries_history", {
        orderBy: sortBy,
        orderDirection: "desc",
        page: page + 1,
        pageSize: itemsPerPage,
        search: searchQuery,
        ...filteredData,
      })
      .then((result) => {
        setvisitor_queries_history(result?.data?.data);
        console.log("result", result.data);
        const totalPage = Math.ceil(result?.data?.total / itemsPerPage);
        setQuestionPageCount(isNaN(totalPage) ? 0 : totalPage);
      });
  }, [questionPage, searchQuery, filteredData, sortBy]);

  useEffect(() => {
    crudService
      ._getAll("visitor_library", {
        orderBy: sortBy,
        orderDirection: "asc",
        page: page + 1,
        pageSize: itemsPerPage,
      })
      .then((result) => {
        setLibraryData(result?.data?.data);
        const totalPage = Math.ceil(result?.data?.total / itemsPerPage);
        setLibraryPageCount(isNaN(totalPage) ? 0 : totalPage);
      });
  }, [libraryPage]);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleDelete = (id) => {
    crudService
      ._delete("visitor_library", id)
      .then((result) => {
        console.log("Item deleted successfully:", result);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const sortOptions = [
    {
      value: "id",
      label: "Most Recent",
    },
    {
      value: "view_counts",
      label: "Most Viewed",
    },
  ];

  const groupDataByDate = (data, field = "date") => {
    return data.reduce((acc, currentItem) => {
      const date = moment(new Date(currentItem[field])).format("MM-DD-YYYY");

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(currentItem);
      return acc;
    }, {});
  };

  const groupedData = groupDataByDate(visitorActivity, "created_at");
  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => moment(b, "MM-DD-YYYY") - moment(a, "MM-DD-YYYY")
  );

  const getTitle = (date) => {
    // moment(date).isSame(moment(), "day")
    //               ? "Today"
    //               : moment(date).format("MMMM DD, YYYY")
    const today = moment().format("MM-DD-YYYY");
    const yesterday = moment().subtract(1, "days").format("MM-DD-YYYY");

    if (date === today) {
      return "Today";
    } else if (date === yesterday) {
      return "Yesterday";
    } else {
      return moment(date).format("DD MMMM YYYY");
    }
  };

  //Filter
  const handleSearch = (searchValue) => {
    if (searchValue == null) {
      return false;
    }
    const timerId = setTimeout(() => {
      setSearchQuery(searchValue);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  };

  const onChange = (key) => {
    console.log(key);
  };
  const showEditModal = () => {
    setUpdateProfileData(() => ({
      alternate_email: visitorprofile?.alternate_email,
      country_code: visitorprofile?.country_code,
      mobile: visitorprofile?.mobile,
      profile_pic_url: visitorprofile?.profile_pic_url,
    }));
    setUpdateCom(false);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const beforeUpload = (file) => {
    setFile(file);
    return false;
  };

  const removeProfilePic = () => {
    setUpdateProfileData((prev) => ({
      ...prev,
      profile_pic_url: "",
    }));
  };

  const handleFileChange = () => {
    setLoading(true);
    if (file) {
      if (file.size / (1024 * 1024) > 100) {
        warning("Maximum file size is 1MB!");
        setLoading(false);
        setFile(null);
      } else {
        crudService
          ._upload("uploadimage", file)
          .then((data) => {
            // File uploaded successfully, update state and handle any further actions
            setUpdateProfileData((prev) => ({
              ...prev,
              profile_pic_url: data.data?.result,
            }));
            setLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    getAllCrud("visitorcommunityprofile", "visitorcommunityprofile");
    getAllCrud("visitorprofile", "visitorprofile");
    getAllCrud("visitor_community", "visitor_community");
    getAllCrud("visitor_queries_history", "visitor_queries_history");
    // getAllCrud("visitor_points_history", "visitor_points_history");
    getAllCrud("visitor_profile_levels", "visitor_profile_levels");
    getAllCrud("visitor_library", "visitor_library");
  }, [updateCom]);

  const fetchCountry = () => {
    getAllCrud("countries", "countries");
  };

  const countyList = countries?.map((item) => {
    return { value: item.phonecode, label: `+${item.phonecode}` };
  });

  const updateProfile = () => {
    crudService
      ._update("visitorprofile", visitorprofile?.id, {
        alternate_email: updateProfileData.alternate_email,
        country_code: updateProfileData.country_code,
        mobile: updateProfileData.mobile,
        profile_pic_url: updateProfileData.profile_pic_url,
      })
      .then((data) => {
        data.status == 200 && setUpdateCom(true);
      });
    setIsModalOpen(false);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Change breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = {
    display: 'inline-block',
    height: 300,
    marginLeft: 70,
  };
  const marks = {
    100: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
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

    let visitorname = visitorprofile?.name;
    let firstname = "";
    let lastname = "";

    if (visitorname) {
      visitorname = visitorname.split(" ");
      firstname = visitorname[0];
      visitorname.splice(0, 1);
      lastname = visitorname.join(" ");
    }

    return (
      <div className="profile-tab-container first_tab_Space">
        <div className="input-container ">
          <div>
            <h6>First Name</h6>
            <h5 style={{ textTransform: "capitalize" }}>{firstname || ""}</h5>
          </div>

          <div>
            <h6>Last Name</h6>
            <h5 style={{ textTransform: "capitalize" }}>{lastname || "-"}</h5>
          </div>
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Country/Region</h6>
            <h5>{visitorprofile?.country?.name || "-"}</h5>
          </div>

          <div>
            <h6>City/District</h6>
            <h5>{visitorprofile?.visitor_ip_city || "-"}</h5>
          </div>
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Job Title</h6>
            <h5>{visitorprofile?.designation || "-"}</h5>
          </div>

          <div>
            <h6>Company Name</h6>
            <h5>{visitorprofile?.company || "-"}</h5>
          </div>
        </div>
        <hr />
        <div className="input-container">
          <div>
            <h6>Email</h6>
            <h5>{visitorprofile?.email}</h5>
          </div>

          <div
          // style={{
          //   display: !visitorprofile?.mobile && isMobile && "flex",
          //   justifyContent:
          //     !visitorprofile?.mobile && isMobile && "space-between",
          // }}
          >
            <div>
              <h6>Contact Number</h6>
              <h5>
                {visitorprofile?.mobile && visitorprofile?.country_code
                  ? `+${visitorprofile?.country_code} `
                  : ""}
                {visitorprofile?.mobile || "-"}
                {!visitorprofile?.mobile && (
                  <div onClick={() => setIsModalOpen(true)} className="add">
                    Add
                  </div>
                )}
              </h5>
            </div>
          </div>
        </div>
        <hr />
        <div
          className="input-container"
          style={{
            flexDirection:
              !visitorprofile?.alternate_email && isMobile && "unset",
          }}
        >
          <div>
            <h6>Alternate Email</h6>
            <h5>
              {visitorprofile?.alternate_email || "-"}
              {!visitorprofile?.alternate_email && (
                <div onClick={() => setIsModalOpen(true)} className="add">
                  Add
                </div>
              )}
            </h5>
          </div>
        </div>
        <hr />
        <div className="delete-container mb-2">
          <div>{/* Delete Account */}</div>
          <div onClick={showSignOutModal}>Sign Out</div>
        </div>
        <Modal
          className="sign-out-container"
          title="Sign Out"
          visible={isSignOutModalOpen}
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
    const calculateTimeAgo = (createdAt) => {
      const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
      const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
      const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
      const duration = moment.duration(diffMilliseconds);
      const humanReadableDiff = duration.humanize(true);
      return humanReadableDiff;
    };
    return (
      <div className="activity-tab-container">
        <div className="cards-container">
          {sortedDates.map((date) => (
            <Fragment key={date}>
              <Divider
                className="date-divider"
                orientation="left"
                orientationMargin="0"
              >
                {getTitle(date)}
              </Divider>

              {groupedData[date].map((data) => (
                <Card bordered={true}>
                  <div className="cards-header">
                    <p className="title">{data?.communityPost.title}</p>
                  </div>
                  <div className="cards-content">
                    {data?.activity_type === 1 && (
                      <p>
                        <span>You created a question: </span>{" "}
                        {data?.communityPost.title}
                      </p>
                    )}
                    {data?.activity_type === 2 && (
                      <p>
                        <span>You answered the question:</span>{" "}
                        {data?.communityPost.title}
                      </p>
                    )}

                    {data?.activity_type === 3 && (
                      <p>
                        <span>
                          You posted a comment on the answer to the question:
                        </span>{" "}
                        {data?.communityPost.title}
                      </p>
                    )}

                    {(data?.activity_type === 4 ||
                      data?.activity_type === 5) && (
                      <p>
                        <span>
                          You upvoted or downvoted the answer to the question:{" "}
                        </span>{" "}
                        {data?.communityPost.title}
                      </p>
                    )}

                    {data?.activity_type === 6 && (
                      <p>
                        <span>You viewed the question: </span>{" "}
                        {data?.communityPost.title}
                      </p>
                    )}
                  </div>
                  <div className="post-days">
                    <p>{calculateTimeAgo(data?.created_at)}</p>
                  </div>
                </Card>
              ))}
            </Fragment>
          ))}

          <div className="custom-pagination">
            {visitorActivity?.length > 0 && (
              <CustomPagination
                pageCount={pageCount}
                page={page}
                onPageChange={({ selected }) => setPage(selected)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  

  // const QuestionTab = () => {
  //   const [headerSearch, setHeaderSearch] = useState();
  //   // const onSearch = (value, _e, info) => console.log(info?.source, value);
  //   // const { Search } = Input;
  //   // const filterOption = (input, option) =>
  //   //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  //   // const onChange = (value) => {
  //   //   console.log(`selected ${value}`);
  //   // };
  //   // const onSearchSelect = (value) => {
  //   //   console.log("search:", value);
  //   // };

  //   // const calculateTimeAgo = (createdAt) => {
  //   //   const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
  //   //   const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
  //   //   const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
  //   //   const duration = moment.duration(diffMilliseconds);
  //   //   const humanReadableDiff = duration.humanize(true);
  //   //   return humanReadableDiff;
  //   // };

  //   return (
  //     <div className="community-tab-container questions-tab-container">
  //       <div className="search-container">
  //       <Input
  //         className="community_search_small"
  //         placeholder="Search anything.."
  //         allowClear
  //         prefix={
  //           <SearchOutlined
  //             style={{ color: "#0074D9", padding: "0 6px", fontSize: "24px" }}
  //           />
  //         }
  //         onChange={(e) => {
  //           setHeaderSearch(e?.target?.value);
  //         }}
  //         value={headerSearch}
  //         style={{
  //           width: isMobile ? "84%" : "74%",
  //           padding: "10px",
  //           border: "1px solid #ccc",
  //           borderRadius: "5px",
  //           background: "#ffffff",
  //           boxSizing: "border-box",
  //           fontSize: "16px",
  //           fontFamily: "Inter",
  //         }}
  //       />

  //       <Image
  //         onClick={() => setSortByOrder(!sortByOrder)}
  //         loader={myImageLoader}
  //         style={{ borderRadius: "2px", cursor: "pointer", display: "none" }}
  //         width={44}
  //         height={44}
  //         preview="false"
  //         src={shorting_icon}
  //         alt="profile"
  //         className="shorting_icon"
  //       />

  //       <Modal
  //         visible={sortByOrder}
  //         footer={null}
  //         onCancel={() => {
  //           setSortByOrder(false);
  //         }}
  //       >
  //         <div className="sorting shorting_icon">
  //           <label className="sortby" htmlFor="sortDropdown">
  //             Sort By:{" "}
  //           </label>
  //           <select
  //             id="sortDropdown"
  //             style={{ border: "none", background: "transparent" }}
  //             value={sortBy}
  //             onChange={handleSort}
  //           >
  //             {options.map((option) => (
  //               <option key={option.value} value={option.value}>
  //                 {option.label}
  //               </option>
  //             ))}
  //           </select>
  //         </div>
  //       </Modal>
  //       </div>
  //       <div
  //         className="cards-container"
  //         style={{
  //           marginTop: "1rem",
  //         }}
  //       >
  //         {visitorquerieshistory?.map((data) => (
  //           <Card
  //             bordered={true}
  //             style={{
  //               width: "100%",
  //               height: "fit-content",
  //             }}
  //           >
  //             <div className="cards-header">
  //               <div>
  //                 <div>
  //                   <div className="img">
  //                     <Image
  //                       style={{ borderRadius: "5px" }}
  //                       width={48}
  //                       height={48}
  //                       preview="false"
  //                       src={
  //                         data?.visitor?.profile_pic_url
  //                         //  ||
  //                         // "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
  //                       }
  //                       alt="profile"
  //                     />
  //                   </div>
  //                   <p className="profile-badge">
  //                     {data?.visitor?.visitor_level}
  //                   </p>
  //                 </div>
  //                 <div className="profile">
  //                   <h5>{data?.visitor?.name}</h5>
  //                   <p>
  //                     {data?.title} <div className="custom-border"></div>
  //                     {calculateTimeAgo(data?.created_at)}
  //                   </p>
  //                 </div>
  //               </div>

  //               <div className="follow">
  //                 {/* <p className="button">Follow</p> */}
  //                 {/* <div className="img">
  //                 <Image
  //                   loader={myImageLoader}
  //                   style={{ borderRadius: "2px", cursor: "pointer" }}
  //                   width={36}
  //                   height={36}
  //                   preview="false"
  //                   src={three_dot_icon}
  //                   alt="profile"
  //                 />
  //               </div> */}
  //               </div>
  //             </div>
  //             <p className="para">
  //               <span
  //                 dangerouslySetInnerHTML={{ __html: data?.description }}
  //               ></span>
  //             </p>
  //             <div className="chips">
  //               {data?.postTags?.map((tag) => (
  //                 <div>{tag?.name}</div>
  //               ))}
  //             </div>
  //             <div className="chips">
  //               <p>{data?.__meta__?.total_post_replies} answers</p>
  //               <h6 className="custom-border"></h6>
  //               <p>{data?.views_counter} views</p>
  //             </div>
  //             <div className="like-footer">
  //               {/* <div className="ans">
  //               <Image
  //                 loader={myImageLoader}
  //                 style={{ borderRadius: "5px", marginRight: "5px" }}
  //                 width={16}
  //                 height={16}
  //                 preview="false"
  //                 src={message_icon}
  //                 alt="profile"
  //               />
  //               <span className="ans-text">Answer</span>
  //             </div> */}
  //               {/* <div className="rating">
  //               <div>
  //                 <Image
  //                   loader={myImageLoader}
  //                   style={{ borderRadius: "5px" }}
  //                   width={16}
  //                   height={16}
  //                   preview="false"
  //                   src={like_button}
  //                   alt="profile"
  //                 />
  //               </div>
  //               <h6>
  //                 Upvote <p></p> {data?.__meta__?.total_helpful}
  //               </h6>
  //               <div className="left-border">
  //                 <Image
  //                   loader={myImageLoader}
  //                   style={{ borderRadius: "5px" }}
  //                   width={16}
  //                   height={16}
  //                   preview="false"
  //                   src={dislike_button}
  //                   alt="profile"
  //                 />
  //               </div> */}
  //               {/* </div> */}
  //             </div>
  //           </Card>
  //         ))}
  //         {/* Render pagination controls */}
  //         {/* <Pagination defaultCurrent={1} total={100}  onChange={onChange}/> */}
  //         <div className="mt-5 mb-5" style={{ width: "100%" }}>
  //           {visitorquerieshistory?.length > 0 && (
  //             <CustomPagination
  //               pageCount={questionPageCount}
  //               page={questionPage}
  //               onPageChange={({ selected }) => setQuestionPage(selected)}
  //             />
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  
 
  const Tab4 = () => {
    const calculateMarks = () => {
      const topMarks = {};
      const bottomMarks = {};
      const levelCount = visitor_profile_levels?.[0]?.leavels.length;
      const interval = levelCount ? 100 / (levelCount - 1) : 0;

      visitor_profile_levels?.[0]?.leavels.forEach((level, index) => {
        const label = Math.round(interval * index);
        topMarks[label] = {
          label: `${level.level} \n ${level.title}`,
          style: { whiteSpace: "pre" },
        };
        bottomMarks[label] = level.max_range;
      });

      topMarks[100] = {
        label: `${
          visitor_profile_levels?.[0]?.leavels[levelCount - 1].level
        } \n ${visitor_profile_levels?.[0]?.leavels[levelCount - 1].title}`,
        style: { whiteSpace: "pre" },
      };

      return { topMarks, bottomMarks };
    };

    const { topMarks, bottomMarks } = calculateMarks();
    const timelineData = [
      { position: '2015-09-01', content: 'Create a services' },
      { position: '2015-09-01 09:12:11', content: 'Solve initial network problems' },
      // Add more timeline items as needed
    ]

    return (
      <div>
      {/* Content for mobile view */}
      {isMobile && (
         
         <div className="levels-tab-container">
         <Card
          bordered={true}
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <p className="sliderTitle">
            Starter since  {visitor_profile_levels?.[0]?.joined_at}
          </p>
          <div className="">
      <Timeline>
        {/* <Timeline.Item label="2015-09-01">Create a services</Timeline.Item> */}
        <Timeline.Item  marks={topMarks[100].label}>Solve initial network problems</Timeline.Item>

        <Timeline.Item label="201">Solve initial network problems</Timeline.Item>
        {/* Add more Timeline.Item components as needed */}
      </Timeline>
      </div>
      </Card>
    </div>
        
          
        
      )}

      {/* Content for desktop view */}
      {!isMobile && (
        <div className="desktop-view">
          <div className="levels-tab-container">
         <Card
          bordered={true}
          style={{
            width: "100%",
            height: "fit-content",
          }}
        >
          <p className="sliderTitle">
            Starter since  {visitor_profile_levels?.[0]?.joined_at}
          </p>
          <div className="slider-container">
            <Slider
              className="slider-one"
              handleStyle={{ display: "none" }}
              trackStyle={{ display: "none" }}
              railStyle={{ display: "none" }}
              marks={topMarks}
              step={null}
              defaultValue={100}
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
              defaultValue={visitor_profile_levels?.[0]?.total_points_earned}
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
        </div>
      )}
    </div>
      
    );
  };

  const Tab5 = () => {
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
        <div className="search-container"></div>
        <div
          className="cards-container"
          style={{
            marginTop: "1rem",
          }}
        >
          {libraryData?.map((data) => (
            <Card
              bordered={true}
              style={{
                width: "100%",
                height: "fit-content",
              }}
              key={data.id}
            >
              {data?.blog !== null && (
                <div className="cards-header">
                  <div>
                    <div>
                      <div className="img">
                        <Image
                          style={{ borderRadius: "5px" }}
                          width={48}
                          height={48}
                          preview="false"
                          src={
                            data?.blog?.image ||
                            "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                          }
                          alt="profile"
                        />
                      </div>
                    </div>
                    <div className="profile">
                      <h5>{data?.blog?.name}</h5>
                      <p>{calculateTimeAgo(data?.created_at)}</p>
                    </div>
                  </div>

                  <div className="follow mobile-delete-btn">
                    <button
                      className="button"
                      onClick={() => handleDelete(data.id)}
                      style={{ background: "transparent" }}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              )}
              {data?.market_research && (
                <div className="cards-header">
                  <div>
                    <div>
                      <div className="img">
                        <Image
                          style={{ borderRadius: "5px" }}
                          width={48}
                          height={48}
                          preview="false"
                          src={
                            data?.market_research?.image ||
                            "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg"
                          }
                          alt="profile"
                        />
                      </div>
                    </div>
                    <div className="profile">
                      <h5>{data?.market_research?.name}</h5>
                      <p>{calculateTimeAgo(data?.created_at)}</p>
                    </div>
                  </div>

                  <div className="follow mobile-delete-btn">
                    <button
                      className="button"
                      onClick={() => handleDelete(data.id)}
                      style={{ background: "transparent" }}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
          {/* Render pagination controls */}
          <div className="mt-5" style={{ width: "100%" }}>
            {libraryData?.length > 0 && (
              <CustomPagination
                pageCount={libraryPageCount}
                page={libraryPage}
                onPageChange={({ selected }) => setLibraryPage(selected)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const items = [
    {
      key: "1",
      label: "Profile",
      children: <Tab1 />,
    },
    // {
    //   key: "2",
    //   label: "Community",
    //   children: <Tab2 />,
    // },
    {
      key: "3",
      label: "Questions",
      children: <QuestionTab />,
    },
    {
      key: "4",
      label: "Levels",
      children: <Tab4 />,
    },
    {
      key: "5",
      label: "Activities",
      children: <Tab2 />,
    },
    {
      key: "6",
      label: "My Library",
      children: <Tab5 />,
    },
  ];

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Container>
      <div className="profile-container profile_first_tab row">
        <div className="col-md-9">
          <Tabs
            className="header-tabs profile-tab"
            defaultActiveKey="1"
            onChange={onChange}
          >
            {items.map((tab) => (
              <Tabs.TabPane tab={tab.label} key={tab.key}>
                {tab.children}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
        <div className="col-md-3">
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
                style={{ borderRadius: "13px" }}
                width={80}
                height={80}
                preview="false"
                src={
                  visitorcommunityprofile?.data[0]?.profile_pic_url ||
                  profile_img
                }
                alt="profile"
              />
              <p className="profile-badge">
                {visitorcommunityprofile?.data[0]?.current_level}
              </p>

              <div className="level">
                Level : {visitorcommunityprofile?.data[0]?.current_level}{" "}
                {visitorcommunityprofile?.data[0]?.current_badge
                  ? `: ${visitorcommunityprofile?.data[0]?.current_badge}`
                  : ""}
              </div>
              <div>
                <span>{visitorcommunityprofile?.data[0]?.level_up_points}</span>{" "}
                {visitorcommunityprofile?.data[0]?.level_up_text}
              </div>
            </div>
            <hr />
            <div className="following-section">
              <div style={{ width: "100%" }}>
                <p className="head">Contributions</p>
                <p className="count">
                  {visitorcommunityprofile?.data[0]?.contributions}
                </p>
              </div>
              {/* <div style={{ display: "flex" }}>
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
              </div> */}
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
                  Joined {visitorcommunityprofile?.data[0]?.joined_at}
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
            className="edit-profile-modal"
            visible={isModalOpen}
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
                    style={{ borderRadius: "6px" }}
                    loader={myImageLoader}
                    className="mdg"
                    src={updateProfileData?.profile_pic_url || profile_img}
                    alt=""
                    placeholder="Logo"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="profile-button">
                  <h6>Profile Picture</h6>
                  <div>
                    <div className="remove" onClick={() => removeProfilePic()}>
                      Remove
                    </div>
                    {/* <div className="upload">Upload</div> */}

                    <Upload
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      onChange={(e) => handleFileChange(e)}
                      name="avatar"
                      listType="picture-card"
                      className=""
                      showUploadList={false}
                    >
                      {loading ? <LoadingOutlined /> : ""}
                      Upload
                    </Upload>
                  </div>
                </div>
              </div>
              <div className="profile-details">
                <div>
                  <p>Alternate Email</p>
                  <Input
                    name="alternate_email"
                    value={updateProfileData.alternate_email}
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
                      className="country-code-field"
                      onSearch={onSearch}
                      filterOption={filterOption}
                      options={countyList}
                      onClick={fetchCountry}
                      value={updateProfileData.country_code}
                      onChange={(e) => {
                        setUpdateProfileData((prev) => ({
                          ...prev,
                          ["country_code"]: e,
                        }));
                      }}
                    />
                    <Input
                      name="mobile"
                      value={updateProfileData.mobile}
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
    visitor_activities,
    visitor_library,
  } = state;
  return {
    visitorprofile,
    visitorcommunityprofile,
    visitor_community,
    visitor_queries_history,
    visitor_points_history,
    countries,
    visitor_profile_levels,
    visitor_activities,
    visitor_library,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  updateCrud: crudActions._update,
};

export default connect(mapStateToProps, actionCreators)(Profile);
