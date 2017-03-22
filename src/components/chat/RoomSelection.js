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
        {
          Object.keys(this.props.chatRooms).map((roomKey) => (
            <div
              key={roomKey}
              style={{
                borderColor: 'rgb(200, 200, 200)',
                margin: '8px 0',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '45px',
                height: '30px',
                padding: '5px 15px',
                cursor: 'pointer',
                marginRight: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={() => this.accessRoom(roomKey)}
            >
              <p>{`${this.props.chatRooms[roomKey].name} >`}</p>
            </div>
          ))
        }
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
