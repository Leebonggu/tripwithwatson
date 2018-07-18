import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { database, auth, firebase } from '../../firebase';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import { citiesMarker } from '../../statics/markers/markers'; 

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const MapContainer = styled.div`
  flex: 8;
  display: flex;
  justify-content: center;
  width: 80rem;
  height: 50rem;
`;

const ResultWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Test = styled.div`
  display: flex;
`;


const Select = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  flex: 1;
  margin-left: 1rem;
  background-color: ${main};
  color: ${sub1};
  border: none;

  &:hover {
    background-color: ${sub1};
    color: ${main};
    border: 1px solid ${main};
  };
`;

const ResultTitle = styled.h2`
  flex: 9;
  text-align: center;
  color: ${sub4};
`;

const SelectedList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 3rem;
  margin-top: 0.1rem;
  border: 1px solid ${sub4};
  color: ${sub4};
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

  attachMessage = (marker, message) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <span>${message}</span>
          <button onclick="mapComp.getSelectedPlace('${marker.title}')">추가</button>
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
    // const clickedPlace = {...element};    
    const current = this.state.selectedPlace;
    // clickedPlace['title'] = marker.title;
    // clickedPlace['placeInfo'] = { lat: marker.position.lat(), lng: marker.position.lng() }
    const selectedPlaceInfo = this.props.travelData.filter(element => {
      // console.log(element)
      return element["도시여행정보"].includes(title.split(' ')[2])
    });
    // console.log(a);
    // console.log(title.split(' ')[2])
    // console.log(this.state.selectedPlace, element)
    console.log(title, selectedPlaceInfo[0]);
    // const [result] = [...selectedPlaceInfo];
    // const current = { ...selectedPlaceInfo[0]}
    // const current2 = { ...selectedPlaceInfo}

    // console.log('re',result)
    
    // console.log(11,selectedPlaceInfo)
    console.log(11111,selectedPlaceInfo[0])
    if (selectedPlaceInfo) {
      this.setState({ selectedPlace: [...current, {...selectedPlaceInfo[0], title}] })
    }
  };

  saveSelctedPlace = (event) => {
    const name = prompt('입려스!')
    const { selectedPlace } = this.state;
    const uid = auth.currentUser.uid;
    console.log(1,selectedPlace);
    if (selectedPlace.length === 0 || name === '') { 
      return
    }
    database.ref(`users/${uid}/myPlaces`).push({ ...selectedPlace, name: name, createdAt: firebase.database.ServerValue.TIMESTAMP });
    this.setState({ selectedPlace: [] })
  }

  componentDidMount() {
    // var position;
    const { travelData, tendency } = this.props;
    if (travelData) {
      this.map = new window.google.maps.Map(this.mapRef.current, {
        center: travelData[0].placeInfo,
        zoom: 4,
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
          title: `${element['나라']} ${element['도시']} ${element['도시여행정보']}`
        });
        this.attachMessage(marker, marker.title);
        this.markers.push(marker);
      });
    }
  }

  render() {
console.log(main)

    const { selectedPlace } = this.state;
    console.log('re',selectedPlace)
    return (
      <Wrapper>
        {selectedPlace ? (
          <Test>
            <MapContainer innerRef={this.mapRef} />
            <ResultWrapper>
              <Select>
                <ResultTitle>Selected Route</ResultTitle>
                <StyledButton onClick={this.saveSelctedPlace}>Save</StyledButton>
              </Select>
              {selectedPlace.map((place, index)=> {
                return <SelectedList key={index}>{index + 1}: {place.title} </SelectedList>
              })}
            </ResultWrapper>
            {/* <div>Selected Route</div>
            <button onClick={this.saveSelctedPlace}>저장!</button>
            {selectedPlace.map((place, index)=> {
              return <div key={index}>{index + 1}: {place.title} </div>
            })} */}
          </Test>
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