import { Credentials, User } from "../store/actions/user";
import http from "../services/httpService";

interface Recipient {
  id: string;
  name: string;
  // Add more properties as needed
}

interface Group {
  id: string;
  name: string;
  // Add more properties as needed
}

interface Message {
  id: string;
  content: string;
  // Add more properties as needed
}

const postLogin = (credentials: Credentials) =>
  http.post<{ user: User }>("/auth/login", credentials);

const sendResetPasswordLink = (email: string) =>
  http.post("/auth/login/forgot", { email });

const resetPassword = (password: string, token: string) =>
  http.post<void>(`/auth/login/reset/${token}`, { password });

const postLogout = () => http.post<void>("/auth/logout");

const postUser = (user: User) => http.post<void>("/user/register", user);

const getConfirmation = (token: string) =>
  http.get<void>(`/auth/confirmation/${token}`);

const resendConfirmation = (email: string) =>
  http.post<void>("/auth/send-confirmation", { email });

const resetRegister = (email: string) =>
  http.post<void>("/user/register/cancel", { email });

const getUser = () => http.get<{ user: User }>("/user");

const updateUser = (userId: string, data: Partial<User>) =>
  http.put<void>(`/users/update/${userId}`, data);

const deleteUser = (userId: string) => http.delete<void>(`/users/${userId}`);

const getUserById = (userId: string) =>
  http.get<{ user: User }>(`/users/get_by_Id/${userId}`);

const getSavedMessages = (userId: string) =>
  http.get<{ messages: Message[] }>(`/users/savedMessages/${userId}`);

const deleteSavedMessage = (userId: string, messageId: string) =>
  http.delete<void>(`/users/delete_saved_message`, {
    data: { userId, messageId },
  });

const getRecipients = (userId: string) =>
  http.get<{ recipients: Recipient[] }>(`/users/recipients/${userId}`);

const getGroups = (userId: string) =>
  http.get<{ groups: Group[] }>(`/users/groups/${userId}`);

const updateUserDetails = (userId: string, data: Partial<User>) =>
  http.put<void>(`/users/update/${userId}`, data);

const deleteUserById = (userId: string) =>
  http.delete<void>(`/users/${userId}`);



const getMessages = (senderId: string, receiverId: string) =>
  http.get<{ messages: Message[] }>(`/users/messages/${senderId}/${receiverId}`);

const getGroupMessages = (userId: string, groupId: string) =>
  http.get<{ messages: Message[] }>(`/groups/messages/${userId}/${groupId}`);

const deleteMessage = (messageId: string) =>
  http.delete<void>(`/messages/${messageId}`);

  
const fetchGroupMembers = (groupId: string) =>
http.get<{ members: User[] }>(`/groups/members/${groupId}`);

const createGroup = (adminId: string, groupName: string, isPublic: boolean, description: string) =>
http.post<{ group: Group }>(`/groups/create`, { adminId, groupName, isPublic, description });

const addMemberToGroup = (email: string, groupId: string) =>
http.post<void>(`/groups/add_member`, { email, groupId });

const updateGroup = (groupId: string, name: string, description: string, isPublic: boolean) =>
http.put<void>(`/groups/update_group`, { groupId, name, description, isPublic });

const removeMemberFromGroup = (memberId: string, groupId: string) =>
http.post<void>(`/groups/remove_member`, { memberId, groupId });

const deleteGroup = (groupId: string) =>
http.delete<void>(`/groups/${groupId}`);

export {
  postLogin,
  sendResetPasswordLink,
  resetPassword,
  postLogout,
  postUser,
  getConfirmation,
  resendConfirmation,
  getUser,
  resetRegister,
  updateUser,
  deleteUser,
  getUserById,
  getSavedMessages,
  deleteSavedMessage,
  getRecipients,
  getGroups,
  updateUserDetails,
  deleteUserById,
  getMessages,
  getGroupMessages,
  deleteMessage,
  fetchGroupMembers,
  createGroup,
  addMemberToGroup,
  updateGroup,
  removeMemberFromGroup,
  deleteGroup,
};