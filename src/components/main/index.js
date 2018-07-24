import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';
import mainleft from '../../statics/images/main-left.jpg';
import AnimatedTyping from './mainTyping';
import background from '../../statics/images/background.mp4';

// import Graph from './Graph';

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  flex: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
`;

const LeftContents = styled.div`
  flex: 2.5;
  display:table;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${mainleft});
  background-position: center;
  background-repeat: no-repeat;
`;

const LeftLogo = styled.div`
  flex: 1;
  height: 100%;
  margin-left: 1rem;
  display: flex;
  font-weight: 900;
  font-size: 2.3rem;
  letter-spacing: -0.5rem;
  color: ${main};
  /* background-color: red; */
`;

const LeftText = styled.div`
  flex: 8;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${sub1};
`;

const LeftSpon = styled.div`
  flex: 2;
  height: 100%;
  color: ${sub1};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SponDiscription = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 800;
  color: ${sub2};
  
`;

const SponList = styled.div`
  flex: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SponName = styled.div`
  font-weight: 800;
  letter-spacing: -1px;  
  padding: 0.7rem;
  margin: 0.5rem;
  border: 3px solid ${sub2};
  color: ${sub2};
`

const RightContents = styled.div`
  flex: 7.5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  /* background-color: blue; */
`;

// const StyledVideo = styled.video`
//   min-width: 100%;
//   min-height: 100%;
//   width: 100%;
//   z-index: 1;

// `;

const RigthAuthContainer = styled.div`
  flex: 5;
  width: 100%;
  display: flex;
  margin-top: 0.3rem;
  justify-content: flex-end;
  align-items: center;

  z-index: 2;
`;

const AuthButton = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 1.5rem;
  z-index: 2;
`;

const StyledButton = styled(Button)`
  width: 16rem;
  height: 4rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 10rem;
  background-color: ${main};
  color: ${sub1};
  border: none;
  z-index: 2;

  &:hover {
    border: 1px solid ${main};
    background-color: ${sub1};
    color: ${main};
  }
`;

const RigthMainContainer = styled.div`
  flex: 95;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

`;

class Main extends Component {
  render() {
  const { auth } = this.props;

    return (
      <Wrapper>
        <Contents>
          <LeftContents>
            <LeftLogo>ㅁㅇㄹㅇㅌㄹ</LeftLogo>
            <LeftText><AnimatedTyping/></LeftText>
            <LeftSpon>
              {/* <SponDiscription>Created by</SponDiscription> */}
              <SponList>
                <SponName>209</SponName>
                <SponName>210</SponName>
              </SponList>
            </LeftSpon>
          </LeftContents>
          <RightContents>
            {/* main contents images */}
            {/* <StyledVideo>
              <source src={background} type="video/mp4"/>
            </StyledVideo> */}
            <RigthAuthContainer>
              <AuthButton>{auth}</AuthButton>
            </RigthAuthContainer>
            <RigthMainContainer>
              <Link to="/travel">
                <StyledButton type="primary" icon="compass" size="large">Map Page</StyledButton>
              </Link>
            </RigthMainContainer>
          </RightContents>
        </Contents>
      </Wrapper>
      // <Wrapper>
      //   <LeftContents>ㅎㅇ</LeftContents>
      //   <RightContents>
      //     <Slide />

      //     <Reservation>
            // <Link to="/travel">
            //   <Button type="primary" icon="compass" size="large">Let's Travel!!!</Button>
            // </Link>
      //     </Reservation>
      //   </RightContents>
      //   {/* <Header>
      //     <Logo>마이리얼트립</Logo>
      //     <StyledAuth>{auth}</StyledAuth>
      //   </Header> */}
      //   {/* <Pictures>
      //   </Pictures> */}
      // </Wrapper>
    );
  }
}

export default Main;
