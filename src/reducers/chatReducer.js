import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatReducer(state = initialState.chat, action) {
  switch (action.type) {
    case types.CHAT_STORE_TEMPORARY_MESSAGE:
      return Object.assign({}, state, {temporaryMessage: action.message});
    case types.CHAT_GET_LAST_MESSAGES_SUCCESS:
      return Object.assign({}, state, {messages: action.messages, firstBatchLoaded: true});
    case types.CHAT_SEND_MESSAGE:
      return Object.assign({}, state, {loading: true});
    case types.CHAT_SEND_MESSAGE_SUCCESS: {
      const newMessage = {};
      newMessage[action.messageKey] = action.messageContent;
      return Object.assign(
        {},
        state,
        {messages: Object.assign({}, state.messages, newMessage), loading: false, temporaryMessage: ''}
      );
    }
    default:
      return state;
  }
}
