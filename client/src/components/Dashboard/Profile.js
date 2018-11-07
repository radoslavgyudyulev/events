import React, { Component } from 'react';

import ChangePasswordModal from '../Common/ChangePasswordModal';
import DeleteAccount from '../Common/DeleteAccount';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import Auth from '../Common/Auth';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg : '',
      indicator : '',
      visability : 'visible'
    };

    this.getPasswordKey = this.getPasswordKey.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  } 

  async getPasswordKey() {
    let token = Auth.getToken();

    const data = await this.props.getPasswordKey(token);
    
    if(data.payload.errorMessage) {
      this.setState({ msg : 'Something went wrong...', indicator : 'alert alert-danger', visability : 'none'});
    } else if(data.payload.successMessage) {
      this.setState({ msg : data.payload.successMessage, indicator : 'alert alert-success', visability : 'none'});
    }
  }


  async changePassword(key, newPassword, confirmedNewPassword) {
    let token = Auth.getToken();
    
    let data = await this.props.changePassword(token, key, newPassword, confirmedNewPassword);
    
    if(data.payload.successMessage) {
      Auth.deauthenticateUser();
      window.location.reload();
    }
  }

  async deleteAccount() {
    let token = Auth.getToken();

    let data = await this.props.deleteAccount(token);

    if(data.payload.successMessage) {
      Auth.deauthenticateUser();
      window.location.reload();
    }
    console.log(data);
  }

  
  render() {
    let { msg, indicator, visability } = this.state;
    return (
      <div className="row mt-3">
        <div className="card ">
          <div class="card-header">Profile Settings</div>
          <div className="card-body">
            <h4 className="card-title">Profile settings</h4>
            <ChangePasswordModal 
              getPasswordKey={ this.getPasswordKey } 
              changePassword={ this.changePassword }
              msg={ msg }
              indicator={ indicator }
              visability={ visability }
            />
            <DeleteAccount deleteAccount={ this.deleteAccount }/>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default connect(mapStateToProps, actions)(Profile);





