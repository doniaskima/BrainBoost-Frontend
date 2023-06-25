import API from '../../utils/api';

const URL_PREFIX = '/api/labels';
export const labelsService = {
  getLabel,
  addLable,
  updateLabel,
  deleteLabel,
};

function getLabel(projectId: string, labelId: string) {
  return API.post(
    `${URL_PREFIX}/getLabel?projectId=${projectId}&labelId=${labelId}`,
  );
}

function addLable(data: {
  projectId: string;
  name: string;
  color?: string;
  description: string;
}) {
  return API.post(`${URL_PREFIX}/addLabel`, data);
}

function updateLabel(data: {
  projectId: string;
  labelId: string;
  color?: string;
  name?: string;
  description?: string;
}) {
  return API.post(`${URL_PREFIX}/updateLabel`, data);
}

function deleteLabel(data: { projectId: string; labelId: string }) {
  return API.post(`${URL_PREFIX}/deleteLabel`, data);
}
