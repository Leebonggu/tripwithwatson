import React, { Component } from 'react';
import { Layout, Menu, Button, Icon} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import { database, auth } from '../../firebase';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import { googleMapInitialize, googleStaticMap } from '../../lib/loadGoogleMap';
import Map from './map';
import WatsonChatButton from '../watson/WatsonChatButton';
import WrappedButton from './infoButton';
import RouteDeleteButton from './routeDeleteButton';
import CheckTendency from './checkTendencies';

const { Header, Content, Footer, Sider } = Layout;

const StyeldSider = styled(Sider)`
  background-color: ${sub4};
  height: auto;
`;

const StyleLogo = styled.div`
  display: flex;
  justify-content: center;
  margin:0 auto;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -0.6rem;
`;

const HeaderLink = styled(Link)`
  color: ${main};
  text-decoration: none;
  &:hover {
    color: ${main};
  }
`;

const Span = styled.span`
  font-size: 1em;
`;

const SelectButtons = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 5.5rem;
  display: flex;
  margin-bottom: 1rem;
  z-index: 5;
`;

const StyledButton = styled(Button)`
  left: 0.5rem;
  font-weight: 800;
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
    TravelDataFromWatson: null,
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
    const { tendencies } = this.state;
    this.setState({
      tendencies: event,
    });
  };

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
  };

    getSelectedPlace = (title) => {
    // 추가버튼 눌리면 Selected Route에 추가되는 기능
    const current = this.state.selectedPlace;
    const result = [];
    const selectedPlaceInfo = this.props.travelData.filter(element => {
      return element["도시여행정보"].includes(title.split(' ')[2]);
    });
    current.forEach(element => {
      if (element["도시여행정보"] === selectedPlaceInfo[0]['도시여행정보']) {
        result.push(element);
      }
    });
    if (result.length === 0) {
      this.setState({ selectedPlace: [...current, {...selectedPlaceInfo[0], title}] })
    }
  };

  clearSelectedData = () => {
    this.setState({ selectedData: null });
  };

  getTitleFromWatson = (TraveliInfo) => {
    console.log(TraveliInfo)
    this.setState({ TravelDataFromWatson: TraveliInfo})
  }

  handleSelectedPlaceList = (selected) => {
    console.log('se',selected);
    return selected.length > 0 ? (
      // defaultSelectedKeys={['0']}
      <Menu theme="dark" mode="inline">
        {
          selected.map(([eachRouteUid, eachPlaces], index) => {
            return (
              <Menu.Item key={index} onClick={() => this.menuClick(eachRouteUid)} >
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
    const { isLoading, travelData, tendencies, selectedPlace, selectedData, TravelDataFromWatson} = this.state;
    const { userData } = this.props;
    const personInfo  = userData ? userData.personInfo : null;
    console.log(11,tendencies, selectedPlace)
    return (
      <div>
        {isLoading && travelData && tendencies? (
          <Layout>
            <StyeldSider> 
              <StyleLogo clsssName="logo"><HeaderLink to="/">ㅁㅇㄹㅇㅌㄹ</HeaderLink></StyleLogo>
              {this.handleSelectedPlaceList(selectedPlace)}
            </StyeldSider>
            <div style={{ position: 'relative', width: '100%' }}>
              <SelectButtons>
                <CheckTendency 
                  tendencies={tendencies}
                  handleTendency={this.handleTendency}                
                />
                <StyledButton type="primary" onClick={this.clearSelectedData}>초기화</StyledButton>
              </SelectButtons>
              <Map
                personInfo={personInfo}
                isLoading={isLoading}
                travelData={selectedData ? selectedData : this.handleUniqTravelData(tendencies, travelData) }
                tendency={tendencies}
                TravelDataFromWatson={TravelDataFromWatson ? TravelDataFromWatson : null}
                getTitleFromWatson={this.getTitleFromWatson}
              />
              <WatsonChatButton 
                style={{ position: 'fixed', bottom: '1rem', right: '3rem', zIndex: 100 }}
                getTitleFromWatson={this.getTitleFromWatson}
              />
            </div>
          </Layout>
        ) : <div>
              <span><LoadingIcon type="loading"/>loading...</span>
            </div>}
      </div>
    );
  }
}

export default Travel;