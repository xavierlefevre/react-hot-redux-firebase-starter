import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {getChatRoomsSuccess} from '../../actions/chatActions';

class RoomSelection extends Component {
  componentWillMount() {
    const chatRoomsRef = firebase.database().ref('chatRooms');
    chatRoomsRef.on('child_added', data => {
      this.props.getChatRoomsSuccess(data.key, data.val());
    });
  }

  render() {
    return (
      <div
        style={{
          width: 120,
          backgroundColor: 'rgb(250, 250, 250)',
          borderColor: 'rgb(160, 160, 160)',
          borderWidth: 1,
          borderStyle: 'solid'
        }}
      >
        {
          Object.keys(this.props.chatRooms).map((roomKey) => (
            <div
              key={roomKey}
              style={{
                width: '100%',
                textAlign: 'center',
                margin: 0,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <p style={{ margin: 0 }}>{this.props.chatRooms[roomKey].name}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

RoomSelection.propTypes =  {
  chatRooms: PropTypes.object,
  getChatRoomsSuccess: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    chatRooms: state.chat.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChatRoomsSuccess: bindActionCreators(getChatRoomsSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelection);
