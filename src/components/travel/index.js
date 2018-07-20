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

const MapContents = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  position: relative;
  flex-direction: column;
`;

const Maps = styled.div`
  width: 90%;
  flex: 95;
  display: flex;
`;

const Span = styled.span`
  font-size: 1em;
`;

const SelectButtons = styled.div`
  flex: 5;
  display: flex;
`;

const StyledButton = styled(Button)`
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
              <div className="logo" />
              {this.handleSelectedPlaceList(selectedPlace)}
            </StyeldSider>
            <StyeldLayout style={{ marginLeft: 0 }}>
              <Header style={{ background: '#fff', padding: 0 }}><Link to="/">마이리얼트립</Link></Header>
              <StyledContent style={{ margin: '24px 16px 0' }}>
              <MapContents  style={{ padding: 24, background: '#fff', minWidth: 360, display: 'flex',}}>
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
              <Footer style={{ textAlign: 'center' }}> MRT ©2018 Created </Footer>
            </StyeldLayout>
          </StyeldLayout>
        ) : <span><LoadingIcon type="loading"/>loading...</span>}
      </div>
    );
  }
}

export default Travel;