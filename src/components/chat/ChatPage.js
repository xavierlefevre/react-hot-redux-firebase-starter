import React, { Component }  from 'react';
import {Link} from 'react-router';

import MessagesThread from './MessagesThread.js';
import checkAuth from '../requireAuth';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
        <MessagesThread />
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Type a message"
            id="textarea"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default checkAuth(ChatPage);
