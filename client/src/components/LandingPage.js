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
      limit : 10,
      errorMsg: [],
      successMsg: [],
      moreData: true
    };

    this.joinEvent = this.joinEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.leaveEvent = this.leaveEvent.bind(this);
    this.getMoreResult = this.getMoreResult.bind(this);
    this.autoload = this.autoload.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }
   

  async getEvents() {
    let { skip, limit } = this.state;
    let data = await this.props.getEvents(skip, limit);
    console.log(data);
    if (data.payload.errorMessage) {
      await this.setState({ moreData: false });
    }
    this.setState({events : data.payload.getAllEvents, loading : false });
  }

  async getMoreResult() {
    await this.setState({limit : this.state.limit + 10, skip : this.state.limit});
    await this.getEvents();
  }

  autoload() {
    window.addEventListener('scroll', () => {
      let div = document.getElementById('scroll');
      let rect = div.getBoundingClientRect();

      if (rect.bottom < 1000 && rect.bottom > 990) {
        console.log(this.state.moreData);
        if (this.state.moreData) {
          this.getMoreResult();
        }
      }
    })
  };

  async joinEvent(e) {
    let token = Auth.getToken();
    let eventId = e.target.parentNode.id;

    let data = await this.props.joinEvent(token, eventId);

    if (data.payload.errorMessage) {
      let errMsgs = this.state.errorMsg;
      errMsgs[eventId] = data.payload.errorMessage;
      this.setState({ errorMsg: errMsgs, successMsg: [] });
    } else if (data.payload.successMessage) {
      let successMsgs = this.state.successMsg;
      successMsgs[eventId] = data.payload.successMessage;
      this.setState({ successMsg: successMsgs, errorMsg: [] });
    }

    let timer = setTimeout(() => {
      this.setState({ successMsg: [], errorMsg: [] });
      return clearTimeout(timer);
    }, 3000);

    this.getEvents();
  }

  async leaveEvent(e) {
    let token = Auth.getToken();
    let eventId = e.target.parentNode.id;

    let data = await this.props.leaveEvent(token, eventId);
    if (data.payload.errorMessage) {
      let errMsgs = this.state.errorMsg;
      errMsgs[eventId] = data.payload.errorMessage;
      this.setState({ errorMsg: errMsgs, successMsg: [] });
    } else if (data.payload.successMessage) {
      let successMsgs = this.state.successMsg;
      successMsgs[eventId] = data.payload.successMessage;
      this.setState({ successMsg: successMsgs, errorMsg: [] });
    }

    let timer = setTimeout(() => {
      this.setState({ successMsg: [], errorMsg: [] });
      return clearTimeout(timer);
    }, 3000);

    this.getEvents();
  }
   
  render() {
    const { loading, isParticipant, events } = this.state;
    this.autoload();
    return (
      <div className="">
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
            getEvents={ this.getEvents }
          />
        }
        {/* { this.state.moreData
        ?
          <button onClick={ this.getMoreResult } className="btn btn-success">Show More</button>
          : null} */}
          <div id="scroll"></div>
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
 
