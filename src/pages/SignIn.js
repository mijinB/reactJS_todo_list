import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**@function goSignUp
   * 1. 회원가입(SignUp) 페이지로 이동
   */
  const goSignUp = () => navigate('/signup');

  /**@function onSignInSubmit
   * 1. submit 이벤트 발생 시 페이지 새로고침 막기
   * 2. 로그인 email, password API로 전송
   * 3. API전송 성공 시 Todo 페이지로 이동
   */
  const onSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const param = {
        email: email,
        password: password
      }

      const { status } = await axios
        .post("https://www.pre-onboarding-selection-task.shop/auth/signin",
          param
        );

        if(status === 200) {
          navigate('/todo');
        } else {
          throw new Error('not status 200');
        }
    } catch (error) {
      console.log(`[onSignInSubmit Error] ${error}`);
    }
  }

  return (
    <form onSubmit={onSignInSubmit}>
      {console.log(email, password)}
      <input
        required
        value={email}
        type='email'
        placeholder='이메일을 작성해주세요.'
        onChange={(event) => setEmail(event.target.value)}
        data-testid="email-input"
      />
      <input
        required
        value={password}
        type='password'
        placeholder='비밀번호를 작성해주세요.'
        onChange={(event) => setPassword(event.target.value)}
        data-testid="password-input"
      />
      <button
        type='submit'
        data-testid="signin-button"
      >
        Log In
      </button>
      <button type='button' onClick={goSignUp}>Sign Up</button>
    </form>
  )
}
