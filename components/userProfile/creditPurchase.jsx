import React, { useEffect, useState } from "react";
import BodyBackgroundColor from "../../components/style/bodyBackgroundColor";
import {
  Button,
  Container,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { crudActions } from "../../_actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Image, Rate, Space, Spin, Tabs } from "antd";
import { BrowserView, isBrowser } from "react-device-detect";
import { crudService } from "../../_services";
import Link from "next/link";
import { PayPalButton } from "react-paypal-button-v2";
import ReactPaginate from "react-paginate-next";
import moment from "moment";

const visitorCredits = ({
  visitor_credit,
  getAllCrud,
  postAPI,
  credit_purchase_history,
}) => {
  const [isPaypalOpen, setIsPaypalOpen] = useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [inputCredits, setInputCredits] = useState(0);
  useEffect(() => {
    getVisitorCredit();
  }, []);

  const getVisitorCredit = () => {
    getAllCrud("visitor_credit", "visitor_credit");
  };

  // payment functions
  const date = moment().format("YYYY-MM-DD");

  const saveSubscription = (details, data) => {
    let url = `credit_purchase`;
    let payload = {};
    let transaction = {};
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["type"] = 2;

    payload["purchased_credit"] = inputCredits;
    payload["amount_paid"] = inputCredits;
    payload["paypal_transcation_id"] = data.orderID;
    payload["purchase_date"] = date;
    payload["transaction_details"] = JSON.stringify(details);
    payload["type"] = "Online";

    crudService
      ._create(url, payload)
      .then((response) => {
        setIsPaypalOpen(false);
        setInputCredits(0);
        if (response.status === 200) {
          getVisitorCredit();
        } else {
          console.log("Something wrong...!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onSuccessOneTimePayment = (details, data) => {
    saveSubscription(details, data);
  };
  const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const cancelTransaction = (details) => {
    console.log("Cancelled", details);
  };
  const failTransaction = (details) => {
    console.log("Failed", details);
    setError(details);
  };
  // console.log("visitor_credit", visitor_credit);

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
  return (
    <>
      {/* {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size="large" style={{ padding: "65px 0" }}>
            <Spin size="large" tip="Loading..." />
          </Space>
        </div>
      ) : ( */}
      <div className="credit-purchase-component">
        {visitor_credit && (
          <>
            <div className="credit-purchase-vessel">
              <div className="purchase-case">
                <div className="credit-buy-case">
                  <h4>Credit Purchase</h4>
                  <div className="credit-detail-case">
                    <p>
                      Current Balance :
                      <span>
                        ${""}
                        {visitor_credit?.[0]?.credit
                          ? visitor_credit?.[0]?.credit
                          : 0}
                      </span>
                    </p>
                    <p>
                      {" "}
                      <span style={{ fontSize: "14px" }}>1$ = 1Credit</span>
                    </p>
                  </div>

                  <div className="payment-adv-case">
                    <div className="credit-input-case">
                      <Input
                        className="input-detail"
                        placeholder={"Enter number of credits to buy"}
                        onChange={(e) => setInputCredits(e.target.value)}
                      />
                    </div>
                    <div>
                      <Button
                        className="nxt-btn"
                        onClick={() => setIsPaypalOpen(true)}
                      >
                        Buy Credits
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              isOpen={isPaypalOpen}
              toggle={() => setIsPaypalOpen(false)}
              className=""
              backdrop="static"
              keyboard={false}
            >
              <ModalHeader
                toggle={() => setIsPaypalOpen(false)}
                style={{ backgroundColor: "#d1eaff" }}
              >
                Purchase Credit
              </ModalHeader>
              <ModalBody
                style={{
                  width: "80%",
                  margin: "50px auto",
                }}
              >
                <div>
                  <span>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={isTermChecked}
                        onChange={() => setIsTermChecked(!isTermChecked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        By accepting terms & conditions,
                        <br /> You are agree to our{" "}
                        <Link href={`/content/terms-and-conditions`} passHref>
                          <a target="_blank">Terms & Conditions</a>
                        </Link>
                      </label>
                    </div>
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "50px",
                    opacity: isTermChecked ? "1" : "0.5",
                    pointerEvents: isTermChecked ? "unset" : "none",
                  }}
                >
                  <PayPalButton
                    amount={inputCredits}
                    onSuccess={(details, data) => {
                      onSuccessOneTimePayment(details, data);
                    }}
                    options={{
                      clientId: paypalId,
                    }}
                    shippingPreference={"NO_SHIPPING"}
                    onCancel={(data) => {
                      cancelTransaction(data);
                    }}
                    catchError={(data) => {
                      failTransaction(data);
                    }}
                    onError={(data) => {
                      failTransaction(data);
                      console.log("failed tns", data);
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" onClick={() => setIsPaypalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </>
        )}
      </div>

      <div className="visitor-credit-history-case">
        {credit_purchase_history?.data && (
          <>
            <div
              style={{
                margin: "10px",
                marginTop: "50px",
              }}
            >
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p></p>
                <Link href={"/consultant/visitor-credits"}>
                  <Button className="custom-btn">Buy Credits</Button>
                </Link>
              </div> */}
              {/* <BrowserView> */}
              <div style={{ marginTop: "-20px" }}>
                <Tabs>
                  <Tabs.TabPane tab={"Transaction History"} key={"1"}>
                    <div style={{ width: "100%" }}>
                      <div className="purchasePanelArea" id="userPurchaseList">
                        {/* <BrowserView> */}
                        <div className="credit-purchase-history-case" ab>
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
                            {credit_purchase_history?.data?.length > 0 ? (
                              credit_purchase_history?.data?.map(
                                (data, key) => (
                                  <div key={key}>
                                    <div className="card credit-purchase-history-card-case">
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
                                          <h6>Transaction Id</h6>
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
                                                ? alert(
                                                    "Something went wrong !"
                                                  )
                                                : data?.invoices?.id,
                                              "Visitor_Credit_Receipt.pdf",
                                              "EUBOOKING_RECEIPT"
                                            )
                                          }
                                        >
                                          <h5>Receipt</h5>
                                          <p className="download-text">
                                            Download
                                          </p>
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
                                          <h6>Purchase Date</h6>
                                          <p>
                                            {data.purchase_date == null
                                              ? ""
                                              : moment(data.purchase_date)
                                                  .local()
                                                  .format("MM-DD-YYYY")}
                                          </p>
                                        </div>

                                        <div className="flex-content">
                                          <h6>Purchased Credit</h6>
                                          <p>$ {data.purchased_credit}</p>
                                        </div>

                                        <div className="flex-content">
                                          <h6>Amount Paid</h6>
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
                                          <h6>Payment Method</h6>
                                          <p>Paypal</p>
                                        </div>

                                        <div className="flex-content">
                                          <h6>Type</h6>
                                          <p>{data.type}</p>
                                        </div>

                                        <div className="flex-content">
                                          <h6>Payment Status</h6>
                                          <p>{parsedData?.status}</p>
                                        </div>
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
      {/* )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  const { visitor_credit, credit_purchase, credit_purchase_history } = state;
  return { visitor_credit, credit_purchase, credit_purchase_history };
};

const actionCreators = {
  getAllCrud: crudActions._getAll,
  // postAPI: crudActions._create,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(visitorCredits)
);
