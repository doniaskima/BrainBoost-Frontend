import axios from 'axios';
import config from './config';



const axiosInstance = axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
  withCredentials: true,
});

const requestHandler = (request: any) => {

  request.headers['x-access-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTAxNGM2NjFlYWFhOTNlNDQ3NmZlYSIsImlhdCI6MTY4ODMyMDI4NCwiZXhwIjoxNjg4NTc5NDg0fQ.RyEwG7JUXLvHRvltHvykVlE3yA_al5CA7k_RJz-Qetc";
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
