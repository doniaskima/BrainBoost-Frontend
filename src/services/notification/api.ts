import API from '../../utils/api';

const URL_PREFIX = '/api/notification';
enum TypeNotification {
  task = 'task',
  post = 'post',
}

export const notificationServive = {
  getNotifications,
  sendNotifications,
  deleteNotification,
};

function getNotifications() {
  return API.get(`${URL_PREFIX}/getNotifications`);
}
function sendNotifications(data: {
  projectId: string;
  content: string;
  type: TypeNotification;
  toUserId: Array<string>;
  deadline?: { from: Date; to: Date };
}) {
  return API.post(`${URL_PREFIX}/sendNotifications`, data);
}
function deleteNotification(notificationId) {
  return API.post(`${URL_PREFIX}/deleteNotification`, {
    notificationId: notificationId,
  });
}
