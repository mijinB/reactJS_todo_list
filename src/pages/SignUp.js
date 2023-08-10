import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        navigate('/');
      } else {
        throw new Error('not status 201');
      }
    } catch (error) {
      console.log(`[onSignUpSubmit Error] ${error}`);
    }
  }

  return (
    <form onSubmit={onSignUpSubmit}>
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
        minLength={8}
        placeholder='비밀번호를 작성해주세요.'
        onChange={(event) => setPassword(event.target.value)}
        data-testid="password-input"
      />
      <button
        type='submit'
        data-testid="signup-button"
      >
        Sign Up
      </button>
    </form>
  )
}
