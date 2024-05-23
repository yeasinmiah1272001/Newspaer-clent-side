import { useRef, useState } from "react";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Select from "react-select";
import { Input } from "@material-tailwind/react";
import SiteTitle from "../../components/siteTitle/SiteTitle";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import PageError from "../../components/error/PageError";
import ArticlesCard from "../../components/card/ArticlesCard";
import { useAdmin, usePublisherName } from "../../hooks/api";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const newsTags = [
  "Breaking News",
  "Politics",
  "World News",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Entertainment",
  "Sports",
  "Environment",
];

const tags = newsTags.map((tag) => ({ value: tag.toLowerCase(), label: tag }));

const AllArticles = () => {
  const { data: userRoll, isLoading: roll } = useAdmin();
  const axios = useAxiosPublic();
  const [getTag, setTags] = useState("");
  const [getPublisher, setPublisher] = useState("");
  const [search, setSearch] = useState("");
  const searchText = useRef("");

  const { isLoading: loading2, error: err, publisherName } = usePublisherName();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["allArticles", getPublisher, search, searchText, getTag],
    queryFn: async () => {
      const res = await axios.get(
        `/articles?title=${search}&publisher=${
          getPublisher?.value === undefined ? "" : getPublisher?.value
        }&tag=${getTag?.value === undefined ? "" : getTag?.value}`
      );
      return res.data;
    },
  });

  if (isLoading && loading2 && roll) return <LoadingAnimation />;
  if (error || err) return <PageError err={error}></PageError>;

  const approved = data?.filter((article) => article.status === "approved");

  if (approved === undefined) return <LoadingAnimation />;

  const publisher = publisherName?.map((name) => ({
    value: name.toLowerCase(),
    label: name,
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    refetch();
  };

  const handleInput = () => {
    if (searchText.current.value === "") {
      setSearch("");
      refetch;
    }
  };

  return (
    <>
      <SiteTitle page="All Articles"></SiteTitle>
      <section className="my-20">
        <Container>
          <Title>All Articles</Title>
          <div className="mt-12">
            <div className="p-6 shadow-sm border-2 border-gray-200 rounded-sm flex items-center lg:flex-row flex-col gap-6">
              <div className=" xl:basis-2/5 lg:basis-1/2 w-full flex sm:flex-row flex-col items-center gap-6">
                <div className="w-full">
                  <Select
                    className="relative z-[120]"
                    defaultValue={getTag}
                    onChange={setTags}
                    options={tags}
                    placeholder="Filter by tags"
                  />
                </div>
                <div className="w-full">
                  <Select
                    className="relative z-[120]"
                    defaultValue={getPublisher}
                    onChange={setPublisher}
                    options={publisher}
                    placeholder="Filter by publisher"
                  />
                </div>
              </div>
              <form
                onSubmit={handleSearch}
                className="lg:flex-1 w-full sm:flex-row flex-col flex items-center gap-6"
              >
                <div className="flex items-center w-full">
                  <Input
                    onChange={handleInput}
                    name="search"
                    type="text"
                    placeholder="Search by title"
                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 -ml-10 relative z-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  value="Search"
                  type="submit"
                  size="md"
                  className="flex justify-center items-center bg-black px-5 py-2 rounded-md text-white uppercase font-bold active:scale-95"
                />
              </form>
            </div>
          </div>
          {approved?.length === 0 ? (
            <div className="h-screen w-full mt-12 flex justify-center items-center text-center ">
              <h2 className="text-xl text-center">Article no found</h2>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approved?.map((article) => (
                <ArticlesCard
                  key={article._id}
                  data={article}
                  userRoll={userRoll}
                ></ArticlesCard>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default AllArticles;
