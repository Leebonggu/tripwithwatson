import React from 'react';
import { Button } from 'antd';

const SignIn = ({ click }) => (
  <Button 
    type="primary"
    onClick={click}
  >
    Login
  </Button>
);


export default SignIn;