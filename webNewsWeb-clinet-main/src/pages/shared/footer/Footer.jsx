import { Button, Input } from "@material-tailwind/react";
import Container from "../../../components/container/Container";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-text_primary py-16 font-popins ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="md:col-span-2 w-full">
            <h2 className="text-4xl text-white mb-2">Don&apos;t Miss Out</h2>
            <p className="text-white/80 mb-6">
              Subscribe our news letter for latest news?
            </p>
            <div className="flex items-center gap-1">
              <Input
                type="email"
                placeholder="Email Address"
                className="!border !border-gray-400 flex-1  bg-text_secondary text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent text-white/80 placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <Button
                variant="filled"
                size="sm"
                className="flex justify-center items-center w-1/5 bg-red-500"
              >
                Subscribe
              </Button>
            </div>
            <p className="mt-6 text-white/80 font-inter font-light text-justify mb-6">
              This site is intended for Us consumers. By siging up, you
              understand and agree that your data will be collected and used
              subject to our US{" "}
              <span className="underline">Privacy Policy</span> and{" "}
              <span className="underline">Terms</span> of Use
            </p>
            <p className="text-white mb-6">* Required information</p>
            <ul className="text-white flex gap-4">
              <li className="h-10 w-10 rounded-full  border border-gray-200 flex justify-center items-center">
                <FaFacebookF />
              </li>
              <li className="h-10 w-10 rounded-full border border-gray-200 flex justify-center items-center">
                <FaInstagram />
              </li>
              <li className="h-10 w-10 rounded-full border border-gray-200 flex justify-center items-center">
                <FaTwitter />
              </li>
              <li className="h-10 w-10 rounded-full border border-gray-200 flex justify-center items-center">
                <FaYoutube />
              </li>
              <li className="h-10 w-10 rounded-full border border-gray-200 flex justify-center items-center">
                <FaPinterest />
              </li>
            </ul>
          </div>

          <div className="lg:flex grid-cols-1 md:grid-cols-2  col-span-3  w-full">
            <div className="w-full lg:mt-0 mt-6">
              <h2 className="text-2xl font-medium text-white">Company</h2>
              <ul className="text-white/80 mt-3 flex flex-col gap-2 font-inter font-light ">
                <li>About Us</li>
                <li>Terms & Condition</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="w-full lg:mt-0 mt-6">
              <h2 className="text-2xl font-medium text-white mb-3">News</h2>
              <ul className="text-white/80 mt-3 flex flex-col gap-2 font-inter font-light">
                <li>Sports</li>
                <li>Politics</li>
                <li>Travel</li>
                <li>Culture</li>
              </ul>
            </div>
            <div className="w-full lg:mt-0 mt-6">
              <h2 className="text-2xl font-medium text-white">Contact Us</h2>
              <ul className="text-white/80 mt-3 flex flex-col gap-2 font-inter font-light ">
                <li>web@webNewsWave.com</li>
                <li>support@webNewsWave.com</li>
                <li>243/C Northern California, USA</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t  border-gray-300 my-6"></div>
      <Container>
        <div className="flex justify-between items-center xl:flex-row flex-col xl:gap-0 gap-6">
          <ul className="flex flex-wrap md:justify-start justify-center gap-6 items-center text-white/80">
            <li>Site Map</li>
            <li>Privacy </li>
            <li>Terms</li>
            <li>User Content Permission Terms </li>
            <li>license</li>
          </ul>

          <p className="text-white/80 md:text-start text-center">
            ©2023 All rights reserved . Developed by{" "}
            <span className="font-bold text-secondary_color">MD Shahed</span>
          </p>
        </div>
      </Container>
      <div className="border-b border-gray-700 my-6"></div>
      <Container>
        <p className="text-white/80 text-center">
          {" "}
          This site is intended for Us consumers.{" "}
          <span className="underline">Cookies</span> and related technology are
          used for advertising. To <span className="underline">learn more</span>
          , visit <span className="underline">AdChoies</span> and our{" "}
          <span className="underline">Privacy Policy</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
