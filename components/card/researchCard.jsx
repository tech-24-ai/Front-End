import React from "react";
import { Card } from "antd";
import myImageLoader from "../../components/imageLoader";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import Router from "next/router";

function researchCard({
  image,
  imageAlign,
  imageHeight = 106,
  imageWidth = 83,
  title,
  titleAlign,
  text,
  textAlign,
  arrowIcon,
  iconBGColor = "white",
  children,
  icon,
  pathname,
}) {
  return (
    <Card className="research-card">
      {image && (
        <div className={`research-card-image ${imageAlign}`}>
          <Image
            loader={myImageLoader}
            src={image}
            alt=""
            layout="raw"
            width={imageWidth}
            height={imageHeight}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      {icon}
      {title && (
        <div className="research-card-title" style={{ textAlign: titleAlign }}>
          {title}
        </div>
      )}
      {text && (
        <div className="research-card-text" style={{ textAlign: textAlign }}>
          {text}
        </div>
      )}

      {arrowIcon && (
        <div
          type="button"
          className={`custom-icon round ${iconBGColor} icon-small`}
          style={{ height: 45, minHeight: 45, width: 45, minWidth: 45 }}
          onClick={() =>
            Router.push({
              pathname,
            })
          }
        >
          <ArrowRightOutlined style={{ fontSize: "10px" }} />
        </div>
      )}

      {children}
    </Card>
  );
}

export default researchCard;
