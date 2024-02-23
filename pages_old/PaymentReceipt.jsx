import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { crudActions } from "../_actions";

const PaymentReceipt = (props) => {
  const [receiptData, setReceiptData] = useState({});
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  useEffect(() => {
    let receiptData = localStorage.getItem("paymentReceipt");
    if (receiptData) {
      setReceiptData(JSON.parse(receiptData));
    }
  }, []);

  useEffect(() => {
    const addHTMLToPDFScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js`;

      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };
    addHTMLToPDFScript();
  }, []);

  const downloadInvoice = () => {
    const invoice = document.getElementById("paymentreceipt");
    var opt = {
      margin: 10,
      filename: "payment-receipt.pdf",
      pagebreak: { mode: "avoid-all", after: ".avoidThisRow" },
      html2canvas: { scale: 2 },
    };
    window.html2pdf(invoice, opt);
  };

  return (
    <section>
      <BrowserView>
        <Container className="receipt-container d-flex flex-column justify-content-center align-items-center">
          <div className="receipt-details p-3" id="paymentreceipt">
            <h1>Transaction Successful!</h1>
            <hr />

            <p>
              <b>
                <span>Amount: </span>
              </b>
              <span>
                {receiptData && receiptData.amount
                  ? "$" + receiptData.amount
                  : ""}
              </span>
            </p>
            <p>
              <b>
                <span>Payment Method: </span>
              </b>
              <span>
                {receiptData && receiptData.paymentMethod
                  ? receiptData.paymentMethod
                  : ""}
              </span>
            </p>
            <p>
              <b>
                <span>Order ID: </span>
              </b>
              <span>
                {receiptData && receiptData.orderId ? receiptData.orderId : ""}
              </span>
            </p>
            <p>
              <b>
                <span>{(receiptData.type==="Purchase")?"Document: ":"Plan:"} </span>
              </b>
              <span>
                {receiptData && receiptData.planName
                  ? receiptData.planName
                  : ""}
              </span>
            </p>
            {/* <p>
              <b>
                <span>Approval Status: </span>
              </b>
              <span>{receiptData.status}</span>
            </p> */}
            <p>
              <b>
                <span>Date: </span>
              </b>
              <span>
                {receiptData && receiptData.date ? receiptData.date : ""}
              </span>
            </p>
          </div>

          <div className="receipt-download-button">
            <button
              type="button"
              className="btn btn-info"
              onClick={() =>
                props.downloadInvoice(
                  "download-invoice",
                  receiptData.receiptId,
                  "Purchase_Receipt.pdf"
                )
              }
            >
              Download Receipt
            </button>
            {receiptData.type === "Purchase" && (
              <button
                type="button"
                className="btn btn-info ml-5"
                onClick={() =>
                  props.downloadDocument(
                    receiptData.documentId,
                    `${receiptData.planName}.${receiptData.extension}`
                  )
                }
              >
                Download Document
              </button>
            )}
          </div>
        </Container>
      </BrowserView>

      <MobileView>
        <Container className="receipt-container d-flex flex-column justify-content-center align-items-center mt-2">
          <div className="receipt-details p-3" id="paymentreceipt">
            <h4>
              <b>Transaction Successful!</b>
            </h4>
            <hr />

            <p>
              <b>
                <span>Amount: </span>
              </b>
              <span>
                {receiptData && receiptData.amount
                  ? "$" + receiptData.amount
                  : ""}
              </span>
            </p>
            <p>
              <b>
                <span>Payment Method: </span>
              </b>
              <span>
                {receiptData && receiptData.paymentMethod
                  ? receiptData.paymentMethod
                  : ""}
              </span>
            </p>
            <p>
              <b>
                <span>Order ID: </span>
              </b>
              <span>
                {receiptData && receiptData.orderId ? receiptData.orderId : ""}
              </span>
            </p>
            <p>
              <b>
                <span>{(receiptData.type==="Purchase")?"Document: ":"Plan:"} </span>
              </b>
              <span>
                {receiptData && receiptData.planName
                  ? receiptData.planName
                  : ""}
              </span>
            </p>
            {/* <p>
              <b>
                <span>Approval Status: </span>
              </b>
              <span>{receiptData.status}</span>
            </p> */}
            <p>
              <b>
                <span>Date: </span>
              </b>
              <span>
                {receiptData && receiptData.date ? receiptData.date : ""}
              </span>
            </p>
          </div>

          <div className="receipt-download-button" style={{display:'flex',flexDirection:'column'}}>
            <button
              type="button"
              className="btn btn-info"
              onClick={() =>
                props.downloadInvoice("download-invoice", receiptData.receiptId, "Purchase_Receipt.pdf")
              }
            >
              Download Receipt
            </button>
            {receiptData.type === "Purchase" && (
              <button
                type="button"
                className="btn btn-info mt-3"
                onClick={() =>
                  props.downloadDocument(
                    receiptData.documentId,
                    `${receiptData.planName}.${receiptData.extension}`
                  )
                }
              >
                Download Document
              </button>
            )}
            
          </div>
        </Container>
      </MobileView>
      <BodyBackgroundColor color="#F4F6F6" />
    </section>
  );
};

const actionCreators = {
  downloadInvoice: crudActions._downloadWithPost,
  downloadDocument: crudActions._download,
};

export default connect(null, actionCreators)(PaymentReceipt);
