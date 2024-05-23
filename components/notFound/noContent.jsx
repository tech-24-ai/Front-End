import React from "react";

const NoContent = ({ children }) => {
    return (
        <div className="no-result-found-section" style={{ margin: "0 auto" }}>
            
            <h5 className="title">No Content Available</h5>
            <p className="message">We can't find any item</p>
            
        </div>
    );
};

export default NoContent;
