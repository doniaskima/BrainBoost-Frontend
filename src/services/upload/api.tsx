import API from '../../utils/api';

const URL_PREFIX = '/api/upload';

export const uploadService = {
  uploadFile,
};

function uploadFile(data: any) {
  return API.post(`${URL_PREFIX}/`, data);
}
