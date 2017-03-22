import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {getActiveUsersSuccess} from '../../actions/chatActions';

class ActiveUsers extends Component {
  componentWillMount() {
    const activeUsersRef = firebase.database().ref('activeUsers/' + this.props.currentRoom);
    activeUsersRef.on('child_added', data => {
      this.props.getActiveUsersSuccess(data.key, data.val());
    });
  }

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
        {
          this.props.activeUsers
          && Object.keys(this.props.activeUsers).length > 0
          && Object.keys(this.props.activeUsers)
          .map((activeUserKey) => (
            <p key={activeUserKey}>
              {this.props.users[this.props.activeUsers[activeUserKey]].email}
            </p>
          ))
        }
      </div>
    );
  }
}

ActiveUsers.propTypes =  {
  currentRoom: PropTypes.string,
  activeUsers: PropTypes.object,
  getActiveUsersSuccess: PropTypes.func,
  users: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    activeUsers: state.chat.activeUsers,
    users: state.chat.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getActiveUsersSuccess: bindActionCreators(getActiveUsersSuccess, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveUsers);
