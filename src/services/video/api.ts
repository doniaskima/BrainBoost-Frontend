import API from '../../utils/api';

const URL_PREFIX = '/api/video';

export const videoService = {
  addVideo,
};

function addVideo(video: any) {
  return API.post(`${URL_PREFIX}/addVideo`, video);
}
