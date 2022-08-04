import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordChangeForm from './PasswordChangeForm';
import client from '../../../utils/client.js';
import { Context } from '../../globalContext/globalContext.js';
const passwordResetObject = {
  token: '',
  newPassword: '',
  newPasswordConfirm: '',
};

const PasswordChange = () => {
  const { loggedInUser } = useContext(Context);
  const [alert, setAlert] = useState(false);
  const email = loggedInUser.email;
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const token = location.pathname.split('/')[3];
  let navigate = useNavigate();
  const [changePasswordError, setChangePasswordError] = useState(false);
  const [passwordResetWithTokenEmail, setPasswordResetWithTokenEmail] =
    useState({
      ...passwordResetObject,
      token,
      id,
    });
  const [passwordReset, setPasswordReset] = useState({
    oldPassword: '',
    newPassword: '',
    email,
  });
  const [resetEmail, setResetEmail] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (id && token) {
      setPasswordResetWithTokenEmail({
        ...passwordResetWithTokenEmail,
        [name]: value,
      });
    } else {
      setPasswordReset({
        ...passwordReset,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordReset.newPassword === passwordReset.newPasswordConfirm) {
      client
        .post('/reset-password', passwordReset, true)
        .then((res) => console.log(res))
        .catch((error) => {
          console.error(error);
        });
    }
    navigate('/');
  };

  const handleResetEmail = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setResetEmail({
      ...resetEmail,
      [name]: value,
    });
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    client
      .post('/reset-forgot-password-link', resetEmail, false)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitChangePasswordWithToken = (event) => {
    event.preventDefault();
    client
      .post('/reset-forgot-password', passwordResetWithTokenEmail, false)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetEmailSent = () => {
    setAlert(true);
  };

  const redirectToLogIn = (e) => {
    e.preventDefault();
    setAlert(false);
    navigate('/');
  };

  return (
    <PasswordChangeForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      changePasswordError={changePasswordError}
      token={token}
      handleResetEmail={handleResetEmail}
      handleSubmitEmail={handleSubmitEmail}
      handleSubmitChangePasswordWithToken={handleSubmitChangePasswordWithToken}
      resetEmailSent={resetEmailSent}
      alert={alert}
      redirectToLogIn={redirectToLogIn}
    />
  );
};

export default PasswordChange;
