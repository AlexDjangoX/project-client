import React from 'react';
import {
  TextField,
  Typography,
  Button,
  Stack,
  Alert,
  AlertTitle,
  Box,
} from '@mui/material';

import SendIcon from '@material-ui/icons/Send';
import styles from './PasswordChange.module.css';

const PasswordChangeForm = ({
  handleChange,
  handleSubmit,
  handleResetEmail,
  handleSubmitEmail,
  handleSubmitChangePasswordWithToken,
  changePasswordError,
  token,
  resetEmailSent,
  alert,
  redirectToLogIn,
}) => {
  return (
    <>
      {token && (
        <form
          className={styles['login-form']}
          onSubmit={handleSubmitChangePasswordWithToken}
        >
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
            <Box className='error'>{changePasswordError}</Box>
          )}
          <Button
            startIcon={<SendIcon />}
            id='user-submit-button'
            type='submit'
            variant='outlined'
            onClick={redirectToLogIn}
          >
            Submit
          </Button>
        </form>
      )}
      {!token && (
        <Box className={styles['password-reset-forms']}>
          <Box className={styles['known-password-form']}>
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
                <Box className='error'>{changePasswordError}</Box>
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
          </Box>
          <Box className={styles['forgot-password-form']}>
            <form className={styles['login-form']} onSubmit={handleSubmitEmail}>
              <Typography
                variant='body1'
                gutterBottom
                style={{
                  color: '#cc0000',
                  padding: '1rem',
                  border: '2px solid',
                  borderRadius: '8px',
                }}
              >
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
                onClick={resetEmailSent}
              >
                Submit
              </Button>
              {alert && (
                <Stack spacing={2}>
                  <Alert severity='success' variant='filled'>
                    Check your email for reset link.<br></br>Link is valid for
                    60 minutes.
                  </Alert>
                </Stack>
              )}
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PasswordChangeForm;
