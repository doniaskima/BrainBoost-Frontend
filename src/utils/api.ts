import axios from 'axios';
import config from '../config';

// import { configureFakeBackend } from '../services/fake-backend';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
  withCredentials: true,
});

const requestHandler = (request: any) => {
  // Thêm token vào header nếu user vẫn tồn tại
  let valueToken = document.cookie.substring(6);
  request.headers['x-access-token'] = valueToken;
  return request;
};

const successHandler = (response: any) => {
  return response;
};

const errorHandler = (error: any) => {
  return Promise.reject({ ...error });
};

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error),
);

// configureFakeBackend(axiosInstance);

export default axiosInstance;
