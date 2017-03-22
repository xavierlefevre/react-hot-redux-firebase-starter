import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {accessRoom} from '../../actions/chatActions';

class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  leaveRoom() {
    this.props.leaveRoom();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', alignItems: 'center' }}>
        <div
          style={{
            backgroundColor: 'rgb(200, 200, 200)',
            width: '70px',
            height: '30px',
            padding: '5px',
            cursor: 'pointer',
            marginRight: '20px'
          }}
          onClick={this.leaveRoom}
        >
          <p style={{ margin: 0 }}>{'< Leave'}</p>
        </div>
        <h1>{this.props.rooms[this.props.currentRoom].name}</h1>
      </div>
    );
  }
}

ChatHeader.propTypes =  {
  currentRoom: PropTypes.string,
  rooms: PropTypes.object,
  leaveRoom: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    rooms: state.chat.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    leaveRoom: bindActionCreators(accessRoom, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
