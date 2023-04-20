import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();

  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${authCtx.userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user data.');
      }

      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

      if (res.ok) {
        const data = await res.json();
        console.log(data, 'updated');
        history.replace('/');
      } else {
        const { error } = await res.json();
        const errorMessage = error?.message || 'Authentication failed!'
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
      console.log(err, 'XX Err YY');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = passwordInputRef.current.value;

    const userPayload = {
      idToken: authCtx.token,
      password: enteredNewPassword,
      returnSecureToken: false,
    };

    sendRequest('update', userPayload);
  };

  return (
    <>
      <h2>User Profile</h2>
      <div>
        <p><strong>Full Name:</strong> {userData.fullname}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Date of Birth:</strong> {userData.date_of_birth}</p>
        <p><strong>Location:</strong> {userData.location}</p>
      </div>

      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' minLength='7' ref={passwordInputRef} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
