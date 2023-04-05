import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenuHandler = () => {
    setIsMenuOpen(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>VirtualSky</div>
      </Link>
      <nav>
        <div className={classes.hamburger} onClick={toggleMenuHandler}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${classes.navLinks} ${isMenuOpen ? classes.open : ""}`}>
          <li>
            <Link to="/" onClick={closeMenuHandler}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenuHandler}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/infomodal" onClick={closeMenuHandler}>
              Learn In The Space
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenuHandler}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/visualization" onClick={closeMenuHandler}>
              Explore Space
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              {/* <Link to="/dashboard" onClick={closeMenuHandler}>
                Dashboard
              </Link> */}
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/auth" onClick={closeMenuHandler}>
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile" onClick={closeMenuHandler}>
                Profile
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
