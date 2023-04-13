import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';


import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context'

const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //New Data Records
  const dateBirthInputRef = useRef();
  const locationInputRef = useRef();
  const fullNameInputRef = useRef();
  const userNameInputRef = useRef();


  const [isLogin, setIsLogin] = useState(true);
  const[isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const sendRequest = async (operationName, payload) => {
    const targetUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${operationName}?key=AIzaSyDCUkZQw4kcRhlZPru0_tSXf68cstvkcAg`;
 
    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      setIsLoading(true);
 
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setIsLoading(false);
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
        authCtx.login(data.idToken, expirationTime.toISOString());
        //authCtx.login(data.idToken);
        history.replace('/');

      } else {
        //let errorMessage = 'Authentication failed!';
        // const data = await res.json();
        // console.log(data);
        const { error } = await res.json();
        //errorMessage = error.message; */
        const errorMessage = error?.message || 'Authentication failed!'
        setIsLoading(false);
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
      console.log(err)
    }
  };
 
  const submitHandler = (event) => {
    event.preventDefault();
 
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    //new data
    const enteredFullname = fullNameInputRef.current.value;
    const enteredUsername = userNameInputRef.current.value;
    const enteredDatebirth = dateBirthInputRef.current.value;
    const enteredLocation = locationInputRef.current.value;

 
    const userPayload = {
      email: enteredEmail,
      password: enteredPassword,
      
      // new data
      fullname: enteredFullname,
      username: enteredUsername,
      date_of_birth: enteredDatebirth,
      location: enteredLocation,

      returnSecureToken: true,
    };
 
    if (isLogin) {
      sendRequest('signInWithPassword', userPayload);
    } else {
      sendRequest('signUp', userPayload);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit = {submitHandler}>
        
        <div className={classes.control}>
          <label htmlFor='fullname'>Your Fullname</label>
          <input type='text' id='fullname' placeholder='fullname' required ref = {fullNameInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='text' id='username' placeholder='username' required ref = {userNameInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='location'>Your Country</label>
          <input type='text' id='location' placeholder='Country' required ref = {locationInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='date_of_birth'>Date Of Birth</label>
          <input type='text' id='date_of_birth' placeholder='Date Of Birth' required ref = {dateBirthInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' placeholder='email' required ref = {emailInputRef}/>
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' placeholder='password' required ref = {passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sendign Request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
/* 
const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "[api url endpoint]";
    } else {
      url =
        "[api ur;l]";
    }
    const sendData = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        return data;
      } else {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    };
    sendData()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => alert(err.message));
  }; */