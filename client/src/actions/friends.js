import axios from 'axios';
import { 
  FIND_FRIENDS,
  INVITE_FRIEND,
  SEND_ANSWER,
  REMOVE_FRIEND,
  DELETE_ACCOUNT,
  GET_PASSWORD_KEY,
  CHANGE_PASSWORD,
  SERVER_SEARCH,
  YOUR_FRIENDS,
  PROFILE_DATA
} from './types';


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
      await axios('http://localhost:5000/api/user/request/send', {
        method : 'POST',
        headers : {
          "authorization": token
        },
        data : {
          id : id
        }
      });   

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

    return dispatch({
      type : PROFILE_DATA,
      payload : response.data
    });
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
      await axios('http://localhost:5000/api/user/request/answer', {
        method: 'POST',
        headers: {
          'authorization': token
        },
        data : {
          otherUserId : id,
          answer : answer
        }
      });

      const response = await axios('http://localhost:5000/api/user/friends/yourFriends', {
        method: 'GET',
        headers: {
          'authorization': token
        }
      });

      return dispatch({
        type : YOUR_FRIENDS,
        payload : response.data
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
        type : YOUR_FRIENDS,
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
      await axios('http://localhost:5000/api/user/friends/remove', {
        method: 'POST',
        headers: {
          'authorization': token
        },
        data: {
          id : id
        }
      });

      const response = await axios('http://localhost:5000/api/user/friends/find', {
        method : 'POST',
        headers : {
          "authorization": token
        },
        data : {
          limit : 10,
          skip : 0
        }
      });

      
      return dispatch({
        type : FIND_FRIENDS,
        payload : response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const getPasswordKey = token => {
  return async dispatch => {
    try {
      const response = await axios('http://localhost:5000/api/user/secret/key', {
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


export const serverSearch = (token, text) => {
  return async dispatch => {
    try {
      const response = await axios(`http://localhost:5000/api/user/friends/search?text=${text}`, {
        method : 'GET',
        headers: {
          'authorization': token
        },
      });

      return dispatch({
        type : SERVER_SEARCH,
        payload : response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const changeData = (token, username, email) => {
  return async dispatch => {
    try {
      const data = await axios('http://localhost:5000/api/user/change/data', {
        method : 'POST',
        headers: {
          'authorization': token
        },
        data: {
          newUsername: username,
          newEmail: email
        }
      });

      if (data.payload.successMessage) {
        const response = await axios('http://localhost:5000/api/user/profile', {
          method : 'GET',
          headers : {
            "authorization": token
          }
        });
    
        return dispatch({
          type : PROFILE_DATA,
          payload : response.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const forgotPassword = (email) => {
  return async dispatch => {
    try {
      const response = await axios('http://localhost:5000/api/user/forgotPass', {
          method: 'POST',
          data: {
            email: email
          }
      });
       
      return dispatch({
        type: 'DEFAULT',
        payload : response.data
      });

    } catch(err) {
      console.error('err', err);
    }
  };
};