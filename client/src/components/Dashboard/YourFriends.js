import React from 'react';

import NoData from '../Common/NoData';

const YourFriends = props => {
  const { yourFriends, removeFriend } = props;
  return (
    <div>
      {yourFriends 
        ?
        yourFriends.map(data => {
          return (
            <div id={ data[2] } key={ data[2] } className="pt-1">
              <ul className="list-group shadow mb-1">
                <li id={ data[2] }  className="list-group-item d-flex justify-content-between align-items-center">
                  { data[1] }  <small>{ data[0] }</small>
                  <span onClick={ removeFriend } className="custom-badge badge badge-danger badge-pill waves-effect">Remove</span>
                </li>
              </ul>
            </div>
               
          ); 
        }) 
             
        : <NoData data={"You don't have any friends yet!"}/> }
    </div>
  );
};

export default YourFriends;