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
    <div className="visitor-credit-history-container">
      {credit_purchase_history?.data && (
        <>
          <div
            style={{
              // width: "85%",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p></p>
              <Link href={"/consultants/visitor-credits"}>
                <Button
                  style={{ padding: "10px 30px", border: "1px solid #333" }}
                >
                  Buy Credits
                </Button>
              </Link>
            </div>
            <BrowserView>
              <div>
                <Tabs>
                  <Tabs.TabPane tab={"Transaction History"} key={"1"}>
                    <div style={{ width: "100%", marginTop: "3.25rem" }}>
                      <div className="purchasePanelArea">
                        <BrowserView>
                          <div className="payment-list-page pb-5">
                            <div className="payment-list" id="userPurchaseList">
                              <div className="payment-table table-responsive">
                                <div className="PaymentTableData">
                                  <div className="row headRow">
                                    <div
                                      style={{ minWidth: "20%" }}
                                      className="col"
                                    >
                                      Transaction ID
                                    </div>
                                    <div className="col">Purchase Date</div>
                                    <div className="col">Purchased Credit</div>
                                    <div className="col">Amount Paid</div>
                                    <div className="col">Type</div>
                                    <div className="col">Payment Method</div>
                                    <div className="col">Status</div>
                                    <div className="col">Download Receipt</div>
                                  </div>

                                  {credit_purchase_history?.data?.length > 0 ? (
                                    credit_purchase_history?.data?.map(
                                      (data, key) => (
                                        <div key={key}>
                                          <div className="row dataRow">
                                            <div
                                              style={{ minWidth: "20%" }}
                                              className="col"
                                            >
                                              {data.paypal_transcation_id}
                                            </div>
                                            <div className="col">
                                              {data.purchase_date == null
                                                ? ""
                                                : moment(data.purchase_date)
                                                    .local()
                                                    .format("MM-DD-YYYY")}
                                            </div>
                                            <div className="col">
                                              $ {data.purchased_credit}
                                            </div>
                                            <div className="col">
                                              $ {data.amount_paid}
                                            </div>
                                            <div className="col">
                                              {data.type}
                                            </div>
                                            <div className="col">Paypal</div>
                                            <div className="col">
                                              {parsedData?.status}
                                            </div>
                                            <div
                                              className="col"
                                              style={{
                                                textAlign: "center",
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                downloadInvoice(
                                                  "download-invoice",
                                                  data?.invoices == null
                                                    ? alert(
                                                        "Something went wrong !"
                                                      )
                                                    : data?.invoices?.id,
                                                  "Visitor_Credit_Receipt.pdf",
                                                  "EUBOOKING_RECEIPT"
                                                )
                                              }
                                            >
                                              Download
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    <p className="result-not-found">
                                      Result not found!
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </BrowserView>
                      </div>
                    </div>
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </BrowserView>
            <MobileView>
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
            </MobileView>
          </div>
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
        </>
      )}
      <BodyBackgroundColor color={isBrowser ? "#fff" : "#F4F6F6"} />
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
