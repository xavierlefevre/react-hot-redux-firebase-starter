import React, { Component }  from 'react';
import {Link} from 'react-router';

import checkAuth from '../requireAuth';
import firebaseApi from '../../api/firebase';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    firebaseApi.GetValueOnce('messages').then(value => {
      console.log('value', value.val());
    });
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
