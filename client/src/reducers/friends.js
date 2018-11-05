import { 
    FIND_FRIENDS,
    INVITE_FRIEND,
    SEND_ANSWER,
    YOUR_FRIENDS,
    REMOVE_FRIEND } from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated : false,
    token : '',
    friends: [],
    error : ''
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case FIND_FRIENDS:
            return { ...state, payload : action.friends }
        case INVITE_FRIEND:
            return { ...state }
        case SEND_ANSWER:
            return { ...state }  
        case YOUR_FRIENDS: 
            return { ...state, payload: action.friends } 
        case REMOVE_FRIEND:
            return { ...state }  
        default: 
            return state;
    } 
}