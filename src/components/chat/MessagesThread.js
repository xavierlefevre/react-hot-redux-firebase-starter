import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {accessRoom, getMessageSuccess} from '../../actions/chatActions';

class MessagesThread extends Component {
  componentWillMount() {
    const chatRoomsRef = firebase.database().ref('messages/' + this.props.currentRoom);
    chatRoomsRef.on('child_added', data => {
      this.props.getMessageSuccess(data.key, data.val());
    });
  }

  render() {
    return (
      <div>
        <div onClick={() => this.props.accessRoom()}>
          <p>Back</p>
        </div>
        {
          this.props.messages
          && Object.keys(this.props.messages).length > 0
          && Object.keys(this.props.messages)
          .map((messagesKey) => (
            <p key={messagesKey}>
              {this.props.users[this.props.messages[messagesKey].userID].email} - {this.props.messages[messagesKey].content}
            </p>
          ))
        }
      </div>
    );
  }
}

MessagesThread.propTypes =  {
  currentRoom: PropTypes.string,
  messages: PropTypes.object,
  users: PropTypes.object,
  accessRoom: PropTypes.func,
  getMessageSuccess: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    messages: state.chat.messages,
    users: state.chat.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accessRoom: bindActionCreators(accessRoom, dispatch),
    getMessageSuccess: bindActionCreators(getMessageSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesThread);
