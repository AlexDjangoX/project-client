import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import SendIcon from '@material-ui/icons/Send';
import styles from './LoginForm.module.css';

const LoginForm = ({ handleSubmit, handleChange, loginError }) => {
  const navigation = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    navigation('/reset-forgot-password');
  };

  return (
    <>
      <div>
        <form className={styles['login-form']} onSubmit={handleSubmit}>
          <TextField
            className='user-form-input'
            type='email'
            label='Email'
            variant='outlined'
            name='email'
            onChange={handleChange}
          />
          <TextField
            className='user-form-input'
            type='password'
            label='Password'
            variant='outlined'
            name='password'
            onChange={handleChange}
          />
          {loginError && <div className='error'>{loginError}</div>}
          <Button
            startIcon={<SendIcon />}
            id='user-submit-button'
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
        </form>
        <div className={styles['reset-password']}>
          <Button
            endIcon={<SendIcon />}
            id=''
            type='submit'
            variant='contained'
            onClick={handleNavigate}
          >
            Reset password
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
