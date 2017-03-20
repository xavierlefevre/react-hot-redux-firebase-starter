import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getLastMessages} from '../../actions/chatActions';

class MessagesThread extends Component {
  componentWillMount() {
    this.props.actions.getLastMessages();
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.props.messages).map((messagesKey) => (
            <p key={messagesKey}>
              {this.props.messages[messagesKey].content}
            </p>
          ))
        }
      </div>
    );
  }
}

MessagesThread.propTypes =  {
  messages: PropTypes.object,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({getLastMessages}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesThread);
