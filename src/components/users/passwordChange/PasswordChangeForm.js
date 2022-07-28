import React from 'react';
import { TextField, Typography, Button } from '@mui/material';

import SendIcon from '@material-ui/icons/Send';
import styles from './PasswordChange.module.css';

const PasswordChangeForm = ({
  handleChange,
  handleSubmit,
  handleResetEmail,
  handleSubmitEmail,
  changePasswordError,
  token,
}) => {
  return (
    <>
      <div>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <TextField
            className='user-form-input'
            type='password'
            label='Old Password'
            variant='outlined'
            name='oldPassword'
            onChange={handleChange}
          />
          <TextField
            className='user-form-input'
            type='password'
            label='New Password'
            variant='outlined'
            name='newPassword'
            onChange={handleChange}
          />
          <TextField
            className='user-form-input'
            type='password'
            label='Confirm New'
            variant='outlined'
            name='newPasswordConfirm'
            onChange={handleChange}
          />

          {changePasswordError && (
            <div className='error'>{changePasswordError}</div>
          )}
          <Button
            startIcon={<SendIcon />}
            id='user-submit-button'
            type='submit'
            variant='outlined'
          >
            Submit
          </Button>
        </form>
        <form className={styles['login-form']} onSubmit={handleSubmitEmail}>
          <Typography variant='body1' gutterBottom style={{ color: '#cc0000' }}>
            Forgotten your password ?
          </Typography>

          <TextField
            className='user-form-input'
            type='email'
            label='Provide email for reset link'
            variant='outlined'
            name='email'
            onChange={handleResetEmail}
          />
          <Button
            startIcon={<SendIcon />}
            id='user-submit-button'
            type='submit'
            variant='outlined'
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default PasswordChangeForm;
