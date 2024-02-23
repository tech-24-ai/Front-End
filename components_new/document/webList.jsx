import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";
import {
  crudActions,
  userActions,
  alertActions,
  loaderActions,
} from "../../_actions";
import { crudService } from "../../_services";
import { download } from "react-icons-kit/feather";
import PurchaseDocument from "../subscription/PurchaseDocument";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroupItemHeading,
} from "reactstrap";
import { alignLeft, play } from "react-icons-kit/feather";
import { Icon } from "react-icons-kit";
import documentImg from "../../public/images/document.png";
import featherLock from "../../public/images/Icon feather-lock@2x.png";
import videoIcon from "../../public/images/start-512.png";
import GroupImg from "../../public/images/Group 417@2x.png";
import ReactPaginate from "react-paginate-next";

import DocumentDetails from "./documentDetails";
import { Input } from "antd";

const WebList = ({
  getAllCrud,
  playVideo,
  showError,
  downloadDocument,
  get_subscription,
  documents,
  authentication,
  toggleLoginPopup,
  showLoader,
  handleFetchDocuments,
}) => {
  const [isPaymentInProcess, setIsPaymentInProcess] = useState(false);
  const [document, setDocument] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const [isDetailPage, setIsDetailPage] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState(null);

  useEffect(() => {
    if (authentication.loggedIn) {
      getAllCrud("get_subscription", "get_subscription");
    }
  }, []);

  useEffect(() => {
    if (documents && documents.data && documents.data.length) {
      setPageCount(Math.ceil(documents.total / documents.perPage));
    }
  }, [documents]);

  useEffect(() => {
    get_subscription &&
      get_subscription.length &&
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

  const documentPurchase = async (doc) => {
    if (!authentication.loggedIn) {
      toggleLoginPopup(true);
      return false;
    }
    crudService
      ._getAll(`checkPurchase?document_id=${doc.document_id}`)
      .then((res) => {
        const { data } = res;
        if (res.data.message == "No Document found") {
          setDocument(doc);
          setIsPaymentInProcess(true);
        } else if (res.data.type == "alert") {
          showError(res.data.message);
        } else {
          downloadDocument(
            doc.document_id,
            `${doc.document_name}.${doc.extension}`
          );
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
          documentPurchase={documentPurchase}
          handleDownload={handleDownload}
          handleView={handleView}
        />

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
  }
  return (
    <div className="itmap-datatable">
      {/* <BootstrapTable keyField="id" data={documents} columns={columnData} /> */}
      <div className="react-bootstrap-table">
        {/* previous code start here */}

        {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th tabIndex={0}>Name</th>
              <th tabIndex={0} className="text-center">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {documents &&
              documents.map((row, key) => {
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
                  <tr key={key}>
                    <td width="75%">{row.name}</td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "120px",
                      }}
                    >
                      <div>{isFree ? "Free" : `$${price}`}</div>
                      <div className="links" style={{ cursor: "pointer" }}>
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
                            <img
                              src="/public/images/Group 417@2x.png"
                              alt=""
                              style={{ height: "18px", width: "18px" }}
                            />
                          ) : (
                            <img
                              src="/public/images/Icon feather-lock@2x.png"
                              alt=""
                              style={{ height: "18px", width: "18px" }}
                            />
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}

        {/* previous code end's here */}

        {/* my code start here */}
        <div className="documentSearchPanel">
          <Input
            placeholder="Search this section"
            onInput={(e) => setKeywordSearch(e.target.value)}
            value={keywordSearch}
            style={{
              width: "25%",
              height: "40px",
            }}
          />
        </div>

        {documents && documents.data && documents.data.length ? (
          <Fragment>
            <table className="table table-bordered document-table">
              <thead>
                <tr
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <th
                    style={{ border: "none", marginLeft: "43px" }}
                    tabIndex={0}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "none",
                      marginLeft: "-135px",
                    }}
                    tabIndex={0}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      border: "none",
                      marginRight: "115px",
                    }}
                    tabIndex={0}
                  >
                    {/* Price */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents &&
                  documents.data &&
                  documents.data
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      let price = 0;
                      let isFree = authentication.loggedIn ? true : false;
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
                        } else if (
                          activeSubscription.plans.plan_category == 2
                        ) {
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
                        <tr
                          key={key}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!authentication.loggedIn && price == 0) {
                              toggleLoginPopup(true);
                            } else {
                              router.push(
                                `${router.asPath}/${row.seo_url_slug}`
                              );
                            }
                          }}
                        >
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "270px",
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
                            <div style={{ marginLeft: "1rem" }}>{row.name}</div>
                          </td>
                          <td
                            id="description"
                            dangerouslySetInnerHTML={{
                              __html: row.description,
                            }}
                          ></td>
                          <td
                            id="price"
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              marginRight: "-0.6rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                fontWeight: price === 0 ? "500" : "600",
                                minWidth: "7rem",
                                paddingRight: "1rem",
                              }}
                            >
                              {/* price === 0 ? "Free" : `$${price}` */}
                            </div>
                            {/* <hr /> */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minWidth: "7rem",
                                cursor: "pointer",
                                color: "#0060d0",
                                fontWeight: "600",
                              }}
                            >
                              <div
                                // style={{
                                //   background: "none",
                                //   color:
                                //     isFree || row.paymentstatus == 1
                                //       ? "orange"
                                //       : // row.extension == "mp4"
                                //       //   ? "#0060d0"
                                //       //   : "orange"
                                //       row.paymentstatus == 2
                                //       ? "#009243"
                                //       : "#0060d0",
                                //   fontWeight: "600",
                                //   opacity: 0.65,
                                // }}
                                style={{
                                  background: "none",
                                  color: isFree ? "#009243" : "#0060d0",
                                  fontWeight: "600",
                                  opacity: 0.65,
                                }}
                              >
                                {/* isFree || row.paymentstatus == 1
                                  ? row.extension == "mp4"
                                    ? "Play"
                                    : "Download"
                                  : row.paymentstatus == 2
                                  ? row.extension == "mp4"
                                    ? "Play"
                                    : "Subscribed"
                                  : authentication.loggedIn
                                  ? "Subscribe"
                                  : price === 0
                                  ? "Login"
                                  : "Subscribe" */}
                                {isFree
                                  ? row.extension == "mp4"
                                    ? "View"
                                    : "Access"
                                  : "Subscribe"}
                              </div>
                            </div>
                            {/* <hr />
                        <div
                          className="links"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            disabled={
                              isFree ||
                              row.paymentstatus == 1 ||
                              row.paymentstatus == 2
                                ? false
                                : true
                            }
                            style={{
                              background: "none",
                              color:
                                isFree ||
                                row.paymentstatus == 1 ||
                                row.paymentstatus == 2
                                  ? "#009243"
                                  : "#7b736b",
                              fontWeight:
                                isFree ||
                                row.paymentstatus == 1 ||
                                row.paymentstatus == 2
                                  ? "600"
                                  : "normal",
                              margin: "0px 1rem",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload({
                                document_id: row.id,
                                extension: row.extension,
                                name: row.name,
                                isEmbedded: row.is_embedded,
                              });
                            }}
                          >
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
                              />
                            )}
                          </Button>
                        </div> */}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            <div className="pagination d-flex justify-content-between align-items-center">
              <div></div>
              <div className="issuesPagination">
                <div style={{ marginRight: "1.5rem" }}>
                  <ReactPaginate
                    pageCount={pageCount}
                    initialPage={page}
                    forcePage={page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
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
          documents.data &&
          documents.data.length == 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "3rem",
                fontSize: "18px",
                fontWeight: "500",
                color: "lightgray",
                userSelect: "none",
              }}
            >
              No Document Found
            </div>
          )
        )}
        {/* my code end here */}
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const { authentication, get_subscription, documents } = state;
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

export default connect(mapStateToProps, actionCreators)(WebList);
