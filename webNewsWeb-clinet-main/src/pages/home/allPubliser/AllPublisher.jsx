import PublisherCard from "../../../components/card/PublisherCard";
import Container from "../../../components/container/Container";
import PageError from "../../../components/error/PageError";
import LoadingAnimation from "../../../components/loadingAnimation/LoadingAnimation";
import Title from "../../../components/title/Title";
import { usePublisher } from "../../../hooks/api";
import Marquee from "react-fast-marquee";

const AllPublisher = () => {
  const { isLoading, error, publisher } = usePublisher();

  if (isLoading) return <LoadingAnimation></LoadingAnimation>;
  if (error) return <PageError err={error}></PageError>;
  return (
    <section className="mt-20">
      <Container>
        <Title>All Publisher</Title>
        <div className="mt-12">
          <Marquee className="flex gap-6 items-center">
            {publisher?.map((data, idx) => (
              <PublisherCard key={idx} data={data}></PublisherCard>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
};

export default AllPublisher;
