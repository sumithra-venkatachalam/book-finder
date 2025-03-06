import './Signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { username } from '../../redux/usernameSlice';

function Signup() {
  
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [loginUsernameError, setLoginUsernameError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [signupUsernameError, setSignupUsernameError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [signupConfirmPasswordError, setSignupConfirmPasswordError] = useState('');

  const name = useSelector((state) => state.username.value)
  const dispatch = useDispatch()

  const loginUsernameFunc = (e) => {
    setUsername(e.target.value);
  };
  const loginPasswordFunc = (e) => {
    setLoginPassword(e.target.value);
  };
  const signupUsernameFunc = (e) => {
    setSignupUsername(e.target.value);
  };
  const signupPasswordFunc = (e) => {
    setSignupPassword(e.target.value);
  };
  const signupConfirmPasswordFunc = (e) => {
    setSignupConfirmPassword(e.target.value);
  };
  const [signin, setSignin] = useState('login');

  const navigate = useNavigate();

  const signupClick = () => {
    setSignin('signup');
  };

  const loginClick = () => {
    setSignin('login');
  };

  const goToDomainListing2 = () => {
    let hasError = false;

    if (name.length === 0) {
      hasError = true;
      setSignupUsernameError('UserName is required');
    } else if (name.length < 5) {
      hasError = true;
      setSignupUsernameError(
        'Username characters must be greater than 5 characters'
      );
    } else if (name.length > 25) {
      hasError = true;
      setSignupUsernameError(
        'Username characters should be less than 25 characters'
      );
    }

    if (signupPassword.length === 0) {
      hasError = true;
      setSignupPasswordError('Password is required');
    } else if (signupPassword.length < 5) {
      hasError = true;
      setSignupPasswordError('Password should have minimum of 5 characters');
    } else if (signupPassword.length > 20) {
      hasError = true;
      setSignupPasswordError('Password should not exceed 20 characters');
    }
    if (signupConfirmPassword.length === 0) {
      hasError = true;
      setSignupConfirmPasswordError('Confirm password is required');
    } else if (signupPassword !== signupConfirmPassword) {
      hasError = true;
      setSignupConfirmPasswordError(
        'New password and confirm password should be same'
      );
    }

    if (hasError === false) navigate('/home');
  };

  const goToDomainListing1 = () => {
    let hasError = false;

    if (name.length === 0) {
      hasError = true;
      setLoginUsernameError('UserName is required');
    } else if (name.length < 5) {
      hasError = true;
      setLoginUsernameError(
        'Username characters must be greater than 5 characters'
      );
    } else if (name.length > 25) {
      hasError = true;
      setLoginUsernameError(
        'Username characters should be less than 25 characters'
      );
    }

    if (loginPassword.length === 0) {
      hasError = true;
      setLoginPasswordError('Password is required');
    } else if (loginPassword.length < 5) {
      hasError = true;
      setLoginPasswordError('Password should have minimum of 5 characters');
    } else if (loginPassword.length > 20) {
      hasError = true;
      setLoginPasswordError('Password should not exceed 20 characters');
    }
    if (hasError === false) navigate('/home');
  };

  return (
    <div>
      <div className="parent">
        <div className="screen1"></div>
        <div className="screen2"></div>
        <div className="boxContainer">
          {signin === 'login' && <h1 className="titleText">Login Form</h1>}

          {signin === 'signup' && <h1 className="titleText">Signup Form</h1>}

          <div className="buttonContainer">
            <button
              className="actionButton"
              onClick={loginClick}
              style={{
                background:
                  signin === 'login'
                    ? 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
                    : 'white',
                color: signin === 'login' ? 'white' : null,
                border:
                  signin === 'login' ? 'none' : '1px solid  rgb(196, 194, 194)',
              }}
            >
              Login
            </button>
            <button
              className="actionButton"
              onClick={signupClick}
              style={{
                background:
                  signin === 'signup'
                    ? 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
                    : 'white',
                color: signin === 'signup' ? 'white' : null,
                border:
                  signin === 'signup'
                    ? 'none'
                    : '1px solid  rgb(196, 194, 194)',
              }}
            >
              Signup
            </button>
          </div>
          {signin === 'login' && (
            <>
              <input
                className="loginUsername"
                type="text"
                placeholder="Username"
                required
                onChange={(e) => dispatch(username(e.target.value))}
                value={name}
              />
              <span className="errorMessage">{loginUsernameError}</span>
              <input
                onChange={loginPasswordFunc}
                className="loginPassword"
                type="password"
                placeholder="Password"
                required
              />
              <span className="errorMessage">{loginPasswordError}</span>

              <a className="forgotPassword" href="">
                Forgot Password?
              </a>
              <button className="loginButton" onClick={goToDomainListing1}>
                Login
              </button>
            </>
          )}

          {signin === 'signup' && (
            <>
              <input
                className="loginUsername"
                onChange={signupUsernameFunc}
                type="text"
                placeholder="Username"
                required
              />
              <span className="errorMessage">{signupUsernameError}</span>
              <input
                className="loginPassword"
                onChange={signupPasswordFunc}
                type="password"
                placeholder="Password"
                required
              />
              <span className="errorMessage">{signupPasswordError}</span>
              <input
                className="loginPassword"
                onChange={signupConfirmPasswordFunc}
                type="password"
                placeholder="Confirm Password"
                required
              />
              <span className="errorMessage">{signupConfirmPasswordError}</span>
              <button className="loginButton" onClick={goToDomainListing2}>
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
