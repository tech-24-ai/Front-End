import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { crudActions } from "../../_actions";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { BrowserView, MobileView } from "react-device-detect";
import Tooltip from "react-tooltip-lite";
import { Tabs } from "antd";
import { withRouter } from "next/router";
import Link from "next/link";
import ReactPaginate from "react-paginate-next";

const DonationHistory = ({ getAllCrud, donations }) => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getAllCrud("donations", "donations", {
      page: page + 1,
      pageSize: 10,
      type: "debit",
    });
  }, [page]);

  // useEffect(() => {
  //   getAllCrud("donations", "donations");
  // }, []);

  useEffect(() => {
    if (donations && donations.data && donations.data.length) {
      setPageCount(Math.ceil(donations.total / donations.perPage));
    }
  }, [donations]);
  return (
    <div className="visitor-credit-history-case donation-history">
      {donations && (
        <>
          <div
            style={{
              margin: "20px",
            }}
          >
            <div>
              <br />
              <Link href={"/donations"}>
                <p className="custom-btn with-bg">
                  Donate to Keep Research Free!
                </p>
              </Link>
              <Tabs>
                <Tabs.TabPane tab={"Donation History"} key={"1"}>
                  <div style={{ width: "100%" }}>
                    <div className="purchasePanelArea">
                      <div className="payment-list" id="userPurchaseList">
                        <div className="credit-purchase-history-case">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: "unset",
                              border: "none",
                              boxShadow: "unset",
                              marginBottom: "50px",
                            }}
                            className="card"
                          >
                            {donations?.data?.length > 0 ? (
                              donations?.data?.map((data, key) => {
                                const transaction_details = JSON.parse(
                                  data?.transaction_details
                                );

                                return (
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
                                        <div className="flex-content w-50">
                                          <h6>Amount</h6>
                                          <p>${data.donation_amount}</p>
                                        </div>

                                        <div className="flex-content w-50">
                                          <h6>Date</h6>
                                          <p>{data.payment_date}</p>
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
                                        <div className="flex-content w-50">
                                          <h6>Transaction id</h6>
                                          <p>{transaction_details.id}</p>
                                        </div>
                                        <div className="flex-content w-50">
                                          <h6>Status</h6>
                                          <p>{transaction_details.status}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
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
          </div>
        </>
      )}

      {donations?.data?.length > 0 && (
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
    </div>
  );
};

const mapStateToProps = (state) => {
  const { donations } = state;
  return { donations };
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(DonationHistory)
);
