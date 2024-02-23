import React, { useState, useEffect, Fragment } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";
import Router from "next/router";
import { connect } from "react-redux";
import { crudService } from "../../_services";
import { crudActions } from "../../_actions";
import Link from "next/link";
import { Spin, Space } from "antd";

const PurchaseDocument = ({
  document,
  user,
  setIsPaymentInProcess,
  downloadDocument,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const saveSubscription = (details, data) => {
    let url = `addpurchase`;
    let payload = {};
    let transaction = {};
    setIsLoading(true);

    payload["document_id"] = document.document_id;
    payload["purchase_date"] = moment().format("YYYY-MM-DD");
    payload["document_price"] = document.price;
    payload["type"] = 2;
    payload["is_active"] = true;

    transaction["payment_transcation_id"] = data.orderID;
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["transcation_amount"] = document.price;

    transaction["transcation_date"] = moment().format("YYYY-MM-DD");
    transaction["type"] = 2;
    transaction["transcation_details"] = JSON.stringify(details);

    payload["transaction"] = JSON.stringify(transaction);

    crudService
      ._create(url, payload)
      .then((response) => {
        if (response.status === 200) {
          let paymentReceipt = {};

          paymentReceipt["amount"] = document.price;
          paymentReceipt["paymentMethod"] = "Paypal";
          paymentReceipt["isSuccessful"] = true;
          paymentReceipt["orderId"] = data.orderID;
          paymentReceipt["planName"] = document.document_name;
          paymentReceipt["date"] = moment().format("YYYY-MM-DD hh:mm:ss");
          paymentReceipt["documentId"] = document.document_id;
          paymentReceipt["receiptId"] = response.data.result.invoice.id;
          paymentReceipt["extension"] = document.extension;
          paymentReceipt["type"] = "Purchase";

          localStorage.setItem(
            "paymentReceipt",
            JSON.stringify(paymentReceipt)
          );
          downloadDocument(
            document.document_id,
            `${document.document_name}.${document.extension}`
          );
          setIsPaymentInProcess(false);
          Router.push(`/PaymentReceipt`);
        } else {
          console.log("Something wrong...!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  console.log("paypalId", paypalId);

  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const addPaypalScript = () => {
      const script = React.createElement("script", {
        type: "text/javascript",
        src: `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true`,
        async: true,
      });
      // const script = document.createElement("script")
      // // script.type = "text/javascript";
      // script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true`;
      // script.async = true;
      // script.onload = () => setScriptLoaded(true);
      // document.body.append(script);
    };
    // addPaypalScript();
  }, []);

  const onSuccessOneTimePayment = (details, data) => {
    saveSubscription(details, data);
  };

  const cancelTransaction = (details) => {
    console.log("Cancelled", details);
    // crudService
    //   ._create("addtransaction", {
    //     payment_transaction_id: details.orderID,
    //     status: "CANCELLED",
    //     transaction_amount: planPrice,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const failTransaction = (details) => {
    console.log("Failed", details);
    setError(details);
    // crudService
    //   ._create("addtransaction", {
    //     payment_transaction_id: details.orderID,
    //     status: "FAILED",
    //     transaction_amount: planPrice,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <Fragment>
      {isLoading ? (
        <Space size="large" style={{ padding: "65px 0" }}>
          <Spin size="large" tip="Loading..." />
        </Space>
      ) : (
        <div>
          <div>
            <p style={{ marginTop: "20px" }}>
              <span>
                <b> Document Name: </b>
              </span>
              <span>{document.document_name}</span>
            </p>
            <div>
              <span>
                <b id="price"> Price: </b>
              </span>
              <span>${document.price}</span>
            </div>
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
                    By clicking on the checkbox, you agree to our{" "}
                    <Link
                      href="/content/[slug]"
                      as={`/content/terms-and-conditions`}
                      passHref
                    >
                      <a target="_blank">Terms & Conditions</a>
                    </Link>
                  </label>
                </div>
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: "50px",
              pointerEvents: !isTermChecked && "none",
              opacity: !isTermChecked && "0.5",
            }}
          >
            {document && !error ? (
              <PayPalButton
                amount={document.price}
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
                }}
              />
            ) : (
              <div
                style={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
              >
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const actionCreators = {
  downloadDocument: crudActions._download,
};

export default connect(mapStateToProps, actionCreators)(PurchaseDocument);
