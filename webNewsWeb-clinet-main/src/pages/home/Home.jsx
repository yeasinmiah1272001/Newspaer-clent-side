import AllPublisher from "./allPubliser/AllPublisher";
import HeroSection from "./heroSection/HeroSection";
import TrendingArticles from "./trendingArticles/TrendingArticles";
import Statastics from "./statastics/Statastics";
import Plan from "./plan/Plan";
import SiteTitle from "../../components/siteTitle/SiteTitle";
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import OfficeLocation from "./officeLocation/OfficeLocation";
import TopArticleRighter from "./topArticleRitghter/TopArticleRighter";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const openSubscription = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(openSubscription);
  }, []);
  return (
    <>
      <SiteTitle page="Home"></SiteTitle>
      <HeroSection></HeroSection>
      <TrendingArticles></TrendingArticles>
      <AllPublisher></AllPublisher>
      <Statastics></Statastics>
      <Plan></Plan>
      <OfficeLocation></OfficeLocation>
      <TopArticleRighter></TopArticleRighter>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-center">🚀 Why Go Premium?</DialogHeader>
        <DialogBody>
          <p>
            🌐 Unlimited Access: Dive deep into a treasure trove of articles, no
            restrictions!
          </p>
          <p>
            🚫 Ad-Free Experience: Say goodbye to interruptions and enjoy
            seamless reading.
          </p>
          <p>
            🎁 Exclusive Content: Be the first to savor in-depth stories and
            behind-the-scenes insights.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Link to="/subscription">
            <Button variant="gradient" color="green">
              <span>go to subscription page</span>
            </Button>
          </Link>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Home;
