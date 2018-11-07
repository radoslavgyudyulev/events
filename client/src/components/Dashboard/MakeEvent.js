import React, { Component } from 'react';

//import Calendar from 'react-calendar';
import Popup from "reactjs-popup";
import Auth from '../Common/Auth';

import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import InviteParticipants from '../Common/InviteParticipants';


class MakeEvent extends Component {

   constructor(props) {
      super(props);
        
      this.state = {
         date: new Date(),
         range: 1,
         ids: [],
         title: '',
         description: '',
         hour: '',
         min: '',
         yourFriends : [],
      };

      this.getPickerValue = this.getPickerValue.bind(this);
      this.dateSplitter = this.dateSplitter.bind(this);
      this.handleInputs = this.handleInputs.bind(this);
      this.getFriendId = this.getFriendId.bind(this);
      this.isPrivate = this.isPrivate.bind(this);
      this.createEvent = this.createEvent.bind(this);
      
   }

   componentDidMount() {
       this.yourProfile();
   }
   

   onChange = date => this.setState({ date });

   getPickerValue = (value) => {
    console.log(value);
  }


   dateSplitter(date) {
        date = JSON.stringify(date);
        let splittedDate = date.split('T');
        let newDate = splittedDate[0].substr(1);
        let newTime = splittedDate[1].slice(0, -1).split(".")[0];
        let updatedDate = newDate.split('-')
        let updatedDate2 = `${updatedDate[0]}-${updatedDate[1]}-${+updatedDate[2] }`
        let timeStamp = {
            date : updatedDate2,
            time : newTime
        };
            
        return timeStamp;
    }

    handleInputs(e) {
        this.setState({[e.target.name] : e.target.value})
    }
    
    getFriendId(e) {
        let id = e.target.parentNode.id;
        this.setState({ ids: [...this.state.ids, id] });

        let element = e.target.parentNode;
        element.parentNode.removeChild(element);
    }

    isPrivate() {
        this.setState({ isPrivate : !this.state.isPrivate})
    }

    async createEvent() {
        let token = Auth.getToken();
        let data = { 
            title: this.state.title,
            description: this.state.description,
            date: this.dateSplitter(this.state.date).date,
            hour: `${this.state.hour}:${this.state.min}`,
            isPrivate: this.state.isPrivate,
            numberOfParticipants: this.state.range,
            participants: this.state.ids
        }
        
        await this.props.createdEvent(token, data);
    }

    async yourProfile() {
        let token = Auth.getToken();
        let { skipFriendsData, limitFriendsData } = this.state;
    
        let data = await this.props.yourFriends(token, skipFriendsData, limitFriendsData);
          
        this.setState({ yourFriends : data.payload.friends }); 
      }

   render() {
      const { date, range, isPrivate, ids, yourFriends } = this.state;

      return (
         <div className="events-wrapper mt-3">

            <div className="row">
              <div className="col-lg-4">
                <Calendar onChange={this.onChange}/>
              </div>

              <div className="col-lg-4">
                <form>
                    <div className="card shadow-lg mb-3">
                        <div className="card-body">
                            <h3 className="text-sm-center">
                                {this.dateSplitter(date).date }
                            </h3>
                        </div>
                    </div>

                    <div className="card shadow-lg mb-3">
                        <div className="card-body">
                        <div className="text-sm-center form-group">
                        <div class="md-form">
                            <input name="title" onChange={ this.handleInputs } type="text" id="form1" class="form-control"/>
                            <label for="form1">Title</label>
                        </div>
                    </div>

                    <div class="md-form">
                        <textarea onChange={ this.handleInputs } name="description"  type="text" id="form10" class="md-textarea form-control" rows="3"></textarea>
                        <label for="form10">Description</label>
                    </div>
                        </div>
                    </div>


        
                </form>
              </div>

              <div className='col-lg-4'>
                    <div className="custom-control custom-checkbox">
                        <input onChange={ this.isPrivate } type="checkbox" name="private" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Private</label>
                    </div>
                    {/* <label class="bs-switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                    </label> */}

                    <div>
                        <p>{ range } person</p>
                        {/* <form class="range-field my-4 w-25">
                            <input type="range" min="0" max="100" />
                        </form> */}
                        <input
                            type="range"
                            onChange={ this.handleInputs }
                            name="range"
                            min="1"                  
                            max="15"                  
                            step="1"
                            value={ range }                  
                            data-orientation="vertical" />
                    </div>
                    
                    <div>
                        <input name="hour" type="number" min="0" max="23" onChange={ this.handleInputs } placeholder="Hour"/>:
                        <input name="min" type="number" min="0" max="59" onChange={ this.handleInputs } placeholder="Minute"/>
                    </div>
                    <InviteParticipants 
                        yourFriends={ yourFriends }
                        getFriendId={ this.getFriendId } />
              </div>

            </div>

            <div className="center">
                <button onClick={this.createEvent} type="button" className="btn btn-outline-success waves-effect">Create your event</button>
            </div>
            
         </div>
      );
   }
}


function mapStateToProps(state) {
    return {
      errorMessage: state.auth.errorMessage
    };
  }
  
  export default connect(mapStateToProps, actions)(MakeEvent);
  
