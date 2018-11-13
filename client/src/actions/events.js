import axios from 'axios';
import { 
  CREATE_EVENT,
  GET_ALL_EVENTS,
  GET_YOUR_EVENTS,
  GET_YOUR_INVITES,
  INVITES_ANSWER,
  JOIN_EVENT,
  LEAVE_EVENT,
  DELETE_EVENT,
  EDIT_EVENT
} from './types';


export const createdEvent = (token, data) => {
  return async dispatch => {
    try {
      await axios('http://localhost:5000/api/event/create', {
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
      await axios('http://localhost:5000/api/event/invites/answer', {
        method : 'POST',
        headers: {
          'authorization': token
        },
        data: {
          eventId : eventId,
          answer : answer
        }
      });

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
        type : LEAVE_EVENT,
        payload : response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const deleteEvent = (token, eventId) => {
  return async dispatch => {
    try {
      await axios('http://localhost:5000/api/event/delete', {
        method : 'POST',
        headers: {
          'authorization': token
        },
        data: {
          id : eventId,
        }
      });

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


export const editEvent = (token, data) => {
  return async dispatch => {
    try {
      await axios('http://localhost:5000/api/event/edit', {
        method : 'POST',
        headers: {
          'authorization': token
        },
        data: {
          data : data,
        }
      });

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