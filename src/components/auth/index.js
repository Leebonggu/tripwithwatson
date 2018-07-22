import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { firebase, googleAuth, auth } from '../../firebase'; 
import SignIn from './signIn';
import SignOut from './signOut';
import Survey from './survey/survey';

class Auth extends Component {
  signIn = async () => {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await firebase.auth().signInWithPopup(googleAuth);
      alert('logIn!');
    } catch (error) {
      alert("로그인 에러요~");
    }
  };

  signOut = async () => {
    try {
      await firebase.auth().signOut();
      alert('logOut!');
    } catch (error) {
      alert('로그아웃 에러요~');
    }
  };

  render() {
    const { userData } = this.props;
    // console.log((auth.currentUser && !userData))
    // console.log(userData);
    return (
      <div>
        {auth.currentUser ? (
          <SignOut click={this.signOut} />
        ) : (
          <SignIn click={this.signIn} />
        )}
        {(auth.currentUser && !userData) && (
          <Survey /> 
          // <Redirect to="/survey"/>
        )}
      </div>
    )
  }
}

export default Auth;