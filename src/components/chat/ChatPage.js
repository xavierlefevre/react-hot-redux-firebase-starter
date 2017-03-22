import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import checkAuth from '../requireAuth';
import {getUsersSuccess} from '../../actions/chatActions';

import ChatHeader from './ChatHeader.js';
import MessagesThread from './MessagesThread.js';
import MessagesInput from './MessagesInput.js';
import RoomSelection from './RoomSelection.js';
import RoomCreation from './RoomCreation.js';
import OrSeparator from './OrSeparator.js';
import ActiveUsers from './ActiveUsers.js';

class ChatPage extends Component {
  componentWillMount() {
    const usersRef = firebase.database().ref('users');
    usersRef.on('child_added', data => {
      this.props.getUsersSuccess(data.key, data.val());
    });
  }

  render() {
    return !this.props.currentRoom
      ? (
      <div className="flex-column main-container">
        <div className="flex-row room-container">
          <RoomSelection />
          <OrSeparator />
          <RoomCreation />
        </div>
      </div>
      ) : (
      <div className="flex-column main-container">
        <div>
          <ChatHeader />
          <div className="flex-row">
            <div>
              <MessagesThread />
              <MessagesInput />
            </div>
            <ActiveUsers />
          </div>
        </div>
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
    getUsersSuccess: bindActionCreators(getUsersSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ChatPage));
