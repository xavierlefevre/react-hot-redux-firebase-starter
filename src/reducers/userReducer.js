import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOADED_SUCCESS:
      return Object.assign({}, state, action.user);
    case types.USER_IS_ADMIN_SUCCESS:
      return Object.assign({}, state, {isAdmin: true});
    case types.AUTH_LOGGED_OUT_SUCCESS:
      return initialState.user;
    case types.CHAT_ADD_CURRENT_USER_ACTIVE_ID:
      return Object.assign({}, state, {activeChatKey: action.activeChatKey});
    case types.CHAT_REMOVE_CURRENT_USER_ACTIVE_ID:
      return Object.assign({}, state, {activeChatKey: ''});
    default:
      return state;
  }
}
