import React, { Component }  from 'react';

import checkAuth from '../requireAuth';
import MessagesThread from './MessagesThread.js';
import MessagesInput from './MessagesInput.js';

class ChatPage extends Component {
  render() {
    return (
      <div>
        <h1>Chat</h1>
        <MessagesThread />
        <MessagesInput />
      </div>
    );
  }
}

export default checkAuth(ChatPage);
