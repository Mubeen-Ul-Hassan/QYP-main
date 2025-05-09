/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

const PaymentCheckCheckout = ({
  email,
  isTrigger,
  setIsLoading,
  setDisable,
  redirectURL = "/purchase-complete",
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [messageData, setMessageData] = useState(null);
  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          toast.success("Payment succeeded!");
          break;
        case "processing":
          toast.info("Your payment is processing.");
          break;
        case "requires_payment_method":
          toast.warning("Payment was not successful, please try again.");
          break;
        default:
          toast.error("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  useEffect(() => {
    if (elements) {
      const paymentElement = elements.getElement(PaymentElement);
      if (paymentElement) {
        paymentElement.on("change", (event) => {
          const isValid = !event.empty && event.complete;
          setDisable && setDisable(!isValid); // Enabling/disabling the submit button
        });
      }
    }
  }, [elements, setDisable]);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + redirectURL,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: {
      type: "tabs",
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: true,
    },
    wallets: {
      googlePay: "auto",
    },
    terms: {
      googlePay: "auto",
    },
  };
  useEffect(() => {
    if (isTrigger) {
      handleSubmit();
    }
  }, [isTrigger]);
  return (
    <>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {messageData && <div id="payment-message">{messageData}</div>}
    </>
  );
};

export default PaymentCheckCheckout;
