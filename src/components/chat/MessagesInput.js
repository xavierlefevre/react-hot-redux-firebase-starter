import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendMessageAsync, storeTemporaryMessage} from '../../actions/chatActions';

class MessagesInput extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
  }

  handleChange(event) {
    this.props.storeTemporaryMessage(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.temporaryMessage) {
      this.props.sendMessage({
        content: this.props.temporaryMessage,
        timestamp: new Date().getTime(),
        userID: this.props.currentUserUID
      }, this.props.currentRoom);
    }
  }

  checkForEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (this.props.temporaryMessage) {
        this.props.sendMessage({
          content: this.props.temporaryMessage,
          timestamp: new Date().getTime(),
          userID: this.props.currentUserUID
        }, this.props.currentRoom);
      }
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '500px'
        }}
      >
        <textarea
          value={this.props.temporaryMessage}
          onChange={this.handleChange}
          placeholder="Type a message"
          id="textarea"
          style={{ flex: 9, outline: 'none' }}
          onKeyDown={this.checkForEnter}
        />
        <input type="submit" value="Submit" style={{ flex: 1 }} />
      </form>
    );
  }
}

MessagesInput.propTypes =  {
  currentRoom: PropTypes.string,
  temporaryMessage: PropTypes.string,
  currentUserUID: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  storeTemporaryMessage: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    temporaryMessage: state.chat.temporaryMessage,
    currentUserUID: state.auth.currentUserUID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: bindActionCreators(sendMessageAsync, dispatch),
    storeTemporaryMessage: bindActionCreators(storeTemporaryMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesInput);
