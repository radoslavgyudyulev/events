import { 
  FIND_FRIENDS,
  INVITE_FRIEND,
  SEND_ANSWER,
  YOUR_FRIENDS,
  REMOVE_FRIEND,
  SERVER_SEARCH } from '../actions/types';

const DEFAULT_STATE = {
  friends: [],
  updater : '',
  allFriends: []
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
  case FIND_FRIENDS:
    return { ...state , allFriends: action.payload.users };
  case INVITE_FRIEND:
    return { ...state , updater: 'INVITE_FRIEND' };
  case SEND_ANSWER:
    return { ...state, updater:  'SEND_ANSWER'};  
  case YOUR_FRIENDS: 
    return { ...state , friends: action.payload  }; 
  case REMOVE_FRIEND:
    return { ...state, updater : 'REMOVE FRIEND' }; 
  case SERVER_SEARCH:
    return { ...state };
  default: 
    return state;
  } 
};