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
      loading : false,
      eventsRequestsLength : '',
      userRequestsLength : ''

    };
    this.counter = this.counter.bind(this);
  }

  componentDidMount() {
    this.counter();
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    await nextProps;
    if(nextProps.userRequestsLength) {
      nextProps = this.getRequest();
    }
  }
  

  async counter() {
    let token = Auth.getToken();
    
    // All friends requests for each user
    let userRequests = await this.props.getRequest(token);
    let userRequestsLength = userRequests.payload.usersRequests.length;

    // All events requests for each user
    let eventsRequests = await this.props.getYourInvites(token);
    let eventsRequestsLength = eventsRequests.payload.allInvitedEvents.length;

    this.setState({ userRequestsLength : userRequestsLength, eventsRequestsLength : eventsRequestsLength });
  }
  
  render() {
    const { loading, eventsRequestsLength, userRequestsLength } = this.state;
    return (
      <div>
        { loading 
          ?
          <div className="d-flex justify-content-center">
            <ReactLoading type={'bars'} color={'#343a40'} height={'20%'} width={'15%'} />
          </div>
          : 
          <div className="row">
            <Tabs
              defaultTab="five"
            >
              <TabList>
                <ReactTooltip />
                <Tab data-tip="Your Friends" tabFor="one"><img src="images/friends.png" alt="" srcset=""/>
                </Tab>
                <ReactTooltip />
                <Tab data-tip="Find Friends" tabFor="two"><img src="images/users.png" alt="" srcset=""/></Tab>
                <ReactTooltip />
                <Tab data-tip="Friends Request" tabFor="three"><img src="images/maps-and-flags.png" alt="" srcset=""/> 
                  <span className="badge badge-success">{ userRequestsLength ? userRequestsLength : '' }</span>
                </Tab>
                <ReactTooltip />
                <Tab data-tip="Your Events" tabFor="four"><img src="images/event.png" alt="" srcset=""/></Tab>
                <ReactTooltip />
                <Tab data-tip="Events you have been invited" tabFor="five"><img src="images/invitation.png" alt="" srcset=""/>
                  <span className="badge badge-success">{eventsRequestsLength ? eventsRequestsLength : ''}</span>
                </Tab>
                <ReactTooltip />
                <Tab data-tip="Create Event" tabFor="six"><img src="images/calendar2.png" alt="" srcset=""/></Tab>
                <Tab data-tip="Profile" tabFor="seven"><img src="images/profile.png" alt="" srcset=""/></Tab>
              </TabList>

              <TabPanel tabId="one">
                <YourFriends />
              </TabPanel>
              <TabPanel tabId="two">
                <FindFriends />
              </TabPanel>
              <TabPanel tabId="three">
                <Requests />
              </TabPanel>
              <TabPanel tabId="four">
                <Events/>
              </TabPanel>
              <TabPanel tabId="five">
                <Invites />
              </TabPanel> 
              <TabPanel tabId="six">
                <MakeEvent />
              </TabPanel>
              <TabPanel tabId="seven">
                <Profile />
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
    errorMessage: state.auth.errorMessage,
    staff : state.staff
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
