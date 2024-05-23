import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const DeclineModal = ({ id, open, handleOpen, setOpen, refetch }) => {
  const [message, setMessage] = useState("");
  const axios = useAxiosPublic();
  const handleSubmit = async () => {
    const res = await axios.patch(`/article/${id}`, {
      message: message,
      status: "decline",
    });
    if (res.data.success) {
      setOpen(false);
      refetch();
      toast.success("declined success fully");
    }
  };
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Reason the decline</DialogHeader>
        <DialogBody>
          <div className="w-full">
            <Textarea
              onChange={(e) => setMessage(e.target.value)}
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

DeclineModal.propTypes = {
  refetch: PropTypes.any,
  setOpen: PropTypes.any,
  handleOpen: PropTypes.any,
  open: PropTypes.any,
  id: PropTypes.any,
};

export default DeclineModal;
