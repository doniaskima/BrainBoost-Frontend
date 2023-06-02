import { Message } from '../store/actions/message';
import httpService from '../services/httpService';
import { AxiosResponse } from 'axios';

const http = httpService;

const fetchMessages = async (senderId: string, receiverId: string): Promise<Message[]> => {
  try {
    const response: AxiosResponse<Message[]> = await http.post('/messages/get_messages', { senderId, receiverId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchGroupMessages = async (userId: string, groupId: string): Promise<Message[]> => {
  try {
    const response: AxiosResponse<Message[]> = await http.post('/messages/get_group_messages', { userId, groupId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    await http.delete(`/messages/${messageId}`);
  } catch (error) {
    throw error;
  }
};

export {
  fetchMessages,
  fetchGroupMessages,
  deleteMessage
};
