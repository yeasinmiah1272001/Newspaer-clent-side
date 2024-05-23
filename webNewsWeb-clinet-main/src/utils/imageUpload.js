import axios from "axios";

const imageUpload = (formData) => {
  const res = axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_API_KEY
    }`,
    formData
  );
  return res;
};

export default imageUpload;
