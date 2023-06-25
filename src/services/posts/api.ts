import API from '../../utils/api';

const URL_PREFIX = '/api/post';

export const postService = {
  addPost,
  updatePost,
  deletePost,
  getComment,
  getPosts,
};
function getPosts(projectId: any) {
  return API.get(`${URL_PREFIX}/getPost?projectId=${projectId}`);
}
function addPost(post: any) {
  return API.post(`${URL_PREFIX}/addPost`, post);
}
function updatePost(post: any) {
  return API.post(`${URL_PREFIX}/updatePost`, post);
}
function deletePost(post) {
  return API.post(`${URL_PREFIX}/deletePost`, post);
}
function getComment(post) {
  return API.post(`${URL_PREFIX}/getComment`, post);
}
