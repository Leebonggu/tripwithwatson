import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';

import { database, auth, } from '../../firebase';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';


const StyledButton = styled(Button)`
  flex: 5;
  display: flex;
  width: 1.5rem;
  height: 1.3rem;
  justify-content: center;
  align-items: center;
  color: ${sub4};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${sub1};
    border: 1px solid ${sub4};
  }
`;

const IconWrapper = styled.div`
`

const StyledIcon = styled(Icon)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const deleteRoute = (eachRouteUid) => {
  database.ref(`users/${auth.currentUser.uid}/myPlaces/${eachRouteUid}`).remove();
}

const RouteDeleteButton = ({ eachRouteUid }) => {
  return (
    <StyledButton onClick={() => deleteRoute(eachRouteUid)}><IconWrapper><StyledIcon type="close" /></IconWrapper></StyledButton>
  )
};

export default RouteDeleteButton;