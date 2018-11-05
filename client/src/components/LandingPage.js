import React, { Component } from 'react';
import Event from './Event';

import ReactLoading from 'react-loading';

import * as actions from '../actions';
import { connect } from 'react-redux';

import Auth from './Common/Auth';

class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      events : [],
      loading : true,
      isParticipant : '',
      skip : 0,
      limit : 20,
      errorMsg: [],
      successMsg: []
    };

    this.joinEvent = this.joinEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.leaveEvent = this.leaveEvent.bind(this);
  }

  componentDidMount() {
    this.getEvents();
      
  }
   

  async getEvents() {
    let { skip, limit } = this.state;
    let data = await this.props.getEvents(skip, limit);
    this.setState({events : data.payload.getAllEvents, loading : false});
  }

  getMoreResult() {
    this.setState({limit : this.state.limit + 20, skip : this.state.limit});
  }

  async joinEvent(e) {
    let token = Auth.getToken();
    let eventId = e.target.parentNode.id;

    let data = await this.props.joinEvent(token, eventId);

    if (data.payload.errorMessage) {
      let errMsgs = this.state.errorMsg;
      errMsgs[eventId] = data.payload.errorMessage;
      this.setState({ errorMsg: errMsgs });
    } else if (data.payload.successMessage) {
      let successMsgs = this.state.successMsg;
      successMsgs[eventId] = data.payload.successMessage;
      this.setState({ successMsg: successMsgs });
    }
    this.getEvents();
  }

  async leaveEvent(e) {
    let token = Auth.getToken();
    let eventId = e.target.parentNode.id;

    let data = await this.props.leaveEvent(token, eventId);
    if (data.payload.errorMessage) {
      let errMsgs = this.state.errorMsg;
      errMsgs[eventId] = data.payload.errorMessage;
      this.setState({ errorMsg: errMsgs });
    } else if (data.payload.successMessage) {
      let successMsgs = this.state.successMsg;
      successMsgs[eventId] = data.payload.successMessage;
      this.setState({ successMsg: successMsgs });
    }
    this.getEvents();
  }
   
  render() {
    const { loading, isParticipant, events } = this.state;
    return (
      <div className="container">
        {loading 
          ?
          <div className="d-flex justify-content-center">
            <ReactLoading type={'bars'} color={'#343a40'} height={'20%'} width={'15%'} />
          </div>
          :
          <Event 
            leaveEvent={ this.leaveEvent }
            joinEvent={ this.joinEvent } 
            events={ events }
            isParticipant={isParticipant}
            errorMsg={ this.state.errorMsg }
            successMsg={ this.state.successMsg }
          />
        }
        {!events 
          ?
          <button className="btn">Show More</button>
          : null }
            
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}
 
export default connect(mapStateToProps, actions)(LandingPage);
 
