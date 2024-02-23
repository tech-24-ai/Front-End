import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Component from "../../public/images/datacenter/component.svg";
import { BrowserView, MobileView } from "react-device-detect";
import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  crudActions,
  userActions,
  alertActions,
  loaderActions,
} from "../../_actions";
import { crudService } from "../../_services";
import PurchaseDocument from "../subscription/PurchaseDocument";
import { Icon } from "react-icons-kit";
import { play, chevronLeft, chevronRight } from "react-icons-kit/feather";
import documentImg from "../../public/images/document.png";
import videoIcon from "../../public/images/start-512.png";
import featherLock from "../../public/images/Icon feather-lock@2x.png";
import GroupImg from "../../public/images/Group 417@2x.png";
import componentImg from "../../public/images/Component 8@2x.png";

import Tooltip from "react-tooltip-lite";
import DocumentDetails from "./documentDetails";
import ReactPaginate from "react-paginate-next";
import { Input } from "antd";

const mobileList = ({
  getAllCrud,
  playVideo,
  showError,
  downloadDocument,
  get_subscription,
  authentication,
  toggleLoginPopup,
  documents,
  showLoader,
  handleFetchDocuments,
}) => {
  const [tooltipOpen, setTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentInProcess, setIsPaymentInProcess] = useState(false);
  const [document, setDocument] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  // const [viewDocument, setViewDocument] = useState(false);
  // const [documentBlog, setDocumentBlog] = useState(null);
  // const [documentName, setDocumentName] = useState("");
  const [isDetailPage, setIsDetailPage] = useState(false);
  const router = useRouter();
  const [keywordSearch, setKeywordSearch] = useState(null);

  const toggleTip = (id) => {
    tooltipOpen === id ? setTooltip(false) : setTooltip(id);
  };

  useEffect(() => {
    if (authentication.loggedIn) {
      getAllCrud("get_subscription", "get_subscription");
    }
    if (documents && documents.data.length) {
      setPageCount(Math.ceil(documents.total / documents.perPage));
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

  useEffect(() => {
    let asPath = router.asPath;
    asPath = asPath.slice(1).split("/").slice(3);
    if (asPath && asPath.length) {
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
    setKeywordSearch(null);
    setPage(0);
  }, [router]);

  const handleView = async (doc) => {
    if (!authentication.loggedIn) {
      toggleLoginPopup(true);
      return false;
    }
    let viewPath = `/d/view/${router.asPath.substring(3)}`;
    const viewDoc = {
      name: doc.name,
      isEmbedded: doc.isEmbedded,
      extension: doc.extension,
      document_id: doc.document_id,
    };

    localStorage.setItem("viewDoc", JSON.stringify(viewDoc));

    const win = window.open(viewPath, "_blank");
    win.focus();

    // if (doc.isEmbedded && doc.extension == "pdf") {
    //   showLoader();
    //   await crudService
    //     ._download(`document?document_id=${doc.document_id}`)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         let base64String;
    //         let reader = new FileReader();
    //         reader.readAsDataURL(res.data);
    //         reader.onloadend = () => {
    //           base64String = reader.result;
    //           setDocumentName(doc.name);
    //           setDocumentBlog(base64String);
    //           setViewDocument(true);
    //         };
    //       }
    //     });
    // }
  };

  const handleDownload = async (doc) => {
    if (!authentication.loggedIn) {
      toggleLoginPopup(true);
      return false;
    }
    if (doc.extension == "mp4") {
      playVideo(doc.document_id);
    } else {
      return downloadDocument(doc.document_id, `${doc.name}.${doc.extension}`);
    }
  };

  const handlePurchase = async (doc) => {
    if (!authentication.loggedIn) {
      toggleLoginPopup(true);
      return false;
    }
    await crudService
      ._getAll(`checkPurchase?document_id=${doc.document_id}`)
      .then((res) => {
        const { data } = res;
        if (res.data.message == "No Document found") {
          setDocument(doc);
          setIsPaymentInProcess(true);
        } else if (res.data.type == "alert") {
          showError(res.data.message);
        } else {
          downloadDocument(doc.document_id, doc.extension);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetchDocuments({ page: page + 1 });
  }, [page]);

  useEffect(() => {
    if (keywordSearch == null) {
      return false;
    }

    const timerId = setTimeout(() => {
      handleFetchDocuments({ searchText: keywordSearch });
      // make a request after 3 second since there's no typing
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [keywordSearch]);

  if (isDetailPage) {
    return (
      <div>
        <DocumentDetails
          activeSubscription={activeSubscription}
          documentPurchase={handlePurchase}
          handleDownload={handleDownload}
          handleView={handleView}
        />
      </div>
    );
  }

  return (
    <MobileView>
      <div className="documentSearchPanel">
        <Input
          placeholder="Search this section"
          onInput={(e) => setKeywordSearch(e.target.value)}
          value={keywordSearch}
          style={{
            height: "40px",
          }}
        />
      </div>
      {documents && documents.data.length ? (
        <Fragment>
          {documents.data.map((row, key) => {
            let price = 0;
            let isFree = authentication.loggedIn ? true : false;

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
            } else {
              if (row.basic_document_special_price > 0) {
                price = row.basic_document_special_price;
              } else {
                price = row.basic_document_price;
              }
            }
            return (
              <Row
                key={key}
                style={{ marginLeft: 0, marginRight: 0 }}
                className="d-flex flex-column documentMV"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!authentication.loggedIn && price == 0) {
                    toggleLoginPopup(true);
                  } else {
                    router.push(`${router.asPath}/${row.seo_url_slug}`);
                  }
                }}
              >
                <Col
                  className="documentCardHead-mobile"
                  style={{ borderBottom: "solid 0.3px #191970" }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{
                      minHeight: "4rem",
                    }}
                  >
                    <div className="flex-grow-1">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            row.extension == "mp4"
                              ? videoIcon.src
                              : documentImg.src
                          }
                          alt=""
                          width={25}
                        />
                        <h5 style={{ marginLeft: "0.5rem", marginTop: "7px" }}>
                          {row.name}
                        </h5>
                      </div>
                    </div>
                    <div style={{ minWidth: "20px" }}>
                      <img
                        src={componentImg.src}
                        alt=""
                        className="invoiceIcon"
                        style={{ height: "17px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTip(row.id);
                        }}
                      />
                      <Tooltip
                        content={
                          <div
                            className="controlled-example"
                            style={{ fontSize: "12px" }}
                          >
                            <div className="controlled-example_header">
                              Document description
                              <button
                                type="button"
                                className="controlled-example_close-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTip(row.id);
                                }}
                              >
                                &times;
                              </button>
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: row.description,
                              }}
                            />
                          </div>
                        }
                        isOpen={tooltipOpen === row.id ? true : false}
                        tagName="span"
                        direction="down-end"
                        className="customTooltip"
                        tipContentClassName="customTooltipContent"
                        padding={20}
                        useDefaultStyles={false}
                      ></Tooltip>
                    </div>
                  </div>
                </Col>
                <Col
                  className="documentCardBody-mobile"
                  style={{ paddingTop: "5px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      minHeight: "3rem",
                    }}
                  >
                    <div>
                      {/* <h6>{price === 0 ? "Free" : `$${price}`}</h6> */}
                    </div>
                    <div>
                      <h6 style={{ color: "#272727", opacity: 0.5 }}>
                        {/* isFree || row.paymentstatus == 1
                          ? row.extension == "mp4"
                            ? "Play"
                            : "Download"
                          : row.paymentstatus == 2
                          ? row.extension == "mp4"
                            ? "Play"
                            : "Purchased"
                          : authentication.loggedIn
                          ? "Buy"
                          : price === 0
                          ? "Login"
                          : "Buy" */}
                        {isFree
                          ? row.extension == "mp4"
                            ? "View"
                            : "Access"
                          : "Subscribe"}
                      </h6>
                    </div>
                    {/* <div>
                      {isFree ||
                      row.paymentstatus == 1 ||
                      row.paymentstatus == 2 ? (
                        row.extension == "mp4" ? (
                          <div style={{ color: "#65bb65" }}>
                            <Icon size={16} icon={play} />
                          </div>
                        ) : (
                          <img
                            src={GroupImg.src}
                            alt=""
                            style={{ height: "18px", width: "18px" }}
                            onClick={() =>
                              handleDownload({
                                document_id: row.id,
                                extension: row.extension,
                                name: row.name,
                                isEmbedded: row.is_embedded,
                              })
                            }
                          />
                        )
                      ) : row.extension == "mp4" ? (
                        <div style={{ color: "#da4b00" }}>
                          <Icon size={16} icon={play} />
                        </div>
                      ) : (
                        <img
                          src={featherLock.src}
                          alt=""
                          style={{ height: "18px", width: "18px" }}
                          onClick={() =>
                            handlePurchase({
                              price,
                              isFree,
                              subscription_category: row.subscription_category,
                              url: row.url,
                              document_id: row.id,
                              document_name: row.name,
                              extension: row.extension,
                            })
                          }
                        />
                      )}
                    </div> */}
                  </div>
                </Col>
              </Row>
            );
          })}
          <div className="pagination d-flex justify-content-between align-items-center">
            <div></div>
            <div className="issuesPagination">
              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  initialPage={page}
                  forcePage={page}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={3}
                  onPageChange={({ selected }) => setPage(selected)}
                  nextLabel="Next"
                  previousLabel="Previous"
                />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        documents &&
        documents.data.length == 0 && (
          <p className="result-not-found">No Document Found</p>
        )
      )}

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
          Transaction
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
    </MobileView>
  );

  return (
    documents &&
    documents.map((row, index) => {
      let price = 0;
      let isFree = true;

      if (
        activeSubscription &&
        activeSubscription.plan_id < row.subscription_category
      ) {
        isFree = false;
        if (activeSubscription.plan_id === 1) {
          if (row.basic_document_special_price > 0) {
            price = row.basic_document_special_price;
          } else {
            price = row.basic_document_price;
          }
        } else if (activeSubscription.plan_id === 2) {
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
                  {isFree ? "Free" : `$${price}`}
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
                      <img
                        src="images/Group 417@2x.png"
                        alt=""
                        style={{ height: "18px", width: "18px" }}
                      />
                    ) : (
                      <img
                        src="images/Icon feather-lock@2x.png"
                        alt=""
                        style={{ height: "18px", width: "18px" }}
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

const mapStateToProps = ({ authentication, get_subscription, documents }) => {
  return {
    get_subscription,
    authentication,
    documents,
  };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  playVideo: crudActions._playVideo,
  downloadDocument: crudActions._download,
  toggleLoginPopup: userActions.toggleLoginPopup,
  showError: alertActions.error,
  showLoader: loaderActions.show,
};

export default connect(mapStateToProps, actionCreators)(mobileList);
