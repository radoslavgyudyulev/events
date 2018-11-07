import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Auth from '../Common/Auth';

const Counter = () => {
  const token = Auth.getToken();
  const data = this.props.getRequests(token);

  console.log(data)
};


function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  };
}
  
export default connect(mapStateToProps, actions)(Counter);