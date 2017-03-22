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
      return Object.assign({}, state, {currentRoom: action.roomKey, messages: {}});
    // Chat active users
    case types.CHAT_GET_ACTIVE_USER_SUCCESS: {
      const newUser = {};
      newUser[action.key] = action.content;
      return Object.assign(
        {},
        state,
        {activeUsers: Object.assign({}, state.activeUsers, newUser)}
      );
    }
    case types.CHAT_REMOVE_ACTIVE_USERS: {
      return Object.assign(
        {},
        state,
        {activeUsers: {}}
      );
    }
    case types.CHAT_ADD_CURRENT_USER_ACTIVE_ID:
      return Object.assign({}, state, {activeChatKey: action.activeChatKey});
    case types.CHAT_REMOVE_CURRENT_USER_ACTIVE_ID:
      return Object.assign({}, state, {activeChatKey: ''});
    // Chat messages
    case types.CHAT_GET_MESSAGE_SUCCESS: {
      const newMessage = {};
      newMessage[action.key] = action.content;
      return Object.assign(
        {},
        state,
        {messages: Object.assign({}, state.messages, newMessage)}
      );
    }
    case types.CHAT_STORE_TEMPORARY_MESSAGE:
      return Object.assign({}, state, {temporaryMessage: action.message});
    case types.CHAT_SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {temporaryMessage: ''});
    // Chat users
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
