import React from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';


const StyledButton = styled(Button)`
  flex: 5;
  display: flex;
  width: 0.2rem;
  height: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid ${sub1};
  color: ${sub1};

  &:hover {
    color: ${sub4};
    background-color: ${sub1};
    border: 1px solid ${sub4};
  };
`;

const StyledLink = styled(Link)`
`;

const StyledIcon = styled(Icon)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrappedButton = ({eachRouteUid}) => {
  return (
    <StyledButton> 
      <StyledLink to={`/tourinformation/${eachRouteUid}`}><StyledIcon type="search" /></StyledLink>
    </StyledButton>
  );
};

export default WrappedButton;