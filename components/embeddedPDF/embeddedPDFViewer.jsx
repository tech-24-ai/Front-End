import React, { useEffect, useState, useRef, Fragment } from "react";
import { createPortal } from "react-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import { isBrowser, BrowserView, MobileView } from "react-device-detect";

function EmbeddedPDFViewer({ children, selector, handler, fileUrl, name }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover, Zoom } = zoomPluginInstance;

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  const renderPage = (props) => {
    return (
      <Fragment>
        {props.canvasLayer.children}
        <div style={{ userSelect: "none" }}>{props.textLayer.children}</div>
        {props.annotationLayer.children}
      </Fragment>
    );
  };

  const modalBody = () => (
    <Fragment>
      <BrowserView>
        <div
          style={{
            backgroundColor: "#fff",
            flexDirection: "column",
            overflow: "hidden",

            /* Fixed position */
            left: 0,
            position: "fixed",
            top: 0,

            /* Take full size */
            height: "100%",
            width: "100%",

            /* Displayed on top of other elements */
            zIndex: 9999,
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js">
            <div
              style={{
                alignItems: "center",
                // backgroundColor: "#000",
                backgroundColor: "lightgray",
                color: "#000",
                fontWeight: "500",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: ".5rem",
                width: "100%",
              }}
            >
              <div style={{ width: "30%" }}>{name}</div>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <ZoomOutButton />
                <ZoomPopover />
                <ZoomInButton />
              </div>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#357edd",
                    border: "none",
                    borderRadius: "4px",
                    color: "#ffffff",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                  onClick={() => handler(false)}
                >
                  Close
                </button>
              </div>
            </div>
            <div
              style={{
                flexGrow: 1,
                overflow: "auto",
                height: "100%",
              }}
            >
              <Viewer
                renderPage={renderPage}
                fileUrl={fileUrl}
                plugins={[zoomPluginInstance]}
              />
            </div>
          </Worker>
        </div>
      </BrowserView>
      <MobileView>
        <div
          style={{
            backgroundColor: "#fff",
            flexDirection: "column",
            overflow: "hidden",

            /* Fixed position */
            left: 0,
            position: "fixed",
            top: 0,

            /* Take full size */
            height: "100%",
            width: "100%",

            /* Displayed on top of other elements */
            zIndex: 9999,
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js">
            <div
              style={{
                // alignItems: "center",
                // backgroundColor: "#000",
                backgroundColor: "lightgray",
                color: "#000",
                fontWeight: "500",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-between",
                padding: ".5rem",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>{name}</div>
                <div
                  style={{
                    width: "30px",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#357edd",
                      border: "none",
                      borderRadius: "4px",
                      color: "#ffffff",
                      cursor: "pointer",
                      padding: "0 6px",
                      fontSize: "18px",
                    }}
                    onClick={() => handler(false)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <ZoomOutButton />
                <ZoomPopover />
                <ZoomInButton />
              </div>
            </div>
            <div
              style={{
                flexGrow: 1,
                overflow: "auto",
                height: "100%",
              }}
            >
              <Viewer
                renderPage={renderPage}
                fileUrl={fileUrl}
                plugins={[zoomPluginInstance]}
              />
            </div>
          </Worker>
        </div>
      </MobileView>
    </Fragment>
  );

  return mounted ? createPortal(modalBody(), ref.current) : null;
}

export default EmbeddedPDFViewer;
