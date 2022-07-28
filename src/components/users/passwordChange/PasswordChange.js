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
  const email = loggedInUser.email;
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const token = location.pathname.split('/')[3];
  let navigate = useNavigate();
  const [changePasswordError, setChangePasswordError] = useState(false);
  const [passwordResetToken, setPasswordResetToken] = useState({
    ...passwordResetObject,
    token,
    id,
  });
  const [passwordReset, setPasswordReset] = useState({
    oldPassword: '',
    newPassword: '',
    email,
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (id && token) {
      setPasswordResetToken({
        ...passwordResetToken,
        [name]: value,
      });
    } else {
      setPasswordReset({
        ...passwordReset,
        [name]: value,
      });
      console.log('PASSWORD_RESET_OBJECT : ', passwordReset);
    }
  };
  // {

  //   "oldPassword":"a",
  //   "newPassword":"b",
  //   "email":"alexmonk22@gmail.com"

  // }

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
  return (
    <PasswordChangeForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      changePasswordError={changePasswordError}
      token={token}
    />
  );
};

export default PasswordChange;
