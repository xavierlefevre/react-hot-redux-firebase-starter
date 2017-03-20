import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.CHAT_GET_MESSAGES_SUCCESS:
      return Object.assign({}, state, action.messages);
    case types.CHAT_SEND_MESSAGE_SUCCESS: {
      const newMessage = {};
      newMessage[action.messageKey] = action.messageContent;
      return Object.assign({}, state, newMessage);
    }
    default:
      return state;
  }
}
