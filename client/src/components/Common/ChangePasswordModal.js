import React, { Component } from 'react';

import Error from '../Common/Error';

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg : '',
      indicator : '',
      confirmedNewPassword : '',
      newPassword : '',
      key : ''
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  async handleInputs(e) {
    let value = e.target.value;
    let name = e.target.name;
    await this.setState({[name] : value});
  }

  async changePassword() {
    let { key, newPassword, confirmedNewPassword } = this.state;
    await this.props.changePassword(key, newPassword, confirmedNewPassword);
  }


  render() {
    const { msg, indicator, visability } = this.props;
    return (
      <div>    
        <div className="modal fade" id="elegantModalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
        
            <div className="modal-content form-elegant">
          
              <div className="modal-header text-center">
                <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel"><strong>Change your Password</strong></h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            
              <div className="modal-body mx-4">

                <div className="md-form pb-3">
                  <input onChange={ this.handleInputs } name="newPassword" type="password" id="Form-pass1" className="form-control validate"/>
                  <label data-error="wrong" data-success="right" for="Form-pass1">New Password</label>
                </div>

                <div className="md-form pb-3">
                  <input onChange={ this.handleInputs } name="confirmedNewPassword" type="password" id="Form-pass2" className="form-control validate"/>
                  <label data-error="wrong" data-success="right" for="Form-pass1">Confirm Password</label>
                </div>

                <div style={{textAlign : 'center'}} className="md-form pb-3">
                  <input onChange={ this.handleInputs } name="key" type="text"  className="form-control validate"/>
                  <label data-error="wrong" data-success="right" for="Form-pass1">Key</label>
                  <button style={{ display : visability }} onClick={ this.props.getPasswordKey } className="btn btn-success btn-sm">GET SECRET KEY</button>
                </div>

                {msg
                  ?
                  <div>
                    <Error msg={ msg } indicator={ indicator }/>
                  </div>
                  : null }
                

                <div className="text-center mb-3">
                  <button onClick={ this.changePassword } type="button" className="btn blue-gradient btn-block btn-rounded z-depth-1a">Change your Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* onClick={ this.props.getPasswordKey } */}
        <div className="text-center">
          <button className="btn btn-success" data-toggle="modal" data-target="#elegantModalForm">Change your Password</button>
        </div>
      </div>
    );
  }
}
