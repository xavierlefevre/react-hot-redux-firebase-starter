import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendMessageAsync} from '../../actions/chatActions';

class MessagesInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value) {
      this.props.sendMessage({
        content: this.state.value,
        date: new Date().getTime(),
        user: 'flo'
      });
    }
  }

  render() {
    return (
      <div>
        {
          this.props.loading && <p>Loading</p>
        }
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.value}
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
  sendMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.chat.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: bindActionCreators(sendMessageAsync, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesInput);
