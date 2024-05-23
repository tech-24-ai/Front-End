import React from "react";
import { NotFoundIcon } from "../icons";

const NoContent = ({ children }) => {
    return (
        <div className="no-result-found-section" style={{ margin: "20px auto" }}>
            <NotFoundIcon />
            <h5 className="title">No Content Available</h5>
            <p className="message">We can't find any item</p>
            
        </div>
    );
};

export default NoContent;
