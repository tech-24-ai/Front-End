import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import { Button, Col, Container, Label, Row } from "reactstrap";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Tabs } from "antd";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import ReactPaginate from "react-paginate-next";

const CreditRedeemHistory = ({ credit_redeem_history, getAllCrud }) => {
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
    <div className="visitor-credit-history-case">
      {credit_redeem_history?.data && (
        <>
          <div
            style={{
              margin: "20px",
            }}
          >
            {/* <BrowserView> */}
            <div>
              <Tabs>
                <Tabs.TabPane tab={"Credit Redeem History"} key={"1"}>
                  <div style={{ width: "100%" }}>
                    <div className="purchasePanelArea">
                      {/* <BrowserView> */}
                      <div className="payment-list" id="userPurchaseList">
                        <div className="credit-purchase-history-case">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: "unset",
                              border: "none",
                              boxShadow: "unset",
                            }}
                            className="card"
                          >
                            {credit_redeem_history?.data?.length > 0 ? (
                              credit_redeem_history?.data?.map((data, key) => (
                                <div key={key}>
                                  <div className="card credit-purchase-history-card-case">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        marginTop: "24px",
                                      }}
                                    >
                                      <div className="flex-content">
                                        <h6>Initial Credit Balance</h6>
                                        <p>$ {data.initial_credit_balance}</p>
                                      </div>

                                      <div className="flex-content">
                                        <h6>Current Credit Balance</h6>
                                        <p>$ {data.current_credit_balance}</p>
                                      </div>

                                      <div className="flex-content">
                                        <h6>Credit Used</h6>
                                        <p>$ {data.credit_used}</p>
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
                                        <h6>Credit Returned</h6>
                                        <p>$ {data.credit_returned}</p>
                                      </div>

                                      <div className="flex-content">
                                        <h6>Credit Booked</h6>
                                        <p>$ {data.credit_booked}</p>
                                      </div>

                                      <div className="flex-content">
                                        <h6>Type</h6>
                                        <p>{data.type}</p>
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
                        </MobileView> */}
          </div>
          {credit_redeem_history?.data.length > 0 && (
            <div
              style={{ margin: "40px 0px" }}
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
  const { credit_redeem_history } = state;
  return { credit_redeem_history };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  downloadInvoice: crudActions._downloadWithPost,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(CreditRedeemHistory)
);
