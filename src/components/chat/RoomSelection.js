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
    console.log('dadaz', this.props.chatRooms);
    return (
      <div>
        {
          Object.keys(this.props.chatRooms).map((roomKey) => (
            <p key={roomKey}>{this.props.chatRooms[roomKey].name}</p>
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
    chatRooms: state.chat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getChatRoomsSuccess: bindActionCreators(getChatRoomsSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelection);
