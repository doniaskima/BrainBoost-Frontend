import API from '../../utils/api';

const URL_PREFIX = '/api/project';

const projectService = {
  addProject,
  deleteProject,
  getProject,
  getProjectById,
  getProjectJoined,
  setToken, // Add the setToken method
};

function addProject(project: any) {
  return API.post(`${URL_PREFIX}/addProject`, project);
}

function deleteProject(project: any) {
  return API.post(`${URL_PREFIX}/deleteProject`, project);
}

function getProject() {
  return API.get(`${URL_PREFIX}/getProject`);
}

function getProjectById(projectId: any) {
  return API.post(`${URL_PREFIX}/getProjectById`, projectId);
}

function getProjectJoined() {
  return API.post(`${URL_PREFIX}/getProjectJoined`);
}

function setToken(token: string) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default projectService;
