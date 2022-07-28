import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import LoginForm from './LoginForm';
import client from '../../../utils/client';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../globalContext/globalContext';
import { Button, Typography } from '@mui/material';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const { setLoggedInUser } = useContext(Context);
  const [user, setUser] = useState({});
  const [loginResponse, setLoginResponse] = useState({
    data: { token: '', user: {} },
  });
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const loadedToken =
      localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
    setLoginResponse({ data: { token: loadedToken } });
  }, []);

  const loginUser = (event) => {
    event.preventDefault();
    client
      .post('/login', user)
      .then((res) => {
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify(res.data.data.user)
        );
        setLoggedInUser(res.data.data.user);
        setLoginResponse(res.data);
        navigate('../home', { replace: true });
      })
      .catch((err) => {
        setLoginError(err.response.data.data.email);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className='login-page'>
      <Typography className={styles['secondary-heading']} variant='h5'>
        Login
      </Typography>

      <Button
        className={styles['link-button']}
        variant='outlined'
        color='primary'
      >
        <Link id='user-registration-link' to='/signup'>
          sign up
        </Link>
      </Button>
      <Typography
        className={styles['para-status']}
        variant='body2'
        gutterBottom
      >
        Status: {loginResponse.status}
      </Typography>

      <LoginForm
        loginError={loginError}
        handleChange={handleChange}
        handleSubmit={loginUser}
      />
    </div>
  );
};

export default LoginPage;
