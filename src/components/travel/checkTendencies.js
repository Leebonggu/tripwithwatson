import React, { Component } from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['액티비티', '맛집투어', '관광지', '휴양지', '쇼핑', '야경'];

const CheckboxWrapper = styled.div`
  top: 1rem;
  left: 5.8rem;
  z-index: 2;
  padding: 0.3rem;
  border-radius: 0.3rem;
  color: #fff;
  background: rgba(255, 255, 255, .8);
  /* opacity: 0.5; */
`;

const StyeldCheckboxGroup = styled(CheckboxGroup)`
  color: white;
  font-weight: 800;
`

const CheckTendency = (props) => {
  const { tendencies, handleTendency } = props;
  return (
    <CheckboxWrapper>
     <StyeldCheckboxGroup options={plainOptions} value={tendencies} onChange={handleTendency} />
    </CheckboxWrapper>
  )
};

// class CheckTendency extends Component {

//   // handleTendency = (event) => {
//   //   const selectedTendency = event.target.value;
//   //   const { tendencies } = this.state;

//   //     tendencies.splice(tendencies.indexOf(selectedTendency),1);
//   //     console.log('tt',tendencies)
//   //     const updatedTendencies = tendencies;
//   //     console.log('update',updatedTendencies)
//   //     this.setState({ tendencies: updatedTendencies, tf: !this.state.tf})
//   //   } else {
//   //     tendencies.push(selectedTendency);
//   //     const updatedTendencies = tendencies;
//   //     console.log('else',updatedTendencies)
//   //     this.setState({ tendencies: updatedTendencies, tf: !this.state.tf })
//   //   }
//   // };
//   render() {
//     console.log('11', tendencies)
//     return (
//       <div>
//         <CheckboxGroup options={plainOptions} value={tendencies} onChange={handleTendency} />
//         {/* <select multiple={true} value={tendencies}>
//           <option value="액티비티">액티비티</option>
//           <option value="맛집투어">맛집투어</option>
//           <option value="관광지">관광지</option>
//           <option value="휴양지">휴양지</option>
//           <option value="야경">야경</option>
//           <option value="쇼핑">쇼핑</option>
//         </select> */}
//       </div>
//     );
//   }  
// }


export default CheckTendency;