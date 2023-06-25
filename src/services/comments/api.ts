import API from '../../utils/api';

const URL_PREFIX = '/api/comment';
export const commentService = {
  addComment,
  deleteComment,
  updateComment,
};

function addComment(comment: any) {
  return API.post(`${URL_PREFIX}/addComment`, comment);
}
function deleteComment(comment: any) {
  return API.post(`${URL_PREFIX}/deleteComment`, comment);
}
function updateComment(comment) {
  return API.post(`${URL_PREFIX}/updateComment`, comment);
}
