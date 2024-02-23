import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Button, Col, Container, Label, Row } from "reactstrap";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Image, Rate, Tabs } from "antd";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import moment from "moment";
import Link from "next/link";
import ReactPaginate from "react-paginate-next";
import { crudService } from "../../_services";

const visitorCreditHistory = ({
  credit_purchase_history,
  getAllCrud,
  downloadInvoice,
}) => {
  const [parsedData, setParsedData] = useState();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    getAllCrud("credit_purchase_history", "credit_purchase_history", {
      page: page + 1,
      pageSize: 10,
    });
  }, [page]);

  useEffect(() => {
    if (
      credit_purchase_history &&
      credit_purchase_history.data &&
      credit_purchase_history.data.length
    ) {
      setPageCount(
        Math.ceil(
          credit_purchase_history.total / credit_purchase_history.perPage
        )
      );
    }
  }, [credit_purchase_history]);

  console.log("credit_purchase_history", credit_purchase_history);
  useEffect(() => {
    credit_purchase_history?.data?.map((data) => {
      const parseData = JSON.parse(data?.transaction_details);
      setParsedData(parseData);
    });
  }, []);
  // console.log("parsedData", parsedData);

  return (
    <div className="visitor-credit-history-case">
      {credit_purchase_history?.data && (
        <>
          <div
            style={{
              margin: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "unset",
                border: "none",
                boxShadow: "unset",
              }}
            >
              <p></p>
              <Link href={"/consultant/visitor-credits"}>
                <Button className="custom-btn">Buy Credits</Button>
              </Link>
            </div>
            {/* <BrowserView> */}
            <div style={{ marginTop: "-20px" }}>
              <Tabs>
                <Tabs.TabPane tab={"Transaction History"} key={"1"}>
                  <div style={{ width: "100%" }}>
                    <div className="purchasePanelArea" id="userPurchaseList">
                      {/* <BrowserView> */}
                      <div className="credit-purchase-history-case">
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {credit_purchase_history?.data?.length > 0 ? (
                            credit_purchase_history?.data?.map((data, key) => (
                              <div key={key}>
                                <div className="credit-purchase-history-card-case">
                                  <div className="credit-content">
                                    <div
                                      className="trn-text"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: "1",
                                        padding: "0 30px",
                                      }}
                                    >
                                      <h4>Transaction Id</h4>
                                      <p>{data.paypal_transcation_id}</p>
                                    </div>

                                    <div
                                      className="download-detail"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        downloadInvoice(
                                          "download-invoice",
                                          data?.invoices == null
                                            ? alert("Something went wrong !")
                                            : data?.invoices?.id,
                                          "Visitor_Credit_Receipt.pdf",
                                          "EUBOOKING_RECEIPT"
                                        )
                                      }
                                    >
                                      <h5>Receipt</h5>
                                      <p className="download-text">Download</p>
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-evenly",
                                      marginTop: "24px",
                                    }}
                                  >
                                    <div className="flex-content">
                                      <h5>Purchase Date</h5>
                                      <p>
                                        {data.purchase_date == null
                                          ? ""
                                          : moment(data.purchase_date)
                                              .local()
                                              .format("MM-DD-YYYY")}
                                      </p>
                                    </div>

                                    <div className="flex-content">
                                      <h5>Purchased Credit</h5>
                                      <p>$ {data.purchased_credit}</p>
                                    </div>

                                    <div className="flex-content">
                                      <h5>Amount Paid</h5>
                                      <p>$ {data.amount_paid}</p>
                                    </div>
                                  </div>

                                  <div
                                    className=""
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-evenly",
                                      marginTop: "24px",
                                    }}
                                  >
                                    <div className="flex-content">
                                      <h5>Payment Method</h5>
                                      <p>Paypal</p>
                                    </div>

                                    <div className="flex-content">
                                      <h5>Type</h5>
                                      <p>{data.type}</p>
                                    </div>

                                    <div className="flex-content">
                                      <h5>Payment Status</h5>
                                      <p>{parsedData?.status}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="result-not-found">
                              Result not found!
                            </p>
                          )}
                        </div>
                      </div>
                      {/* </BrowserView> */}
                    </div>
                  </div>
                </Tabs.TabPane>
              </Tabs>
            </div>
            {/* </BrowserView> */}
            {/* <MobileView>
                            <Container style={{ padding: "0 5px" }}>
                                {credit_purchase_history ? (
                                    credit_purchase_history.data.map((data, key) => (
                                        <Row
                                            key={key}
                                            className="d-flex flex-column py-1 TableViewMobile"
                                        >
                                            <Col className="cardHead-mobile">
                                                <div className="d-flex">
                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Transaction ID</Label>
                                                        <h6>{data.paypal_transcation_id}</h6>
                                                    </div>

                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Payment Method</Label>
                                                        <h6>Paypal</h6>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className="cardHead-mobile">
                                                <div className="d-flex">
                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Purchased Credit</Label>
                                                        <h6>$ {data.purchased_credit}</h6>
                                                    </div>

                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Amount Paid</Label>
                                                        <h6>$ {data.amount_paid}</h6>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className="cardHead-mobile">
                                                <div className="d-flex">
                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Purchased Date</Label>
                                                        <h6>
                                                            {data.purchase_date == null
                                                                ? ""
                                                                : moment(data.purchase_date)
                                                                    .local()
                                                                    .format("MM-DD-YYYY")}
                                                        </h6>
                                                    </div>

                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Type</Label>
                                                        <h6>{data.type}</h6>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col className="cardHead-mobile">
                                                <div className="d-flex">
                                                    <div className="px-2 flex-grow-1 w-50">
                                                        <Label>Status</Label>
                                                        <h6>{parsedData?.status}</h6>
                                                    </div>
                                                    <div
                                                        className="px-2 flex-grow-1 w-50"
                                                        onClick={() =>
                                                            downloadInvoice(
                                                                "download-invoice",
                                                                data?.invoices == null
                                                                    ? alert("Something went wrong !")
                                                                    : data?.invoices?.id,
                                                                "Visitor_Credit_Receipt.pdf",
                                                                "EUBOOKING_RECEIPT"
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src="images/Group 3184@2x.png"
                                                            alt=""
                                                            className="invoiceIcon"
                                                            style={{ height: "17px" }}
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))
                                ) : (
                                    <p className="result-not-found">Result not found!</p>
                                )}
                            </Container>
                        </MobileView> */}
          </div>
          {credit_purchase_history?.data.length > 0 && (
            <div
              style={{ marginTop: "40px" }}
              className="pagination d-flex justify-content-between align-items-center"
            >
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
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { credit_purchase_history } = state;
  return { credit_purchase_history };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  downloadInvoice: crudActions._downloadWithPost,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(visitorCreditHistory)
);
