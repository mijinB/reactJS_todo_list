import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

      if (status === 200) {
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
        disabled={disabledFlag}
        type='submit'
        data-testid="signin-button"
      >
        Log In
      </button>
      <button type='button' onClick={goSignUp}>Sign Up</button>
    </form>
  )
}
