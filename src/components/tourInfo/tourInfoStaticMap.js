import React from 'react';
import styled from 'styled-components';
import { StaticGoogleMap, Marker, Path, Direction } from 'react-static-google-map';
import { Icon } from 'antd';
import { citiesMarker } from '../../statics/markers/markers'; 

const Wrapper = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
`;

const StyledStaticGoogleMap = styled(StaticGoogleMap)`
  width: 80%;
  height: 80%;
`;

const TourInfoStaticMap = (props) => {
  const { routeData } = props;
  const point = [];
  const iconURL = [];
  // const location = [];
  
  if (routeData) {
    routeData.forEach(route => {
      if ( route[1].placeInfo ) {
        point.push(route[1].placeInfo);
        iconURL.push(citiesMarker[route[1]['나라']]);
      }
    });
  }

  return (
    <Wrapper>
      {routeData ? (
        <StyledStaticGoogleMap size="650x650" apiKey="AIzaSyDrJZi9NHcyvzgPBZmZSt3f1lxvS1fYbOI">
          <Marker iconURL={`${iconURL}`} location={point}/>
          <Path points={point} geodesic={true}/>
          {/* {point.forEach(element => {
            <Direction/>
          })} */}
        </StyledStaticGoogleMap>
      ) : (
        <Icon type="loading" />
      )}
    </Wrapper>
  );
}

export default TourInfoStaticMap;