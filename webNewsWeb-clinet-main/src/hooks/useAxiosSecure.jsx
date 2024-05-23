import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  // baseURL: "https://web-news-wave-server-v1.vercel.app",
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          signOut(auth)
            .then()
            .catch((err) => console.log(err.message));
        }
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
