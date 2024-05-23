import { Button, Input, Typography } from "@material-tailwind/react";
import Title from "../../components/title/Title";
import Container from "../../components/container/Container";
import useAuth from "../../hooks/useAuth";
import imageUpload from "../../utils/imageUpload";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
  const { user, profileUpdate } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const file = form.image.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await imageUpload(formData);
    const image = data.data.display_url;
    await profileUpdate(name, image).then(() => {
      axiosSecure
        .patch(`/user/${user?.email}`, {
          name,
          photo: image,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
          }
        });
    });
  };
  return (
    <section className="my-20">
      <Container>
        <div className="flex gap-6 lg:flex-row  flex-col ">
          <div className=" bg-white shadow-sm p-6 border-2 border-gray-200 2xl:w-2/5 lg:w-1/2 w-full  flex gap-6 items-center">
            <div className="">
              <img className="" src={user?.photoURL} alt={user?.displayName} />
            </div>
            <div>
              <h2 className="font-bold text-xl text-text_primary">
                {user?.displayName}
              </h2>
              <h3>{user?.email}</h3>
            </div>
          </div>
          <form
            onSubmit={handleUpdateProfile}
            className="shadow-sm border-2 border-gray-200 rounded-md bg-white w-full p-6"
          >
            <div>
              <Title>Update Profile</Title>
            </div>
            <div className="mt-6 flex gap-6 items-center w-full lg:flex-row flex-col">
              <div className="w-full">
                <label>Name:</label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="!border mt-2 w-full !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
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
            <Button type="submit" className="mt-6 w-full bg-primary_color">
              Update Profile
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Profile;
