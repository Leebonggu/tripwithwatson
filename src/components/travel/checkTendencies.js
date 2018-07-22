import React, { Component } from 'react';
import { Button } from 'antd';



class CheckTendency extends Component {
  constructor(props) {
    super(props);
  }
  // handleTendency = (event) => {
  //   const selectedTendency = event.target.value;
  //   const { tendencies } = this.state;

  //     tendencies.splice(tendencies.indexOf(selectedTendency),1);
  //     console.log('tt',tendencies)
  //     const updatedTendencies = tendencies;
  //     console.log('update',updatedTendencies)
  //     this.setState({ tendencies: updatedTendencies, tf: !this.state.tf})
  //   } else {
  //     tendencies.push(selectedTendency);
  //     const updatedTendencies = tendencies;
  //     console.log('else',updatedTendencies)
  //     this.setState({ tendencies: updatedTendencies, tf: !this.state.tf })
  //   }
  // };
  render() {

    const { tendencies } = this.props;
    console.log(tendencies);
    return (
      <div>
        {/* <select multiple={true} value={tendencies}>
          <option value="액티비티">액티비티</option>
          <option value="맛집투어">맛집투어</option>
          <option value="관광지">관광지</option>
          <option value="휴양지">휴양지</option>
          <option value="야경">야경</option>
          <option value="쇼핑">쇼핑</option>
        </select> */}
        <div>
          <Button value="액티비티" onClick={this.props.handleTendency} checked={tendencies.includes("액티비티")}>액티비티</Button>
          <Button value="맛집투어" onClick={this.props.handleTendency} checked={tendencies.includes("맛집투어")}>맛집투어</Button>
          <Button value="관광지" onClick={this.props.handleTendency} checked={tendencies.includes("관광지")}>관광지</Button>
          <Button value="휴양지" onClick={this.props.handleTendency} checked={tendencies.includes("휴양지")}>휴양지</Button>
          <Button value="야경" onClick={this.props.handleTendency} checked={tendencies.includes("야경")}>야경</Button>
          <Button value="쇼핑" onClick={this.props.handleTendency} checked={tendencies.includes("쇼핑")}>쇼핑</Button>
        </div>
      </div>
    );
  }  
}


export default CheckTendency;