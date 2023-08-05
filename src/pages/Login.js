import React, { useState } from 'react'

export default function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  return (
    <form>
      {console.log(password)}
      <input
      required
      value={email}
      type="email"
      placeholder="이메일을 작성해주세요."
      onChange={ (event) => setEmail(event.target.value) }
      />
      <input
      required
      value={password}
      type="password"
      placeholder="비밀번호를 작성해주세요."
      onChange={ (event) => setPassword(event.target.value) }
      /> 
      <button>Log In</button>
    </form>
  )
}
