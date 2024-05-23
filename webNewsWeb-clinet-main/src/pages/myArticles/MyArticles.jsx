import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import { Button, Card, Typography } from "@material-tailwind/react";
import SiteTitle from "../../components/siteTitle/SiteTitle";
import { useUserArticle } from "../../hooks/api";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import PageError from "../../components/error/PageError";

import { useState } from "react";
import ArticleUpdateModal from "../../components/articleUpdateModal/ArticleUpdateModal";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import MessageModal from "../../components/messageModal/MessageModal";

const TABLE_HEAD = [
  "Serial No",
  "Title",
  "Status",
  "Is Premium",
  "",
  "message",
];

const MyArticles = () => {
  const axios = useAxiosPublic();
  const [update, setUpdate] = useState({});
  const [open, setOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(!open);
  const handleOpenMessage = () => setMessageOpen(!messageOpen);
  const { isLoading, error, userArticle, refetch } = useUserArticle();
  if (isLoading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;
  const handleUpdate = (article) => {
    setUpdate(article);
    handleOpen();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteArticle = async () => {
          const res = await axios.delete(`/article/${id}`);
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: res.data.message,
              icon: "success",
            });
            refetch();
          }
        };
        deleteArticle();
      }
    });
  };

  const handleSendMassage = (message) => {
    setMessage(message);
    handleOpenMessage();
  };
  return (
    <>
      <SiteTitle page="My Articles"></SiteTitle>
      <section className="my-20">
        <Container>
          <Title>My articles</Title>
          <div className="mt-12">
            <Card className="h-full w-full overflow-scroll">
              {userArticle?.length === 0 ? (
                <div className="h-screen flex w-full justify-center items-center">
                  <h1 className="text-2xl text-center font-bold font-popins ">
                    You have not Articles
                  </h1>
                </div>
              ) : (
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {userArticle?.map((article, index) => {
                      const isLast = index === userArticle.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {article.title}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {article.status === "approved" ? (
                                <span className="text-green-500">
                                  {article.status}
                                </span>
                              ) : article.status === "declined" ? (
                                <span className="text-red-500">
                                  {article.status}
                                </span>
                              ) : (
                                <span className="text-blue-500">
                                  {article.status}
                                </span>
                              )}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {article.premium === "free" ? (
                                <span>NO</span>
                              ) : (
                                <span>YES</span>
                              )}
                            </Typography>
                          </td>
                          <td
                            className={`${classes} flex  justify-center items-center gap-2`}
                          >
                            <Link
                              to={`/articles-Details/${article._id}`}
                              className="hover:text-secondary_color"
                            >
                              Details
                            </Link>
                            <Button
                              onClick={() => handleUpdate(article)}
                              size="sm"
                              className="text-green-400"
                            >
                              Update
                            </Button>
                            <Button
                              onClick={() => handleDelete(article?._id)}
                              size="sm"
                              className="text-red-400"
                            >
                              Delete
                            </Button>
                          </td>
                          <td>
                            {article.status === "decline" ? (
                              <div className="flex flex-col gap-2">
                                <span>{article.status}</span>
                                <Button
                                  className="text-green-500"
                                  onClick={() =>
                                    handleSendMassage(article.message)
                                  }
                                >
                                  Message
                                </Button>
                              </div>
                            ) : (
                              "No message"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
        </Container>
      </section>
      <ArticleUpdateModal
        update={update}
        handleOpen={handleOpen}
        open={open}
        setOpen={setOpen}
      ></ArticleUpdateModal>
      <MessageModal
        message={message}
        messageOpen={messageOpen}
        handleOpenMessage={handleOpenMessage}
      ></MessageModal>
    </>
  );
};

export default MyArticles;
