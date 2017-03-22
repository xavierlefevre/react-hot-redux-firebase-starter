import React, { Component }  from 'react';

export default class ActiveUsers extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: '70px',
          marginLeft: '70px'
        }}
      >
        <h4>Active Users</h4>
        <p>Kim</p>
        <p>Emma</p>
        <p>John</p>
      </div>
    );
  }
}
