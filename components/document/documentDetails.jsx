import React, { useState, useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import featherLock from "../../public/images/Icon feather-lock@2x.png";
import GroupImg from "../../public/images/Group 417@2x.png";
import LoginImg from "../../public/images/login-rounded-30.png";
import { userActions } from "../../_actions";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Image } from "antd";
import Router from "next/router";

function DocumentDetails({
  documents,
  authentication,
  activeSubscription,
  documentPurchase,
  handleDownload,
  toggleLoginPopup,
  handleView,
}) {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (documents && documents.data.length == 1) {
      const {
        advance_document_price,
        advance_document_special_price,
        basic_document_price,
        basic_document_special_price,
        description,
        document_category,
        extension,
        id,
        name,
        paymentstatus,
        subscription_category,
        is_embedded,
        thumbnail,
        tag,
      } = documents.data[0];

      let price = 0;
      if (
        activeSubscription &&
        activeSubscription.plans.plan_category < subscription_category
      ) {
        if (activeSubscription.plans.plan_category == 1) {
          if (basic_document_special_price > 0) {
            price = basic_document_special_price;
          } else {
            price = basic_document_price;
          }
        } else if (activeSubscription.plans.plan_category == 2) {
          if (advance_document_special_price > 0) {
            price = advance_document_special_price;
          } else {
            price = advance_document_price;
          }
        }
      } else {
        if (basic_document_special_price > 0) {
          price = basic_document_special_price;
        } else {
          price = basic_document_price;
        }
      }

      let data = {
        name,
        price,
        description,
        document_category,
        extension,
        id,
        paymentstatus,
        subscription_category,
        is_embedded,
        thumbnail,
        tag,
      };
      setDocument(data);
    }
  }, [documents]);

  const handleDocumentPurchase = () => {
    documentPurchase({
      price: document.price,
      subscription_category: document.subscription_category,
      document_id: document.id,
      document_name: document.name,
      extension: document.extension,
    });
  };
  const handleDocumentView = () => {
    handleView({
      document_id: document.id,
      extension: document.extension,
      name: document.name,
      isEmbedded: document.is_embedded,
    });
  };

  const handleDocumentDownload = () => {
    handleDownload({
      document_id: document.id,
      extension: document.extension,
      name: document.name,
      isEmbedded: document.is_embedded,
    });
  };

  return (
    <section style={{ width: "fit-content" }}>
      <BrowserView>
        {document && (
          <div
            className="document-details"
            id="documentDetail"
            style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.5 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <b style={{ margin: 0 }}>{document.name}</b>
            </div>
            <hr style={{ marginTop: "8px" }} />
            {document.extension == "mp4" && (
              <Image
                src={document.thumbnail}
                width={300}
                preview={false}
                style={{ marginBottom: "1rem" }}
              />
            )}
            {/* <p>
            <b>
              <span>Price: </span>
            </b>
            <span>${document.price}</span>
          </p> */}
            <p>
              <b>
                <span>Tags: </span>
              </b>
              <span>{document.tag}</span>
            </p>
            {/* <p>
              <b>
                <span>Status: </span>
              </b>
              <span>
                {document.paymentstatus == 1
                  ? "Subscribed"
                  : document.paymentstatus == 2
                  ? "Purchased"
                  : "Buy"}
              </span>
            </p> */}
            <p>
              <b>
                <span>Description: </span>
              </b>
              <span
                dangerouslySetInnerHTML={{ __html: document.description }}
              ></span>
            </p>
            <div
              style={{
                marginTop: "3rem",
              }}
            >
              {/* {document.paymentstatus == 1 || document.paymentstatus == 2 ? (
                <div>
                  {document.is_embedded == 1 && (
                    <button
                      type="button"
                      className="btn btn-info mr-4"
                      style={{ letterSpacing: "1px" }}
                      onClick={handleDocumentView}
                    >
                      View Document
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{ letterSpacing: "1px" }}
                    onClick={handleDocumentDownload}
                  >
                    {document.extension == "mp4"
                      ? "View Session"
                      : "Download"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-info"
                  style={{ letterSpacing: "2px" }}
                  onClick={() => Router.push("/pricing")}
                >
                  Subscribe
                </button>
              )} */}
              <div>
                {document.is_embedded == 1 && (
                  <button
                    type="button"
                    className="custom-btn with-bg"
                    style={{ letterSpacing: "1px", border: "none" }}
                    onClick={handleDocumentView}
                  >
                    View Document
                  </button>
                )}
                <button
                  type="button"
                  className="custom-btn with-bg"
                  style={{
                    letterSpacing: "1px",
                    border: "none",
                    marginLeft: "15px",
                  }}
                  onClick={handleDocumentDownload}
                >
                  {document.extension == "mp4" ? "View Session" : "Download"}
                </button>
              </div>
            </div>
          </div>
        )}
      </BrowserView>

      <MobileView>
        {document && (
          <div className="document-details" id="documentDetail">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <b style={{ margin: 0, fontWeight: 700 }}>{document.name}</b>
            </div>
            <hr style={{ marginTop: "8px" }} />
            {document.extension == "mp4" && (
              <Image
                src={document.thumbnail}
                preview={false}
                style={{ marginBottom: "1rem" }}
              />
            )}

            {/* <p>
              <b>
                <span>Price: </span>
              </b>
              <span>${document.price}</span>
            </p> */}
            <p>
              <b>
                <span>Tags: </span>
              </b>
              <span>{document.tag}</span>
            </p>
            {/* <p>
              <b>
                <span>Status: </span>
              </b>
              <span>
                {document.paymentstatus == 1
                  ? "Subscribed"
                  : document.paymentstatus == 2
                  ? "Purchased"
                  : "Buy"}
              </span>
            </p> */}
            <p>
              <b>
                <span>Description: </span>
              </b>
              <span
                dangerouslySetInnerHTML={{ __html: document.description }}
              ></span>
            </p>
            <div
              style={{
                marginTop: "3rem",
              }}
            >
              {/* {document.paymentstatus == 1 || document.paymentstatus == 2 ? (
                <div>
                  {document.is_embedded == 1 && (
                    <button
                      type="button"
                      className="btn btn-info mb-3"
                      style={{ letterSpacing: "1px" }}
                      onClick={handleDocumentView}
                    >
                      View Document
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-info"
                    style={{ letterSpacing: "1px" }}
                    onClick={handleDocumentDownload}
                  >
                    {document.extension == "mp4"
                      ? "View Session"
                      : "Download Document"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-info"
                  style={{ letterSpacing: "2px" }}
                  onClick={() => Router.push("/pricing")}
                >
                  Subscribe
                </button>
              )} */}
              <div>
                {document.is_embedded == 1 && (
                  <button
                    type="button"
                    className="custom-btn with-bg"
                    style={{ letterSpacing: "1px", border: "none" }}
                    onClick={handleDocumentView}
                  >
                    View Document
                  </button>
                )}
                <button
                  type="button"
                  className="custom-btn with-bg"
                  style={{
                    letterSpacing: "1px",
                    border: "none",
                    marginLeft: "15px",
                  }}
                  onClick={handleDocumentDownload}
                >
                  {document.extension == "mp4" ? "View Session" : "Download"}
                </button>
              </div>
            </div>
          </div>
        )}
      </MobileView>
      {/* <BodyBackgroundColor color="#F4F6F6" /> */}
    </section>
  );
}

const mapStateToProps = (state) => {
  const { documents, authentication, get_subscription } = state;
  return {
    documents,
    authentication,
  };
};

const actionCreators = {
  toggleLoginPopup: userActions.toggleLoginPopup,
};

export default connect(mapStateToProps, actionCreators)(DocumentDetails);
