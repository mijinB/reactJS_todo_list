import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginComp from './pages/Login';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<LoginComp />} />
      </Routes>
    </div>
  );
}

export default App;
