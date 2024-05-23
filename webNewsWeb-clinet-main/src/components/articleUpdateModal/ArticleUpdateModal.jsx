import PropTypes from "prop-types";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import toast from "react-hot-toast";

const ArticleUpdateModal = ({ update, handleOpen, open, setOpen }) => {
  const axios = useAxiosPublic();
  const article = update;
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    setLoading(true);
    const res = await axios.put(`/update/${article?._id}`, {
      title,
      description,
    });
    const { message, success } = res.data;
    if (success) {
      setLoading(false);
      setOpen(false);
      toast.success(message);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen} size="lg">
      <DialogHeader>Update Article</DialogHeader>
      <form onSubmit={handleUpdate}>
        <DialogBody>
          <div>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              defaultValue={article?.title}
            />
          </div>
          <div className="mt-6">
            <Textarea
              name="description"
              defaultValue={article.description}
              label="Message"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={loading}
            type="submit"
            variant="gradient"
            color="green"
            className="flex justify-center items-center"
          >
            {loading ? <Spinner className="h-4 w-4" /> : <span>Confirm</span>}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default ArticleUpdateModal;

ArticleUpdateModal.propTypes = {
  update: PropTypes.object,
  handleOpen: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.any,
};
