import Container from "../../../components/container/Container";
import Title from "../../../components/title/Title";
import TopArticleRiterCard from "../../../components/card/topArticleRiterCard";

const TopArticleRighter = () => {
  return (
    <section className="my-12">
      <Container>
        <Title> our Top Article writer</Title>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopArticleRiterCard
            image="https://i.ibb.co/kmVLrRZ/dmitry-vechorko-E9-PFbdh-Zmus-unsplash.jpg"
            name="Alex Ramirez"
            description="Alex is a technology enthusiast and a seasoned writer at Tech Insight. With a knack for simplifying complex tech concepts, Alex's articles are known for providing readers with a clear understanding of the latest advancements in the tech world."
            work="BBC News"
          ></TopArticleRiterCard>
          <TopArticleRiterCard
            image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="Sophie Mitchell"
            description="Sophie is an environmental journalist dedicated to raising awareness about climate change and sustainable living. Her impactful articles in EcoGuardian have inspired readers to take action towards a greener and more eco-friendly lifestyle."
            work="CNN"
          ></TopArticleRiterCard>
          <TopArticleRiterCard
            image="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            name="Michael Chang"
            description="Michael is a finance and business expert contributing insightful articles to Financial Pulse. His analysis of economic trends, investment strategies, and market developments has established him as a trusted source for financial news and advice."
            work="NEW YOUR TIMES"
          ></TopArticleRiterCard>
        </div>
      </Container>
    </section>
  );
};

export default TopArticleRighter;
