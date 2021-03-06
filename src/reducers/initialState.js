export default {
  routesPermissions: {
    requireAuth: [
      '/admin'
    ],
    routesRequireAdmin: [
      '/admin'
    ]
  },
  routing: {},
  user: {
    isAdmin: undefined
  },
  auth: {
    isLogged: false,
    currentUserUID: null,
    initialized: false
  },
  ajaxCallsInProgress: 0,
  chat: {
    rooms: {},
    messages: {},
    activeUsers: {},
    temporaryRoom: '',
    currentRoom: null,
    temporaryMessage: '',
    activeChatKey: ''
  }
};
