import API from '../../utils/api';

const URL_PREFIX = '/api/chat';

export const chatService = {
  getChat,
  addChat,
  getListChat,
};

function getChat(project: any) {
  return API.post(`${URL_PREFIX}/getChat`, project);
}
function addChat(project: any) {
  return API.post(`${URL_PREFIX}/addChat`, project);
}
function getListChat() {
  return API.get(`${URL_PREFIX}/getListChat`);
}
