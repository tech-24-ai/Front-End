import React from "react";
import moment from "moment";
import Image from "next/future/image";
import Router from "next/router";
import news from "../../public/new_images/news.jpg"
import myImageLoader from "../../components/imageLoader";

const NewsAnnouncmentCard = ({ data, key }) => {
  const calculateTimeAgo = (createdAt) => {
    const currentDateTime = moment();
    const blogPostDateTime = moment.utc(createdAt).local().format("MM-DD-YYYY");
   
    // const diffMilliseconds = currentDateTime.diff(blogPostDateTime);
    // const duration = moment.duration(diffMilliseconds);

    // let humanReadableDiff;
    // if (duration.asMinutes() < 60) {
    //   humanReadableDiff = duration.minutes() + " minutes ago";
    // } else {
    //   humanReadableDiff = duration.humanize(true);
    // }
    return blogPostDateTime;
  };

  const handlePageRedirection = () => {
    const { get_news_announcements, url_slug } = data;
    Router.push(`community/news/${url_slug}`);
  };

  return (
    <div className="question-card" style={{minHeight: 200}} data-index={key} key={key}>
      <div className="question-card-body hover"   onClick={() => handlePageRedirection()}>
        <div className="question-profile-section">
          {/* <Image
            preview={false}
            src={news}
            alt={data.title}
          /> */}
           <Image
                    loader={myImageLoader}
                    style={{ borderRadius: "5px", zIndex: "1",marginRight:5,padding:3 }}
                    width={64}
                    height={64}
                    preview="false"
                    src={news}
                    alt="profile"
                    
                  />
          <div className="profile-wrapper" style={{maxWidth:'80%'}}>
            <h6>{data?.title}</h6>
            <p>
              {" "}
              {} {calculateTimeAgo(data?.created_at)}
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
