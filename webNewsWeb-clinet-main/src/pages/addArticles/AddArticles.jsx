import {
  Button,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Container from "../../components/container/Container";
import Title from "../../components/title/Title";
import Select from "react-select";
import { useEffect, useState } from "react";
import SiteTitle from "../../components/siteTitle/SiteTitle";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import PageError from "../../components/error/PageError";
import {  usePublisherName } from "../../hooks/api";
import moment from "moment/moment";
import useAuth from "../../hooks/useAuth";
import imageUpload from "../../utils/imageUpload";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";


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

const tags = newsTags?.map((tag) => ({ value: tag.toLowerCase(), label: tag }));

const AddArticles = () => {
  const { user, loading } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );
  const [getTag, setSelectTag] = useState(null);
  const [getPublisher, setPublisher] = useState(null);
  const { isLoading, error, publisherName } = usePublisherName();
  const axios = useAxiosPublic();
  const [formLoading, setLoading] = useState(false);
  

  useEffect(() => {
    const time = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(time);
  }, []);

  if (isLoading && loading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;
  const publisher = publisherName?.map((name) => ({
    value: name.toLowerCase(),
    label: name,
  }));

  if (getTag === null && publisher === null) {
    return;
  }

  const handleAddArticles = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const file = form.image.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const arrayTag = getTag?.map((item) => item.value);
    const pub = publisher[0].value;

    setLoading(true);

    try {
      const { data } = await imageUpload(formData);
      const image = data.data.display_url;

      const article = {
        title,
        image,
        tags: arrayTag,
        publisher: pub,
        author_email: user?.email,
        author_name: user?.displayName,
        author_image: user?.photoURL,
        publish_date: currentDateTime,
        description,
      };

      const res = await axios.post("/article", article);
      const { success, message } = res.data;
      if (success) {
        toast.success(message);
        setLoading(false);
        e.target.reset();
      } else {
        toast.success(message);
      }
    } catch (err) {
      console.log(err);
      e.target.reset();
      setLoading(false);
    }
  };

  return (
    <>
      <SiteTitle page="Add Articles"></SiteTitle>
      <section className="my-20 ">
        <Container>
          <Title>Add articles</Title>

          <div className="mt-12 shadow-sm border-2 border-gray-200 p-6">
            <form onSubmit={handleAddArticles}>
              <Input name="title" size="lg" label="Title" required />
              <div className="flex sm:flex-row flex-col gap-6 items-center mt-6">
                <div className="w-full">
                  <Select
                    defaultValue={getTag}
                    onChange={setSelectTag}
                    options={tags}
                    placeholder="Select tags"
                    isMulti={true}
                    required
                  />
                </div>
                <div className="w-full">
                  <Select
                    defaultValue={getPublisher}
                    onChange={setPublisher}
                    options={publisher}
                    placeholder="Select publisher"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <input
                  className="relative mb-1 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="imageUpload"
                  name="image"
                  required
                />
                <Typography variant="small" className="text-gray-600 ">
                  upload article image
                </Typography>
              </div>
              <div className="my-6">
                <Textarea
                  required
                  name="description"
                  size="lg"
                  label="Textarea Large"
                />
              </div>
              <div>
                <Button
                  disabled={formLoading}
                  type="submit"
                  className="bg-primary_color/80"
                  size="lg"
                >
                  {formLoading ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    "Submit Articles"
                  )}
                </Button>
                <p className="text-sm mt-4">
                  Note: if admin approve your articles than this articles showed
                  on the all articles page
                </p>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddArticles;
