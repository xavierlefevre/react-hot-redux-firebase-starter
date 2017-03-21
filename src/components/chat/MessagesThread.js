import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {accessRoom, getMessageSuccess} from '../../actions/chatActions';

class MessagesThread extends Component {
  constructor(props) {
    super(props);
    this.accessRoom = this.accessRoom.bind(this);
  }

  componentWillMount() {
    const chatRoomsRef = firebase.database().ref('messages/' + this.props.currentRoom);
    chatRoomsRef.on('child_added', data => {
      this.props.getMessageSuccess(data.key, data.val());
    });
  }

  accessRoom() {
    this.props.accessRoom();
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: 'rgb(200, 200, 200)',
              width: '55px',
              height: '30px',
              padding: '5px',
              cursor: 'pointer',
              marginRight: '20px'
            }}
            onClick={this.accessRoom}
          >
            <p style={{ margin: 0 }}>{'< Back'}</p>
          </div>
          <h1>{this.props.rooms[this.props.currentRoom].name}</h1>
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
  rooms: PropTypes.object,
  users: PropTypes.object,
  accessRoom: PropTypes.func,
  getMessageSuccess: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    rooms: state.chat.rooms,
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
