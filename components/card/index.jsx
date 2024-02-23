import React from "react";
import myImageLoader from "../imageLoader";
import Image from "next/image";

function index({ children, title, text, button, icon, onClick }) {
  console.log("Icon", icon);
  return (
    <div className="card">
      <div className="category-card">
        {icon && (
          <div className="custom-icon light">
            {/* <Image
              loader={myImageLoader}
              src={icon}
              // src={`/new_images/${data.icon.white}`}
              alt=""
              placeholder="Website"
              layout="raw"
              height={35}
              width={25}
            /> */}
            {icon}
          </div>
        )}
        {title && <h5 className="title">{title}</h5>}
        {text && <h6 className="text">{text}</h6>}
        {button && (
          <div className="custom-btn with-bg" onClick={onClick}>
            {button}
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
