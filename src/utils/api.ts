import axios from 'axios';
import config from './config';



const axiosInstance = axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
  withCredentials: true,
});

const requestHandler = (request: any) => {

  request.headers['x-access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTcyMWRkZjViYTM2MDlmNGYxNDQyOCIsImlhdCI6MTY4NzYyNjI3MCwiZXhwIjoxNjg3ODg1NDcwfQ.yzbqhz0hI9o6JF58YpsOf9F0UnXmkhZE9Mlabqx5Vh8";
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
