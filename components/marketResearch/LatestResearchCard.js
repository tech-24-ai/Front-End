import React from "react";
import { DocumentIcon } from "../icons";
import { Card, Space } from "antd";
import myImageLoader from "../../components/imageLoader";
import rightArrow from "../../public/new_images/right-arrow.svg";
import Link from "next/link";
import Image from "next/image";
import { DateIcon, ProfileIcon } from "../../components/icons";

const options = {
  day: "numeric",
  month: "long",
  year: "numeric",
};




const LatestResearchCard = ({ title, date, description }) => {
  return (
    <div className="latest-research-card">
      <div className="research-title-section-wrapper">
        <DocumentIcon height={60} width={46} />
        <div className="research-title-wrapper">
          <p className="title">Research Title</p>
          <p className="date">19-03-2024</p>
        </div>
      </div>
      <p className="research-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam posuere
        arcu urna, non gravida erat tincidunt vitae.
      </p>

      <div className="second-div">
              <Card
                
                hoverable
                className="blog-card"
                onClick={() => <Link href={`blogs/${post.slug}`} />}
                cover={
                  <Image
                    loader={myImageLoader}
                    src={
                      "images/img_not_available.jpg"
                    }
                    alt=""
                    layout="raw"
                    width={380}
                    height={283}
                    style={{
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                    }}
                  />
                }
              >
                <div style={{ display: "flex" }}>
                  <ProfileIcon />
                  <p className="admin-text">Admin</p>

                  <DateIcon />

                  <p className="admin-text">
                   12-03-20
                  </p>
                </div>
                <p className="card-heading">blog</p>
                <p className="blogs-card-body">name</p>
              
              </Card>
      </div>
    </div>
  );
};

export default LatestResearchCard;
