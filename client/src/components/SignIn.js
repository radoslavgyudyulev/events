// import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import * as actions from '../actions';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';

// import Auth from './Common/Auth';


// import CustomInput from './CustomInput';

// classNameName SignUp extends Component {
//   constructor(props) {
//     super(props);
    
//     this.onSubmit = this.onSubmit.bind(this);
//     this.responseGoogle = this.responseGoogle.bind(this);
//     this.responseFacebook = this.responseFacebook.bind(this);
//   }

//   async onSubmit(data) {
//     await this.props.signIn(data);
//     if(!this.props.errorMessage) {
//       let token = Auth.getToken();
//       await this.props.getProfile(token);
//       this.props.history.push('/');
//     }
//   }

//   async responseGoogle(res) {
//     await this.props.oauthGoogle(res.accessToken);
//     if(!this.props.errorMessage) {
//       let token = Auth.getToken();
//       await this.props.getProfile(token);
//       this.props.history.push('/');
//     }
//   };

//   async responseFacebook(res) {
//     await this.props.oauthFacebook(res.accessToken);
//     if(!this.props.errorMessage) {
//       let token = Auth.getToken();
//       await this.props.getProfile(token);
//       this.props.history.push('/');
//     }  
//   };

//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <div classNameNameName="sign-up-wrapper shadow-lg ">
//         <div classNameNameName="">
//           <form onSubmit={ handleSubmit(this.onSubmit) }>
//             <fieldset>
//               <Field 
//                 name="email"
//                 type="text"
//                 id="email"
//                 label="Email"
//                 placeholder="Enter your Email"
//                 component={ CustomInput } />
//             </fieldset>

//             <fieldset>
//               <Field 
//                 name="password"
//                 type="password"
//                 id="password"
//                 label="Password"
//                 placeholder="Enter your Password"
//                 component={ CustomInput } />
//             </fieldset>

//             { this.props.errorMessage ? 
//               <div classNameNameName="alert alert-danger">
//                 { this.props.errorMessage }
//               </div>
//               : null }

//             <button classNameNameName="btn btn-primary sign-up-btn" type="submit">Sign In</button>
//           </form>
//         </div>

//         <div classNameNameName="">
//           <div classNameNameName="text-center">
//             <div classNameNameName="alert alert-primary">
//                     Or Sign up using third-party services
//             </div>
//             <FacebookLogin
//               appId="410704536128622"
//               autoLoad={false}
//               textButton="Facebook"
//               fields="name,email,picture"
//               cssclassNameName="btn btn-outline-primary facebook-sign-up-btn"
//               callback={this.responseFacebook} />
//             <GoogleLogin
//               clientId="252779705704-v00p7c19m31gl5kb6ujjivrdm6g43j9q.apps.googleusercontent.com"
//               buttonText="Google"
//               classNameNameName="btn btn-outline-danger google-sign-up-btn"
//               onSuccess={this.responseGoogle}
//               onFailure={this.responseGoogle} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     errorMessage: state.auth.errorMessage
//   };
// }

// export default compose(
//   connect(mapStateToProps, actions),
//   reduxForm({ form: 'signup'})
// )(SignUp);



import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Auth from './Common/Auth';


import CustomInput from './CustomInput';

class SignIn extends Component {
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
      
      <div style={{width: '450px'}} className="modal-dialog" role="document">
    
        <div className="modal-content form-elegant">
     
          <div className="modal-header text-center">
            <h3 className="modal-title w-100 dark-grey-text font-weight-bold my-3" id="myModalLabel"><strong>Sign in</strong></h3>
          </div>
     
          <div className="modal-body mx-4">

            <form onSubmit={ handleSubmit(this.onSubmit) }>
              <div className="md-form mb-5">
                <fieldset>
                  <Field 
                    name="email"
                    type="text"
                    id="email"
                    label="Email"
                    component={ CustomInput } 
                    className="form-control validate" />
                </fieldset>
              </div>
             

              <div className="md-form pb-3">
                <fieldset>
                  <Field 
                    name="password"
                    type="password"
                    id="password"
                    label="Password"
                    className="form-control validate"
                    component={ CustomInput } />
                </fieldset>
                <p className="font-small blue-text d-flex justify-content-end">Forgot <a href="#" className="blue-text ml-1">
              Password?</a></p>
              </div>

              <div className="text-center mb-3">
                <button type="submit" className="btn blue-gradient btn-block login-button">Sign in</button>
              </div>
            </form>

            <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in
          with:</p>

            <div className="row my-3 d-flex justify-content-center">
              <FacebookLogin
                appId="410704536128622"
                autoLoad={false}
                textButton={<i className="fa fa-facebook text-center"></i>}
                fields="name,email,picture"
                cssClass="btn btn-white btn-rounded mr-md-3 z-depth-1a rounded-button"
                callback={this.responseFacebook} />
               
              <GoogleLogin
                clientId="252779705704-v00p7c19m31gl5kb6ujjivrdm6g43j9q.apps.googleusercontent.com"
                buttonText={<i className="fa fa-google-plus"></i>}
                className="btn btn-white btn-rounded z-depth-1a rounded-button"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle} />
        
            </div>
          </div>
      
          <div className="modal-footer mx-5 pt-3 mb-1">
            <p className="font-small grey-text d-flex justify-content-end">Not a member? <a href="/signup" className="blue-text ml-1">
            Sign Up</a></p>
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
)(SignIn);


