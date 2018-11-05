import { 
    CREATE_EVENT } from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated : false,
    token : '',
    error : ''
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case CREATE_EVENT: 
            return { ...state }
        default: 
            return state;
    } 
}