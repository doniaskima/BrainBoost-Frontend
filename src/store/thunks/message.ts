import { Dispatch } from 'redux';
import {
  fetchMessages,
  fetchGroupMessages,
  deleteMessage as deleteMessageApi,
} from '..//../api/messageApi';

import { getMessages, getGroupMessages, deleteMessage, Message } from '../actions/message';

export const getMessagesThunk = (senderId: string, receiverId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const messages = await fetchMessages(senderId, receiverId);
      dispatch(getMessages(messages));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getGroupMessagesThunk = (userId: string, groupId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const messages = await fetchGroupMessages(userId, groupId);
      dispatch(getGroupMessages(messages));
    } catch (error) {
        console.log(error);
    }
  };
};

export const deleteMessageThunk = (messageId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await deleteMessageApi(messageId);
      dispatch(deleteMessage(messageId));
    } catch (error) {
        console.log(error);
    }
  };
};
