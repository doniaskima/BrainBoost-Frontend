import API from '../../utils/api';

const URL_PREFIX = '/api/project';

export const projectService = {
  addProject,
  deleteProject,
  getProject,
  getProjectById,
  getUsers,
  getProjectJoined,
  getUserJoin,
  setAdmin,
  dropAdmin,
  deleteMember,
  analysis,
  getLabels,
  getAllTasks,
  inviteJoinProject,
  joinProject,
  getAllTraining,
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
function getUserJoin(projectId) {
  return API.post(`${URL_PREFIX}/getUserJoin`, projectId);
}
function setAdmin({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/setAdmin`, { projectId, memberId });
}
function dropAdmin({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/dropAdmin`, { projectId, memberId });
}
function deleteMember(data: { projectId; memberId }) {
  return API.post(`${URL_PREFIX}/deleteMember`, data);
}
function getUsers(projectId: string) {
  return API.get(`${URL_PREFIX}/getUsers?projectId=${projectId}`);
}
function analysis(data: { projectId: string }) {
  return API.post(`${URL_PREFIX}/analysis`, data);
}
function getLabels(projectId: string) {
  return API.get(`${URL_PREFIX}/getLabels?projectId=${projectId}`);
}
function getAllTasks(projectId: string) {
  return API.get(`${URL_PREFIX}/getAllTasks?projectId=${projectId}`);
}
function inviteJoinProject(data: { projectId: string; emailInvite: string }) {
  return API.post(`${URL_PREFIX}/inviteJoinProject`, data);
}
function joinProject(data: { notificationId: string; status: boolean }) {
  return API.post(`${URL_PREFIX}/joinProject`, data);
}
function getAllTraining(projectId: string) {
  return API.get(`${URL_PREFIX}/getAllTraining?projectId=${projectId}`);
}
