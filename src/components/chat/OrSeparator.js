import React, { Component }  from 'react';

export default class OrSeparator extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '15px', marginLeft: '15px' }}>
        <div style={{ width: 1, flex: 2, backgroundColor: 'black' }}/>
        <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
          <p style={{ margin: 0 }}>OR</p>
        </div>
        <div style={{ width: 1, flex: 2, backgroundColor: 'black' }}/>
      </div>
    );
  }
}
