import axios from "axios";
import moment from "moment";
const axiosSecure = axios.create({
  baseURL: "https://web-news-wave-server-v1.vercel.app",
  withCredentials: true,
  // baseURL: "http://localhost:5000",
});
const subscriptionChecker = (data, refetch, user) => {
  if (data && user) {
    const subScriptionTime = moment(data.time, "YYYY-MM-DD HH:mm:ss");
    const currentDateTime = moment(moment().format("YYYY-MM-DD HH:mm:ss"));

    if (!currentDateTime.isBefore(subScriptionTime)) {
      const update = async () => {
        const res = await axiosSecure.patch(
          `/user/${user?.email}`,

          {
            premiumTaken: "no",
          }
        );
        if (res.data.success) {
          refetch();
        }
      };
      update();
    }
  }
};

export default subscriptionChecker;
