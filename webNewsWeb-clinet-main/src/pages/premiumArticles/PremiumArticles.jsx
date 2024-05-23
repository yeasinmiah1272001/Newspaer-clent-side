import { PremiumArticlesCard } from "../../components/card/PremiumArticlesCard";
import Container from "../../components/container/Container";
import PageError from "../../components/error/PageError";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import Title from "../../components/title/Title";
import { useAllArticle } from "../../hooks/api";
import SiteTitle from "../../components/siteTitle/SiteTitle";

const PremiumArticles = () => {
  const { isLoading, error, allArticles } = useAllArticle();
  if (isLoading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;
  const premiumArticle = allArticles?.article?.filter(
    (item) => item.premium === "yeas"
  );
  return (
    <>
      <SiteTitle page="Premium Articles"></SiteTitle>
      <section className="py-20 bg-secondary_color/30">
        <Container>
          <Title>Premium articles</Title>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumArticle?.map((premium, idx) => (
              <PremiumArticlesCard key={idx} premium={premium} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default PremiumArticles;
