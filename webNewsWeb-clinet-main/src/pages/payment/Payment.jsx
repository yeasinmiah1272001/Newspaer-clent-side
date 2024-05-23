import Title from "../../components/title/Title";
import Container from "../../components/container/Container";
import SiteTitle from "../../components/siteTitle/SiteTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ChackOutForm from "./ChackOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
const Payment = () => {
  return (
    <>
      <SiteTitle page="Payment"></SiteTitle>
      <section className="my-20">
        <Container>
          <Title>Payment</Title>

          <div className="max-w-sm mx-auto bg-white shadow-sm border-gray-400 rounded-md mt-12 p-6 bg-secondary_color/20">
            <Elements stripe={stripePromise}>
              <ChackOutForm></ChackOutForm>
            </Elements>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Payment;
