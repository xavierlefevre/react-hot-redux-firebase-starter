import firebaseApi from '../api/firebase';
import * as types from './actionTypes';

export function sendMessage(message) {
  return (dispatch) => {
    const {date, content, user} = message;
    firebaseApi.databaseSet('messages/' + message.id, {
      content,
      date,
      user
    })
    .then(result => {
      dispatch(sendMessageSuccess());
    })
    .catch(error => {
      dispatch(sendMessageError(error));
    });
  };
}
export const sendMessageSuccess = () => ({ type: types.CHAT_SEND_MESSAGE_SUCCESS });
export const sendMessageError = () => ({ type: types.CHAT_SEND_MESSAGE_ERROR });

export function getMessages() {
  return (dispatch) => {
    firebaseApi.GetValueOnce('messages')
    .then(result => {
      dispatch(getMessagesSuccess(result.val()));
    })
    .catch(error => {
      dispatch(getMessagesSuccess(error));
    });
  };
}
export const getMessagesSuccess = (messages) => ({ type: types.CHAT_GET_MESSAGES_SUCCESS, messages });
export const getMessagesError = () => ({ type: types.CHAT_GET_MESSAGES_ERROR });
