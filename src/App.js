import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUpComponent from './pages/SignUp';
import SignInComponent from './pages/SignIn';
import TodoComponent from './pages/Todo';
import { useEffect } from 'react';
import { ConfigProvider, Space } from 'antd';

import backgroundImag from "./images/backgroundImg.jpeg";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("signinToken")) {
      navigate('/todo');
    } else {
      navigate('/signin');
    }
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff7875',
          colorBgContainerDisabled: '#EDEDED'
        },
      }}
    >
      <Space
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          background: `url(${backgroundImag}) center/cover`
        }}
      >
        <Routes>
          <Route path='/signin' element={<SignInComponent />} />
          <Route path='/signup' element={<SignUpComponent />} />
          <Route path='/todo' element={<TodoComponent />} />
        </Routes>
      </Space>
    </ConfigProvider>
  );
}

export default App;
