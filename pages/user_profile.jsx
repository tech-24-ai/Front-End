import React, { useMemo, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { RightOutlined } from "@ant-design/icons";

import { Tooltip } from "antd";
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
import Router, { withRouter } from "next/router";
import moment from "moment";
import { crudService } from "../_services";
import { isMobile } from "react-device-detect";
import { Menu, Dropdown } from "antd";
import CommunityCategory from "../components/community/index";

import {
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  InfoCircleOutlined,
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
import { Timeline, Icon } from "antd";
import QuestionTab from "../components/community/QuestionTab";
import shorting_icon from "../public/new_images/sorting_icon.svg";
import { calculateDateTime } from "../_global";
// import { useLocation } from 'react-router-dom';
const UserProfile = ({
  getAllCrud,
  updateCrud,
  visitorcommunityprofile,
  visitor_community,
  visitorprofile,
  visitor_queries_history,
  visitor_points_history,
  countries,
  visitor_profile_levels,
  router,
  visitor_library,
  location,
  data,
}) => {
  const { q } = Router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCom, setUpdateCom] = useState(false);
  const [visitorquerieshistory, setvisitor_queries_history] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState();
  const [visitorActivity, setvisitorActivity] = useState([]);
  const [sortByOrder, setSortByOrder] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [topRatedCommunityFeature, setTopRatedCommunityFeature] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({
    label: visitorprofile?.country?.name,
    id: visitorprofile?.country?.id,
  });
  const [activeTab, setActiveTab] = useState("1");
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [updateProfileData, setUpdateProfileData] = useState({
    alternate_email: "",
    country_code: "",
    mobile: "",
    profile_pic_url: "",
    name: "",
    first_name: "",
    last_name: "",
    designation: "",
    job_title: "",
    company: "",
    city_district: "",
    country: "",
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
  // const [visitorprofile, setVisitorProfile] = useState(0);

  const [libraryData, setLibraryData] = useState([]);
  const [reloadComponent, setreloadComponent] = useState(false);

  const [searchQuery, setSearchQuery] = useState(q);
  const [filteredData, setFilteredData] = useState({});
  const [mode, setMode] = useState("left");
  //  const [researchData, setResearchData] = useState([]);
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

  useEffect(() => {
    const visitor_id = sessionStorage.getItem("visitor_id");
    // console.log("new visitor id", visitor_id)
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCommunityData = await crudService._getAll(
          "community?orderBy=created_at&orderDirection=desc"
        );
        setAllCommunityFeature(allCommunityData.data);
        const topRatedCommunityData = await crudService._getAll(
          "community?page=1&pageSize=5&orderBy=top_rated"
        );
        setTopRatedCommunityFeature(topRatedCommunityData?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log("countryId",countryId);
  useEffect(() => {
    crudService._getAll("countries?orderBy=sort_order&orderPos=ASC", []).then(
      (result) => {
        if ((result.status = 200)) {
          if (result.data) {
            let countryData = result.data.map((country) => ({
              label: country.name,
              value: country.id,
              regionId: country.group_id,
              regionName: country.group,
            }));
            setCountryList(countryData);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //  console.log("setSelectedCountry",countryList);

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

  //all tab profile lvl
  const currentProLevel =
    visitorcommunityprofile?.data[0]?.total_points_earned < 150
      ? "0"
      : visitorcommunityprofile?.data[0]?.current_level;

  // tab5 data
  const handleCardClick = (data) => {
    if (data?.blog !== null) {
      console.log("blog details", data.blog);
      const blogSlug = data.blog.slug;

      Router.push(`/blogs/${blogSlug}`);
    } else if (data?.market_research !== null) {
      console.log("market research", data.market_research);
      const marketResearchSlug = data.market_research.seo_url_slug;
      Router.push(`/market-research/${marketResearchSlug}`);
    }
  };

  useEffect(() => {
    crudService
      ._getAll("visitor_queries_history", {
        orderBy: sortBy,
        orderDirection: "desc",
        page: page + 1,
        pageSize: itemsPerPage,
        search: searchQuery,
        ...filteredData,
        visitor_id: visitorprofile?.id,

        // visitor_id : visitorcommunityprofile?.visitor_id,
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
        orderBy: "created_at",
        orderDirection: "desc",
        page: libraryPage + 1,
        pageSize: itemsPerPage,
      })
      .then((result) => {
        setLibraryData(result?.data?.data);
        console.log("libraryData", result?.data);
        const libraryPageCount = Math.ceil(result?.data?.total / itemsPerPage);
        console.log("libraryPageCount", libraryPageCount);
        setLibraryPageCount(isNaN(libraryPageCount) ? 0 : libraryPageCount);
      });
  }, [libraryPage, sortBy, reloadComponent]);

  console.log("reloadComponent", reloadComponent);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleDelete = (id) => {
    crudService
      ._delete("visitor_library", id)
      .then((result) => {
        console.log("Item deleted successfully:", result);
        setreloadComponent((prevState) => !prevState);
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

  const groupedData = visitorActivity
    ? groupDataByDate(visitorActivity, "created_at")
    : [];
  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => moment(b, "MM-DD-YYYY") - moment(a, "MM-DD-YYYY")
  );

  const getTitle = (date) => {
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

  //SignOut

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

  useEffect(() => {
    getAllCrud("visitorcommunityprofile", "visitorcommunityprofile", {
      visitor_id: sessionStorage.getItem("visitor_id"),
    });
    getAllCrud("visitorprofile", "visitorprofile", {
      visitor_id: sessionStorage.getItem("visitor_id"),
    });
    getAllCrud("visitor_queries_history", "visitor_queries_history", {
      visitor_id: sessionStorage.getItem("visitor_id"),
    });
  }, [updateCom]);

  const fetchCountry = () => {
    getAllCrud("countries", "countries");
  };

  const countyList = countries?.map((item) => {
    return { value: item.phonecode, label: `+${item.phonecode}` };
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Change breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const style = {
    display: "inline-block",
    height: 300,
    marginLeft: 70,
  };
  const marks = {
    26: "26°C",
    37: "37°C",
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>100°C</strong>,
    },
  };

  // console.log("updateProfileData", updateProfileData);

  const Tab1 = () => {
    let visitorname = visitorprofile?.name;
    // const visitorname = visitorprofile?.data;

    console.log("visitorname", visitorname);
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

          <div></div>
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

    {
      key: "3",
      label: "Questions",
      children: <QuestionTab />,
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
            className="header-tabs"
            activeKey={activeTab}
            onChange={(tabIndex) => setActiveTab(tabIndex)}
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
                src={visitorprofile?.profile_pic_url || profile_img}
                alt="profile"
              />
              <p className="profile-badge">
                {currentProLevel}
                {/* {visitorcommunityprofile?.data[0]?.current_level} */}
              </p>

              <div className="level">
                Level :{currentProLevel}{" "}
                {/* {visitorcommunityprofile?.data[0]?.current_level}{" "} */}
                {visitorcommunityprofile?.data[0]?.current_badge &&
                visitorcommunityprofile?.data[0]?.total_points_earned >= 150
                  ? `: ${visitorcommunityprofile?.data[0]?.current_badge}`
                  : ""}
              </div>
              <div>
                <span>{visitorcommunityprofile?.data[0]?.level_up_points}</span>{" "}
                {visitorcommunityprofile?.data[0]?.level_up_text}
              </div>
            </div>
            {/* <hr /> */}
            {/* <div className="following-section">
              <div style={{ width: "100%" }}>
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
            <hr /> */}
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

              {/* <div>
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
              <hr /> */}
              {/* <div onClick={showEditModal} className="button">
                Edit Profile
              </div> */}
             
            </div>
          </Card>
          <Modal
            title="Edit Profile"
            className="edit-profile-modal"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[<div className="profile-modal-button">Save</div>]}
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
                <div className="row">
                  <div className="col-md-6">
                    <p className="mt-4">Name</p>
                    <Input
                      name="first_name"
                      type="text"
                      value={updateProfileData.first_name}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setUpdateProfileData((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }}
                      placeholder="Enter your Name here"
                    />
                  </div>
                  <div className="col-md-6">
                    <p className="mt-4">Last Name</p>
                    <Input
                      name="last_name"
                      type="text"
                      value={updateProfileData.last_name}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setUpdateProfileData((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }}
                      placeholder="Enter your Name here"
                    />
                  </div>

                  {/* <div className="col-md-6">
                    <p>Last Name</p>
                    <Input
                      name="last_name"
                      type="text"
                      value={updateProfileData.last_name || ""}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setUpdateProfileData((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }}
                      placeholder="Enter your Name here"
                    />
                  </div> */}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>Comapny Name</p>
                    <Input
                      name="company"
                      value={updateProfileData.company}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setUpdateProfileData((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }}
                      placeholder="Enter Compnay Nmae.."
                    />
                  </div>
                  <div className="col-md-6">
                    <p>Job Title</p>
                    <Input
                      name="designation"
                      value={updateProfileData.designation}
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
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>Country/Region</p>

                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      // defaultValue={colourOptions[0]}
                      // isDisabled={true}
                      // isClearable={true}
                      value={selectedCountry}
                      isSearchable={true}
                      name="country"
                      labelInValue
                      options={countryList}
                      onChange={({ label, value }) =>
                        setSelectedCountry({ label, value })
                      }
                      // onChange={(e) => {
                      //   const { name, value } = e.target;
                      //   setUpdateProfileData((prev) => ({
                      //     ...prev,
                      //     [name]: value,
                      //   }));
                      // }}
                      placeholder="Select Country"
                      style={{ width: "200px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <p>City/District</p>
                    <Input
                      name="city_district"
                      value={updateProfileData.city_district}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        setUpdateProfileData((prev) => ({
                          ...prev,
                          [name]: value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="">
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

      <Modal
        className="sign-out-container"
        title="Sign Out"
        visible={isSignOutModalOpen}
        onOk={handleSignOutOk}
        onCancel={handleSignOutCancel}
        maskClosable={false}
        footer={[
          <div onClick={handleSignOutCancel} className="sign-out-modal-button">
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
    community,
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
    community,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  updateCrud: crudActions._update,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(UserProfile)
);
