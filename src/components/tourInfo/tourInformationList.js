import React from 'react';
import styled from 'styled-components';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';

const Wrapper = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;

const ListContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin-bottom: 1rem;
  border: 1px solid black;
  padding: 2px;
  
  @media (max-width: 50rem) {
    margin: 0 auto;
  }
`;

const Title = styled.div`
  flex:2;
  display: flex;
  border: 1px solid black;
  color: ${sub4};
  justify-content:center;
  align-items: center;
`;

const TourTendencies =  styled.div`
  flex:2;
  display: flex;
  /* border: 1px solid black; */
  justify-content:center;
  align-items: center;
  color: ${sub2};
`;

const Guide = styled.div`
  flex: 6;
  display: flex;  
  border: 1px solid black;
  overflow-y: scroll;
  text-overflow: ellipsis;
  color: ${sub2};
  /* align-items: center; */
`;


const TourInformationList = ({ tourInfo }) => {
  const checkTendenciesList = ['휴양지', '관광지', '맛집투어', '쇼핑', '액티비티', '야경'];
  const filteredTendencies = Object.keys(tourInfo).filter((tendency) => {
    console.log('in', tendency)
    console.log(checkTendenciesList.includes(tendency));
    console.log(tourInfo[tendency] === true)
    if (checkTendenciesList.includes(tendency) && tourInfo[tendency] === true) {
      return tendency;
    }
  });
  console.log(4, filteredTendencies);

  console.log(3,tourInfo)
  return (
    <Wrapper>
      <ListContents>
        <Title>
          {tourInfo.title}
        </Title>
        <TourTendencies>
          {filteredTendencies.join(',')}
        </TourTendencies>
        <Guide>
          {tourInfo.가이드}
        </Guide>
      </ListContents>
    </Wrapper>
  )
};

export default TourInformationList;