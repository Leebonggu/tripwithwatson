import React from 'react';
import { Button } from 'antd';

const SignOut = ({ click }) => (
  <Button
    type="primary"
    onClick={click}
  >
    Logout
  </Button>
);


export default SignOut;