import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';

import { database, auth, firebase } from '../../firebase';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import { citiesMarker } from '../../statics/markers/markers'; 

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const MapContainer = styled.div`
  flex: 95;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MapContents = styled.div`
  flex: 95;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  /* flex: 7; */
`;

const ResultWrapper = styled.div`
  flex: 5;
  width: 15%;
  top: 5rem;
  margin-left: 1rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Select = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  animation-duration: 0s !important;
`;

const StyledButton = styled(Button)`
  flex: 2;
  width: 4rem;
  height: 2rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
`;

const ResultTitle = styled.div`
  flex: 8;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 800;
  font-size: 1.2rem;
  color: ${sub4};
`;

const SelectedList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  margin-top: 0.1rem;
  background-color: #fff;
  border-radius: 1rem;
  color: ${sub4};
`;

const SelectedListTitle = styled.div`
  flex: 9;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;  
`;

const SelectedButtons = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SelectedPlaceUpButton = styled(Icon)`
  color: ${sub4};

  &:hover {
    background-color: ${sub4};
    color: ${sub1};
  }
`;

const SelectedPlaceDownButton = styled(Icon)`
  color: ${sub4};

  &:hover {
    background-color: ${sub4};
    color: ${sub1};
  }
`;

const SelectedPlaceDeleteButton = styled(Icon)`
  color: ${sub3};

  &:hover {
    background-color: ${sub3};
    color: ${sub1};
  }
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  state = {
    selectedPlace: [],
    prevPlace: null,
    tendency: null,
  };

  markers = [];


  componentDidMount() {
    // var position;
    const { travelData, tendency } = this.props;
    if (travelData) {
      this.map = new window.google.maps.Map(this.mapRef.current, {
        center: travelData[5].placeInfo,
        zoom: 5,
      });
      travelData.forEach(element => {
        var marker = new window.google.maps.Marker({
          position: element.placeInfo,
          map: this.map,
          animation: window.google.maps.Animation.DROP,
          icon: citiesMarker[element['나라']],
          title: `${element['나라']} ${element['도시']} ${element['도시여행정보']}`
        });
        this.attachMessage(marker, marker.title);
        this.markers.push(marker);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { travelData } = this.props;
    if (this.state.selectedPlace.length === prevState.selectedPlace.length) {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
      travelData.forEach(element => {
        var marker = new window.google.maps.Marker({
          position: element.placeInfo,
          map: this.map,
          icon: citiesMarker[element['나라']],
          title: `${element['나라']} ${element['도시']} ${element['도시여행정보']}`,
        });
        this.attachMessage(marker, marker.title);
        this.markers.push(marker);
      });
    }
  }

  attachMessage = (marker, message) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <span>${message}</span>
          <button id="${message}" onclick="mapComp.getSelectedPlace('${marker.title}')">추가</button>
        </div>
      `,
    });

    let isOpened = false;
    marker.addListener('click', () => {
      window.mapComp = this;
      infoWindow[isOpened ? 'close' : 'open'](marker.get('map'), marker);
      isOpened = !isOpened;
      if (!isOpened) {
        window.mapComp = null;
      }
    });
  };

  getSelectedPlace = (title) => {
    // 추가버튼 눌리면 Selected Route에 추가되는 기능
    const { TravelDataFromWatson } = this.props;
    const current = this.state.selectedPlace;
    const result = [];
    
    if (TravelDataFromWatson) {
      const selectedPlaceInfo = this.props.travelData.filter(element => {
        return element["도시여행정보"].includes(TravelDataFromWatson);
      });
      current.forEach(element => {
        if (element["도시여행정보"] === selectedPlaceInfo[0]['도시여행정보']) {
          result.push(element);
        }
        this.getSelectedPlace(TravelDataFromWatson)
      });
      if (result.length === 0) {
        this.setState({ selectedPlace: [...current, {...selectedPlaceInfo[0], title}] })
      }
    } else {
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
    }
  };

  selectedPlaceMoveUp = (index) => {
    let temp;
    const current = this.state.selectedPlace;
    
    if (index === 0) {
      console.log('맨 위의 데이터는 더 이상 올라갈 곳이 없지요~');
      return;
    }
    temp = current[index - 1];
    current[index - 1] = current[index];
    current[index] = temp;

    this.setState({ selectedPlace: current });
  };

  selectedPlaceMoveDown = (index) => {
    let temp;
    const current = this.state.selectedPlace;
    
    if (index === current.length - 1) {
      console.log('맨 아래 데이터는 더 이상 내려갈 곳이 없지요~');
      return;
    }

    temp = current[index + 1];
    current[index + 1] = current[index];
    current[index] = temp;
    
    this.setState({ selectedPlace: current });
  };

  selectedPlaceDelete = (index) => {
    console.log('삭제를 하자', index);
    const current = this.state.selectedPlace;
    current.splice(index, 1);
    this.setState({ selectedPlace: current });
  };

  saveSelctedPlace = (event) => {
    const name = prompt('입려스!');
    if (!name) {
      return;
    }
    const { selectedPlace } = this.state;
    const uid = auth.currentUser.uid;
    console.log(1,selectedPlace);
    if (selectedPlace.length === 0 || name === '') { 
      return;
    }
    database.ref(`users/${uid}/myPlaces`).push({ ...selectedPlace, name: name, createdAt: firebase.database.ServerValue.TIMESTAMP });
    this.setState({ selectedPlace: [] });
  };

  render() {
    const { selectedPlace } = this.state;
    console.log(this.props.TravelDataFromWatson);
    console.log('re',this.props.travelData)
    return (
      <Wrapper>
        {selectedPlace ? (
          <MapContents>
            <MapContainer className="map" innerRef={this.mapRef} />
            <ResultWrapper>
              <Select>
                <ResultTitle>Selected Route</ResultTitle>
                <StyledButton id="save" type="primary" onClick={this.saveSelctedPlace}>Save</StyledButton>
              </Select>
              {selectedPlace.map((place, index)=> {
                return (
                <SelectedList key={index}>
                  <SelectedListTitle>{index + 1}: {place.title}</SelectedListTitle>
                  <SelectedButtons>
                    <SelectedPlaceUpButton value="1" onClick={() => this.selectedPlaceMoveUp(index)}><Icon type="caret-up"/></SelectedPlaceUpButton>
                    <SelectedPlaceDeleteButton onClick={() => this.selectedPlaceDelete(index)}><Icon type="close" /></SelectedPlaceDeleteButton>
                    <SelectedPlaceDownButton value="2" onClick={() => this.selectedPlaceMoveDown(index)}><Icon type="caret-down"/></SelectedPlaceDownButton>
                  </SelectedButtons>
                </SelectedList>
                )
              })}
            </ResultWrapper>
          </MapContents>
        ) : (
          <div>
            <MapContainer innerRef={this.mapRef} />
          </div>
        )}
      </Wrapper>
    );
  }
}

export default Map;