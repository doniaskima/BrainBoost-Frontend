import {
    GET_MESSAGES,
    GET_GROUP_MESSAGES,
    DELETE_MESSAGE,
    MessageActionTypes,
    Message,
  } from '../actions/message';
  
  const initialState: Message[] = [];
  
  const messageReducer = (state = initialState, action: MessageActionTypes): Message[] => {
    switch (action.type) {
      case GET_MESSAGES:
        return action.messages;
      case GET_GROUP_MESSAGES:
        return action.messages;
      case DELETE_MESSAGE:
        return state.filter((message) => message.id !== action.messageId);
      default:
        return state;
    }
  };
  
  export default messageReducer;
  