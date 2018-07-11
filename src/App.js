import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';

import { auth, database } from './firebase'
import Auth from './components/auth';

injectGlobal`
  html, body {
    height: 100%;
    margin: 0;
  }
`;

class App extends Component {
  state = {
    userData: null,
  };

  handleUserData = userData => this.setState({ userData });
  
  getDataFromDatabase = async (uid) => { 
    try {
      const snapshot = await database.ref(`/users/${uid}`).once('value'); 
      this.handleUserData(snapshot.val());
    } catch (error) {
      alert('데이터불러오기 에러욤~');
    }
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return this.getDataFromDatabase(user.uid);
      }
      this.handleUserData(null);
    });
  }

  render() {
    const { userData } = this.state;
    return (
      <Auth userData={userData} />
    );
  }
}

export default App;
