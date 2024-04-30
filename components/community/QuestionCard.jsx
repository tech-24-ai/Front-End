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
              //   data.visitor.profile_pic_url ||
              "https://s3-alpha-sig.figma.com/img/f89d/b836/41bb906adb1604f260e8fe4b09ed6652?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QeHMqZ7rfdr3AqUj2eXBLXMsEZdGDemD0RpXRXz5SFYGktRvaqGk~hnUL-6~f~qU4VLT4uNlle4ES7W3~RF2sZC9OlPLGUQypASt1UzKxfepCo0oTkj2byqZP8h4bCbKurshobbgNR1wQquZA4rdtarwJH6tKvQ1AXAzzfy5DpMklPLCUh4ey-7aaV7IvN3juq81-L74g9DTk3TxcpklI7xR3aTo0tPtGsX6iFXv~K69tLqH8EA41CD3mM~07~oTutL3N33lakNfUy0Ttdvvs4rTqkhhXmaeBE-JNw2Xga6J8rMvFPz4AhpuK3AINy6RmOYZwtFstzxeC3BrueN~SA__"
            }
            alt={data.visitor.name}
          />
          <div className="profile-wrapper">
            <h6>{data?.visitor?.name}</h6>
            <p>{calculateTimeAgo(data?.created_at)}</p>
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
