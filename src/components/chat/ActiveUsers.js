import React, { Component, PropTypes }  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase/firebase-browser';

import {getActiveUserSuccess, removeActiveUsers,
  removeCurrentUserActiveID, addActiveUserAsync} from '../../actions/chatActions';

class ActiveUsers extends Component {
  componentWillMount() {
    this.props.addActiveUser(this.props.currentUser, this.props.currentRoom);

    const activeUsersRef = firebase.database().ref('activeUsers/' + this.props.currentRoom);
    activeUsersRef.on('child_added', data => {
      this.props.getActiveUserSuccess(data.key, data.val());
    });
    activeUsersRef.on('child_removed', data => {
      this.props.removeActiveUsers();
      this.props.removeCurrentUserActiveID();
    });
  }

  componentWillUnmount() {
    const activeUserRef = firebase.database()
    .ref('activeUsers/' + this.props.currentRoom + '/' + this.props.activeChatKey);
    activeUserRef.remove();
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
  currentUser: PropTypes.string,
  activeChatKey: PropTypes.string,
  activeUsers: PropTypes.object,
  getActiveUserSuccess: PropTypes.func,
  addActiveUser: PropTypes.func,
  removeActiveUsers: PropTypes.func,
  removeCurrentUserActiveID: PropTypes.func,
  users: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoom: state.chat.currentRoom,
    currentUser: state.user.uid,
    activeChatKey: state.chat.activeChatKey,
    activeUsers: state.chat.activeUsers,
    users: state.chat.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getActiveUserSuccess: bindActionCreators(getActiveUserSuccess, dispatch),
    removeActiveUsers: bindActionCreators(removeActiveUsers, dispatch),
    addActiveUser: bindActionCreators(addActiveUserAsync, dispatch),
    removeCurrentUserActiveID: bindActionCreators(removeCurrentUserActiveID, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveUsers);
