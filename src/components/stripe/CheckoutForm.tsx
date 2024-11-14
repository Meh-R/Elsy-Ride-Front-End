import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  total: number;
  onPaymentSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  total,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}payments/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total * 100, currency: "usd" }),
        }
      );

      const { client_secret: clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred during payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <Button type="submit" className="mt-4 bg-green-500 text-white">
        Pay {total} $
      </Button>
    </form>
  );
};

export default CheckoutForm;
