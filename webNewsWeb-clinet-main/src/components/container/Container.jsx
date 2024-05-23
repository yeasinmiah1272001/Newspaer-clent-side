import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div className={`max-w-full mx-auto lg:px-10 px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
