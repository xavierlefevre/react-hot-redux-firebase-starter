import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatReducer(state = initialState.chat, action) {
  switch (action.type) {
    // Chat rooms
    case types.CHAT_GET_ROOMS_SUCCESS: {
      const newRoom = {};
      newRoom[action.key] = action.content;
      return Object.assign(
        {},
        state,
        {rooms: Object.assign({}, state.rooms, newRoom)}
      );
    }
    case types.CHAT_STORE_TEMPORARY_ROOM:
      return Object.assign({}, state, {temporaryRoom: action.title});
    case types.CHAT_CREATE_ROOM_SUCCESS:
      return Object.assign({}, state, {temporaryRoom: ''});
    case types.CHAT_ACCESS_ROOM:
      return Object.assign({}, state, {currentRoom: action.key, messages: {}});
    // Chat messages
    case types.CHAT_STORE_TEMPORARY_MESSAGE:
      return Object.assign({}, state, {temporaryMessage: action.message});
    case types.CHAT_GET_MESSAGE_SUCCESS: {
      const newMessage = {};
      newMessage[action.key] = action.content;
      return Object.assign(
        {},
        state,
        {messages: Object.assign({}, state.messages, newMessage)}
      );
    }
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
    case types.CHAT_GET_USERS_SUCCESS: {
      const newUser = {};
      newUser[action.userKey] = action.userContent;
      return Object.assign(
        {},
        state,
        {users: Object.assign({}, state.users, newUser)}
      );
    }
    default:
      return state;
  }
}
