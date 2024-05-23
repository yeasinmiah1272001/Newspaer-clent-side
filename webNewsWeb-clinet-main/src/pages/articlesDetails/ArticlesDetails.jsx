import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import PageError from "../../components/error/PageError";
import { FaEye } from "react-icons/fa";
import premiumSymbol from "../../assets/icon/premium-art.png";

const ArticlesDetails = () => {
  const axios = useAxiosPublic();
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: article,
  } = useQuery({
    queryKey: ["singleArticle"],
    queryFn: async () => {
      const res = await axios.get(`/article/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;

  const {
    title,
    image,
    publisher,
    tags,
    description,
    viewers,
    premium,
    publish_date,
  } = article || {};

  return (
    <section className="my-20">
      <Container>
        <Card className="w-full flex-col lg:flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-full lg:w-2/5 shrink-0 rounded-t-lg lg:rounded-r-none relative"
          >
            <img
              src={image}
              alt={`image of ${title}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0">
              {premium === "yeas" ? <img src={premiumSymbol} alt="" /> : ""}
            </div>
          </CardHeader>
          <CardBody className="px-3 py-5 lg:px-6">
            <div className="flex items-start justify-between sm:flex-row flex-col sm:items-center sm:gap-0 gap-3">
              <p className="uppercase text-secondary_color text-sm flex gap-1">
                {tags?.map((item, idx) => (
                  <span key={idx}>#{item}</span>
                ))}
              </p>
              <p className="flex items-center flex-col">
                <span className="text-text_primary font-semibold">
                  Publisher
                </span>
                <span>{publisher}</span>
              </p>
            </div>
            <div className="flex items-start sm:gap-0 gap-3 justify-between my-5 sm:flex-row flex-col sm:items-center">
              <p className="flex gap-2 items-center">
                <span className="text-text_primary font-semibold">
                  <FaEye />
                </span>{" "}
                {viewers}
              </p>
              <p className="flex flex-col">
                <span className="text-text_primary font-semibold">
                  Published Date:
                </span>{" "}
                {publish_date}
              </p>
            </div>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 sm:text-3xl text-xl"
            >
              {title}
            </Typography>
            <div
              color="gray"
              className="mb-8 font-normal h-96 overflow-y-auto space-y-6"
            >
              <p className="text-sm text-justify">
                {description.slice(0, 300)}
              </p>
              <p className="text-sm text-justify">
                {description.slice(301, 600)}
              </p>
              <p className="text-sm text-justify">
                {description.slice(601, 900)}
              </p>
              <p className="text-sm text-justify">
                {description.slice(901, 1300)}
              </p>
            </div>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default ArticlesDetails;
