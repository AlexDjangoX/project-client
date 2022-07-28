import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import RegistrationForm from './RegistrationForm';
import client from '../../../utils/client';
import { Button, Typography } from '@mui/material';
import { Context } from '../../globalContext/globalContext';
import styles from './Registration.module.css';

const RegistrationPage = () => {
  const [user, setUser] = useState({});

  const [errorResponse, setErrorResponse] = useState({ status: '' });
  const { setLoggedInUser, loggedInUser } = useContext(Context);

  let navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    client
      .post('/user', user, false)
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
        navigate('../home', { replace: true });
      })
      .catch((err) => {
        setErrorResponse(err.response);
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
    <div className={styles['registration-page']}>
      <Button
        className={styles['link-button']}
        variant='outlined'
        color='primary'
      >
        <Link id='user-login-link' to='/'>
          login
        </Link>
      </Button>
      <Typography className={styles['secondary-heading']} variant='h4'>
        Registration
      </Typography>

      <Typography variant='body1'>
        {errorResponse.status === 400 && errorResponse.data.data.email}
      </Typography>
      <p></p>
      <RegistrationForm
        handleChange={handleChange}
        handleSubmit={registerUser}
      />
    </div>
  );
};

export default RegistrationPage;
