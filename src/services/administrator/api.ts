import API from '../../utils/api';
import { TypeContent } from '../../views/administrators/interface';

const URL_PREFIX = '/api/administrator';

export const administratorService = {
  getAllUser,
  changeIsActive,
  getAllBlog,
  handleStatus,
  requestWithdrawal,
  getRequestWithdrawal,
  changeStatusBlog,
};

function getAllBlog() {
  return API.get(`${URL_PREFIX}/getAllBlog`);
}

function getAllUser() {
  return API.get(`${URL_PREFIX}/getAllUser`);
}
function changeIsActive(data: { memberId: string; isActive: boolean }) {
  return API.post(`${URL_PREFIX}/changeIsActive`, data);
}
function handleStatus(data: {
  _id: string;
  status: boolean;
  type: TypeContent;
}) {
  return API.post(`${URL_PREFIX}/handleStatus`, data);
}
function requestWithdrawal(data: { amount: number; numberPhone: string }) {
  return API.post(`${URL_PREFIX}/requestWithdrawal`, data);
}
function getRequestWithdrawal() {
  return API.get(`${URL_PREFIX}/getRequestWithdrawal`);
}
function changeStatusBlog(data: { administratorId: string; status: number }) {
  return API.post(`${URL_PREFIX}/changeStatusBlog`, data);
}
