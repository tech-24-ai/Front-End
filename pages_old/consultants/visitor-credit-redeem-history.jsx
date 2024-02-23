import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Button, Col, Container, Label, Row } from "reactstrap";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Tabs } from "antd";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import ReactPaginate from "react-paginate-next";

const visitorCreditHistory = ({ credit_redeem_history, getAllCrud }) => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    getAllCrud("credit_redeem_history", "credit_redeem_history", {
      page: page + 1,
      pageSize: 10,
      type: "debit",
    });
  }, [page]);

  useEffect(() => {
    if (
      credit_redeem_history &&
      credit_redeem_history.data &&
      credit_redeem_history.data.length
    ) {
      setPageCount(
        Math.ceil(credit_redeem_history.total / credit_redeem_history.perPage)
      );
    }
  }, [credit_redeem_history]);

  console.log("credit_redeem_history", credit_redeem_history);

  return (
    <div className="visitor-credit-history-container">
      {credit_redeem_history?.data && (
        <>
          <div
            style={{
              margin: "20px",
            }}
          >
            <BrowserView>
              <div>
                <Tabs>
                  <Tabs.TabPane tab={"Credit Redeem History"} key={"1"}>
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
                                      Initial Credit Balance
                                    </div>
                                    <div className="col">
                                      Current Credit Balance
                                    </div>
                                    <div className="col">Credit Used</div>
                                    <div className="col">Credit Returned</div>
                                    <div className="col">Credit Booked</div>
                                    <div className="col">Type</div>
                                    {/* <div className="col">Status</div> */}
                                    {/* <div className="col">Download Receipt</div> */}
                                  </div>

                                  {credit_redeem_history?.data?.length > 0 ? (
                                    credit_redeem_history?.data?.map(
                                      (data, key) => (
                                        <div key={key}>
                                          <div className="row dataRow">
                                            <div
                                              style={{ minWidth: "20%" }}
                                              className="col"
                                            >
                                              $ {data.initial_credit_balance}
                                            </div>
                                            <div className="col">
                                              $ {data.current_credit_balance}
                                            </div>
                                            <div className="col">
                                              $ {data.credit_used}
                                            </div>
                                            <div className="col">
                                              $ {data.credit_returned}
                                            </div>
                                            <div className="col">
                                              $ {data.credit_booked}
                                            </div>
                                            <div className="col">
                                              {data.type}
                                            </div>

                                            {/* <div
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
                                            </div> */}
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
                {credit_redeem_history ? (
                  credit_redeem_history.data.map((data, key) => (
                    <Row
                      key={key}
                      className="d-flex flex-column py-1 TableViewMobile"
                    >
                      <Col className="cardHead-mobile">
                        <div className="d-flex">
                          <div className="px-2 flex-grow-1 w-50">
                            <Label>Current Credit Balance</Label>
                            <h6>$ {data.initial_credit_balance}</h6>
                          </div>

                          <div className="px-2 flex-grow-1 w-50">
                            <Label>Current Credit Balance</Label>
                            <h6>$ {data.current_credit_balance}</h6>
                          </div>
                        </div>
                      </Col>
                      <Col className="cardHead-mobile">
                        <div className="d-flex">
                          <div className="px-2 flex-grow-1 w-50">
                            <Label>Credit Used</Label>
                            <h6>$ {data.credit_used}</h6>
                          </div>

                          <div className="px-2 flex-grow-1 w-50">
                            <Label>Credit Returned</Label>
                            <h6>$ {data.credit_returned}</h6>
                          </div>
                        </div>
                      </Col>
                      <Col className="cardHead-mobile">
                        <div className="d-flex">
                          <div className="px-2 flex-grow-1 w-50">
                            <Label>Credit Booked</Label>
                            <h6>$ {data.credit_booked}</h6>
                          </div>

                          <div className="px-2 flex-grow-1 w-50">
                            <Label>Type</Label>
                            <h6>{data.type}</h6>
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
  const { credit_redeem_history } = state;
  return { credit_redeem_history };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  downloadInvoice: crudActions._downloadWithPost,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(visitorCreditHistory)
);
