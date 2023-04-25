import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import InterestSelection from '../InterestSelection/InterestModel';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

import axios from 'axios';



const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const fullNameInputRef = useRef();
  const userNameInputRef = useRef();
  const dateBirthInputRef = useRef();
  const locationInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showInterestSelection, setShowInterestSelection] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

// 
  const onInterestSelected = async (selectedInterests) => {
    console.log('Selected interests:', selectedInterests);
    setShowInterestSelection(false);
  
    // Save interests in the database
    try {
      await axios.post(`https://virtual-sky-servers-dkix.vercel.app/api/users/${authCtx.userId}/interests`, {
        interests: selectedInterests,
      });
  
      // Redirect to the homepage
      history.replace('/');
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  };
  // 

  const submitHandler = async (event) => {
    event.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    let userPayload = {
      email: enteredEmail,
      password: enteredPassword,
    };
  
    if (!isLogin) {
      const enteredFullname = fullNameInputRef.current.value;
      const enteredUsername = userNameInputRef.current.value;
      const enteredDatebirth = dateBirthInputRef.current.value;
      const enteredLocation = locationInputRef.current.value;
  
      userPayload = {
        ...userPayload,
        fullname: enteredFullname,
        username: enteredUsername,
        date_of_birth: enteredDatebirth,
        location: enteredLocation,
      };
    }
  
    try {
      setIsLoading(true);
      const res = await fetch(isLogin ? 'https://virtual-sky-servers-dkix.vercel.app/login' : 'https://virtual-sky-servers-dkix.vercel.app/signup', {
        method: 'POST',
        body: JSON.stringify(userPayload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Received data:', data);
        const expirationTime = new Date(Date.now() + (+data.expiresIn * 1000));
    
        // Store the user ID in localStorage
        localStorage.setItem('userId', data.userId);
        console.log('User ID stored in localStorage:', data.userId);

    
        authCtx.login(data.token, data.userId, expirationTime.toISOString());
    
        if (!isLogin) {
          history.push('/interest-selection');
        } else {
          history.replace('/');
        }
      } else {
        const { error } = await res.json();
        const errorMessage = error?.message || 'Authentication failed!';
        setIsLoading(false);
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <>
            <div className={classes.control}>
              <label htmlFor='fullname'>Your Fullname</label>
              <input type='text' id='fullname' placeholder='fullname' required ref={fullNameInputRef} />
            </div>
  
            <div className={classes.control}>
              <label htmlFor='username'>Your Username</label>
              <input type='text' id='username' placeholder='username' required ref={              userNameInputRef} />
            </div>

            <div className={classes.control}>
              <label htmlFor='location'>Your Country</label>
              <input type='text' id='location' placeholder='Country' required ref={locationInputRef} />
            </div>

            <div className={classes.control}>
              <label htmlFor='date_of_birth'>Date Of Birth</label>
              <input type='date' id='date_of_birth' placeholder='Date Of Birth' required ref={dateBirthInputRef} />
            </div>
          </>
        )}

        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' placeholder='Email' required ref={emailInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' placeholder='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>

      {showInterestSelection && (
        <InterestSelection
          onRequestClose={() => setShowInterestSelection(false)}
          onInterestSelected={onInterestSelected}
          userId={showInterestSelection} //added the new line
        />
      )}
    </section>
  );
};

export default AuthForm;