import axios from 'axios';
import { 
    AUTH_SIGN_UP,
    AUTH_ERROR,
    AUTH_SIGN_OUT,
    AUTH_SIGN_IN,
    FIND_FRIENDS,
    INVITE_FRIEND,
    SEND_ANSWER,
    REMOVE_FRIEND,
    CREATE_EVENT,
    GET_ALL_EVENTS,
    GET_YOUR_EVENTS,
    GET_YOUR_INVITES,
    INVITES_ANSWER,
    JOIN_EVENT,
    DISJOIN_EVENT,
    DELETE_ACCOUNT,
    GET_PASSWORD_KEY,
    CHANGE_PASSWORD
} from './types';

import Auth from '../components/Common/Auth';


export const oauthGoogle = data => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/api/auth/google', {
            access_token : data
        });

        dispatch({
            type : AUTH_SIGN_UP,
            payload : response.data.token
        });

        Auth.authenticateUser(response.data.token);
    };
};

export const oauthFacebook = data => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/api/auth/facebook', {
            access_token : data
        });

        dispatch({
            type : AUTH_SIGN_UP,
            payload : response.data.token
        });

        Auth.authenticateUser(response.data.token);
    };
};

export const signUp = (data) => {
    return async dispatch => {
        /*
        Step 1) Use the data and make HTTP request to our BE and send it along
        Step 2) Take the BE's response (jwt is here now!)
        Step 3) Dispatch user just signed up (with jwt)
        Step 4) Save the jwt into localstorage
        */
        try {
            console.log('[ActionCreator] signUp called!');
            const response = await axios.post('http://localhost:5000/api/auth/signup', data);
            console.log('[ActionCreator] signUp dispatched an action!');

            dispatch({
                type : AUTH_SIGN_UP,
                payload : response.data.token
            });

            Auth.authenticateUser(response.data.token);
        } catch(err) {
            dispatch({
                type : AUTH_ERROR,
                payload: 'Email is already in use'
            });
            console.error('err', err);
        }
    };
};

export const signOut = () => {
    return dispatch => {
        Auth.deauthenticateUser();
        dispatch({
            type : AUTH_SIGN_OUT,
            payload : ''
        });
    };
};

export const signIn = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', data);
       
            dispatch({
                type : AUTH_SIGN_IN,
                payload : response.data.token
            });

            Auth.authenticateUser(response.data.token);
        } catch(err) {
            dispatch({
                type : AUTH_ERROR,
                payload: 'Email is already in use'
            });
            console.error('err', err);
        }
    };
};

export const findFriends = (token, limit, skip) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/friends/find', {
                method : 'POST',
                headers : {
                    "authorization": token
                },
                data : {
                    limit : limit,
                    skip : skip
                }
            });

            return dispatch({
                type : FIND_FRIENDS,
                payload : response.data
            });

        } catch(err) {
            //  dispatch({
            //     type : AUTH_ERROR,
            //     payload: 'Email is already in use'
            //  });
            console.error('err', err);
        }
    };
};

export const inviteFriend = (token, id) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/request/send', {
                method : 'POST',
                headers : {
                    "authorization": token
                },
                data : {
                    id : id
                }
            });
         
         
            return dispatch({
                type : INVITE_FRIEND,
                payload : response
            });
     
        } catch(err) {
            //  dispatch({
            //     type : AUTH_ERROR,
            //     payload: err.message
            //  });
            console.error('err', err);
        }
    };
};

export const getProfile = token => {
    return async dispatch => {
        const response = await axios('http://localhost:5000/api/user/profile', {
            method : 'GET',
            headers : {
                "authorization": token
            }
        });

        return response;
    };
  
};

export const getRequest = token => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/request/get', {
                method: 'GET',
                headers: {
                    'authorization': token
                }
            });

            return dispatch({
                type : INVITE_FRIEND,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const friendReqAnswer = (token, id, answer) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/request/answer', {
                method: 'POST',
                headers: {
                    'authorization': token
                },
                data : {
                    otherUserId : id,
                    answer : answer
                }
            });


            return dispatch({
                type : SEND_ANSWER,
                payload : response
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const yourFriends = token => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/friends/yourFriends', {
                method: 'GET',
                headers: {
                    'authorization': token
                }
            });

            return dispatch({
                type : SEND_ANSWER,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const removeFriend = (token, id) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/friends/remove', {
                method: 'POST',
                headers: {
                    'authorization': token
                },
                data: {
                    id : id
                }
            });


            return dispatch({
                type : REMOVE_FRIEND,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const createdEvent = (token, data) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/create', {
                method: 'POST',
                headers: {
                    'authorization': token
                },
                data: {
                    title : data.title,
                    description : data.description,
                    date : data.date,
                    hour : data.hour,
                    isPrivate : data.isPrivate,
                    numberOfParticipants : data.numberOfParticipants,
                    participants : data.participants
                }
            });


            return dispatch({
                type : CREATE_EVENT,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getEvents = (skip, limit) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/getEvents', {
                method : 'POST',
                data : {
                    skip : skip,
                    limit : limit
                }
            });

            return dispatch({
                type : GET_ALL_EVENTS,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getAllUserEvents = token => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/allEvents', {
                method : 'GET',
                headers: {
                    'authorization': token
                },
            });
            return dispatch({
                type : GET_YOUR_EVENTS,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getYourInvites = token => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/invites', {
                method : 'GET',
                headers: {
                    'authorization': token
                },
            });
            return dispatch({
                type : GET_YOUR_INVITES,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const invitesAnswer = (token, eventId, answer) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/invites/answer', {
                method : 'POST',
                headers: {
                    'authorization': token
                },
                data: {
                    eventId : eventId,
                    answer : answer
                }
            });

            return dispatch({
                type : INVITES_ANSWER,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const joinEvent = (token, eventId) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/join', {
                method : 'POST',
                headers: {
                    'authorization': token
                },
                data: {
                    id : eventId,
                }
            });

            return dispatch({
                type : JOIN_EVENT,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const leaveEvent = (token, eventId) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/event/leave', {
                method : 'POST',
                headers: {
                    'authorization': token
                },
                data: {
                    id : eventId,
                }
            });

            return dispatch({
                type : DISJOIN_EVENT,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const getPasswordKey = token => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/change/key', {
                method : 'GET',
                headers: {
                    'authorization': token
                }
            });

            return dispatch({
                type : GET_PASSWORD_KEY,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const changePassword = (token, key, newPassword, confirmedNewPassword) => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/changePass', {
                method : 'POST',
                headers: {
                    'authorization': token
                },
                data : {
                    key : key,
                    newPassword : newPassword, 
                    confirmedNewPassword : confirmedNewPassword
                }
            });

            return dispatch({
                type : CHANGE_PASSWORD,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};


export const deleteAccount = token => {
    return async dispatch => {
        try {
            const response = await axios('http://localhost:5000/api/user/delete', {
                method : 'GET',
                headers: {
                    'authorization': token
                },
            });

            return dispatch({
                type : DELETE_ACCOUNT,
                payload : response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};