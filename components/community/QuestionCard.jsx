import React from "react";
import moment from "moment";
import { Image } from "antd";
import Router from "next/router";
import { calculateDateTime } from "../../_global";

const QuestionCard = ({ data, key }) => {
  const handlePageRedirection = () => {
    const { community, url_slug } = data;
    Router.push(`community/question/${url_slug}`);
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
          <div className="profile-wrapper" style={{ maxWidth: "80%" }}>
            <h6>{data?.title}</h6>
            <p>
              {" "}
              {data?.visitor?.name} {} ({calculateDateTime(data?.created_at)})
            </p>
          </div>
        </div>

        <p
          className="question-description"
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></p>
        <div
          className="question-tag-wrapper mt-2 mb-2"
          style={{
            display: "flex",
            flexDirection: "row",
            minHeight: "2.1rem",
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
          onClick={() => handlePageRedirection()}
        >
          Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
