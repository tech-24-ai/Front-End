import React, { useEffect, useState } from "react";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
} from "reactstrap";

import { Input } from "antd";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { alertActions, crudActions, loaderActions } from "../_actions";
import { PayPalButton } from "react-paypal-button-v2";
import moment from "moment";
import Link from "next/link";
import { crudService } from "../_services";
import ConnectRadioBox from "../components/form/connectRadio";
import myImageLoader from "../components/imageLoader";
import donationIcon from "../public/new_images/donationIcon.svg";
import Image from "next/image";

function donations({ getAllCrud, showLoader, hideLoader, success }) {
  const [inputValue, setInputValue] = useState({
    id: 100,
    name: "$100",
  });
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [isPaypalOpen, setIsPaypalOpen] = useState(false);

  const date = moment().format("YYYY-MM-DD");

  const makePayment = (details, data) => {
    showLoader();
    let url = `donations`;
    let payload = {};
    let transaction = {};
    transaction["transaction_status"] = details.status || "COMPLETED";
    //   (payload["paypal_transaction_id"] = data.orderID),
    (payload["donation_amount"] = inputValue.id),
      (payload["payment_date"] = date),
      (payload["transaction_details"] = JSON.stringify(details)),
      (payload["remark"] = "No"),
      crudService
        ._create(url, payload)
        .then((response) => {
          setIsPaypalOpen(false);
          if (response.status === 200) {
            hideLoader();
            success("Thanks for donating");
          } else {
            console.log("Something wrong...!");
          }
        })
        .catch((error) => console.log("error", error));
  };
  const onSuccessOneTimeCreditPayment = (details, data) => {
    makePayment(details, data);
  };
  const paypalId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const cancelCreditTransaction = (details) => {
    console.log("Cancelled", details);
  };
  const failCreditTransaction = (details) => {
    console.log("Failed", details);
  };

  const onChange = (value) => {
    setInputValue(value);
  };
  console.log("input", inputValue);
  return (
    <section className="donations-page pricing-advisor-section">
      <div className="page-heading">
        <p className="title">Donation</p>
        <Image
          loader={myImageLoader}
          src={donationIcon}
          alt=""
          layout="raw"
          width={35}
          height={35}
          style={{ objectFit: "contain" }}
        />
      </div>
      <Container>
        <div className="donation-radio-container">
          <ConnectRadioBox
            options={[
              {
                id: 10,
                name: "$10",
              },
              {
                id: 20,
                name: "$20",
              },
              {
                id: 50,
                name: "$50",
              },
              {
                id: 100,
                name: "$100",
              },
            ]}
            defaultChecked={inputValue.id}
            value={inputValue.id}
            onChange={onChange}
          />
          <FormGroup>
            <Input
              // type="number"
              className="input"
              placeholder="Others"
              value={inputValue.id}
              onChange={(e) =>
                setInputValue({
                  id: e.target.value,
                  name: `$${e.target.value}`,
                })
              }
            />
          </FormGroup>
          <p
            className="custom-btn with-bg"
            onClick={() => setIsPaypalOpen(true)}
          >
            Donate
          </p>
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
            Thanks for Donating
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
                amount={inputValue.id}
                onSuccess={(details, data) => {
                  onSuccessOneTimeCreditPayment(details, data);
                }}
                options={{
                  clientId: paypalId,
                }}
                shippingPreference={"NO_SHIPPING"}
                onCancel={(data) => {
                  cancelCreditTransaction(data);
                }}
                catchError={(data) => {
                  failCreditTransaction(data);
                }}
                onError={(data) => {
                  failCreditTransaction(data);
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
      </Container>
    </section>
  );
}

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};
const actionCreators = {
  getAllCrud: crudActions._getAll,
  showLoader: loaderActions.show,
  hideLoader: loaderActions.hide,
  success: alertActions.success,
};

export default withRouter(connect(mapStateToProps, actionCreators)(donations));
