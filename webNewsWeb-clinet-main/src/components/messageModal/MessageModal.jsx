import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const MessageModal = ({ messageOpen, message, handleOpenMessage }) => {
  return (
    <>
      <Dialog open={messageOpen} handler={handleOpenMessage}>
        <DialogHeader>Message form admin</DialogHeader>
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpenMessage}>
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

MessageModal.propTypes = {
  messageOpen: PropTypes.any,
  message: PropTypes.any,
  handleOpenMessage: PropTypes.any,
};

export default MessageModal;
