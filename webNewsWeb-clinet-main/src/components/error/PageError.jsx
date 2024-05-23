import PropTypes from "prop-types";

const PageError = ({ err }) => {
  return (
    <div className="h-full w-full flex justify-center items-center ">
      <h1>{err}</h1>
    </div>
  );
};

export default PageError;

PageError.propTypes = {
  err: PropTypes.string,
};
