import API from '../../utils/api';

const URL_PREFIX = '/api/mailer';

export const confirmService = {
    inviteMember,
    confirmMail,
};

function inviteMember(data) {       //data: {projectId, email}
  return API.post(`${URL_PREFIX}/sendEmail`, data);
}
function confirmMail (data) {
  return API.post(`${URL_PREFIX}/confirmEmail`, data);  //data: {confirmId, userId}
}