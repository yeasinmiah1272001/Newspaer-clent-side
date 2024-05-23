import { Typewriter } from "react-simple-typewriter";
import heroBanner from "../../../assets/hero/hero.png";
import Container from "../../../components/container/Container";
import { Button } from "@material-tailwind/react";

const HeroSection = () => {
  return (
    <section className="h-screen">
      <Container className="h-full">
        <div className="flex items-center flex-col   xl:flex-row xl:mt-0 mt-10">
          <div className="xl:flex-1 w-full xl:block flex flex-col items-center justify-center">
            <h4 className="text-secondary_color text-2xl font-bold h-10 lg:mt-5 xl:mt-0">
              <Typewriter loop={true} words={["Welcome Reader"]}></Typewriter>
            </h4>
            <h2 className="md:text-5xl text-3xl font-bold font-popins leading-tight  tracking-wide my-10 text-text_primary xl:text-start text-center">
              Find out what&apos;s going on from anywhere direct on your phone.
            </h2>
            <Button
              variant="outlined"
              size="lg"
              className="border-primary_color/90 hover:bg-primary_color/90 duration-200 hover:text-white"
            >
              Let&apos;s read
            </Button>
          </div>
          <div className="flex-1 xl:block hidden">
            <img
              className="h-full w-full drop-shadow-md"
              src={heroBanner}
              alt="hero banner image"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
