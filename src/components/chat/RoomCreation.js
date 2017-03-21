import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {storeTemporaryRoom, createRoomAsync} from '../../actions/chatActions';

class RoomCreation extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.storeTemporaryRoom(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.temporaryRoom) {
      this.props.createRoom({
        name: this.props.temporaryRoom
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.props.temporaryRoom}
            onChange={this.handleChange}
            placeholder="Type a message"
            id="input"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

RoomCreation.propTypes =  {
  temporaryRoom: PropTypes.string,
  storeTemporaryRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    temporaryRoom: state.chat.temporaryRoom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    storeTemporaryRoom: bindActionCreators(storeTemporaryRoom, dispatch),
    createRoom: bindActionCreators(createRoomAsync, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreation);
