import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../statics/images/logo1.png';
import Slide from './Carousel';
import Event from './Event';
// import Graph from './Graph';

const Wrapper = styled.div`
  width: 100%;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid grey;
`;

const StyledAuth = styled.div`
  flex:1;
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const Logo = styled.div`
  flex: 1;
  justify-content: flex-start;
  margin: 1rem;
`;

const Pictures = styled.div`
  width: 100%;
  height: 50%;
`; 

const Reservation = styled.div`
  display: flex;
  justify-content: center;
`; 
const EtcContents = styled.div`
  width: 80%;
  height: 30rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem auto;
`
const Alarm = styled.div`
  flex: 5;
  height: 30rem;
  width: 25rem;
  margin: 1rem;
  text-align: center;
  overflow: hidden;
  /* margin-left: 200px;
  margin-bottom: 250px;
  margin-top: 100px; */
  border: 1px solid black;
`;

const Trend = styled.div`
  flex: 5;
  height: 30rem;
  width: 25rem;
  margin: 1rem;
  border: 1px solid black;
`;
const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top: 1px solid grey;;
`;

const Foot = styled.div`
  padding: 1rem;
`;

class Main extends Component {
  
  render() {
  const { auth } = this.props;

    return (
      <Wrapper>
        <Header>
          <Logo>마이리얼트립</Logo>
          <StyledAuth>{auth}</StyledAuth>
        </Header>
        <Pictures>
          <Slide />
        </Pictures>
        <Reservation>
          <Link to="/travel">
            <Button type="primary" icon="compass" size="large">Let's Travel!!!</Button>
          </Link>
        </Reservation>
        {/* <EtcContents>
          <Alarm>
            <Event />
          </Alarm>
          <Trend>ㅎㅇ</Trend>
        </EtcContents>
        <FooterContainer>
          <Foot>개인정보동의약관</Foot>
          <Foot>여러가지내용들</Foot>
        </FooterContainer> */}
      </Wrapper>
    );
  }
}

export default Main;
