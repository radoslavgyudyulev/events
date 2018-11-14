import { 
  FIND_FRIENDS,
  INVITE_FRIEND,
  SEND_ANSWER,
  YOUR_FRIENDS,
  REMOVE_FRIEND,
  SERVER_SEARCH,
  PROFILE_DATA } from '../actions/types';

const DEFAULT_STATE = {
  invitedFriends: [],
  yourFriendsList: [],
  allUsersList: [],
  personalData: []
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
  case FIND_FRIENDS:
    return { ...state, allUsersList: action.payload.users };
  case INVITE_FRIEND:
    return { ...state, invitedFriends: action.payload.usersRequests };
  case SEND_ANSWER:
    return { ...state};  
  case YOUR_FRIENDS: 
    return { ...state, yourFriendsList: action.payload.friends }; 
  case REMOVE_FRIEND:
    return { ...state}; 
  case SERVER_SEARCH:
    return { ...state };
  case PROFILE_DATA:
    return { ...state, personalData: action.payload.user };
  default: 
    return state;
  } 
};