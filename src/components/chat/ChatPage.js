import React, { Component }  from 'react';

import checkAuth from '../requireAuth';
import MessagesThread from './MessagesThread.js';
import MessagesInput from './MessagesInput.js';
import RoomSelection from './RoomSelection.js';
import RoomCreation from './RoomCreation.js';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showRooms: true };
  }

  render() {
    return this.state.showRooms
      ? (
      <div>
        <h1>Chat</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <RoomSelection />
          <p>OR</p>
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

export default checkAuth(ChatPage);
