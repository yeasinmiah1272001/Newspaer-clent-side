import { Button, Spinner } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useAdmin } from "../../hooks/api";

const ChackOutForm = () => {
  const { refetch } = useAdmin();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxiosPublic();

  useEffect(() => {
    const getSubscription = localStorage.getItem("subscribe");
    setData(JSON.parse(getSubscription));
    const [date, price] = JSON.parse(getSubscription);
    if (price) {
      const pay = async () => {
        const res = await axios.post("/create-paymentIntent", {
          price: price,
        });
        setClientSecret(res.data.clientSecret);
      };
      pay();
    }
  }, [axios]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
    }

    // confirm payment
    const { error: cardError, paymentIntent: paymentSuccess } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (cardError) {
      toast.error(cardError.message);
      setLoading(false);
    } else {
      if (paymentSuccess.status === "succeeded") {
        setLoading(false);
        // toast.success("Payment successful");
        const updateUserData = {
          time: data[0].toString(),
          premiumTaken: "yeas",
        };
        const update = async () => {
          const res = await axios.patch(`/user/${user?.email}`, updateUserData);
          if (res.data.success) {
            toast.success("payment successful");
            refetch();
          }
        };

        update();
      }
    }
  };
  return (
    <div>
      <form onSubmit={handlePayment}>
        <CardElement
          options={{
            style: {
              base: {
                border: "1px solid black",
                fontSize: "16px",
                color: "#000",
                "::placeholder": {
                  color: "#000",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          size="lg"
          className="mt-6"
          type="submit"
          disabled={!stripe || !clientSecret || loading}
        >
          {loading ? <Spinner className="h-4 w-4" /> : "Pay"}
        </Button>
      </form>
    </div>
  );
};

export default ChackOutForm;
