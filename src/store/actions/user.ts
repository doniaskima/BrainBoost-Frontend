export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";
export const FETCH_SAVED_MESSAGES_SUCCESS = 'FETCH_SAVED_MESSAGES_SUCCESS';
export const DELETE_SAVED_MESSAGE_SUCCESS = 'DELETE_SAVED_MESSAGE_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_RECIPIENTS_SUCCESS = 'FETCH_RECIPIENTS_SUCCESS';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';


export type User = {
  username: string;
  email: string;
  password: string;
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

export const fetchSavedMessagesSuccess = (messages: any): UserAction<any> => {
  return {
    type: FETCH_SAVED_MESSAGES_SUCCESS,
    payload: messages,
  };
};

export const fetchSavedMessages = (userId: string){
  return (dispatch:any) => {
    // Make API call to fetch saved messages
    // Example API call using fetch:
    fetch(`/users/savedMessages/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchSavedMessagesSuccess(data));
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };
};

export function deleteSavedMessageSuccess(): UserAction<never> {
  return {
    type: DELETE_SAVED_MESSAGE_SUCCESS,
  };
}

export function fetchRecipientsSuccess(recipients: any): UserAction<any> {
  return {
    type: FETCH_RECIPIENTS_SUCCESS,
    payload: recipients,
  };
}


export function fetchUserSuccess(user: User): UserAction<User> {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
}

export function fetchRecipients(userId: string) {
  return (dispatch: any) => {
    fetch(`/users/recipients/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipients');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchRecipientsSuccess(data));
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
}

export function fetchUserById(userId: string) {
  return (dispatch: any) => {
    fetch(`/users/get_by_Id/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchUserSuccess(data));
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
}

export function deleteSavedMessage(userId: string, messageId: string) {
  return (dispatch: any) => {
    fetch('/users/delete_saved_message', {
      method: 'DELETE',
      body: JSON.stringify({ userId, messageId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete saved message');
        }
        dispatch(deleteSavedMessageSuccess());
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };
}
