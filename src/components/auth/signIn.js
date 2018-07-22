import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';

const StyledButton = styled(Button)`
  width: 5rem;
  height: 2rem;
  border: none;
  border-radius: 10rem;
  background-color: ${main};
  font-weight: bold;
  color: ${sub1};
  &:hover {
    border: 1px solid ${main};
    background-color: ${sub1};
    color: ${main};
  }
  &:active {
    outline: none;
    background-color: ${sub1};
    color: ${main};
    border: 1px solid ${main};
  }
`

const SignIn = ({ click }) => (
  <StyledButton 
    type="primary"
    onClick={click}
  >
    Login
  </StyledButton>
);


export default SignIn;