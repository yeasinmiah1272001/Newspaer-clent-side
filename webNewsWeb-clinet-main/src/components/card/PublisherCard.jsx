import PropTypes from "prop-types";

const PublisherCard = ({ data }) => {
  const { publisher_name, publisher_logo } = data || {};
  return (
    <div className="shadow-md">
      <img
        className="h-36 w-60 p-5"
        src={publisher_logo}
        alt={`image of ${publisher_name}`}
      />
    </div>
  );
};

export default PublisherCard;

PublisherCard.propTypes = {
  data: PropTypes.object,
};
