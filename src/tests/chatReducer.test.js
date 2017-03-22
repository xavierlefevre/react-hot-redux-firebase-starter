import expect from 'expect';

import chatReducer from '../reducers/chatReducer';
import { getChatRoomsSuccess, storeTemporaryRoom } from '../actions/chatActions';

describe('chatReducer', () => {
  it('should add a new room after the pevious ones', () => {
    const inState = {
      otherStuff: 13,
      rooms: {
        room1: 'Earth topic'
      }
    };
    const action = getChatRoomsSuccess('room2', 'Moon subject');
    const outState = {
      otherStuff: 13,
      rooms: {
        room1: 'Earth topic',
        room2: 'Moon subject'
      }
    };
    expect(chatReducer(inState, action)).toEqual(outState);
  });

  it('should keep track of the currently typed new room', () => {
    const inState = {
      otherStuff: 13,
      rooms: {
        room1: 'Earth topic'
      },
      temporaryRoom: ''
    };
    const action = storeTemporaryRoom('room3');
    const outState = {
      otherStuff: 13,
      rooms: {
        room1: 'Earth topic'
      },
      temporaryRoom: 'room3'
    };
    expect(chatReducer(inState, action)).toEqual(outState);
  });
});
