import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { database, auth } from '../../firebase';
import TourInformationList from './tourInformationList';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
class TourInfomation extends Component {
  state = {
    routeData: null,
  }

  componentDidMount() {
    const { routeUid } = this.props.match.params;
    const { uid } = this.props;

    if (uid) {
      database.ref(`/users/${uid}/myPlaces/${routeUid}`).once('value')
        .then(snapshot => {
        const data = Object.entries(snapshot.val());
        // data.pop();
        this.setState({ routeData: data });
     });
    }
  }

  render() {
    const { routeData } = this.state;
    console.log(111, routeData)
    return (
      <Wrapper>
        <Button style={{ background: '#fff', padding: 0 }}><Link to="/travel">마이리얼트립</Link></Button>
        {routeData ? (
          routeData.map((element, index) => {
            return <TourInformationList key={index} tourInfo={element[1]}/>
          })
        )
        : 
        'loading'}
      </Wrapper>
    );
  }
}

export default withRouter(TourInfomation);
