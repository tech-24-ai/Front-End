import React, { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";
import Router from "next/router";
import { crudService } from "../../_services";
import { configs } from "../../_constants";
import Link from "next/link";

const PaypalSubscription = (props) => {
  const [plan, setPlan] = useState(props.plan);
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [planPrice, setPlanPrice] = useState(0);
  const userData = props.user.data.data;
  React.useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&vault=true`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };
    addPaypalScript();
  }, []);
  useEffect(() => {
    if (plan && plan.current_price_or_special_price > 0) {
      setPlanPrice(plan.current_price_or_special_price);
    } else {
      setPlanPrice(plan.plan_price);
    }
  }, [plan]);

  const saveSubscription = (details, data) => {
    console.log("Details:", details);
    console.log("Data:", data);
    let url = `addsubscription`;
    let payload = {};
    let transaction = {};

    payload["plan_id"] = plan.id;
    payload["user_id"] = userData.id;
    payload["is_active"] = true;

    if (plan.plan_duration == "Monthly") {
      let startDate = moment();
      let endDate = moment(startDate).add(1, "M");
      payload["subscription_start_date"] = startDate.format("YYYY-MM-DD");
      payload["subscription_end_date"] = endDate.format("YYYY-MM-DD");
    } else {
      let startDate = moment();
      let endDate = moment(startDate).add(1, "y");
      payload["subscription_start_date"] = startDate.format("YYYY-MM-DD");
      payload["subscription_end_date"] = endDate.format("YYYY-MM-DD");
    }

    transaction["payment_transcation_id"] = data.orderID;
    transaction["transcation_status"] = details.status || "COMPLETED";
    transaction["transcation_amount"] = planPrice;

    transaction["transcation_date"] = moment().format("YYYY-MM-DD");
    transaction["type"] = 1;
    transaction["transcation_details"] = JSON.stringify(details);

    payload["transaction"] = JSON.stringify(transaction);

    crudService
      ._create(url, payload)
      .then((response) => {
        if (response.status === 200) {
          let paymentReceipt = {};

          paymentReceipt["amount"] = planPrice;
          paymentReceipt["paymentMethod"] = "Paypal";
          paymentReceipt["isSuccessful"] = true;
          paymentReceipt["orderId"] = data.orderID;
          paymentReceipt["planName"] = plan ? plan.plan_name : "";
          paymentReceipt["date"] = moment().format("YYYY-MM-DD hh:mm:ss");
          paymentReceipt["documentId"] = 0;
          paymentReceipt["receiptId"] = response.data.invoice.id;
          paymentReceipt["extension"] = "pdf";
          paymentReceipt["type"] = "Subscription";
          paymentReceipt["status"] = "Pending";

          localStorage.setItem(
            "paymentReceipt",
            JSON.stringify(paymentReceipt)
          );
          Router.push(`/PaymentReceipt`);

          props.setIsPaymentInProcess(false);
        } else {
          console.log("Something wrong...~!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onSuccessOneTimePayment = (details, data) => {
    saveSubscription(details, data);
  };

  const onSuccessSubscriptionPayment = (details, data) => {
    saveSubscription(details, data);
  };

  const cancelTransaction = (details) => {
    crudService
      ._create("addtransaction", {
        payment_transaction_id: details.orderID,
        status: "CANCELLED",
        transaction_amount: planPrice,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const failTransaction = (details) => {
    crudService
      ._create("addtransaction", {
        payment_transaction_id: details.orderID,
        status: "FAILED",
        transaction_amount: planPrice,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <p style={{ marginTop: "20px" }}>
          <span>
            <b> Plan Name: </b>
          </span>
          <span>{plan.plan_name}</span>
        </p>
        <div>
          <span>
            <b> Plan Price: </b>
          </span>
          <span>
            $ {planPrice} / {plan.plan_duration}
          </span>
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
              <label className="form-check-label" htmlFor="flexCheckChecked">
                By accepting terms & conditions,
                <br /> You are agree to our{" "}
                <Link
                  href="/content/[slug]"
                  as={`/content/terms-and-conditions`}
                  target="_blank"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>
          </span>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        {plan && plan.plan_duration === "Monthly" ? (
          <PayPalButton
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: plan.paypal_plan_id,
              });
            }}
            onApprove={(data, actions) => {
              return actions.subscription.get().then(function (details) {
                onSuccessSubscriptionPayment(details, data);
              });
            }}
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
          <PayPalButton
            amount={planPrice}
            onSuccess={(details, data) => {
              onSuccessOneTimePayment(details, data);
            }}
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
        )}
      </div>
    </div>
  );
};

export default PaypalSubscription;
