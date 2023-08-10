import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**@function goSignUp
   * 1. 회원가입 페이지로 이동
   */
  const goSignUp = () => navigate('/signup');

  const onSignInSubmit = (event) => event.preventDefault();

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
