import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function PlanCard({ data, buttonText, className, nameClass }) {
  const { plan_name, price, days, features, terms_text } = data || {};
  return (
    <Card
      color="gray"
      variant="gradient"
      className={`w-full  p-8 ${className}`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <div className="flex justify-center items-center">
          <Typography
            variant="h6"
            color="white"
            className={`font-medium uppercase ${nameClass} p-2 rounded-sm`}
          >
            {plan_name}
          </Typography>
        </div>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl uppercase font-bold font-popins">
            {price === "free" ? "" : "$"} {price}
          </span>
          <span className="self-end text-xl font-medium uppercase">
            {" "}
            / {days}
          </span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {features?.map((item, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{item}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color="white"
          className={`hover:scale-[1.02] focus:scale-[1.02] active:scale-100 ${
            plan_name === "Premium Duo" ? "bg-primary_color/80 text-white" : ""
          } ${
            plan_name === "Premium Family"
              ? "bg-secondary_color text-white"
              : ""
          }`}
          ripple={false}
          fullWidth={true}
        >
          {buttonText}
        </Button>
        <p className="mt-6 text-sm">{terms_text}</p>
      </CardFooter>
    </Card>
  );
}

PlanCard.propTypes = {
  data: PropTypes.object,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  nameClass: PropTypes.string,
};
