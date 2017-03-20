import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.CHAT_GET_MESSAGES_SUCCESS:
      return Object.assign({}, state, action.messages);
    default:
      return state;
  }
}
