import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Button, Input } from 'antd';
import axios from 'axios';
// import watson from  '../../statics/images/watson.jpg';
import { main, sub1, sub2, sub3, sub4 } from  '../../statics/colors';


const ChatWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${({ isWatsonOpen }) => (isWatsonOpen ? 'flex' : 'none')};
`;

const Contetns = styled.div`
  position: absolute;
  width: 22rem;
  height: 40rem;
  bottom: 5rem;
  right: 0;
  padding: 10px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background: #041528;
  /* border: 1px solid black; */
`;

const ChatbotNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: ${sub4};
  /* border: 1px solid black; */
  font-weight: 600;
  flex: 1;
`;

const StyledImg = styled.img`
  width: 1.2rem;
`

const ChatTextContainer = styled.div`
  width: 100%;
  flex: 8;
  border: 1px solid black;
  background-color: white;
  background-clip: content-box;
  overflow: auto;
`;

const Test = styled.div`
  width: 100%;
  position: relative;

  float: ${({ sender }) => (sender === 'me' ? 'right' : 'left')};
`;

const ChatText = styled.div`
  /* display: block; */
  width: fit-content;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  /* justify-content: felx */
  background-color: ${({ sender }) => (sender === 'me' ? '#3f91f7' : '#e5eaea')};
  font-weight: 500;
  color: ${({ sender }) => (sender === 'me' ? '#fff' : '#000000')};
`;

const StyledForm = styled(Form)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
`;

const InputText = styled(Input)`
  flex: 8;
`;

const InputButton = styled(Button)`
  flex: 2;
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
      message: ['안녕하세요 왓순희입니다! :) 이렇게 만나서 반가워요! 저희 여행사에서는 개인들이 선호하는 여행성향을 조사해 6가지로 분류했답니당(칭찬해-짝짝)' , '6가지 성향은 "액티비티, 맛집투어, 휴양지, 관광지, 쇼핑, 야경" 입니다. 이용자님은 어떤 여행을 원하시나요?',]
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

// document.getElementById('프랑스 파리 바토무슈').click()
  sendUserInputToWatson = (e) => {
    const { text, context, messages } = this.state;
    e.preventDefault();
    this.setState({ text: '', loading: true, messages: [...messages, { sender: 'me', message: text }] });
    axios.post('https://us-central1-travel-9bb75.cloudfunctions.net/sendMessage', {
      text,
      context,
    })
      .then(({ data }) => {
        const output = data.output.text.map(element => element);
        const genre = data.context.genre ? data.context.genre : null;
        const target = data.context.target ? data.context.target : null;
        const intent = data.intents[0] && data.intents[0].intent == '긍정대답' ? data.intents[0].intent : null;
        const saveIntent = data.intents[0] && data.intents[0].intent === '저장' ? data.intents[0].intent : null;
        
        console.log(222,data);
        console.log(111,genre)
        console.log(333,target)
        console.log(444,intent)

        if (saveIntent) {
          document.getElementById('save').click();
        }

        if (genre && target && intent) {
          console.log(output, genre, target, intent);
          // [...document.getElementsByClassName('gmnoprint')].find(({title}) => title === target).click()
          // console.log(33,genre, target, intent);
          document.getElementById(target).click();
          data.context = null;
         }
        
        if (genre && target) {
         console.log(genre,target);
         [...document.getElementsByClassName('gmnoprint')].find(({title}) => title === target).click();
        }

        if (output.length > 0) {
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
          <ChatbotNameContainer>엠마 왓순희</ChatbotNameContainer>
          <ChatTextContainer innerRef={this.messagesContainer}>
            {this.state.messages.map(({ sender, message }, i) => {
              if (Array.isArray(message)) {
                return message.map((element, j) => (
                  <Test sender={sender}><ChatText sender={sender} key={`${sender}-${j * 100}`}>{`${element}`}</ChatText></Test>
                ))
              }
              return <Test><ChatText sender={sender} key={`${sender}-${i * 10}`}>{`${message}`}</ChatText></Test>
          })}
          </ChatTextContainer>
          <StyledForm layout="inline" onSubmit={this.sendUserInputToWatson}>
            <InputText 
              placeholder='왓슨과 대화를 시작하세요\./' 
              value={this.state.text}
              onChange={this.handleUserInput} 
            />
            <InputButton type="primary" htmlType="submit" onClick={this.sendUserInputToWatson} disabled={this.state.loading || !this.state.text.length}>전송</InputButton>
          </StyledForm>
        </Contetns>
      </ChatWrapper>
    );
  }
};

export default WatsonChatBoard;