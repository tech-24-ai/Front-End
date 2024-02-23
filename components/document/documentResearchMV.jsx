import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Component from "../../public/images/datacenter/component.svg";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions, alertActions } from "../../_actions";
import { crudService } from "../../_services";
import PurchaseDocument from "../subscription/PurchaseDocument";
import { Icon } from "react-icons-kit";
import { play } from "react-icons-kit/feather";

import Tooltip from "react-tooltip-lite";

const documentResearchMV = ({
  getAllCrud,
  playVideo,
  showAlert,
  downloadDocument,
  get_subscription,
  authentication,
  documents,
}) => {
  const [tooltipOpen, setTooltip] = useState(false);
  const [isPaymentInProcess, setIsPaymentInProcess] = useState(false);
  const [document, setDocument] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);

  const toggleClick = (id) => {
    if (tooltipOpen == id) {
      setTooltip(false);
    } else {
      setTooltip(id);
    }
  };

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

  const handleDownload = (doc) => {
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
    documents &&
    documents.map((row, index) => {
      let price = 0;
      let isFree = true;

      if (
        activeSubscription &&
        activeSubscription.plans.plan_category < row.subscription_category
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
        <div>
          <Card key={index}>
            <CardBody className="px-2">
              <Row className="m-0">
                <Col xs={8} className="p-0">
                  {row.name}
                </Col>
                <Col xs={3} className="p-0 text-center">
                  {/* isFree ? "Free" : `$${price}` */}
                </Col>
                <Col xs={1} className="p-0 text-right">
                  <div
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
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Modal
            centered
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
              <Button
                color="warning"
                onClick={() => setIsPaymentInProcess(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    })
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

export default connect(mapStateToProps, actionCreators)(documentResearchMV);
