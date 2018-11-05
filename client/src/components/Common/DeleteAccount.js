import React from 'react';

const DeleteAccount = props => {
  const { deleteAccount } = props;
  return (
    <div>
      <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#basicExampleModal">
        Delete your Account
      </button>
      <div className="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Delete Account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color : 'red'}}>If you click Delete button your account will be deleted pernamently!</p>
              <button onClick={ deleteAccount } type="button" className="btn btn-danger">Delete</button>
              <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;