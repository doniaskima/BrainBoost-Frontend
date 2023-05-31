import { Credentials, User } from "../store/actions/user";
import http from "../services/httpService";

const postLogin = (credentials: Credentials) =>
  http.post<{ user: User }>("/auth/login", credentials);

const sendResetPasswordLink = (email: string) => http.post("/auth/login/forgot", { email });

const resetPassword = (password: string, token: string) =>
  http.post<void>(`/auth/login/reset/${token}`, { password });

const postLogout = () => http.post<void>("/auth/logout");

const postUser = (user: User) => http.post<void>("/user/register", user);

const getConfirmation = (token: string) => http.get<void>(`/auth/confirmation/${token}`);

const resendConfirmation = (email: string) => http.post<void>("/auth/send-confirmation", { email });

const resetRegister = (email: string) => http.post<void>("/user/register/cancel", { email });

const getUser = () => http.get<{ user: User }>("/user");

const getUserById = (userId: string) => http.get<{ user: User }>(`/users/get_by_Id/${userId}`);

const getSavedMessages = (userId: string) => http.get(`/users/savedMessages/${userId}`);

const deleteSavedMessage = (userId: string, messageId: string) =>
  http.delete(`/users/delete_saved_message`, { data: { userId, messageId } });

const getRecipients = (userId: string) => http.get(`/users/recipients/${userId}`);

const getGroupsByUser = (userId: string) => http.get(`/users/groups/${userId}`);

const updateUserDetails = (userId: string, userDetails: Partial<User>) =>
  http.put(`/users/update/${userId}`, userDetails);

const deleteUser = (userId: string) => http.delete(`/users/${userId}`);

export {
  postLogin,
  getUser,
  sendResetPasswordLink,
  resetPassword,
  postLogout,
  postUser,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  getUserById,
  getSavedMessages,
  deleteSavedMessage,
  getRecipients,
  getGroupsByUser,
  updateUserDetails,
  deleteUser,
};
