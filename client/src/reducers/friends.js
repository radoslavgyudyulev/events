import { 
    FIND_FRIENDS,
    INVITE_FRIEND,
    SEND_ANSWER,
    YOUR_FRIENDS,
    REMOVE_FRIEND,
    SERVER_SEARCH } from '../actions/types';

const DEFAULT_STATE = {
    friends: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case FIND_FRIENDS:
            return { ...state }
        case INVITE_FRIEND:
            return { ...state , friends: action.payload }
        case SEND_ANSWER:
            return { ...state }  
        case YOUR_FRIENDS: 
            return { ...state } 
        case REMOVE_FRIEND:
            return { ...state } 
        case SERVER_SEARCH:
            return { ...state }
        default: 
            return state;
    } 
}