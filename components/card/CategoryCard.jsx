import React from "react";
import myImageLoader from "../imageLoader";
import Image from "next/image";

function index({ children, title, text, button, icon, onClick }) {
  return (
    <div className="card">
      <div className="category-card">
        {icon && (
          <div className="icon-container light-bg">
            <Image
              loader={myImageLoader}
              src={icon}
              // src={`/new_images/${data.icon.white}`}
              alt=""
              placeholder="Website"
              layout="raw"
              height={35}
              width={25}
            />
          </div>
        )}
        {title && <h5 className="title">{title}</h5>}
        {text && <h6 className="text">{text}</h6>}
        {button && (
          <div
            className="custom-btn with-bg mer"
            onClick={() => alert("Hello")}
          >
            {button}
          </div>
        )}
      </div>
    </div>
  );
}

export default index;
