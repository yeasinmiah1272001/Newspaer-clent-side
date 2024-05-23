import { Link, useLocation, useNavigate } from "react-router-dom";
import authentication from "../../assets/authenticaton/authentication.svg";
import loadingAnim from "../../assets/loading/authentication.gif";
import { Input, Button, Typography, Checkbox } from "@material-tailwind/react";
import imageUpload from "../../utils/imageUpload";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, profileUpdate, googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxiosPublic();
  const [error, setError] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    passwordLength: false,
    spacial: false,
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const trams = form.trams.checked;
    const file = form.image.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setError({
      ...error,
      uppercase: false,
      lowercase: false,
      number: false,
      passwordLength: false,
      spacial: false,
    });

    if (password.length < 6) {
      setLoading(false);
      setError({ ...error, passwordLength: true });
      toast.error("password at lest 6 cheater");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setLoading(false);
      setError({ ...error, uppercase: true });
      toast.error("password should be one uppercase latter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setLoading(false);
      setError({ ...error, uppercase: true });
      toast.error("password should be one lowercase latter");
      return;
    } else if (!/[0-9]/.test(password)) {
      setLoading(false);
      setError({ ...error, number: true });
      toast.error("password should be contains number");
      return;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setLoading(false);
      setError({ ...error, spacial: true });
      toast.error("password should be one spacial character");
      return;
    }

    if (!trams) {
      setLoading(false);
      toast.error("must except trams and condition");
      return;
    }

    try {
      const user = await createUser(email, password);
      const { data } = await imageUpload(formData);
      setLoading(true);
      const image = data.data.display_url;
      setLoading(true);
      if (user && image) {
        await profileUpdate(name, image);
        setLoading(true);

        const user = {
          name,
          email,
          photo: image,
          premiumTaken: "no",
          roll: "normal",
        };
        const res = await axios.put("/users", user);
        if (res.data.createUser) {
          setLoading(false);
          toast.success(res.data.message);
          location.state ? navigate(location.form) : navigate("/");
        } else if (!res.data.createUser) {
          toast.success(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      }
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setLoading(false);
        toast.error("This email is already in use");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    await googleLogin().then(async (res1) => {
      const data = res1.user;
      const user = {
        name: data.displayName,
        email: data.email,
        photo: data.displayURL,
        premiumTaken: "no",
        roll: "normal",
      };

      const res = await axios.put("/users", user);
      if (res.data.createUser) {
        setLoading(false);
        toast.success("SignUp successful");
        location.state ? navigate(location.form) : navigate("/");
      }
    });
  };
  return (
    <section className="w-full xl:h-screen px-4 sm:px-7 lg:px-0  flex justify-center items-center">
      <div className="flex my-10 max-w-5xl  w-full mx-auto rounded-lg  shadow-md border border-gray-400 ">
        <div className="lg:flex-1 w-full p-6">
          <div className="flex flex-col sm:flex-row sm:gap-0 gap-6 sm:justify-between items-center mb-6">
            <p className="text-sm font-popins text-text_primary ">
              Have an account?.{" "}
              <Link
                to="/login"
                className="underline hover:text-secondary_color"
              >
                Login
              </Link>
            </p>
            <h1 className="text-3xl font-bold text-text">Sign Up</h1>
          </div>
          <form className="mt-5" onSubmit={handleSignUp}>
            <div className="flex sm:flex-row flex-col items-center gap-6">
              <Input
                name="name"
                type="text"
                color="teal"
                label="Name"
                required
              />
              <Input
                name="email"
                type="email"
                color="teal"
                label="Email"
                required
              />
            </div>
            <div className="mt-6">
              <input
                className="relative mb-1 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="imageUpload"
                name="image"
                required
              />
              <Typography variant="small" className="text-gray-600 ">
                upload your profile pic
              </Typography>
            </div>
            <div className="mt-6">
              <Input
                name="password"
                type="password"
                color="teal"
                label="Password"
                required
                autoComplete="current-password"
              />
              <div className="mt-2 flex gap-1  font-normal text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mt-px h-4 w-4 "
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">
                  <span
                    className={`${
                      error.passwordLength ? "text-red-500" : "inline-block"
                    }`}
                  >
                    Use at least 6 characters,
                  </span>
                  <span className={`${error.uppercase ? "text-red-500" : ""}`}>
                    one uppercase,
                  </span>{" "}
                  <span className={`${error.lowercase ? "text-red-500" : ""}`}>
                    one lowercase,
                  </span>{" "}
                  <span className={`${error.number ? "text-red-500" : ""}`}>
                    number
                  </span>{" "}
                  <span className={`${error.spacial ? "text-red-500" : ""}`}>
                    and one spacial character.
                  </span>{" "}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Checkbox
                name="trams"
                color="teal"
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium text-[12px] sm:text-base"
                  >
                    I agree with the&nbsp;
                    <span className="text-secondary_color">
                      terms and conditions
                    </span>
                    .
                  </Typography>
                }
              />
            </div>
            <Button
              disabled={loading}
              variant="filled"
              className="w-full bg-primary_color mt-5 flex items-center justify-center"
              type="submit"
            >
              {loading ? (
                <img
                  className="h-6"
                  src={loadingAnim}
                  alt="loading animation gif"
                />
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
          <div className="flex justify-center items-center">
            <h4 className="text-center mt-6 text-sm flex items-center gap-1 after:w-[50px] before:w-[50px]  after:block before:block sm:after:w-[160px] sm:before:w-[160px] after:h-[1px] after:bg-gray-500 before:h-[1px] before:bg-gray-500">
              Or sign up with
            </h4>
          </div>
          <div className="flex flex-col items-center gap-4 mt-5">
            <Button
              onClick={handleGoogleSignUp}
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
        <div className="lg:flex-1 hidden lg:block">
          <img src={authentication} alt="" />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
