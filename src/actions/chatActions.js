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
    .then(
      (result) => {
        dispatch(sendMessageSuccess());
      })
    .catch(
      error => {
        throw(error);
      });
  };
}

export function sendMessageSuccess() {
  return {
    type: types.CHAT_SEND_MESSAGE_SUCCESS
  };
}
