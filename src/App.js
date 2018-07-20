import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { auth, database } from './firebase'
import Auth from './components/auth';
import Main from './components/main';
import Travel from './components/travel';
import TourInfomation from './components/tourInfo/tourInformation';

injectGlobal`
  html, body {
    margin: 0;
  }
`;

class App extends Component {
  state = {
    userData: null,
    uid: null,
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
        this.setState({ uid: user.uid });
        return this.getDataFromDatabase(user.uid);
      }
      this.handleUserData(null);
    });
  }

  render() {
    const { userData } = this.state;
    const { uid } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ () => <Main auth={<Auth userData={userData} />}/> } />
            <Route exact path="/travel" component={() => <Travel userData={userData} />} />
            <Route exact path="/tourinformation/:routeUid" component={() => <TourInfomation userData={userData} uid={uid} />} />
          </Switch>
        </div>
        {/* <Auth userData={userData} /> */}
        {/* <Main auth={<Auth userData={userData} />}/> */}
      </BrowserRouter>
    );
  }
}

export default App;
