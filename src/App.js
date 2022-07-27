import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import HomePage from './components/users/home/HomePage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route
          path='/reset-forgot-password/:id/:token'
          element={<HomePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
