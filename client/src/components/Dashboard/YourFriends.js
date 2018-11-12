import React, { Component } from 'react';

import NoData from '../Common/NoData';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import Auth from '../Common/Auth';

class YourFriends extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      yourFriends : this.props.friends || []
    };

    this.yourProfile = this.yourProfile.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
  }

  componentDidMount() {
    this.yourProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.friends !== nextProps.friends) {
      this.setState({ yourFriends : nextProps.friends });
    }
  }
  

  async removeFriend(e) {
    let token = Auth.getToken();
    let id = e.target.parentElement.id;

    let element = e.target.parentNode;
    element.parentNode.removeChild(element);

    let data = await this.props.removeFriend(token, id);  
    console.log(data);
  }


  async yourProfile() {
    let token = Auth.getToken();
  
    let data = await this.props.yourFriends(token);
    this.setState({ yourFriends : data.payload.friends }); 
  }


  render() {
    const { yourFriends } = this.state;
    return (
      <div>
        {yourFriends 
          ?
          yourFriends.map(data => {
            return (
              <div id={ data.id } key={ data.id } className="pt-1">
                <ul className="list-group shadow mb-1">
                  <li id={ data.id }  className="list-group-item d-flex justify-content-between align-items-center">
                    { data.username }  <small>{ data.email }</small>
                    <span onClick={ this.removeFriend } className="custom-badge badge badge-danger badge-pill waves-effect">Remove</span>
                  </li>
                </ul>
              </div>
               
            ); 
          }) 
             
          : <NoData data={"You don't have any friends yet!"}/> }
      </div>
    );
    
  }
}


function mapStateToProps(state) {
  return {
    friends: state.friends.friends.friends,
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps, actions)(YourFriends);


