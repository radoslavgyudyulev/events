import React from 'react';

import NoData from '../Common/NoData';

const Requests = props => {
  const { invites, friendsReqAnswer } = props;
  return (
    <div className="mt-3">
      {invites.length > 0 
        ?
        invites.map(data => {
          return (
            <div id={ data[2] } key={ data[2] } className="pt-1">
              <ul className="list-group">
                <li id={ data[2] }  class="list-group-item d-flex justify-content-between align-items-center shadow mb-1">
                  { data[1] }  <small>{ data[0] }</small>
                  <span onClick={ friendsReqAnswer } class="custom-badge badge badge-success badge-pill waves-effect">Accept</span>
                  <span onClick={ friendsReqAnswer } class="custom-badge badge badge-danger badge-pill waves-effect">Decline</span>
                </li>
              </ul>
            </div>
          ); 
        }) 
            
        : <NoData data={"There is no requests yet!"}/> }
    </div>
  );
};

export default Requests;