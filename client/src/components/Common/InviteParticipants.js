import React from 'react';

import NoData from '../Common/NoData';

const InviteParticipants = props => {
  let { yourFriends, getFriendId } = props;
  return (
    <div>
     
      <div class="modal fade" id="centralModalSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-notify modal-success" role="document">
   
          <div class="modal-content">
     
            <div class="modal-header">
              <p class="heading lead">Invite your friends</p>

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>

     
            <div class="modal-body">
              <div class="text-center">
                { yourFriends.length > 0 
                  ?
                  yourFriends.map(data => {
                    return (
                      <div id={ data.id } key={ data.id } className="pt-1">
                        <ul className="list-group shadow mb-1">
                          <li id={ data.id }  className="list-group-item d-flex justify-content-between align-items-center">
                            { data.username }  <small>{ data.email }</small>
                            <span onClick={ getFriendId } className="custom-badge badge badge-danger badge-pill">Invite</span>
                          </li>
                        </ul>
                      </div>
                    ); 
                  }) 
                
                  : 
                  <NoData data="There is no friends suggestions!"/>
                }
                
              </div>
            </div>

     
            <div class="modal-footer justify-content-center">
              <a type="button" class="btn btn-success waves-effect" data-dismiss="modal">Done</a>
            </div>
          </div>
   
        </div>
      </div>

      <div class="text-center">
        <a href="" class="btn btn-default btn-rounded" data-toggle="modal" data-target="#centralModalSuccess">Invite <i class="fa fa-eye ml-1"></i></a>
      </div>
    </div>
  );
};

export default InviteParticipants;