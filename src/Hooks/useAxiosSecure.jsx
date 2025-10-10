import axios from "axios";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://learningzone-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
