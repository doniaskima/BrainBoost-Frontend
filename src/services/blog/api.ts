import API from '../../utils/api';

const URL_PREFIX = '/api/blog';

export const blogService = {
  addBlog,
  getBlog,
  removeBlog,
  getBlogUser,
  updateBlog,
  getBlogsProject,
};

function addBlog(blog: any) {
  return API.post(`${URL_PREFIX}/addBlog`, blog);
}
function getBlog(data?: any) {
  return API.post(`${URL_PREFIX}/getBlog`, data);
}
function removeBlog(blogId: any) {
  return API.post(`${URL_PREFIX}/removeBlog`, { blogId: blogId });
}
function getBlogUser(blog: { userId: string }) {
  return API.post(`${URL_PREFIX}/getBlogUser`, blog);
}
function updateBlog(blog: any) {
  return API.post(`${URL_PREFIX}/updateBlog`, blog);
}
function getBlogsProject(projectId: string) {
  return API.get(`${URL_PREFIX}/getBlogsProject?projectId=${projectId}`);
}

