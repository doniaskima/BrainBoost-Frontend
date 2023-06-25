import API from '../../utils/api';

const URL_PREFIX = '/api/section';

export const sectionService = {
  addSection,
  getSections,
  updateSection,
  deleteSection,
};

function addSection(data: { projectId: string; name: string }) {
  return API.post(`${URL_PREFIX}/addSection`, data);
}
function getSections(projectId: string) {
  return API.get(`${URL_PREFIX}/getSections?projectId=${projectId}`);
}
function updateSection(data: {
  projectId: string;
  sectionId: string;
  name: string;
}) {
  return API.post(`${URL_PREFIX}/updateNameSection`, data);
}
function deleteSection(data: { projectId: string; sectionId: string }) {
  return API.post(`${URL_PREFIX}/deleteSection`, data);
}
