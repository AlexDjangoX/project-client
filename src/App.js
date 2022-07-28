import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import HomePage from './components/users/home/HomePage';
import PasswordChange from './components/users/passwordChange/PasswordChange';
import Header from './components/users/header/Header.js';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route
          path='/reset-forgot-password/:id/:token'
          element={<PasswordChange />}
        />
        <Route path='/reset-forgot-password' element={<PasswordChange />} />
      </Routes>
    </div>
  );
}

export default App;
