import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  userId: null,
  userData: null,
  login: (token) => {},
  logout: () => {},
  setUserId: (userId) => {},
  setUserData: (userData) => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null); // Add state for userId
  const [userData, setUserData] = useState(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null); // Clear userId on logout
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // const loginHandler = (token, expirationTime) => {
  //   setToken(token);
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("expirationTime", expirationTime);

  //   const remainingTime = calculateRemainingTime(expirationTime);

  //   logoutTimer = setTimeout(logoutHandler, remainingTime);
  // };

  const loginHandler = (token, userId, expirationTime) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationTime", expirationTime);
  
    const remainingTime = calculateRemainingTime(expirationTime);
  
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  
  const setUserIdHandler = (userId) => {
    setUserId(userId);
  };

  const setUserDataHandler = (userData) => {
    setUserData(userData);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  // const contextValue = {
  //   token: token,
  //   isLoggedIn: userIsLoggedIn,
  //   userId: userId, // Add userId to the context value
  //   userData: userData,
  //   login: loginHandler,
  //   logout: logoutHandler,
  //   setUserId: setUserIdHandler, // Add setUserId to the context value
  //   setUserData: setUserDataHandler,
  // };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
    setUserData: setUserDataHandler,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;