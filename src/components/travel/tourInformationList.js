import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
  flex:10;
`

const TourInformationList = (props) => {
  console.log(props)
  return (
    <Contents>
      <h3>{props.tourInfo.title}</h3>
    </Contents>
  )
};

export default TourInformationList;