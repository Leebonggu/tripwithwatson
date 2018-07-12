import React, { Component } from 'react';
import styled from 'styled-components';


const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const MapContainer = styled.div`
  width: 70rem;
  height: 50rem;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const {
      center = { lat: 48.858532, lng: 2.294385 },
      zoom = 8,
    } = this.props;
    new window.google.maps.Map(this.mapRef.current, {
      center,
      zoom,
    });
  }

  render() {
    return (
      <MapWrapper>
        <MapContainer
          innerRef={this.mapRef}
        />
      </MapWrapper>
    );
  }
}

export default Map;