import { Carousel } from 'antd';
import React,{ Component } from 'react';

class Event extends Component {

  render() {
    return (
      <Carousel autoplay>
        <div><h3>이벤트</h3></div>
        <div><h3>공지사항</h3></div>
        <div><h3>특별행사</h3></div>
      </Carousel>
    );
  }
} 

export default Event;