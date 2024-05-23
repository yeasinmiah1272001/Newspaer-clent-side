import { Button, IconButton } from "@material-tailwind/react";
import AdminArticleCard from "../../../components/card/AdminArticleCard";
import PageError from "../../../components/error/PageError";
import LoadingAnimation from "../../../components/loadingAnimation/LoadingAnimation";
import Title from "../../../components/title/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import DeclineModal from "../../../components/declineModal/DeclineModal";

const AdminAllArticle = () => {
  const [open, setOpen] = useState(false);
  const [getId, setId] = useState("");

  const handleOpen = () => setOpen(!open);
  const axios = useAxiosPublic();
  const [active, setActive] = useState(0);
  const itemParPage = 10;
  const {
    isLoading,
    error,
    data: allArticles,
    refetch,
  } = useQuery({
    queryKey: ["AdminAllArticle", active, itemParPage],
    queryFn: async () => {
      const res = await axios.get(
        `/all-article?page=${active}&pageSize=${itemParPage}`
      );
      return res.data;
    },
  });
  if (isLoading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;
  const numberOfPages = Math.ceil(allArticles?.totalCount / itemParPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <>
      <section className="my-20 overflow-y-auto ">
        <Title>All Article</Title>
        <h2 className="my-5 text-3xl font-bold">
          Total Article:{allArticles?.totalCount}
        </h2>
        <div className="mt-12 grid grid-cols-2  gap-6 ">
          {allArticles?.article?.map((data) => (
            <AdminArticleCard
              handleOpen={handleOpen}
              setId={setId}
              key={data._id}
              data={data}
              refetch={refetch}
            ></AdminArticleCard>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-6 justify-center">
          <Button
            disabled={active === 0}
            onClick={() => setActive(active - 1)}
            variant="text"
            className="flex items-center gap-2"
          >
            {" "}
            Previous
          </Button>
          <div className="flex items-center gap-2 ">
            {pages?.map((item, idx) => (
              <IconButton
                key={idx}
                onClick={() => setActive(item)}
                className={`px-4 py-2 ring-1 ring-gray-300 text-sm font-semibold hover:bg-secondary_color duration-150 
               ${item === active ? "bg-green-500" : ""}
              `}
              >
                {item + 1}
              </IconButton>
            ))}
          </div>
          <Button
            disabled={active === pages.length - 1}
            variant="text"
            className="flex items-center gap-2"
            onClick={() => setActive(active + 1)}
          >
            Next
          </Button>
        </div>
      </section>
      <DeclineModal
        className="hidden"
        id={getId}
        open={open}
        handleOpen={handleOpen}
        setOpen={setOpen}
        refetch={refetch}
      ></DeclineModal>
    </>
  );
};

export default AdminAllArticle;
