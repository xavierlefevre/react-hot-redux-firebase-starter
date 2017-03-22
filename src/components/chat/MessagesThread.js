import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {accessRoom, getMessageSuccess, getLastMessagesAsync, removeMessages} from '../../actions/chatActions';

class MessagesThread extends Component {
  componentWillMount() {
    const chatRoomsRef = firebase.database().ref('messages/' + this.props.currentRoom);
    chatRoomsRef.on('child_added', data => {
      if (!this.props.firstBatchLoaded) return;
      this.props.getMessageSuccess(data.key, data.val());
    });

    this.props.getLastMessages(this.props.currentRoom);
  }

  componentWillUnmount() {
    this.props.removeMessages();
  }

  render() {
    return (
      <div
        style={{
          height: '300px',
          overflow: 'auto',
          width: '500px',
          margin: 0,
          backgroundColor: 'rgb(245, 245, 245)',
          borderColor: 'rgb(230, 230, 230)',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            padding: '10px'
          }}
          >
          {
            this.props.messages
            && Object.keys(this.props.messages).length > 0
            && Object.keys(this.props.messages)
            .map((messageKey) => {
              const isFromCurrentUser = this.props.currentUser === this.props.messages[messageKey].userID;
              const userEmail = this.props.users[this.props.messages[messageKey].userID].email;
              const messageContent = this.props.messages[messageKey].content;

              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isFromCurrentUser ? 'flex-end' : 'flex-start'
                  }}
                  key={messageKey}
                >
                  <p
                    style={{
                      color: 'rgb(150, 150, 150)',
                      margin: '5px 0 0 0',
                      alignSelf: isFromCurrentUser ? 'flex-end' : 'flex-start',
                      padding: '0 10px 0 10px'
                    }}
                  >
                    {isFromCurrentUser ? 'Me' : userEmail}
                  </p>
                  <p
                    style={{
                      backgroundColor: isFromCurrentUser ? 'rgb(220, 250, 250)' : 'rgb(250, 250, 220)',
                      color: 'rgb(50, 50, 50)',
                      margin: '2px 0 5px 0',
                      padding: '5px 10px 5px 10px',
                      height: '30px',
                      borderRadius: '15px'
                    }}
                  >
                     {messageContent}
                  </p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

MessagesThread.propTypes =  {
  currentRoom: PropTypes.string,
  messages: PropTypes.object,
  currentUser: PropTypes.string,
  rooms: PropTypes.object,
  users: PropTypes.object,
  getMessageSuccess: PropTypes.func,
  getLastMessages: PropTypes.func,
  removeMessages: PropTypes.func,
  firstBatchLoaded: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    currentUser: state.user.uid,
    rooms: state.chat.rooms,
    messages: state.chat.messages,
    users: state.chat.users,
    firstBatchLoaded: state.chat.firstBatchLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMessageSuccess: bindActionCreators(getMessageSuccess, dispatch),
    getLastMessages: bindActionCreators(getLastMessagesAsync, dispatch),
    removeMessages: bindActionCreators(removeMessages, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesThread);
