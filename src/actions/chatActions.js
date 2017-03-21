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
export const getMessageSuccess = (key, content) => ({ type: types.CHAT_GET_MESSAGE_SUCCESS, key, content });

export const storeTemporaryMessage = message => ({ type: types.CHAT_STORE_TEMPORARY_MESSAGE, message });

export function sendMessageAsync(content, roomKey) {
  return (dispatch) => {
    const messagesRef = firebase.database().ref('messages/' + roomKey);
    const newMessage = messagesRef.push();

    newMessage.set(content)
    .then(result => {
      dispatch(sendMessageSuccess());
    });
  };
}
export const sendMessageSuccess = () => ({type: types.CHAT_SEND_MESSAGE_SUCCESS});

// Chat users
export const getUsersSuccess = (userKey, userContent) => (
  {type: types.CHAT_GET_USERS_SUCCESS, userKey, userContent}
);
