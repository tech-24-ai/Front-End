import React from "react";
import moment from "moment";
import { Image } from "antd";
import Router from "next/router";

const NewsAnnouncmentCard = ({ data, key }) => {
  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment();
    const blogPostDateTime = moment.utc(createdAt).local().format("MM-DD-YYYY hh:mm A");
   
    const diffMilliseconds = currentDateTime.diff(blogPostDateTime);
    const duration = moment.duration(diffMilliseconds);

    let humanReadableDiff;
    if (duration.asMinutes() < 60) {
      humanReadableDiff = duration.minutes() + " minutes ago";
    } else {
      humanReadableDiff = duration.humanize(true);
    }
    return humanReadableDiff;
  };

  const handlePageRedirection = () => {
    const { get_news_announcements, url_slug } = data;
    Router.push(`community/news/${url_slug}`);
  };

  return (
    <div className="question-card" style={{minHeight:"220px!important"}} data-index={key} key={key}>
      <div className="question-card-body">
        <div className="question-profile-section">
          <Image
            preview={false}
            src={
              // data.visitor.profile_pic_url ||
              "https://tech24-uat.s3.amazonaws.com/WTVfXLYeN3"
            }
            alt={data.title}
          />
          <div className="profile-wrapper" style={{maxWidth:'80%'}}>
            <h6>{data?.title}</h6>
            <p>
              {" "}
              {} ({calculateTimeAgo(data?.created_at)})
            </p>
          </div>
        </div>

        <p
          className="question-description"
          dangerouslySetInnerHTML={{
            __html: data?.short_description,
          }}
        ></p>
        <div
          className="question-tag-wrapper"
          style={{
            display: "flex",
            flexDirection: "row",
            minHeight: "3.1rem",
          }}
        >
          {/* {data.postTags.map((tag, index) => (
            <p className="question-tag" key={index}>
              {tag.name}
            </p>
          ))} */}
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

export default NewsAnnouncmentCard;
