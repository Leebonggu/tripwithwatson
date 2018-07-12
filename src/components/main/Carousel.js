import React,{ Component } from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';

import slide1 from '../../statics/images/slide1.jpg';
import slide2 from '../../statics/images/slide2.jpg';
import slide3 from '../../statics/images/slide3.jpg';


const StyledCarousel = styled(Carousel)`
  width: 95%;
  height: 50%;
  margin: auto;  
`;

const StyeldImg = styled.img`
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: center;
`;

class Slide extends Component {

  render() {
    return (
      <StyledCarousel autoplay>
        <StyeldImg src={slide1} />
        <StyeldImg src={slide2} />
        <StyeldImg src={slide3} />
      </StyledCarousel>
    );
  }
} 

export default Slide;