import React from 'react';

import NoData from '../Common/NoData';

const Invites = props => {
  const { eventInvites, invitesAnswer } = props;
  return (
    <div className="container mt-3">
      {eventInvites.length > 0
        ?
        eventInvites.map(x => {
          return (
            <div style={{height : '100%', width : '100%'}} key={ x.eventId } className="event-panel mt-3">
              <div className="invites-header bg-success">
                <div style={{width : '100%'}} className="text-lg-center">
                  <cite className="mr-1">({ x.creator })</cite> <cite className="mr-1"> invite you in </cite> <strong className="text-danger mr-1 ml-1"> { x.title } </strong> <cite> event on </cite> <cite className="mr-2">{ x.date } at { x.hour }</cite>
                </div>
                    
              </div>
                  
              <div className="card shadow-lg mb-3 text-lg-center">
                <div className="card-body">
                  <div className="d-inline">
                    <p>{ x.description }</p>
                  </div>
                  <div className="text-lg-right d-inline" id={ x.eventId }>
                    <span onClick={invitesAnswer} id="true" class="custom-badge badge badge-success badge-pill mr-2 waves-effect">I will go</span>
                    <span onClick={invitesAnswer} id="false" class="custom-badge badge badge-danger badge-pill waves-effect">Ignore</span>
                  </div>
                       
                </div>
              </div>
               
            </div>
          );
        })
        : <NoData data={"You don't have any Event invites!"}/>
      }

    </div>
       
                
  );
    
};

export default Invites;