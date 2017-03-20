import React, { Component }  from 'react';

import firebaseApi from '../../api/firebase';

export default class MessagesThread extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    firebaseApi.GetValueOnce('messages').then(value => {
      this.setState({messages: value.val()});
    });
  }

  render() {
    return (
      <div>
        {
          this.state.messages.map((messages) => (
            <p key={messages.id}>{messages.content}</p>
          ))
        }
      </div>
    );
  }
}
