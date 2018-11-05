import React, { Component } from 'react';

import NoData from '../Common/NoData';

import Error from '../Common/Error';

export default class FindFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue : '',
    };

    this.getInputValue = this.getInputValue.bind(this);
  }

  getInputValue(e) {
    let text = e.target.value;
    this.setState({inputValue : text});
  }

   
  render() {
    const { friendList, friendReq, inviteFriends } = this.props;
    return (
      <div className="container mt-3">
        <div className="input-group mb-3">
          <input onChange={ this.getInputValue } type="text" className="form-control" placeholder="Search" aria-label="Search..." aria-describedby="basic-addon2"/>
        </div>
        {!friendList
          ?
          <NoData data={"There is no friends suggestion!"}/>
          : null }
        {friendList
          ?  
          friendList.map(friend => {
            let name = friend.split(':')[1].toLowerCase();
            let email = friend.split(':')[2];
            let search = name.includes(this.state.inputValue);
            let id = friend.split(':')[0];
            if(search) {
              return (
                <ul key={ id } className="list-group">
                  <li id={ id }  className="list-group-item d-flex justify-content-between align-items-center shadow mb-1">
                    { friend.split(':')[1] } <small>{ email }</small>
                    <span onClick={ inviteFriends } className="custom-badge badge badge-primary badge-pill waves-effect">Invite</span>
                  </li>
                </ul>
              );
            }
            if (!search) {
              return (
                <Error msg="There is no friend with this name!" indicator="alert alert-info"/>              
              );
            }
          })
          : ''}

        {friendReq
          ?  
          friendReq.map(friend => {
            let name = friend.split(':')[1].toLowerCase();
            let email = friend.split(':')[2];
            let search = name.includes(this.state.inputValue);
            let id = friend.split(':')[0];
            if(search) {
              return (
                <ul key={ id } className="list-group">
                  <li id={ id }  class="list-group-item d-flex justify-content-between align-items-center shadow-lg mb-1">
                    { friend.split(':')[1] } <small>{ email }</small>
                    <span class="custom-badge badge badge-success badge-pill disabled waves-effect">Request sended!</span>
                  </li>
                </ul>
              );
            } 
            if (!search) {
              return (
                <Error msg="There is no friend with this name!" indicator="alert alert-info"/>
              );
            }
          })
          : 
          null}
      </div>
    );
  }
}

