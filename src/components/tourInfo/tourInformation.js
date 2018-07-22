import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import { database, auth } from '../../firebase';
import TourInformationList from './tourInformationList';
import TourInfoStaticMap from './tourInfoStaticMap';

import { googleMapInitialize } from '../../lib/loadGoogleMap';

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${sub4};
  margin: 2rem 0;
`;

const StyledIcon = styled(Icon)`
  margin-left: 1rem;
  margin-right: 0.4rem;
  font-size: 2rem;
  color: ${main};
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem;
  position: absolute;
  display: flex;
  margin-left: 0.5rem;
  font-size: 1.1rem;
  font-weight: 800;
  color: ${sub2};
  text-decoration: none;
`;

const RouteName = styled.div`
  flex: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-family: 'Futura';
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${main}, 0 0 30px ${main}, 0 0 40px ${main}, 0 0 55px ${main}, 0 0 75px ${main};
  text-align: center;
`;

const Body = styled.div`
  width: 100%;
  flex: 9;
  display: flex;
  justify-content: center;
  /* margin: auto */
  flex-direction: row;
  
  @media (max-width: 50rem) {
    flex-direction: column;
  }
`;

const RouteContents = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;

class TourInfomation extends Component {
  state = {
    routeData: null,
  }

  componentDidMount() {
    googleMapInitialize();

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
    console.log(routeData)
    return (
      <Wrapper>
        {routeData ? (
          <Contents>
            <StyledLink to="/travel"><StyledIcon type="left-circle" />루트선택</StyledLink>
            <Header>
              <RouteName>{routeData[routeData.length - 1][1]}</RouteName>
            </Header>
            <Body>
              <TourInfoStaticMap routeData={routeData} />
              <RouteContents>
                {routeData.map((element, index) => {
                  if (element[1].placeInfo) {
                    return <TourInformationList key={index} tourInfo={element[1]}/>
                  }
                })}
              </RouteContents>
            </Body>
          </Contents>
        )
        : 
        <Icon type='loading'>   loading...</Icon>}
      </Wrapper>
    );
  }
}

export default withRouter(TourInfomation);
