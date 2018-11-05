import React from 'react';

import ChangePasswordModal from '../Common/ChangePasswordModal';
import DeleteAccount from '../Common/DeleteAccount';

const Profile = props => {
  let { getPasswordKey, changePassword, msg, indicator, visability, deleteAccount } = props
  return (
    <div className="row mt-3">
      <div className="card ">
        <div class="card-header">Profile Settings</div>
        <div className="card-body">
          <h4 className="card-title">Profile settings</h4>
          <ChangePasswordModal 
            getPasswordKey={ getPasswordKey } 
            changePassword={ changePassword }
            msg={ msg }
            indicator={ indicator }
            visability={ visability }
            />
          <DeleteAccount deleteAccount={ deleteAccount }/>
        </div>

      </div>
    </div>
  );
};

export default Profile;