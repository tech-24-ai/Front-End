import React from "react";
import moment from "moment";
import Image from "next/future/image";
import Router from "next/router";
import news from "../../public/new_images/news.jpg";
import myImageLoader from "../../components/imageLoader";
import { calculateDateTime } from "../../_global";

const NewsAnnouncmentCard = ({ data, key }) => {
  const handlePageRedirection = () => {
    const { get_news_announcements, url_slug } = data;
    Router.push(`community/news/${url_slug}`);
  };

  return (
    <div
      className="question-card"
      style={{ minHeight: 200 }}
      data-index={key}
      key={key}
    >
      <div
        className="question-card-body hover"
        onClick={() => handlePageRedirection()}
      >
        <div className="question-profile-section">
          {/* <Image
            preview={false}
            src={news}
            alt={data.title}
          /> */}
          <Image
            loader={myImageLoader}
            style={{
              borderRadius: "5px",
              zIndex: "1",
              marginRight: 5,
              padding: 3,
            }}
            width={64}
            height={64}
            preview="false"
            src={news}
            alt="profile"
          />
          <div className="profile-wrapper-news" style={{ maxWidth: "80%" }}>
            <h6>{data?.title}</h6>
            <p>
              {" "}
              {} {calculateDateTime(data?.created_at)}
            </p>
          </div>
        </div>

        <p
          className="question-description"
          dangerouslySetInnerHTML={{
            __html: data?.short_description,
          }}
        ></p>
      </div>
    </div>
  );
};

export default NewsAnnouncmentCard;
