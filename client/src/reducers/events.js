import { CREATE_EVENT,
  GET_ALL_EVENTS,
  GET_YOUR_EVENTS,
  GET_YOUR_INVITES,
  INVITES_ANSWER,
  JOIN_EVENT,
  LEAVE_EVENT,
  DELETE_EVENT,
  EDIT_EVENT } from '../actions/types';

const DEFAULT_STATE = {
  invitesLength : [],
  allCreatedEvents: []
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
  case CREATE_EVENT: 
    return { ...state };
  case GET_ALL_EVENTS: 
    return { ...state };
  case GET_YOUR_EVENTS: 
    return { ...state,  allCreatedEvents: action.payload.allCreatedEvents };
  case GET_YOUR_INVITES: 
    return { ...state, invitesLength: action.payload };
  case INVITES_ANSWER: 
    return { ...state };
  case JOIN_EVENT: 
    return { ...state };
  case LEAVE_EVENT:
    return { ...state };
  case DELETE_EVENT:
    return { ...state };
  case EDIT_EVENT: 
    return { ...state };
  default: 
    return state;
  } 
};