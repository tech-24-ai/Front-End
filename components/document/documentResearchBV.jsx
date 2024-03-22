import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import React, { useState, useEffect } from "react";

import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";
import { crudActions, alertActions } from "../../_actions";
import { crudService } from "../../_services";
import { download } from "react-icons-kit/feather";
import PurchaseDocument from "../subscription/PurchaseDocument";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Icon } from "react-icons-kit";
import { alignLeft, play } from "react-icons-kit/feather";

const DocumentResearchBV = ({
  getAllCrud,
  playVideo,
  showAlert,
  downloadDocument,
  get_subscription,
  documents,
  authentication,
}) => {
  const [isPaymentInProcess, setIsPaymentInProcess] = useState(false);
  const [document, setDocument] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);

  let columnData = [];

  useEffect(() => {
    if (authentication.loggedIn) {
      getAllCrud("get_subscription", "get_subscription");
    }
  }, [documents]);

  useEffect(() => {
    get_subscription &&
      get_subscription.filter((activeSub) => {
        if (activeSub.is_active === 1 && activeSub.plans != null) {
          setActiveSubscription(activeSub);
        }
      });
  }, [get_subscription]);

  const handleDownload = async (doc) => {
    if (doc.isFree && authentication.loggedIn) {
      if (doc.extension == "mp4") {
        return playVideo(doc.document_id);
      } else {
        return downloadDocument(
          doc.document_id,
          `${doc.document_name}.${doc.extension}`
        );
      }
    }

    showAlert("Upgrade plan to access!");
    // crudService
    //   ._getAll(`checkPurchase?document_id=${doc.document_id}`)
    //   .then((res) => {
    //     const { data } = res;
    //     if (res.data.message == "No Document found") {
    //       setDocument(doc);
    //       setIsPaymentInProcess(true);
    //     } else {
    //       downloadDocument(doc.document_id, doc.extension);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="datatable table-responsive">
      <div
        className="react-bootstrap-table"
        style={{ maxHeight: "430px", overflow: "auto" }}
      >
        {/* <p
          style={{
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1,
            letterSpacing: "0.26px",
            textAlign: "left",
            color: "#272727",
          }}
        >
          Available Reports
        </p> */}
        <table className="table table-bordered research-table" width="100%">
          <tbody>
            {documents &&
              documents.map((row, key) => {
                let price = 0;
                let isFree = true;

                if (
                  activeSubscription &&
                  activeSubscription.plans.plan_category <
                    row.subscription_category
                ) {
                  isFree = false;
                  if (activeSubscription.plans.plan_category == 1) {
                    if (row.basic_document_special_price > 0) {
                      price = row.basic_document_special_price;
                    } else {
                      price = row.basic_document_price;
                    }
                  } else if (activeSubscription.plans.plan_category == 2) {
                    if (row.advance_document_special_price > 0) {
                      price = row.advance_document_special_price;
                    } else {
                      price = row.advance_document_price;
                    }
                  }
                }

                return (
                  <tr key={key}>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      <img src="images/document.png" alt="" width={25} />
                      <div
                        style={{
                          marginLeft: "1rem",
                          opacity: isFree ? "0.7" : "0.3",
                        }}
                      >
                        {row.name}
                      </div>
                    </td>

                    <td>
                      {/* <div>{isFree ? "Free" : `$${price}`}</div> */}
                      <div
                        className="links"
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          top: "-9px",
                        }}
                      >
                        <span
                          className="text-success"
                          onClick={() =>
                            handleDownload({
                              price,
                              isFree,
                              subscription_category: row.subscription_category,
                              url: row.url,
                              document_id: row.id,
                              document_name: row.name,
                              extension: row.extension,
                            })
                          }
                        >
                          {isFree ? (
                            row.extension == "mp4" ? (
                              <div style={{ color: "#65bb65" }}>
                                <Icon size={16} icon={play} />
                              </div>
                            ) : (
                              <img
                                src="images/Group 417@2x.png"
                                alt=""
                                style={{
                                  height: "18px",
                                  width: "18px",
                                }}
                              />
                            )
                          ) : row.extension == "mp4" ? (
                            <div style={{ color: "#da4b00" }}>
                              <Icon size={16} icon={play} />
                            </div>
                          ) : (
                            <img
                              src="images/Icon feather-lock@2x.png"
                              alt=""
                              style={{
                                height: "17px",
                                width: "15px",
                              }}
                            />
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isPaymentInProcess}
        toggle={() => setIsPaymentInProcess(false)}
        className=""
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader
          toggle={() => setIsPaymentInProcess(false)}
          style={{ backgroundColor: "#d1eaff" }}
        >
          Plan Subscription
        </ModalHeader>
        <ModalBody
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PurchaseDocument
            document={document}
            setIsPaymentInProcess={setIsPaymentInProcess}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={() => setIsPaymentInProcess(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ authentication, get_subscription }) => {
  return {
    get_subscription,
    authentication,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  playVideo: crudActions._playVideo,
  downloadDocument: crudActions._download,
  showAlert: alertActions.warning,
};

export default connect(mapStateToProps, actionCreators)(DocumentResearchBV);
