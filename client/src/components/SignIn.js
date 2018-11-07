import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Auth from './Common/Auth';


import CustomInput from './CustomInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async onSubmit(data) {
    await this.props.signIn(data);
    if(!this.props.errorMessage) {
      let token = Auth.getToken();
      await this.props.getProfile(token);
      this.props.history.push('/');
    }
  }

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if(!this.props.errorMessage) {
      let token = Auth.getToken();
      await this.props.getProfile(token);
      this.props.history.push('/');
    }
  };

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if(!this.props.errorMessage) {
      let token = Auth.getToken();
      await this.props.getProfile(token);
      this.props.history.push('/');
    }  
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="sign-up-wrapper shadow-lg ">
        <div className="">
          <form onSubmit={ handleSubmit(this.onSubmit) }>
            <fieldset>
              <Field 
                name="email"
                type="text"
                id="email"
                label="Email"
                placeholder="Enter your Email"
                component={ CustomInput } />
            </fieldset>

            <fieldset>
              <Field 
                name="password"
                type="password"
                id="password"
                label="Password"
                placeholder="Enter your Password"
                component={ CustomInput } />
            </fieldset>

            { this.props.errorMessage ? 
              <div className="alert alert-danger">
                { this.props.errorMessage }
              </div>
              : null }

            <button className="btn btn-primary sign-up-btn" type="submit">Sign In</button>
          </form>
        </div>

        <div className="">
          <div className="text-center">
            <div className="alert alert-primary">
                    Or Sign up using third-party services
            </div>
            <FacebookLogin
              appId="410704536128622"
              autoLoad={false}
              textButton="Facebook"
              fields="name,email,picture"
              cssClass="btn btn-outline-primary facebook-sign-up-btn"
              callback={this.responseFacebook} />
            <GoogleLogin
              clientId="252779705704-v00p7c19m31gl5kb6ujjivrdm6g43j9q.apps.googleusercontent.com"
              buttonText="Google"
              className="btn btn-outline-danger google-sign-up-btn"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle} />
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

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup'})
)(SignUp);
