import loadingAnimation from "../../../assets/loading/loading-animation.gif";
import Container from "../../../components/container/Container";
import ArticlesCard from "../../../components/card/ArticlesCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import Title from "../../../components/title/Title";
import { useAllArticle } from "../../../hooks/api";

const TrendingArticles = () => {
  const { isLoading, error, allArticles } = useAllArticle();
  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center w-full">
        <img src={loadingAnimation} alt="Loading Animation" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center">
        <h1>{error}</h1>
      </div>
    );

  const shortByView = allArticles?.article?.sort(function (a, b) {
    return b.viewers - a.viewers;
  });

  return (
    <section className="mt-20">
      <Container>
        <Title>Trending news</Title>

        <div className="mt-12">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            className="h-full"
          >
            {shortByView?.slice(0, 6)?.map((data, idx) => (
              <SwiperSlide key={idx} className="h-full mb-10">
                <ArticlesCard data={data}></ArticlesCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default TrendingArticles;
