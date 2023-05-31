import { LOGIN_USER,
  LOGOUT_USER, 
  SET_USER,
  RESET_USER,
  UserAction,
  User,
  FETCH_SAVED_MESSAGES_SUCCESS,
  DELETE_SAVED_MESSAGE_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_GROUPS_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from "../actions/user";


export type UserState = {
  isAuth: boolean;
  user: User | null;
  savedMessages: any[]; // Update the type based on your data structure
  recipients: any[]; // Update the type based on your data structure
};

const initialState: UserState = {
  isAuth: false,
  user: null,
  savedMessages: [],
  recipients: [],
};

export default function user(state = initialState, action: UserAction<any>): UserState {
  switch (action.type) {
    case LOGIN_USER:
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case LOGOUT_USER:
    case RESET_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case FETCH_SAVED_MESSAGES_SUCCESS:
      return {
        ...state,
        savedMessages: action.payload,
      };
    case DELETE_SAVED_MESSAGE_SUCCESS:
      // Update the savedMessages state by removing the deleted message
      const updatedSavedMessages = state.savedMessages.filter(
        (message) => message.messageId !== action.payload
      );
      return {
        ...state,
        savedMessages: updatedSavedMessages,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_RECIPIENTS_SUCCESS:
      return {
        ...state,
        recipients: action.payload,
      };
    case FETCH_GROUPS_SUCCESS:
      // Handle FETCH_GROUPS_SUCCESS action if needed
      return state;
    case UPDATE_USER_SUCCESS:
      // Handle UPDATE_USER_SUCCESS action if needed
      return state;
    case DELETE_USER_SUCCESS:
      // Handle DELETE_USER_SUCCESS action if needed
      return state;
    default:
      return state;
  }
}