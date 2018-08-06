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

export default CheckTendency;