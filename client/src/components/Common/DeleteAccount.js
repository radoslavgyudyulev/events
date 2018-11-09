import React from 'react';

const DeleteAccount = props => {
  const { deleteAccount } = props;
  return (
    <div>
      <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalConfirmDelete">Delete your Account</button>
      <div class="modal fade" id="modalConfirmDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-sm modal-notify modal-danger" role="document">
   
          <div class="modal-content text-center">
      
            <div class="modal-header d-flex justify-content-center">
              <p class="heading">Delete your Account</p>
            </div>

      
            <div class="modal-body">

              <i class="fa fa-times fa-4x animated rotateIn"></i>
              <br/>
              <cite>Your Account will be pernamently deleted. Are you sure you want to do this?</cite>
            </div>

      
            <div class="modal-footer flex-center">
              <a onClick={ deleteAccount } class="btn  btn-outline-danger" data-dismiss="modal">Yes</a>
              <a type="button" class="btn  btn-danger waves-effect" data-dismiss="modal">No</a>
            </div>
          </div>
    
        </div>
      </div>

    </div>
  );
};

export default DeleteAccount;