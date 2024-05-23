import { Typewriter } from "react-simple-typewriter";
import subscriptionBanner from "../../assets/banner/subscription.svg";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import SiteTitle from "../../components/siteTitle/SiteTitle";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const options = [
  { label: "1 Minute", value: 1, unit: "minutes" },
  { label: "5 Days", value: 5, unit: "days" },
  { label: "10 Days", value: 10, unit: "days" },
];
const Subscription = () => {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDuration !== null) {
      const { value } = selectedDuration;
      const total = value * 10;
      setPrice(total);
    }
  }, [selectedDuration]);

  const handleSubscription = () => {
    if (selectedDuration) {
      const currentDate = moment();
      const endDate = currentDate
        .clone()
        .add(selectedDuration.value, selectedDuration.unit);
      const date = endDate.format("YYYY-MM-DD HH:mm:ss");
      localStorage.setItem("subscribe", JSON.stringify([date, price]));
      navigate("/payment");
    }
  };

  return (
    <>
      <SiteTitle page="Subscription"></SiteTitle>
      <section>
        <div className="lg:h-screen  bg-secondary_color/10">
          <Container className="h-full">
            <div className="h-full flex items-center lg:flex-row flex-col">
              <div className="lg:flex-1 w-full lg:pt-0 pt-20  flex justify-center items-center h-full">
                <h1 className="font-popins font-bold text-2xl sm:text-4xl text-text_primary w-4/5 h-20 lg:text-start text-center">
                  <Typewriter
                    loop={true}
                    words={["Subscribe to access our premium content"]}
                  ></Typewriter>
                </h1>
              </div>
              <div className="w-full lg:flex-1 ">
                <img src={subscriptionBanner} alt="" />
              </div>
            </div>
          </Container>
        </div>
        <div className="my-20 max-w-xl mx-5 p-6 lg:mx-auto bg-white shadow-sm border-2 border-gray-200">
          <Title>Subscribe</Title>
          <div className="mt-12">
            <Select
              defaultValue={selectedDuration}
              onChange={setSelectedDuration}
              options={options}
              placeholder="Select subscription days"
            />

            <p className="my-6 flex gap-1">
              <span className="text-text_primary font-semibold text-lg">
                PRICE:
              </span>
              <span className="font-medium">${price}</span>
            </p>
            <Button onClick={handleSubscription} size="lg">
              Subscription
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscription;
