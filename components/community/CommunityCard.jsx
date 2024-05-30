import React from "react";
import moment from "moment";
import { Image } from "antd";
import Router from "next/router";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  UsergroupAddOutlined,
  MessageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { crudService } from "../../_services";
import { isMobile } from "react-device-detect";

const CommunityCard = ({ data, key }) => {
  const pageRedirection = () => {
    if (data?.url_slug) {
      const url = `community/${data?.url_slug}`;
      Router.push(url);
    }
  };

  return (
    <div
      className="community-card"
      data-index={key}
      key={key}
      onClick={() => pageRedirection()}
      style={{
        cursor: "pointer",
        border: "0.5px solid #d9dfe9",
        borderRadius: "6px",
        height: "254px",
        marginTop: "10px",
      }}
    >
      <div
        className="community-card-header"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "80px",
          background: "#f2f4f7",
          borderTopLeftRadius: "6px",
          borderTopLeftRadius: "6px",
        }}
      >
        <Image
          preview={false}
          src={
            data?.image_url || "https://tech24-uat.s3.amazonaws.com/WTVfXLYeN3"
          }
          alt={data.name}
          width={64}
          // height="auto"
          style={{ borderRadius: "4.8px" }}
        />
        <div className="community-title-header">
          <h5>{data?.name}</h5>
        </div>
      </div>
      <div className="community-card-material" style={{ padding: "12px" }}>
        <p
          className="card-description-texts"
          style={
            isMobile
              ? {
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  // lineHeight: '18px',
                  maxHeight: "calc(1.2em * 3)",
                  minHeight: "114px",
                }
              : { minHeight: "114px" }
          }
        >
          {data.description}
        </p>
        <div
          className="card-review"
          style={{ fontSize: "14px", fontWeight: "500", color: "#001622" }}
        >
          <EyeOutlined style={{ fontSize: "16px", verticalAlign: "0.04em" }} />{" "}
          Answers : {data.__meta__.total_post_reply}
          <span style={{ margin: "0 6px", color: "#dde3ec" }}></span>
          <MessageOutlined
            style={{ fontSize: "16px", verticalAlign: "0.04em" }}
          />{" "}
          Queries : {data.__meta__.total_post_reply}
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
