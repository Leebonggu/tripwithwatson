import React, { Component } from 'react';
import { Layout, Menu, Button, Icon} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import { database, auth } from '../../firebase';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import { googleMapInitialize, googleStaticMap } from '../../lib/loadGoogleMap';
import Map from './map';
import WrappedButton from './infoButton';
import RouteDeleteButton from './routeDeleteButton';
import CheckTendency from './checkTendencies';

const { Header, Content, Footer, Sider } = Layout;

const StyeldLayout =  styled(Layout)`
  width: 100%;
  height: 90%;
  display: flex;
`;

const StyeldSider = styled(Sider)`
  background-color: ${sub4};
`;

const StyledContent = styled(Content)`
  height: 100%;
  display: flex;
`;

const StyledHeader = styled(Header)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #f0f2f5;
  font-weight: 900;
  font-size: 2.5rem;
  letter-spacing: -0.6rem;
`;

const HeaderLink = styled(Link)`
  color: ${main};
  text-decoration: none;

  &:hover {
    color: ${main};
  }
`;

const MapContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin: 2rem 3rem 0 3rem;
  padding: 1rem;
  position: relative;
  flex-direction: column;
`;

const Maps = styled.div`
  width: 100%;
  height: 100%;
  flex: 95;
  display: flex;
`;

const Span = styled.span`
  font-size: 1em;
`;

const SelectButtons = styled.div`
  flex: 5;
  display: flex;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;

  &:active {
    background-color: ${sub1};
  }
`;

const RouteName = styled.div`
  flex: 8;
`;

const RouteButton = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;


const LoadingIcon = styled(Icon)`
  margin-right: .5rem;
  font-size: 1rem;
`;

const StyledFooter = styled(Footer)`
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Travel extends Component {
  state = {
    isLoading: false,
    travelData: null,
    selectedData: null,
    tendencies : null,
    selectedPlace: [],
    isWatching: false,
  };

  componentDidMount() {
    googleMapInitialize()
     .then(() => this.setState({ isLoading: true }))
    this.getTravelData();
    this.setInitialTendency();
  }

  componentDidUpdate() {
    if (!this.state.isWatching && this.props.userData) {
      this.setState({ isWatching: true });
      database.ref(`/users/${auth.currentUser.uid}/myPlaces`)
        .on('value', (snapshot) => {
          const data = snapshot.val() || {};
          const sorted = Object.entries(data)
            .sort(([, aPlaces], [, bPlaces]) => aPlaces.createdAt - bPlaces.createdAt);
          this.setState({ selectedPlace: sorted });
        });
    }
  }

  getTravelData = async() => {
    const snapshot = await database.ref('/travel').once('value');
    this.setState({ travelData: snapshot.val() });
  };

  setInitialTendency = () => {
    const { userData } = this.props;
    if (userData) {
      this.setState({
        tendencies: userData.personInfo.tendency,
      });
    };
  };
  
  handleTendency = (event) => {
    const selectedTendency = event.target.value;
    const { tendencies } = this.state;

    if (tendencies.includes(selectedTendency)) {
      tendencies.splice(tendencies.indexOf(selectedTendency),1);
      const updatedTendencies = tendencies;
      // console.log('update',updatedTendencies)
      this.setState({ tendencies: updatedTendencies})
    } else {
      tendencies.push(selectedTendency);
      const updatedTendencies = tendencies;
      // console.log('else',updatedTendencies)
      this.setState({ tendencies: updatedTendencies })
    }
  }

  handleUniqTravelData = (tendencies, travelData) => {
    const result = [];
    for (let i = 0; i < travelData.length; i += 1) {
      for (let j = 0; j < tendencies.length; j += 1) {
        if (travelData[i][tendencies[j]] === true) {
          result.push(travelData[i]);
        }
      }
    }
    return _.uniq(result);
  };

  menuClick = (routerUid) => {
    database.ref(`/users/${auth.currentUser.uid}/myPlaces/${routerUid}`).once('value')
      .then(snapshot => {
        if (!snapshot.val()) { return }
        const data = snapshot.val();
        const arrayedTravel = []
        Object.entries(data).forEach(element => {
          arrayedTravel.push(element[1]);
        });
        this.setState({ selectedData: arrayedTravel });
        
      })
  }

  clearSelectedData = () => {
    this.setState({ selectedData: null });
  }

  handleSelectedPlaceList = (selected) => {
    console.log('se',selected);
    return selected.length > 0 ? (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
        {
          selected.map(([eachRouteUid, eachPlaces], index) => {
            return (
              <Menu.Item key={index} onClick={() => this.menuClick(eachRouteUid)}>
               <MenuItem>
                <RouteName>
                  <Icon type="user" />
                  <Span className="nav-text">{eachPlaces.name}</Span>
                </RouteName>
                <RouteButton>
                  <WrappedButton eachRouteUid={eachRouteUid} />
                  <RouteDeleteButton eachRouteUid={eachRouteUid} />
                </RouteButton>
                </MenuItem>
              </Menu.Item>
            );
          })
        }
      </Menu>
    ) : (
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">nothing</span>
        </Menu.Item>
      </Menu>
    );
  };
  
  render() {
    const { isLoading, travelData, tendencies, selectedPlace, selectedData} = this.state;
    const { userData } = this.props;
    const personInfo  = userData ? userData.personInfo : null;
    return (
      <div>
        {isLoading && travelData && tendencies? (
          <StyeldLayout>
            <StyeldSider 
              style={{ overflow: 'auto', height: '100vh', position: 'realtive', left: 0  }}
              // breakpoint="lg"
              // collapsedWidth="0"
            >
              {this.handleSelectedPlaceList(selectedPlace)}
            </StyeldSider>
            <StyeldLayout style={{ marginLeft: 0 }}>
              <StyledHeader style={{ background: 'f0f2f5'}}><HeaderLink to="/">ㅁㅇㄹㅇㅌㄹ</HeaderLink></StyledHeader>
              <StyledContent style={{ margin: '24px 16px 0' }}>
              <MapContents  style={{  background: '#fff', minWidth: 360, display: 'flex',}}>
                <SelectButtons>
                  <CheckTendency 
                    tendencies={tendencies}
                    handleTendency={this.handleTendency}                
                  />
                  <StyledButton onClick={this.clearSelectedData}>초기화</StyledButton>
                </SelectButtons>
                <Maps>
                  <Map 
                    personInfo={personInfo}
                    isLoading={isLoading}
                    travelData={selectedData ? selectedData : this.handleUniqTravelData(tendencies, travelData) }
                    tendency={tendencies}
                  />
                </Maps>
              </MapContents>
              </StyledContent>
              <StyledFooter> MRT ©2018 Created </StyledFooter>
            </StyeldLayout>
          </StyeldLayout>
        ) : <span><LoadingIcon type="loading"/>loading...</span>}
      </div>
    );
  }
}

export default Travel;