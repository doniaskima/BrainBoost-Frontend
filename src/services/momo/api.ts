import API from '../../utils/api';

const URL_PREFIX = '/api/momo';

export const momoService = {
  payment,
  checkPayment,
};

function payment(amount: string, type: 'upgrade' | 'payment') {
  return API.get(`${URL_PREFIX}/payment?amount=${amount}&type=${type}`);
}
function checkPayment(data: any) {
  return API.post(`${URL_PREFIX}/checkPayment`, data);
}
