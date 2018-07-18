import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Button, Icon, Radio, Slider } from 'antd';

import { database, auth } from '../../../firebase'

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const SurveyHeader = styled.h1`
  text-align: center;
  margin: 3rem 0;
  font-size: 2rem;
`;

const StyeldForm = styled(Form)`
  display: flex;
  flex-direction: column; 
  width: 100%;
`;

const StyeldFormItem = styled(FormItem)`
  padding: 1rem;
`;

class Survey extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { uid } = auth.currentUser;
        const personInfo = {};
        Object.entries(values).forEach(data => {
          personInfo[data[0]] = data[1]
        });
        database.ref(`/users/${uid}`).set({
          "personInfo" : {
            ...personInfo 
          },
        })
        .then(() => {
          window.location.reload();
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;   
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 10},
    };

    return(
      <div>
        <SurveyHeader>당신의 여행성향을 알려주세요</SurveyHeader>
        <StyeldForm onSubmit={this.handleSubmit}>
          <StyeldFormItem
            {...formItemLayout}
            label="Name"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '이름을 입력해주세요' }],
            })(
              <Input prefix={<Icon type="user"/>} placeholder="Username"  />
            )}
          </StyeldFormItem>
          <StyeldFormItem
            {...formItemLayout} 
            label="Sex"
          >
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: '성별을 선택해주세요' }],
            })(
              <Select placeholder="성별을 선택해주세요">
                <Option value="man">남자</Option>
                <Option value="woman">여자</Option>
              </Select>
            )}
          </StyeldFormItem>
          <StyeldFormItem
            {...formItemLayout}
            label="Age"
          >
            {getFieldDecorator('age-group', {
              rules: [{required: true, message: '나이를 선택해주세요'}],
            })(
              <RadioGroup>
                <Radio value='10s'>10대</Radio>
                <Radio value='20s'>20대</Radio>
                <Radio value='30s'>30대</Radio>
                <Radio value='40s'>40대</Radio>
                <Radio value='50s'>50대</Radio>
                <Radio value='60over'>60대 이상</Radio>
            </RadioGroup>
            )}
          </StyeldFormItem>
          <StyeldFormItem
            {...formItemLayout}
            label="Travel Tendency(Multiple Choice)"
          >
            {getFieldDecorator('tendency', {
              rules: [{required: true, message: '여행 성향을 선택해주세요', type: 'array'}],
            })(
              <Select mode="multiple" placeholder="여행 성향을 선택해주세요!">
                <Option value='휴양지'>휴양지</Option>
                <Option value='액티비티'>액티비티</Option>
                <Option value='야경'>야경</Option>
                <Option value='쇼핑'>쇼핑</Option>
                <Option value='맛집투어'>맛집투어</Option>
                <Option value='관광지'>관광지(박물관,공원,대자연)</Option>
              </Select>
            )}
          </StyeldFormItem>
          <StyeldFormItem
            {...formItemLayout}
            label="Travel Exp"
          >
            {getFieldDecorator('experience')(
              <Slider marks={{0:'처음여행자', 20:'여행초보', 40:'여행중수', 60:'여행고수', 80:'여행왕', 100:'여행신'}}/>
            )}
          </StyeldFormItem>
          <StyeldFormItem
            wrapperCol={{ span: 12, offset: 10 }}
            >
            <Button type="primary" htmlType="submit" size="large">등록</Button>
          </StyeldFormItem>
        </StyeldForm>
      </div>
    );
  }
}

const CreatedSurvey = Form.create()(Survey);

export default CreatedSurvey;