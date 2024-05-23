import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import Title from "../../../components/title/Title";
import imageUpload from "../../../utils/imageUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddPublisher = () => {
  const axios = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const handleAddPublisher = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const file = form.image.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await imageUpload(formData);
      const publisher_logo = data.data.display_url;
      const res = await axios.post("/publisher", {
        publisher_name: name,
        publisher_logo,
      });
      const { success, message } = res.data || {};

      if (success) {
        setLoading(false);
        e.target.reset();
        toast.success(message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="mt-20">
      <Title>Add publisher</Title>
      <div className="max-w-xl mx-auto mt-12 rounded-sm bg-white shadow-sm border-2 border-gray-200 p-6">
        <form onSubmit={handleAddPublisher} className="w-full ">
          <div className="w-full mb-6">
            <label className="text-text_primary font-bold mb-1">
              Publisher Name
            </label>
            <Input
              required
              name="name"
              type="text"
              placeholder="Enter publisher name"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label className="text-text_primary font-bold mb-1">
              Publisher Logo
            </label>
            <input
              className="relative shadow-sm mb-1 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              type="file"
              id="imageUpload"
              name="image"
              required
            />
            <Typography variant="small" className="text-gray-600 ">
              Upload publisher logo
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Button disabled={loading} type="submit" size="lg">
              Add publisher
            </Button>
            {loading ? (
              <p className="flex gap-1 items-center">
                <span>
                  <Spinner />
                </span>{" "}
                Wetting for response
              </p>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPublisher;
