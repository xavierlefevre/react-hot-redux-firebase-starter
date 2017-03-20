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
          Object.keys(this.state.messages).map((messagesKey) => (
            <p key={messagesKey}>
              {this.state.messages[messagesKey].content}
            </p>
          ))
        }
      </div>
    );
  }
}
