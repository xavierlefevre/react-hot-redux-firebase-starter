import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';

class MessagesThread extends Component {
  render() {
    const messages = this.props.rooms[this.props.currentRoom].messages;
    return (
      <div>
        {
          messages
          && Object.keys(messages).length > 0
          && Object.keys(messages)
          .map((messagesKey) => (
            <p key={messagesKey}>
              {this.props.users[messages[messagesKey].userID].email} - {messages[messagesKey].content}
            </p>
          ))
        }
      </div>
    );
  }
}

MessagesThread.propTypes =  {
  currentRoom: PropTypes.string,
  rooms: PropTypes.object,
  users: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    rooms: state.chat.rooms,
    users: state.chat.users
  };
}

export default connect(mapStateToProps)(MessagesThread);
