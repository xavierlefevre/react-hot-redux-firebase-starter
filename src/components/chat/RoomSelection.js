import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {getChatRoomsSuccess, accessRoom} from '../../actions/chatActions';

class RoomSelection extends Component {

  componentWillMount() {
    const chatRoomsRef = firebase.database().ref('chatRooms');
    chatRoomsRef.on('child_added', data => {
      this.props.getChatRoomsSuccess(data.key, data.val());
    });
  }

  accessRoom(roomKey) {
    this.props.accessRoom(roomKey);
  }

  render() {
    return (
      <div className="flex-column align-center">
        <h4>Select a chat room</h4>
        <div className="selector">
          {
            Object.keys(this.props.chatRooms).map((roomKey) => (
              <div
                key={roomKey}
                className="selector-button"
                onClick={() => this.accessRoom(roomKey)}
              >
                <p>{this.props.chatRooms[roomKey].name}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

RoomSelection.propTypes =  {
  chatRooms: PropTypes.object,
  currentUser: PropTypes.string,
  accessRoom: PropTypes.func,
  getChatRoomsSuccess: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.user.uid,
    chatRooms: state.chat.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accessRoom: bindActionCreators(accessRoom, dispatch),
    getChatRoomsSuccess: bindActionCreators(getChatRoomsSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelection);
