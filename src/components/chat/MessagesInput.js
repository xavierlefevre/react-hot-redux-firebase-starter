import React, { Component }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {sendMessage} from '../../actions/chatActions';

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
    this.props.actions.sendMessage({
      id: 5,
      content: this.state.value,
      date: new Date().getTime(),
      user: 'flo'
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Type a message"
          id="textarea"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

MessagesInput.propTypes =  {
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({sendMessage}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesInput);
