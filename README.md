
# Web Instant Messaging App

This app includes:

#### Version 1: single chat room
- [x] User can read the last 10 messages of the room when entering
- [x] User can read new messages from other users
- [x] User can write and send new messages

#### Version 2: multiple chat rooms
- [x] User can see a list of available chat rooms
- [x] User can join and leave a chatroom
- [x] User can see the list of users in a chat room
- [x] User can create a chat room by entering a name

The chat module is accessible from the top nav bar when clicking on **chat**.

#### What remains to be tackled:
- [ ] So far Firebase does not automatically remove a user inactive for too long or that left the website
- [ ] Loading messages or icons
- [ ] A proper error system
- [ ] More unit testing for a stronger code

This code is based on: [Firebase 3.0 Starter using React Redux](https://github.com/douglascorrea/react-hot-redux-firebase-starter)

## Usage

```
git clone https://github.com/xavierlefevre/react-hot-redux-firebase-starter.git
cd react-hot-redux-firebase-starter
npm install
npm start -s
```

## Development Tasks

- `npm start` run the web app with lint and tests in watch mode
- `npm run lint` linting javascript code usig eslint
- `npm run test` test using mocha and enzyme
