import React, { Component }  from 'react';

export default class MessagesInput extends Component {

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
