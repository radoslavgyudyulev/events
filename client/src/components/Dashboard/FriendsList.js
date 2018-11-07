import React from 'react';

import NoData from '../Common/NoData';
import Error from '../Common/Error';


const FriendsList = props => {
  const { friendList, friendReq, getInputValue, inputValue, inviteFriends } = props;
  return (
    <div>
      {!friendList
        ?
        <NoData data={"There is no friends suggestion!"}/>
        : null }
      {friendList
        ?  
        friendList.map(friend => {
          let name = friend.username.toLowerCase();
          let email = friend.email;
          let id = friend.id;
          return (
            <ul key={ id } className="list-group">
              <li id={ id }  className="list-group-item d-flex justify-content-between align-items-center shadow mb-1">
                { friend.username } <small>{ email }</small>
                <span onClick={ inviteFriends } className="custom-badge badge badge-primary badge-pill waves-effect">Invite</span>
              </li>
            </ul>
          );
        })
        : 
        <Error msg="There is no friend with this name!" indicator="alert alert-info"/>  
      }
      {friendReq
        ?  
        friendReq.map(friend => {
          let name = friend.username.toLowerCase();
          let email = friend.email;
          let id = friend.id;
          
          return (
            <ul key={ id } className="list-group">
              <li id={ id }  class="list-group-item d-flex justify-content-between align-items-center shadow-lg mb-1">
                { friend.username } <small>{ email }</small>
                <span class="custom-badge badge badge-success badge-pill disabled waves-effect">Request sended!</span>
              </li>
            </ul>
          );
        } 
        )
        : 
        null}
    </div>
  );
};


export default FriendsList;