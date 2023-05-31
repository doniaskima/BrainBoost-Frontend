import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER,
  RESET_USER,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_SAVED_MESSAGES_SUCCESS,
  DELETE_SAVED_MESSAGE_SUCCESS,
  GET_RECIPIENTS_SUCCESS,
  GET_GROUPS_SUCCESS,
  UserAction,
  User,
  Group,
  Recipient,
  Message,
} from "../actions/user";

export type UserState = {
  isAuth: boolean;
  user: User | null;
  savedMessages: Message[];
  recipients: Recipient[];
  groups: Group[];
};

const initialState: UserState = {
  isAuth: false,
  user: null,
  savedMessages: [],
  recipients: [],
  groups: [],
};

export default function user(
  state = initialState,
  action: UserAction<any>
): UserState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuth: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case RESET_USER:
      return initialState;
    case UPDATE_USER_SUCCESS:
      return state; // No state update required for this action
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case GET_SAVED_MESSAGES_SUCCESS:
      return {
        ...state,
        savedMessages: action.payload,
      };
    case DELETE_SAVED_MESSAGE_SUCCESS:
      const { userId, messageId } = action.payload;
      return {
        ...state,
        savedMessages: state.savedMessages.filter(
          (message) => message.id !== messageId
        ),
      };
    case GET_RECIPIENTS_SUCCESS:
      return {
        ...state,
        recipients: action.payload,
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };
    default:
      return state;
  }
}
