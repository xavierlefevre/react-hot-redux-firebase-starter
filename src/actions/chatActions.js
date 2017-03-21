import * as firebase from 'firebase/firebase-browser';

import * as types from './actionTypes';

// Chat rooms
export const getChatRoomsSuccess = (key, content) => ({type: types.CHAT_GET_ROOMS_SUCCESS, key, content});

export const storeTemporaryRoom = title => ({ type: types.CHAT_STORE_TEMPORARY_ROOM, title });

export function createRoomAsync(content) {
  return (dispatch) => {
    const chatRoomsRef = firebase.database().ref('chatRooms');
    const newChatRoom = chatRoomsRef.push();

    newChatRoom.set(content)
    .then(result => {
      dispatch(createRoomSuccess());
    });
  };
}
export const createRoomSuccess = () => ({ type: types.CHAT_CREATE_ROOM_SUCCESS });

export const accessRoom = key => ({ type: types.CHAT_ACCESS_ROOM, key });

// Chat messages
export const storeTemporaryMessage = message => ({ type: types.CHAT_STORE_TEMPORARY_MESSAGE, message });

export function sendMessageAsync(content, roomKey) {
  return (dispatch) => {
    const messagesRef = firebase.database().ref('chatRooms/' + roomKey + '/messages');
    const newMessage = messagesRef.push();

    newMessage.set(content)
    .then(result => {
      dispatch(sendMessageSuccess());
    });
  };
}
export const sendMessageSuccess = () => ({type: types.CHAT_SEND_MESSAGE_SUCCESS});

export function getLastMessages() {
  return (dispatch) => {
    firebase
    .database()
    .ref('messages')
    .limitToLast(10)
    .once('value')
    .then(result => {
      dispatch(getLastMessagesSuccess(result.val()));
    })
    .catch(error => {
      dispatch(getLastMessagesSuccess(error));
    });
  };
}
export const getLastMessagesSuccess = (messages) => ({ type: types.CHAT_GET_LAST_MESSAGES_SUCCESS, messages });
export const getLastMessagesError = error => ({ type: types.CHAT_GET_LAST_MESSAGES_ERROR, error });

export const getUsersSuccess = (userKey, userContent) => (
  {type: types.CHAT_GET_USERS_SUCCESS, userKey, userContent}
);
