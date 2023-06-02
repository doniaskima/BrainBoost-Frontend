export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_GROUP_MESSAGES = 'GET_GROUP_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export interface Message {
  id: string;
  content: string;
  sender: string;
  receiver: string;
}

export interface GetMessagesAction {
  type: typeof GET_MESSAGES;
  messages: Message[];
}

export interface GetGroupMessagesAction {
  type: typeof GET_GROUP_MESSAGES;
  messages: Message[];
}

export interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  messageId: string;
}

export type MessageActionTypes = GetMessagesAction | GetGroupMessagesAction | DeleteMessageAction;

export function getMessages(messages: Message[]): GetMessagesAction {
  return {
    type: GET_MESSAGES,
    messages,
  };
}

export function getGroupMessages(messages: Message[]): GetGroupMessagesAction {
  return {
    type: GET_GROUP_MESSAGES,
    messages,
  };
}

export function deleteMessage(messageId: string): DeleteMessageAction {
  return {
    type: DELETE_MESSAGE,
    messageId,
  };
}
