import API from '../../utils/api';
const URL_PREFIX = '/api/task';

export const taskService = {
  addTask,
  getTasks,
  getTaskGithub,
  updateTask,
  deleteTask,
  getTaskUser,
  getAllTaskUser,
  changeSection,
  addAssignment,
  deleteAssignment,
};

function addTask(data: {
  projectId: string;
  sectionId: string;
  name: string;
  dependencies?: string;
  description?: string;
  assignment?: Array<string>;
  files?: Array<string>;
  dueDate?: {
    from: Date;
    to: Date;
  };
  isDone?: boolean;
  labels?: Array<string>;
}) {
  if (!data.description) data.description = '';
  if (!data.dependencies) data.dependencies = null;
  if (!data.assignment) data.assignment = [];
  if (!data.files) data.files = [];
  if (data.isDone !== undefined) data.isDone = false;
  if (!data.dueDate)
    data.dueDate = {
      from: new Date(),
      to: new Date(),
    };
  return API.post(`${URL_PREFIX}/addTask`, data);
}
function getTaskGithub(projectId, sectionId) {
  return API.get(
    `${URL_PREFIX}/getTaskGithub?projectId=${projectId}&sectionId=${sectionId}`,
  );
}
function getTasks(projectId: string) {
  return API.get(`${URL_PREFIX}/getTasks?projectId=${projectId}`);
}
function updateTask(data: {
  taskId: string;
  projectId: string;
  dependencies?: string;
  assignment?: Array<string>;
  name?: string;
  file?: Array<string>;
  dueDate?: {
    from: Date;
    to: Date;
  };
  isDone?: boolean;
  labels?: Array<string>;
  description?: string;
}) {
  return API.post(`${URL_PREFIX}/updateTask`, data);
}
function deleteTask(data: { projectId: string; taskId: string }) {
  return API.post(`${URL_PREFIX}/deleteTask`, data);
}

function getTaskUser({ projectId, memberId }) {
  return API.post(`${URL_PREFIX}/getTaskUser`, { projectId, memberId });
}
function getAllTaskUser() {
  return API.post(`${URL_PREFIX}/getAllTaskUser`);
}
function changeSection(data: {
  projectId: string;
  taskId: string;
  sectionId1: string; //old
  sectionId2: string; //new
  index?: number;
}) {
  return API.post(`${URL_PREFIX}/changeSection`, data);
}
function addAssignment(data: {
  projectId: string;
  taskId: string;
  assignmentId: string;
}) {
  return API.post(`${URL_PREFIX}/addAssignment`, data);
}
function deleteAssignment(data: {
  projectId: string;
  taskId: string;
  assignmentId: string;
}) {
  return API.post(`${URL_PREFIX}/deleteAssignment`, data);
}
