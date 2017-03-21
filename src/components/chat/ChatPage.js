import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import checkAuth from '../requireAuth';
import MessagesThread from './MessagesThread.js';
import MessagesInput from './MessagesInput.js';
import RoomSelection from './RoomSelection.js';
import RoomCreation from './RoomCreation.js';
import OrSeparator from './OrSeparator.js';

class ChatPage extends Component {
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
      </div>
    );
  }
}

ChatPage.propTypes =  {
  currentRoom: PropTypes.string
};

function mapStateToProps(state) {
  return {
    currentRoom: state.chat.currentRoom
  };
}

export default connect(mapStateToProps)(checkAuth(ChatPage));
