import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import HomePage from './components/users/home/HomePage';
import PasswordChange from './components/users/passwordChange/PasswordChange';
import Header from './components/users/header/Header.js';
import Albums from './components/users/albums/Albums.js';
import Favorites from './components/users/albums/Favorites.js';

function App() {
  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route
          path='/reset-forgot-password/:id/:token'
          element={<PasswordChange />}
        />
        <Route path='/reset-forgot-password' element={<PasswordChange />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
