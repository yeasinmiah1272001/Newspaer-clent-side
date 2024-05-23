import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
const SiteTitle = ({ page }) => {
  return (
    <>
      <Helmet>
        <title>wev-news-web | {page}</title>
      </Helmet>
    </>
  );
};

SiteTitle.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SiteTitle;
