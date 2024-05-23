import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
const TopArticleRiterCard = ({ name, image, description, work }) => {
  return (
    <Card>
      <CardHeader floated={false} className="h-80">
        <img
          src={image}
          className="h-full w-full object-cover"
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {work}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
};
export default TopArticleRiterCard;

TopArticleRiterCard.propTypes = {
  image: PropTypes.any,
  name: PropTypes.any,
  work: PropTypes.any,
  description: PropTypes.any,
};
