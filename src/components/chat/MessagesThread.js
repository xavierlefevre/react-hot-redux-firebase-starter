import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {getLastMessages, sendMessageSuccess, getUsersSuccess} from '../../actions/chatActions';

class MessagesThread extends Component {
  componentWillMount() {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('child_added', data => {
      if (!this.props.firstBatchLoaded) return;
      this.props.sendMessageSuccess(data.key, data.val());
    });

    const usersRef = firebase.database().ref('users');
    usersRef.on('child_added', data => {
      this.props.getUsersSuccess(data.key, data.val());
    });

    this.props.getLastMessages();
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.props.users).length > 0 && Object.keys(this.props.messages).map((messagesKey) => (
            <p key={messagesKey}>
              {this.props.users[this.props.messages[messagesKey].user].email} - {this.props.messages[messagesKey].content}
            </p>
          ))
        }
      </div>
    );
  }
}

MessagesThread.propTypes =  {
  messages: PropTypes.object,
  users: PropTypes.object,
  firstBatchLoaded: PropTypes.bool,
  getLastMessages: React.PropTypes.func.isRequired,
  sendMessageSuccess: React.PropTypes.func,
  getUsersSuccess: React.PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    messages: state.chat.messages,
    users: state.chat.users,
    firstBatchLoaded: state.chat.firstBatchLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLastMessages: bindActionCreators(getLastMessages, dispatch),
    sendMessageSuccess: bindActionCreators(sendMessageSuccess, dispatch),
    getUsersSuccess: bindActionCreators(getUsersSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesThread);
