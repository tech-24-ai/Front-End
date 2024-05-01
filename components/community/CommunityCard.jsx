import React from "react";
import moment from "moment";
import { Image } from "antd";
import Router from "next/router";
import { ArrowRightOutlined, ArrowLeftOutlined, UsergroupAddOutlined, MessageOutlined, EyeOutlined } from "@ant-design/icons";


const CommunityCard = ({ data, key }) => {
    const calculateTimeAgo = (createdAt) => {
        const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
        const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
        const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
        const duration = moment.duration(diffMilliseconds);
        const humanReadableDiff = duration.humanize(true);
        return humanReadableDiff;
    };

    return (
        <div className="community-card" data-index={key} key={key}>
            <div className="community-card-header">
                <Image
                    preview={false}
                    src={
                        data?.image_url ||
                        "https://tech24-uat.s3.amazonaws.com/WTVfXLYeN3"
                    }
                    alt={data.name}
                    width={64}
                    height={64}
                    style={{borderRadius: "4.8px"}}
                />
                <div className="community-title-header">
                    <h5>{data?.name}</h5>
                </div>
            </div>
            <div className="community-card-material">
                <p className="card-description-texts">{data.description}</p>
                <div className="card-review">
                    <EyeOutlined style={{ fontSize: "16px", verticalAlign: "0.04em" }} />  Answers : {data.__meta__.total_post_reply}
                    <span style={{ margin: "0 6px", color: "#dde3ec"}}>|</span>
                    <MessageOutlined style={{ fontSize: "16px", verticalAlign: "0.04em" }} /> Questions : {data.__meta__.total_post_reply}
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;
