import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3900/api`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  }
);

const httpService = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

export default httpService;