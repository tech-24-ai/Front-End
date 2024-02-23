import React from "react";
import { BrowserView } from "react-device-detect";
import DownloadDown from "../../public/images/downloads/angledown.svg";
import { useState } from "react";

const SMresearch = (props) => {
  const [access, setAccess] = useState(!true);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textTransform: "capitalize",
          fontWeight: "500",
          borderTop: "0.5px solid rgba(112, 112, 112, 0.25)",
          borderBottom: "0.5px solid rgba(112, 112, 112, 0.25)",
          padding: "16px  0px",
        }}
      >
        <p style={{ margin: "0px" }}>the basics</p>
        <img style={{ cursor: "pointer" }} src={DownloadDown.src} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 0px",
          borderBottom: "0.5px solid rgba(112, 112, 112, 0.25)",
        }}
      >
        <p
          style={{
            margin: "0px",
            opacity: "0.3",
            color: "#272727",
          }}
        >
          RFP Templates
        </p>
        <img
          onClick={() => setAccess(!false)}
          style={{ cursor: "pointer" }}
          src={DownloadDown.src}
        />
      </div>

      {/* <div>GET ACCESS</div> */}
      {access ? (
        <>
          <div
            style={{
              zIndex: "-1",
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              width: "100%",
              height: "auto",
              opacity: "0.5",
              backgroundColor: "#000",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "1",
              width: "50%",
              margin: "20% auto",
              padding: "8px 16px",
              borderRadius: "2.5px",
              backgroundColor: "#0060d0",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            GET ACCESS
          </div>
        </>
      ) : null}
    </>
  );
};

export default SMresearch;
