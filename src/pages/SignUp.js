import { Button, Card, Form, Input, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, SmileFilled, UserOutlined } from '@ant-design/icons';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledFlag, setDisabledFlag] = useState(true);

  /**@function signUpValidation
   * 1. 이메일, 비밀번호 유효성 검사 후 bool값 추출
   * 2. 추출한 bool 값으로 'Sign Up' button 비활성화 여부 결정(useEffect 사용)
   */
  const signUpValidation = () => {
    let result = false;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/i;

    if (!regExp.test(email)) {
      result = true;
    }
    if (password.length < 8) {
      result = true;
    }
    setDisabledFlag(result);
  }

  useEffect(signUpValidation, [email, password]);

  /**@function onSignUpSubmit
   * 1. submit 이벤트 발생 시 페이지 새로고침 막기
   * 2. 회원가입 email, password API로 전송
   * 3. API전송 성공 시 로그인(SignIn) 페이지로 이동
   */
  const onSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const param = {
        email: email,
        password: password
      }

      const { status } = await axios
        .post("https://www.pre-onboarding-selection-task.shop/auth/signup",
          param
        );

      if (status === 201) {
        navigate('/signin');
      } else {
        throw new Error('not status 201');
      }
    } catch (error) {
      console.log(`[onSignUpSubmit Error] ${error}`);
    }
  }

  return (
    <Card
      size='small'
      title={
        <Space style={{ columnGap: 7 }}>
          <SmileFilled style={{ color: "#FF6059" }} />
          <SmileFilled style={{ color: "#FFBD2D" }} />
          <SmileFilled style={{ color: "#2ACA41" }} />
          <div
            style={{
              width: 669,
              height: 25,
              marginLeft: 12,
              borderRadius: 5,
              backgroundColor: "white"
            }}
          />
        </Space>
      }
      style={{
        minWidth: 800,
        minHeight: 500,
        background: "none"
      }}
      headStyle={{
        backgroundColor: "#EDEDED"
      }}
      bodyStyle={{
        backgroundColor: "rgba(255, 255, 255, .3)",
      }}
    >
      <Form
        onSubmit={onSignUpSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 450,
          height: 437,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: 40,
            textAlign: "center",
            fontSize: 27,
            fontWeight: 600
          }}
        >
          {"\u{1F431} Sign Up"}
        </div>
        <Form.Item>
          <Input
            value={email}
            type='email'
            placeholder='이메일을 작성해주세요.'
            onChange={event => setEmail(event.target.value)}
            style={{
              height: 43
            }}
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            data-testid="email-input"
          />
          <Input
            value={password}
            type='password'
            placeholder='비밀번호를 작성해주세요.'
            onChange={event => setPassword(event.target.value)}
            style={{
              height: 43,
              marginTop: 8
            }}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            data-testid="password-input"
          />
        </Form.Item>
        <Button
          disabled={disabledFlag}
          type='primary'
          htmlType='submit'
          className='login-form-button'
          style={{
            width: "100%",
            height: 43
          }}
          data-testid="signup-button"
        >
          회원가입
        </Button>
      </Form>
    </Card>
  )
}
