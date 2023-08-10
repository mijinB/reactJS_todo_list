import { Route, Routes, useNavigate } from 'react-router-dom';
import SignUpComponent from './pages/SignUp';
import SignInComponent from './pages/SignIn';
import TodoComponent from './pages/Todo';
import { useEffect } from 'react';

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
    <div className='container'>
      <Routes>
        <Route path='/signin' element={<SignInComponent />} />
        <Route path='/signup' element={<SignUpComponent />} />
        <Route path='/todo' element={<TodoComponent />} />
      </Routes>
    </div>
  );
}

export default App;
