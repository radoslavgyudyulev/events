import React, { Component } from 'react';

import * as actions from '../../actions';
import { connect } from 'react-redux';
import Auth from '../Common/Auth';

import Events from './Events';
import FindFriends from './FindFriends';
import Invites from './Invites';
import Requests from './Requests';
import YourFriends from './YourFriends';
import MakeEvent from './MakeEvent';
import Profile from './Profile';

import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import ReactLoading from 'react-loading';
import ReactTooltip from 'react-tooltip';


class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      friendList: [],
      friendReq: [],
      invites: [],
      answer : '',
      yourFriends : [],
      limit : 20,
      skip : 0,
      allCreatedEvents : [],
      eventInvites : [],
      loading : true,
      msg : '',
      indicator : '',
      visability : 'visible'
    };

    this.handleFriends = this.handleFriends.bind(this);
    this.inviteFriends = this.inviteFriends.bind(this);
    this.friendsRequests = this.friendsRequests.bind(this);
    this.friendsReqAnswer = this.friendsReqAnswer.bind(this);
    this.yourProfile = this.yourProfile.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
    this.componentUpdater = this.componentUpdater.bind(this);
    this.showMoreFriends = this.showMoreFriends.bind(this);
    this.getYourInvites = this.getYourInvites.bind(this);
    this.invitesAnswer = this.invitesAnswer.bind(this);
    this.getPasswordKey = this.getPasswordKey.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    this.handleFriends();
    this.friendsRequests();
    this.yourProfile();
    this.getAllUserEvents();
    this.getYourInvites();

  }


  componentUpdater() {
    this.handleFriends();
    //this.friendsRequests();
    this.yourProfile();
  }
    

  async handleFriends() {
    let { skip, limit } = this.state;
    let token = Auth.getToken();

    const data = await this.props.findFriends(token, limit, skip);
    this.setState({friendList : data.payload.users, friendReq : data.payload.yourSendedReq, loading : false});
                 
  }


  async inviteFriends(e) {
    let id = e.target.parentElement.id;
    e.target.innerHTML = 'Request sended!';
    e.target.classList.add("badge-success");
    let token = Auth.getToken();
    const data = await this.props.inviteFriend(token, id);

    if(data) {
      this.componentUpdater();
    }        
  }


  async friendsRequests() {
    let token = Auth.getToken();
    let data = await this.props.getRequest(token);
    this.setState({invites : data.payload.usersRequests});

    if(data) {
      this.componentUpdater();
    }        
  }

  async friendsReqAnswer(e) {
    let text = e.target.innerHTML;
    let answer; 
    if (text === 'Accept') {
      answer = 'yes';
    } else if (text === 'Decline') {
      answer = 'no';
    }
    let token = Auth.getToken();
    let id = e.target.parentElement.id;
        
    let element = e.target.parentNode;
    element.parentNode.removeChild(element);

    let data = await this.props.friendReqAnswer(token, id, answer);


    if(data) {
      this.componentUpdater();
    }        
  }



  async yourProfile() {
    let token = Auth.getToken();
    let { skipFriendsData, limitFriendsData } = this.state;

    let data = await this.props.yourFriends(token, skipFriendsData, limitFriendsData);
      
    this.setState({ yourFriends : data.payload.friends });

    this.handleFriends();
        
  }

  async removeFriend(e) {
    let token = Auth.getToken();
    let id = e.target.parentElement.id;

    let element = e.target.parentNode;
    element.parentNode.removeChild(element);

    let data = await this.props.removeFriend(token, id);
    if(data) {
      this.componentUpdater();
    }        
  }

  showMoreFriends() {
    let { limit } = this.state;

    this.setState({limit : limit + 20, skip : limit});

    this.handleFriends();
  }

  async getAllUserEvents() {
    let token = Auth.getToken();
    let data = await this.props.getAllUserEvents(token);
      
    this.setState({allCreatedEvents : data.payload.allCreatedEvents});
  }


  async getYourInvites() {
    let token = Auth.getToken();

    let data = await this.props.getYourInvites(token);

    this.setState({eventInvites : data.payload.allInvitedEvents});
  }

  async invitesAnswer(e) {
    let token = Auth.getToken();
    let answer = e.target.id;
    let id = e.target.parentNode.id;
    await this.props.invitesAnswer(token, id, answer);
  }

  async getPasswordKey() {
    let token = Auth.getToken();

    const data = await this.props.getPasswordKey(token);
    console.log(data);
    if(data.payload.errorMessage) {
        console.log('1')
        this.setState({ msg : 'Something went wrong...', indicator : 'alert alert-danger', visability : 'none'});
    } else if(data.payload.successMessage) {
        console.log('2')
        this.setState({ msg : data.payload.successMessage, indicator : 'alert alert-success', visability : 'none'})
    }
  }


  async changePassword(key, newPassword, confirmedNewPassword) {
    let token = Auth.getToken();
    
    let data = await this.props.changePassword(token, key, newPassword, confirmedNewPassword)
    
    if(data.payload.successMessage) {
      Auth.deauthenticateUser();
      window.location.reload();
    }
  }

  async deleteAccount() {
    let token = Auth.getToken();

    let data = await this.props.deleteAccount(token);

    if(data.payload.successMessage) {
      Auth.deauthenticateUser();
      window.location.reload();
    }
    console.log(data)
  }

    
      
  render() {
    const { friendList,
      friendReq,
      invites,
      yourFriends,
      allCreatedEvents,
      eventInvites,
      loading,
      limitFriendsData,
      msg,
      indicator,
      visability } = this.state;
    return (
      <div>
            
           
        {loading 
          ?
          <div className="d-flex justify-content-center">
            <ReactLoading type={'bars'} color={'#343a40'} height={'20%'} width={'15%'} />
          </div>
          : 
          <div className="row">
            <Tabs
              defaultTab="seven"
            >
              <TabList>
                <ReactTooltip />
                <Tab data-tip="Your Friends" tabFor="one"><img src="images/friends.png" alt="" srcset=""/> <span className="badge badge-success">{yourFriends.length ? yourFriends.length : ''}</span></Tab>
                <ReactTooltip />
                <Tab data-tip="Find Friends" tabFor="two"><img src="images/users.png" alt="" srcset=""/></Tab>
                <ReactTooltip />
                <Tab data-tip="Friends Request" tabFor="three"><img src="images/maps-and-flags.png" alt="" srcset=""/> <span className="badge badge-success">{invites.length ? invites.length : ''}</span></Tab>
                <ReactTooltip />
                <Tab data-tip="Your Events" tabFor="four"><img src="images/event.png" alt="" srcset=""/></Tab>
                <ReactTooltip />
                <Tab data-tip="Events you have been invited" tabFor="five"><img src="images/invitation.png" alt="" srcset=""/><span className="badge badge-success">{eventInvites.length ? eventInvites.length : ''}</span></Tab>
                <ReactTooltip />
                <Tab data-tip="Create Event" tabFor="six"><img src="images/calendar2.png" alt="" srcset=""/></Tab>
                <Tab data-tip="Profile" tabFor="seven"><img src="images/profile.png" alt="" srcset=""/></Tab>
              </TabList>
              <TabPanel tabId="one">
                <YourFriends 
                  yourFriends={ yourFriends }
                  removeFriend={ this.removeFriend }
                  yourProfile={this.yourProfile} />
              </TabPanel>
              <TabPanel tabId="two">
                <FindFriends 
                  friendList={ friendList } 
                  friendReq={ friendReq }
                  inviteFriends={ this.inviteFriends } />
                <div className="center">
                  { friendList.length > 20 || friendReq > 20 
                    ?
                    <button className="btn btn-outline-black mt-2 mb-3" onClick={this.showMoreFriends}>
                              SHOW MORE
                    </button>
                    : null }
                </div>
              </TabPanel>
              <TabPanel tabId="three">
                <Requests 
                  invites={invites} 
                  friendsReqAnswer={ this.friendsReqAnswer }/>
              </TabPanel>
              <TabPanel tabId="four">
                <Events allCreatedEvents={allCreatedEvents}/>
              </TabPanel>
              <TabPanel tabId="five">
                <Invites invitesAnswer={this.invitesAnswer} eventInvites={ eventInvites }/>
              </TabPanel> 
              <TabPanel tabId="six">
                <MakeEvent 
                  yourFriends={ yourFriends }
                  createdEvent={ this.props.createdEvent }
                />
              </TabPanel>
              <TabPanel tabId="seven">
                <Profile 
                    getPasswordKey={ this.getPasswordKey } 
                    changePassword={ this.changePassword }
                    msg={ msg }
                    indicator={ indicator }
                    visability={ visability }
                    deleteAccount={ this.deleteAccount }
                    />
              </TabPanel>  
            </Tabs>
            
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
