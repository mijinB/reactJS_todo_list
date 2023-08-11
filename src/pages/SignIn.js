import { Button, Card, Form, Input, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, SmileFilled, UserOutlined } from '@ant-design/icons';


export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabledFlag, setDisabledFlag] = useState(true);

  /**@function signInValidation
   * 1. 이메일, 비밀번호 유효성 검사 후 bool값 추출
   * 2. 추출한 bool 값으로 'Sign In' button 비활성화 여부 결정(useEffect 사용)
   */
  const signInValidation = () => {
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

  useEffect(signInValidation, [email, password]);

  /**@function goSignUp
   * 1. 회원가입(SignUp) 페이지로 이동
   */
  const goSignUp = () => navigate('/signup');

  /**@function onSignInSubmit
   * 1. submit 이벤트 발생 시 페이지 새로고침 막기
   * 2. 로그인 email, password API로 전송
   * 3. API전송 성공 시 JWT(signinToken)을 localStorage에 저장 & Todo 페이지로 이동
   */
  const onSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const param = {
        email: email,
        password: password
      }

      const { status, data } = await axios
        .post("https://www.pre-onboarding-selection-task.shop/auth/signin",
          param
        );

      if (status === 200) {
        localStorage.setItem("signinToken", data.access_token);
        navigate('/todo');
      } else {
        throw new Error('not status 200');
      }
    } catch (error) {
      console.log(`[onSignInSubmit Error] ${error}`);
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
        onSubmit={onSignInSubmit}
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
          {"\u{1F431} Log In"}
        </div>
        <Form.Item>
          <Input
            value={email}
            type='email'
            placeholder='이메일을 작성해주세요.'
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            style={{
              height: 43,
              marginTop: 8
            }}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            data-testid="password-input"
          />
        </Form.Item>
        <Space direction='vertical'>
          <Button
            disabled={disabledFlag}
            type='primary'
            htmlType='submit'
            className='login-form-button'
            style={{
              width: "100%",
              height: 43
            }}
            data-testid="signin-button"
          >
            로그인
          </Button>
          <Button
            type='default'
            htmlType='button'
            className='login-form-button'
            onClick={goSignUp}
            style={{
              width: "100%",
              height: 43
            }}
          >
            회원가입
          </Button>
        </Space>
      </Form>
    </Card>
  )
}
