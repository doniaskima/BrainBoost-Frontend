export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_SAVED_MESSAGES_SUCCESS = "GET_SAVED_MESSAGES_SUCCESS";
export const DELETE_SAVED_MESSAGE_SUCCESS = "DELETE_SAVED_MESSAGE_SUCCESS";
export const GET_RECIPIENTS_SUCCESS = "GET_RECIPIENTS_SUCCESS";
export const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
export const REMOVE_RECIPIENT = "REMOVE_RECIPIENT";
export const REMOVE_GROUP = "REMOVE_GROUP";

export type User = {
  username: string;
  email: string;
  password: string;
};

export type Message = {
  id: string;
  content: string;
  sender: User;
  timestamp: number;
};

export type Group = {
  id: string;
  name: string;
  members: User[];
};

export type Recipient = {
  id: string;
  name: string;
  email: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type UserAction<T> = {
  type: string;
  payload?: T;
};

export function login(credentials: Credentials): UserAction<Credentials> {
  return {
    type: LOGIN_USER,
    payload: credentials,
  };
}

export function logout(): UserAction<never> {
  return {
    type: LOGOUT_USER,
  };
}

export function setUser(user: User): UserAction<User> {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function resetUser(): UserAction<never> {
  return { type: RESET_USER };
}

export type UpdateUserSuccessAction = {
  type: typeof UPDATE_USER_SUCCESS;
};

export type DeleteUserSuccessAction = {
  type: typeof DELETE_USER_SUCCESS;
};

export type GetUserSuccessAction = {
  type: typeof GET_USER_SUCCESS;
  payload: User;
};

export type GetSavedMessagesSuccessAction = {
  type: typeof GET_SAVED_MESSAGES_SUCCESS;
  payload: Message[];
};

export type DeleteSavedMessageSuccessAction = {
  type: typeof DELETE_SAVED_MESSAGE_SUCCESS;
  payload: {
    userId: string;
    messageId: string;
  };
};

export type GetRecipientsSuccessAction = {
  type: typeof GET_RECIPIENTS_SUCCESS;
  payload: Recipient[];
};

export type GetGroupsSuccessAction = {
  type: typeof GET_GROUPS_SUCCESS;
  payload: Group[];
};

export type RemoveRecipientAction = {
  type: typeof REMOVE_RECIPIENT;
  recipientId: string;
};

export type RemoveGroupAction = {
  type: typeof REMOVE_GROUP;
  groupId: string;
};

export function updateUserSuccess(): UpdateUserSuccessAction {
  return {
    type: UPDATE_USER_SUCCESS,
  };
}

export function deleteUserSuccess(): DeleteUserSuccessAction {
  return {
    type: DELETE_USER_SUCCESS,
  };
}

export function getUserSuccess(user: User): GetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
}

export function getSavedMessagesSuccess(messages: Message[]): GetSavedMessagesSuccessAction {
  return {
    type: GET_SAVED_MESSAGES_SUCCESS,
    payload: messages,
  };
}

export function deleteSavedMessageSuccess(userId: string, messageId: string): DeleteSavedMessageSuccessAction {
  return {
    type: DELETE_SAVED_MESSAGE_SUCCESS,
    payload: {
      userId,
      messageId,
    },
  };
}

export function getRecipientsSuccess(recipients: Recipient[]): GetRecipientsSuccessAction {
  return {
    type: GET_RECIPIENTS_SUCCESS,
    payload: recipients,
  };
}

export function getGroupsSuccess(groups: Group[]): GetGroupsSuccessAction {
  return {
    type: GET_GROUPS_SUCCESS,
    payload: groups,
  };
}

export function removeRecipient(recipientId: string): RemoveRecipientAction {
  return {
    type: REMOVE_RECIPIENT,
    recipientId,
  };
}

export function removeGroup(groupId: string): RemoveGroupAction {
  return {
    type: REMOVE_GROUP,
    groupId,
  };
}
