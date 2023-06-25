import API from '../../utils/api';

const URL_PREFIX = '/api/user';

export const userService = {
  getUser,
  signUp,
  login,
  logOut,
  getUserInfo,
  updateUser,
  changePassword,
  getUserId,
  getUserCurrent,
};

function signUp(user: any) {
  return API.post(`${URL_PREFIX}/signup`, user);
}
function getUserId() {
  return API.get(`${URL_PREFIX}/getUserId`);
}
function login(user: any) {
  return API.post(`${URL_PREFIX}/login`, user);
}
function getUser() {
  return API.get(`${URL_PREFIX}/getUserId`);
}
function logOut() {
  return API.get(`${URL_PREFIX}/logout`);
}
function getUserInfo(userId?: string) {
  return API.get(`${URL_PREFIX}/getUserInfo?userId=${userId}`);
}
function getUserCurrent() {
  return API.get(`${URL_PREFIX}/getUserCurrent`);
}
function updateUser(user: any) {
  return API.post(`${URL_PREFIX}/update`, user);
}
function changePassword(data: any) {
  return API.post(`${URL_PREFIX}/changePassword`, data);
}
