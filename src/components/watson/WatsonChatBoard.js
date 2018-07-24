import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Button, Input } from 'antd';
import axios from 'axios';

const ChatWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${({ isWatsonOpen }) => (isWatsonOpen ? 'flex' : 'none')};
`;

const Contetns = styled.div`
  position: absolute;
  width: 24vw;
  height: 68vh;
  bottom: 5rem;
  right: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid black;
`;

const ChatbotNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  flex: 0.5;
`;

const ChatTextContainer = styled.div`
  border: 1px solid black;
  flex: 7;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ChatTextUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0.5rem;
`;

const ChatTextUserIcon = styled.div`
  flex: 1;
  border: 1px solid black;
`;

const ChatTextUser = styled.div`
  flex: 9;
  border: 1px solid black;
  margin-left: 1rem;
`;

const ChatTextBotContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0.5rem;
`;

const ChatTextBotIcon = styled.span`
  flex: 1;
  border: 1px solid black;
`;

const ChatTextBot = styled.div`
  flex: 9;
  border: 1px solid black;
  margin-right: 1rem;
`;

const StyledForm = styled(Form)`
  border: 1px solid black;
  flex: 1.5;
  display: flex;
  flex-direction: row;
  background-color: #fff;
`;

const InputText = styled(Input)`
  flex: 8;
  height: 95%;
`;

const InputButton = styled(Button)`
  flex: 2;
  height: 95%;
  margin: 0.1rem 0.2rem;
`;

class WatsonChatBoard extends Component {
  constructor(props) {
    super(props);
    this.messagesContainer = React.createRef();
  }

  state = {
    text: '',
    context: null,
    messages: [{
      sender: 'watson',
      message: '하이루 반가워요. 저 쉬고싶어요. 혼자있고싶은데요??',
    }],
    loading: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length !== this.state.messages.length) {
      this.messagesContainer.current.scrollTop = this.messagesContainer.current.scrollHeight;
    }
  }

  handleUserInput = (event) => {
    const value = event.target.value;
    this.setState({ text: value });
  };

  sendUserInputToWatson = (e) => {
    const { text, context, messages } = this.state;
    e.preventDefault();
    this.setState({ text: '', loading: true, messages: [...messages, { sender: 'me', message: text }] });
    axios.post('https://us-central1-travel-9bb75.cloudfunctions.net/sendMessage', {
      text,
      context,
    })
      .then(({ data }) => {
        const output = data.output.text[0];
        if (output) {
          return this.setState({
            context: data.context,
            loading: false,
            messages: [...this.state.messages, { sender: 'watson', message: output }],
          });
        }
        return this.setState({ context: null, loading: false });
      });
  }

  render() {
    return (
      <ChatWrapper style={this.props.style} isWatsonOpen={this.props.isWatsonOpen}>
        <Contetns>
          <ChatbotNameContainer>김왓슨</ChatbotNameContainer>
          <ChatTextContainer innerRef={this.messagesContainer}>
            {this.state.messages.map(({ sender, message }, i) => (
              <div key={`${sender}-${i * 10}`}>{`${sender}: ${message}`}</div>
            ))}
          </ChatTextContainer>
          <StyledForm layout="inline" onSubmit={this.sendUserInputToWatson}>
            <InputText 
              placeholder='왓슨과 대화를 시작하세요/' 
              value={this.state.text}
              onChange={this.handleUserInput} 
            />
            <InputButton type="primary" htmlType="submit" onClick={this.sendUserInputToWatson} disabled={this.state.loading || !this.state.text.length}>전 송</InputButton>
          </StyledForm>
        </Contetns>
      </ChatWrapper>
    );
  }
};

export default WatsonChatBoard;