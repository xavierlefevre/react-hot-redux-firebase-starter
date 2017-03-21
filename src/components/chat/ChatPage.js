import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import checkAuth from '../requireAuth';
import {getUsersSuccess, getChatRoomsSuccess} from '../../actions/chatActions';

import MessagesThread from './MessagesThread.js';
import MessagesInput from './MessagesInput.js';
import RoomSelection from './RoomSelection.js';
import RoomCreation from './RoomCreation.js';
import OrSeparator from './OrSeparator.js';

class ChatPage extends Component {
  componentWillMount() {
    const usersRef = firebase.database().ref('users');
    usersRef.on('child_added', data => {
      this.props.getUsersSuccess(data.key, data.val());
    });

    const chatRoomsRef = firebase.database().ref('chatRooms');
    chatRoomsRef.on('child_added', data => {
      this.props.getChatRoomsSuccess(data.key, data.val());
    });
  }

  render() {
    return !this.props.currentRoom
      ? (
      <div>
        <h1>Chat</h1>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
          <RoomSelection />
          <OrSeparator />
          <RoomCreation />
        </div>
      </div>
      ) : (
      <div>
        <h1>Chat - Discuss</h1>
        <MessagesThread />
        <MessagesInput />
      </div>
    );
  }
}

ChatPage.propTypes =  {
  currentRoom: PropTypes.string,
  getUsersSuccess: PropTypes.func,
  getChatRoomsSuccess: PropTypes.func
};

function mapStateToProps(state) {
  return {
    currentRoom: state.chat.currentRoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsersSuccess: bindActionCreators(getUsersSuccess, dispatch),
    getChatRoomsSuccess: bindActionCreators(getChatRoomsSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ChatPage));
