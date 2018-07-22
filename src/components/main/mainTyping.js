import React from 'react';
import Typing from 'react-typing-animation';
import styled from 'styled-components';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';

const StyledTyping = styled(Typing)`
  color: ${sub1};
`;

const Span = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`
//MRT with IBM Waston/IBM 인공지능 왓슨 여행계획 플랫폼 / 왓슨과 함께 성향에 맞는여행을 계획하십시오.
const AnimatedTyping = () => {
  return (
    <StyledTyping 
      speed={60}
      loop={true}
    >
      <Typing.Delay ms={1000} />  
      <Span>왓슨과 함께 성향에 맞는 여행을 계획하십시오</Span>
      <Typing.Reset count={1} delay={500} />
      <Span>Watson 기반 여행계획 플랫폼 </Span>
      <Typing.Reset count={1} delay={500} />
      <Span>MRT with IBM Waston</Span>
      <Typing.Reset count={1} delay={500} />
      <Span>For your better Trip</Span>
      <Typing.Reset count={1} delay={500} />
    </StyledTyping>
  );
};

export default AnimatedTyping;