import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import { tourIcons } from  '../../statics/icons/icons';
import { database, auth } from '../../firebase';
import TourInformationList from './tourInformationList';
import TourInfoStaticMap from './tourInfoStaticMap';

import { googleMapInitialize } from '../../lib/loadGoogleMap';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
  margin-bottom: 3rem;
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
  top: 1.8rem;
  position: absolute;
  display: flex;
  font-size: 1.1rem;
  font-weight: 800;
  color: ${sub1};
  text-decoration: none;

  &:hover {
    color: ${main};
  }
`;

const RouteName = styled.div`
  flex: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: 800;
  color: ${main};
  background-color: #041528;
  /* text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${main}, 0 0 30px ${main}, 0 0 40px ${main}, 0 0 55px ${main}, 0 0 75px ${main}; */
  text-align: center;
`;

const Body = styled.div`
  width: 95%;
  flex: 9;
  display: flex;
  justify-content: center;
  /* margin: auto */
  flex-direction: row;
  
  @media (max-width: 50rem) {
    width: 100%;
    flex-direction: column;
  }
`;

const TendencyInfoWrapper = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 50rem) {
    height: 0.3rem;
  }

`;

const TendencyInfo = styled.div`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.8rem;

  @media (max-width: 50rem) {
    justify-content: center;
    margin-bottom: 0.5rem;
    flex-direction: column;
  }
`;

const StyledImg = styled.img`
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 50rem) {
    height: 1rem;
    width: 1rem;
    justify-content: center;
    margin-bottom: 0.5rem;
    flex-direction: column;
  }
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
  font-weight: 600;
  font-size: 0.8rem;
  color: ${sub4};

  @media (max-width: 60rem) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.5rem;
  }
`

const StaticMapWrapper = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const RouteContents = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;

  @media (max-width: 50rem) {
    display: flex;
    margin: 0 1rem;
    justify-content: center;
  }
`;

const Footer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${sub4};
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
    const checkTendenciesList = ['휴양지', '관광지', '맛집투어', '쇼핑', '액티비티', '야경'];

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
              <StaticMapWrapper>
                <TendencyInfoWrapper>
                  {checkTendenciesList.map(element => (
                    <TendencyInfo>
                      <StyledImg src={tourIcons[element]} alt={element} title={element}/>
                      <StyledSpan>{element}</StyledSpan>
                    </TendencyInfo>
                  ))}
                </TendencyInfoWrapper>
                <TourInfoStaticMap routeData={routeData} />
              </StaticMapWrapper>
              <RouteContents>
                {routeData.map((element, index) => {
                  if (element[1].placeInfo) {
                    return <TourInformationList key={index} tourInfo={element[1]}/>
                  }
                })}
              </RouteContents>
            </Body>
            <Footer>©ㅁㅇㄹㅇㅌㄹ</Footer>
          </Contents>
        )
        : 
        <Icon type='loading'>   loading...</Icon>}
      </Wrapper>
    );
  }
}

export default withRouter(TourInfomation);
