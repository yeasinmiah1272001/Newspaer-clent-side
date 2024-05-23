import { Link, useLocation, useNavigate } from "react-router-dom";
import authentication from "../../assets/authenticaton/authentication.svg";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res) {
        toast.success("Login successful");
        location.state ? navigate(location.state) : navigate("/");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.message === "Firebase: Error (auth/invalid-login-credentials).") {
        toast.error("Email and password does not match");
      }
    }
  };

  const hadleGoogleLogin = () => {
    googleLogin().then(() => {
      toast.success("Login successful");
      location.state ? navigate(location.form) : navigate("/");
    });
  };
  return (
    <section className="w-full xl:h-screen px-4 sm:px-7 lg:px-0  flex justify-center items-center">
      <div className="flex items-center my-10 lg:max-w-5xl  w-full mx-auto rounded-lg  shadow-md border border-gray-400 ">
        <div className="lg:flex-1 w-full p-6">
          <div className="flex flex-col sm:flex-row sm:gap-0 gap-6 sm:justify-between items-center mb-6">
            <p className="text-sm font-popins text-text_primary ">
              New to WebNewsWave?.{" "}
              <Link
                to="/signUp"
                className="underline hover:text-secondary_color"
              >
                SignUp
              </Link>
            </p>
            <h1 className="text-3xl font-bold text-text">Login</h1>
          </div>
          <form className="mt-5" onSubmit={handleLogin}>
            <div className="">
              <Input
                type="email"
                color="teal"
                label="Email"
                required
                name="email"
              />
            </div>
            <div className="mt-6">
              <Input
                type="password"
                color="teal"
                label="Password"
                required
                name="password"
              />
            </div>
            <Button
              variant="filled"
              className="w-full bg-primary_color mt-5 flex justify-center items-center"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Login"}
            </Button>
          </form>
          <div className="flex justify-center items-center">
            <h4 className="text-center mt-6 text-sm flex items-center gap-1 after:w-[50px] before:w-[50px]  after:block before:block sm:after:w-[160px] sm:before:w-[160px] after:h-[1px] after:bg-gray-500 before:h-[1px] before:bg-gray-500">
              Or login with
            </h4>
          </div>
          <div className="flex flex-col items-center gap-4 mt-5">
            <Button
              onClick={hadleGoogleLogin}
              size="lg"
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-3 sm:text-base text-sm"
            >
              <img
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              <span className="sm:inline-block hidden">
                Continue with Google
              </span>
            </Button>
          </div>
        </div>
        <div className="md:flex-1 hidden md:block">
          <img src={authentication} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
