import { Carousel } from 'antd';
import React,{ Component } from 'react';
import slide1 from '../../statics/images/slide1.jpg';
import slide2 from '../../statics/images/slide2.jpg';
import slide3 from '../../statics/images/slide3.jpg';

class Slide extends Component {

  render() {
    return (
      <Carousel autoplay>
        <div><h3><img src={slide1} width="800" height="450" /></h3></div>
        <div><h3><img src={slide2} width="800" height="450" /></h3></div>
        <div><h3><img src={slide3} width="800" height="450" /></h3></div>
      </Carousel>
    );
  }
} 

export default Slide;