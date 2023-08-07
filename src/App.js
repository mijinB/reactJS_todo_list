import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpComponent from './pages/SignUp';
import SignInComponent from './pages/SignIn';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<SignUpComponent />} />
        <Route path='/signin' element={<SignInComponent />} />
      </Routes>
    </div>
  );
}

export default App;
