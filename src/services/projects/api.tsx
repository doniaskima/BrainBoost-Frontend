import API from '../../utils/api';

const URL_PREFIX = '/api/project';

export const projectService = {
  addProject,
  deleteProject,
  getProject,
  getProjectById,
  getProjectJoined,
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