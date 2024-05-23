import SiteTitle from "../../components/siteTitle/SiteTitle";
import Title from "../../components/title/Title";
import { Chart } from "react-google-charts";
import { useAllArticle } from "../../hooks/api";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import PageError from "../../components/error/PageError";

const Dashboard = () => {
  const { isLoading, error, allArticles } = useAllArticle();
  if (isLoading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;

  const transformArticleForPublisherPieChart = () => {
    const articleData = allArticles?.article;

    if (!articleData) {
      return [];
    }

    const acc = {};

    for (let i = 0; i < articleData.length; i++) {
      const article = articleData[i];
      const { publisher } = article;

      if (!acc[publisher]) {
        acc[publisher] = 1;
      } else {
        acc[publisher] += 1;
      }
    }

    const publisherData = [["Publisher", "Number of Articles"]];

    for (const [publisher, count] of Object.entries(acc)) {
      publisherData.push([publisher, count]);
    }

    return publisherData;
  };
  const pieChart = transformArticleForPublisherPieChart();

  const transformDataForPremiumArticle = () => {
    const histogramData = [["Publisher", "Premium Articles"]];

    const articleData = allArticles?.article;

    if (!articleData) {
      return histogramData;
    }

    const premiumCounts = {};

    for (let i = 0; i < articleData.length; i++) {
      const article = articleData[i];
      const { publisher, premium } = article;

      if (premium === "yeas") {
        premiumCounts[publisher] = (premiumCounts[publisher] || 0) + 1;
      }
    }

    for (const [publisher, count] of Object.entries(premiumCounts)) {
      histogramData.push([publisher, count]);
    }

    return histogramData;
  };

  const histrogram = transformDataForPremiumArticle();

  const viewers = [
    ["Title", "Viewers"],
    ...allArticles.article.map((item) => [item.title, item.viewers]),
  ];

  return (
    <>
      <SiteTitle page="Dashboard"></SiteTitle>
      <section className="p-6 shadow-sm border-2 border-gray-200 rounded-sm">
        <Title>Analytics</Title>
        <div className="mt-12">
          <Chart
            chartType="PieChart"
            data={pieChart}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="mt-6">
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={viewers}
          />
        </div>
        <div className="mt-6">
          <Chart
            chartType="Histogram"
            width="100%"
            height="400px"
            data={histrogram}
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
