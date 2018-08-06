import React, { Component } from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import WatsonChatBoard from './WatsonChatBoard';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';

const StyledChatbotButton = styled(Button)`
  width: 13rem;
  height: 4rem;
  font-size: 1.5rem;
  font-weight: 900;
  border-radius: 10rem;
  border: none;
  z-index: 2;
`;

class WatsonChatButton extends Component {
  state = {
    isWatsonOpen: false,
  }

  render() {
    const { isWatsonOpen } = this.state;
    const { getTitleFromWatson } = this.props;
    return (
      <div style={this.props.style}>
        <StyledChatbotButton
          type="primary"
          onClick={() => this.setState({ isWatsonOpen: !isWatsonOpen })}
        >
          WATSOONI
        </StyledChatbotButton>
        <WatsonChatBoard 
          style={{ top: 0 }} isWatsonOpen={isWatsonOpen}
          getTitleFromWatson={getTitleFromWatson} />
      </div>
    );
  }
};

export default WatsonChatButton;