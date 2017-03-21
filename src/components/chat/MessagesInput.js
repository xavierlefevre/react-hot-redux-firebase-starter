import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendMessageAsync, storeTemporaryMessage} from '../../actions/chatActions';

class MessagesInput extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.storeTemporaryMessage(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.temporaryMessage) {
      this.props.sendMessage({
        content: this.props.temporaryMessage,
        date: new Date().getTime(),
        user: this.props.currentUserUID
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.props.temporaryMessage}
            onChange={this.handleChange}
            placeholder="Type a message"
            id="textarea"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

MessagesInput.propTypes =  {
  loading: PropTypes.bool,
  temporaryMessage: PropTypes.string,
  currentUserUID: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  storeTemporaryMessage: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
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
