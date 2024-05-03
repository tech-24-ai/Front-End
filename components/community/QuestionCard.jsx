import React from "react";
import moment from "moment";
import { Image } from "antd";
import Router from "next/router";

const QuestionCard = ({ data, key }) => {
  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment().format("MM-DD-YYYY hh:mm A");
    const blogPostDateTime = moment(createdAt, "MM-DD-YYYY hh:mm A");
    const diffMilliseconds = blogPostDateTime.diff(currentDateTime);
    const duration = moment.duration(diffMilliseconds);
    const humanReadableDiff = duration.humanize(true);
    return humanReadableDiff;
  };

  return (
    <div className="question-card" data-index={key} key={key}>
      <div className="question-card-body">
        <div className="question-profile-section">
          <Image
            preview={false}
            src={
              data.visitor.profile_pic_url ||
              "https://tech24-uat.s3.amazonaws.com/WTVfXLYeN3"
            }
            alt={data.visitor.name}
          />
          <div className="profile-wrapper">
            <h6>{data?.title}</h6>
            <p> {data?.visitor?.name} {} ({calculateTimeAgo(data?.created_at)})</p>
          </div>
        </div>

        <p
          className="question-description"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></p>
        <div
          className="question-tag-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            minHeight: '1.4rem',
          }}
        >
          {data.postTags.map((tag, index) => (
            <p className="question-tag" key={index}>
              {tag.name}
            </p>
          ))}
        </div>
        <button
          className="custom-btn with-bg-secondary answer-btn"
          onClick={() => {
            sessionStorage.setItem("community_id", data?.community?.url_slug);
            sessionStorage.setItem("community_question_id", data?.url_slug);
            Router.push("community/question");
          }}
        >
          Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
