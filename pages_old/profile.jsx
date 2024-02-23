import React from "react";

import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import UserProfile from "../components/profile";
import { Radio, Space, Tabs } from "antd";
import { useState } from "react";
import Booked from "../pages/consultants/booked";
import History from "../pages/consultants/history";
import VisitorCreditPurchase from "../pages/consultants/visitor-credits";
import VisitorCreditPurchaseHistory from "../pages/consultants/visitor-credits-history";
import VisitorCreditRedeemHistory from "../pages/consultants/visitor-credit-redeem-history";
import SubscriptionDetail from "../components/profile/subscription-detail";
import SubscriptionHistory from "../components/profile/subscription-history";

import {
  UserOutlined,
  HistoryOutlined,
  BookOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { isBrowser } from "react-device-detect";

const Profile = () => {
  return (
    <section className="profile-container">
      {/* <div className="profile">
        <UserProfile />
      </div> */}
      <div
        style={{ marginTop: isBrowser ? "-15px" : "0px", overflow: "scroll" }}
      >
        <Tabs
          tabPosition={isBrowser ? "left" : "top"}
          defaultActiveKey="0"
          style={{ padding: "5px" }}
        >
          <Tabs.TabPane
            tab={
              <span>
                <UserOutlined />
                Your Profile
              </span>
            }
            key={"0"}
          >
            <UserProfile />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <HistoryOutlined />
                Booking History
              </span>
            }
            key={"1"}
          >
            <History />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <BookOutlined />
                Booked Consultants
              </span>
            }
            key={"2"}
          >
            <Booked />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <CreditCardOutlined />
                Credit Purchase
              </span>
            }
            key={"3"}
          >
            <VisitorCreditPurchase />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <FileTextOutlined />
                Credit Purchase History
              </span>
            }
            key={"4"}
          >
            <VisitorCreditPurchaseHistory />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <FileTextOutlined />
                Credit Redeem History
              </span>
            }
            key={"5"}
          >
            <VisitorCreditRedeemHistory />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <DollarCircleOutlined />
                Subscription Detail
              </span>
            }
            key={"6"}
          >
            <SubscriptionDetail />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <ProfileOutlined />
                Subscription History
              </span>
            }
            key={"7"}
          >
            <SubscriptionHistory />
          </Tabs.TabPane>
        </Tabs>
      </div>

      <BodyBackgroundColor color={isBrowser ? "#fff" : "#F4F6F6"} />
    </section>
  );
};

export default Profile;
