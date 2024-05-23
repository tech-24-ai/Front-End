import React from "react";
import { NotFoundIcon } from "../icons";

const NotFound = ({ children }) => {
  return (
    <div className="no-result-found-section" style={{ margin: "0 auto" }}>
      <NotFoundIcon />
      <h5 className="title">No result found</h5>
      {/* <p className="message">We can't find any item matching your search</p> */}
      {children}
    </div>
  );
};

export default NotFound;
