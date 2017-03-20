import * as firebase from 'firebase/firebase-browser';

import * as types from './actionTypes';

export function sendMessage(messageContent) {
  return (dispatch) => {
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
export const sendMessageSuccess = (messageKey, messageContent) => (
  {type: types.CHAT_SEND_MESSAGE_SUCCESS, messageKey, messageContent}
);
export const sendMessageError = error => ({ type: types.CHAT_SEND_MESSAGE_ERROR, error });

export function getMessages() {
  return (dispatch) => {
    firebase
    .database()
    .ref('messages')
    .once('value')
    .then(result => {
      dispatch(getMessagesSuccess(result.val()));
    })
    .catch(error => {
      dispatch(getMessagesSuccess(error));
    });
  };
}
export const getMessagesSuccess = (messages) => ({ type: types.CHAT_GET_MESSAGES_SUCCESS, messages });
export const getMessagesError = error => ({ type: types.CHAT_GET_MESSAGES_ERROR, error });
