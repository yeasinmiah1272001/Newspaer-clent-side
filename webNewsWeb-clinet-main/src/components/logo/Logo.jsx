import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      className="bg-gradient-to-tr from-primary_color/70 text-3xl to-secondary_color text-transparent bg-clip-text"
      to="/"
    >
      {" "}
      WebNewsWave
    </Link>
  );
};

export default Logo;
