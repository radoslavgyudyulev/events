import React from 'react';

const DeleteEvent = props => {
  const { eventId, deleteEvent } = props;
  return (
    <div>
      <img data-tip="Delete this Event" style={{float : 'left', padding : '4px', cursor : 'pointer'}} data-toggle="modal" data-target="#modalConfirmDelete" src="images/rubbish-bin.png" alt="PRIVATE"/> 
      <div class="modal fade" id="modalConfirmDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-sm modal-notify modal-danger" role="document">
   
          <div class="modal-content text-center">
      
            <div class="modal-header d-flex justify-content-center">
              <p class="heading">Delete your Event</p>
            </div>

      
            <div class="modal-body">

              <i class="fa fa-times fa-4x animated rotateIn"></i>
              <br/>
              <cite>Your Event will be pernamently deleted. Are you sure you want to do this?</cite>
            </div>

      
            <div class="modal-footer flex-center" id={ eventId }>
              <a onClick={ deleteEvent } class="btn  btn-outline-danger" data-dismiss="modal">Yes</a>
              <a type="button"  class="btn  btn-danger waves-effect" data-dismiss="modal">No</a>
            </div>
          </div>
    
        </div>
      </div>

    </div>
  );
};

export default DeleteEvent;