import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import logo from '../../statics/images/logo1.png';
import Slide from './Carousel';
import Event from './Event';
// import Graph from './Graph';

const Logo = styled.div`
  margin-left: 100px;
  margin-top: 10px;
`;

const Pictures = styled.div`
  margin-left: 250px;
  margin-top: 70px;
  margin-bottom: 50px;
`; 

const Reservation = styled.div`
  margin-left: 555px;
  margin-top: 80px;
  margin-bottom: 50px;
`; 

const Alarm = styled.div`
  text-align: center;
  height: 266px;
  width: 300px;
  line-height: 160px;
  line-color: #000000;
  background: #00FFFF;
  overflow: hidden;
  margin-left: 200px;
  margin-bottom: 250px;
  margin-top: 100px;
`;

const Foot = styled.div`
  float: rigth;
  margin-bottom: 60px;
  margin-left: 550px;
`;

class Main extends Component {
  render() {
    return (
      <div>
        <Logo>
          <img src={logo} width="100" height="80" />
        </Logo>
        <div>
          <Pictures>
            <Slide />
          </Pictures>
          <Reservation>
            <Button type="primary" icon="compass" size="large">Let's Travel!!!</Button>
          </Reservation>
          <div>
            <Alarm>
              <Event />
            </Alarm>
          </div>
        </div>
        <Foot>개인정보동의약관</Foot>
        <Foot>푸터</Foot>
        <Foot>여러가지내용들</Foot>
      </div>
    );
  }
}

export default Main;
