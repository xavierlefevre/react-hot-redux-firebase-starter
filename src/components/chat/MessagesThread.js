import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {accessRoom} from '../../actions/chatActions';

class MessagesThread extends Component {
  render() {
    const messages = this.props.rooms[this.props.currentRoom].messages;
    return (
      <div>
        <div
          onClick={() => this.props.accessRoom()}
        >
          <p>Back</p>
        </div>
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
  users: PropTypes.object,
  accessRoom: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    rooms: state.chat.rooms,
    users: state.chat.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accessRoom: bindActionCreators(accessRoom, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesThread);
