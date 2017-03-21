import * as firebase from 'firebase/firebase-browser';

import * as types from './actionTypes';

export const storeTemporaryMessage = message => ({ type: types.CHAT_STORE_TEMPORARY_MESSAGE, message });

export function sendMessageAsync(messageContent) {
  return (dispatch) => {
    dispatch(sendMessage());

    const messagesRef = firebase.database().ref('messages');
    const newMessage = messagesRef.push();

    newMessage.set(messageContent)
    .then(result => {
      dispatch(sendMessageSuccess(newMessage.key, messageContent));
    })
    .catch(error => {
      dispatch(sendMessageError(error));
    });
  };
}
export const sendMessage = () => ({ type: types.CHAT_SEND_MESSAGE });
export const sendMessageSuccess = (messageKey, messageContent) => (
  {type: types.CHAT_SEND_MESSAGE_SUCCESS, messageKey, messageContent}
);
export const sendMessageError = error => ({ type: types.CHAT_SEND_MESSAGE_ERROR, error });

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
